# Sooraj Sathyanarayanan · profincognito.me

The source for my personal portfolio, security and privacy research, open-source work, and writing. Built with [Hugo](https://gohugo.io/) and [WonderMod](https://github.com/Wonderfall/hugo-WonderMod).

[Website](https://profincognito.me/) · [GitHub Pages mirror](https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0/) · [Google Scholar](https://scholar.google.com/citations?user=NwIwfYkAAAAJ) · [RSS](https://profincognito.me/index.xml)

[![GitHub Pages deployment](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/actions/workflows/gh-pages.yml)

## Explore

| Section | What you will find |
| --- | --- |
| [About](https://profincognito.me/about/) | Background, experience and research interests |
| [Research](https://profincognito.me/research/) | Publications, security analysis and research support |
| [Projects](https://profincognito.me/projects/) | Open-source projects and contributions |
| [Tools](https://profincognito.me/tools/) | A searchable directory of privacy and security tools |
| [Blog](https://profincognito.me/blog/) | Practical guides and writing on security, privacy and digital rights |
| [Chess](https://profincognito.me/chess/) | Chess writing and competitive experience |

## Develop locally

Install Git and **[Hugo Extended 0.160.1](https://github.com/gohugoio/hugo/releases/tag/v0.160.1)**, the version used by the deployment workflow and verified for this site.

```bash
git clone --recurse-submodules https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0.git
cd Pr0f3ss0r-1nc0gn1t0
hugo version
hugo server --disableFastRender
```

Open <http://localhost:1313/>. Add `-D` to the server command to preview draft content.

For an existing checkout, initialize the theme before building:

```bash
git submodule update --init --recursive
```

## Build

Build the primary site into `public/`:

```bash
hugo --ignoreCache --gc --minify --printPathWarnings --cleanDestinationDir
```

Check the GitHub Pages project path with a separate build into `public-mirror/`:

```bash
hugo --ignoreCache --gc --minify --printPathWarnings --cleanDestinationDir \
  --baseURL "https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0/" \
  --destination public-mirror
```

Both output directories are ignored by Git. Check links, images and assets on both builds when changing templates or URL handling.

## Deployment

- **Primary:** [profincognito.me](https://profincognito.me/) is hosted on Cloudflare Pages. The repository's primary header configuration is in [`static/_headers`](static/_headers).
- **Mirror:** [GitHub Pages](https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0/) is deployed by [`.github/workflows/gh-pages.yml`](.github/workflows/gh-pages.yml). The workflow checks out the theme submodule, verifies the Hugo download checksum, builds for the project URL, uploads the `public/` directory as a Pages artifact, and deploys it with `actions/deploy-pages`.

The mirror workflow runs on qualifying pushes to `main` and can also be started manually from Actions. Changes limited to `README.md`, `LICENSE` or `images/` are excluded by its path filter.

## Search metadata

The primary search URL is `https://profincognito.me/`, configured through `params.canonicalBaseURL`. The mirror keeps its own working navigation and assets while its canonical links, sitemap and structured identities point to the primary site. Paginated lists retain their distinct page URLs.

Metadata helpers live in [`layouts/partials/seo/`](layouts/partials/seo/). The homepage identifies the author and website; About uses profile markup, and articles link to the same author identity. Internal search and error pages are excluded from indexing. Sitemap and structured metadata omit modification timestamps.

## Repository layout

| Path | Purpose |
| --- | --- |
| [`content/`](content/) | Markdown pages, articles, projects and tools entries |
| [`layouts/`](layouts/) | Theme overrides, RSS feeds, structured metadata and image rendering |
| [`assets/css/extended/`](assets/css/extended/) | Site-specific styles |
| [`assets/js/`](assets/js/) | Browser-side search, theme behavior and tools filtering |
| [`static/`](static/) | Images, icons, fonts, security metadata and other copied assets |
| [`themes/hugo-WonderMod/`](themes/hugo-WonderMod/) | The pinned WonderMod theme submodule |
| [`config.yml`](config.yml) | Hugo configuration, navigation and site metadata |

Site search uses a generated JSON index, and tools filtering runs in the browser. See the [privacy policy](https://profincognito.me/privacy/) for hosting and data-handling details.

## Contributions and security

Corrections, broken-link reports and focused improvements are welcome through [issues](https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0/issues) and pull requests. Read the [contribution guide](CONTRIBUTING.md) for tool-submission criteria and validation expectations.

For vulnerabilities, follow [`SECURITY.md`](SECURITY.md) and the published [security contact information](https://profincognito.me/.well-known/security.txt). Keep sensitive details out of public issues.

## License

- Website source code: [GNU Affero General Public License v3.0](LICENSE).
- Content and articles: [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
- WonderMod theme: [MIT License](https://github.com/Wonderfall/hugo-WonderMod/blob/3b0ee00eb05135a162fdb83de65576b968bab4f0/LICENSE), retaining its upstream attribution.
