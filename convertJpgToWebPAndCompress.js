const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = "./pastaPreConversao";
const outputFolder = "./pastaPosConversao";
function verifyAndCreatePaths(pasta) {
  if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta, { recursive: true });
    console.log(`Pasta criada: ${pasta}`);
  }
}
function compressAndConvertJpgToWebp() {
  verifyAndCreatePaths(inputFolder);
  verifyAndCreatePaths(outputFolder);

  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error("Erro ao ler o diretório de entrada:", err);
      return;
    }

    files.forEach((file) => {
      if (path.extname(file).toLowerCase() === ".jpg") {
        const inputFile = path.join(inputFolder, file);
        const outputFile = path.join(outputFolder, file.replace(".jpg", ".webp"));

        sharp(inputFile)
          .toFormat("webp", { quality: 80 }) // Ajuste a qualidade aqui.
          .toFile(outputFile)
          .then(() => {
            console.log(`Convertido e comprimido: ${inputFile} -> ${outputFile}`);
          })
          .catch((err) => {
            console.error(`Erro ao converter e comprimir ${inputFile}:`, err);
          });
      }
    });
  });
}

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

compressAndConvertJpgToWebp();
