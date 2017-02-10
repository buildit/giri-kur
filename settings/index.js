const settings = {
  componentRepoName: '',
  styleRepoName: '',
};

export const setComponentRepoName = name => { settings.componentRepoName = name; }
export const getComponentRepoName = () => (settings.componentRepoName);

export const setStyleRepoName = name => { settings.styleRepoName = name; }
export const getStyleRepoName = () => (settings.styleRepoName);
