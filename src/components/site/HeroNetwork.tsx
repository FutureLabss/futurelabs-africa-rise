import React from 'react';

// Five engines on a pentagon around "productive capacity".
const NODES = [
  { x: 300, y: 90 },
  { x: 499.7, y: 235.1 },
  { x: 423.4, y: 469.9 },
  { x: 176.6, y: 469.9 },
  { x: 100.3, y: 235.1 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 2], [1, 3], [1, 4],
  [2, 3], [2, 4],
  [3, 4],
];

const LABELS = [
  { text: 'TALENT', x: 300, y: 58, anchor: 'middle' as const },
  { text: 'VENTURES', x: 528, y: 241, anchor: 'start' as const },
  { text: 'INDUSTRY', x: 446, y: 506, anchor: 'start' as const },
  { text: 'INSTITUTIONS', x: 154, y: 506, anchor: 'end' as const },
  { text: 'INTELLIGENCE', x: 72, y: 241, anchor: 'end' as const },
];

const lines = EDGES.map(([a, b]) => (
  <line key={`${a}-${b}`} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
));

export default function HeroNetwork() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="block h-auto w-full overflow-visible"
      role="img"
      aria-label="Talent, ventures, industry, institutions and intelligence connected around productive capacity"
    >
      <g stroke="#F58220" strokeOpacity=".2" strokeWidth="1" fill="none">{lines}</g>
      <g
        className="fl-motion"
        stroke="#FF9A3C"
        strokeOpacity=".9"
        strokeWidth="1.8"
        fill="none"
        strokeDasharray="7 40"
        strokeLinecap="round"
        style={{ animation: 'flFlow 2.2s linear infinite' }}
      >
        {lines}
      </g>
      <g fill="none" stroke="#F58220" strokeOpacity=".32">
        <circle cx="300" cy="300" r="210" />
        <circle
          className="fl-motion"
          cx="300"
          cy="300"
          r="120"
          strokeDasharray="2 10"
          style={{ transformOrigin: '300px 300px', animation: 'flSpin 44s linear infinite' }}
        />
      </g>
      <g fill="none" stroke="#FFB061" strokeWidth="1.4">
        {NODES.map((n, i) => (
          <circle
            key={i}
            className="fl-motion"
            cx={n.x}
            cy={n.y}
            r="9"
            style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `flRing 4s ease-out ${i * 0.8}s infinite` }}
          />
        ))}
      </g>
      <g fill="#FF9A3C">
        {NODES.map((n, i) => (
          <circle
            key={i}
            className="fl-motion"
            cx={n.x}
            cy={n.y}
            r="7"
            style={{ transformOrigin: `${n.x}px ${n.y}px`, animation: `flPulse 4s ease-in-out ${i * 0.8}s infinite` }}
          />
        ))}
      </g>
      <g fill="#F2F0EA" fontFamily="var(--font-mono), monospace" fontSize="19" fontWeight="500" letterSpacing="1.6">
        {LABELS.map((l) => (
          <text key={l.text} x={l.x} y={l.y} textAnchor={l.anchor}>{l.text}</text>
        ))}
      </g>
      <g fill="#B5B1A7" fontFamily="var(--font-mono), monospace" fontSize="14" letterSpacing="2" textAnchor="middle">
        <text x="300" y="293">PRODUCTIVE</text>
        <text x="300" y="316">CAPACITY</text>
      </g>
    </svg>
  );
}
