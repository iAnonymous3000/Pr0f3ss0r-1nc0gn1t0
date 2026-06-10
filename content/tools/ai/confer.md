---
title: "Confer"
description: "Open-source AI assistant with TEE inference and verifiable remote attestation"
date: 2026-06-09T00:00:00-07:00
draft: false
image: "/images/tools/confer-logo.png"
linkToTool: "https://confer.to"
recommendationLabel: "Strongest verifiability pick"
statusLabels:
  - "TEE hardware trust model"
  - "Limited free tier"
---
Confer is a private AI assistant created by Moxie Marlinspike, founder of Signal, and publicly introduced in December 2025. Key points include:

- Chat history is encrypted with passkey-derived keys that Confer says never leave your devices.
- Inference runs inside a Trusted Execution Environment, with prompts encrypted from the device into the TEE using Noise.
- The client verifies remote attestation before sending prompts.
- Measurements cover the root filesystem with dm-verity.
- The proxy and image builds use nix and mkosi for reproducible outputs.
- Signed releases are published to a public Sigstore transparency log.
- Confer publishes public repositories for the confidential-computing image and proxy.
- The free guest plan has 20 messages per day and up to 5 saved chats.
- Membership is $34.99 per month for unlimited messages, unlimited chats, file attachments, folder file attachments, and a 2-day free trial.

The trust model is end-to-TEE, not classic end-to-end encryption. The operator is designed not to see prompts by default, but the trust boundary moves to TEE hardware, remote attestation, reproducible builds, and the transparency log. TEE side channels remain a risk class to evaluate separately.

The current primary docs do not publish a formal third-party security audit. Confer's attestation and reproducible-build path is continuous verifiability, not the same thing as an audit. The current docs also do not claim anonymous paid signup or anonymous payment, so treat the paid tier as identifying until Confer documents otherwise.

Use Confer when the prompts themselves are sensitive and you still need cloud inference. Use Ensu when local-only inference is a better fit, and use Proton Lumo when Proton ecosystem integration matters more than inference-time confidentiality.

Sources: [About Confer](https://confer.to/about.md), [Private inference](https://confer.to/blog/2026/01/private-inference/), [passkey encryption](https://confer.to/blog/2025/12/passkey-encryption/), and [ConferLabs on GitHub](https://github.com/conferlabs/).
