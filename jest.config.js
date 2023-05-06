module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	transform: {
		"\.tsx$": ["ts-jest", { tsconfig: "./tsconfig.jest.json" }]
	},
	testMatch: [
		"<rootDir>/**/*.test.tsx"
	],
	coverageDirectory: ".output/coverage",
	coverageReporters: ["html", "json"],
};
