import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
	js.configs.recommended,
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
			},
			globals: {
				process: "readonly",
				console: "readonly",
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
			prettier: prettier,
		},
		rules: {
			// TypeScript specific rules
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/explicit-function-return-type": "warn",
			"@typescript-eslint/explicit-module-boundary-types": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-var-requires": "error",

			// General code quality rules
			"no-console": "warn",
			"no-debugger": "error",
			"no-duplicate-imports": "error",
			"no-unused-expressions": "error",
			"prefer-const": "error",
			"no-undef": "error",

			// Prettier integration
			"prettier/prettier": "error",
		},
	},
	prettierConfig,
	{
		ignores: [
			"node_modules/**",
			"test-results/**",
			"playwright-report/**",
			".auth/**",
			"dist/**",
			"build/**",
		],
	},
	{
		files: ["src/utils/logger.ts"],
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"no-unused-vars": "off",
		},
	},
];
