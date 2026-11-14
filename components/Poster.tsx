import { useId } from "react";
import type { PosterKind } from "@/data/portfolio";

type Props = {
  kind: PosterKind;
  /** [fondo, figura, acento] */
  colors: [string, string, string];
  label?: string;
  className?: string;
};

const INVADER = [
  "00100000100",
  "00010001000",
  "00111111100",
  "01101110110",
  "11111111111",
  "10111111101",
  "10100000101",
  "00011011000",
];

/** Portada pop generada con SVG: semitonos + una figura grande. */
export default function Poster({ kind, colors, label, className }: Props) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [bg, fg, accent] = colors;

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={label ?? kind}
    >
      <defs>
        <pattern id={`d${id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <circle cx="7" cy="7" r="3.2" fill={fg} opacity="0.22" />
        </pattern>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.28" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={bg} />
      <rect width="400" height="500" fill={`url(#d${id})`} />
      <rect x="-40" y="330" width="480" height="90" fill={accent} transform="rotate(-8 200 375)" />

      {kind === "vinyl" && (
        <g transform="translate(200 235)">
          <circle r="150" fill={fg} />
          {[130, 112, 94, 76].map((r) => (
            <circle key={r} r={r} fill="none" stroke={bg} strokeOpacity="0.35" strokeWidth="1.5" />
          ))}
          <circle r="52" fill={accent} />
          <circle r="8" fill={bg} />
          <path d="M-150 0 A150 150 0 0 1 0 -150" fill="none" stroke={bg} strokeOpacity="0.5" strokeWidth="6" />
        </g>
      )}

      {kind === "pixel" && (
        <g transform="translate(57 120)">
          {INVADER.flatMap((row, y) =>
            row.split("").map((c, x) =>
              c === "1" ? (
                <rect key={`${x}-${y}`} x={x * 26} y={y * 26} width="26.5" height="26.5" fill={fg} />
              ) : null,
            ),
          )}
        </g>
      )}

      {kind === "code" && (
        <g fontFamily="var(--font-anton), Impact, sans-serif" fill={fg} textAnchor="middle">
          <text x="200" y="300" fontSize="230">{"</>"}</text>
        </g>
      )}

      {kind === "anime" && (
        <g>
          {Array.from({ length: 18 }).map((_, i) => (
            <path
              key={i}
              d="M200 235 L196 -200 L204 -200 Z"
              fill={fg}
              opacity={i % 2 ? 0.9 : 0.5}
              transform={`rotate(${i * 20} 200 235)`}
            />
          ))}
          <circle cx="200" cy="235" r="96" fill={accent} />
          <text
            x="200"
            y="262"
            textAnchor="middle"
            fontSize="78"
            fontWeight="900"
            fill={fg}
            fontFamily="'Yu Gothic', 'Hiragino Sans', 'Noto Sans JP', sans-serif"
          >
            アニメ
          </text>
        </g>
      )}

      {(kind === "initials" || kind === "number") && (
        <text
          x="200"
          y="330"
          textAnchor="middle"
          fontSize={kind === "initials" ? 290 : 300}
          fill={fg}
          fontFamily="var(--font-anton), Impact, sans-serif"
        >
          {label}
        </text>
      )}

      <rect width="400" height="500" fill={`url(#g${id})`} />
    </svg>
  );
}
