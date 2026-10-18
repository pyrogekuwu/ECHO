# ECHO — editorial redesign

This version builds on the working Astro site. It replaces the homepage layout and styling, and reuses your original headphone artwork **without altering it**.

## Install in Codespaces

1. Commit or back up your current site first.
2. Place this ZIP in the project root (same folder as `package.json`).
3. In the terminal, run: `unzip -o ECHO-editorial-update.zip`
4. If Astro isn't already running: `npm run dev -- --host 0.0.0.0`.
5. Open the preview (usually port 4321). If your CSS seems cached, do a hard refresh.

## File locations

- `src/pages/index.astro` — hero copy, section order, navigation, products, contact form.
- `public/style.css` — layout, sizes, colors, responsive rules.
- `public/images/echo-header-light.png` — your unmodified artwork.

## Things to edit first

- Page titles and section copy: edit the `<h1>`, `<h2>` and paragraphs in `src/pages/index.astro`.
- Colors and fonts: adjust the variables at the start of `public/style.css`.
- Hero height: `.echo-hero-inner` under `@media (min-width: 992px)`.
- Hero image position: `.echo-hero-artwork img` (never needs `scale(1.1)` to display).
- Category artworks: replace the temporary inline SVGs for earbuds and speakers with your own images when ready. Headphones uses your original PNG.

## Important: functionality

- Category cards currently lead to the enquiry form and preselect a subject. There is **no checkout or real shop yet**.
- The contact form demonstrates client-side validation; it **does not send messages**.
- Bootstrap 5 is loaded from CDN to match the course requirements.
- The original ECHO branding is retained; this isn't a clone of Nothing.
