# DocumentSorter Website

Static product, support, and privacy website for the DocumentSorter macOS app.

## Pages

- `index.html` — bilingual product page
- `privacy.html` — English and German privacy policy
- `support.html` — support channels and FAQ

The site contains no analytics, cookies, third-party fonts, build step, or runtime dependencies.

## Local preview

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## GitHub Pages

Publish from the repository's `main` branch and root directory. The expected URL is:

`https://ozel0t-g.github.io/documentsorter-website/`

Before App Store or Google OAuth submission, add a verified private contact email and the publisher's legal identity to the privacy policy. A custom domain can be connected later without changing the site structure.
