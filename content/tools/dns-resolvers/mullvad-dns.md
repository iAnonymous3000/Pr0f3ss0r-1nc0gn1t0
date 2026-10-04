---
title: "Mullvad DNS"
description: "Public encrypted DNS scheduled to shut down on November 2, 2026; migrate to another resolver"
date: 2026-05-04T00:00:00-07:00
draft: false
image: "/images/tools/mullvad-dns-logo.png"
linkToTool: "https://mullvad.net/en/help/dns-over-https-and-dns-over-tls"
hideFromToolsCards: true
statusLabels:
  - "Shutdown scheduled: November 2, 2026"
weight: 20
---
**Mullvad is retiring its public encrypted DNS service on November 2, 2026.** It has been removed from the directory recommendations because users need to migrate before that date. This page remains available for existing links and migration guidance.

Mullvad [announced the shutdown on September 3, 2026](https://mullvad.net/en/blog/2026/9/3/shutting-down-our-public-encrypted-dns-servers-and-sponsoring-quad9-instead) and advises users to switch before the shutdown date. The retirement covers the standalone public DNS-over-HTTPS and DNS-over-TLS service. Mullvad VPN continues to use its separate internal DNS.

Migration:

- Replace manually configured Mullvad public DNS endpoints before November 2, 2026. Mullvad recommends [Quad9](https://docs.quad9.net/); see the local [Quad9 notes]({{< relurl "tools/dns-resolvers/quad9/" >}}).
- Mullvad Browser users with the default or included ad-blocking DoH setting will be migrated automatically to Quad9. Custom DoH settings require manual changes.
- Existing Mullvad DoH profiles on iOS and macOS will stop working; replace those profiles using the Quad9 guides.

Sources:

- [Shutdown announcement and migration guidance](https://mullvad.net/en/blog/2026/9/3/shutting-down-our-public-encrypted-dns-servers-and-sponsoring-quad9-instead)
- [Public encrypted DNS guide and retirement notice](https://mullvad.net/en/help/dns-over-https-and-dns-over-tls)
