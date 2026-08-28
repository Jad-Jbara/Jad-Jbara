// Artwork for the profile README. Two panels, both hand-authored SVG animated with
// CSS keyframes. GitHub renders these through <img>, where CSS animation runs but
// scripts and webfonts do not — hence generic font stacks and zero external requests.
//   node tools/build-assets.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');
mkdirSync(OUT, { recursive: true });

// ─── copy ─────────────────────────────────────────────────────────────────────
const NAME = 'Jad Jbara';
const LEDE = 'I build the app, the web app, and the services under both.';
const META = 'full-stack  ·  mobile-first  ·  beirut';

const LAYERS = [
  { name: 'clients', note: 'what people touch',    tech: 'react native  ·  next.js  ·  typescript' },
  { name: 'api',     note: 'the contract',         tech: 'node  ·  rest + sse  ·  zod' },
  { name: 'domain',  note: 'where the rules live', tech: 'services  ·  authorization  ·  events' },
  { name: 'data',    note: 'the source of truth',  tech: 'postgres  ·  prisma  ·  redis' },
];
// ──────────────────────────────────────────────────────────────────────────────

const THEMES = {
  dark:  { bg:'#09090B', surface:'#111114', hairline:'#232328', ink:'#FAFAFA',
           muted:'#8B8B95', faint:'#3A3A42', primary:'#7C5CFF', signal:'#3FD69B',
           glow:0.14, shadow:0.55 },
  light: { bg:'#FFFFFF', surface:'#F5F5F8', hairline:'#E0E0E7', ink:'#09090B',
           muted:'#63636E', faint:'#C9C9D2', primary:'#5B3DF5', signal:'#0E9F76',
           glow:0.06, shadow:0.16 },
};

/* Devices stay dark in either theme. A screen is a light-emitting object; rendering
   it pale on the light page erased the silhouette and turned the scrim into grey mush. */
const D = {
  body:'#17171B', screen:'#0B0B0E', row:'#212127', sheet:'#1A1A1F', panel:'#141418',
  ink:'#FAFAFA', muted:'#8B8B95', faint:'#3A3A42', edge:'#2C2C33',
  primary:'#7C5CFF', signal:'#3FD69B', onPrimary:'#FFFFFF',
};

const MONO = "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';   // ease-out-expo. no bounce.

function tracePoints(n, seed = 7) {
  let s = seed; const out = [];
  for (let i = 0; i < n; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    out.push(6.4 + (s / 0x7fffffff) * 4.0 + (i % 11 === 0 ? 2.3 : 0));
  }
  return out;
}
const traceD = (v, x0, w, top, floor, max = 16.6) => v.map((val, i) => {
  const x = +(x0 + i * (w / (v.length - 1))).toFixed(2);
  const y = +(floor - (val / max) * (floor - top)).toFixed(2);
  return `${i ? 'L' : 'M'}${x} ${y}`;
}).join(' ');

// ═══ PANEL 1 — identity + the two surfaces ════════════════════════════════════
function hero(t) {
  const W = 880, H = 552, M = 48;

  const BX = M, BY = 216, BW = 720, BH = 268;         // browser
  const CHROME = 34, CT = BY + CHROME, SIDE = 140;
  const SPT = 412;                                     // perf strip top
  const CX = BX + SIDE + 28, CBASE = SPT - 28;
  const bars = [46, 62, 38, 74, 55, 88, 42, 67, 79, 51, 71];
  const BWD = 24, BGP = 18;

  const PL = BX + 16, PR = 640;                        // trace, stops short of the phone
  const BUD = SPT + 28, FLR = BY + BH - 10;
  const HALF = tracePoints(44), LOOP = [...HALF, ...HALF], tw = PR - PL;
  const line = traceD(LOOP, PL, tw * 2, BUD, FLR);
  const area = `${line} L${PL + tw * 2} ${FLR} L${PL} ${FLR} Z`;

  const PX = 678, PY = 244, PW = 142, PH = 284, PRD = 22;   // phone
  const SX = PX + 5, SY = PY + 5, SW = PW - 10, SH = PH - 10, SR = PRD - 5;
  const SHEET_H = 156, SREST = SY + SH - SHEET_H, SHIDE = SHEET_H + 8;
  const rows = [0, 1, 2, 3, 4].map(i => ({ y: SY + 60 + i * 44 }));
  const ms = ['8.4', '7.1', '9.6', '6.8', '11.2', '7.9'];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" role="img" aria-labelledby="h">
<title id="h">${NAME} — ${LEDE} A browser window charting data with a phone in front of it presenting a bottom sheet, over a frame-time graph held under the 16.6 millisecond budget.</title>
<defs>
  <clipPath id="card"><rect width="${W}" height="${H}" rx="20"/></clipPath>
  <clipPath id="win"><rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="14"/></clipPath>
  <clipPath id="scr"><rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${SR}"/></clipPath>
  <clipPath id="plot"><rect x="${PL}" y="${BUD - 18}" width="${tw}" height="${FLR - BUD + 18}"/></clipPath>
  <radialGradient id="glow" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="${t.primary}" stop-opacity="${t.glow}"/>
    <stop offset="100%" stop-color="${t.primary}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="under" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${D.signal}" stop-opacity=".22"/><stop offset="100%" stop-color="${D.signal}" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${D.primary}"/><stop offset="100%" stop-color="${D.primary}" stop-opacity=".45"/>
  </linearGradient>
  <linearGradient id="eg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#000"/><stop offset="6%" stop-color="#fff"/>
    <stop offset="95%" stop-color="#fff"/><stop offset="100%" stop-color="#000"/>
  </linearGradient>
  <mask id="edge"><rect x="${PL}" y="${BUD - 18}" width="${tw}" height="${FLR - BUD + 18}" fill="url(#eg)"/></mask>
  <filter id="lift" x="-30%" y="-20%" width="170%" height="150%">
    <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000" flood-opacity="${t.shadow}"/>
  </filter>
</defs>
<style><![CDATA[
  .n{font-family:${SANS};fill:${t.ink};font-weight:640;letter-spacing:-.03em}
  .l{font-family:${SANS};fill:${t.muted};font-size:17px}
  .m{font-family:${MONO};fill:${t.muted};font-size:11px;letter-spacing:.09em}
  .s{font-family:${MONO};fill:${D.muted};font-size:9.5px;letter-spacing:.05em}
  .si{font-family:${MONO};fill:${D.ink};font-size:9.5px;letter-spacing:.05em}

  /* base state is the finished state, so a still render is always correct */
  .bar{transform-box:fill-box;transform-origin:50% 100%;animation:grow 9s ${EASE} infinite}
  @keyframes grow{0%,4%{transform:scaleY(.04)}22%,100%{transform:scaleY(1)}}
  ${bars.map((_, i) => `.b${i}{animation-delay:${(i * .045).toFixed(3)}s}`).join('')}
  .row{animation:enter 9s ${EASE} infinite}
  .r2{animation-delay:.06s}.r3{animation-delay:.12s}.r4{animation-delay:.18s}.r5{animation-delay:.24s}
  @keyframes enter{0%,7%{opacity:0;transform:translateY(6px)}16%,100%{opacity:1;transform:translateY(0)}}
  .sheet{animation:present 9s infinite}
  @keyframes present{
    0%,36%{transform:translateY(${SHIDE}px);animation-timing-function:${EASE}}
    45%,74%{transform:translateY(0);animation-timing-function:cubic-bezier(.7,0,.84,0)}
    83%,100%{transform:translateY(${SHIDE}px)}}
  .scrim{animation:dim 9s infinite}
  @keyframes dim{0%,36%{opacity:0}45%,74%{opacity:.58}83%,100%{opacity:0}}
  .trace{animation:scroll 15s linear infinite}
  @keyframes scroll{to{transform:translateX(-${tw}px)}}
  .tick{opacity:0;animation:tick 3.6s steps(1) infinite}
  @keyframes tick{0%,16.6%{opacity:1}16.7%,100%{opacity:0}}
  ${ms.map((_, i) => `.t${i}{animation-delay:${(i * .6).toFixed(1)}s}`).join('')}
  .dot{animation:pulse 3.6s ease-in-out infinite}
  @keyframes pulse{0%,100%{opacity:.4}50%{opacity:1}}
  @media (prefers-reduced-motion: reduce){
    .bar,.row,.sheet,.scrim,.trace,.dot{animation:none}
    .scrim{opacity:.58}.tick{animation:none;opacity:0}.t0{opacity:1}}
]]></style>
<g clip-path="url(#card)">
  <rect width="${W}" height="${H}" fill="${t.bg}"/>
  <ellipse cx="640" cy="380" rx="340" ry="260" fill="url(#glow)"/>

  <text class="n" x="${M}" y="112" font-size="60">${NAME}</text>
  <text class="l" x="${M}" y="152">${LEDE}</text>
  <text class="m" x="${M}" y="182">${META}</text>

  <g filter="url(#lift)">
  <rect x="${BX}" y="${BY}" width="${BW}" height="${BH}" rx="14" fill="${D.body}" stroke="${D.edge}"/>
  <g clip-path="url(#win)">
    <rect x="${BX}" y="${BY}" width="${BW}" height="${CHROME}" fill="${D.panel}"/>
    <path d="M${BX} ${CT}.5 H${BX + BW}" stroke="${D.edge}"/>
    ${[0, 1, 2].map(i => `<circle cx="${BX + 22 + i * 16}" cy="${BY + 17}" r="4" fill="${D.faint}"/>`).join('')}
    <rect x="${BX + 82}" y="${BY + 9.5}" width="164" height="16" rx="8" fill="${D.screen}"/>
    <rect x="${BX + 93}" y="${BY + 15}" width="70" height="5" rx="2.5" fill="${D.muted}" opacity=".7"/>

    <rect x="${BX}" y="${CT}" width="${SIDE}" height="${BH - CHROME}" fill="${D.panel}"/>
    <path d="M${BX + SIDE}.5 ${CT} V${BY + BH}" stroke="${D.edge}"/>
    ${[0, 1, 2, 3].map(i => `<g opacity="${i === 1 ? 1 : .5}">
      ${i === 1 ? `<rect x="${BX + 12}" y="${CT + 18 + i * 32 - 9}" width="${SIDE - 24}" height="28" rx="8" fill="${D.primary}" opacity=".16"/>` : ''}
      <rect x="${BX + 24}" y="${CT + 18 + i * 32}" width="10" height="10" rx="3" fill="${i === 1 ? D.primary : D.muted}"/>
      <rect x="${BX + 43}" y="${CT + 20 + i * 32}" width="${56 - i * 8}" height="6" rx="3" fill="${i === 1 ? D.ink : D.muted}" opacity="${i === 1 ? .85 : .6}"/>
    </g>`).join('')}

    <rect x="${CX}" y="${CT + 20}" width="94" height="10" rx="5" fill="${D.ink}" opacity=".85"/>
    <rect x="${CX + 106}" y="${CT + 20}" width="44" height="10" rx="5" fill="${D.muted}" opacity=".4"/>
    ${bars.map((h, i) => `<rect class="bar b${i}" x="${CX + i * (BWD + BGP)}" y="${CBASE - h}" width="${BWD}" height="${h}" rx="4" fill="url(#bar)"/>`).join('\n    ')}
    <path d="M${CX} ${CBASE}.5 H${CX + bars.length * (BWD + BGP) - BGP}" stroke="${D.edge}"/>

    <rect x="${BX}" y="${SPT}" width="${BW}" height="${BY + BH - SPT}" fill="${D.panel}"/>
    <path d="M${BX} ${SPT}.5 H${BX + BW}" stroke="${D.edge}"/>
    <text class="s" x="${PL}" y="${SPT + 19}">FRAME TIME</text>
    <circle class="dot" cx="${PL + 84}" cy="${SPT + 15.5}" r="2.75" fill="${D.signal}"/>
    ${ms.map((v, i) => `<text class="si tick t${i}" x="${PL + 95}" y="${SPT + 19}">${v} ms</text>`).join('')}
    <text class="s" x="${PR}" y="${SPT + 19}" text-anchor="end">16.6 ms budget</text>
    <g clip-path="url(#plot)" mask="url(#edge)">
      <path d="M${PL} ${BUD} H${PL + tw}" stroke="${D.faint}" stroke-dasharray="2 4"/>
      <g class="trace">
        <path d="${area}" fill="url(#under)"/>
        <path d="${line}" stroke="${D.signal}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </g>
  </g>
  </g>

  <g filter="url(#lift)">
  <rect x="${PX}" y="${PY}" width="${PW}" height="${PH}" rx="${PRD}" fill="${D.body}" stroke="${D.edge}"/>
  <rect x="${SX}" y="${SY}" width="${SW}" height="${SH}" rx="${SR}" fill="${D.screen}"/>
  <g clip-path="url(#scr)">
    <rect x="${PX + PW / 2 - 18}" y="${SY + 10}" width="36" height="4.5" rx="2.25" fill="${D.edge}"/>
    <rect x="${SX + 14}" y="${SY + 30}" width="58" height="9" rx="4.5" fill="${D.ink}" opacity=".9"/>
    <circle cx="${SX + SW - 23}" cy="${SY + 34}" r="8.5" fill="${D.primary}" opacity=".28"/>
    ${rows.map((r, i) => `<g class="row r${i + 1}">
      <rect x="${SX + 12}" y="${r.y}" width="${SW - 24}" height="36" rx="10" fill="${D.row}"/>
      <rect x="${SX + 21}" y="${r.y + 8}" width="21" height="21" rx="6" fill="${D.primary}" opacity=".34"/>
      <rect x="${SX + 50}" y="${r.y + 10}" width="${52 - (i % 3) * 9}" height="6" rx="3" fill="${D.ink}" opacity=".72"/>
      <rect x="${SX + 50}" y="${r.y + 22}" width="${33 + (i % 3) * 8}" height="5" rx="2.5" fill="${D.muted}" opacity=".5"/>
    </g>`).join('\n    ')}
    <rect class="scrim" x="${SX}" y="${SY}" width="${SW}" height="${SH}" fill="#000"/>
    <g class="sheet">
      <rect x="${SX}" y="${SREST}" width="${SW}" height="${SHEET_H + 18}" rx="18" fill="${D.sheet}" stroke="${D.edge}"/>
      <rect x="${SX + SW / 2 - 15}" y="${SREST + 9}" width="30" height="4" rx="2" fill="${D.faint}"/>
      <rect x="${SX + 16}" y="${SREST + 26}" width="72" height="9" rx="4.5" fill="${D.ink}" opacity=".9"/>
      <rect x="${SX + 16}" y="${SREST + 48}" width="${SW - 32}" height="6" rx="3" fill="${D.muted}" opacity=".45"/>
      <rect x="${SX + 16}" y="${SREST + 62}" width="${SW - 54}" height="6" rx="3" fill="${D.muted}" opacity=".45"/>
      <rect x="${SX + 16}" y="${SREST + 84}" width="${SW - 32}" height="31" rx="10" fill="${D.primary}"/>
      <rect x="${SX + SW / 2 - 20}" y="${SREST + 96}" width="40" height="7" rx="3.5" fill="${D.onPrimary}" opacity=".95"/>
    </g>
    <rect x="${SX + SW / 2 - 22}" y="${SY + SH - 11}" width="44" height="4" rx="2" fill="${D.ink}" opacity=".3"/>
  </g>
  </g>
  <rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="20" stroke="${t.hairline}"/>
</g>
</svg>
`;
}

// ═══ PANEL 2 — the stack, drawn ═══════════════════════════════════════════════
function stack(t) {
  const W = 880, H = 364, M = 48;
  const CH = 78;                                   // the channel one request runs down
  const BX = 104, BW = W - BX - M, BH = 60, GAP = 12;
  const ys = LAYERS.map((_, i) => 40 + i * (BH + GAP));
  const top = ys[0] + BH / 2, bot = ys[ys.length - 1] + BH / 2;
  const span = bot - top;
  const DUR = 4.2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" fill="none" role="img" aria-label="The stack in four layers: clients, what people touch; api, the contract; domain, where the rules live; data, the source of truth. A pulse travels down a channel on the left, lighting each layer as it passes.">
<defs>
  <filter id="beamglow" x="-300%" y="-8%" width="700%" height="116%">
    <feGaussianBlur stdDeviation="3"/>
  </filter>
</defs>
<style><![CDATA[
  .ly{font-family:${SANS};fill:${t.ink};font-size:16.5px;font-weight:600;letter-spacing:-.015em}
  .nt{font-family:${SANS};fill:${t.muted};font-size:13.5px}
  .tc{font-family:${MONO};fill:${t.muted};font-size:11px;letter-spacing:.03em}
  .cp{font-family:${MONO};fill:${t.muted};font-size:10.5px;letter-spacing:.06em}
  .beam{stroke-dasharray:30 ${span};animation:run ${DUR}s linear infinite}
  @keyframes run{from{stroke-dashoffset:30}to{stroke-dashoffset:-${span}}}
  .nd{animation:lit ${DUR}s linear infinite}
  @keyframes lit{0%,6%{opacity:1}14%,100%{opacity:.3}}
  .chip{animation:warm ${DUR}s linear infinite}
  @keyframes warm{0%,6%{opacity:.34}14%,100%{opacity:.15}}
  @media (prefers-reduced-motion: reduce){
    .beam{animation:none;stroke-dasharray:none;opacity:.5}
    .nd{animation:none;opacity:.75} .chip{animation:none;opacity:.18} }
]]></style>
<rect x=".5" y=".5" width="${W - 1}" height="${H - 1}" rx="20" fill="${t.bg}" stroke="${t.hairline}"/>

<path d="M${CH} ${top} V${bot}" stroke="${t.hairline}" stroke-width="1.5"/>
<g filter="url(#beamglow)" opacity=".85">
  <path d="M${CH} ${top} V${bot}" stroke="${t.signal}" stroke-width="3.5" stroke-linecap="round" class="beam"/>
</g>
<path d="M${CH} ${top} V${bot}" stroke="${t.signal}" stroke-width="2.25" stroke-linecap="round" class="beam"/>

${LAYERS.map((l, i) => {
  const y = ys[i], cy = y + BH / 2;
  const delay = (((cy - top) / span) * DUR).toFixed(2);
  return `<g>
  <path d="M${CH} ${cy} H${BX}" stroke="${t.hairline}" stroke-width="1.5"/>
  <rect x="${BX}" y="${y}" width="${BW}" height="${BH}" rx="14" fill="${t.surface}" stroke="${t.hairline}"/>
  <rect class="chip" x="${BX + 18}" y="${cy - 13}" width="26" height="26" rx="8" fill="${t.primary}" opacity=".15" style="animation-delay:${delay}s"/>
  <rect x="${BX + 27}" y="${cy - 4}" width="8" height="8" rx="2.5" fill="${t.primary}"/>
  <text class="ly" x="${BX + 58}" y="${cy + 6}">${l.name}</text>
  <text class="nt" x="${BX + 166}" y="${cy + 5}">${l.note}</text>
  <text class="tc" x="${W - M - 22}" y="${cy + 5}" text-anchor="end">${l.tech}</text>
  <circle class="nd" cx="${CH}" cy="${cy}" r="4" fill="${t.signal}" opacity=".3" style="animation-delay:${delay}s"/>
</g>`;
}).join('\n')}

<text class="cp" x="${M}" y="${H - 22}">one request, top to bottom</text>
</svg>
`;
}

for (const [name, t] of Object.entries(THEMES)) {
  writeFileSync(join(OUT, `hero-${name}.svg`), hero(t));
  writeFileSync(join(OUT, `stack-${name}.svg`), stack(t));
}
console.log('wrote 4 files to assets/');
