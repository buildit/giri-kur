const fs = require('fs');
const path = require('path');

const DEFAULT_FILENAME = 'design-tokens.json';

const buildDirectoryStructure = filePath => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  buildDirectoryStructure(dirname);
  fs.mkdirSync(dirname);
  return true;
};

const output = (data, settings = {}) => {
  const outToConsole = !!settings.console || !settings.dest;
  const dest = settings.dest;

  if (outToConsole) {
    console.log(data); // eslint-disable-line no-console
  }

  if (dest) {
    const destination = path.normalize(dest);
    let outputFilename = destination;
    if (fs.existsSync(destination)) {
      if (fs.statSync(destination).isDirectory()) {
        outputFilename = `${outputFilename}/${DEFAULT_FILENAME}`;
      }
    }
    buildDirectoryStructure(outputFilename);
    fs.writeFileSync(outputFilename, data, 'utf8');
  }
};

export default output;
