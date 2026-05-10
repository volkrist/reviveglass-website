import { motion } from "framer-motion";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";

const EASE = [0.22, 1, 0.36, 1] as const;

const photos = [
  {
    src: "/images/pdf/team-work-1.jpg",
    title: "Реставрация на фасаде",
    caption:
      "Шлифовка и полировка стеклопакетов прямо на высоте — без демонтажа конструкций.",
    meta: "Процесс · стеклопакет",
  },
  {
    src: "/images/pdf/team-work-2.jpg",
    title: "Покраска оконных рам",
    caption:
      "Финишное покрытие в 2 слоя на объекте. Защита прилегающих поверхностей.",
    meta: "Процесс · покраска",
  },
];

export default function OnSite() {
  return (
    <section
      id="onsite"
      className="relative isolate overflow-hidden py-24 md:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(43,179,217,0.08) 0%, transparent 60%)",
        }}
      />

      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-12">
          <FadeIn className="md:col-span-7">
            <span className="eyebrow">
              <span className="h-px w-8 bg-white/30" />
              На объекте
            </span>
            <h2 className="display-h2 mt-5 text-white text-balance">
              Команда{" "}
              <span className="brand-text">Revive Glass</span>
              <br className="hidden md:block" /> в работе
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-5">
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Работаем на фасадных конструкциях и в интерьерах. Профессиональное
              оборудование, аккуратные технологии — без замены и без шума на
              объекте.
            </p>
          </FadeIn>
        </div>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8 lg:gap-10">
          {photos.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, delay: i * 0.12, ease: EASE }}
              className={`group relative ${
                i === 1 ? "md:mt-12 lg:mt-20" : ""
              }`}
            >
              <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-bg-soft shadow-[0_50px_120px_-40px_rgba(0,0,0,0.85)]">
                <div className="aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]">
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,8,10,0) 40%, rgba(8,8,10,0.55) 75%, rgba(8,8,10,0.85) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 70% at 50% 60%, rgba(43,179,217,0.16), transparent 70%)",
                  }}
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7 md:p-9">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/60">
                    <span className="font-display tracking-[0.3em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-white/25" />
                    <span>{p.meta}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tightish text-white md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-white/75 md:text-[15px]">
                    {p.caption}
                  </p>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
