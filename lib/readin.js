import fs from 'fs';
import path from 'path';

const readin = (src) => {
  const files = src ? (typeof src == "string" ? [src] : src) : [];

  const raw = files.map(current => {
    if (current.match(/^\./)) {
      return '';
    }
    const filename = path.normalize(current);
    if (fs.existsSync(filename)) {
      if (fs.statSync(filename).isDirectory()) {
        const files = fs.readdirSync(filename);
        return files.map(file => {
          if (file.match(/^\./)) {
            return '';
          }
          return readin(path.resolve(filename, file));
        }).join('');
      }
      else {
        return fs.readFileSync(filename, 'utf8');
      }
    }
    else {
      return '';
    }
  });
  return raw.join('');
}

export default readin;
