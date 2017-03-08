import { expect } from 'chai';
import processFunction from 'processors/function';
import processArguments from 'processors/arguments'
console.log('==');
console.log(processArguments);
console.log('==');
const testIdentifier = {
  type: 'identifier',
  value: 'rgb',
};
const testArgs = {
  type: 'arguments',
  value: [
     { type: 'number', value: '85' },
     { type: 'punctuation', value: ',' },
     { type: 'space', value: ' ' },
     { type: 'number', value: '26' },
     { type: 'punctuation', value: ',' },
     { type: 'space', value: ' ' },
     { type: 'number', value: '139' },
  ],
};

const testFunction = {
  type: 'function',
  value: [testIdentifier, testArgs, { type: 'what', value: 'foo' }],
};
const correct = 'rgb(85, 26, 139)';

describe('Function processor', () => {
  it('processes properly', () => {
    const output = processFunction(testFunction);
    console.log(output);
    expect(output).to.equal(correct);
  });
});
