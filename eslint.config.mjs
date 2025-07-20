import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'


export default defineConfig([
	{ 
		files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
		plugins: { js }, 
		extends: ['js/recommended'],
		ignores: ['node_modules', 'build', 'generated/prisma'],
		rules: {
			'semi': ['error', 'never'], // ❌ sem ponto e vírgula
			'quotes': ['error', 'single'], // ❌ sem aspas duplas
			'indent': ['error', 'tab'], // ✅ usa tab
			'linebreak-style': ['error', 'unix'], // ✅ quebras de linha estilo Unix (\n),
			'no-useless-constructor': 'off' // ✅ permite construtores vazios,
		} 
  
	},
	{ files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], languageOptions: { globals: globals.node } },
	tseslint.configs.recommended,
])
