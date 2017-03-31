import { expect } from 'chai';
import processAtrule from 'processors/atrule';

const testAttribute = {
  value: [
    { type: 'atkeyword', value: 'include' },
    { type: 'identifier', value: 'media' },
    { type: 'arguments', value: ['foo'] },
    {
      type: 'block',
      value: [
        { type: 'declaration',
          value: [
            { type: 'property', value: [{ type: 'identifier', value: 'font-size' }] },
            { type: 'value',
              value: [{ type: 'number', value: '1' }, { type: 'identifier', value: 'rem' }],
            },
          ],
        },
      ],
    },
  ],
};

const testAttribute2 = {
  value: [
  { type: 'atkeyword', value: 'import' },
  { type: 'string_double', value: 'foo.scss' },
]};

const correct = {
  keyword: '@include',
  identifier: 'media',
  arguments: [ 'foo' ],
  declarations: [{ 'font-size': '1rem' }],
};

const correct2 = { keyword: '@import', arguments: 'foo.scss' };

describe('Atrule Processor', () => {
  it('processes properly', () => {
    expect(processAtrule(testAttribute)).to.deep.equal(correct);
    expect(processAtrule(testAttribute2)).to.deep.equal(correct2);
  });
})
