import { expect } from 'chai';
import process from '../../../processors';
import processBlock from '../../../processors/block';

import { parse } from 'scss-parser';
import createQueryWrapper from 'query-ast';

describe('Block processor', () => {
  const content = '{ padding: 1rem; }';
  const ast = parse(content);
  const $ = createQueryWrapper(ast);
  console.log(process($().children().nodes[0]));

});
