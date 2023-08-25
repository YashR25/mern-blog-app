/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-once": "bounce 1s linear",
        typewriter: "typewriter 3.5s steps(40, end)",
        cursor: "cursor .75s step-end infinite",
        width: "width 0.8s forwards",
      },
      keyframes: {
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        cursor: {
          "0%, 50%": { borderColor: "transperent" },
          "100%": { borderColor: "orange" },
        },
        width: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
