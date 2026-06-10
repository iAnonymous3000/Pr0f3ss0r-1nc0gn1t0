---
title: "Mullvad DNS"
description: "No-logging encrypted DNS with simple optional blocking filters"
date: 2026-05-04T00:00:00-07:00
draft: false
image: "/images/tools/mullvad-dns-logo.png"
linkToTool: "https://mullvad.net/en/help/dns-over-https-and-dns-over-tls"
recommendationLabel: "Strict privacy pick"
weight: 20
---
Mullvad DNS is a public encrypted DNS service from Mullvad. It supports DNS over HTTPS and DNS over TLS, works even for non-Mullvad VPN customers, and offers several simple blocking presets.

Why it is included:

- Strong no-logging posture
- Simple encrypted DNS service with no account required
- Optional blocking presets for ads, trackers, malware, adult content, gambling, and social media
- Good fit for users who value privacy minimization over dashboard customization

Recommended setup:

- No filtering:
  - DoT hostname: dns.mullvad.net
  - DoH: https://dns.mullvad.net/dns-query
- Ads plus trackers:
  - DoT hostname: adblock.dns.mullvad.net
  - DoH: https://adblock.dns.mullvad.net/dns-query
- Ads plus trackers plus malware:
  - DoT hostname: base.dns.mullvad.net
  - DoH: https://base.dns.mullvad.net/dns-query
- Maximum preset:
  - DoT hostname: all.dns.mullvad.net
  - DoH: https://all.dns.mullvad.net/dns-query

Tradeoffs:

- Preset filters are useful, but this is not a full dashboard-based filtering product
- If you already use Mullvad VPN, prefer the VPN tunnel's DNS unless there is a specific reason to override it
- Encrypted DNS helps against on-path DNS snooping, but it does not make browsing anonymous

Verdict:

Use Mullvad DNS when the priority is a clean, no-logging encrypted resolver with simple optional filters.

Sources:

- https://mullvad.net/en/help/dns-over-https-and-dns-over-tls
- https://mullvad.net/en/help/no-logging-data-policy
- https://mullvad.net/en/help/all-about-dns-servers-and-privacy
