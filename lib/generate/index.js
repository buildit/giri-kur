import path from 'path';

import * as fs from './fs';
import globals from './globals';
import rules from './rules';
import tokens from './tokens';

const STYLE_DIR = 'scss';
const MAIN_FILE = 'main.scss';
const VARIABLE_FILE_NAME = 'variables';
const VARIABLE_FILE = `_${VARIABLE_FILE_NAME}.scss`;
const TOKEN_DIR = 'tokens';

const COMPONENT_DIR = './components/1-Atoms';

const writeTokens = (elements, endpoint) => {
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `${e}.json`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
  });
  return filenames;
}
const writeRules = (elements, endpoint) => {
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `_${e}.scss`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
  });
  return filenames;
};

const writeGlobals = (endpoint, filename, data) => {
  const content = globals(data);
  fs.writeComponentFile(styleDirectory, VARIABLE_FILE, globalsContent);
}

const writeMain = (includeFiles, endpoint) => {
  const contents = includeFiles.map(f => (`@include "${f}";`)).join('\n');
  fs.writeComponentFile(endpoint, MAIN_FILE, contents);
};

const writeStyles = (styleDirectory, data) => {
  writeGlobals(styleDirectory, VARIABLE_FILE, data.globals);

  const ruleFilenames = [
    ...writeRules(rules(data.rules.elements), componentDirectory),
    ...writeRules(rules(data.rules.classes), componentDirectory),
    ...writeRules(rules(data.rules.ids), componentDirectory),
  ];
  mainIncludes.push(ruleFilenames.map(file => (`${COMPONENT_DIR}/${file}`)));
  writeMain(mainIncludes, styleDirectory);
}


const generateScaffold = (data, outputDirectory) => {
  const mainIncludes = [VARIABLE_FILE_NAME];
  const resolvedDirectory = fs.buildDirectoryLocation(outputDirectory);
  const styleDirectory = path.resolve(resolvedDirectory, STYLE_DIR);
  const componentDirectory = path.resolve(resolvedDirectory, STYLE_DIR, COMPONENT_DIR);
  const tokenDirectory = path.resolve(resolvedDirectory, TOKEN_DIR);

  writeStyles(styleDirectory, data);

  const classTokens = tokens(data.rules.classes);
  const idTokens = tokens(data.rules.ids);
  writeTokens(Object.assign({}, classTokens, idTokens), tokenDirectory);
};

export default generateScaffold;
