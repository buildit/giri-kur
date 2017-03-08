import mock from 'mock-fs';
import { expect } from 'chai';

import readin from 'lib/readin';
import * as display from 'lib/display';

describe('readin lib', () => {
  const fooContents = '.foo { color: white; }';
  const barContents = '.bar { color: black; }';
  beforeEach(() => {
    display.disableLog();
    mock({
      'foo.scss': fooContents,
      '.foo': fooContents,
      files: {
        'foo.scss': fooContents,
        'bar.scss': barContents,
      },
    });
  });
  afterEach(() => {
    mock.restore();
  });

  it('reads in a single file', () => {
    const results = readin('foo.scss');
    expect(results).to.deep.equal([fooContents]);
  });

  it('skips dotfiles', () => {
    const results = readin('.foo');
    expect(results).to.deep.equal([]);
  });

  it('reads in a directory', () => {
    const results = readin('files');
    expect(results).to.deep.equal([barContents, fooContents]);
  });
});
