import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Send, ArrowUpRight, Check } from "lucide-react";
import Container from "../ui/Container";
import SectionTitle from "../ui/SectionTitle";
import FadeIn from "../ui/FadeIn";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { managers, contacts } from "../../data/contacts";

type FormValues = {
  name: string;
  phone: string;
  message?: string;
};

export default function Contacts() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 600));
    if (import.meta.env.DEV) {
      console.log("[REVIVE GLASS] Заявка:", data);
    }
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  return (
    <section id="contacts" className="section-pad relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 h-[420px] opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(43,179,217,0.28), rgba(14,14,16,0))",
        }}
      />
      <Container>
        <SectionTitle
          eyebrow="Контакты"
          title={
            <>
              Свяжемся —<br className="hidden md:block" /> и{" "}
              <span className="brand-text">всё посчитаем</span>
            </>
          }
          description="Звоните, пишите в Telegram или оставьте заявку — ответим в течение часа и вышлем расчёт."
        />

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 lg:col-span-5">
            {managers.map((m, i) => (
              <FadeIn key={m.phone} delay={i * 0.08}>
                <GlassCard className="p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.24em] text-muted">
                        {m.role}
                      </div>
                      <div className="mt-3 font-display text-2xl font-semibold tracking-tightish text-white md:text-3xl">
                        {m.name}
                      </div>
                    </div>
                    <a
                      href={m.phoneHref}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:border-brand/40 hover:bg-brand/10"
                      aria-label={`Позвонить ${m.name}`}
                    >
                      <Phone size={16} />
                    </a>
                  </div>
                  <a
                    href={m.phoneHref}
                    className="mt-5 inline-flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-brand md:text-xl"
                  >
                    {m.phone}
                    <ArrowUpRight size={16} className="opacity-60" />
                  </a>
                </GlassCard>
              </FadeIn>
            ))}

            <FadeIn delay={0.2}>
              <GlassCard className="p-7 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href={contacts.telegramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-brand/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      <Send size={16} className="text-brand" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                        Telegram
                      </span>
                      <span className="text-sm font-medium text-white">
                        {contacts.telegram}
                      </span>
                    </span>
                  </a>
                  <a
                    href={contacts.emailHref}
                    className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all hover:border-brand/30 hover:bg-white/[0.05]"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      <Mail size={16} className="text-brand" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                        E‑mail
                      </span>
                      <span className="break-all text-sm font-medium text-white">
                        {contacts.email}
                      </span>
                    </span>
                  </a>
                </div>
                <p className="mt-5 text-xs text-muted">
                  Регион работ: {contacts.region}. Бесплатный выезд для замера.
                </p>
              </GlassCard>
            </FadeIn>
          </div>

          <FadeIn delay={0.1} className="lg:col-span-7">
            <GlassCard className="p-7 md:p-10">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-white/20" />
                <span className="text-[11px] uppercase tracking-[0.24em] text-muted">
                  Заявка на расчёт
                </span>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tightish text-white md:text-3xl">
                Оставьте заявку — перезвоним
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-8 grid gap-4"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Ваше имя" error={errors.name?.message}>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Имя"
                      {...register("name", {
                        required: "Введите имя",
                        minLength: { value: 2, message: "Слишком короткое имя" },
                      })}
                      className="form-input"
                    />
                  </Field>
                  <Field label="Телефон" error={errors.phone?.message}>
                    <input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      {...register("phone", {
                        required: "Введите телефон",
                        pattern: {
                          value: /^[+\d][\d\s\-()]{6,}$/,
                          message: "Похоже, телефон указан некорректно",
                        },
                      })}
                      className="form-input"
                    />
                  </Field>
                </div>

                <Field label="Комментарий" error={errors.message?.message}>
                  <textarea
                    rows={4}
                    placeholder="Опишите задачу, объём, сроки"
                    {...register("message")}
                    className="form-input resize-none"
                  />
                </Field>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-md text-xs text-muted">
                    Нажимая «Отправить», вы соглашаетесь на обработку персональных данных в
                    рамках обработки заявки.
                  </p>
                  <Button as="button" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Отправляем…" : "Отправить заявку"}
                  </Button>
                </div>

                <AnimatePresence>
                  {sent && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="mt-2 flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand/[0.08] px-5 py-4 text-sm text-white"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand/20">
                        <Check size={14} className="text-brand" />
                      </span>
                      Спасибо! Заявка принята — свяжемся в течение часа.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </GlassCard>
          </FadeIn>
        </div>
      </Container>

      <style>{`
        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 16px 18px;
          color: #fff;
          font-family: inherit;
          font-size: 15px;
          transition: border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .form-input::placeholder { color: rgba(255,255,255,0.35); }
        .form-input:focus {
          outline: none;
          border-color: rgba(43,179,217,0.5);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 4px rgba(43,179,217,0.12);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-2 block text-xs text-red-300/90">{error}</span>
      )}
    </label>
  );
}
