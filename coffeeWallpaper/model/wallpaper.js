import { cdnBase } from '../config/index';
import { DomainFalskUrl } from '../config/index';
import { DomainImagesUrl } from '../config/index';
import { WallpaperTypeMap } from '../config/index';
const imgPrefix = cdnBase;

var catalogWallpaperList = [];
var allSwipers = [];
var swipers = [];

// 转换函数
function convertToMap(data) {
	const resultMap = new Map();
	data.forEach(item => {
	  const type = item.type;
	  const itemValue = {
		type: type,
		compressedImage: DomainImagesUrl + item.compressedImage,
		originImage: DomainImagesUrl + item.originImage 
	  };

	  if (resultMap.has(type)) {
		resultMap.get(type).push(itemValue);
	  } else {
		resultMap.set(type, [itemValue]);
	  }
	});
	return resultMap;
}

export function initHomeWallpaperList() {	
	return new Promise((resolve,reject) => {
		
	  wx.request({
		url: DomainFalskUrl + 'wallpaper', // 替换为你的接口地址
		method: 'GET', // 可选：GET/POST/PUT/DELETE
		header: {
		  'Content-Type': 'application/json' // 根据接口要求设置请求头
		},
		data: { // 可选：请求参数（GET 参数或 POST body）
		  catalog: "home"
		},
		success: (res) => {
		  if (res.statusCode === 200) { // HTTP 状态码为 200 表示成功
			const result = convertToMap(res.data[0]);
			resolve(result);
		  } else {
			reject ('请求失败，状态码：'+res.statusCode);
		  }
		},
		fail: (err) => {
			reject(err);
		}
	  });
  });
}


export function initWallpaperList(catalog) {	
	return new Promise((resolve,reject) => {
	
	  catalogWallpaperList = [];
		
	  wx.request({
		url: DomainFalskUrl + 'wallpaper', // 替换为你的接口地址
		method: 'GET', // 可选：GET/POST/PUT/DELETE
		header: {
		  'Content-Type': 'application/json' // 根据接口要求设置请求头
		},
		data: { // 可选：请求参数（GET 参数或 POST body）
		  catalog: catalog
		},
		success: (res) => {
		  if (res.statusCode === 200) { // HTTP 状态码为 200 表示成功
			catalogWallpaperList = res.data[0];
			resolve('');
		  } else {
			reject ('请求失败，状态码：'+res.statusCode);
		  }
		},
		fail: (err) => {
			reject(err);
		}
	  });
  });
}
  
export function initSwipersList() {
	return new Promise((resolve, reject) => {
	
	  allSwipers = [];
	  swipers = [];
	  wx.request({
		url: DomainFalskUrl + 'swiper', // 替换为你的接口地址
		method: 'GET', // 可选：GET/POST/PUT/DELETE
		header: {
		  'Content-Type': 'application/json' // 根据接口要求设置请求头
		},
		data: { // 可选：请求参数（GET 参数或 POST body）
		  page: 1,
		  limit: 10
		},
		success: (res) => {
		  if (res.statusCode === 200) { // HTTP 状态码为 200 表示成功
			allSwipers = res.data;
			var swipersDetails = [];
			// console.log("allSwipers.length:"+allSwipers.length);
			for (let i = 0; i < allSwipers.length; i++) {
				// console.log(allSwipers[i]);
				swipers.push(DomainImagesUrl + allSwipers[i]?.compressedImage);
				swipersDetails.push(DomainImagesUrl + allSwipers[i]?.originImage);
			}
			resolve(swipersDetails);
		  } else {
			reject ('请求失败，状态码：'+res.statusCode);
		  }
		},
		fail: (err) => {
			reject(err);
		}
	  });
	});
}

/**
 * @param {string} catalog
 */
export function genWallpaper(catalog = "", id = 0, tabIndex = 0) {

  let catalogMap = WallpaperTypeMap[catalog] || [];
  let typrStr = catalogMap[tabIndex];

  const tabWallpapers = catalogWallpaperList.filter(item => (tabIndex == 0 || item.type == typrStr));									
  const item = tabWallpapers[id % tabWallpapers.length];

  return {
    ...item,
    // spuId: `${id}`,
  	spuId: item?.name,
    images: DomainImagesUrl + item?.compressedImage,
	detail: DomainImagesUrl + item?.originImage,
  };  
}

export function genSwiperImageList() {
  return swipers;
}
