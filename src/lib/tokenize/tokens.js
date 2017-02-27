const globals = [];
const rules = {
  elements: {},
  classes: {},
  ids: {},
};

const updateRules = (type, newData) => {
  const updatedRules = Object.assign({}, rules[type]);
  const selector = newData.selector[0];
  if (!selector) {
    return updatedRules;
  }
  const pseudoselector = newData.selector[1] || '*';
  const selectorRules = rules[type][selector] || {};
  const pseudoRules = Object.assign(selectorRules[pseudoselector] || {}, ...newData.declarations);
  selectorRules[pseudoselector] = pseudoRules;
  updatedRules[selector] = selectorRules;
  rules[type] = updatedRules;
};

export const addGlobal = token => (globals.push(token));

export const addElement = newElement => (updateRules('elements', newElement));
export const addClass = newClass => (updateRules('classes', newClass));
export const addId = newId => (updateRules('id', newId));

export const allRules = () => (rules);
export const allGlobals = () => (globals);
