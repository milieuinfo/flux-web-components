import path from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';

const r = (...p: string[]) => path.resolve(__dirname, ...p);

const config: StorybookConfig = {
    framework: {
        name: '@storybook/web-components-vite',
        options: {},
    },
    // MSW's worker moet vanuit /public geserveerd worden:
    staticDirs: ['../resources/public'],
    stories: [
        '../docs/**/*.mdx',
        '../docs/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        '../../../libs/components/src/atom/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/block/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/compliance/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/form/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/map/src/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/styles/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
    docs: {
        defaultName: 'documentatie',
    },
    async viteFinal(config, { configType }) {
        config.resolve ??= {};
        config.resolve.alias ??= {};
        config.resolve.alias = {
            ...config.resolve.alias,
            '@resources/utils-storybook': path.resolve(__dirname, '../../../resources/utils-storybook/index.ts'),
            '@resources/utils-test': path.resolve(__dirname, '../../../resources/utils-test/index.ts'),
            '@domg-wc/common': path.resolve(__dirname, '../../../libs/common/src/index.ts'),
            '@domg-wc/components/atom': path.resolve(__dirname, '../../../libs/components/src/atom/index.ts'),
            '@domg-wc/components/block/next': path.resolve(
                __dirname,
                '../../../libs/components/src/block/next/index.ts'
            ),
            '@domg-wc/components/block': path.resolve(__dirname, '../../../libs/components/src/block/index.ts'),
            '@domg-wc/components/compliance/next': path.resolve(
                __dirname,
                '../../../libs/components/src/compliance/next/index.ts'
            ),
            '@domg-wc/components/compliance': path.resolve(
                __dirname,
                '../../../libs/components/src/compliance/index.ts'
            ),
            '@domg-wc/components/form': path.resolve(__dirname, '../../../libs/components/src/form/index.ts'),
            '@domg-wc/integrations/form': path.resolve(__dirname, '../../../libs/integrations/src/form/index.ts'),
            '@domg-wc/integrations/map': path.resolve(__dirname, '../../../libs/integrations/src/map/index.ts'),
            '@domg-wc/integrations/popover': path.resolve(__dirname, '../../../libs/integrations/src/popover/index.ts'),
            '@domg-wc/integrations/page-layout': path.resolve(
                __dirname,
                '../../../libs/integrations/src/page-layout/index.ts'
            ),
            '@domg-wc/map': path.resolve(__dirname, '../../../libs/map/src/index.ts'),
            '@domg-wc/styles': path.resolve(__dirname, '../../../libs/styles/src/index.ts'),
        };

        // alleen tijdens 'storybook dev' heb je een server
        if (configType === 'DEVELOPMENT') {
            const allow = new Set([
                ...(config.server.fs.allow ?? []),
                r('.'), // .storybook
                r('../docs'), // ← jouw MDX docs-map
                r('../stories'), // (optioneel) stories-map
                r('..'), // (optioneel) SB subproject-root
            ]);
            // Laat Vite buiten de SB-subfolder lezen:
            config.server ??= {};
            config.server.fs ??= {};
            config.server.fs.allow = [...allow];
        }

        return config;
    },
};
export default config;
