import { config } from '../../config/index';

export function initHomeWallpapersData() {
  const { initHomeWallpaperList } = require('../../model/wallpaper');
  return initHomeWallpaperList();
}

export function initWallpapersData(catalog) {
  const { initWallpaperList } = require('../../model/wallpaper');
  return initWallpaperList(catalog);
}

export function initSwipersData() {
  const { initSwipersList } = require('../../model/wallpaper');
  return initSwipersList();
}

/** 获取主页下壁纸列表 */
export function fetchHomeWallpapersList(type) {
  const { genHomeWallpaper } = require('../../model/wallpaper');
  return genHomeWallpaper(type);
}

/** 获取目录下壁纸列表 */
export function fetchWallpapersList(catalog, pageIndex = 1, pageSize = 20,tabIndex = 0) {
	
	// console.log(catalog, pageIndex, pageSize, tabIndex);
  
  const { delay } = require('../_utils/delay');
  const { getWallpapersList } = require('../../model/wallpapers');
  
  return delay().then(() =>
    getWallpapersList(catalog,pageIndex, pageSize, tabIndex).map((item) => {
  		
      return {
        spuId: item.spuId,
        thumb: item.images,
  		detail: item.detail,
        title: item.title,
  		type : item.type,
      };
    }),
  );
}
