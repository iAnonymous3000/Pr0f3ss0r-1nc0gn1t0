---
title: "Aegis Authenticator"
description: "Open-source Android authenticator with encrypted TOTP/HOTP vaults and local backups"
date: 2026-05-04T00:00:00-07:00
draft: false
image: "/images/tools/aegis-authenticator-logo.png"
linkToTool: "https://getaegis.app/"
recommendationLabel: "Best Android TOTP pick"
---
Aegis Authenticator is a free, open-source 2FA app for Android that stores one-time password tokens in an encrypted local vault. It supports both TOTP and HOTP, making it compatible with the same standard token format used by most websites and services.

Why it is included:

- Strong Android pick for local-first TOTP code storage
- Open source, with active development on [GitHub](https://github.com/beemdevelopment/aegis)
- Vault encryption with password and biometric unlock options
- Supports encrypted exports and automatic backups to a location you choose
- Available through Google Play and F-Droid

Tradeoffs:

- Android only, so iPhone users should use a different authenticator
- Local-first storage means backups matter; losing the phone without a backup can lock you out of accounts
- Cloud sync is not the default model, which is good for privacy but less convenient across multiple devices
- Like any authenticator app, it should be protected with a strong device lock and a secure vault password

Verdict:

Use Aegis when you want a trustworthy, open-source Android authenticator with encrypted local storage, portable backups, and no mandatory cloud account.

Sources:

- https://getaegis.app/
- https://github.com/beemdevelopment/aegis
