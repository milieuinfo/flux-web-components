#!/usr/bin/env node
/**
 * a11y-audit.mjs - WCAG-meetrun voor Storybook-stories van (Lit) web components.
 *
 * Per story:
 *   axe         axe-core met WCAG 2.x A/AA-tags (open shadow roots inbegrepen)
 *   aria        Playwright ARIA-snapshot van de gerenderde story
 *   dom         Shadow DOM/Lit-controles: IDREF's over root-grenzen, "undefined"/lege aria-waarden,
 *               dubbele id's per root, radiogroepen gesplitst over shadow roots
 *   clickables  elementen met pointer-listeners zonder toetsenbordtoegang (via CDP)
 *   keyboard    Tab-wandeling: pad, Chromium-AX-rol/naam/states per stop, focus zichtbaar
 *               (pixelvergelijking), bedekt (2.4.11), lusdetectie (2.1.2)
 *   reflow      320 CSS px breed (1.4.10)
 *   spacing     tekstafstand-override in document én shadow roots (1.4.12)
 *   forced      forced-colors: screenshot + focus-zichtbaarheid per stop
 * Optioneel: interactiescenario's (--scenarios) met captures (axe + snapshot + focus + screenshot).
 *
 * Vereist: Node 18+, `playwright` en `axe-core` (beide devDependencies van flux-web-components),
 * Google Chrome of de Playwright-Chromium, en een draaiende Storybook (dev of statische build).
 */
import { parseArgs } from 'node:util';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const HELP = `
Gebruik: node a11y-audit.mjs [opties]

  --url <url>          Storybook-URL (standaard $STORYBOOK_URL of http://localhost:8080)
  --filter <tekst>     Stories waarvan id/titel/naam/importPath deze tekst bevat (herhaalbaar)
  --story <id>         Exacte story-id (herhaalbaar)
  --all                Alle stories (bewust expliciet: kan lang duren)
  --list               Toon enkel de geselecteerde stories en stop
  --scenarios <json>   Interactiescenario's (zie SKILL.md)
  --out <map>          Uitvoermap (standaard build/a11y-report/<filter>-<tijdstempel>)
  --skip <lijst>       Sla controles over: axe,aria,dom,clickables,keyboard,reflow,spacing,forced
  --tags <lijst>       axe-tags (standaard wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa)
  --best-practice      Voeg axe best-practice-regels toe
  --max-tabs <n>       Maximum aantal tabstops per story (standaard 40)
  --headed             Browser zichtbaar
  --channel <naam>     Browserkanaal, bv. chrome (standaard: Playwright-Chromium, anders Google Chrome)
  --ci                 Exitcode 1 bij axe-violations met impact serious/critical
`;

const { values: args } = parseArgs({
  options: {
    url: { type: 'string', default: process.env.STORYBOOK_URL || 'http://localhost:8080' },
    filter: { type: 'string', multiple: true, default: [] },
    story: { type: 'string', multiple: true, default: [] },
    all: { type: 'boolean', default: false },
    list: { type: 'boolean', default: false },
    scenarios: { type: 'string' },
    out: { type: 'string' },
    skip: { type: 'string', default: '' },
    tags: { type: 'string', default: 'wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa' },
    'best-practice': { type: 'boolean', default: false },
    'max-tabs': { type: 'string', default: '40' },
    headed: { type: 'boolean', default: false },
    channel: { type: 'string' },
    ci: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

if (args.help) {
  console.log(HELP);
  process.exit(0);
}

// Regels die de Storybook-shell (iframe.html) testen in plaats van het component.
const PAGE_LEVEL_RULES = [
  'document-title', 'html-has-lang', 'html-lang-valid', 'html-xml-lang-mismatch', 'bypass',
  'landmark-one-main', 'region', 'page-has-heading-one', 'meta-viewport', 'meta-viewport-large',
];
const msg = (e) => String(e?.message ?? e).split('\n')[0].slice(0, 400);
const safe = (s) => String(s).replace(/[^a-z0-9._-]+/gi, '_').slice(0, 120);
const rel = (p) => path.relative(process.cwd(), p) || '.';
const BASE = args.url.endsWith('/') ? args.url : `${args.url}/`;
const STAMP = new Date().toISOString().replace(/[:.]/g, '-');
const OUT = path.resolve(args.out ?? path.join('build', 'a11y-report', `${safe(args.filter[0] ?? args.story[0] ?? 'run')}-${STAMP}`));
const SKIP = new Set(args.skip.split(',').map((s) => s.trim()).filter(Boolean));
const TAGS = [...args.tags.split(',').map((s) => s.trim()).filter(Boolean), ...(args['best-practice'] ? ['best-practice'] : [])];
const MAX_TABS = Number.parseInt(args['max-tabs'], 10) || 40;
const VIEWPORT = { width: 1280, height: 800 };
const SHOT = { fullPage: true, animations: 'disabled', caret: 'hide' };

// ---------------------------------------------------------------------------------------------
// Afhankelijkheden: eerst relatief aan dit script (repo-root node_modules), dan relatief aan cwd.
// axe-core wordt rechtstreeks in de pagina geïnjecteerd: dezelfde versie als cypress-axe in de
// component tests, en geen extra pakket nodig.
function resolveDep(name) {
  for (const base of [import.meta.url, pathToFileURL(path.join(process.cwd(), 'noop.js')).href]) {
    try {
      return createRequire(base).resolve(name);
    } catch {
      /* volgende basis */
    }
  }
  console.error(`✗ ${name} niet gevonden. Draai het script vanuit de repo-root na pnpm install.`);
  process.exit(2);
}

const pw = await import(pathToFileURL(resolveDep('playwright')).href);
const chromium = pw.chromium ?? pw.default?.chromium;
const AXE_PATH = resolveDep('axe-core');
const AXE_SOURCE = await readFile(AXE_PATH, 'utf8');
const AXE_VERSION = JSON.parse(await readFile(path.join(path.dirname(AXE_PATH), 'package.json'), 'utf8')).version;

// ---------------------------------------------------------------------------------------------
// Helpers die in elke pagina geïnjecteerd worden (window.__wcagReview).
function installHelpers() {
  if (window.__wcagReview) return;
  const H = {};
  H.root = () => document.querySelector('#storybook-root') || document.querySelector('#root') || document.body;
  H.parentOf = (n) => n.parentElement || (n.getRootNode && n.getRootNode() instanceof ShadowRoot ? n.getRootNode().host : null);
  H.deepAll = (start = document) => {
    const out = [];
    const walk = (r) => {
      if (r.shadowRoot) walk(r.shadowRoot);
      for (const el of r.querySelectorAll('*')) {
        out.push(el);
        if (el.shadowRoot) walk(el.shadowRoot);
      }
    };
    walk(start);
    return out;
  };
  H.composedContains = (anc, node) => {
    while (node) {
      if (node === anc) return true;
      node = node.parentNode || (node instanceof ShadowRoot ? node.host : null);
    }
    return false;
  };
  H.deepActive = () => {
    let el = document.activeElement;
    while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
    return el;
  };
  H.deepFromPoint = (x, y) => {
    let el = document.elementFromPoint(x, y);
    while (el && el.shadowRoot) {
      const inner = el.shadowRoot.elementFromPoint(x, y);
      if (!inner || inner === el) break;
      el = inner;
    }
    return el;
  };
  H.visible = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    if (typeof el.checkVisibility === 'function') return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
    const cs = getComputedStyle(el);
    return cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  H.label = (n) => {
    const role = n.getAttribute && n.getAttribute('role');
    return n.localName + (n.id ? `#${n.id}` : '') + (role ? `[role=${role}]` : '');
  };
  // Leesbaar pad; " ⟫ " markeert de overgang host → shadow root.
  H.path = (el) => {
    const scopes = [];
    let seg = [];
    let n = el;
    while (n && n.nodeType === 1 && n !== document.body && n.id !== 'storybook-root' && n.id !== 'root') {
      seg.unshift(H.label(n));
      if (n.parentElement) {
        n = n.parentElement;
        continue;
      }
      const r = n.getRootNode();
      if (r instanceof ShadowRoot) {
        scopes.unshift(seg.slice(-3).join(' > '));
        seg = [];
        n = r.host;
      } else break;
    }
    if (seg.length) scopes.unshift(seg.slice(-3).join(' > '));
    return scopes.join(' ⟫ ') || H.label(el);
  };
  H.inStoryScope = (el) => {
    const root = H.root();
    if (el === root || H.composedContains(root, el)) return true;
    let n = el;
    for (;;) {
      const p = H.parentOf(n);
      if (!p || p === document.body || p === document.documentElement) break;
      n = p;
    }
    if (n === document.body || n === document.documentElement || n.localName === 'script' || n.localName === 'style') return false;
    if (n.id && (n.id === 'storybook-docs' || n.id.startsWith('__wcag_'))) return false;
    if ([...n.classList].some((c) => c.startsWith('sb-'))) return false;
    return true;
  };
  H.settle = async () => {
    const pending = H.deepAll(document).map((e) => e.updateComplete).filter((p) => p && typeof p.then === 'function');
    await Promise.race([Promise.allSettled(pending), new Promise((r) => setTimeout(r, 3000))]);
    if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2000))]);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    return true;
  };
  H.undefinedElements = () => [
    ...new Set(H.deepAll(H.root()).map((e) => e.localName).filter((n) => n.includes('-') && !customElements.get(n))),
  ];
  H.installSentinels = () => {
    if (document.getElementById('__wcag_start')) return;
    const mk = (id) => {
      const b = document.createElement('button');
      b.id = id;
      b.textContent = id;
      b.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0;padding:0;margin:-1px';
      return b;
    };
    const root = H.root();
    if (root === document.body) {
      document.body.prepend(mk('__wcag_start'));
      document.body.append(mk('__wcag_end'));
    } else {
      root.before(mk('__wcag_start'));
      root.after(mk('__wcag_end'));
    }
  };
  H.focusInfo = (track = true) => {
    const el = H.deepActive();
    if (!el || el === document.body || el === document.documentElement) return { none: true };
    if (el.id === '__wcag_end') return { sentinel: 'end' };
    if (el.id === '__wcag_start') return { sentinel: 'start' };
    if (track) {
      H.seen = H.seen || [];
      const prev = H.seen.indexOf(el);
      if (prev !== -1) return { repeatOf: prev + 1, path: H.path(el) };
      H.seen.push(el);
    }
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    let obscured = null;
    let obscuredBy = null;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    if (r.width && r.height && cx >= 0 && cy >= 0 && cx <= innerWidth && cy <= innerHeight) {
      const hit = H.deepFromPoint(cx, cy);
      // Een visueel verborgen native input onder de eigen styling in zijn <label> (custom radio,
      // checkbox, switch) is niet bedekt in de zin van 2.4.11.
      const ownLabel = hit && [...(el.labels || [])].some((l) => H.composedContains(l, hit));
      obscured = hit ? !(H.composedContains(el, hit) || H.composedContains(hit, el) || ownLabel) : null;
      if (obscured) obscuredBy = H.path(hit);
    }
    return {
      index: track ? H.seen.length : undefined,
      path: H.path(el),
      tag: el.localName,
      roleAttr: el.getAttribute('role'),
      text: (el.innerText || el.value || '').trim().replace(/\s+/g, ' ').slice(0, 80),
      rect: { x: r.left + scrollX, y: r.top + scrollY, width: r.width, height: r.height },
      focusVisibleMatches: el.matches(':focus-visible'),
      style: { outlineStyle: cs.outlineStyle, outlineWidth: cs.outlineWidth, outlineColor: cs.outlineColor, boxShadow: cs.boxShadow },
      obscured,
      obscuredBy,
      inStory: H.inStoryScope(el),
    };
  };
  H.domChecks = () => {
    const IDREF = ['aria-labelledby', 'aria-describedby', 'aria-controls', 'aria-owns', 'aria-activedescendant', 'aria-errormessage', 'aria-details', 'aria-flowto'];
    const out = { idrefs: [], suspiciousValues: [], emptyAria: [], duplicateIds: [], splitRadioGroups: [] };
    const all = H.deepAll(document);
    const roots = [document, ...all.filter((e) => e.shadowRoot).map((e) => e.shadowRoot)];
    const elsewhere = (id, own) => {
      for (const r of roots) if (r !== own && r.getElementById(id)) return r === document ? 'document' : H.path(r.host);
      return null;
    };
    const checkRefs = (el, attr, value) => {
      const own = el.getRootNode();
      for (const id of value.trim().split(/\s+/).filter(Boolean)) {
        if (own.getElementById(id)) continue;
        const where = elsewhere(id, own);
        out.idrefs.push({ element: H.path(el), attr, id, problem: where ? 'andere-root' : 'bestaat-niet', foundIn: where });
      }
    };
    const els = all.filter((e) => H.inStoryScope(e));
    for (const el of els) {
      for (const attr of IDREF) {
        const v = el.getAttribute(attr);
        if (v) checkRefs(el, attr, v);
      }
      if (el.localName === 'label' && el.htmlFor) checkRefs(el, 'for', el.htmlFor);
      for (const a of el.getAttributeNames()) {
        if (!(a.startsWith('aria-') || a === 'role' || a === 'alt' || a === 'title')) continue;
        const v = el.getAttribute(a);
        if (/\b(undefined|null|NaN)\b|\[object Object\]/.test(v)) out.suspiciousValues.push({ element: H.path(el), attr: a, value: v.slice(0, 80) });
        else if (v.trim() === '' && a !== 'alt' && a !== 'title') out.emptyAria.push({ element: H.path(el), attr: a });
      }
    }
    for (const r of roots) {
      const count = new Map();
      for (const e of r.querySelectorAll('[id]')) if (H.inStoryScope(e)) count.set(e.id, (count.get(e.id) || 0) + 1);
      for (const [id, n] of count) if (n > 1) out.duplicateIds.push({ scope: r === document ? 'document' : H.path(r.host), id, count: n });
    }
    const byName = new Map();
    for (const e of els) {
      if (e.localName !== 'input' || e.type !== 'radio' || !e.name) continue;
      if (!byName.has(e.name)) byName.set(e.name, new Set());
      byName.get(e.name).add(e.getRootNode());
    }
    for (const [name, set] of byName) if (set.size > 1) out.splitRadioGroups.push({ name, roots: set.size });
    return out;
  };
  H.collectCands = () => {
    const skip = new Set([document.body, document.documentElement, H.root()]);
    H.cands = H.deepAll(document).filter((e) => !skip.has(e) && H.inStoryScope(e) && H.visible(e)).slice(0, 1500);
    return H.cands.length;
  };
  H.classifyClickables = (list) => {
    const NATIVE = 'a[href],area[href],button,input,select,textarea,summary,label,option,details,[contenteditable=""],[contenteditable="true"]';
    const WIDGET = new Set(['button', 'link', 'checkbox', 'radio', 'switch', 'tab', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'treeitem', 'slider', 'spinbutton', 'combobox', 'gridcell']);
    const out = [];
    for (const { i, pointer, key } of list) {
      const el = H.cands[i];
      if (!el) continue;
      const native = el.matches(NATIVE);
      const focusable = el.tabIndex >= 0 && !el.disabled;
      const focusableInside = H.deepAll(el).some((d) => d.tabIndex >= 0 && !d.disabled && H.visible(d));
      const role = el.getAttribute('role');
      if (!native && !focusable && !focusableInside) out.push({ element: H.path(el), pointer, reason: 'niet-focusbaar' });
      else if (!native && focusable && !key && (!role || WIDGET.has(role))) out.push({ element: H.path(el), pointer, reason: 'focusbaar-maar-geen-key-listener-op-element' });
      if (pointer.every((t) => /down|start/.test(t))) out.push({ element: H.path(el), pointer, reason: 'enkel-down-event (2.5.2)' });
    }
    return out;
  };
  H.overflowReport = () => {
    const de = document.documentElement;
    const vw = de.clientWidth;
    const over = new Set();
    for (const e of H.deepAll(H.root())) {
      if (!H.visible(e)) continue;
      const r = e.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) continue;
      if (r.right > vw + 1 || r.left < -1) over.add(e);
    }
    const offenders = [];
    for (const e of over) {
      let p = H.parentOf(e);
      let outer = true;
      while (p) {
        if (over.has(p)) {
          outer = false;
          break;
        }
        p = H.parentOf(p);
      }
      if (!outer) continue;
      const r = e.getBoundingClientRect();
      offenders.push({ element: H.path(e), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) });
      if (offenders.length >= 10) break;
    }
    return { viewport: vw, scrollWidth: de.scrollWidth, pageScrollsHorizontally: de.scrollWidth > vw + 1, offenders };
  };
  H.textSpacing = () => {
    const measure = () => {
      const res = new Map();
      for (const e of H.deepAll(H.root())) {
        if (!H.visible(e)) continue;
        const cs = getComputedStyle(e);
        if (cs.display === 'inline' || cs.display === 'contents') continue;
        if (e.clientWidth <= 2 || e.clientHeight <= 2) continue;
        const dx = e.scrollWidth - e.clientWidth;
        const dy = e.scrollHeight - e.clientHeight;
        const hidden = /hidden|clip/.test(cs.overflowX) || /hidden|clip/.test(cs.overflowY);
        if ((dx > 1 || dy > 1) && (hidden || cs.overflowY === 'visible')) res.set(e, { kind: hidden ? 'afgesneden' : 'overloopt', dx, dy });
      }
      return res;
    };
    const text = (e) => (e.innerText || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 60);
    const before = measure();
    const sheet = new CSSStyleSheet();
    sheet.replaceSync('*,*::before,*::after{line-height:1.5!important;letter-spacing:0.12em!important;word-spacing:0.16em!important}p{margin-block-end:2em!important}');
    const targets = [document, ...H.deepAll(document).filter((e) => e.shadowRoot).map((e) => e.shadowRoot)];
    for (const t of targets) t.adoptedStyleSheets = [...t.adoptedStyleSheets, sheet];
    void document.body.offsetHeight;
    const issues = [];
    for (const [e, m] of measure()) {
      const b = before.get(e);
      if (b && b.kind === m.kind && m.dx <= b.dx + 1 && m.dy <= b.dy + 1) continue;
      issues.push({ element: H.path(e), kind: b ? `${m.kind} (erger dan voordien)` : m.kind, text: text(e) });
    }
    const preexisting = [...before].filter(([, m]) => m.kind === 'afgesneden').slice(0, 10).map(([e]) => ({ element: H.path(e), text: text(e) }));
    return { rootsStyled: targets.length, total: issues.length, issues: issues.slice(0, 20), preexisting };
  };
  window.__wcagReview = H;
}

// ---------------------------------------------------------------------------------------------
async function loadIndex() {
  for (const file of ['index.json', 'stories.json']) {
    try {
      const res = await fetch(new URL(file, BASE));
      if (!res.ok) continue;
      const json = await res.json();
      const entries = json.entries || json.stories;
      if (entries) return Object.values(entries);
    } catch {
      /* volgende */
    }
  }
  console.error(`✗ Geen Storybook-index op ${BASE} (index.json/stories.json). Draait Storybook?`);
  process.exit(2);
}

function selectStories(index) {
  const stories = index.filter((e) => (e.type ?? 'story') === 'story');
  if (args.story.length) {
    const byId = new Map(stories.map((e) => [e.id, e]));
    return args.story.map((id) => byId.get(id) ?? { id, title: id, name: '(niet in index)' });
  }
  if (args.filter.length) {
    const needles = args.filter.map((f) => f.toLowerCase());
    return stories.filter((e) => {
      const hay = `${e.id} ${e.title} ${e.name} ${e.importPath ?? ''}`.toLowerCase();
      return needles.some((n) => hay.includes(n));
    });
  }
  return args.all ? stories : [];
}

async function gotoStory(page, id) {
  const u = new URL('iframe.html', BASE);
  u.searchParams.set('id', id);
  u.searchParams.set('viewMode', 'story');
  await page.goto(u.href, { waitUntil: 'load' });
  const state = await page
    .waitForFunction(
      () => {
        if (document.body.classList.contains('sb-show-errordisplay')) return 'error';
        const r = document.querySelector('#storybook-root') || document.querySelector('#root');
        return r && r.childElementCount > 0 ? 'ok' : false;
      },
      null,
      { timeout: 20000 },
    )
    .then((h) => h.jsonValue());
  if (state === 'error') {
    const text = await page.locator('#error-message, .sb-errordisplay').first().innerText().catch(() => 'onbekende fout');
    throw new Error(`story rendert met fout: ${text.replace(/\s+/g, ' ').slice(0, 300)}`);
  }
  await page.evaluate(() => window.__wcagReview.settle());
}

async function shot(page, dir, file) {
  await writeFile(path.join(dir, file), await page.screenshot(SHOT));
  return file;
}

async function clipFor(page, r, pad = 12) {
  const { w, h } = await page.evaluate(() => ({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight }));
  const x0 = Math.max(0, Math.floor(r.x - pad));
  const y0 = Math.max(0, Math.floor(r.y - pad));
  const x1 = Math.min(w, Math.ceil(r.x + r.width + pad));
  const y1 = Math.min(h, Math.ceil(r.y + r.height + pad));
  return { x: x0, y: y0, width: Math.max(1, x1 - x0), height: Math.max(1, y1 - y0) };
}

function scOf(tags) {
  return tags.map((t) => t.match(/^wcag(\d)(\d)(\d{1,2})$/)).filter(Boolean).map((m) => `${m[1]}.${m[2]}.${m[3]}`);
}

function firstData(node) {
  for (const c of [...(node.any || []), ...(node.all || []), ...(node.none || [])]) {
    if (c.data && typeof c.data === 'object') {
      const s = JSON.stringify(c.data);
      return s.length <= 400 ? c.data : s.slice(0, 400);
    }
  }
  return undefined;
}

function slimAxe(list) {
  return list.map((r) => ({
    id: r.id,
    impact: r.impact ?? null,
    sc: scOf(r.tags),
    wcag22: r.tags.includes('wcag22aa') || r.tags.includes('wcag22a'),
    help: r.help,
    helpUrl: r.helpUrl,
    nodeCount: r.nodes.length,
    nodes: r.nodes.slice(0, 8).map((n) => ({
      target: n.target,
      html: n.html?.slice(0, 240),
      summary: n.failureSummary?.slice(0, 400),
      data: firstData(n),
    })),
  }));
}

async function runAxe(page) {
  // Eigen instantie apart bewaren: @storybook/addon-a11y laadt zelf een axe-versie met eigen config.
  if (!(await page.evaluate(() => !!window.__wcagAxe))) {
    await page.addScriptTag({ content: AXE_SOURCE });
    await page.evaluate(() => {
      window.__wcagAxe = window.axe;
    });
  }
  const r = await page.evaluate(
    ({ tags, off }) =>
      window.__wcagAxe.run(document, {
        runOnly: { type: 'tag', values: tags },
        rules: Object.fromEntries(off.map((id) => [id, { enabled: false }])),
        resultTypes: ['violations', 'incomplete'],
      }),
    { tags: TAGS, off: PAGE_LEVEL_RULES },
  );
  return {
    version: r.testEngine?.version ?? AXE_VERSION,
    violations: slimAxe(r.violations),
    incomplete: slimAxe(r.incomplete),
    passes: r.passes.map((p) => p.id),
    inapplicableCount: r.inapplicable.length,
  };
}

async function ariaSnapshot(page, dir, file) {
  const loc = page.locator('body');
  if (typeof loc.ariaSnapshot !== 'function') throw new Error('Playwright >= 1.49 nodig voor ariaSnapshot');
  const yaml = await loc.ariaSnapshot({ timeout: 10000 });
  await writeFile(path.join(dir, file), yaml);
  return { file, lines: yaml.split('\n').length, yaml };
}

const AX_KEEP = new Set([
  'expanded', 'checked', 'pressed', 'selected', 'disabled', 'required', 'invalid', 'hasPopup', 'level', 'multiselectable',
  'orientation', 'autocomplete', 'modal', 'valuemin', 'valuemax', 'valuetext', 'live', 'busy', 'readonly',
  'activedescendant', 'controls', 'describedby', 'labelledby', 'errormessage', 'owns', 'details',
]);

// Voor deze toestanden is "false" betekenisvol (bv. aria-expanded=false); voor de rest is het ruis.
const AX_STATEFUL = new Set(['expanded', 'checked', 'pressed', 'selected']);

function summarizeAx(n) {
  if (!n) return null;
  const props = {};
  for (const p of n.properties || []) {
    if (!AX_KEEP.has(p.name)) continue;
    const v = p.value?.value;
    if (p.value?.relatedNodes) props[p.name] = p.value.relatedNodes.map((r) => r.idref || r.text || `#${r.backendDOMNodeId}`);
    else if ((v === false || v === 'false') && !AX_STATEFUL.has(p.name)) continue;
    else if (v !== undefined) props[p.name] = v;
  }
  return {
    role: n.role?.value ?? null,
    name: n.name?.value ?? '',
    description: n.description?.value || undefined,
    value: n.value?.value ?? undefined,
    ignored: n.ignored || undefined,
    props,
  };
}

async function axOfActive(cdp) {
  try {
    const { result } = await cdp.send('Runtime.evaluate', { expression: 'window.__wcagReview.deepActive()' });
    if (!result?.objectId) return null;
    const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { objectId: result.objectId, fetchRelatives: false });
    await cdp.send('Runtime.releaseObject', { objectId: result.objectId }).catch(() => {});
    return summarizeAx(nodes?.[0]);
  } catch (e) {
    return { error: msg(e) };
  }
}

async function keyboardWalk(page, cdp, dir, { prefix = 'focus', withAx = true } = {}) {
  await page.evaluate(() => window.__wcagReview.installSentinels());
  await page.focus('#__wcag_start');
  const stops = [];
  let outcome = 'max-bereikt';
  let loopTo = null;
  for (let i = 0; i < MAX_TABS; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(40);
    const info = await page.evaluate(() => window.__wcagReview.focusInfo(true));
    if (info.sentinel === 'end') {
      outcome = 'verlaat-component';
      break;
    }
    if (info.sentinel === 'start') {
      outcome = 'terug-naar-start';
      break;
    }
    if (info.none) {
      outcome = 'focus-verloren';
      break;
    }
    if (info.repeatOf) {
      outcome = 'lus';
      loopTo = info.repeatOf;
      break;
    }
    if (withAx) info.ax = await axOfActive(cdp);
    if (info.rect.width > 0 && info.rect.height > 0) {
      const clip = await clipFor(page, info.rect);
      const buf = await page.screenshot({ ...SHOT, clip });
      info.screenshot = `${prefix}-${String(info.index).padStart(2, '0')}.png`;
      await writeFile(path.join(dir, info.screenshot), buf);
      Object.defineProperty(info, '_cmp', { value: { clip, buf }, enumerable: false });
    } else info.zeroSize = true;
    stops.push(info);
  }
  // Referentie zonder focus in het component: identieke pixels = geen zichtbare focusindicator.
  await page.evaluate(() => document.getElementById('__wcag_start')?.focus());
  await page.waitForTimeout(80);
  for (const s of stops) {
    if (!s._cmp) continue;
    const base = await page.screenshot({ ...SHOT, clip: s._cmp.clip });
    s.focusIndicatorVisible = !base.equals(s._cmp.buf);
  }
  for (const s of stops) s.forcedColorsRisk = s.style.outlineStyle === 'none' && s.style.boxShadow !== 'none';
  // Opeenvolgende radio-tabstops: de radio's vormen geen groep (APG: één tabstop per groep). Vangt ook
  // radio's zonder name-attribuut, die de DOM-controle splitRadioGroups niet ziet.
  let radioRun = 0;
  let radioRunMax = 0;
  for (const s of stops) {
    radioRun = s.ax?.role === 'radio' ? radioRun + 1 : 0;
    radioRunMax = Math.max(radioRunMax, radioRun);
  }
  return { outcome, loopTo, count: stops.length, consecutiveRadioStops: radioRunMax > 1 ? radioRunMax : 0, stops };
}

async function clickables(page, cdp) {
  const { result } = await cdp.send('Runtime.evaluate', { expression: 'window.__wcagReview.collectCands()', returnByValue: true });
  const total = result.value || 0;
  const withListeners = [];
  for (let i = 0; i < total; i++) {
    const { result: r } = await cdp.send('Runtime.evaluate', { expression: `window.__wcagReview.cands[${i}]` });
    if (!r?.objectId) continue;
    const { listeners } = await cdp.send('DOMDebugger.getEventListeners', { objectId: r.objectId });
    await cdp.send('Runtime.releaseObject', { objectId: r.objectId }).catch(() => {});
    const types = new Set(listeners.map((l) => l.type));
    const pointer = ['click', 'mousedown', 'mouseup', 'pointerdown', 'pointerup', 'touchstart', 'touchend'].filter((t) => types.has(t));
    if (!pointer.length) continue;
    withListeners.push({ i, pointer, key: ['keydown', 'keyup', 'keypress'].some((t) => types.has(t)) });
  }
  const findings = await page.evaluate((list) => window.__wcagReview.classifyClickables(list), withListeners);
  return { scanned: total, withPointerListeners: withListeners.length, findings };
}

async function reflowCheck(page, id, dir) {
  await page.setViewportSize({ width: 320, height: 256 });
  try {
    await gotoStory(page, id);
    const report = await page.evaluate(() => window.__wcagReview.overflowReport());
    report.screenshot = await shot(page, dir, 'reflow-320.png');
    return report;
  } finally {
    await page.setViewportSize(VIEWPORT);
  }
}

async function spacingCheck(page, id, dir) {
  await gotoStory(page, id);
  const before = await shot(page, dir, 'spacing-voor.png');
  const report = await page.evaluate(() => window.__wcagReview.textSpacing());
  await page.waitForTimeout(100);
  report.screenshots = [before, await shot(page, dir, 'spacing-na.png')];
  return report;
}

async function forcedCheck(page, cdp, id, dir) {
  await page.emulateMedia({ forcedColors: 'active' });
  try {
    await gotoStory(page, id);
    const screenshot = await shot(page, dir, 'forced-colors.png');
    const walk = SKIP.has('keyboard') ? null : await keyboardWalk(page, cdp, dir, { prefix: 'fc-focus', withAx: false });
    return {
      screenshot,
      stops: walk?.stops.map((s) => ({ index: s.index, path: s.path, focusIndicatorVisible: s.focusIndicatorVisible, screenshot: s.screenshot })) ?? [],
    };
  } finally {
    await page.emulateMedia({ forcedColors: 'none' });
  }
}

async function auditStory(context, entry) {
  const dir = path.join(OUT, 'stories', safe(entry.id));
  await mkdir(dir, { recursive: true });
  const res = { id: entry.id, title: entry.title, name: entry.name, importPath: entry.importPath, dir: rel(dir), checks: {}, errors: {} };
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const run = async (name, fn) => {
    if (SKIP.has(name)) return;
    try {
      res.checks[name] = await fn();
    } catch (e) {
      res.errors[name] = msg(e);
    }
  };
  try {
    await gotoStory(page, entry.id);
    res.undefinedElements = await page.evaluate(() => window.__wcagReview.undefinedElements());
    res.screenshot = await shot(page, dir, 'story.png');
  } catch (e) {
    res.errors.load = msg(e);
    await page.close();
    return res;
  }
  await run('axe', () => runAxe(page));
  await run('aria', () => ariaSnapshot(page, dir, 'aria-snapshot.yml'));
  await run('dom', () => page.evaluate(() => window.__wcagReview.domChecks()));
  await run('clickables', () => clickables(page, cdp));
  await run('keyboard', async () => {
    await gotoStory(page, entry.id);
    return keyboardWalk(page, cdp, dir);
  });
  await run('reflow', () => reflowCheck(page, entry.id, dir));
  await run('spacing', () => spacingCheck(page, entry.id, dir));
  await run('forced', () => forcedCheck(page, cdp, entry.id, dir));
  await page.close();
  return res;
}

// ---------------------------------------------------------------------------------------------
async function loadScenarios(file) {
  const json = JSON.parse(await readFile(path.resolve(file), 'utf8'));
  const list = Array.isArray(json) ? json : json.scenarios;
  if (!Array.isArray(list)) throw new Error('scenariobestand: verwacht een array of { "scenarios": [...] }');
  for (const [i, sc] of list.entries()) {
    if (!sc.story || !Array.isArray(sc.steps)) throw new Error(`scenario ${i + 1}: "story" en "steps" zijn verplicht`);
  }
  return list;
}

async function capture(page, cdp, dir, label, n) {
  const slug = `${String(n).padStart(2, '0')}-${safe(label)}`;
  const out = { label };
  out.focus = await page.evaluate(() => window.__wcagReview.focusInfo(false));
  out.focusAx = out.focus.none ? null : await axOfActive(cdp);
  out.axe = await runAxe(page).catch((e) => ({ error: msg(e) }));
  out.aria = await ariaSnapshot(page, dir, `${slug}.aria.yml`).catch((e) => ({ error: msg(e) }));
  out.screenshot = await shot(page, dir, `${slug}.png`);
  return out;
}

async function runScenario(context, sc, idx) {
  const name = sc.name || `scenario-${idx + 1}`;
  const dir = path.join(OUT, 'scenarios', safe(`${sc.story}--${name}`));
  await mkdir(dir, { recursive: true });
  const res = { story: sc.story, name, dir: rel(dir), captures: [], tabTrails: [], errors: [] };
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  try {
    await gotoStory(page, sc.story);
    let n = 0;
    for (const [i, step] of sc.steps.entries()) {
      try {
        if ('capture' in step) {
          res.captures.push(await capture(page, cdp, dir, step.capture, ++n));
          continue;
        }
        if ('click' in step) await page.locator(step.click).first().click({ timeout: 5000 });
        else if ('focus' in step) await page.locator(step.focus).first().focus({ timeout: 5000 });
        else if ('hover' in step) await page.locator(step.hover).first().hover({ timeout: 5000 });
        else if ('press' in step) await page.keyboard.press(step.press);
        else if ('tab' in step) {
          // Tabpad bijhouden: toont of focus in een dialoog blijft en waar hij naartoe gaat.
          const stops = [];
          for (let k = 0; k < step.tab; k++) {
            await page.keyboard.press('Tab');
            stops.push(
              await page.evaluate(() => {
                const el = window.__wcagReview.deepActive();
                return !el || el === document.body || el === document.documentElement ? '(geen: body of browser)' : window.__wcagReview.path(el);
              }),
            );
          }
          res.tabTrails.push({ step: i + 1, stops });
        }
        else if ('type' in step) await page.keyboard.type(step.type);
        else if ('wait' in step) await page.waitForTimeout(step.wait);
        else throw new Error('onbekend staptype');
        await page.waitForTimeout(60);
        await page.evaluate(() => window.__wcagReview.settle());
      } catch (e) {
        res.errors.push(`stap ${i + 1} ${JSON.stringify(step)}: ${msg(e)}`);
        break;
      }
    }
  } catch (e) {
    res.errors.push(`laden: ${msg(e)}`);
  }
  await page.close();
  return res;
}

// ---------------------------------------------------------------------------------------------
const cell = (v) => String(v ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const fmtTarget = (t) => (Array.isArray(t) ? t.map((x) => (Array.isArray(x) ? x.join(' ⟫ ') : x)).join(' , ') : String(t));
const yesNo = (v) => (v === true ? 'ja' : v === false ? 'nee' : '?');

function axeTable(list) {
  const L = ['| regel | impact | SC | nodes | eerste target | uitleg |', '|---|---|---|---|---|---|'];
  for (const r of list) {
    const sc = r.sc.join(', ') + (r.wcag22 ? ' (2.2)' : '');
    L.push(`| ${r.id} | ${r.impact ?? ''} | ${sc} | ${r.nodeCount} | \`${cell(fmtTarget(r.nodes[0]?.target))}\` | ${cell(r.help)} |`);
  }
  return L;
}

function renderAxe(axe, title = 'axe') {
  if (axe.error) return [`### ${title}`, `- ❌ ${axe.error}`, ''];
  const L = [`### ${title} ${axe.version ?? ''} - ${axe.violations.length} violations, ${axe.incomplete.length} incomplete, ${axe.passes.length} passes`, ''];
  if (axe.violations.length) L.push(...axeTable(axe.violations), '');
  if (axe.incomplete.length) L.push('**Incomplete (handmatig beoordelen):**', '', ...axeTable(axe.incomplete), '');
  L.push(`Geslaagde regels: ${axe.passes.join(', ') || '-'}`, '');
  return L;
}

function renderList(title, items, fmt) {
  if (!items?.length) return [`- ${title}: geen`];
  return [`- ${title}: ${items.length}`, ...items.slice(0, 15).map((x) => `  - ${fmt(x)}`)];
}

function renderStory(s) {
  const L = [`## ${s.title} - ${s.name}`, '', `- id: \`${s.id}\``, `- map: \`${s.dir}\``];
  if (s.importPath) L.push(`- bron: \`${s.importPath}\``);
  if (s.errors.load) return [...L, `- ❌ laden mislukt: ${s.errors.load}`, ''];
  if (s.undefinedElements?.length) L.push(`- ⚠️ niet-gedefinieerde custom elements: ${s.undefinedElements.join(', ')}`);
  L.push(`- screenshot: ${s.screenshot}`);
  for (const [k, e] of Object.entries(s.errors)) L.push(`- ❌ controle \`${k}\` mislukt: ${e}`);
  L.push('');
  const c = s.checks;
  if (c.axe) L.push(...renderAxe(c.axe));
  if (c.dom) {
    L.push('### DOM-controles (Shadow DOM / Lit)', '');
    L.push(...renderList('IDREF buiten eigen root of onbestaand', c.dom.idrefs, (x) => `\`${x.element}\` ${x.attr}="${x.id}" → ${x.problem}${x.foundIn ? ` (staat in ${x.foundIn})` : ''}`));
    L.push(...renderList('Verdachte attribuutwaarden', c.dom.suspiciousValues, (x) => `\`${x.element}\` ${x.attr}="${x.value}"`));
    L.push(...renderList('Lege aria-/role-attributen', c.dom.emptyAria, (x) => `\`${x.element}\` ${x.attr}=""`));
    L.push(...renderList("Dubbele id's binnen één root", c.dom.duplicateIds, (x) => `${x.scope}: #${x.id} ×${x.count}`));
    L.push(...renderList('Radiogroepen gesplitst over shadow roots', c.dom.splitRadioGroups, (x) => `name="${x.name}" in ${x.roots} roots`), '');
  }
  if (c.keyboard) {
    const k = c.keyboard;
    const fc = new Map((c.forced?.stops ?? []).map((x) => [x.index, x]));
    L.push(`### Toetsenbord - ${k.count} tabstops, uitkomst: ${k.outcome}${k.loopTo ? ` (terug naar stop ${k.loopTo})` : ''}`, '');
    if (k.consecutiveRadioStops) L.push(`- ⚠️ ${k.consecutiveRadioStops} opeenvolgende radio-tabstops: de radio's vormen geen groep met één tabstop`, '');
    L.push('| # | element | AX-rol | AX-naam | states | focus zichtbaar | forced colors | bedekt | screenshot |', '|---|---|---|---|---|---|---|---|---|');
    for (const st of k.stops) {
      const ax = st.ax ?? {};
      const states = Object.entries(ax.props ?? {}).map(([n, v]) => `${n}=${Array.isArray(v) ? `[${v.join(' ')}]` : v}`).join(', ');
      const f = fc.get(st.index);
      const fcCell = f && f.path === st.path ? yesNo(f.focusIndicatorVisible) : '?';
      const vis = st.zeroSize ? 'element 0×0' : yesNo(st.focusIndicatorVisible) + (st.forcedColorsRisk ? ' (enkel box-shadow)' : '');
      const obs = st.obscured ? `ja: ${st.obscuredBy}` : yesNo(st.obscured);
      L.push(`| ${st.index} | \`${cell(st.path)}\` | ${cell(ax.role)} | ${cell(ax.name) || '**(leeg)**'} | ${cell(states)} | ${vis} | ${fcCell} | ${cell(obs)} | ${st.screenshot ?? ''} |`);
    }
    L.push('');
  }
  if (c.clickables) {
    L.push(`### Pointer zonder toetsenbord - ${c.clickables.findings.length} kandidaten (${c.clickables.withPointerListeners} elementen met pointer-listeners)`, '');
    for (const f of c.clickables.findings) L.push(`- \`${f.element}\` (${f.pointer.join(', ')}) - ${f.reason}`);
    L.push('');
  }
  if (c.reflow) {
    const r = c.reflow;
    L.push(`### Reflow 320 px - pagina scrollt horizontaal: ${yesNo(r.pageScrollsHorizontally)} (scrollWidth ${r.scrollWidth} / viewport ${r.viewport}) - ${r.screenshot}`, '');
    for (const o of r.offenders) L.push(`- \`${o.element}\` left ${o.left}, right ${o.right}, breedte ${o.width}`);
    L.push('');
  }
  if (c.spacing) {
    L.push(`### Tekstafstand 1.4.12 - ${c.spacing.total} elementen nieuw afgesneden/overlopend (${c.spacing.rootsStyled} roots gestyled) - ${c.spacing.screenshots.join(', ')}`, '');
    for (const x of c.spacing.issues) L.push(`- ${x.kind}: \`${x.element}\` "${x.text}"`);
    if (c.spacing.preexisting?.length) {
      L.push('', 'Al afgesneden vóór de override (mogelijk inhoudsverlies, los van 1.4.12):');
      for (const x of c.spacing.preexisting) L.push(`- \`${x.element}\` "${x.text}"`);
    }
    L.push('');
  }
  if (c.forced) L.push(`### Forced colors - ${c.forced.screenshot}${c.forced.stops.length ? `, focus: ${c.forced.stops.map((x) => x.screenshot).filter(Boolean).join(', ')}` : ''}`, '');
  if (c.aria) {
    const lines = c.aria.yaml.split('\n');
    L.push(`### ARIA-snapshot (volledig: ${c.aria.file}, ${lines.length} regels)`, '', '```yaml', ...lines.slice(0, 80), ...(lines.length > 80 ? ['# … ingekort'] : []), '```', '');
  }
  return L;
}

function renderScenario(sc) {
  const L = [`## Scenario "${sc.name}" - \`${sc.story}\``, '', `- map: \`${sc.dir}\``];
  for (const e of sc.errors) L.push(`- ❌ ${e}`);
  for (const t of sc.tabTrails) L.push(`- tabpad stap ${t.step}:`, ...t.stops.map((p, k) => `  ${k + 1}. \`${p}\``));
  L.push('');
  for (const cp of sc.captures) {
    const f = cp.focus;
    const ax = cp.focusAx ?? {};
    const states = Object.entries(ax.props ?? {}).map(([n, v]) => `${n}=${Array.isArray(v) ? `[${v.join(' ')}]` : v}`).join(', ');
    L.push(`### Capture "${cp.label}" - ${cp.screenshot}`, '');
    L.push(f.none ? '- focus: body (geen element)' : `- focus: \`${f.path}\` → rol ${ax.role ?? '?'}, naam "${ax.name ?? ''}"${states ? `, ${states}` : ''}${f.obscured ? `, BEDEKT door ${f.obscuredBy}` : ''}`);
    L.push('', ...renderAxe(cp.axe, 'axe'));
    if (cp.aria?.yaml) {
      const lines = cp.aria.yaml.split('\n');
      L.push(`ARIA-snapshot (${cp.aria.file}):`, '', '```yaml', ...lines.slice(0, 60), ...(lines.length > 60 ? ['# … ingekort'] : []), '```', '');
    } else if (cp.aria?.error) L.push(`- ❌ ARIA-snapshot: ${cp.aria.error}`, '');
  }
  return L;
}

function renderMarkdown(R) {
  const L = [
    '# WCAG-meetrun',
    '',
    `- datum: ${R.meta.date}`,
    `- storybook: ${R.meta.url}`,
    `- browser: ${R.meta.browser}`,
    `- axe-tags: ${R.meta.tags.join(', ')}`,
    `- uitgeschakelde paginaregels (testen de Storybook-shell): ${PAGE_LEVEL_RULES.join(', ')}`,
    `- overgeslagen controles: ${[...SKIP].join(', ') || 'geen'}`,
    '',
    '> Heuristieken (focus zichtbaar, bedekt, pointer zonder toetsenbord, reflow, tekstafstand) zijn signalen, geen oordelen: bevestig elk met code of screenshot.',
    '',
  ];
  for (const s of R.stories) L.push(...renderStory(s));
  if (R.scenarios.length) {
    L.push("# Scenario's", '');
    for (const sc of R.scenarios) L.push(...renderScenario(sc));
  }
  return L.join('\n');
}

function consoleLine(s) {
  if (s.errors.load) return `✗ ${s.id} - laden mislukt: ${s.errors.load}`;
  const c = s.checks;
  const parts = [];
  if (c.axe) parts.push(`axe ${c.axe.violations.length}V/${c.axe.incomplete.length}I`);
  if (c.dom) parts.push(`dom: idref ${c.dom.idrefs.length}, attr ${c.dom.suspiciousValues.length + c.dom.emptyAria.length}, id ${c.dom.duplicateIds.length}, radio ${c.dom.splitRadioGroups.length}`);
  if (c.keyboard) parts.push(`tab ${c.keyboard.count} (${c.keyboard.outcome}), onzichtbaar ${c.keyboard.stops.filter((x) => x.focusIndicatorVisible === false).length}`);
  if (c.clickables) parts.push(`pointer-only ${c.clickables.findings.length}`);
  if (c.reflow) parts.push(`reflow ${c.reflow.pageScrollsHorizontally ? 'SCROLL' : 'ok'}`);
  if (c.spacing) parts.push(`spacing ${c.spacing.total}`);
  const errs = Object.keys(s.errors).length ? ` - fouten: ${Object.keys(s.errors).join(', ')}` : '';
  return `${c.axe?.violations.length ? '✗' : '•'} ${s.id} - ${parts.join(' | ')}${errs}`;
}

// ---------------------------------------------------------------------------------------------
const index = await loadIndex();
const selected = selectStories(index);
const scenarios = args.scenarios ? await loadScenarios(args.scenarios) : [];

if (args.list) {
  for (const e of selected) console.log(`${e.id}\t${e.title} - ${e.name}`);
  if (!selected.length) console.log('(geen stories geselecteerd: gebruik --filter, --story of --all)');
  process.exit(0);
}
if (!selected.length && !scenarios.length) {
  console.error('✗ Geen stories geselecteerd. Gebruik --filter <component>, --story <id>, --scenarios <json> of --all.');
  process.exit(2);
}

await mkdir(OUT, { recursive: true });
// --disable-lcd-text: anders wisselt Chromium tussen subpixel- en grijswaarden-antialiasing
// afhankelijk van de focusstatus, wat de pixelvergelijking vals-positief maakt.
let browserName = 'Chromium';
async function launchBrowser() {
  const opts = { headless: !args.headed, args: ['--disable-lcd-text'] };
  let last;
  for (const channel of args.channel ? [args.channel] : [undefined, 'chrome']) {
    try {
      const b = await chromium.launch(channel ? { ...opts, channel } : opts);
      if (channel) browserName = channel === 'chrome' ? 'Google Chrome' : channel;
      return b;
    } catch (e) {
      last = e;
    }
  }
  console.error(`✗ Geen browser gestart: ${msg(last)}\n  Installeer Google Chrome of draai: pnpm exec playwright install chromium`);
  process.exit(2);
}
const browser = await launchBrowser();
const context = await browser.newContext({ viewport: VIEWPORT, reducedMotion: 'reduce', deviceScaleFactor: 1 });
await context.addInitScript(installHelpers);

const results = {
  meta: { date: new Date().toISOString(), url: BASE, browser: `${browserName} ${browser.version()}`, tags: TAGS, maxTabs: MAX_TABS },
  stories: [],
  scenarios: [],
};
for (const entry of selected) {
  process.stdout.write(`▶ ${entry.id}\n`);
  const r = await auditStory(context, entry);
  results.stories.push(r);
  console.log(`  ${consoleLine(r)}`);
}
for (const [i, sc] of scenarios.entries()) {
  process.stdout.write(`▶ scenario ${sc.name ?? i + 1} (${sc.story})\n`);
  const r = await runScenario(context, sc, i);
  results.scenarios.push(r);
  console.log(`  ${r.captures.length} captures${r.errors.length ? `, fouten: ${r.errors.join(' ; ')}` : ''}`);
}
await browser.close();

await writeFile(path.join(OUT, 'summary.json'), JSON.stringify(results, null, 2));
await writeFile(path.join(OUT, 'summary.md'), renderMarkdown(results));
console.log(`\nRapportdata: ${rel(path.join(OUT, 'summary.md'))}`);

if (args.ci) {
  const blocking = [...results.stories.flatMap((s) => s.checks.axe?.violations ?? []), ...results.scenarios.flatMap((s) => s.captures.flatMap((c) => c.axe?.violations ?? []))]
    .filter((v) => v.impact === 'serious' || v.impact === 'critical');
  if (blocking.length) process.exitCode = 1;
}
