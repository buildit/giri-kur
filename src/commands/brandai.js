import { parse } from 'scss-parser';
import createQueryWrapper from 'query-ast';

import https from 'https';

import { downloadBrandAiVariables } from 'lib/download';
import processorHelp from 'lib/help';
import generateRulePackages from 'lib/generate/rulePackages';
import readin, { readinWithFilenames } from 'lib/readin';
import outputStyles from 'lib/output';
import * as display from 'lib/display';
import process from 'processors';
import * as types from 'processors/types';
import writeFiles from 'lib/generate/fs';
import path from 'path';
import changeCase from 'change-case';
import fingerprint from 'fingerprinting';

import { mainFile, variableFile } from 'lib/generate/scss';

import formatAtrule from 'formatters/atrule';
import formatGlobal from 'formatters/global';
import processVariable from 'processors/variable';

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'console', alias: 'c', type: Boolean },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true },
  { name: 'dest', alias: 'd', type: String },
  { name: 'debugger', type: Boolean },
  { name: 'cdn', type: String },
  { name: 'account', type: String },
  { name: 'brand', type: String },
  { name: 'key', type: String },
];
const options = commandLineArgs(optionDefinitions);

const processOptions = cliOptions => {
  if (cliOptions.console) {
    display.enableDisplay();
  }
  if (cliOptions.verbose) {
    display.enableLog();
  }
  if (cliOptions.debugger) {
    display.enableDebug();
  }
};



const processTreeToData = $ => {
  const globals = [];
  const whatever = [];

  $().children(n => n.node.type !== 'space').nodes.forEach(n => {
    const processed = process(n);
    if (processed.type === types.VARIABLE) {
      globals.push(processed.token);
    } else if (processed.type === types.COMMENT) {
      // Do nothing
    } else {
      whatever.push(processed);
    }
  });
  return { globals, whatever };
};

const parseSource = src => (createQueryWrapper(parse(src)));

const incorporateBrandAiData = originalData => {
  const parsed = parseSource(originalData);
  const { globals, whatever } = processTreeToData(parsed);
  display.debug(whatever);
  console.log(globals);
}

const retrieveBrandAiConfig = () => (
  incorporateBrandAiData(downloadBrandAiVariables('monksp-buildit', 'primary-brand', 'Bko6hpr5g'))
)

const addBrandAiToMain = main => {
  let alreadyIncluded = false;
  const finalizedMain = main;
  main.forEach(r => {
    if (r.keyword && r.keyword == '@import' && r.arguments && r.arguments == '_style-params.scss') {
      alreadyIncluded = true;
    }
  });
  if (!alreadyIncluded) {
    finalizedMain.unshift({ keyword: '@import', arguments: '_style-params.scss' });
  }
  return finalizedMain;
};

const openMainScssFile = () => {
  const contents = readin(`${options.dest}/scss/${mainFile}`);
  const { whatever: parsed } = processTreeToData(parseSource(contents[0]));
  return parsed;
};

const openGlobalScssFile = () => {
  const contents = readin(`${options.dest}/scss/${variableFile}`);
  const { globals } = processTreeToData(parseSource(contents[0]));
  return globals;
}
const openFilesDirectory = fileType => {
  const files = readinWithFilenames(`raw/tmp/${fileType}_package`);
  return files;
}
const openImageDirectory = () => openFilesDirectory('images');
const openIconDirectory = () => openFilesDirectory('icons');
const openLogoDirectory = () => openFilesDirectory('logos');

const processFiles = (files, type) => {
  const BRANDAI_PREFIX = `brandai-${type}-`;
  const processedFiles = [];

  Object.keys(files).forEach(filename => {
    const basename = path.basename(filename);
    const extension = path.extname(filename);
    const name = path.basename(filename, extension);
    const variable = processVariable({ value: `${BRANDAI_PREFIX}${changeCase.paramCase(name)}` });
    const fingerprinted = fingerprint(basename, { content: files[filename] })

    processedFiles.push({
      name,
      extension,
      variable,
      fingerprinted: fingerprinted.file,
      content: files[filename],
    });
  });

  return processedFiles;
}

const writeAssetFiles = (files, type) => {
  const assetsToWrite = {};
  const newGlobals = {};
  files.forEach(file => {
    const assetPath = path.join(`/assets/${type}`, file.fingerprinted);
    newGlobals[file.variable] = `"${assetPath}"`;
    assetsToWrite[file.fingerprinted] = file.content;
  });

  writeFiles(assetsToWrite, path.join(`./dest/assets/${type}`));

  return newGlobals;
};
const incorporateFiles = (assets, type) => {
  const files = processFiles(assets, type);
  return writeAssetFiles(files, type);
};

const incorporateImages = () => (incorporateFiles(openImageDirectory(), 'images'));
const incorporateIcons = () => (incorporateFiles(openIconDirectory(), 'icons'));
const incorporateLogos = () => (incorporateFiles(openLogoDirectory(), 'logos'));

// if (options.help || !options.src || !options.dest) {
//   processorHelp();
// } else {
  processOptions(options);
  // retrieveBrandAiConfig();

  // const parsedMain = openMainScssFile();
  // const updated = addBrandAiToMain(parsedMain);
  // writeFiles({'main.scss': updated.map(p => formatAtrule(p)).join('\n')}, path.join('./dest/scss'));

  const globals = Object.assign(...openGlobalScssFile());

  Object.assign(globals, incorporateImages(), incorporateIcons(), incorporateLogos());

  writeFiles({ '_variables.scss': formatGlobal(globals).join('\n') }, './dest/scss')
  display.debug(formatGlobal(globals));
// }
