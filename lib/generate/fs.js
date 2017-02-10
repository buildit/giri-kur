import fs from 'fs';
import path from 'path';

export const buildDirectoryLocation = filePath => {
  if (fs.existsSync(filePath)) {
    return filePath;
  }

  const dirname = path.dirname(path.resolve(filePath));
  buildDirectoryLocation(dirname);
  fs.mkdirSync(filePath);
  return filePath;
};

export const writeComponentFile = (filePath, filename, contents) => {
  buildDirectoryLocation(filePath);
  fs.writeFileSync(path.resolve(filePath, filename), contents, 'utf8');
};
