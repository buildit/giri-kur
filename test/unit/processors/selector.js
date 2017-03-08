import { expect } from 'chai';
import processSelector from 'processors/selector';

const testSelector = {
  type: 'selector',
  value: [
    { type: 'identifier', value: 'h1' },
    { type: 'space', value: ' ' },
  ],
};
const testSelectorPseudo = {
  type: 'selector',
  value: [
    { type: 'identifier', value: 'h1' },
    { type: 'space', value: ' ' },
    { type: 'pseudo_class', value: [{ type: 'identifier', value: 'hover' }] },
  ],
};
const testSelectorMultiple = {
  type: 'selector',
  value: [
    { type: 'identifier', value: 'h1' },
    { type: 'punctuation', value: ',' },
    { type: 'space', value: ' ' },
    { type: 'identifier', value: 'h2' },
    { type: 'space', value: ' ' },
  ],
};

const correct = [{ token: ['h1'], type: 'identifier' }];
const correctPseudo = [{ token: ['h1', ':hover'], type: 'identifier' }];
const correctMultiple = [
  { token: ['h1'], type: 'identifier' },
  { token: ['h2'], type: 'identifier' },
];

describe('Selector Processor', () => {
  it('processes properly', () => {
    const output = processSelector(testSelector);
    expect(output).to.deep.equal(correct);
  });
  it('processes a pseudoclass properly', () => {
    const output = processSelector(testSelectorPseudo);
    expect(output).to.deep.equal(correctPseudo);
  });
  it('processes multiple selectors properly', () => {
    const output = processSelector(testSelectorMultiple);
    expect(output).to.deep.equal(correctMultiple);
  });
});
