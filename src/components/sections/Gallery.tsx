import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Keyboard } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FadeIn from "../ui/FadeIn";
import {
  galleryCategories,
  type GalleryCategoryKey,
} from "../../data/gallery";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Gallery() {
  const [active, setActive] = useState<GalleryCategoryKey>("process");
  const cat = galleryCategories.find((c) => c.key === active)!;

  return (
    <section id="gallery" className="section-pad relative">
      <Container>
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="Галерея"
            title={
              <>
                Работы и <span className="brand-text">процесс</span>
              </>
            }
            description="Реальные кадры с объектов: процесс реставрации, готовые работы и видео в действии."
          />

          <FadeIn delay={0.15}>
            <div className="no-scrollbar flex max-w-full snap-x gap-2 overflow-x-auto rounded-full border border-white/[0.06] bg-white/[0.02] p-1.5">
              {galleryCategories.map((c) => {
                const on = c.key === active;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setActive(c.key)}
                    className={`relative snap-start whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition-colors ${
                      on ? "text-white" : "text-muted hover:text-white/80"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="gallery-tab"
                        className="absolute inset-0 -z-0 rounded-full border border-white/10 bg-white/[0.06]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </Container>

      <FadeIn delay={0.2}>
        <div className="relative mt-14 lg:mt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(43,179,217,0.10), transparent 60%)",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <Swiper
                modules={[Navigation, Pagination, A11y, Keyboard]}
                spaceBetween={24}
                slidesPerView={1.15}
                centeredSlides
                grabCursor
                loop={cat.items.length > 4}
                navigation
                keyboard={{ enabled: true }}
                pagination={{ clickable: true, dynamicBullets: true }}
                breakpoints={{
                  640: { slidesPerView: 1.4, spaceBetween: 24 },
                  1024: { slidesPerView: 1.8, spaceBetween: 32 },
                  1280: { slidesPerView: 2.1, spaceBetween: 36 },
                }}
                className="cinema-swiper !pb-16"
              >
                {cat.items.map((item, i) => (
                  <SwiperSlide key={`${cat.key}-${i}`}>
                    <div className="group relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/[0.08] bg-bg-soft shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
                      {item.type === "image" ? (
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                        />
                      ) : (
                        <VideoTile
                          poster={item.poster!}
                          src={item.src}
                          alt={item.alt}
                        />
                      )}

                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 50% 50%, rgba(43,179,217,0.18), transparent 70%)",
                        }}
                      />

                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-[11px] uppercase tracking-[0.22em] text-white/85">
                        <span>{cat.label}</span>
                        <span className="font-display tracking-[0.28em] text-white/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </AnimatePresence>

          <Container>
            <p className="mt-2 text-xs uppercase tracking-[0.24em] text-muted">
              Фото и видео материалы будут добавлены — секция готова к загрузке.
            </p>
          </Container>
        </div>
      </FadeIn>
    </section>
  );
}

function VideoTile({
  poster,
  src,
  alt,
}: {
  poster: string;
  src: string;
  alt: string;
}) {
  if (!src) {
    return (
      <div className="relative h-full w-full">
        <img
          src={poster}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <span className="absolute inset-0 -z-10 rounded-full bg-brand/30 blur-xl" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-xl transition-all duration-700 group-hover:scale-110 group-hover:border-brand/50">
              <Play
                size={22}
                className="ml-1 text-white drop-shadow-[0_0_12px_rgba(43,179,217,0.8)]"
                fill="white"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <video
      src={src}
      poster={poster}
      muted
      autoPlay
      loop
      playsInline
      preload="metadata"
      className="h-full w-full object-cover"
      aria-label={alt}
    />
  );
}
