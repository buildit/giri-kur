/** @module lib/display */
const config = {
  display: false,
  log: false,
};

/** Enable console message displays */
export const enableDisplay = () => { config.display = true; };
/** Enable log message displays */
export const enableLog = () => { config.log = true; };
/** Disable console message displays */
export const disableDisplay = () => { config.display = false; };
/** Disable log message displays */
export const disableLog = () => { config.log = false; };

const testAndOutput = (test, output) => {
  if (test) {
    console.log(output); // eslint-disable-line no-console
  }
  return true;
};

/**
 * Display a message to the console
 * @param {string} output - The message to be displayed
 */
export const display = output => (testAndOutput(config.display, output));
/**
 * Display a log message
 * @param {string} output - The log message to be displayed
 */
export const log = output => (testAndOutput(config.log, output));
