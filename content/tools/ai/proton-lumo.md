---
title: "Proton Lumo"
description: "AI assistant with zero-access encrypted chat history from Proton"
date: 2026-06-09T00:00:00-07:00
draft: false
image: "/images/tools/proton-lumo-logo.svg"
linkToTool: "https://lumo.proton.me"
recommendationLabel: "No account required"
statusLabels:
  - "Encrypts storage, not inference"
---
Proton Lumo is Proton's cloud AI assistant for web, iOS, and Android. Proton launched it in July 2025. Key points include:

- Saved chat history is protected with zero-access encryption. That is the cryptographic guarantee.
- Inference is different. Prompts are sent to Proton-controlled GPU servers, decrypted there, processed, and erased after the response.
- Proton says it keeps no logs of prompts or replies, does not store chat timestamps, IP addresses, or chat context, does not train on chats, and does not send data to third parties.
- That inference-time privacy is a policy and service-design guarantee, not TEE or remote-attestation confidentiality.
- Current models include Nemo, OpenHands 32B, OLMO 2 32B, GPT-OSS 120B, Qwen, Ernie 4.5 VL 28B, Apertus, and Kimi K2.
- The models run on servers Proton controls.
- Lumo can be used as a guest without a Proton Account.
- Ghost mode makes a logged-in chat disappear when the chat is closed.
- Lumo Plus adds unlimited chats and faster responses. Lumo for Business exists for teams.

The open-source boundary matters. Proton publishes the Lumo web client in its WebClients monorepo and released the iOS and Android app code with Lumo 1.1. Treat that as client transparency plus open-source model selection, not as a public server or inference stack.

Use Proton Lumo when you want cloud AI inside the Proton ecosystem, encrypted chat history, no account requirement for guest use, and European jurisdiction. Do not use it for threat models that require cryptographic confidentiality during inference. For that, use Confer for attested TEE inference or Ensu for local inference.

Sources: [Proton's launch post](https://proton.me/blog/lumo-ai), [Lumo security model](https://proton.me/blog/lumo-security-model), [Lumo privacy support](https://proton.me/support/lumo-privacy), [Lumo 1.1 open-source mobile note](https://proton.me/blog/lumo-1-1), and [Proton Lumo](https://proton.me/lumo).
