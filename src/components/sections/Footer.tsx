import Container from "../ui/Container";
import { contacts, managers } from "../../data/contacts";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-bg-deep/60">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="group inline-flex items-center gap-4 transition-opacity hover:opacity-90"
            >
              <img
                src="/images/logo-white.png"
                alt="Revive Glass"
                className="h-16 w-auto md:h-20"
                loading="lazy"
              />
              <span className="font-display text-xl font-bold tracking-[0.22em] text-white md:text-2xl">
                REVIVE&nbsp;GLASS
              </span>
            </a>
            <p className="mt-7 max-w-md text-sm leading-relaxed text-muted md:text-[15px]">
              Реставрация стеклопакетов и покраска оконных рам без демонтажа. Работаем по
              Москве и Московской области. Гарантия 3 года.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
              Контакты
            </div>
            <ul className="mt-5 space-y-3 text-sm">
              {managers.map((m) => (
                <li key={m.phone}>
                  <a
                    href={m.phoneHref}
                    className="text-white/85 transition-colors hover:text-white"
                  >
                    {m.phone}
                    <span className="ml-2 text-muted">— {m.name}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={contacts.emailHref}
                  className="break-all text-white/85 transition-colors hover:text-white"
                >
                  {contacts.email}
                </a>
              </li>
              <li>
                <a
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 transition-colors hover:text-white"
                >
                  Telegram {contacts.telegram}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
              Навигация
            </div>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <li>
                <a href="#services" className="text-white/85 hover:text-white">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#before-after" className="text-white/85 hover:text-white">
                  До / После
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-white/85 hover:text-white">
                  Галерея
                </a>
              </li>
              <li>
                <a href="#process" className="text-white/85 hover:text-white">
                  Процесс
                </a>
              </li>
              <li>
                <a href="#conditions" className="text-white/85 hover:text-white">
                  Условия
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-white/85 hover:text-white">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline" />

        <div className="flex flex-col items-start justify-between gap-3 py-8 text-xs text-muted md:flex-row md:items-center">
          <span>© {year} Revive Glass. Все права защищены.</span>
          <span>{contacts.signedBy}</span>
        </div>
      </Container>
    </footer>
  );
}
