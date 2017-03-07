import mock from 'mock-fs';
import { expect } from 'chai';
import fs from 'fs';
import path from 'path';

import { disableLog } from 'lib/display';
import { buildDirectoryLocation, writeComponentFile } from 'lib/generate/fs';

describe('local fs functions', () => {
  const location = './foo/bar';
  const file = './foo.txt';
  const contents = 'this is a test file';

  beforeEach(() => {
    disableLog();
    mock();
  });
  afterEach(() => {
    mock.restore();
  });

  it('builds directories properly', () => {
    buildDirectoryLocation(location);
    expect(fs.existsSync(location)).to.be.true;
  });

  it('writes a file properly', () => {
    writeComponentFile(location, file, contents);
    expect(fs.existsSync(path.resolve(location, file))).to.be.true;
  });
});
