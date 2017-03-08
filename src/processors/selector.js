import process, { stripSpaces } from './index';

const processSelector = selector => {
  const value = stripSpaces(selector.value);
  // Hot garbage ahead.  All this is to deal with compount
  // selectors.  `a:hover, a:focus, #foo` kinds of things.
  const allSelectors = [];
  let currentSelector = [];
  let type;
  value.forEach(v => {
    if (['identifier', 'id', 'class'].indexOf(v.type) >= 0) {
      if (currentSelector.length > 0) {
        allSelectors.push({
          token: currentSelector,
          type,
        });
      }
      type = v.type;
      currentSelector = [process(v)];
    } else if (v.type !== 'punctuation') {
      currentSelector.push(process(v));
    }
  });
  allSelectors.push({
    token: currentSelector,
    type,
  });


  return allSelectors;
};

export default processSelector;
