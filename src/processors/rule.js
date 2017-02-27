import process from './index';
import { addElement } from 'lib/tokenize/tokens';

const processRule = rule => {
  const values = rule.value;
  let selector;
  let declarations = [];
  let type;

  values.forEach(v => {
    if (v.type === 'selector') {
      ({ token: selector, type } = process(v));
    } else if (v.type === 'block') {
      declarations = process(v);
    }
  });

  const final = {
    selector,
    declarations,
    type,
  };
  addElement(final);
  return final;
};

export default processRule;
