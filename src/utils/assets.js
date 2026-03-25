// Symbol ** points to "any folder"
const allAssets = import.meta.glob(
  '../assets/images/**/*.{png,jpg,jpeg,svg,webp}',
  { eager: true }
);

export const assetMap = Object.fromEntries(
  Object.entries(allAssets).map(([path, module]) => {
    // Getting only file name: "folder/sub/icon.svg" -> "icon.svg"
    const filename = path.split('/').pop();
    return [filename, module.default];
  })
);

export function getAssetUrl(filename) {
  return assetMap[filename] || '';
}
