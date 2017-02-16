/** @module lib/generate/tokens */
import camelcase from 'camelcase';
import jsonPretty from 'json-pretty';
import path from 'path';

import * as settings from 'settings';
import { log } from 'lib/display';
import * as fs from './fs';

const TOKEN_DIR = 'tokens';
const VARIABLE_FILE = '_variable-definitions.json';

const tokenFile = {
  name: '',
  type: '',
  description: '',

  reactComponent: '',
  reactComponentLibrary: '',
  styleLibrary: '',
  styles: {},
  atomicLevel: 'atom',

  context: {
    children: [],
    parents: [],
  },
  approved: false,
};

const createVariableFileContent = data => {
  let globals = data;
  if (!data) {
    globals = [];
  }
  return jsonPretty(globals);
};

const createTokenFileContent = data => {
  if (!data) {
    return {};
  }
  const parsedTokens = {};
  Object.keys(data).forEach(d => {
    const name = camelcase(d.replace(/#/, ''));

    const currentTokenSettings = {
      name,
      reactComponentLibrary: settings.getComponentRepoName(),
      styleLibrary: settings.getStyleRepoName(),
      styles: data[d],
    };
    const token = Object.assign({}, tokenFile, currentTokenSettings);
    parsedTokens[name] = jsonPretty(token);
  });
  return parsedTokens;
};

const createTokens = data => {
  const classTokens = createTokenFileContent(data.classes);
  const idTokens = createTokenFileContent(data.ids);
  const elementTokens = createTokenFileContent(data.elements);
  return Object.assign({}, classTokens, idTokens, elementTokens);
};

const writeTokens = (elements, endpoint) => {
  log('Writing tokens');
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `${e}.json`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
  });
  return filenames;
};

const writeGlobals = (data, endpoint) => {
  log('Writing globals file');
  fs.writeComponentFile(endpoint, VARIABLE_FILE, createVariableFileContent(data));
};

const resolveTokenDirectory = outputDirectory => (path.resolve(outputDirectory, TOKEN_DIR));

/**
 * Outputs design tokens
 * @param {Object} data - All data to be output
 * @param {Object[]} data.rules - Token files
 * @param {Object[]} data.globals - Global variable definitions
 * @param {string} outputDirectory - Directory for files to be output to
 */
const generateTokens = (data, outputDirectory) => {
  const tokenDirectory = resolveTokenDirectory(outputDirectory);
  writeTokens(createTokens(data.rules), tokenDirectory);
  writeGlobals(data.globals, tokenDirectory);
};

export default generateTokens;
