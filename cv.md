# Yuxin Ye

yeyuxin9816@gmail.com · (+1) 508-745-8907

## Industry Experience

### Alibaba Group, Tongyi Lab (Qwen) - Algorithm Engineer, RL Infrastructure

Mar 2026 - Present

- Parallelize large-scale ASR and audio-encoder pretraining for Qwen omni models.
- Build GRPO / PPO post-training infrastructure for Qwen MoE models on verl, connecting Megatron training and vLLM inference through a separated trainer-rollout architecture and NCCL / NIXL weight synchronization.
- Engineer reward systems combining rule-based verifiers and LLM-as-judge evaluation for accuracy, instruction-following, and helpfulness.
- Build two-stage vLLM-omni rollout with encoder/decoder disaggregation and shared-memory transfer of hidden states, supporting trainable-encoder GRPO.
- Develop agent tool-execution sandbox integration on Alibaba Cloud ACS / Kubernetes, including E2B SDK adapters, reproducible tool replay, artifact collection, and environment cleanup. Validated 208 command replays across 16 fresh CPU environments.
- Build and debug long-horizon agent rollout and evaluation harnesses for APEX and SWE-bench, including tool-call protocols, context / token budgeting, final-answer handling, grading coverage, and trajectory observability.

### Cerebras Systems - Member of Technical Staff

Jan 2025 - Mar 2026

- Built RL post-training on wafer-scale hardware (CSX / WSE): wrote the trainer API against its instruction set, memory model, and compiler stack, and stood up a verl-based RL stack for training-inference co-design on non-GPU silicon.
- Deployed and debugged datacenter-scale Cerebras clusters for reliable large-model training and inference.

### Lamini AI - High Performance Computing Engineer

May 2024 - Jan 2025

- Co-authored *Banishing LLM Hallucinations Requires Rethinking Generalization* (Lamini Memory Tuning) with Dr. Gregory Diamos.
- Enabled RoCE RDMA over AMD MI300 / MI250 with Mellanox / Broadcom drivers and Kubernetes / Slurm; implemented DP and FSDP with mpi4py over a 100 Gbps RoCE network; deployed vLLM-compatible serving across NVIDIA and AMD machines.

### Amazon Robotics - Software Development Engineer

Jul 2022 - Mar 2024

- Developed features for an event-driven, multi-agent simulator of automated sortation floors, including multi-robot drive-path planning, staging-cell distribution, and resource-based allocation.

## Publication

Johnny Li, Saksham Consul, Eda Zhou, James Wong, Naila Farooqui, Yuxin Ye, Nithyashree Manohar, Zhuxiaona Wei, Tian Wu, Ben Echols, Sharon Zhou, Gregory Diamos. *Banishing LLM Hallucinations Requires Rethinking Generalization.* [arXiv:2406.17642](https://arxiv.org/abs/2406.17642), 2024.

## Education

**Harvard University, GSAS** - M.S., Computational Science and Engineering · 2020 - 2022 · GPA 3.87

**University of Science and Technology of China** - B.S., Physics, School of the Gifted Young · 2016 - 2020 · GPA 3.7

<!-- PDF_PAGE_BREAK -->

## Selected Projects

### Draft Models as Test-Time-Trained Search Policies

Ongoing research

Investigate a small draft model as both a speculative-decoding proposer verified by a larger target and a rollout policy for MCTS over chain-of-thought. Study per-problem adaptation using search outcomes, with evaluation designed to compare accuracy at matched inference compute. This is an ongoing research direction.

### Gomoku Solver - Monte Carlo Tree Search

2021 - 2022 · MIT 6.877 Principles of Autonomy and Decision Making

Implemented UCT MCTS for 9×9 Gomoku with a neural network as the default rollout policy.

### Reinforcement Learning of Soft Fish-like Swimmers (C++)

2021 - 2022 · Research Assistant, Prof. Petros Koumoutsakos, Harvard SEAS

Coupled fluid-soft-body interaction using the inverse-map technique into a direct numerical flow simulator built on the Cubism library with Adaptive Mesh Refinement. Parametrized swimmer gait with neural spline knots and trained swimming behavior via reinforcement learning over muscle actuation. [Code](https://github.com/YYXLN/CUP2D)

### Wasserstein Learning of Generative Models

Apr - May 2021 · MIT 6.838 Shape Analysis

Built WGAN-GP from scratch, validated its tractable loss and a Monge-map construction, and benchmarked against W2GAN on MNIST and CIFAR-10.

### Realtime Snow Simulation and Rendering (C++)

Nov - Dec 2020 · MIT 6.837 Computer Graphics · Course project contest runner-up

Simulated snow with the moving-least-squares material point method (MLS-MPM) and rendered in real time.

### Auto-differentiation Package (C++)

Oct - Dec 2020

Implemented automatic differentiation in forward and reverse modes, including expression-graph construction and derivative transforms. [Code](https://github.com/CS107-off-piste/cs107-FinalProject)

## Teaching

Teaching Assistant - CS 205: Computing Foundations for Computational Science (HPC / HTC), Harvard GSAS · Spring 2022

## Research Interests

Reinforcement pretraining and verifiable rewards; test-time compute and search-guided self-improvement; predictive representations and encoder compression; inverse RL for alignment; discrete flows and non-autoregressive generation; IO and data movement in architecture design.

## Skills

**Methods:** RL post-training (GRPO / PPO / DPO), inverse RL, MCTS and search, speculative decoding, test-time training, flow matching, reward modeling.

**Training and inference:** PyTorch, JAX, Megatron-LM, DeepSpeed, FSDP, verl, vLLM.

**GPU and communication:** CUDA, ROCm, Triton; NCCL, NIXL, RDMA (RoCE), MPI.

**Languages and infrastructure:** C/C++, Python, Go, Julia; Linux, Kubernetes, Slurm, Git.
