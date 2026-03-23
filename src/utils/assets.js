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
const uiAssets = import.meta.glob(
  '../assets/images/ui/*.{png,jpg,jpeg,svg,webp}',
  { eager: true }
);
// Создаем карту: { 'js.svg': '/assets/js.hash.svg' }
export const assetMap = Object.fromEntries(
  Object.entries(uiAssets).map(([path, module]) => {
    const filename = path.split('/').pop();
    return [filename, module.default];
  })
);
/**
 * Возвращает готовый URL для файла из карты
 */
export function getAssetUrl(filename) {
  if (!filename) {
    return '';
  }
  return assetMap[filename] || '';
}
