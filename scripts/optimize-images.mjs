import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const imagesDir = join(__dirname, '..', 'public', 'images');

const files = await readdir(imagesDir);
const pngs = files.filter(f => extname(f).toLowerCase() === '.png');

console.log(`Found ${pngs.length} PNG(s) to optimize...\n`);

for (const file of pngs) {
  const input = join(imagesDir, file);
  const output = join(imagesDir, basename(file, '.png') + '.webp');

  const before = (await stat(input)).size;

  await sharp(input)
    .resize({ width: 1920, withoutEnlargement: true }) // cap at 1920px wide
    .webp({ quality: 82, effort: 6 })                 // quality 82 = great visual fidelity
    .toFile(output);

  const after = (await stat(output)).size;
  const saved = (((before - after) / before) * 100).toFixed(1);

  console.log(`✅ ${file} → ${basename(output)}`);
  console.log(`   ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB  (${saved}% smaller)\n`);
}

console.log('Done! You can now update your CSS background-image refs to use .webp');
