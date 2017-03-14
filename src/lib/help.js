const getUsage = require('command-line-usage');

const processorSections = [
  {
    header: 'create-scss-from-raw',
    content: 'Generates a package of usable SCSS files from raw SCSS inputs',
  },
  {
    header: 'Synopsis',
    content: [
      '$ create-scss-from-raw [bold]{--src} file file file...',
      '$ create-scss-from-raw [bold]{--help}',
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'src',
        typeLabel: '[underline]{file/dir}, ...',
        description: 'The input(s) to process.',
      },
      {
        name: 'dest',
        typeLabel: '[underline]{directory}',
        description: 'The output location.  Will create an scss folder inside this location.',
      },
      {
        name: 'console',
        description: 'Outputs the generated token file to the console.',
      },
      {
        name: 'verbose',
        description: 'Enables console display of events as they happen.',
      },
      {
        name: 'debugger',
        description: 'Enables any current debug statments to output.',
      },
      {
        name: 'help',
        description: 'Print this usage guide.',
      },
    ],
  },
  {
    header: 'Examples',
    content: [
      {
        desc: '1. Directory.',
        example: '$ create-scss-from-raw --src ./orig --dest ./dest',
      },
      {
        desc: '2. Single file.',
        example: '$ create-scss-from-raw --src ./orig/file.scss --dest ./dest',
      },
    ],
  },
  {
    content: 'Project home: [underline]{https://github.com/buildit/giri-kur}',
  },
];


const processorHelp = () => {
  console.log(getUsage(processorSections)); // eslint-disable-line no-console
};
export default processorHelp;
