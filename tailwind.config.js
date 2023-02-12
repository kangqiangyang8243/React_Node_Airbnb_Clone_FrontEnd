module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        register: "url('../src/images/register.jfif')",
        login: "url('../src/images/Login.jfif')",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
