---
title: "Cloudflare 1.1.1.1"
description: "Fast public DNS resolver with encrypted DNS and privacy commitments"
date: 2026-05-04T00:00:00-07:00
draft: false
image: "/images/tools/cloudflare-1111-logo.png"
linkToTool: "https://one.one.one.one/"
recommendationLabel: "Fast mainstream resolver option"
weight: 30
---
Cloudflare 1.1.1.1 is a widely used public DNS resolver focused on speed, availability, and encrypted DNS support. It is a good mainstream option, especially for users who want simple setup and strong performance.

Why it is included:

- Very easy to configure across routers, browsers, and operating systems
- Supports DNS over HTTPS and DNS over TLS
- Offers optional Families variants for malware blocking and malware plus adult-content blocking
- Cloudflare documents commitments not to sell or use Public Resolver personal data for ad targeting and to delete limited public resolver logs within 25 hours

Recommended setup:

- Standard resolver:
  - IPv4: 1.1.1.1 and 1.0.0.1
  - IPv6: 2606:4700:4700::1111 and 2606:4700:4700::1001
  - DoH: https://cloudflare-dns.com/dns-query
  - DoT: one.one.one.one
- Malware blocking:
  - IPv4: 1.1.1.2 and 1.0.0.2
  - IPv6: 2606:4700:4700::1112 and 2606:4700:4700::1002
  - DoH: https://security.cloudflare-dns.com/dns-query
  - DoT: security.cloudflare-dns.com
- Malware plus adult-content blocking:
  - IPv4: 1.1.1.3 and 1.0.0.3
  - IPv6: 2606:4700:4700::1113 and 2606:4700:4700::1003
  - DoH: https://family.cloudflare-dns.com/dns-query
  - DoT: family.cloudflare-dns.com

Tradeoffs:

- This is listed as Cloudflare 1.1.1.1, not just Cloudflare, to avoid confusing it with the separate Domain & Hosting entry
- Best framed as the fast mainstream option, not the strictest privacy-minimization option
- Cloudflare's model relies on privacy commitments, audits, and short retention rather than a pure no-logs posture
- Avoid treating this as Cloudflare WARP or a VPN; this entry is only for the public DNS resolver
- Encrypted DNS protects the DNS lookup in transit, but it does not make browsing anonymous

Verdict:

Use Cloudflare 1.1.1.1 when performance, broad compatibility, and easy setup matter. Prefer Quad9 or Mullvad DNS when strict privacy minimization is the top priority.

Sources:

- https://developers.cloudflare.com/1.1.1.1/
- https://developers.cloudflare.com/1.1.1.1/privacy/public-dns-resolver/
- https://developers.cloudflare.com/1.1.1.1/setup/
- https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-tls/
- https://developers.cloudflare.com/1.1.1.1/encryption/dns-over-https/make-api-requests/
