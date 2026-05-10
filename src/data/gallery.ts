export type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

export type GalleryCategoryKey = "before-after" | "process" | "objects" | "video";

export type GalleryCategory = {
  key: GalleryCategoryKey;
  label: string;
  items: GalleryItem[];
};

const photoPlaceholder = "/images/gallery/placeholder.svg";
const videoPoster = "/images/gallery/video-poster.svg";

export const galleryCategories: GalleryCategory[] = [
  {
    key: "before-after",
    label: "До / После",
    items: Array.from({ length: 6 }).map((_, i) => ({
      type: "image" as const,
      src: photoPlaceholder,
      alt: `Реставрация стеклопакета — пример ${i + 1}`,
    })),
  },
  {
    key: "process",
    label: "Процесс работы",
    items: Array.from({ length: 6 }).map((_, i) => ({
      type: "image" as const,
      src: photoPlaceholder,
      alt: `Процесс работы — фото ${i + 1}`,
    })),
  },
  {
    key: "objects",
    label: "Объекты",
    items: Array.from({ length: 6 }).map((_, i) => ({
      type: "image" as const,
      src: photoPlaceholder,
      alt: `Объект ${i + 1}`,
    })),
  },
  {
    key: "video",
    label: "Видео",
    items: Array.from({ length: 4 }).map((_, i) => ({
      type: "video" as const,
      src: "",
      poster: videoPoster,
      alt: `Видео процесса ${i + 1}`,
    })),
  },
];

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
    title: "Стеклопакет с глубокими царапинами",
    caption: "Шлифовка и полировка без замены стекла",
    before: "/images/before-after/placeholder-before-1.svg",
    after: "/images/before-after/placeholder-after-1.svg",
  },
  {
    id: "ba-2",
    title: "Окалины от сварки",
    caption: "Локальное удаление термических дефектов",
    before: "/images/before-after/placeholder-before-2.svg",
    after: "/images/before-after/placeholder-after-2.svg",
  },
  {
    id: "ba-3",
    title: "Покраска оконной рамы",
    caption: "RAL по выбору, 2 слоя без демонтажа",
    before: "/images/before-after/placeholder-before-3.svg",
    after: "/images/before-after/placeholder-after-3.svg",
  },
];
