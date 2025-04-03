import { genWallpaper } from './wallpaper';

export function getWallpapersList(catalog = "recommend", baseID = 0, length = 10, tabIndex = 0) {
  return new Array(length).fill(0).map((_, idx) => genWallpaper(catalog,idx + baseID * length,tabIndex));
}

export const wallpapersList = getWallpapersList();
