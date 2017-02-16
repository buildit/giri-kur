const getUsage = require('command-line-usage');

const tokenizerSections = [
  {
    header: 'create-design-token',
    content: 'Generates a design token file from SCSS files. [italic]{Hopefully}.',
  },
  {
    header: 'Synopsis',
    content: [
      '$ create-design-token [bold]{--src} file file file...',
      '$ create-design-token [bold]{--help}',
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
        typeLabel: '[underline]{file}',
        description: 'The output location. Will output to the console if nothing specified.',
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
        name: 'component-name',
        typeLabel: '[underline]{component repo name}',
        description: 'Name of the component repo that will be part of this project',
      },
      {
        name: 'style-name',
        typeLabel: '[underline]{style repo name}',
        description: 'Name of the style repo that will be a part of this project',
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
        example: '$ create-design-token foo.scss',
      },
      {
        desc: '2. Read in a directory and output it.',
        example: '$ create-design-token --src ./orig --dest ./dest',
      },
    ],
  },
  {
    content: 'Project home: [underline]{https://github.com/buildit/giri-kur}',
  },
];

const scssGeneratorSections = [
  {
    header: 'create-scss-from-tokens',
    content: 'Generates a set of SCSS files in atomic design layout from design tokens',
  },
  {
    header: 'Synopsis',
    content: [
      '$ create-scss-from-tokens [bold]{--src} file file file...',
      '$ create-scss-from-tokens [bold]{--help}',
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
        typeLabel: '[underline]{file}',
        description: 'The output location.',
      },
      {
        name: 'verbose',
        description: 'Enables console display of events as they happen.',
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
        example: '$ create-design-token foo.scss',
      },
      {
        desc: '2. Read in a directory and output it.',
        example: '$ create-design-token --src ./orig --dest ./dest',
      },
    ],
  },
  {
    content: 'Project home: [underline]{https://github.com/buildit/giri-kur}',
  },
];

export const tokenizerHelp = () => {
  console.log(getUsage(tokenizerSections)); // eslint-disable-line no-console
};
export const scssGeneratorHelp = () => {
  console.log(getUsage(scssGeneratorSections)); // eslint-disable-line no-console
}
