import fs from 'fs';
import path from 'path';

const readin = (src = []) => {
  const inputFiles = typeof src === 'string' ? [src] : src;

  const raw = inputFiles.map(current => {
    if (current.match(/^\./)) {
      return '';
    }
    const filename = path.normalize(current);
    let returnValue;
    if (fs.existsSync(filename)) {
      if (fs.statSync(filename).isDirectory()) {
        const files = fs.readdirSync(filename);
        returnValue = files.map(file => {
          if (file.match(/^\./)) {
            return '';
          }
          return readin(path.resolve(filename, file));
        }).join('');
      } else {
        returnValue = fs.readFileSync(filename, 'utf8');
      }
    } else {
      returnValue = '';
    }
    return returnValue;
  });
  return raw.join('');
};

export default readin;
