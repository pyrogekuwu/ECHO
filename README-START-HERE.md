# ECHO — Figma-inspired Astro homepage

The files recreate your supplied Figma mockup (the design URL was not directly retrievable in this environment). This is a working **landing page**, not a functional online store yet.

## 1. Installation in your existing Codespace

1. Commit/backup your current ECHO project first.
2. Upload `ECHO-figma-rebuild.zip` to the root of ECHO (the folder with `package.json`).
3. Open a terminal in that folder, then run:

```bash
unzip -o ECHO-figma-rebuild.zip
npm run dev -- --host 0.0.0.0
```

If the Astro server is already running, omit the second command; reload the site.

The ZIP updates `src/pages/index.astro`, `public/style.css`, and adds `public/images/*.webp`. It does not overwrite `package.json` or `astro.config.mjs`.

## 2. Replace images WITHOUT editing markup

**Important:** The WebP images in `public/images/` are low-resolution crops of your screenshot, inserted *only* as temporary visual placeholders. The code has actual `<img>` elements and separate CSS background assets. They will look soft or pixelated when enlarged. Export your proper images from Figma and overwrite the matching paths, or update the paths in `index.astro` / `style.css` if using PNG/JPG.

| File in `public/images/` | Where used |
| --- | --- |
| `hero-sky.webp` | Cloud/sky strip above navigation |
| `hero-lumia.webp` | Dark hero composition with headphones and angel wings (CSS background) |
| `category-headphones.webp` | Shop by categories: headphones |
| `category-earbuds.webp` | Shop by categories: earbuds |
| `category-speakers.webp` | Shop by categories: speakers |
| `category-accessories.webp` | Shop by categories: accessories |
| `aerospace-detail.webp` | Close-up earbud photo, collections left |
| `aerospace-portrait.webp` | Model wearing earbud, collections right |
| `about-star-left.webp` | Chrome ornament on About, left |
| `about-star-right.webp` | Chrome ornament on About, right |
| `product-lumia-white.webp` | Bestsellers card 1 |
| `product-aerospace-black.webp` | Bestsellers card 2 |
| `product-lumia-silver.webp` | Bestsellers card 3 |

If exporting at original quality to PNG: for example change `'/images/category-headphones.webp'` to `'/images/category-headphones.png'` in the array in `index.astro`. For the hero background, find `.hero-photo` in `style.css` and change its URL. Prefer WebP when possible. The image boxes use `object-fit: cover`, so the aspect ratio matters.

## 3. Edit text or product data

- **All main content:** `src/pages/index.astro`.
- **Category cards:** `const categories = [...]` at the beginning of that file.
- **Bestseller cards and prices:** `const bestsellers = [...]` immediately below.
- **Product names, hero, headings, about and contact:** search for those exact phrases in `index.astro`.
- **Font / colors / layout / responsive views:** `public/style.css`.
- The design uses Inter for UI and body, Cormorant Garamond for editorial headings, IBM Plex Mono for small metadata, DotGothic16 for `LUMIA PRO 2`, Genos for `ECHO`.
- `.hero-photo` controls the hero photo, `.aerospace-editorial` controls the overlapping collection images, `.category-tile` controls the four square category tiles.

## 4. What isn't live yet

- There is **no checkout** or individual product pages at this stage. Category links lead to product cards or the contact area in the single-page preview.
- Search is an in-page preview of the collection. Favourite hearts toggle on/off, but no account, database or persistence exists.
- Contact form shows a *not sent* message instead of pretending to email anybody.
- Social profiles are design placeholders, deliberately not linked to fake accounts.
- Contact details (email, phone, address) are fictional visual mockup content; replace for any public real-world site.
- The supplied design text was intentionally preserved, including placeholder product descriptions and the third product name/price exactly as shown, even where the wording is informal or inconsistent.

## 5. Next step

Preview at **390, 768, 1200 and 1440px** widths in browser DevTools. Replace image placeholders with genuine Figma exports first, then adjust desktop hero photography positioning and product typography if needed. Validate with Lighthouse before submission.
