import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FadeIn from "../ui/FadeIn";
import { steps } from "../../data/steps";

export default function HowWeWork() {
  return (
    <section id="process" className="section-pad relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(50% 80% at 50% 0%, rgba(43,179,217,0.10), transparent 60%)",
        }}
      />
      <Container>
        <SectionTitle
          eyebrow="Процесс"
          title={
            <>
              Как мы <span className="brand-text">работаем</span>
            </>
          }
          description="Прозрачный процесс от заявки до сдачи объекта. Без сюрпризов в смете и сроках."
        />

        <div className="mt-16 lg:mt-20">
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent lg:block"
            />
            <div className="grid gap-10 lg:grid-cols-5 lg:gap-6">
              {steps.map((s, i) => (
                <FadeIn key={s.number} delay={i * 0.08} className="relative">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.08] bg-bg shadow-[0_0_0_6px_rgba(14,14,16,1)]">
                    <span className="font-display text-sm font-semibold tracking-[0.18em] text-brand">
                      {s.number}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full opacity-50 blur-md"
                      style={{
                        background:
                          "radial-gradient(closest-side, rgba(43,179,217,0.4), transparent)",
                      }}
                    />
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold tracking-tightish text-white md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                    {s.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
