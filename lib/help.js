const getUsage = require('command-line-usage');

const sections = [
  {
    header: 'design-token-ingest',
    content: 'Generates a design token file from SCSS files. [italic]{Hopefully}.',
  },
  {
    header: 'Synopsis',
    content: [
      '$ design-token-ingest [bold]{--src} file file file...',
      '$ design-token-ingest [bold]{--help}',
    ],
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'src',
        typeLabel: '[underline]{file}',
        description: 'The input to process.',
      },
      {
        name: 'dest',
        typeLabel: '[underline]{file}',
        description: 'The output location. Will output to the console if nothing specified.',
      },
      {
        name: 'console',
        typeLabel: '[underline]{file}',
        description: 'Outputs the generated token file to the console.',
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
        desc: '1. Ingest a single file and output it to the console.',
        example: '$ design-token-ingest foo.scss',
      },
      {
        desc: '2. Read in a directory and output it.',
        example: '$ design-token-ingest --src ./orig --dest ./dest',
      },
    ],
  },
  {
    content: 'Project home: [underline]{https://github.com/buildit/giri-kur}',
  },
];

const help = () => {
  console.log(getUsage(sections)); // eslint-disable-line no-console
};
export default help;
