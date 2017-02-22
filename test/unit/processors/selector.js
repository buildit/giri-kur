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

const correct = { token: ['h1'], type: 'identifier' };
const correctPseudo = { token: ['h1', ':hover'], type: 'identifier' };

describe('Selector Processor', () => {
  it('processes properly', () => {
    const output = processSelector(testSelector);
    expect(output).to.deep.equal(correct);
  });
  it('processes a pseudoclass properly', () => {
    const output = processSelector(testSelectorPseudo);
    expect(output).to.deep.equal(correctPseudo);
  });
});
