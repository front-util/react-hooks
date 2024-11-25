import { utils } from '@front-utils/linter';

export default [
    ...utils.createEslintConfig({
    types: ['ts', 'react'],
    files: [
        'src/**/*.{ts,tsx,js}', 
        'tests/*.test.ts', 
        'vitest.config.ts', 
        'vitest.utils.ts',
        'vitest.setup.ts'
    ],
})];

