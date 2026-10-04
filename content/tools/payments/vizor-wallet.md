---
title: "Vizor Wallet"
description: "Open-source, self-custody Zcash wallet for shielded ZEC on mobile and desktop"
date: 2026-10-04T00:00:00-07:00
draft: false
image: "/images/tools/vizor-wallet-logo.png"
linkToTool: "https://vizor.cash/"
statusLabels:
  - "Formal audit planned"
---

Vizor Wallet is a self-custody Zcash wallet from the team behind Keplr, with public [source code](https://github.com/chainapsis/vizor-wallet) and apps for iOS, Android, macOS, Windows, and Linux.

What stands out:

- Receive to shielded Unified Addresses or transparent addresses, shield incoming transparent funds, and send from a shielded balance
- Multiple accounts, contacts, and memos for shielded recipients
- Preset or custom lightwalletd endpoints for wallet synchronization
- Keystone hardware-wallet support with QR signing
- Optional cross-chain swaps through NEAR Intents

Tradeoffs:

- The [official website](https://vizor.cash/) says a formal third-party audit is planned. Review the current audit status before relying on it.
- Transparent Zcash addresses and transactions are public on chain. Shielded transactions protect transaction details, while network service providers may still see your IP address, request timing, and transaction broadcast data.
- Swaps involve third-party services and other blockchains with their own privacy properties.
- Recovery depends on keeping your secret recovery phrase safe. The local app password protects access on that device.

The [privacy policy](https://vizor.cash/privacy-policy.html) says wallet data stays on your device and the app uses no analytics, advertising, or crash-reporting SDKs. It also explains the metadata exposed to network endpoints and the information shared when contacting support.

Sources:

- [Official website and downloads](https://vizor.cash/)
- [Source code and wallet behavior](https://github.com/chainapsis/vizor-wallet)
- [Privacy policy](https://vizor.cash/privacy-policy.html)

Logo: official app icon from [vizor.cash](https://vizor.cash/icon.png).
