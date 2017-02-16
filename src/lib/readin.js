/** @module lib/readin */
import fs from 'fs';
import path from 'path';

import { log } from 'lib/display';

import recursiveRead from 'recursive-readdir-sync';

const generateListOfFiles = inputFiles => {
  const raw = [];
  inputFiles.forEach(current => {
    if (current.match(/^\./)) {
      return;
    }
    const filename = path.normalize(current);

    if (fs.lstatSync(filename).isDirectory()) {
      raw.push(...recursiveRead(filename).filter(f => (!path.basename(f).match(/^\./))));
    } else {
      raw.push(filename);
    }
  });

  return raw.map(file => (path.resolve(file)));
};

const readAllFiles = filesList => (filesList.map(file => (fs.readFileSync(file, 'utf8'))));

/**
 * Reads in every file given and returns their contents
 * @param {string[]} src - Array of filenames and/or directories to input
 * @return {string[]} Array where each element is an individual file's contents
 */
const readin = (src = []) => {
  const inputFiles = typeof src === 'string' ? [src] : src;
  const fullFileList = generateListOfFiles(inputFiles);

  log(`Reading in ${fullFileList.length} file${fullFileList.length === 1 ? '' : 's'}`);
  return readAllFiles(fullFileList);
};

export default readin;
