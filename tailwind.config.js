/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "project-blue": "#020065",
        "project-yellow": "#F6F510",
        "project-red": "#F70505",
        "project-green": "#3C9B14",
        "project-dark-green": "#1C4909",
        "project-emerald": "#11292E",
        "project-gray": "#E4E4E4",
        "project-gray-2": "#C0C0C0",
        "project-light-black": "#4D4D4D",
      },
      textColor: {
        "project-blue": "#020065",
        "project-yellow": "#F6F510",
        "project-red": "#F70505",
        "project-green": "#3C9B14",
        "project-dark-green": "#1C4909",
        "project-emerald": "#11292E",
        "project-gray": "#E4E4E4",
        "project-gray-2": "#C0C0C0",
        "project-light-black": "#4D4D4D",
      },
      borderColor: {
        "project-blue": "#020065",
        "project-yellow": "#F6F510",
        "project-red": "#F70505",
        "project-green": "#3C9B14",
        "project-dark-green": "#1C4909",
        "project-emerald": "#11292E",
        "project-gray": "#E4E4E4",
        "project-gray-2": "#C0C0C0",
        "project-light-black": "#4D4D4D",
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        inter: "'Inter', sans-serif",
        dmsans: "'DM Sans', sans-serif",
      },
      outlineColor: {
        "project-blue": "#020065",
      },
    },
  },
  plugins: [],
};
