# REVIVE GLASS — Premium Landing

Премиальный одностраничный лендинг для компании REVIVE GLASS — реставрация стеклопакетов и покраска оконных рам в Москве и МО.

## Стек

- Vite + React 18 + TypeScript
- Tailwind CSS
- Framer Motion (анимации)
- Swiper (галерея)
- react-compare-image (До / После)
- react-hook-form (форма заявки)
- Lucide React (иконки)
- @fontsource/unbounded + @fontsource/manrope (шрифты с кириллицей)

## Запуск

```bash
npm install
npm run dev      # dev-сервер на http://localhost:5173
npm run build    # production-билд в dist/
npm run preview  # локальный просмотр билда
```

## Структура

```
public/
  images/
    logo-white.png        белый логотип для тёмного фона
    logo-dark.png         тёмный логотип для светлого фона
    hero/                 фоны hero (положить сюда)
    gallery/              фото галереи (заменить плейсхолдеры)
    before-after/         фото до/после (заменить плейсхолдеры)
  videos/                 видео в галерею (.mp4, без звука)
  favicon.png

src/
  components/
    sections/             секции лендинга
      Hero.tsx
      WhatWeRestore.tsx
      Services.tsx
      BeforeAfter.tsx
      Gallery.tsx
      HowWeWork.tsx
      Conditions.tsx
      Contacts.tsx
      Footer.tsx
    ui/                   UI-примитивы
      Header.tsx
      Container.tsx
      Button.tsx
      GlassCard.tsx
      SectionTitle.tsx
      FadeIn.tsx
  data/                   контент (тексты, цены, контакты)
    contacts.ts
    services.ts
    advantages.ts
    steps.ts
    conditions.ts
    gallery.ts
  styles/index.css
  App.tsx
  main.tsx
```

## Как добавить ваши материалы

### Фото в галерею

1. Положите файлы в `public/images/gallery/` (например, `01.jpg`, `02.jpg`, ...).
2. В `src/data/gallery.ts` отредактируйте массив `galleryCategories[].items` — замените `placeholder.svg` на пути к вашим фото.

### До / После

1. Положите пары фото в `public/images/before-after/` (например, `kitchen-before.jpg`, `kitchen-after.jpg`).
2. В `src/data/gallery.ts` отредактируйте `beforeAfterPairs` — укажите ваши пути.

### Видео

1. Положите MP4-файлы в `public/videos/` (рекомендуется H.264, без звука, до 10 МБ).
2. Положите кадр-обложку (poster) в `public/images/gallery/` для каждого видео.
3. В `src/data/gallery.ts` в категории `video` укажите `src: "/videos/your-file.mp4"` и `poster: "/images/gallery/your-poster.jpg"`.

### Логотип

Файлы `public/images/logo-white.png` и `logo-dark.png` уже на месте — при необходимости замените на финальные версии (PNG с прозрачным фоном, ~512px по большей стороне).

### Контент

Все тексты, цены, телефоны вынесены в `src/data/`. Меняются без касания JSX.

## Форма заявки

Сейчас форма в секции «Контакты» работает как **визуальная заглушка** — после отправки показывает success-сообщение, данные логируются в консоль (`console.log`).

Для реального приёма заявок подключите один из вариантов:

- **EmailJS** (`@emailjs/browser`) — отправка на pokraspolir@yandex.ru без бэкенда.
- **Telegram bot webhook** — мгновенно в Telegram владельцу через бота от @BotFather.
- **Formspree** или другой no-code сервис.

Точка для подключения — функция `onSubmit` в [src/components/sections/Contacts.tsx](src/components/sections/Contacts.tsx).

## Палитра

- `#0E0E10` — основной фон
- `#15171B` — secondary
- `#FFFFFF` — текст
- `#A1A1AA` — приглушённый текст
- `#2BB3D9 → #1B6E8C` — бренд-градиент

## Деплой

Папка `dist/` после `npm run build` — статика, заливается на любой хостинг (Vercel, Netlify, GitHub Pages, Beget, Reg.ru и т. д.).
