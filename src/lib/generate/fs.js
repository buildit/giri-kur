import fs from 'fs';
import path from 'path';

import { log } from 'lib/display';

const buildDirectoryLocation = filePath => {
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  const dirname = path.dirname(path.resolve(filePath));
  buildDirectoryLocation(dirname);
  log(`Creating ${filePath}`);
  fs.mkdirSync(filePath);
  return filePath;
};

const writeFiles = (filePackage, location) => {
  Object.keys(filePackage).forEach(filename => {
    const fullFilePath = path.resolve(location, filename);
    log(`Writing ${filename}`);
    buildDirectoryLocation(path.dirname(fullFilePath));
    fs.writeFileSync(fullFilePath, filePackage[filename], 'utf8');
  });
};
export default writeFiles;
