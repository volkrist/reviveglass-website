export type WorkStep = {
  number: string;
  title: string;
  description: string;
};

export const steps: WorkStep[] = [
  {
    number: "01",
    title: "Заявка",
    description: "Звонок, Telegram или форма на сайте — отвечаем в течение часа.",
  },
  {
    number: "02",
    title: "Выезд и замер",
    description: "Бесплатный выезд специалиста по Москве и МО.",
  },
  {
    number: "03",
    title: "Смета и договор",
    description: "Фиксируем объём и цену — стоимость не меняется в процессе.",
  },
  {
    number: "04",
    title: "Работы",
    description: "Профессиональная бригада, аккуратно и в срок.",
  },
  {
    number: "05",
    title: "Гарантия 3 года",
    description: "Подписываем акт и сопровождаем объект после сдачи.",
  },
];
