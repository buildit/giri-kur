/** @module settings */
const settings = {
  componentRepoName: '',
  styleRepoName: '',
};

/**
 * Sets the name of the component repo (for generating design tokens)
 * @param {string} name - The name of the component repo
 */
export const setComponentRepoName = name => { settings.componentRepoName = name; };
/** Retrieves the set name of the component repo */
export const getComponentRepoName = () => (settings.componentRepoName);

/**
 * Sets the name of the style repo (for generating design tokens)
 * @param {string} name - The name of the style repo
 */
export const setStyleRepoName = name => { settings.styleRepoName = name; };
/** Retrieves the set name of the style repo */
export const getStyleRepoName = () => (settings.styleRepoName);
