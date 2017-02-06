import process, { stripSpaces } from './index';

export const processSelector = selector => {
  const value = stripSpaces(selector.value);
  const type = value[0].type;
  return {
    token: value.map(v => process(v)).join(' '),
    type, 
  };
}
