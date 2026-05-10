export type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export const stats: Stat[] = [
  { value: "15+", label: "лет опыта", hint: "в реставрации остекления" },
  { value: "10 000+", label: "м² восстановлено", hint: "стеклопакетов и рам" },
  { value: "3 года", label: "гарантия", hint: "на каждую работу" },
  { value: "МСК / МО", label: "регион работ", hint: "выезд бесплатно" },
];
