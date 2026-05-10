import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Variant = "primary" | "glass" | "ghost";

type CommonProps = {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
};

type AnchorProps = CommonProps &
  Omit<HTMLMotionProps<"a">, "children" | "className"> & {
    as: "a";
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<HTMLMotionProps<"button">, "children" | "className"> & {
    as?: "button";
  };

type Props = AnchorProps | ButtonProps;

const base =
  "btn-base group relative overflow-hidden whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50";

const variants: Record<Variant, string> = {
  primary:
    "text-white border border-white/10 bg-brand-gradient shadow-[0_10px_40px_-10px_rgba(43,179,217,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(43,179,217,0.8)]",
  glass:
    "text-white border border-white/15 bg-white/[0.04] backdrop-blur-xl hover:border-brand/40 hover:bg-white/[0.08]",
  ghost:
    "text-white/85 border border-transparent hover:text-white hover:bg-white/[0.04]",
};

export default function Button(props: Props) {
  const { variant = "glass", children, icon, className = "", ...rest } = props;
  const cls = `${base} ${variants[variant]} ${className}`;
  const motionProps = {
    whileHover: { scale: 1.02, y: -1 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring" as const, stiffness: 320, damping: 22 },
  };

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px 60px at var(--mx,50%) 50%, rgba(255,255,255,0.18), transparent 70%)",
        }}
      />
    </>
  );

  if ("as" in rest && rest.as === "a") {
    const { as: _as, ...anchorRest } = rest;
    void _as;
    return (
      <motion.a {...motionProps} {...anchorRest} className={cls}>
        {inner}
      </motion.a>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonProps;
  void _as;
  return (
    <motion.button type="button" {...motionProps} {...buttonRest} className={cls}>
      {inner}
    </motion.button>
  );
}
