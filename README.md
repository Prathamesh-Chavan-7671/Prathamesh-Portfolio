# Portfolio site

Static site: plain HTML, one shared stylesheet, no build step. Upload the folder contents to the web root.

## Before you publish: replace these placeholders

| Placeholder | Where | Replace with |
|---|---|---|
| `https://YOUR-DOMAIN.com` | every .html file, sitemap.xml, robots.txt | your real domain (no trailing slash) |
| `YOUR-EMAIL@example.com` | index.html, assets/home.js | your email address |
| `https://www.linkedin.com/in/YOUR-LINKEDIN` | footer of every page | your LinkedIn URL |
| `https://github.com/YOUR-GITHUB` | footer of every page | your GitHub URL |
| `PHOTO_URL` | top of assets/home.js | link to your photo (optional) |

Check nothing is left: search all files for `YOUR-`.

## Add a new article

1. Copy `writing/_template/` to `writing/your-article-slug/` (lowercase, hyphens).
2. Edit title, description, date, tags and body in the new `index.html`. Fix the canonical and og:url to the new path. Remove the `noindex` robots tag.
3. Copy the BlogPosting JSON-LD block from the first article and update it.
4. Add a card for it in `writing/index.html` and in the Writing section of `index.html` if it is a highlight.
5. Add the URL to `sitemap.xml`.
6. Submit the sitemap in Google Search Console.

## Files

- `index.html`: home page
- `writing/index.html`: article list
- `writing/endpoint-security-capacity-assessment/`: first case study
- `writing/_template/`: article template (noindex, not in sitemap)
- `assets/site.css`, `assets/home.js`, `assets/page.js`: styles and scripts
- `assets/reports/`: downloadable PDFs
