import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Send } from "lucide-react";
import Container from "./Container";
import { contacts } from "../../data/contacts";

const links = [
  { href: "#services", label: "Услуги" },
  { href: "#before-after", label: "До / После" },
  { href: "#gallery", label: "Галерея" },
  { href: "#process", label: "Как мы работаем" },
  { href: "#contacts", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-[68px] items-center justify-between md:h-[78px]">
          <a
            href="#top"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src="/images/logo-white.png"
              alt="Revive Glass"
              className="h-9 w-auto md:h-10"
              loading="eager"
            />
            <span className="hidden font-display text-[13px] font-semibold tracking-[0.32em] text-white/90 sm:block">
              REVIVE GLASS
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-white"
              >
                <span className="relative">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-500 ease-out group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={contacts.telegramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-base border border-white/10 bg-white/[0.04] text-sm text-white backdrop-blur-xl transition-colors hover:border-brand/40 hover:bg-white/[0.08]"
            >
              <Send size={16} />
              Telegram
            </a>
          </div>

          <button
            aria-label="Меню"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden"
          >
            <div className="border-t border-white/[0.06] bg-bg/95 backdrop-blur-xl">
              <Container>
                <div className="flex flex-col gap-1 py-6">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="rounded-2xl px-4 py-4 text-base text-white/85 hover:bg-white/5"
                    >
                      {l.label}
                    </a>
                  ))}
                  <a
                    href={contacts.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-4 text-sm text-white"
                  >
                    <Send size={16} />
                    Написать в Telegram
                  </a>
                </div>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
