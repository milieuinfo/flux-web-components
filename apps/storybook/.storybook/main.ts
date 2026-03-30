import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'node:path';

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

    managerHead: (headHtml) => {
        const styles = `
      <style>
        #sb-custom-sidebar-footer {
          position: sticky;
          bottom: 0;
          background: #F6F6F3;
          font-size: 12px;
          color: #333332;
          border-top: 1px solid #447A6D22;
          padding: 12px 14px;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          & > div {
            display: flex;
            align-items: center;
            gap: 12px;
          }
        }
        #sb-custom-sidebar-footer a {
            color: #333332;
            text-decoration: none;
            &:hover, &:focus { 
                text-decoration: underline;
            }
        }
        #sb-custom-sidebar-footer a:has(img) {
            &:hover, &:focus { 
                text-decoration: none;
            }
        }
        #sb-custom-sidebar-footer img {
          display: block;
          max-width: 150px;
          height: auto;
          width: 100%;
        }
        #sb-custom-sidebar-footer ul, #sb-custom-sidebar-footer li {
          line-height: 1;
          list-style: none;
          margin: 0;
          padding: 0;
        }
      </style>
    `;

        const script = `
      <script>
        (function () {
          function inject() {
            const sidebar =
              document.querySelector('nav.sidebar-container');
            if (!sidebar) return false;
            if (sidebar.querySelector('#sb-custom-sidebar-footer')) return true;

            const existingFooter = document.querySelector('#sb-custom-sidebar-footer');
            if (existingFooter) {
              existingFooter.remove();
            }

            const footer = document.createElement('div');
            footer.id = 'sb-custom-sidebar-footer';
            footer.innerHTML = \`
              <!--
              <label>Versies:
                <select><option>2.11.0</option><option>2.10.0</option></select>
              </label>
              -->
              <div>
              <a href="https://omgeving.vlaanderen.be" target="_blank" rel="noreferrer">
                <img src="Vlaanderen_is_kwal_omgeving_blauwgroen.svg" alt="Vlaanderen is kwaliteitsvolle omgeving - Vlaanderen.be" />
              </a>
              <!--
              <ul>
                <li><a href="https://flux.omgeving.vlaanderen.be/privacy" target="_blank" rel="noreferrer">disclaimer</a></li>
                <li><a href="https://flux.omgeving.vlaanderen.be/cookieverklaring" target="_blank" rel="noreferrer">cookies</a></li>
                <li><a href="https://flux.omgeving.vlaanderen.be/toegankelijkheid" target="_blank" rel="noreferrer">toegankelijkheid</a></li>
              </ul>
              -->
              </div>
            \`;
            sidebar.appendChild(footer);
            return true;
          }

          // Init na load
          const init = () => {
            if (!inject()) {
              const i = setInterval(() => { if (inject()) clearInterval(i); }, 300);
              setTimeout(() => clearInterval(i), 10000);
            }
          };

          window.addEventListener('load', init);

          // Fallback: DOM observer (sidebar kan re‑renderen bij navigatie)
          const obs = new MutationObserver(() => inject());
          obs.observe(document.documentElement, { childList: true, subtree: true });
        })();
      </script>
    `;

        return `${headHtml}\n${styles}\n${script}`;
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
                '../../../libs/components/src/block/next/index.ts',
            ),
            '@domg-wc/components/block': path.resolve(__dirname, '../../../libs/components/src/block/index.ts'),
            '@domg-wc/components/compliance/next': path.resolve(
                __dirname,
                '../../../libs/components/src/compliance/next/index.ts',
            ),
            '@domg-wc/components/compliance': path.resolve(
                __dirname,
                '../../../libs/components/src/compliance/index.ts',
            ),
            '@domg-wc/components/form': path.resolve(__dirname, '../../../libs/components/src/form/index.ts'),
            '@domg-wc/integrations/form': path.resolve(__dirname, '../../../libs/integrations/src/form/index.ts'),
            '@domg-wc/integrations/map': path.resolve(__dirname, '../../../libs/integrations/src/map/index.ts'),
            '@domg-wc/integrations/popover': path.resolve(__dirname, '../../../libs/integrations/src/popover/index.ts'),
            '@domg-wc/integrations/page-layout': path.resolve(
                __dirname,
                '../../../libs/integrations/src/page-layout/index.ts',
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
