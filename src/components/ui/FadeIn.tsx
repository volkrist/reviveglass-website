import { motion, type HTMLMotionProps, type Transition } from "framer-motion";
import type { ReactNode } from "react";

type Props = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  duration?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  y = 28,
  once = true,
  amount = 0.25,
  duration = 0.9,
  className,
  ...rest
}: Props) {
  const transition: Transition = {
    duration,
    delay,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={transition}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
