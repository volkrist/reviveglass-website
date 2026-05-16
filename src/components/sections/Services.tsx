import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FadeIn from "../ui/FadeIn";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { services } from "../../data/services";
import { contacts } from "../../data/contacts";

export default function Services() {
  return (
    <section
      id="services"
      className="section-pad relative bg-bg-soft/40"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <Container>
        <SectionTitle
          eyebrow="Услуги"
          title={
            <>
              Две услуги — <span className="brand-text">один уровень</span> качества
            </>
          }
          description="Профессиональные материалы, проверенное оборудование и фиксированная гарантия 3 года на каждую работу."
        />

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-2">
          {services.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.1}>
              <GlassCard className="group relative flex h-full flex-col overflow-hidden p-8 md:p-12">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-24 left-1/2 -z-0 h-64 w-[120%] -translate-x-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(closest-side, rgba(43,179,217,0.18), transparent 70%)",
                  }}
                />
                <div className="relative flex items-start justify-between gap-6">
                  <span className="font-display text-sm font-semibold tracking-[0.3em] text-brand/80">
                    {s.index}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted">
                    <ShieldCheck size={13} className="text-brand" />
                    Гарантия {s.warranty}
                  </span>
                </div>

                <motion.div
                  className="relative mt-8 aspect-[16/10] overflow-hidden rounded-3xl border border-white/[0.08]"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={s.image}
                    alt={s.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05]"
                  />
                  <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/10"
                  />
                </motion.div>

                <h3 className="mt-8 font-display text-3xl font-bold leading-[1.05] tracking-tightish text-white md:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-5 text-base text-muted md:text-lg">{s.lede}</p>

                <div className="mt-8 hairline" />

                <div className="mt-8 grid gap-3">
                  {s.steps.map((step) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-brand/30 bg-brand/10">
                        <Check size={11} className="text-brand" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm text-white/85 md:text-base">{step}</span>
                    </div>
                  ))}
                </div>

                <ul className="mt-8 grid gap-2.5">
                  {s.extras.map((e) => (
                    <li
                      key={e}
                      className="text-sm leading-relaxed text-muted md:text-[15px]"
                    >
                      — {e}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10">
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                        Стоимость
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="font-display text-4xl font-bold tracking-tightish text-white md:text-5xl">
                          {s.price.value}
                        </span>
                        <span className="text-sm text-muted">{s.price.unit}</span>
                      </div>
                    </div>
                    <Button
                      as="a"
                      href={contacts.telegramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="glass"
                      icon={<ArrowUpRight size={16} />}
                    >
                      Обсудить объём
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mt-10 max-w-2xl text-sm text-muted md:text-base">
            Сроки выполнения зависят от объёма — у нас большой штат профессиональных
            специалистов. При больших объёмах действует индивидуальная скидка на все виды
            работ.
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
