---
date: "2026-03-04"
title: "Privacy Policy"
description: "Comprehensive privacy policy detailing our minimal data handling practices"
---

# Privacy Policy

## 1. Overview

This privacy policy explains how [profincognito.me](https://profincognito.me) ("the Website") handles data privacy and security. As a static website focused on security research and digital rights advocacy, we maintain minimal data collection while ensuring transparency about our practices.

## 2. Technical Infrastructure

### 2.1 Core Infrastructure
- **Static Website**: Built with [Hugo Extended](https://gohugo.io/)
- **Theme**: [WonderMod](https://github.com/Wonderfall/hugo-WonderMod) (Privacy-hardened fork of PaperMod)
- **Primary Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Mirror**: [GitHub Pages](https://pages.github.com/)
- **DNS & Security**: [Cloudflare](https://www.cloudflare.com/)

### 2.2 Privacy-First Architecture
We implement:
- No first-party analytics or tracking scripts in the site source
- No cookies
- No `localStorage` persistence for UI preferences
- Content images served locally from this domain
- No automatic third-party embeds
- A Content Security Policy that allows scripts only from this site
- Privacy-preserving contact methods (detailed in Section 5)

## 3. Data Collection

### 3.1 What We Don't Collect
We explicitly do not:
- Run site-owned analytics services
- Store personal data
- Use tracking cookies
- Maintain user accounts
- Process sensitive information
- Track individual users
- Store IP addresses

### 3.2 Cloudflare Services
Cloudflare provides infrastructure services including content delivery, DDoS protection, DNS resolution, and security enforcement. Cloudflare may collect standard server-side metrics, request metadata, and security telemetry as part of operating the CDN and protecting the site. Cloudflare Pages Analytics should remain disabled for this project; the repository-level Content Security Policy also blocks third-party analytics scripts. For details about Cloudflare's data handling, see [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy).

## 4. Security Measures

### 4.1 Security Headers
The primary Cloudflare Pages deployment uses repository-defined headers from `static/_headers`. The GitHub Pages mirror is subject to GitHub Pages' platform headers and may not expose the exact same policy set.

#### Basic Security Headers
- **X-Frame-Options**: `SAMEORIGIN` - Controls framing of our pages
- **X-Content-Type-Options**: `nosniff` - Prevents MIME type sniffing
- **X-XSS-Protection**: `0` - Disables legacy browser XSS filters in favor of CSP
- **Referrer-Policy**: `strict-origin-when-cross-origin` - Controls referrer information
- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload` - Enforces HTTPS
- **Content-Security-Policy**: `default-src 'self'` with scripts, images, fonts, and connections restricted to this site

#### Cross-Origin Policies
- **Embedder Policy**: `require-corp`
- **Opener Policy**: `same-origin`
- **Resource Policy**: `same-origin`

#### Permissions Policy
We explicitly disable unnecessary browser features including:
- Sensors (accelerometer, gyroscope, etc.)
- Media devices (camera, microphone)
- Location services
- Payment APIs
- Clipboard read access
- Picture-in-picture and autoplay
- Device APIs (USB, serial, etc.)

### 4.2 Infrastructure Security
- Static site architecture (minimal attack surface)
- Cloudflare's enterprise-grade security
- Regular security updates
- Automated deployment security checks

## 5. Communication Privacy

### 5.1 Secure Contact Methods

#### PGP
- Key available at: [https://profincognito.me/.well-known/pgp.txt](https://profincognito.me/.well-known/pgp.txt)
- Communications are end-to-end encrypted
- No data retention

### 5.2 Security Reports
For security-related communications:
- Submit via [GitHub Security Advisory](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/security/advisories/new) for public issues
- Use PGP for sensitive reports

## 6. External Links

Our website may contain links to external resources. We:
- Don't track outbound clicks
- Recommend reviewing third-party privacy policies
- Implement secure referrer policies

## 7. Source Code Transparency

Our website is open source:
- Code available on [GitHub](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0)
- Content licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Theme licensed under [MIT License](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/blob/main/LICENSE)

## 8. Changes to This Policy

We may update this privacy policy:
- To reflect infrastructure changes
- To improve clarity
- To address new privacy considerations
- With immediate effect upon posting

## 9. Technical Verification

Users can verify our privacy practices through:
- Inspecting our [open-source code](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0)
- Reviewing our security headers
- Monitoring network requests
- Auditing our build process

This policy reflects our commitment to transparency and minimal data collection.
