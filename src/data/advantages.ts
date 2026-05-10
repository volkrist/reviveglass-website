import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  Flame,
  Eye,
  Brush,
  ShieldCheck,
  MapPin,
} from "lucide-react";

export type Advantage = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const advantages: Advantage[] = [
  {
    icon: Sparkles,
    title: "Убираем царапины",
    description: "Шлифовка и полировка — стекло снова без дефектов.",
  },
  {
    icon: Flame,
    title: "Удаляем следы сварки",
    description: "Локальная обработка окалин и термических пятен.",
  },
  {
    icon: Eye,
    title: "Восстанавливаем прозрачность",
    description: "Возвращаем стеклу заводской блеск и чистоту.",
  },
  {
    icon: Brush,
    title: "Красим рамы без демонтажа",
    description: "Финиш в 2 слоя прямо на объекте, без разборки.",
  },
  {
    icon: ShieldCheck,
    title: "Без замены конструкции",
    description: "Сохраняем оригинальные профили и стеклопакеты.",
  },
  {
    icon: MapPin,
    title: "Москва и МО",
    description: "Бесплатный выезд специалиста для замера и консультации.",
  },
];
