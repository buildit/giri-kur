import path from 'path';

import * as fs from './fs';
import globals from './globals';
import rules from './rules';
import tokens from './tokens';

import { display, log } from 'lib/display';

const STYLE_DIR = 'scss';
const MAIN_FILE = 'main.scss';
const VARIABLE_FILE_NAME = 'variables';
const VARIABLE_FILE = `_${VARIABLE_FILE_NAME}.scss`;
const TOKEN_DIR = 'tokens';

const COMPONENT_DIR = './components/1-Atoms';

const writeTokens = (elements, endpoint) => {
  log('Writing tokens');
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `${e}.json`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
  });
  return filenames;
}
const writeRules = (elements, endpoint) => {
  log('Writing style rules');
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `_${e}.scss`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
    display(elements[e]);
  });
  return filenames;
};

const writeGlobals = (endpoint, filename, data) => {
  log('Writing SCSS globals');
  const content = globals(data);
  fs.writeComponentFile(endpoint, VARIABLE_FILE, content);
  display(content);
}

const writeMain = (includeFiles, endpoint) => {
  log('Writing main SCSS file');
  const contents = includeFiles.map(f => (`@include "${f}";`)).join('\n');
  fs.writeComponentFile(endpoint, MAIN_FILE, contents);
};

const writeStyles = (styleDirectory, componentDirectory, data) => {
  writeGlobals(styleDirectory, VARIABLE_FILE, data.globals);

  const ruleFilenames = [
    ...writeRules(rules(data.rules.elements), componentDirectory),
    ...writeRules(rules(data.rules.classes), componentDirectory),
    ...writeRules(rules(data.rules.ids), componentDirectory),
  ];
  const mainIncludes = [
    VARIABLE_FILE_NAME,
    ...ruleFilenames.map(file => (`${COMPONENT_DIR}/${file}`))
  ];
  writeMain(mainIncludes, styleDirectory);
}


const generateScaffold = (data, outputDirectory) => {
  const resolvedDirectory = fs.buildDirectoryLocation(outputDirectory);
  const styleDirectory = path.resolve(resolvedDirectory, STYLE_DIR);
  const componentDirectory = path.resolve(resolvedDirectory, STYLE_DIR, COMPONENT_DIR);
  const tokenDirectory = path.resolve(resolvedDirectory, TOKEN_DIR);

  writeStyles(styleDirectory, componentDirectory, data);

  const classTokens = tokens(data.rules.classes);
  const idTokens = tokens(data.rules.ids);
  writeTokens(Object.assign({}, classTokens, idTokens), tokenDirectory);
};

export default generateScaffold;
