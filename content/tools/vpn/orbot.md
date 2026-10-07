---
title: "Orbot"
description: "Route mobile app traffic through Tor, with bridges and Android app selection"
date: 2026-10-06T00:00:00-07:00
draft: false
image: "/images/tools/orbot-logo.png"
linkToTool: "https://orbot.app/"
recommendationLabel: "Tor routing"
aliases:
  - /tools/tor-circumvention/orbot/
statusLabels:
  - "Apps can still identify you"
  - "iOS reliability limits"
---

Orbot is a free, open-source app from Guardian Project that routes app connections through the Tor network. It is available on Android and iOS, with VPN-style routing and proxy features for using Tor beyond a web browser. The Apple project also provides a macOS version.

What it offers:

- Android app selection, so you can choose which apps use Tor
- Access to onion services through Tor
- Tor bridges to help connect on networks that block Tor
- Official downloads through Google Play, Guardian Project's F-Droid repository, and Apple's App Store

Orbot's privacy policy says it does not directly collect user activity or use third-party analytics beyond what Google Play itself tracks. This is the developer's stated policy, not an independent verification of every build or distribution channel.

Limits:

- Routing through Tor does not remove identifying information from an app. Account logins, location permissions, and other device or app data can still identify you.
- For anonymous web browsing, prefer [Tor Browser]({{< relref "/tools/browsers/tor-browser" >}}) where available. A regular browser routed through Orbot does not gain Tor Browser's fingerprinting and tracking protections.
- Tor connections can be slower, and some services may block them. Orbot's routing network is Tor, rather than a conventional VPN provider.
- The official FAQ documents memory-related restarts and disconnections on iOS. Apple releases include memory improvements and crash fixes, but those changes do not establish reliability on every device. Check the current release notes and confirm that routing works for the apps you need.

Sources:

- [Features and platform support](https://orbot.app/en/)
- [Official downloads](https://orbot.app/en/download/)
- [App identification and privacy limits](https://orbot.app/en/about/)
- [Privacy policy](https://orbot.app/en/privacy-policy/)
- [Connection speed, bridges, and iOS limitations](https://orbot.app/en/faqs/)
- [Tor Project guidance on using other browsers](https://support.torproject.org/tor-browser/security/using-tor-with-other-browsers/)
- [Android source and releases](https://github.com/guardianproject/orbot-android)
- [Apple platform support](https://github.com/guardianproject/orbot-apple)
- [Apple source and releases](https://github.com/guardianproject/orbot-apple/releases)

Logo: official [Orbot Apple app icon](https://github.com/guardianproject/orbot-apple/blob/4c40ec4141dda0cf7f8133599287ec9f2c3e4268/Shared/Assets.xcassets/App%20Icons/AppIcon.appiconset/orbot-ios-1024.png), used without modification. The Apple project [identifies the artwork](https://github.com/guardianproject/orbot-apple/blob/4c40ec4141dda0cf7f8133599287ec9f2c3e4268/README.md#author-license) as originating from Orbot Android under its [BSD-3 license](https://github.com/guardianproject/orbot-android/blob/master/LICENSE), copyright 2009–2026 Nathan Freitas, The Guardian Project. The artwork's BSD-3 notice and the Apple project's MIT notice, copyright 2018–2026 iCepa Contributors and Guardian Project, are [distributed alongside the icon]({{< relurl "images/tools/orbot-logo.license.txt" >}}).
