import Container from "../ui/Container";
import GlassCard from "../ui/GlassCard";
import SectionTitle from "../ui/SectionTitle";
import FadeIn from "../ui/FadeIn";
import { advantages } from "../../data/advantages";

export default function WhatWeRestore() {
  return (
    <section id="restore" className="section-pad relative">
      <Container>
        <SectionTitle
          eyebrow="Что мы реставрируем"
          title={
            <>
              Когда не нужно
              <br className="hidden md:block" /> менять{" "}
              <span className="brand-text">стеклопакет</span>
            </>
          }
          description="Возвращаем стёклам прозрачность и обновляем рамы прямо на объекте — без демонтажа и без замены конструкций."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {advantages.map((a, i) => {
            const Icon = a.icon;
            return (
              <FadeIn key={a.title} delay={i * 0.06}>
                <GlassCard className="group h-full overflow-hidden p-7 md:p-8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-12 left-1/2 -z-0 h-40 w-[120%] -translate-x-1/2 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(closest-side, rgba(43,179,217,0.18), transparent 70%)",
                    }}
                  />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] transition-colors duration-500 group-hover:border-brand/30 group-hover:bg-brand/[0.06]">
                    <Icon
                      size={20}
                      className="text-brand transition-transform duration-500 group-hover:scale-110"
                      strokeWidth={1.6}
                    />
                  </div>
                  <h3 className="relative mt-7 font-display text-xl font-semibold tracking-tightish text-white md:text-2xl">
                    {a.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted md:text-base">
                    {a.description}
                  </p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
