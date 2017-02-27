import process, { stripSpaces } from './index';
import { stringify } from 'scss-parser';

const processSelector = selector => {
  const value = stripSpaces(selector.value);
  const type = value[0].type;
  console.log(stringify(selector));
  return {
    token: value.map(v => process(v)),
    type,
  };
};

export default processSelector;
