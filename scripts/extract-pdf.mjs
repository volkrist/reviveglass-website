import fs from "node:fs";
import path from "node:path";
import * as mupdf from "mupdf";

const PDF_PATH = "C:/Users/Volkr/Desktop/КП 2026.pdf";
const OUT_DIR = path.resolve("public/images/pdf");

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const buffer = fs.readFileSync(PDF_PATH);
const doc = mupdf.Document.openDocument(buffer, "application/pdf");

const PAGE_W_PT = 720;
const SCALE_HERO = 4;
const SCALE_PHOTO = 5;

function renderPageRegion(pageIdx, rectPt, scale, alpha = false) {
  const page = doc.loadPage(pageIdx);
  const matrix = mupdf.Matrix.scale(scale, scale);
  const rectPx = mupdf.Rect.transform(rectPt, matrix);
  const pixmap = page.toPixmap(
    matrix,
    mupdf.ColorSpace.DeviceRGB,
    alpha,
    true
  );
  const cropped = new mupdf.Pixmap(
    mupdf.ColorSpace.DeviceRGB,
    rectPx,
    false
  );
  cropped.clear(255);
  // Copy region
  pixmap.destroy?.();
  return { pixmap, rectPx };
}

const writeJPEG = (pixmap, outPath, quality = 86) => {
  const jpeg = pixmap.asJPEG(quality);
  fs.writeFileSync(outPath, Buffer.from(jpeg));
  console.log(`  -> ${path.basename(outPath)} (${jpeg.byteLength} bytes)`);
};

const writePNG = (pixmap, outPath) => {
  const png = pixmap.asPNG();
  fs.writeFileSync(outPath, Buffer.from(png));
  console.log(`  -> ${path.basename(outPath)} (${png.byteLength} bytes)`);
};

const renderPage = (pageIdx, scale) => {
  const page = doc.loadPage(pageIdx);
  const matrix = mupdf.Matrix.scale(scale, scale);
  const pixmap = page.toPixmap(
    matrix,
    mupdf.ColorSpace.DeviceRGB,
    false,
    true
  );
  return pixmap;
};

console.log("== Rendering full pages ==");
for (let i = 0; i < doc.countPages(); i++) {
  const pix = renderPage(i, 2);
  writeJPEG(pix, path.join(OUT_DIR, `page-${i + 1}.jpg`), 80);
}

console.log("\n== Rendering hero background (page 1, large) ==");
const heroPix = renderPage(0, SCALE_HERO);
writeJPEG(heroPix, path.join(OUT_DIR, "pdf-bg-glass-facade.jpg"), 86);
console.log(`  size: ${heroPix.getWidth()}x${heroPix.getHeight()}`);

console.log("\n== Cropping team photos from page 1 ==");
const photoBoxes = [
  { name: "team-work-1.jpg", bbox: { x: 84, y: 196, w: 252, h: 189 } },
  { name: "team-work-2.jpg", bbox: { x: 455, y: 199, w: 222, h: 183 } },
];

const page1HiRes = renderPage(0, SCALE_PHOTO);
console.log(`page1 hires: ${page1HiRes.getWidth()}x${page1HiRes.getHeight()}`);

const { PNG } = await import("pngjs");

function pixmapToPng(pixmap) {
  const png = new PNG({
    width: pixmap.getWidth(),
    height: pixmap.getHeight(),
  });
  const samples = pixmap.getPixels();
  // pixmap.getPixels() returns RGB or RGBA depending on alpha
  const w = pixmap.getWidth();
  const h = pixmap.getHeight();
  const stride = pixmap.getStride();
  const n = pixmap.getNumberOfComponents();
  const hasAlpha = pixmap.getAlpha?.() ?? false;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcOff = y * stride + x * (n + (hasAlpha ? 1 : 0));
      const dstOff = (y * w + x) * 4;
      png.data[dstOff] = samples[srcOff];
      png.data[dstOff + 1] = samples[srcOff + 1];
      png.data[dstOff + 2] = samples[srcOff + 2];
      png.data[dstOff + 3] = hasAlpha ? samples[srcOff + 3] : 255;
    }
  }
  return png;
}

const fullPng = pixmapToPng(page1HiRes);

const jpegEncoder = await import("jpeg-js").catch(() => null);

function cropPng(src, x, y, w, h) {
  const dst = new PNG({ width: w, height: h });
  for (let row = 0; row < h; row++) {
    const srcOff = ((y + row) * src.width + x) * 4;
    const dstOff = row * w * 4;
    src.data.copy(dst.data, dstOff, srcOff, srcOff + w * 4);
  }
  return dst;
}

for (const c of photoBoxes) {
  const sx = Math.round(c.bbox.x * SCALE_PHOTO);
  const sy = Math.round(c.bbox.y * SCALE_PHOTO);
  const sw = Math.round(c.bbox.w * SCALE_PHOTO);
  const sh = Math.round(c.bbox.h * SCALE_PHOTO);
  console.log(`  ${c.name}: ${sw}x${sh} from (${sx},${sy})`);
  const cropped = cropPng(fullPng, sx, sy, sw, sh);

  if (jpegEncoder) {
    const enc = jpegEncoder.default ?? jpegEncoder;
    const jpegData = enc.encode({ data: cropped.data, width: sw, height: sh }, 88);
    fs.writeFileSync(path.join(OUT_DIR, c.name), jpegData.data);
    console.log(`    -> ${c.name} (${jpegData.data.byteLength} bytes JPG)`);
  } else {
    const out = path.join(OUT_DIR, c.name.replace(".jpg", ".png"));
    await new Promise((res, rej) =>
      cropped.pack().pipe(fs.createWriteStream(out)).on("finish", res).on("error", rej)
    );
    console.log(`    -> ${path.basename(out)} (PNG fallback)`);
  }
}

console.log("\nDone.");
