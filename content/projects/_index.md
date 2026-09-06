---
date: "2026-03-04"
title: "Security and Privacy Projects"
description: "Security and privacy projects by Sooraj Sathyanarayanan: browser tooling, local forensic analysis, accepted open-source contributions and release verification."
---

I build tools and educational resources that help people inspect software behavior, examine privacy risks and make informed security decisions. My work includes browser release review, automated privacy analysis, local forensic tools and contributions to existing open-source projects.

[Browser tooling](#browser-tooling) · [Local analysis tools](#local-analysis-tools) · [Open-source contributions](#open-source-contributions) · [Guides and resources](#guides-and-resources)

## Browser tooling

### Brave Nightly Change Tracker

My work at Brave includes developing tooling for reviewing Brave Nightly changes. The public tracker organizes merged pull requests from `brave/brave-core` into a searchable review queue, with filters for separating relevant changes from routine maintenance.

[Public review interface](https://brave-experiments.github.io/nightly-tracker/)

### Site Behavior Lab

An open-source project for inspecting what a website does during an automated browser visit: network requests, third-party connections, cookies, storage, browser API use, and consent behavior.

Reports connect findings to recorded evidence and disclose the browser and scan conditions. This makes the observation available for inspection alongside its interpretation. A scan describes one visit under particular conditions; findings need to be interpreted within the project's published coverage and limitations.

[Project and methodology](https://github.com/iAnonymous3000/site-behavior-lab) · [Website](https://sitebehavior.org/)

## Local analysis tools

### Trace

A Rust and WebAssembly tool for checking iPhone sysdiagnose archives against known spyware indicators in the browser. Archive parsing, indicator matching and report assembly run locally in the browser tab. The reports distinguish findings from incomplete coverage.

Trace is an initial triage tool with limited coverage. A scan cannot establish that a device is free of compromise or replace expert mobile forensics.

[Project and limitations](https://github.com/iAnonymous3000/tracescan) · [Browser application](https://tracescan.pages.dev/)

### Metadata Remover

A browser-based tool for inspecting and removing structural metadata from supported images, documents, audio, and video. Processing uses WebAssembly in a browser worker; cleaned files are checked again before download.

It does not remove sensitive information visible in the content itself. Format support and retained metadata need to be considered when sharing the result.

[Project and supported formats](https://github.com/iAnonymous3000/metadata-remover) · [Browser application](https://ianonymous3000.github.io/metadata-remover/)

### QRWarden

A pre-release QR inspector that shows decoded content and observable URL properties before the user acts on them. Inspection runs in the browser without visiting the decoded destination. It does not certify that a link is safe, and the project is not yet supported for production use.

[Project and release status](https://github.com/iAnonymous3000/qrwarden)

## Open-source contributions

The records below document accepted code contributions, release verification and project acknowledgements.

### Ente PrivacyPack contributions

I contributed support for selecting multiple privacy alternatives per category and improvements to the mobile builder and export layout. These code changes were integrated into the project in April–May 2026.

[Multiple alternatives](https://github.com/ente/privacypack/commit/699a15f06a3cb536bd5d5ce3dff53a69275c0c5b) · [Mobile builder and export layout](https://github.com/ente/privacypack/commit/0df66820147544a557184d8aaf2a18bc1187ebde)

I also contributed response-header hardening, Next.js and OpenNext runtime updates, catalog validation, and browser checks.

[Response headers and runtime updates](https://github.com/ente/privacypack/commit/c21ac259e5c6b114cb2884a66393efc6f928a352) · [Catalog validation and browser checks](https://github.com/ente/privacypack/commit/a251b32c1b65ea5dd56faa269ea60e79ec5819eb)

### SimpleX server release v6.3.1

I independently reproduced the build for SimpleX server release v6.3.1. The official release, published March 22, 2025, acknowledges my contribution and includes my checksum signature.

[Official release acknowledgement](https://github.com/simplex-chat/simplexmq/releases/tag/v6.3.1) · [Published checksum signature](https://github.com/simplex-chat/simplexmq/releases/download/v6.3.1/_sha256sums_ss.asc)

### Bitwarden security guide

A practical guide to securing a Bitwarden account. Bitwarden linked to the guide and named me in its February 2025 community spotlight.

[Bitwarden spotlight and guide link](https://bitwarden.com/resources/feb-2025-spotlight-just-released-bitwarden-security-readiness-kit/)

### Hush Line

I contributed DevSecOps work to Hush Line, an open-source whistleblowing platform. The project's draft whitepaper includes an acknowledgement of my contribution.

[Project](https://hushline.app/) · [Acknowledgements, page 39](https://hushline.app/assets/files/draft-whitepaper.pdf#page=39)

## Guides and resources

The collection below includes system-hardening guides, security checklists, and curated privacy resources. Start with the [GitHub hardening guide]({{< relref "/projects/github-hardening-guide.md" >}}), [iOS hardening guide]({{< relref "/projects/ios-hardening-guide.md" >}}), or [penetration-testing checklist]({{< relref "/projects/pentest-checklist.md" >}}).

See my [research publications]({{< relref "/research/_index.md" >}}#publications) for scholarly work, and [About page]({{< relref "/about/index.md" >}}) for professional background and independent coverage.
