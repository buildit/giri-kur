const config = {
  display: false,
  log: false,
};

export const enableDisplay = () => { config.display = true; };
export const enableLog = () => { config.log = true; };

const testAndOutput = (test, output) => {
  if (test) {
    console.log(output); // eslint-disable-line no-console
  }
  return true;
}

export const display = output => (testAndOutput(config.display, output));
export const log = output => (testAndOutput(config.log, output));
