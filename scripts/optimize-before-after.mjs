import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public/images/before-after");
await mkdir(dir, { recursive: true });

const files = (await readdir(dir)).filter((f) => f.endsWith(".png"));

for (const file of files) {
  const base = file.replace(/\.png$/, "");
  const input = path.join(dir, file);
  const output = path.join(dir, `${base}.jpg`);
  await sharp(input)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(output);
  console.log(`→ ${base}.jpg`);
}
