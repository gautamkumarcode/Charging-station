/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				bgBlack: "#0E0D0D",
				secondaryBg: "#161618",
				bgGray: "#242424",
				borderColor: "#525252",
				cardColor: "#222324",
				SecondayText: "#C9FF3B", // Dark Gray
			},
		},
	},
	plugins: [],
};
