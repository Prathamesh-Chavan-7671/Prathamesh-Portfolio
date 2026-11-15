# Prathamesh Chavan: Portfolio

Full stack web developer in Mumbai, now building skills in application security and cybersecurity GRC.

**Live site:** https://prathamesh-portfolio-silk.vercel.app/
**LinkedIn:** https://www.linkedin.com/in/prathamesh-chavan-developer/
**Email:** prathameshchavan8652@gmail.com
---

## About me

I build web apps people use. For a living I work across frontend, backend and production websites: building, maintaining and fixing them, and connecting them to hosting, domains and third-party platforms.

Since August 2024 I have worked as an IT Associate and Full Stack Web Developer at Mumbai Biocluster, where I look after 8 to 9 production websites and build web apps for scientific, marketing, content and event teams. Before that I was a Frontend Developer Intern at Essentia.dev, turning Figma designs into responsive interfaces with HTML5, Tailwind CSS and JavaScript.

I am now moving toward **application security** and **cybersecurity GRC** (governance, risk and compliance). I am learning in public, and the first result is a written case study on this site.

### What I am working on

- Secure development and application security fundamentals
- Risk assessment, evidence collection and framework mapping (ISO/IEC 27001)
- Writing up what I learn as case studies and articles

### Selected work

| Project | What it is |
|---|---|
| Inventory management app | A full-stack application built around a real workflow for a nanomedicine research group, to manage inventory-related data in one place |
| Knowledge-sharing platform | A web platform where people publish and share useful information and ideas |
| Event gamification app | An app for running games and activities at events, so attendees interact more |

### Skills

| Area | Tools |
|---|---|
| Frontend | HTML5, CSS3, JavaScript, React.js, Vue.js, Tailwind CSS, Vite |
| Backend | Node.js, Django, Python, PHP, REST APIs |
| Databases | PostgreSQL, MySQL, MongoDB |
| Cloud and tools | AWS EC2, Git, GitHub, GitLab, Postman, NPM, VS Code |
| Platforms | Wix, Bluehost, domain and hosting management |
| Exploring | Cybersecurity, GRC, application security, API security, authentication and authorization |

---

## Featured writing

**[From a Slow Phone to a GRC Risk Assessment: My First Learning Project](https://YOUR-DOMAIN.com/writing/endpoint-security-capacity-assessment/)**

A self-study project where I treated a slow Android phone like a mini GRC assessment: evidence collected over ADB, 8 findings, a 5x5 risk register, a remediation plan and a mapping to ISO/IEC 27001:2022 Annex A. It uses my own personal device and is not an audit of any organisation. The full report is available as a PDF on the page.

---

## About this repository

This is the source for my portfolio website. It is a static site: plain HTML, one shared stylesheet and a little JavaScript. There is no build step.

```
.
├── index.html                  Home page
├── writing/
│   ├── index.html              Article list
│   ├── endpoint-security-capacity-assessment/
│   │   └── index.html          Case study
│   └── _template/              Template for new articles (hidden from search)
├── assets/
│   ├── site.css                Shared styles
│   ├── home.js                 Home page animation (GSAP)
│   ├── page.js                 Menu and progress bar for inner pages
│   └── reports/                Downloadable PDFs
├── sitemap.xml
└── robots.txt
```

**Built with:** HTML, CSS, vanilla JavaScript, [GSAP](https://gsap.com/) for animation, Google Fonts.

**Search and sharing:** each page has its own title, description, canonical link, Open Graph and Twitter tags, and structured data (Person, WebSite, BlogPosting, breadcrumbs). There is a sitemap and robots file.

**Accessibility:** semantic headings, a skip link, keyboard-friendly navigation, reduced-motion support, and content that stays readable if scripts fail to load.

### Run it locally

```bash
git clone https://github.com/Prathamesh-Chavan-7671/Prathamesh-Portfolio.git
cd Prathamesh-Portfolio
python -m http.server 8000
```

Then open http://localhost:8000.

### Add an article

1. Copy `writing/_template/` to `writing/your-article-slug/`.
2. Edit the title, description, date, tags and body, and remove the `noindex` tag.
3. Add it to `writing/index.html` and `sitemap.xml`.

---

## Contact

Open to new work and to feedback on my writing. Reach me at YOUR-EMAIL@example.com or on [LinkedIn](https://www.linkedin.com/in/YOUR-LINKEDIN).

## Licence

© 2026 Prathamesh Chavan. All rights reserved.
