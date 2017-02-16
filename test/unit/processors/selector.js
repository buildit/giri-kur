import { expect } from 'chai';
import processSelector from 'processors/selector';

const testSelector = { type: 'selector',
  value: [
    { type: 'identifier',
      value: 'h1',
      start: { cursor: 898, line: 30, column: 0 },
      next: { cursor: 900, line: 30, column: 2 } },
    { type: 'space',
      value: ' ',
      start: { cursor: 900, line: 30, column: 2 },
      next: { cursor: 901, line: 30, column: 3 } },
  ],
  start: { cursor: 898, line: 30, column: 0 },
  next: { cursor: 901, line: 30, column: 3 } };

const correct = { token: 'h1', type: 'identifier' };

describe('Selector Processor', () => {
  it('processes properly', () => {
    const output = processSelector(testSelector);
    expect(output).to.deep.equal(correct);
  });
});
