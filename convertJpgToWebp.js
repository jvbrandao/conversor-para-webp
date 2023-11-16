const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputFolder = './pastaPreConversao'; 
const outputFolder = './pastaPosConversao';

function convertJpgToWebp() {
    fs.readdir(inputFolder, (err, files) => {
        if (err) {
            console.error("Erro ao ler o diretório de entrada:", err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.jpg') {
                const inputFile = path.join(inputFolder, file);
                const outputFile = path.join(outputFolder, file.replace('.jpg', '.webp'));

                sharp(inputFile)
                    .toFormat('webp')
                    .toFile(outputFile)
                    .then(() => {
                        console.log(`Convertido: ${inputFile} -> ${outputFile}`);
                    })
                    .catch(err => {
                        console.error(`Erro ao converter ${inputFile}:`, err);
                    });
            }
        });
    });
}

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

convertJpgToWebp();