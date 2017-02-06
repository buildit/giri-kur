import process from './index';

export const processRule = rule => {
  const values = rule.value;
  let selector;
  let declarations = [];
  let type;

  values.forEach(v => {
    if (v.type === 'selector') {
      ({token:selector, type} = process(v));
    }
    else if (v.type === 'block') {
      declarations = process(v);
    }
  });

  return {
    selector,
    declarations,
    type,
  };
}
