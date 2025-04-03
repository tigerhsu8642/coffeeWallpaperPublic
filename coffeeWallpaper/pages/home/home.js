import { fetchHome } from '../../services/home/home';
import { initHomeWallpapersData } from '../../services/wallpaper/fetchWallpapers';
import { initSwipersData } from '../../services/wallpaper/fetchWallpapers';
import { DomainFalskUrl } from '../../config/index';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    imgSrcs: [],
	  swipersList: [],
    wallpaperHomeMap: new Map(),
    wallpapersListLoadStatus: 0,
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'aspectFill' },
	
	wallpaperHomeData: {
		live_wallpaper: [
		],
	    AI_wallpaper: [
	    ],
		Nostalgia_game: [
		],
		scenery: [
		],
		speed: [
		],
		recommend: [
		]
	},
  },

  wallpaperListPagination: {
    index: 0,
    num: 15,
  },

  privateData: {
    tabIndex: 0,
  },

  onShow() {
    // this.getTabBar().init();
  },

  onLoad() {
    this.init();
  },

  onReachBottom() {
    // if (this.data.wallpapersListLoadStatus === 0) {
    //   this.loadWallpapersList();
    // }
  },

  onPullDownRefresh() {
    this.init();
  },
  
  convertMapToObj(map) {
	return Array.from(map).reduce((acc, [key, value]) => {
	acc[key] = value.map(item => ({
	  // 可做数据清洗
	  compressedImage: item.compressedImage,
	  originImage: item.originImage,
	  // 保留其他必要字段...
	}))
	return acc
	}, {});
  },
	
  async loadWallpapersData() {
    try {
		const nextList = await initSwipersData();
		this.setData({
		  swipersList: nextList,
		});
	} catch (err) {
	  console.log(err);
	  this.setData({ wallpapersListLoadStatus: 3 });
	}
	
	try {
		const nextMap = await initHomeWallpapersData();
		this.setData({
		  wallpaperHomeData: this.convertMapToObj(nextMap)
		});
    
	} catch (err) {
	  console.log(err);
	  this.setData({ wallpapersListLoadStatus: 3 });
	}
	// console.log('loadHomePage');
	this.loadHomePage();
  },

  init() {
	this.loadWallpapersData();
  },

  loadHomePage() {
    wx.stopPullDownRefresh();
	
    this.setData({
      pageLoading: true,
    });
    fetchHome().then(({ swiper}) => {
      this.setData({
        imgSrcs: swiper,
        pageLoading: false,
      });
      // this.loadWallpapersList(true);
    });
  },

  jumpDetail(e) {
    let detail = e.detail;
    if (detail.endsWith('.mp4'))
    {
      wx.navigateTo({
        url: `/pages/wallpaper/video/index?thumb=${detail}`,
      });
    } 
    else 
    {
      wx.navigateTo({
        url: `/pages/wallpaper/details/index?thumb=${detail}`,
      });
    }
  },

  jumpMore(e) {
    // Toast({
    //       context: this,
    //       selector: '#t-toast',
    //       message: "catalog ==> "+e.detail,
    //     });
    
    let catalog  = e.detail;
    wx.navigateTo({
      url: `/pages/wallpaper/catalog/catalog?catalog=${catalog}`,
    });
  },

  onReTry() {
    // this.loadWallpapersList();
  },

  navToActivityDetail(e) {	  
    const { index } = e.detail;
    var detail = this.data.swipersList[index];
    
    wx.navigateTo({
      url: `/pages/wallpaper/details/index?thumb=${detail}`,
    });
  },
});
