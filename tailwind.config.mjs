/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: "var(--primary)",
        brands: {
          light: "var(--brands-light)",
          medium: "var(--brands-medium)",
          bold: "var(--brands-bold)",
          heavy: "var(--brands-heavy)",
        },
      },
    },
  },
  plugins: [],
};
