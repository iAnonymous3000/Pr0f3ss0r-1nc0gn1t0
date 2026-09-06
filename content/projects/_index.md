---
date: "2026-03-04"
title: "Projects"
description: "Selected software projects, open-source contributions, and practical security guides."
---

I work on software and educational resources that help people examine privacy risks and make informed security decisions.

## Selected work

### Site Behavior Lab

An open-source project for inspecting what a website does during an automated browser visit: network requests, third-party connections, cookies, storage, browser API use, and consent behavior. Reports include recorded evidence and the conditions of the visit. Findings need to be interpreted within the project's published coverage and limitations.

[Project and methodology](https://github.com/iAnonymous3000/site-behavior-lab) · [Website](https://sitebehavior.org/)

### Trace

A Rust and WebAssembly tool for checking iPhone sysdiagnose archives against known spyware indicators in the browser. Its coverage is limited; a scan cannot establish that a device is free of compromise.

[Project and limitations](https://github.com/iAnonymous3000/tracescan)

### Metadata Remover

A browser-based tool for inspecting and removing structural metadata from supported images, documents, audio, and video. It does not remove sensitive information visible in the content itself.

[Project and supported formats](https://github.com/iAnonymous3000/metadata-remover)

### QRWarden

A pre-release QR inspector that shows decoded content and URL properties before opening a destination. It does not certify that a link is safe.

[Project and release status](https://github.com/iAnonymous3000/qrwarden)

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

The collection below includes system-hardening guides, security checklists, and curated privacy resources. Scholarly publications are listed separately on the [Research page]({{< relref "/research/_index.md" >}}).
