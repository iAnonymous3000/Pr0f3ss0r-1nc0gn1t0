---
title: "Obscura VPN"
description: "Audited two-party VPN using Mullvad exits to split identity and traffic"
date: 2026-06-09T00:00:00-07:00
draft: false
image: "/images/tools/obscura-vpn-logo.svg"
linkToTool: "https://obscura.com"
recommendationLabel: "Cure53 audited"
statusLabels:
  - "iOS, macOS, Android"
weight: 15
---
Obscura VPN is a two-party VPN service launched in February 2025 with Mullvad as its exit-hop partner. Key points include:

- Obscura operates the entry hop and relays WireGuard packets it cannot decrypt.
- Mullvad operates the exit hop and does not see the user's connecting IP address.
- Users can compare the Obscura app's current exit-hop WireGuard public key with Mullvad's published server keys.
- Obscura uses WireGuard over QUIC so connections resemble HTTP/3 traffic.
- The account model uses randomized account numbers with no name, email, or phone number required.
- Payment options include credit card, Bitcoin Lightning, and Monero.
- The price is $8 per month.
- Current platform support includes iOS, macOS, Android, WireGuard configs, and Windows and Linux waitlists.

Cure53 audited Obscura's macOS app, network extension, and protocol in December 2025. Obscura says the audit found no major vulnerabilities within the defined threat model, and that the lower-severity issues were fixed. The audit writeup also describes memory-safe, statically typed implementation choices across TypeScript, Rust, and Swift.

The main caveats are jurisdiction, age, and correlation risk. Obscura is operated by Sovereign Engineering Inc. and its terms use New York law and venue. The two-party design is the mitigation: Obscura should not see decrypted traffic, and Mullvad should not see identity. It is still a young service. Compared with direct Mullvad, it reduces single-provider trust for modest extra cost and likely performance overhead. Compared with Tor, it is built for faster everyday VPN use, but Tor distributes trust across a larger circuit.

Use Obscura VPN when you want a VPN-like workflow but do not want one provider to see both your identity and traffic. Use Mullvad direct when simplicity, maturity, and cost matter more than the two-party trust split.

Sources: [Obscura](https://obscura.com), [Obscura pricing](https://obscura.com/pricing/), [Obscura audit post](https://obscura.com/blog/obscuras-first-audit/), [Obscura legal](https://obscura.com/legal/), and [Mullvad's partnership post](https://mullvad.net/en/blog/mullvad-partnered-with-obscura-vpn).
