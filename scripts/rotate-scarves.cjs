const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const contentPath = path.join(__dirname, '../public/content/foulards.json');
const publicDir = path.join(__dirname, '../public');

const foulardsData = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

async function rotateIfHorizontal(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    if (metadata.width > metadata.height) {
      console.log(`Rotating: ${path.basename(filePath)} (${metadata.width}x${metadata.height})`);
      const buffer = await image.rotate(90).toBuffer();
      fs.writeFileSync(filePath, buffer);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function processImages() {
  let processedCount = 0;

  for (const foulard of foulardsData) {
    if (!foulard.colors) continue;

    for (const colorKey of Object.keys(foulard.colors)) {
      const color = foulard.colors[colorKey];
      if (!color.materials) continue;

      for (const materialKey of Object.keys(color.materials)) {
        const material = color.materials[materialKey];
        const isTargetSize = material.sizes?.some((size) => size.id === '40x170');

        if (isTargetSize && Array.isArray(material.images)) {
          for (const image of material.images) {
            const relativePath = image.src;
            const absolutePath = path.join(publicDir, relativePath);

            if (fs.existsSync(absolutePath)) {
              await rotateIfHorizontal(absolutePath);
              processedCount += 1;
            } else {
              console.warn(`Missing file: ${relativePath}`);
            }
          }
        }
      }
    }
  }

  console.log(`Done. ${processedCount} images checked.`);
}

processImages();
