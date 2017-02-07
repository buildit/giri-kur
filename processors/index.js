import processClass from './class';
import processRule from './rule';
import processBlock from './block';
import processDeclaration from './declaration';
import processSelector from './selector';
import processOperator from './operator';
import processId from './id';
import processValue from './value';
import processColorHex from './color_hex';
import processComment from './comment';
import processVariable from './variable';
import * as tokenTypes from './types';

export const types = tokenTypes;

const processors = {
  class: processClass,
  rule: processRule,
  block: processBlock,
  declaration: processDeclaration,
  selector: processSelector,
  operator: processOperator,
  id: processId,
  value: processValue,
  color_hex: processColorHex,
  comment_multiline: processComment,
  comment_singleline: processComment,
  variable: processVariable,
};

const process = node => {
  console.log(node);
  const n = node.node ? node.node : node; // Seriously?  This is a thing we have to do?
  let returnValue;
  if (processors[n.type]) {
    returnValue = processors[n.type](n);
  } else if (n.value) {
    returnValue = n.value;
  } else {
    returnValue = n;
  }
  return returnValue;
};

export const stripSpaces = collection => (
  collection.filter(c => (c.type !== 'space'))
);

export default process;
