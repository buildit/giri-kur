import fs from 'fs';
import path from 'path';

import recursiveRead from 'recursive-readdir-sync';

const addDefaults = src => (src);
/**
 * There's some funkiness that's coming from including this stuff.
 * Need to revisit and fix later.
 (['node_modules/kiur/src/components', ...src]);
 */


const generateListOfFiles = inputFiles => {
  const raw = [];
  inputFiles.forEach(current => {
    if (current.match(/^\./)) {
      return;
    }
    const filename = path.normalize(current);

    if (fs.lstatSync(filename).isDirectory()) {
      raw.push(...recursiveRead(filename));
    } else {
      raw.push(filename);
    }
  });

  return raw.map(file => (path.resolve(file)));
};

const readAllFiles = filesList => (filesList.map(file => (fs.readFileSync(file, 'utf8'))));

const readin = (src = []) => {
  const inputFiles = addDefaults(typeof src === 'string' ? [src] : src);

  const fullFileList = generateListOfFiles(inputFiles);
  return readAllFiles(fullFileList).join('');
};

export default readin;
