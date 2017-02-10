import camelcase from 'camelcase';
import jsonPretty from 'json-pretty';

const tokenFile = {
  name: '', // have some kind of name slugifier to camel case these things
  type: '',
  description: '',

  reactComponent: '', // same thing as name
  reactComponentLibrary: '', // something from opt?
  styleLibrary: '', // something from opt?
  atomicLevel: "atom",

  context: {
    children: [],
    parents: []
  },
  approved: false,
};

const createTokenFileContent = data => {
  const parsedTokens = {};
  Object.keys(data).forEach(d => {
    const name = camelcase(d.replace(/#/, ''));
    console.log(`${d} camelcased is ${name}`);
    const token = Object.assign({}, tokenFile);
    token.name = name;
    parsedTokens[name] = jsonPretty(token);
  });
  return parsedTokens;
};

export default createTokenFileContent;
