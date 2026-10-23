
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://pyrogekuwu.github.io',
  // Local development uses /. The Pages workflow sets this to /ECHO.
  base: process.env.ECHO_BASE_PATH || '/',
});
