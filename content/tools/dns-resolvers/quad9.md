---
title: "Quad9"
description: "Nonprofit DNS resolver with malware blocking and strong no-IP-logging privacy policy"
date: 2026-05-04T00:00:00-07:00
draft: false
image: "/images/tools/quad9-logo.svg"
linkToTool: "https://quad9.net/"
recommendationLabel: "Best default pick"
tags:
  - DNS
  - Encrypted DNS
  - Malware Blocking
  - Nonprofit
  - DNSSEC
---
Quad9 is a nonprofit public DNS resolver focused on security and privacy. Its recommended service blocks malicious domains, validates DNSSEC, and avoids EDNS Client Subnet by default.

Why it is included:

- Strong daily-driver pick for privacy plus malware protection
- Explicit privacy policy: Quad9 says it does not collect or record IP addresses and does not correlate IPs with DNS query data
- No account or dashboard required
- Good default for routers, operating systems, and browsers that support custom DNS

Recommended setup:

- IPv4: 9.9.9.9 and 149.112.112.112
- IPv6: 2620:fe::fe and 2620:fe::9
- DoH: https://dns.quad9.net/dns-query
- DoT: dns.quad9.net

Tradeoffs:

- Malware blocking can occasionally create false positives
- It is not customizable like dashboard-based filtering resolvers
- Encrypted DNS protects the DNS lookup in transit, but it does not make traffic anonymous

Verdict:

Use Quad9 when you want a simple, trustworthy default resolver with strong privacy posture and useful security blocking.

Sources:

- https://quad9.net/privacy/policy/
- https://quad9.net/service/service-addresses-and-features/
