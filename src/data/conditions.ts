import type { LucideIcon } from "lucide-react";
import { FileSignature, Receipt, CreditCard, Building2, Percent } from "lucide-react";

export type Condition = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const conditions: Condition[] = [
  {
    icon: Receipt,
    title: "Фиксированная смета",
    text: "После согласования объёма цена не меняется до конца работ.",
  },
  {
    icon: FileSignature,
    title: "Договор",
    text: "Подробное описание услуг, сроков и гарантийных обязательств.",
  },
  {
    icon: CreditCard,
    title: "Нал и безнал",
    text: "Любые удобные способы оплаты — наличный и безналичный расчёт.",
  },
  {
    icon: Building2,
    title: "Документы для юрлиц",
    text: "Полный пакет закрывающих документов для бухгалтерии.",
  },
  {
    icon: Percent,
    title: "Скидки на объём",
    text: "При больших объёмах — индивидуальные условия и скидки на все виды работ.",
  },
];
