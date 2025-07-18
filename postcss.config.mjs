// Configure PostCSS plugins using the object syntax expected by Next.js.
// Using the plugin name string avoids shape errors during the build step.

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
