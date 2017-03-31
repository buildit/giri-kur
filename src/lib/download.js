import download from 'download-file-sync';
import admzip from 'adm-zip';

const downloadBrandAiFile = (account, brand, filename, key) => {
  const url = `https://assets.brand.ai/${account}/${brand}/${filename}?key=${key}`;
  return download(url);
}

export const downloadBrandAiVariables = (account, brand, key) => (
  downloadBrandAiFile(account, brand, '_style-params.scss', key)
);
export const downloadBrandAiImages = (account, brand, key) => (
  downloadBrandAiFile(account, brand, 'images.zip', key)
);
export const downloadBrandAiIcons = (account, brand, key) => (
  downloadBrandAiFile(account, brand, 'icons.zip', key)
);
export const downloadBrandAiLogos = (account, brand, key) => (
  downloadBrandAiFile(account, brand, 'logos.zip', key)
);
