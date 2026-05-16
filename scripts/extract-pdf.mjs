import fs from "node:fs";
import path from "node:path";
import * as mupdf from "mupdf";
import sharp from "sharp";

/**
 * Extract real assets from "КП 2026.pdf" and prepare a clean text-free
 * glass-facade hero backdrop for the website.
 *
 * Output (public/images/pdf/):
 *   page-1..page-4.jpg          — full pages, preview quality (debug)
 *   team-windows.jpg            — left inset on page 1: object with large windows
 *   team-workers.jpg            — right inset on page 1: 3 workers in branded t-shirts
 *   facade-clean.jpg            — text-free glass facade backdrop (Unsplash, processed)
 *   facade-clean-pdf.jpg        — text-free strip lifted from the PDF itself
 *   pdf-bg-glass-facade.jpg     — alias of facade-clean.jpg (used by the site)
 *   team-work-1.jpg, team-work-2.jpg — legacy aliases used by the site
 */

const PDF_PATH = "C:/Users/Volkr/Desktop/КП 2026.pdf";
const OUT_DIR = path.resolve("public/images/pdf");
const UNSPLASH_SRC = path.join(OUT_DIR, "_unsplash-facade.jpg");
const UNSPLASH_URL =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=82";

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function ensureUnsplash() {
  if (fs.existsSync(UNSPLASH_SRC)) return true;
  console.log("\n== Downloading Unsplash facade photo ==");
  try {
    const res = await fetch(UNSPLASH_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(UNSPLASH_SRC, buf);
    console.log(`  -> ${path.basename(UNSPLASH_SRC)} (${(buf.byteLength / 1024).toFixed(1)} kb)`);
    return true;
  } catch (err) {
    console.warn(`  ! failed: ${err.message}`);
    return false;
  }
}

const PREVIEW_SCALE = 2; // → 1440 x 810 page
const HIRES_SCALE = 5; // → 3600 x 2025 page

const buffer = fs.readFileSync(PDF_PATH);
const doc = mupdf.PDFDocument.openDocument(buffer, "application/pdf");
const pageCount = doc.countPages();
console.log(`pages: ${pageCount}`);

function renderPage(pageIdx, scale) {
  const page = doc.loadPage(pageIdx);
  const matrix = mupdf.Matrix.scale(scale, scale);
  const pixmap = page.toPixmap(
    matrix,
    mupdf.ColorSpace.DeviceRGB,
    false,
    true
  );
  const w = pixmap.getWidth();
  const h = pixmap.getHeight();
  const samplesRaw = pixmap.getPixels();
  const samples = Buffer.isBuffer(samplesRaw)
    ? samplesRaw
    : Buffer.from(
        samplesRaw.buffer,
        samplesRaw.byteOffset,
        samplesRaw.byteLength
      );
  const stride = pixmap.getStride();
  const channels = pixmap.getNumberOfComponents();
  const tight = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    const srcOff = y * stride;
    const dstOff = y * w * 3;
    if (channels === 3 && stride === w * 3) {
      samples.copy(tight, dstOff, srcOff, srcOff + w * 3);
    } else {
      for (let x = 0; x < w; x++) {
        tight[dstOff + x * 3] = samples[srcOff + x * channels];
        tight[dstOff + x * 3 + 1] = samples[srcOff + x * channels + 1];
        tight[dstOff + x * 3 + 2] = samples[srcOff + x * channels + 2];
      }
    }
  }
  return { width: w, height: h, data: tight };
}

const asRaw = (rgb) =>
  sharp(rgb.data, {
    raw: { width: rgb.width, height: rgb.height, channels: 3 },
  });

const saveSize = (p) => {
  const s = fs.statSync(p).size;
  return `${(s / 1024).toFixed(1)} kb`;
};

console.log("\n== Rendering page previews ==");
for (let i = 0; i < pageCount; i++) {
  const pix = renderPage(i, PREVIEW_SCALE);
  const out = path.join(OUT_DIR, `page-${i + 1}.jpg`);
  await asRaw(pix).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  console.log(`  -> page-${i + 1}.jpg  ${pix.width}x${pix.height}  ${saveSize(out)}`);
}

console.log("\n== Cropping team photos from page 1 (hi-res) ==");
const page1 = renderPage(0, HIRES_SCALE);
console.log(`  hi-res: ${page1.width}x${page1.height}`);

// Coordinates measured on the 1440x810 preview (page-1.jpg).
// HIRES_SCALE/PREVIEW_SCALE = 2.5
const SR = HIRES_SCALE / PREVIEW_SCALE;
const previewBoxes = {
  // Empty room with the large windows (left inset on the title page)
  windows: { x: 132, y: 388, w: 420, h: 348 },
  // Three workers in light t-shirts with the bird logo (right inset)
  workers: { x: 825, y: 388, w: 505, h: 348 },
};

async function cropFromHires(box, outName) {
  const x = Math.round(box.x * SR);
  const y = Math.round(box.y * SR);
  const w = Math.round(box.w * SR);
  const h = Math.round(box.h * SR);
  const out = path.join(OUT_DIR, outName);
  await asRaw(page1)
    .extract({ left: x, top: y, width: w, height: h })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(out);
  console.log(`  -> ${outName}  ${w}x${h}  ${saveSize(out)}`);
}

await cropFromHires(previewBoxes.windows, "team-windows.jpg");
await cropFromHires(previewBoxes.workers, "team-workers.jpg");

// Legacy aliases used by the site code
fs.copyFileSync(
  path.join(OUT_DIR, "team-windows.jpg"),
  path.join(OUT_DIR, "team-work-1.jpg")
);
fs.copyFileSync(
  path.join(OUT_DIR, "team-workers.jpg"),
  path.join(OUT_DIR, "team-work-2.jpg")
);

console.log("\n== Building text-free PDF facade strip ==");
// Bottom of page 1 (below the inset photos) is pure facade with no text.
// We use this as a back-up backdrop derived from the PDF itself.
const STRIP_PREVIEW = { x: 0, y: 730, w: 1440, h: 80 };
{
  const x = Math.round(STRIP_PREVIEW.x * SR);
  const y = Math.round(STRIP_PREVIEW.y * SR);
  const w = Math.round(STRIP_PREVIEW.w * SR);
  const h = Math.round(STRIP_PREVIEW.h * SR);
  const out = path.join(OUT_DIR, "facade-clean-pdf.jpg");
  await asRaw(page1)
    .extract({ left: x, top: y, width: w, height: h })
    .resize({ width: 2560, height: 1440, fit: "cover", position: "center" })
    .modulate({ brightness: 0.78, saturation: 0.6 })
    .blur(0.4)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log(`  -> facade-clean-pdf.jpg  2560x1440  ${saveSize(out)}`);
}

console.log("\n== Building hero backdrop (Unsplash architectural photo) ==");
const haveUnsplash = await ensureUnsplash();
if (!haveUnsplash) {
  console.warn("  ! Skipping facade-clean.jpg generation");
} else {
  const out = path.join(OUT_DIR, "facade-clean.jpg");
  await sharp(UNSPLASH_SRC)
    .resize({ width: 2560, height: 1440, fit: "cover", position: "center" })
    .modulate({ brightness: 0.62, saturation: 0.55 })
    .linear(1.05, -10)
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(out);
  console.log(`  -> facade-clean.jpg  2560x1440  ${saveSize(out)}`);

  fs.copyFileSync(out, path.join(OUT_DIR, "pdf-bg-glass-facade.jpg"));
  console.log(`  -> pdf-bg-glass-facade.jpg (alias)`);
}

console.log("\nDone.");
