import help from 'lib/help';
import readin from 'lib/readin';
import * as display from 'lib/display';
import { outputStyles } from 'lib/output';

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'verbose', alias: 'v', type: Boolean },
  { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true },
  { name: 'dest', alias: 'd', type: String },
];
const options = commandLineArgs(optionDefinitions);

const processOptions = optionList => {
  if (optionList.verbose) {
    display.enableLog();
  }
};

const readAndParseSource = src => (
  readin(src)
    .map(content => JSON.parse(content))
);

if (options.help || !options.src) {
  help();
} else {
  processOptions(options);

  const allSources = readAndParseSource(options.src);

  // ASSUMPTION!  JSON Objects that are {} are tokens and [] are global definitions.
  const tokens = allSources.filter(content => {
    const contentProto = Object.getPrototypeOf(content);
    const objectProto = Object.getPrototypeOf({});
    return contentProto === objectProto;
  });
  const globals = allSources
    .filter(content => Array.isArray(content))
    .reduce((acc, content) => [...acc, ...content], []);

  outputStyles({ tokens, globals }, options);
}
