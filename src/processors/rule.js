import process from './index';

const processRule = rule => {
  const values = rule.value;
  let selector;
  let declarations = [];
  let type;

  values.forEach(v => {
    if (v.type === 'selector') {
      selector = process(v);
    } else if (v.type === 'block') {
      declarations = process(v);
    }
  });

  return {
    selector,
    declarations,
  };
};

export default processRule;
