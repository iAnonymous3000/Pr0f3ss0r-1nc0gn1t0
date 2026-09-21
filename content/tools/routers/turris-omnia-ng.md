---
title: "Turris Omnia NG"
description: "Provisional research note: US purchasing, radio authorization, and warranty details remain unverified."
date: 2026-09-21T00:00:00-07:00
draft: false
weight: 40
hideFromToolsCards: true
image: "/images/tools/router.svg"
recommendationLabel: "Provisional — US details unverified"
statusLabels:
  - "Not a US purchase recommendation"
  - "Specifications verified; independent performance testing not established"
---

**Turris Omnia NG remains provisional and is not a US purchase recommendation.** Its documented features merit further research, but the purchasing, radio-authorization, and warranty details needed for a US recommendation are not established.

## Exact model and US readiness

The [manufacturer's manual, hosted by a distributor](https://download.discomp.cz/Turris/Manuals/Turris_Omnia_NG_User_manual.pdf), identifies the Wi-Fi-equipped **RTROM04-NG**, distinct from **RTROM04-NGW** (NG Wired). This does not identify a US-approved variant. Older Omnia and Omnia Wi-Fi 6 approvals cannot establish this model's status.

| Requirement | Verified status |
| --- | --- |
| Authorized US seller and complete US price | Not established. The [launch announcement](https://www.nic.cz/page/4581/bezpecny-open-source-router-turris-omnia-ng-je-v-prodeji/) identifies a Czech purchasing route. |
| FCC authorization | Not established for the exact finished Wi-Fi configuration. This is an evidence gap, not a finding that authorization does not exist. |
| US warranty process | Not established: warranty provider, return destination, shipping costs, and US coverage remain unverified. |
| Support channel | [Official email support](https://docs.turris.cz/basics/support/#turris-support) is available at tech.support@turris.cz for hardware and serious supported-software issues; it is not 24/7. No US-specific service arrangement was confirmed. |
| Current maintenance | [Turris OS 9.1.1](https://github.com/turris-cz/os-build/tags) includes a kernel security fix backported to Omnia NG. |
| Future security support | [Conditional commitment](https://docs.turris.cz/#updates) while Linux supports the hardware. No calendar support-until date or guaranteed remaining term was established. |

## Documented capabilities

The [hardware documentation](https://docs.turris.cz/hw/omnia-ng/omnia-ng/) specifies two 10 Gb/s SFP+ ports, four 2.5 Gb/s Ethernet ports, Wi-Fi 7 on 5/6 GHz, and Wi-Fi 6 on 2.4 GHz. These are interface specifications; they do not establish routed, VPN, IDS/IPS, or traffic-shaping throughput. **Specifications verified; independent performance testing not established.** We make no production-performance recommendation here.

Turris is a project of the Czech association CZ.NIC, which [states that this model is manufactured in the Czech Republic](https://www.nic.cz/page/4581/bezpecny-open-source-router-turris-omnia-ng-je-v-prodeji/). Component origins are not established by that claim.

Open-source Turris OS is based on OpenWrt, with [local setup](https://docs.turris.cz/basics/first-setup/omnia-ng/) and [root access](https://docs.turris.cz/#openness). Turris maintains its own releases. [Automatic updates](https://docs.turris.cz/basics/reforis/updates/reforis-updates/) are the documented default; [recovery options](https://docs.turris.cz/hw/omnia-ng/rescue-modes/) include signed internet recovery.

## Data collection

[CZ.NIC's disclosure](https://docs.turris.cz/basics/data-act/) distinguishes optional Sentinel reporting from software-update requests. Sentinel sends detected-attack metadata to CZ.NIC. Update requests transmit software version, hardware revision, and package information. Local administration does not imply zero vendor communication.

Leave [Sentinel reporting](https://docs.turris.cz/basics/sentinel/setup/) disabled if you do not want to contribute that data, while keeping security updates enabled. These are vendor-documented behaviors, not an independent audit of all outbound traffic.
