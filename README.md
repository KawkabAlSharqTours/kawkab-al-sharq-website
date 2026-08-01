# Kawkab Al-Sharq Tourism & Travel — Website

Static HTML/CSS/JS website for Kawkab Al-Sharq Tourism & Travel, a Jordan-based
inbound tour operator founded in 2024 by Munir Abu Aisha. No framework, no
build step — every page is a plain HTML file.

Live site: https://kawkabalsharq.com

## Structure

```
index.html                     Homepage
about/index.html                About page
contact/index.html              Contact page
itineraries/index.html          Itineraries hub / listing page
<itinerary-slug>/index.html     One folder per itinerary, at the site root,
                                 e.g. /family-jordan-tour/
blog/index.html                 Blog listing page
blog/<post-slug>/index.html     One folder per blog post
css/style.css                   Shared stylesheet (design tokens as CSS vars)
js/main.js                      Shared JS (mobile nav toggle)
assets/images/                  Images
404.html                        Custom 404 page
robots.txt, sitemap.xml         SEO basics
CNAME                           GitHub Pages custom domain (kawkabalsharq.com)
.github/workflows/deploy.yml    Auto-deploy to GitHub Pages on every push to main
```

## Clean URLs

Itinerary and blog pages use the `folder/index.html` pattern so GitHub Pages
serves them at a clean URL with no `.html` extension, e.g.:

- `/family-jordan-tour/index.html` → `https://kawkabalsharq.com/family-jordan-tour/`
- `/blog/welcome-to-kawkab-al-sharq/index.html` → `https://kawkabalsharq.com/blog/welcome-to-kawkab-al-sharq/`

Itinerary pages live at the **site root** (not nested under `/itineraries/`)
to keep URLs short and SEO-friendly, per the site's URL convention.

## Adding a new itinerary page

1. Copy `family-jordan-tour/` to a new folder named with the itinerary's slug,
   e.g. `petra-wadi-rum-adventure/`.
2. Edit `index.html` inside it: title, meta description, canonical URL, hero
   copy, day-by-day list, inclusions/exclusions.
3. Add a card linking to it on `itineraries/index.html` and, if it should be
   featured, on the homepage.
4. Add its URL to `sitemap.xml`.
5. Commit and push to `main` — GitHub Actions deploys automatically.

## Adding a new blog post

1. Copy `blog/welcome-to-kawkab-al-sharq/` to a new folder named with the
   post's slug.
2. Edit `index.html`: title, meta description, canonical URL, published date,
   body content.
3. Add a card linking to it on `blog/index.html`.
4. Add its URL to `sitemap.xml`.

## Local preview

No build step is required. Either open `index.html` directly in a browser,
or serve the folder locally so root-relative links (`/css/style.css`, etc.)
resolve correctly:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which publishes
the repository contents to GitHub Pages. In the repo's **Settings → Pages**,
the source should be set to **GitHub Actions**.

The custom domain is configured via the `CNAME` file (`kawkabalsharq.com`).
DNS must point the domain at GitHub Pages (an `A`/`ALIAS` record to GitHub's
IPs, or a `CNAME` record for a `www` subdomain) — see GitHub's
[custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Still to do

- Replace placeholder copy (marked `PLACEHOLDER`) with real content from the
  strategy document and itinerary portfolio.
- Replace placeholder images (`assets/images/`) with real photography.
- Connect the contact form (`contact/index.html`) to a form backend
  (e.g. Formspree, Getform, Web3Forms) — static sites can't process form
  submissions on their own.
- Swap the placeholder color palette / fonts in `css/style.css` for final
  brand assets once ready.
- Point DNS for kawkabalsharq.com at GitHub Pages.
