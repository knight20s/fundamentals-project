import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
    { ignores: ["dist/**", "node_modules/**"] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/ts/**/*.ts"],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            "no-var": "error",
            "prefer-const": "error",
            "eqeqeq": "error",
        },
    },
);
