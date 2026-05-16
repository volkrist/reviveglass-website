import { useRef, useState } from "react";
import ReactCompareImage from "react-compare-image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Container from "../ui/Container";
import FadeIn from "../ui/FadeIn";
import NoiseOverlay from "../ui/NoiseOverlay";
import { beforeAfterPairs } from "../../data/beforeAfter";

const EASE = [0.22, 1, 0.36, 1] as const;

function CompareHandle() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-brand/30 blur-md" />
      <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-md shadow-[0_0_30px_rgba(43,179,217,0.55)]">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          aria-hidden
        >
          <path
            d="M8 6L3 11L8 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 6L19 11L14 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);
  const pair = beforeAfterPairs[active];
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);

  return (
    <section
      ref={ref}
      id="before-after"
      className="relative isolate overflow-hidden py-16 md:py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(43,179,217,0.12) 0%, rgba(14,14,16,0) 60%), linear-gradient(180deg, #0a0a0c 0%, #0E0E10 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <NoiseOverlay opacity={0.04} />

      <Container>
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <FadeIn className="max-w-3xl">
            <span className="eyebrow">
              <span className="h-px w-8 bg-white/30" />
              До и После
            </span>
            <h2 className="display-h2 mt-4 text-white text-balance">
              Двигайте шторку —
              <br className="hidden md:block" />
              <span className="brand-text">видно результат</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
              Реальные результаты работ. Тяните разделитель — состояние
              стеклопакета или рамы до и после реставрации, без замены конструкций.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span className="h-px w-8 bg-white/15" />
              <span>{String(beforeAfterPairs.length).padStart(2, "0")}</span>
            </div>
          </FadeIn>
        </div>
      </Container>

      <motion.div style={{ y: stageY }} className="relative mt-8 md:mt-10">
        <Container className="relative">
          <div className="relative mx-auto max-w-4xl">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-6 -right-6 -top-8 -bottom-8 -z-10 rounded-[40px] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(43,179,217,0.25), transparent 70%)",
              }}
            />

            <div className="ba-stage relative overflow-hidden rounded-2xl border border-white/[0.08] bg-bg-soft shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] md:rounded-3xl">
              <div className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/85 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Было
              </div>
              <div className="absolute right-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/15 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-md">
                Стало
                <span className="h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(43,179,217,0.9)]" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={pair.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="ba-compare h-[min(58vh,600px)] w-full sm:h-[min(62vh,680px)] md:h-[min(65vh,760px)]"
                >
                  <ReactCompareImage
                    leftImage={pair.before}
                    rightImage={pair.after}
                    sliderLineColor="rgba(255,255,255,0.85)"
                    sliderLineWidth={2}
                    handle={<CompareHandle />}
                    hover={false}
                  />
                </motion.div>
              </AnimatePresence>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl md:rounded-3xl"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 50%, transparent 70%, rgba(0,0,0,0.45) 100%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg/40 to-transparent"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col items-start gap-0.5 text-white md:bottom-5 md:left-5 md:right-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                  {String(active + 1).padStart(2, "0")} · {pair.title}
                </div>
                <div className="font-display text-sm font-medium md:text-base">
                  {pair.caption}
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2 md:mt-8 md:gap-3">
            {beforeAfterPairs.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative flex items-center gap-2 rounded-full border px-3 py-2 transition-all duration-500 md:gap-3 md:px-4 md:py-2.5 ${
                    isActive
                      ? "border-brand/40 bg-brand/[0.08] shadow-[0_0_40px_-10px_rgba(43,179,217,0.5)]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                  }`}
                >
                  <span
                    className={`font-display text-[11px] font-semibold tracking-[0.3em] ${
                      isActive ? "text-brand" : "text-muted"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-xs md:text-sm ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {p.title}
                  </span>
                </button>
              );
            })}
          </div>
        </Container>
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
