/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"tobacco-brown": {
					50: "#f7f5ef",
					100: "#ebe7d6",
					200: "#d9d1af",
					300: "#c2b382",
					400: "#b0995f",
					500: "#a18751",
					600: "#8a6d44",
					700: "#785b3d",
					800: "#5f4734",
					900: "#523e31",
					950: "#2f2119",
				},

				chalky: {
					50: "#fdf9ed",
					100: "#f9eecc",
					200: "#f2d788",
					300: "#edc35c",
					400: "#e9ad36",
					500: "#e18e1f",
					600: "#c76c18",
					700: "#a64d17",
					800: "#873d19",
					900: "#6f3218",
					950: "#3f1909",
				},
				"cerulean-blue": {
					50: "#f0f5fe",
					100: "#dce7fd",
					200: "#c1d6fc",
					300: "#97bef9",
					400: "#669bf4",
					500: "#4277ef",
					600: "#2552e3",
					700: "#2444d1",
					800: "#2339aa",
					900: "#223486",
					950: "#192252",
				},
			},
		},
	},
	plugins: [require("daisyui")],

	daisyui: {
		themes: [
			{
				Cinema: {
					primary: "#c2b382",
					"primary-focus": "#a18751",
					"primary-content": "#131415",

					secondary: "#4277ef",
					"secondary-focus": "#4277ef",
					"secondary-content": "#ffffff",

					accent: "#edc35c",
					"accent-focus": "#e9ad36",
					"accent-content": "#131415",

					neutral: "#2a2e37",
					"neutral-focus": "#16181d",
					"neutral-content": "#ffffff",

					"base-100": "#18191b",
					"base-200": "#131415",
					"base-300": "#0c0d0e",
					"base-content": "#ebecf0",

					info: "#66c7ff",
					success: "#87cf3a",
					warning: "#e1d460",
					error: "#ff6b6b",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
		],
	},
};
