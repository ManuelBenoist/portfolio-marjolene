const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// Helper to get arguments since we don't have minimist
const args = process.argv.slice(2).reduce((acc, arg) => {
  // Handle flags like --recursive or --delete
  if (!arg.includes('=')) {
    const key = arg.replace(/^--/, '');
    acc[key] = true;
    return acc;
  }
  // Handle key=value like --input=./p
  const [key, value] = arg.replace(/^--/, '').split('=');
  acc[key] = value;
  return acc;
}, {});

const inputPath = args.input || args.i;
const outputPath = args.output || args.o || inputPath; // Default to input path if not specified
const isRecursive = args.recursive || args.r;
const shouldDelete = args.delete || args.d;
const quality = parseInt(args.quality || 80);
// Default width 1600, allow 0 or "null" to skip resizing
const widthArg = args.width !== undefined ? args.width : "1600";
const width = (widthArg === "0" || widthArg === "null") ? null : parseInt(widthArg);

if (!inputPath) {
  console.error("❌ Usage: node scripts/convert-images.cjs --input=./public/img [--recursive] [--delete] [--width=1600]");
  process.exit(1);
}

const processFile = async (filePath, targetDir) => {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const name = path.basename(filePath, ext);
  const targetPath = path.join(targetDir, `${name}.webp`);

  // Skip if source and target are the same (already webp - though ext check prevents this)
  if (filePath === targetPath) return;

  try {
    let pipeline = sharp(filePath);
    
    if (width) {
      // Only resize if the image has metadata indicating it's larger than width?
      // Or just force resize. Usually for thumbnails/web, force resize is what's expected for consistency.
      // But let's check metadata to avoid upscaling if possible? 
      // Sharp's default `fit: 'cover'` creates specified dimensions. 
      // User asked for "Keep auto-resize to 1600px".
      // `withoutEnlargement: true` is safer.
      pipeline = pipeline.resize({ width, withoutEnlargement: true });
    }

    await pipeline
      .toFormat("webp", { quality })
      .toFile(targetPath);

    console.log(`✅ Converted: ${path.relative(process.cwd(), filePath)} -> ${path.basename(targetPath)}`);

    if (shouldDelete) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ Deleted original: ${path.basename(filePath)}`);
    }

  } catch (err) {
    console.error(`❌ Error processing ${filePath}:`, err.message);
  }
};

const processDirectory = async (currentInputPath, currentOutputPath) => {
  if (!fs.existsSync(currentOutputPath)) {
    fs.mkdirSync(currentOutputPath, { recursive: true });
  }

  const files = fs.readdirSync(currentInputPath);

  for (const file of files) {
    const inputFilePath = path.join(currentInputPath, file);
    const outputFilePath = path.join(currentOutputPath, file);
    const stat = fs.statSync(inputFilePath);

    if (stat.isDirectory()) {
      if (isRecursive) {
        await processDirectory(inputFilePath, outputFilePath);
      }
    } else {
      await processFile(inputFilePath, currentOutputPath);
    }
  }
};

// Main execution
(async () => {
    const targetStat = fs.statSync(inputPath, { throwIfNoEntry: false });

    if (!targetStat) {
        console.error(`❌ Input path does not exist: ${inputPath}`);
        process.exit(1);
    } else if (targetStat.isDirectory()) {
        console.log(`📂 Processing directory: ${inputPath} ${isRecursive ? '(recursive)' : ''}`);
        await processDirectory(inputPath, outputPath);
    } else {
        // Single file mode
        const outDir = path.dirname(outputPath); // If output is file, this logic might be tricky. Assuming output is dir for file input or same dir.
        // If output was not specified, it defaults to inputPath. 
        // If input is file, inputPath is file. 
        // Let's assume for file input, output is directory.
        const outputDir = targetStat.isFile() ? path.dirname(inputPath) : outputPath;
        console.log(`📄 Processing file: ${inputPath}`);
        await processFile(inputPath, outputDir);
    }
})();
