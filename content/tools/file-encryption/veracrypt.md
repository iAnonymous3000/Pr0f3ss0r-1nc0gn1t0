---
title: "VeraCrypt"
description: "Free, open-source encrypted containers and storage volumes for Windows, macOS, and Linux"
date: 2026-10-04T00:00:00-07:00
draft: false
image: "/images/tools/veracrypt-logo.png"
linkToTool: "https://veracrypt.io/en/Home.html"
weight: 20
statusLabels:
  - "System encryption: Windows only"
---

VeraCrypt creates encrypted containers that mount as virtual disks, or encrypts storage partitions and devices such as USB drives. It encrypts the filesystem inside a volume, including file contents and names.

What stands out:

- Free desktop software for Windows, macOS, and Linux
- Read and write files through a mounted volume with on-the-fly encryption
- Windows system-drive encryption with pre-boot authentication

Tradeoffs:

- System-drive encryption is Windows-only. macOS requires a compatible FUSE installation; the downloads page recommends FUSE-T for Apple silicon.
- Mounted files are accessible to applications and malware on that computer. Apps and the operating system may leave unencrypted temporary files or usage records elsewhere.
- There is no provider password reset. Protect passwords/keyfiles and maintain separate backups before changing or encrypting a drive.

Sources:

- [Features](https://veracrypt.io/en/Home.html)
- [Downloads and macOS requirements](https://veracrypt.io/en/Downloads.html)
- [FAQ and recovery limitations](https://veracrypt.io/en/FAQ.html)
- [Data leaks](https://veracrypt.io/en/Data%20Leaks.html) and [malware precautions](https://veracrypt.io/en/Malware.html)

Logo: official icon from [VeraCrypt](https://veracrypt.io/en/VeraCrypt128x128.png), used without modification.
