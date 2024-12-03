# Professor Incognito - Personal Website  

<a href="https://gohugo.io/">
  <img src="https://img.shields.io/badge/Hugo-0.139.3-blue?style=flat-square&logo=hugo" alt="Hugo Version">
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


A privacy-focused personal website built with Hugo WonderMod theme, showcasing security research, chess strategy, and digital rights advocacy.

## Overview  
[profincognito.me](https://profincognito.me) serves as a platform for:  
- Privacy Research & Security Strategies  
- Open Source Security Tools  
- Chess-Inspired Security Thinking  
- Digital Rights Education  
- Privacy-Preserving Technologies  

## Tech Stack  
- **Static Site Generator**: Hugo  
- **Theme**: [WonderMod](https://github.com/Wonderfall/hugo-WonderMod) (Privacy-hardened fork of PaperMod)  
- **Primary Hosting**: Cloudflare Pages  
- **Mirror/Backup**: GitHub Pages  
- **DNS & Security**: Cloudflare  
- **Deployment**: Automated via Cloudflare Pages and GitHub Actions  

## Privacy Features  
Built with privacy-first principles:  
- No JavaScript tracking  
- No external dependencies  
- No cookies  
- No local storage  
- Minimal external requests  
- Strong Content Security Policy  
- Privacy-preserving contact methods  
- Secure email routing  

## Deployment  
The website is deployed to two platforms:

1. **Primary (Cloudflare Pages)**:
   - Automated deployment via Cloudflare Pages
   - Uses latest Hugo version specified in `.env`
   - Build command: 
     ```bash
     source .env && hugo && \
     git checkout --orphan gh-pages && \
     git reset --hard && \
     cp -r public/* . && \
     git add . && \
     git commit -m "Deploy to GitHub Pages" && \
     git push origin gh-pages -f
     ```
   - Available at: [profincognito.me](https://profincognito.me)

2. **Mirror (GitHub Pages)**:
   - Serves as backup/mirror
   - Automatically updated when Cloudflare builds
   - Serves static files from gh-pages branch
   - Available at: [ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0](https://ianonymous3000.github.io/Pr0f3ss0r-1nc0gn1t0)

This dual-deployment setup ensures high availability.

## Local Development  

### Prerequisites  
- Hugo Latest Version  
- Git  

### Setup  
```bash
# Clone the repository
git clone https://github.com/iAnonymous3000/Pr0f3ss0r-1nc0gn1t0.git
cd Pr0f3ss0r-1nc0gn1t0

# Start development server
hugo server -D
```

### Build  
```bash
# Production build
hugo
```

## Contributions  
While this is a personal website, bug reports are welcome:  
1. Submit via GitHub Issues  
2. Use security advisory for vulnerabilities  
3. Contact through secure channels for sensitive issues  

## Support  
Support privacy research and development:  
- Code contributions  
- Security research collaboration  
- Privacy-preserving cryptocurrency donations:  
  - Monero (XMR)  
  - Zcash (ZEC)  

## License  
- Website Source Code: [GNU Affero General Public License v3.0](LICENSE)  
- Content & Articles: [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/)  
- Theme: MIT (WonderMod)  

## Credits  
- Hugo Team  
- WonderMod Theme  
- Privacy & Security Community  

---
Project Pr0f3ss0r1nc0gn1t0: Advancing privacy and digital rights.  
Made with ♟️ by Pr0f3ss0r 1nc0gn1t0
