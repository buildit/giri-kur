import path from 'path';

import * as fs from './fs';
import globals from './globals';
import rules from './rules';

const STYLE_DIR = 'scss';
const MAIN_FILE = 'main.scss';
const VARIABLE_FILE_NAME = 'variables';
const VARIABLE_FILE = `_${VARIABLE_FILE_NAME}.scss`;
const TOKEN_DIR = 'tokens';

const COMPONENT_DIR = './components/1-Atoms';

/*
 * Basic structure
 * /scss
 *   |- _variables.scss
 *   |- components
 *     |- 1-Atoms
 *       |- _Component1.scss
 *       |- _Component2.scss
 * /tokens
 *   |- 1-Atoms
 *     |- Component1.json
 *     |- Component2.json
 */

const writeRules = (elements, endpoint) => {
  const filenames = [];
  Object.keys(elements).forEach(e => {
    const filename = `_${e}.scss`;
    fs.writeComponentFile(endpoint, filename, elements[e]);
    filenames.push(e);
  });
  return filenames;
}

const writeMain = (includeFiles, endpoint) => {
  const contents = includeFiles.map(f => (`@include "${f}";`)).join('\n');
  fs.writeComponentFile(endpoint, MAIN_FILE, contents);
}

const generateScaffold = (data, outputDirectory) => {
  const mainIncludes = [VARIABLE_FILE_NAME];
  const resolvedDirectory = fs.buildDirectoryLocation(outputDirectory);
  const styleDirectory = path.resolve(resolvedDirectory, STYLE_DIR);
  const componentDirectory = path.resolve(resolvedDirectory, STYLE_DIR, COMPONENT_DIR);
  const tokenDirectory = path.resolve(resolvedDirectory, TOKEN_DIR);

  const globalsContent = globals(data.globals);
  fs.writeComponentFile(styleDirectory, VARIABLE_FILE, globalsContent);
  console.log(globals(data.globals));

  const elements = writeRules(rules(data.rules.elements), componentDirectory);
  const classes = writeRules(rules(data.rules.classes), componentDirectory);
  const ids = writeRules(rules(data.rules.ids), componentDirectory);
  mainIncludes.push(...[...elements, ...classes, ...ids].map(file => (`${COMPONENT_DIR}/${file}`)));
  writeMain(mainIncludes, styleDirectory);
  console.log(mainIncludes);
  console.log(rules(data.rules.elements));
  console.log(rules(data.rules.classes));
  console.log(rules(data.rules.ids));
}

export default generateScaffold;
