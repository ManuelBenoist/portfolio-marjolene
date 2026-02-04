const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./images-original";
const outputDir = "./public/images";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg"].includes(ext)) return;

  const filename = path.basename(file, ext);

  sharp(path.join(inputDir, file))
    .resize({ width: 1600 })
    .toFormat("webp", { quality: 80 })
    .withMetadata(false)
    .toFile(`${outputDir}/${filename}.webp`)
    .then(() => {
      console.log(`✅ ${filename}.webp generated`);
    })
    .catch(console.error);
});
