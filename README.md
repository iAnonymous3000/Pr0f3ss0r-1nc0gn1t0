# Professor Incognito - Personal Website  
[![Hugo Version](https://img.shields.io/badge/Hugo-0.139.3-blue?style=flat-square&logo=hugo)](https://gohugo.io/)  
[![PageSpeed Score](https://img.shields.io/badge/PageSpeed-100%25-brightgreen?style=flat-square&logo=googlechrome)](https://pagespeed.web.dev/analysis/https-profincognito-me/l3b9r03hj6)  
[![Internet.nl Score](https://img.shields.io/badge/internet.nl-97%25-brightgreen?style=flat-square)](https://internet.nl/site/profincognito.me/)  
[![SSL Rating](https://img.shields.io/badge/SSL%20Rating-A+-brightgreen?style=flat-square)](https://www.ssllabs.com/ssltest/analyze.html?d=profincognito.me)  
[![HSTS Preload](https://img.shields.io/badge/HSTS-Preloaded-brightgreen?style=flat-square)](https://hstspreload.org/?domain=profincognito.me)  
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%20v3-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0)  
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-sa/4.0/)  

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
- **Hosting**: Cloudflare Pages  
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
The website is hosted on **Cloudflare Pages** with automated deployment. To ensure the latest version of Hugo is always used during the build process:  

1. **GitHub Actions Workflow**: A scheduled GitHub Actions workflow checks for the latest Hugo version and updates the `.env` file in the repository with the version number.  
2. **Cloudflare Build Command**: The build command is configured as:  
   ```bash
   source .env && hugo
   ```  
   This ensures Cloudflare Pages uses the latest Hugo version specified in the `.env` file during each deployment.  

This automated process eliminates the need for manual updates to the Hugo version in the Cloudflare Pages settings.  

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
