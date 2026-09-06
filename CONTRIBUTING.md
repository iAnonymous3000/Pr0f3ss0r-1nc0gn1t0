# Contributing

Focused corrections, broken-link reports and improvements to the site are welcome. Open an issue for a substantial change before doing extensive work. Keep each pull request small enough to review and explain the user-visible result.

## Reports and corrections

Include the affected page or file, what is wrong, the expected behavior and enough detail to reproduce it. For factual corrections, link to the original source. Keep personal information and confidential records out of public reports; use [SECURITY.md](SECURITY.md) for vulnerabilities.

## Tool suggestions

The tools directory is curated. A submission is a proposal for review, not automatic inclusion or endorsement.

- Explain why the tool fits its category and provide primary sources for its capabilities, privacy practices and availability.
- Distinguish documented claims from independent security assessments. Include material data collection, maturity, platform and pricing limitations.
- Make important caveats visible in the card description or status labels, as well as the detailed notes.
- Disclose any affiliation with the product. Preserve upstream attribution for images and code.
- Follow neighboring entries in `content/tools/`; add a local logo only when its use is appropriate. Avoid promotional claims, affiliate links and unsupported rankings.

## Validate a change

Follow the setup and build instructions in [README.md](README.md). Changes to content, templates, styles or scripts should be checked on both the primary URL and the GitHub Pages project path.

For interface changes, check the affected page on desktop and mobile. For tools changes, check the category, card, detail page and filtering. Keep third-party embeds and tracking out of the site, and document any new network dependency for review.

Run `git diff --check` before submitting. Generated `public/` and `public-mirror/` files do not belong in commits.
