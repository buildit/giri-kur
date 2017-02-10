const config = {
  console: false,
  log: false,
};

export const enableDisplay = () => { config.console = true; };
export const enableLog = () => { config.log = true; };

const testAndOutput = (test, output) => {
  if (test) {
    console.log(output); // eslint-disable-line no-console
  }
  return true;
}

export const display = output => (testAndOutput(config.console, output));
export const log = output => (testAndOutput(config.log, output));
