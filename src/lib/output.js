/** @module lib/output */
import generateTokens from './generate/tokens';
import generateScss from './generate/scss';

/**
 * Takes read-in data and outputs design tokens using it
 * @param {Object} data - The data
 * @param {Object} settings
 * @param {string} settings.dest - Where the token directory shoud be output
 */
export const outputTokens = (data, settings = {}) => (generateTokens(data, settings.dest));

/**
 * Takes token data and outputs an SCSS directory
 * @param {Object[]} globals - Variables
 * @param {Object[]} rules - Any element rules
 */
export const outputStyles = (globals, rules) => (generateScss(globals, rules));
