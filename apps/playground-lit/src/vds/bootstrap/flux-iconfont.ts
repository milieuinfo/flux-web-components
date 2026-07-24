import { iconFontLocation } from '@domg-wc/styles';

if (!document.querySelector('style[data-flux704="flux-iconfont"]')) {
    const style = document.createElement('style');
    style.setAttribute('data-flux704', 'flux-iconfont');
    style.textContent = `@font-face{font-family:'vlaanderen-icon';font-style:normal;font-weight:normal;font-display:block;src:url('${iconFontLocation}.woff2') format('woff2'),url('${iconFontLocation}.woff') format('woff');}`;
    document.head.appendChild(style);
}
