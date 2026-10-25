---
title: "Maple"
description: "Cloud AI chat and a local OpenAI-compatible proxy with public code and documented enclave attestation"
date: 2026-10-25T00:00:00-07:00
draft: false
image: "/images/tools/maple-logo.svg"
linkToTool: "https://maple.ai/"
statusLabels:
  - "TEE hardware trust model"
  - "No audit published"
  - "Metadata collection disclosed"
---

Maple provides cloud AI chat and a local proxy for tools that support OpenAI Chat Completions. Maple documents a design that encrypts prompts on your device and decrypts them inside confidential-computing infrastructure.

What it offers:

- Chat through the web app and apps for iPhone, Android, macOS, Windows, and Linux. Ubuntu 24.04+ is the officially supported Linux target.
- Client verification of an AWS Nitro enclave before creating an encrypted session. Maple says failed attestation prevents the session from being established.
- Public client, SDK, proxy, and OpenSecret backend code, with enclave build instructions and signed software-measurement histories.
- A local proxy that verifies the enclave and encrypts requests to Maple, allowing compatible tools to use its hosted models.

Limits:

- The documented trust boundary includes TEE hardware, Maple's approved software measurements and signing key, and the model provider's enclave. Maple says your client checks its enclave, which checks the model's enclave. Matching an approved measurement does not establish that the software matches the public source. That requires rebuilding and comparing measurements separately.
- The browser verifier is delivered by Maple when the page loads. For greater control over the client code, review the desktop app or build the proxy from source.
- Maple's security page says it has not yet been audited. Public source and attestation do not replace an independent security audit; a planned SOC 2 audit is not a completed assessment of its inference security.
- Its privacy policy permits account and payment information, IP and device information, usage data, and API request counts, timestamps, and error logs. Conversation encryption does not provide anonymity.
- Traffic from your tool to the local proxy is plaintext. Keep it bound to loopback on your own machine unless you separately protect that connection.

As of October 25, 2026, Maple lists a free plan, Pro at US$20/month, Max at US$100/month, and Team at US$30/user/month. API access requires a paid plan, and Maple lists model-specific API rates separately from subscription prices. Check current rates and included usage before paying.

**Review scope (October 25, 2026):** Public documentation and repository inspection. I have not independently rebuilt Maple's enclave image or validated a live inference session. Data-collection statements here describe the published policy, rather than measured network behavior.

Sources: [Security model and verification limits](https://maple.ai/proof), [public source](https://github.com/MaplePrivacyLabs/Maple), [proxy setup and connection boundaries](https://maple.ai/docs/proxy), [privacy policy](https://maple.ai/privacy), [platform support](https://maple.ai/downloads), and [pricing](https://maple.ai/pricing).

Logo: official [Maple app icon](https://maple.ai/brand/maple-app-icon.svg), used without modification under Maple's [brand guidelines](https://maple.ai/brand).
