import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

// Simple demonstration that the PostCSS configuration works without errors.
// This processes a small CSS snippet using the Tailwind CSS plugin.
async function run() {
  const result = await postcss([tailwindcss]).process('@tailwind utilities;', {
    from: undefined,
  });
  console.log('Generated CSS length:', result.css.length);
}

run().catch((err) => {
  console.error('PostCSS build failed:', err);
  process.exit(1);
});
