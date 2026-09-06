# Pr0f3ss0r 1nc0gn1t0

<a href="https://gohugo.io/">
  <img src="https://img.shields.io/badge/Hugo-0.160.1-blue?style=flat-square&logo=hugo" alt="Hugo Version">
</a>
<a href="https://pagespeed.web.dev/analysis/https-profincognito-me/l3b9r03hj6">
  <img src="https://img.shields.io/badge/PageSpeed-100%25-brightgreen?style=flat-square&logo=googlechrome" alt="PageSpeed Score">
</a>
<a href="https://internet.nl/site/profincognito.me/">
  <img src="https://img.shields.io/badge/internet.nl-97%25-brightgreen?style=flat-square" alt="Internet.nl Score">
</a>
<a href="https://www.ssllabs.com/ssltest/analyze.html?d=profincognito.me">
  <img src="https://img.shields.io/badge/SSL%20Rating-A+-brightgreen?style=flat-square" alt="SSL Rating">
</a>
<a href="https://hstspreload.org/?domain=profincognito.me">
  <img src="https://img.shields.io/badge/HSTS-Preloaded-brightgreen?style=flat-square" alt="HSTS Preload">
</a>
<a href="https://observatory.mozilla.org/analyze/profincognito.me">
  <img src="https://img.shields.io/badge/Mozilla%20Observatory-A%2B-brightgreen?style=flat-square&logo=mozilla" alt="Mozilla Observatory Score">
</a>
<a href="https://www.gnu.org/licenses/agpl-3.0">
  <img src="https://img.shields.io/badge/License-AGPL%20v3-blue.svg?style=flat-square" alt="AGPL License">
</a>
<a href="https://creativecommons.org/licenses/by-sa/4.0/">
  <img src="https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg?style=flat-square" alt="Content License">
</a>


A privacy-first personal site built with Hugo and the WonderMod theme. It publishes security research, digital-rights writing, chess analysis, and a curated tools directory for privacy-respecting software and services.

## Overview

[profincognito.me](https://profincognito.me) is designed as a fast static site with a minimal client-side footprint. The main sections are:

- Security, privacy, and digital-rights articles
- A searchable tools directory with category pages and individual notes
- Chess writing and analysis
- Contact, support, and site policy pages
- Static assets served locally where practical

## Tech Stack

- **Static site generator**: Hugo Extended 0.160.1+
- **Theme**: [WonderMod](https://github.com/Wonderfall/hugo-WonderMod), a privacy-hardened PaperMod fork
- **Primary hosting**: Cloudflare Pages
- **Mirror hosting**: GitHub Pages
- **DNS and edge security**: Cloudflare
- **Deployment**: Cloudflare Pages plus a GitHub Actions mirror workflow

## Features

- Responsive layouts for desktop and mobile
- Local client-side site search
- Searchable and filterable tools directory
- Base-path-safe asset handling for the GitHub Pages mirror
- Markdown image rendering that works across the primary domain and mirror
- Math rendering support where enabled in content
- RSS feeds and structured metadata

## Privacy and Security

Built with privacy-first principles:

- No first-party analytics or tracking scripts
- Content images are served locally from this domain
- No cookies
- No `localStorage` persistence for UI preferences
- No automatic third-party embeds
- Strong Content Security Policy via Cloudflare Pages `_headers`
- Security contact metadata under `/.well-known/security.txt`
- Privacy-preserving contact and support options

## Local Development

### Prerequisites

- Hugo Extended 0.160.1 or newer
- Git

### Run Locally

```bash
hugo server -D --disableFastRender
```

The local site is served from `http://localhost:1313/`.

### Production Build

```bash
hugo --ignoreCache --gc --minify --printPathWarnings
```

### Mirror Build Check

Use this before changing paths, images, or generated URLs that must work under the GitHub Pages project path.

```bash
hugo --ignoreCache --gc --minify \
  --baseURL "https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0/" \
  --destination public-mirror
```

## Deployment

The website is deployed to two platforms:

1. **Primary: Cloudflare Pages**
   - Build command: `hugo`
   - Public URL: [profincognito.me](https://profincognito.me)

2. **Mirror: GitHub Pages**
   - Workflow: [Deploy to GitHub Pages](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/actions/workflows/gh-pages.yml)
   - Downloads and verifies the Hugo release checksum before building
   - Publishes the generated static site to the `gh-pages` branch
   - Public URL: [ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0](https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0)

## Repository Notes

- `content/` contains posts, pages, chess notes, and tools entries.
- `layouts/` contains WonderMod overrides and custom rendering behavior.
- `assets/css/extended/` contains site-specific styling.
- `assets/js/` contains local JavaScript for search and tools filtering.
- `static/` contains copied-through files such as favicons, well-known files, and local images.

## Contributions

This is a personal website, but bug reports and security-minded improvements are welcome. Use GitHub Issues for general reports and the repository security advisory flow or listed contact channels for sensitive issues.

## License

- Website source code: [GNU Affero General Public License v3.0](LICENSE)
- Content and articles: [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Theme: MIT license through WonderMod
