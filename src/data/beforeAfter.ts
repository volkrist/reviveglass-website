export type BeforeAfterPair = {
  id: string;
  title: string;
  caption: string;
  before: string;
  after: string;
};

export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "ba-1",
    title: "Покраска нижней панели оконной конструкции",
    caption: "Подготовка, маскировка и финишное покрытие без демонтажа",
    before: "/images/before-after/case-01-before.jpg",
    after: "/images/before-after/case-01-after.jpg",
  },
  {
    id: "ba-2",
    title: "Покраска вертикальной оконной рамы",
    caption: "Матовый тёмный RAL, аккуратная граница со стеклом",
    before: "/images/before-after/case-02-before.jpg",
    after: "/images/before-after/case-02-after.jpg",
  },
  {
    id: "ba-3",
    title: "Восстановление повреждённого участка рамы",
    caption: "Локальный ремонт трещины и восстановление покрытия",
    before: "/images/before-after/case-03-before.jpg",
    after: "/images/before-after/case-03-after.jpg",
  },
  {
    id: "ba-4",
    title: "Покраска панели у радиатора",
    caption: "Серебристое покрытие в зоне конвектора и примыканий",
    before: "/images/before-after/case-04-before.jpg",
    after: "/images/before-after/case-04-after.jpg",
  },
  {
    id: "ba-5",
    title: "Покраска оконной рамы и фурнитуры",
    caption: "Рама и петли в едином цвете, без замены фурнитуры",
    before: "/images/before-after/case-05-before.jpg",
    after: "/images/before-after/case-05-after.jpg",
  },
  {
    id: "ba-6",
    title: "Реставрация зоны у стеклопакета",
    caption: "Работы в зоне остекления с защитой прилегающих поверхностей",
    before: "/images/before-after/case-06-before.jpg",
    after: "/images/before-after/case-06-after.jpg",
  },
];
