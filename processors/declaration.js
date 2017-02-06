import process from './index';

export const processDeclaration = declaration => {
  const value = declaration.value;
  let propName, propValue;
  let type = 'DECLARATION';
  value.forEach(v => {
    if (v.type === 'property') {
      propName = v.value[0].value;
      if (v.value[0].type == 'variable') {
        propName = `$${propName}`;
        type = 'VARIABLE';
      }
    }
    else if (v.type == 'value') {
      propValue = process(v);
    }
  });
  const final = {};
  final[propName] = propValue;
  return { token: final, type: type};
}
