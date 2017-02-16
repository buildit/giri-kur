import fs from 'fs';
import path from 'path';

import { log } from 'lib/display';

export const buildDirectoryLocation = filePath => {
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  const dirname = path.dirname(path.resolve(filePath));
  buildDirectoryLocation(dirname);
  log(`Creating ${filePath}`);
  fs.mkdirSync(filePath);
  return filePath;
};

export const writeComponentFile = (filePath, filename, contents) => {
  buildDirectoryLocation(filePath);

  log(`Writing ${filePath}\\${filename}`);
  fs.writeFileSync(path.resolve(filePath, filename), contents, 'utf8');
};
