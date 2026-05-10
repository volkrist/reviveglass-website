import { motion } from "framer-motion";

type Orb = {
  size: number;
  color: string;
  x: string;
  y: string;
  blur: number;
  duration: number;
  delay?: number;
  opacity?: number;
};

const defaultOrbs: Orb[] = [
  {
    size: 720,
    color: "rgba(43,179,217,0.35)",
    x: "20%",
    y: "10%",
    blur: 140,
    duration: 22,
    opacity: 0.7,
  },
  {
    size: 540,
    color: "rgba(27,110,140,0.5)",
    x: "78%",
    y: "30%",
    blur: 130,
    duration: 28,
    delay: 2,
    opacity: 0.55,
  },
  {
    size: 420,
    color: "rgba(43,179,217,0.22)",
    x: "55%",
    y: "75%",
    blur: 120,
    duration: 26,
    delay: 4,
    opacity: 0.45,
  },
];

type Props = {
  orbs?: Orb[];
  className?: string;
};

export default function FloatingOrbs({ orbs = defaultOrbs, className = "" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            translateX: "-50%",
            translateY: "-50%",
            background: `radial-gradient(circle at 50% 50%, ${orb.color} 0%, transparent 60%)`,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity ?? 0.5,
            willChange: "transform",
          }}
          animate={{
            x: [0, 40, -30, 20, 0],
            y: [0, -30, 25, -10, 0],
            scale: [1, 1.08, 0.96, 1.04, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay ?? 0,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
