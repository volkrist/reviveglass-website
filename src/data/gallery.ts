export type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

export type GalleryCategoryKey =
  | "before-after"
  | "process"
  | "results"
  | "video";

export type GalleryCategory = {
  key: GalleryCategoryKey;
  label: string;
  items: GalleryItem[];
};

const teamWindows = "/images/pdf/team-work-1.jpg";
const teamWorkers = "/images/pdf/team-work-2.jpg";

const ba = (n: number, kind: "before" | "after") =>
  `/images/before-after/case-${String(n).padStart(2, "0")}-${kind}.jpg`;

export const galleryCategories: GalleryCategory[] = [
  {
    key: "before-after",
    label: "До / После",
    items: [1, 2, 3, 4, 5, 6].map((n) => ({
      type: "image" as const,
      src: ba(n, "after"),
      alt: `Результат работ — кейс ${n}`,
    })),
  },
  {
    key: "process",
    label: "Процесс работы",
    items: [
      {
        type: "image" as const,
        src: teamWindows,
        alt: "Подготовка объекта — защита стеклопакетов перед покраской рам",
      },
      {
        type: "image" as const,
        src: teamWorkers,
        alt: "Команда Revive Glass — работы на высоте на объекте",
      },
      {
        type: "image" as const,
        src: ba(2, "before"),
        alt: "Покраска вертикальной рамы — этап маскировки и нанесения",
      },
      {
        type: "image" as const,
        src: ba(4, "before"),
        alt: "Покраска панели у конвектора — подготовка поверхности",
      },
      {
        type: "image" as const,
        src: ba(5, "before"),
        alt: "Покраска рамы и петель — состояние до работ",
      },
      {
        type: "image" as const,
        src: ba(1, "before"),
        alt: "Покраска нижней панели — подготовка и маскировка",
      },
    ],
  },
  {
    key: "results",
    label: "Готовый результат",
    items: [
      {
        type: "image" as const,
        src: ba(5, "after"),
        alt: "Готовая покраска оконной рамы и фурнитуры",
      },
      {
        type: "image" as const,
        src: ba(2, "after"),
        alt: "Готовая покраска вертикальной оконной рамы",
      },
      {
        type: "image" as const,
        src: ba(4, "after"),
        alt: "Готовая покраска панели у радиатора",
      },
      {
        type: "image" as const,
        src: ba(1, "after"),
        alt: "Готовая покраска нижней панели оконной конструкции",
      },
      {
        type: "image" as const,
        src: ba(3, "after"),
        alt: "Восстановленный участок рамы после ремонта",
      },
      {
        type: "image" as const,
        src: ba(6, "after"),
        alt: "Зона у стеклопакета после реставрационных работ",
      },
    ],
  },
  {
    key: "video",
    label: "Видео",
    items: [
      {
        type: "video" as const,
        src: "/videos/work-process-01.mp4",
        poster: "/images/gallery/poster-work-01.jpg",
        alt: "Процесс работ на объекте — покраска и подготовка",
      },
      {
        type: "video" as const,
        src: "/videos/work-process-02.mp4",
        poster: "/images/gallery/poster-work-02.jpg",
        alt: "Команда за работой на фасаде",
      },
      {
        type: "video" as const,
        src: "/videos/before-after-video-01.mp4",
        poster: "/images/gallery/poster-ba-video-01.jpg",
        alt: "Результат до и после на объекте",
      },
    ],
  },
];
