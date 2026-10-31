"""Build the printable CV from the same Markdown used by the website.
Requires reportlab: python3 -m pip install reportlab
"""
from pathlib import Path
import re
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak

ROOT = Path(__file__).resolve().parent.parent
styles = {
    "body": ParagraphStyle("Body", fontName="Helvetica", fontSize=9.3, leading=12.4, spaceAfter=5.5, textColor=colors.HexColor("#222222")),
    "name": ParagraphStyle("Name", fontName="Helvetica-Bold", fontSize=22, leading=27, alignment=TA_CENTER, spaceAfter=5),
    "section": ParagraphStyle("Section", fontName="Helvetica-Bold", fontSize=10.3, leading=14, spaceBefore=11, spaceAfter=6, textColor=colors.HexColor("#202020"), borderWidth=0, borderPadding=0, keepWithNext=True),
    "role": ParagraphStyle("Role", fontName="Helvetica-Bold", fontSize=9.6, leading=12.5, spaceBefore=5, spaceAfter=3, keepWithNext=True),
    "date": ParagraphStyle("Date", fontName="Helvetica-Oblique", fontSize=8.7, leading=11, textColor=colors.HexColor("#555555"), spaceAfter=4, keepWithNext=True),
    "contact": ParagraphStyle("Contact", fontName="Helvetica", fontSize=9, leading=12, alignment=TA_CENTER, spaceAfter=8),
    "bullet": ParagraphStyle("Bullet", fontName="Helvetica", fontSize=9.3, leading=12.4, leftIndent=10, firstLineIndent=-8, spaceAfter=4),
}

def inline(text):
    text = escape(text).replace("×", "x")
    text = re.sub(r"\[([^]]+)\]\((https?://[^)]+)\)", r'<link href="\2" color="#333333"><u>\1</u></link>', text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    return re.sub(r"\*(.+?)\*", r"<i>\1</i>", text)

story = []
after_name = False
for block in re.split(r"\n\s*\n", (ROOT / "cv.md").read_text()):
    block = block.strip()
    if not block:
        continue
    if block == "<!-- PDF_PAGE_BREAK -->":
        story.append(PageBreak())
    elif block.startswith("# "):
        story.append(Paragraph(inline(block[2:]), styles["name"]))
        after_name = True
    elif block.startswith("## "):
        story.append(Paragraph(inline(block[3:].upper()), styles["section"]))
    elif block.startswith("### "):
        story.append(Paragraph(inline(block[4:]), styles["role"]))
    elif block.startswith("- "):
        for line in block.splitlines():
            story.append(Paragraph("&#8226; " + inline(line[2:]), styles["bullet"]))
    else:
        key = "contact" if after_name else "date" if re.match(r"^(?:[A-Z][a-z]{2} |\d{4}|Ongoing research)", block) and len(block) < 150 else "body"
        story.append(Paragraph(inline(block), styles[key]))
        after_name = False

def footer(canvas, doc):
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#777777"))
    canvas.drawString(43, 26, "Yuxin Ye | Curriculum Vitae")
    canvas.drawRightString(A4[0] - 43, 26, str(doc.page))

SimpleDocTemplate(str(ROOT / "cv.pdf"), pagesize=A4, leftMargin=43, rightMargin=43, topMargin=34, bottomMargin=40, title="Yuxin Ye - Curriculum Vitae", author="Yuxin Ye").build(story, onFirstPage=footer, onLaterPages=footer)
print("Built cv.pdf from cv.md")
