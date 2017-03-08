import { parse } from 'scss-parser';
import createQueryWrapper from 'query-ast';

import { tokenizerHelp } from 'lib/help';
import readin from 'lib/readin';
import { outputTokens } from 'lib/output';
import * as display from 'lib/display';
import * as settings from 'settings';
import process from 'processors';

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'console', alias: 'c', type: Boolean },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true },
  { name: 'dest', alias: 'd', type: String },
  { name: 'component-name', type: String },
  { name: 'style-name', type: String },
];
const options = commandLineArgs(optionDefinitions);

const processOptions = cliOptions => {
  if (cliOptions.console) {
    display.enableDisplay();
  }
  if (cliOptions.verbose) {
    display.enableLog();
  }
  if (cliOptions['component-name']) {
    settings.setComponentRepoName(cliOptions['component-name']);
  }
  if (cliOptions['style-name']) {
    settings.setStyleRepoName(cliOptions['style-name']);
  }
};

const addDefaults = src => (src);
// There's some funkiness that's coming from including this stuff.  Fix later.
// const addDefaults = src => (['node_modules/kiur/src/components', ...src]);

const readAndParseSource = src => {
  const content = readin(addDefaults(src)).join('');
  const ast = parse(content);
  return createQueryWrapper(ast);
};

const updateRules = (currentRules, newData) => {
  const updatedRules = Object.assign({}, currentRules);
  const selector = newData.selector[0];
  if (!selector) {
    return updatedRules;
  }
  const pseudoselector = newData.selector[1] || '*';
  const selectorRules = currentRules[selector] || {};
  const pseudoRules = Object.assign(selectorRules[pseudoselector] || {}, ...newData.declarations);
  selectorRules[pseudoselector] = pseudoRules;
  updatedRules[selector] = selectorRules;
  return updatedRules;
};

const processTreeToData = $ => {
  const globals = [];
  const rules = {
    elements: {},
    classes: {},
    ids: {},
  };

  $().children(n => n.node.type !== 'space').nodes.forEach(n => {
    const processed = process(n);
    if (processed.type === 'VARIABLE') {
      globals.push(processed.token);
    } else if (processed.selector) {
      const { selector, declarations } = processed;
      selector.forEach(s => {
        const type = s.type;
        if (type === 'identifier') {
          rules.elements = updateRules(rules.elements, { selector: s.token, declarations });
        }
        if (type === 'class') {
          rules.classes = updateRules(rules.classes, { selector: s.token, declarations });
        }
        if (type === 'id') {
          rules.ids = updateRules(rules.ids, { selector: s.token, declarations });
        }
      });
    }
  });
  return { globals, rules };
};


if (options.help || !options.src) {
  tokenizerHelp();
} else {
  processOptions(options);
  const $ = readAndParseSource(options.src);
  const processed = processTreeToData($);

  outputTokens(processed, options);
}
