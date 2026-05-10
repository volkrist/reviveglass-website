type Props = {
  opacity?: number;
  blend?: "overlay" | "soft-light" | "screen" | "normal";
  className?: string;
};

const NOISE_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
      <feColorMatrix type='matrix' values='0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.7 0'/>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`
)}`;

export default function NoiseOverlay({
  opacity = 0.06,
  blend = "overlay",
  className = "",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-0 ${className}`}
      style={{
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundRepeat: "repeat",
        opacity,
        mixBlendMode: blend,
      }}
    />
  );
}
