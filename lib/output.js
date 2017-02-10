import generate from './generate';

const output = (data, settings = {}) => {
  const outToConsole = !!settings.console || !settings.dest;
  const dest = settings.dest;

  if (outToConsole) {
    generate(data, dest);
    console.log(data); // eslint-disable-line no-console
  }

  if (dest) {
  }
};

export default output;
