# ECHO — navbar at the top + scroll-up reveal

## Changed
- Removed the temporary sky strip above the menu.
- Moved `<header class="site-header">` outside `<main>` so the navigation can remain fixed above all other sections.
- Navigation is fixed to the top; it hides when scrolling down and returns when scrolling up.
- Bootstrap mobile menu and built-in search remain functional.
- Hero begins just below the navbar (4.5rem desktop / 4rem mobile).

## Installation
Upload `ECHO-navbar-scroll-update.zip` into your ECHO project's main folder, where `package.json` is located. In the Codespaces terminal run:

```bash
unzip -o ECHO-navbar-scroll-update.zip
```

If `npm run dev` is already running, just save/refresh the page. Otherwise run `npm run dev -- --host 0.0.0.0`.

You can also copy just `src/pages/index.astro` and `public/style.css` into your project. All your image files are unchanged.
