import js from '@eslint/js';
import tseslint from 'typescript-eslint';
export default tseslint.config(
 {ignores:['.next/**','node_modules/**','next-env.d.ts']},
 js.configs.recommended,
 ...tseslint.configs.recommended,
 {languageOptions:{globals:{process:'readonly',console:'readonly',URL:'readonly',setTimeout:'readonly',clearTimeout:'readonly',fetch:'readonly'}},rules:{'@typescript-eslint/no-explicit-any':'off','@typescript-eslint/no-unused-vars':['error',{argsIgnorePattern:'^_',caughtErrors:'none'}]}}
);
