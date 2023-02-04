/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
        
"primary": "#6ebc32",
        
"secondary": "#4194cc",
        
"accent": "#931de2",
        
"neutral": "#29252D",
        
"base-100": "#E8E8E8",
        
"info": "#AED1E5",
        
"success": "#57D69D",
        
"warning": "#EBC34C",
        
"error": "#E81744",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "mytheme",
  },
}
