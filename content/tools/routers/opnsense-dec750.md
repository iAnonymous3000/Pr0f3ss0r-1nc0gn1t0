---
title: "OPNsense DEC750"
description: "Wired OPNsense gateway for experienced administrators. Requires separate Wi-Fi, managed updates, and an import budget."
date: 2026-09-21T00:00:00-07:00
draft: false
weight: 30
image: "/images/tools/opnsense-logo.png"
linkToTool: "https://shop.opnsense.com/product/dec750-opnsense-desktop-security-appliance/"
recommendationLabel: "Advanced wired gateway"
statusLabels:
  - "Made in the Netherlands"
  - "No built-in Wi-Fi"
---

**DEC750 is an advanced wired gateway** for readers comfortable configuring firewall rules, maintaining updates, and recovering a failed installation. Wi-Fi requires a separate access point.

Deciso's [brochure](https://shop.opnsense.com/wp-content/uploads/2023/09/Brochure_DEC700_V2.pdf) states that the appliance is made in the Netherlands; this does not establish every component's origin. [OPNsense](https://docs.opnsense.org/manual/install.html) provides local browser administration without a cloud account.

The [hardware specifications](https://shop.opnsense.com/product/dec750-opnsense-desktop-security-appliance/) list three 2.5 GbE ports and two 10 Gb/s SFP+ ports. **Specifications verified; independent performance testing not established.** Port speeds alone do not establish VPN, intrusion-prevention, or traffic-shaping performance.

## US purchase and a complete Wi-Fi setup

The [official shop](https://shop.opnsense.com/product/dec750-opnsense-desktop-security-appliance/) lists **€1,048**, including a power supply and matching cord. Select the US cord. It lists stock with possible dispatch delays and offers [US shipping](https://shop.opnsense.com/shipping-delivery/). This is a direct import; confirm the dollar charge, delivery cost, taxes, and import fees before buying.

For one Wi-Fi access point, add a [U6+ US model](https://store.ui.com/us/en/products/u6-plus) at **\$139 including the displayed surcharge** and a [15 W PoE adapter](https://store.ui.com/us/en/products/u-poe-af) at **\$8**. The merchandise estimate is **€1,048 plus \$147**; a complete delivered quote must also include cables, shipping, taxes, and import charges.

This example assumes existing ISP equipment and a compatible computer for [license-free local UniFi management](https://help.ui.com/hc/en-us/articles/34210126298775-Self-Hosting-UniFi). Budget for three Ethernet cables and any installation work; add a switch or more access points if needed. The [U6+ uplink is gigabit](https://techspecs.ui.com/unifi/wifi/u6-plus), so this example does not provide multi-gigabit Wi-Fi backhaul. The access point also needs its own firmware maintenance.

The [two-year warranty](https://www.deciso.com/terms-conditions/) requires authorized returns to Deciso in the Netherlands, with outbound shipping and transport risk paid by the customer. The appliance lists **FCC Part 15 Class A**. The [Class A notice](https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.105) warns of possible residential interference, a relevant home-use limitation.

## Updates and recurring costs

OPNsense has [active maintenance releases](https://docs.opnsense.org/releases/CE_26.7.html), but this review did not establish a promised DEC750 security-support end date. The hardware warranty is separate.

One year of Business Edition is included; [renewal costs €149/year](https://shop.opnsense.com/product/opnsense-business-edition/). [Community Edition is free](https://opnsense.org/) with no mandatory subscription. Paid support and commercial security feeds are optional extras. Review their data policies: [ET Pro Telemetry](https://docs.opnsense.org/manual/etpro_telemetry.html), for example, sends event and sensor information to Proofpoint.

You manage [firmware updates](https://docs.opnsense.org/manual/updates.html). Before upgrading, save a [password-protected configuration backup](https://docs.opnsense.org/manual/backups.html) off-device. Recovery can require [console access or USB reinstallation](https://docs.opnsense.org/manual/install.html), followed by restoring the backup; keep a computer and USB drive available.
