import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import GlassCard from "../ui/GlassCard";
import { conditions } from "../../data/conditions";

export default function Conditions() {
  return (
    <section id="conditions" className="section-pad relative">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="min-w-0 lg:col-span-5 lg:pr-4 lg:sticky lg:top-28 lg:self-start">
            <FadeIn>
              <span className="eyebrow">
                <span className="h-px w-8 bg-white/30" />
                Условия
              </span>
              <h2
                className="mt-5 font-display font-bold leading-[1.02] tracking-tightest text-white"
                style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}
              >
                Прозрачные
                <br />
                <span className="brand-text">правила&nbsp;игры</span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg">
                Подбираем материалы и график работ под задачу. Цена и сроки —
                фиксируются договором.
              </p>
            </FadeIn>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <ul className="grid gap-4 md:gap-5">
              {conditions.map((c, i) => {
                const Icon = c.icon;
                return (
                  <FadeIn key={c.title} delay={i * 0.06}>
                    <li>
                      <GlassCard className="group relative flex items-start gap-6 p-6 md:gap-8 md:p-7">
                        <span className="font-display text-xs font-semibold tracking-[0.24em] text-muted">
                          0{i + 1}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-display text-xl font-semibold tracking-tightish text-white md:text-2xl">
                              {c.title}
                            </h3>
                            <Icon
                              size={18}
                              strokeWidth={1.5}
                              className="flex-none text-brand opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                            />
                          </div>
                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:text-[15px]">
                            {c.text}
                          </p>
                        </div>
                      </GlassCard>
                    </li>
                  </FadeIn>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
