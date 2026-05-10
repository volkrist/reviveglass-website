export type Manager = {
  name: string;
  phone: string;
  phoneHref: string;
  role: string;
};

export const managers: Manager[] = [
  {
    name: "Сергей",
    phone: "+7 (909) 989-40-07",
    phoneHref: "tel:+79099894007",
    role: "Руководитель",
  },
  {
    name: "Руслан",
    phone: "+7 (985) 255-20-30",
    phoneHref: "tel:+79852552030",
    role: "Менеджер по работе с объектами",
  },
];

export const contacts = {
  email: "pokraspolir@yandex.ru",
  emailHref: "mailto:pokraspolir@yandex.ru",
  telegram: "@likrasss",
  telegramHref: "https://t.me/likrasss",
  whatsappHref: "https://wa.me/79099894007",
  region: "Москва и Московская область",
  signedBy: "Литяйкин Сергей Николаевич",
};
