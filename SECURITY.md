# Security policy

## Report a vulnerability

Report vulnerabilities affecting this repository or its deployed website through [GitHub private vulnerability reporting](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/security/advisories/new). Keep exploit details, credentials and personal information out of public issues and pull requests.

For anonymous tips, use the Hush Line option on the [contact page](https://profincognito.me/contact/). It is a one-way channel, so it does not support a direct response. The current reporting routes are also listed in [security.txt](https://profincognito.me/.well-known/security.txt).

A useful report includes:

- The affected URL, file or component and revision, if known.
- Reproduction steps and a minimal proof of concept.
- Expected behavior, observed behavior and practical impact.
- Relevant logs or screenshots with sensitive data removed.

This is a personal project. Review and responses are best effort; there is no guaranteed acknowledgment or resolution deadline. Coordinated disclosure and researcher credit can be discussed through the private report.

## Repository context

The repository contains Hugo content, theme overrides, browser-side JavaScript, static assets and deployment configuration. The primary site is hosted on Cloudflare Pages, with a GitHub Pages mirror. Hosting settings can affect behavior beyond what is represented in the repository.

Security reports should identify the affected component and explain realistic impact. Automated findings need enough evidence to reproduce and assess the issue.

## Maintenance checks

GitHub CodeQL, Dependabot, secret scanning and push protection are enabled for the repository. The Pages workflow verifies the Hugo archive checksum before building. These checks support maintenance; they do not establish that every change has been audited or that the deployed site is free of vulnerabilities.

See [the deployment workflow](.github/workflows/gh-pages.yml) and [Dependabot configuration](.github/dependabot.yml) for the checks and update schedule maintained in source.
