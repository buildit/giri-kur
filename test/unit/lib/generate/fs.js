import mock from 'mock-fs';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { disableLog } from 'lib/display';
import { writeFiles } from 'lib/generate/fs';

describe('local fs functions', () => {
  beforeEach(() => {
    disableLog();
    mock();
  });
  afterEach(() => {
    mock.restore();
  });

  it('writes a set of files poperly', () => {
    const files = {
      'myfile.txt': 'foo',
      'mydirectory/myfile2.txt': 'bar',
    };
    writeFiles(files, '.');
    expect(fs.existsSync(path.resolve('./myfile.txt'))).to.be.true;
    expect(fs.existsSync(path.resolve('./mydirectory/myfile2.txt'))).to.be.true;
  });
});
