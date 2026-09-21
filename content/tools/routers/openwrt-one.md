---
title: "OpenWrt One"
description: "A Wi-Fi 6 router for people comfortable configuring their network and managing firmware updates."
date: 2026-09-21T00:00:00-07:00
draft: false
weight: 20
image: "/images/tools/openwrt-logo.png"
linkToTool: "https://sfconservancy.org/activities/openwrt-one.html"
recommendationLabel: "Hands-on alternative"
statusLabels:
  - "China-based hardware partner"
  - "You manage updates"
  - "Confirm seller warranty"
---

**OpenWrt One** suits people willing to configure their network, install updates, and troubleshoot problems. It [ships OpenWrt directly from the project](https://one.openwrt.org/sources/) and offers local control with documented recovery options.

## What you get

The [hardware documentation](https://openwrt.org/toh/openwrt/one) lists dual-band Wi-Fi 6, one 2.5 GbE Internet port, and one 1 GbE LAN port. The LAN connection to the router is limited to 1 Gb/s, even with a faster switch attached.

**Specifications verified; independent performance testing not established.** We have not established independent testing of the production model with a documented firmware version and configuration. Do not choose it on an assumption of gigabit VPN, intrusion prevention, or traffic-shaping performance.

## Local control and maintenance

You administer the router through [its local web interface or SSH](https://openwrt.org/docs/guide-quick-start/walkthrough_login), without a mandatory vendor cloud account. Set strong administrator and Wi-Fi passwords during setup.

OpenWrt [currently provides stable firmware for this model](https://openwrt.org/toh/hwdata/openwrt/openwrt_one_1). You are responsible for installing updates. [Attended Sysupgrade](https://openwrt.org/docs/guide-user/installation/attended.sysupgrade) can simplify this while preserving packages and settings; back up your configuration and read the upgrade instructions first. It requests a custom firmware image from a build server, so local administration does not mean every service operates offline.

The [recovery guide](https://one.openwrt.org/hardware/OpenWrtOne-HowTo.pdf) explains how to restore the system from a USB drive using separate recovery flash. Keep the instructions and a backup available before changing firmware.

No fixed security-support end date was established. The [project's support statement](https://lists.openwrt.org/pipermail/openwrt-devel/2024-January/042100.html) promises the same support level as other supported OpenWrt devices, without specifying a number of years.

## US buying and complete-system cost

[Software Freedom Conservancy](https://sfconservancy.org/activities/openwrt-one.html) advertises the router with a case from **\$125** and distinguishes official retailers from unofficial sellers. This is a starting price, not a verified delivered US total.

Before paying, confirm US delivery, the complete kit contents, a compatible US power supply and cable, Ethernet cables, shipping, tax, and any import charges. Wi-Fi is built in; budget for a switch if you need additional wired connections. No paid OpenWrt firmware subscription is required.

The project publishes [FCC grants for **2BLLI-HW24**](https://one.openwrt.org/hardware/certification/). Check that the purchased unit matches this identifier and use the US wireless country setting. US warranty duration, return destination, and replacement arrangements remain unverified; obtain those terms from the seller.

## Hardware origin

Conservancy identifies Banana Pi as the manufacturing collaborator. [Banana Pi's company documentation](https://www.banana-pi.com/en/bpi-team/) places its headquarters and factory in China. OpenWrt One therefore does not satisfy a requirement to avoid China-based hardware partners.
