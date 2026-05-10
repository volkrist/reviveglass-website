import { motion } from "framer-motion";
import Container from "../ui/Container";
import { stats } from "../../data/stats";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Stats() {
  return (
    <section
      aria-label="Ключевые цифры"
      className="relative -mt-12 pb-10 md:-mt-20 md:pb-16 lg:-mt-28 lg:pb-20"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(60% 80% at 50% 0%, rgba(43,179,217,0.18), transparent 60%)",
            }}
          />
          <ul className="relative grid grid-cols-2 divide-y divide-white/[0.06] sm:divide-y-0 lg:grid-cols-4">
            {stats.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.08 * i, ease: EASE }}
                className={`relative px-6 py-7 md:px-8 md:py-9 lg:px-10 lg:py-10 ${
                  i % 2 === 1 ? "border-l border-white/[0.06]" : ""
                } ${
                  i >= 2 ? "lg:border-l lg:border-white/[0.06]" : ""
                } lg:border-l ${i === 0 ? "lg:!border-l-0" : ""}`}
              >
                <div className="font-display text-3xl font-bold tracking-tightish text-white md:text-4xl lg:text-[2.6rem]">
                  {s.value}
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.18em] text-white/80 md:text-[13px]">
                  {s.label}
                </div>
                {s.hint && (
                  <div className="mt-2 text-xs text-muted md:text-[13px]">
                    {s.hint}
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
}
