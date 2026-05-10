import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hoverable?: boolean;
};

export default function GlassCard({
  children,
  hoverable = true,
  className = "",
  ...rest
}: Props) {
  return (
    <div
      className={`glass-card ${hoverable ? "glass-card-hover" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
