import process, { stripSpaces } from './index';

export const processBlock = block => {
  const lines = stripSpaces(block.value);
  return lines.map(l => {
    const { token } = process(l);
    return token;
  }).filter(l => !!l);
}
