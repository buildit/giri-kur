import { expect } from 'chai';

import * as settings from 'settings';

describe('Settings', () => {
  const testRepoName = 'foo';

  it('sets and retrieves the component repo name properly', () => {
    settings.setComponentRepoName(testRepoName);
    expect(settings.getComponentRepoName()).to.equal(testRepoName);
  });

  it('sets and retrieves the style repo name properly', () => {
    settings.setStyleRepoName(testRepoName);
    expect(settings.getStyleRepoName()).to.equal(testRepoName);
  });
});
