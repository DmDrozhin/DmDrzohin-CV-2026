export function createAssetMap(globResult) {
  return Object.fromEntries(
    Object.entries(globResult).map(([path, module]) => {
      const filename = path.split('/').pop();
      return [filename, module.default];
    })
  );
}
export function getIconPath(file) {
  if (!file) {
    return '';
  }
  return new URL(`../assets/images/ui/${file}`, import.meta.url).href;
}

// New utils for 2026
// Символ ** означает "любая подпапка"
const allAssets = import.meta.glob(
  '../assets/images/**/*.{png,jpg,jpeg,svg,webp}',
  { eager: true }
);

export const assetMap = Object.fromEntries(
  Object.entries(allAssets).map(([path, module]) => {
    // Получаем только имя файла: "folder/sub/icon.svg" -> "icon.svg"
    const filename = path.split('/').pop();
    return [filename, module.default];
  })
);

export function getAssetUrl(filename) {
  return assetMap[filename] || '';
}
