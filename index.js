import { parse, stringify } from 'scss-parser';
import createQueryWrapper from 'query-ast';

import help from './lib/help';
import readin from './lib/readin';
import output from './lib/output';
import process from './processors';

// const sourceDirectory = path.resolve(__dirname, 'raw');
// const destDirectory = path.resolve(__dirname, 'processed');;

const commandLineArgs = require('command-line-args');
const optionDefinitions = [
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'console', alias: 'c', type: Boolean },
  { name: 'src', alias: 's', type: String, multiple: true, defaultOption: true },
  { name: 'dest', alias: 'd', type: String }
]
const options = commandLineArgs(optionDefinitions);

// console.log(options);

if (options.help || !options.src) {
  help();
}
else {
  const content = readin(options.src);
  let ast = parse(content);
  let $ = createQueryWrapper(ast);

  const globals = [];
  const rules = {
    elements: [],
    classes: [],
    ids: [],
  };

  $().children(n => n.node.type !== 'space').nodes.forEach(n => {
    const processed = process(n);
    if (processed.type == 'VARIABLE') {
      globals.push(processed.token);
    }
    else {
      const { selector, declarations, type } = processed;
      if (type === 'identifier') {
        rules.elements.push({selector, declarations});
      }
      if (type === 'class') {
        rules.classes.push({selector, declarations});
      }
      if (type === 'id') {
        rules.ids.push({selector, declarations});
      }
    }
  });

  output(JSON.stringify({globals, rules}), options);
}
