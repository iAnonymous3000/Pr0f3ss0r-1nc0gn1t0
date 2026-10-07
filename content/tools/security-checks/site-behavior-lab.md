---
title: "Site Behavior Lab"
description: "Inspect website requests, cookies, and browser signals from one controlled visit"
date: 2026-10-06T00:00:00-07:00
draft: false
image: "/images/tools/site-behavior-lab-logo.svg"
linkToTool: "https://sitebehavior.org/"
statusLabels:
  - "One visit per condition"
  - "No published detector accuracy"
---

Site Behavior Lab visits a public website in controlled Chromium and connects its findings to recorded evidence. I develop Site Behavior Lab.

What it offers:

- Request logs, third-party service labels, cookie records, storage keys, and browser API signals, with scan conditions and missing coverage disclosed
- Checks for fingerprint-like behavior, session-replay signals, synthetic input transmission, CNAME-cloaked services, and privacy-policy statements that conflict with recorded observations
- Paired visits for Global Privacy Control, consent choices, or a Brave Shields filter-list simulation; the simulation uses Chromium rather than a live Brave browser
- Evidence exports as JSON, CSV bundles, and printable PDF, plus a public report library and correction history
- Free, open-source software under AGPL-3.0-or-later, with local and self-hosted options

Limits:

- Each report describes one automated visit per condition. Region, browser, login state, bot detection, consent, time, and incomplete capture can change the result. A failed load is not a clean result.
- Detectors have no published precision or recall for the current release. Findings require independent corroboration and do not establish a site's overall privacy or legal compliance.
- The hosted scanner receives the target address and options. Live share reports expire under its retention policy; the curated public corpus follows separate rules. Cloudflare provides hosting and abuse checks, processing your IP for those checks. Use public URLs and review the data-handling policy before scanning.

Sources:

- [Methodology and measurement limits](https://sitebehavior.org/methodology/)
- [Service catalog, detector validation, and calibration status](https://sitebehavior.org/catalog/)
- [Privacy and data handling](https://sitebehavior.org/privacy/)
- [Source and self-hosting instructions](https://github.com/iAnonymous3000/site-behavior-lab)

Logo: official [Site Behavior Lab app icon](https://github.com/iAnonymous3000/site-behavior-lab/blob/main/app/icon.svg), used without modification.
