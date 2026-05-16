import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Phone, Send, Calculator, ArrowDown } from "lucide-react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import FloatingOrbs from "../ui/FloatingOrbs";
import NoiseOverlay from "../ui/NoiseOverlay";
import { contacts, managers } from "../../data/contacts";

const HERO_VIDEO = "/videos/work-process-01.mp4";
const HERO_FALLBACK_IMAGE = "/images/pdf/pdf-bg-glass-facade.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const heroContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
    },
  },
};

const lineUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(14px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: EASE },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, ease: EASE },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);
  const orbsY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  const showVideo = videoReady && !videoFailed;

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 lg:min-h-[100svh] lg:pt-44"
    >
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-30"
      >
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            showVideo ? "opacity-100" : "opacity-0"
          }`}
          style={{
            filter: "saturate(0.7) contrast(1.05) brightness(0.45)",
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${HERO_FALLBACK_IMAGE}')`,
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            filter: "saturate(0.55) contrast(1.08) brightness(0.5)",
          }}
          animate={{ opacity: showVideo ? 0 : 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute inset-0"
          animate={{ opacity: showVideo ? 0 : 1 }}
          transition={{ duration: 1 }}
          style={{
            background:
              "linear-gradient(135deg, rgba(20,24,28,0.55) 0%, rgba(8,10,12,0.35) 50%, rgba(20,24,28,0.55) 100%)",
          }}
        />

        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,10,0.55) 0%, rgba(14,14,16,0.72) 45%, rgba(14,14,16,0.94) 88%, #0E0E10 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 65% at 50% 28%, rgba(43,179,217,0.14) 0%, transparent 65%)",
          }}
        />
      </motion.div>

      <motion.div style={{ y: orbsY }} className="absolute inset-0 -z-20">
        <FloatingOrbs />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid opacity-[0.18] mask-fade-b"
      />

      <NoiseOverlay opacity={0.05} blend="overlay" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% 35%, transparent 50%, rgba(0,0,0,0.4) 85%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-bg"
      />

      <Container>
        <motion.div
          style={{ y: contentY, opacity: fade }}
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-12"
        >
          <motion.div className="min-w-0 lg:col-span-8 xl:col-span-9">
            <motion.div variants={fadeUp} className="flex items-center gap-3">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand shadow-[0_0_24px_rgba(43,179,217,0.9)]" />
              </span>
              <span className="eyebrow">
                Москва · Московская область — выезд бесплатно
              </span>
            </motion.div>

            <h1 className="display-h1 mt-8 text-white text-balance">
              <span className="block overflow-hidden">
                <motion.span variants={lineUp} className="block">
                  Реставрация
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span variants={lineUp} className="block">
                  стеклопакетов
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  variants={lineUp}
                  className="block font-display italic font-light tracking-tightest"
                >
                  без{" "}
                  <span className="brand-text not-italic font-extrabold">
                    замены
                  </span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              Покраска оконных рам, шлифовка и полировка стеклопакетов на
              фасадных конструкциях. Возвращаем заводской блеск стёклам и
              обновляем рамы прямо на объекте, без демонтажа.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-wrap items-center gap-3"
            >
              <Button
                as="a"
                href="#contacts"
                variant="primary"
                icon={<Calculator size={18} />}
              >
                Рассчитать стоимость
              </Button>
              <Button
                as="a"
                href={contacts.telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="glass"
                icon={<Send size={18} />}
              >
                Написать в Telegram
              </Button>
              <Button
                as="a"
                href={managers[0].phoneHref}
                variant="ghost"
                icon={<Phone size={18} />}
              >
                Позвонить
              </Button>
            </motion.div>
          </motion.div>

          <motion.aside
            variants={fadeUp}
            className="lg:col-span-4 lg:pb-2 xl:col-span-3"
            aria-label="Ключевые показатели"
          >
            <ul className="flex flex-col gap-6">
              {[
                { v: "от 1 800 ₽", l: "за пог. м" },
                { v: "3 года", l: "гарантия" },
                { v: "Бесплатно", l: "выезд по МСК и МО" },
              ].map((it, i) => (
                <li key={it.l} className="relative pl-5">
                  <span className="absolute left-0 top-2.5 h-px w-3 bg-brand/70" />
                  <span className="font-display text-2xl font-semibold tracking-tightish text-white md:text-3xl">
                    {it.v}
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.22em] text-muted">
                    {it.l}
                  </span>
                  {i < 2 && (
                    <span className="mt-6 block h-px w-full bg-white/[0.06]" />
                  )}
                </li>
              ))}
            </ul>
          </motion.aside>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-white/40 md:flex lg:bottom-10"
        >
          <ArrowDown size={12} className="animate-bounce" />
          Прокрутите ниже
        </motion.div>
      </Container>
    </section>
  );
}
