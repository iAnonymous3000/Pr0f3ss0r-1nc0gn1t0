---
title: "Cryptomator"
description: "Open-source vaults encrypt file contents and names before cloud sync; some metadata remains visible"
date: 2026-10-04T00:00:00-07:00
draft: false
image: "/images/tools/cryptomator-logo.png"
linkToTool: "https://cryptomator.org/"
weight: 10
statusLabels:
  - "Paid mobile write access"
---

Cryptomator encrypts files on your device before your chosen cloud service synchronizes them. Unlock a vault to work with its files through a virtual drive.

What stands out:

- Encrypts file contents and file/folder names, and obscures the directory structure
- Windows, macOS, Linux, Android, and iOS apps
- Free desktop encryption; mobile read-only access is free, with separate purchases for write access on Android and iOS

Tradeoffs:

- File sizes, timestamps, and file/folder counts remain visible to storage providers.
- Malware on your device can read an unlocked vault. Applications may leave unencrypted temporary or backup copies elsewhere.
- The security target documents an accepted risk: someone with write access to the vault can swap encrypted filenames within a directory without detection.
- Encryption does not provide versioned backups. Keep recovery information and separate backups safe.

Sources:

- [Security target and limitations](https://docs.cryptomator.org/security/security-target/)
- [Platform documentation](https://docs.cryptomator.org/)
- [Pricing and mobile licensing](https://cryptomator.org/pricing/)

Logo: Katharina Hagemann, [official press kit](https://cryptomator.org/presskit/), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), used without modification.
