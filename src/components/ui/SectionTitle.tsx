import type { ReactNode } from "react";
import FadeIn from "./FadeIn";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  return (
    <FadeIn
      className={`${
        align === "center" ? "mx-auto text-center" : ""
      } max-w-4xl ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-8 bg-white/30" />
          {eyebrow}
        </span>
      )}
      <h2 className="display-h2 mt-5 text-white text-balance">{title}</h2>
      {description && (
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
