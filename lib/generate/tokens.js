import camelcase from 'camelcase';
import jsonPretty from 'json-pretty';
import * as settings from 'settings';

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

    const currentTokenSettings = {
      name: name,
      reactComponentLibrary: settings.getComponentRepoName(),
      styleLibrary: settings.getStyleRepoName(),
    };
    const token = Object.assign({}, tokenFile, currentTokenSettings);
    parsedTokens[name] = jsonPretty(token);
  });
  return parsedTokens;
};

export default createTokenFileContent;
