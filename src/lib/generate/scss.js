/** @module lib/generate/scss */
import path from 'path';
import { pd } from 'pretty-data';

import { log } from 'lib/display';

import * as fs from './fs';

const styleDirectoryName = 'scss';
const tokenDirectoryName = 'components';
const mainFile = 'main.scss';
const variableFileName = 'variables';
const variableFile = `_${variableFileName}.scss`;

const atomicStructure = {
  atom: '1-Atoms',
  molecule: '2-Molecules',
  organism: '3-Organisms',
  template: '4-Templates',
  page: '5-Pages',
};
const defaultAtomicLevel = 'atom';


const resolveAtomicDirectoryName = level => (atomicStructure[level]);
const resolveStyleDirectory = outputDirectory => (
  path.resolve(outputDirectory, styleDirectoryName)
);
const resolveAtomicDirectory = (outputDirectory, level) => {
  const relative = path.join(tokenDirectoryName, resolveAtomicDirectoryName(level));
  const absolute = path.resolve(outputDirectory, styleDirectoryName, relative);
  return { relative, absolute };
};


const stringWithSelector = (selector, rulesAsString, parentSelector) => {
  let finalSelector = selector;
  if (selector === '*') {
    return rulesAsString;
  }
  if (parentSelector) {
    finalSelector = `&${finalSelector}`;
  }
  return `${finalSelector} {\n ${rulesAsString}\n}`;
};
const stylesToString = (selector, styles, parentSelector) => {
  const formattedStyles = Object.keys(styles).map(style => `${style}: ${styles[style]};`).join('\n');
  return stringWithSelector(selector, formattedStyles, parentSelector);
};
const rulesToFileContents = (name, rules) => {
  const rulesAsString = Object.keys(rules).map(r => stylesToString(r, rules[r], name)).join('\n');
  return pd.css(`${name} {\n ${rulesAsString}\n}`);
};

const writeTokenScss = (location, name, styles, atomicLevel = defaultAtomicLevel) => {
  const filename = `_${name}.scss`;
  const contents = rulesToFileContents(name, styles);
  const {
    relative: includeDirectory,
    absolute: outputDirectory,
  } = resolveAtomicDirectory(location, atomicLevel);

  fs.writeComponentFile(outputDirectory, filename, contents);

  const includeFilename = path.join(includeDirectory, filename);
  log(`Creating file ${includeFilename}`);
  return includeFilename;
};

const writeTokens = (tokens, location) => (
  tokens.map(token => writeTokenScss(location, token.name, token.styles, token.atomicLevel))
);

const globalToString = global => (Object.keys(global).map(g => `${g}: ${global[g]};`)[0]);
const globalsToString = globals => (globals.map(g => globalToString(g)).join('\n'));
const writeGlobals = (globals, location) => {
  const contents = globalsToString(globals);
  log(`Writing global variables to file ${variableFile}`);
  fs.writeComponentFile(resolveStyleDirectory(location), variableFile, contents);
  return [variableFile];
};


const writeMain = (includeFiles, outputDirectory) => {
  const styleDirectory = resolveStyleDirectory(outputDirectory);
  const contents = includeFiles.map(f => `@import "./${f}";`).join('\n');
  log(`Writing ${mainFile} file`);
  fs.writeComponentFile(styleDirectory, mainFile, contents);
};

/**
 * Outputs a collection of SCSS files
 * @param {Object} data - Global definitions and token file contents
 * @param {Object} data.tokens - Tokens
 * @param {Object} data.globals - Global definitions
 * @param {string} outputDirectory - The directory the scss folder should be created in
 */
const generateScss = (data, outputDirectory) => {
  const tokenFiles = writeTokens(data.tokens, outputDirectory);
  const globalFiles = writeGlobals(data.globals, outputDirectory);
  writeMain([...globalFiles, ...tokenFiles], outputDirectory);
};
export default generateScss;
