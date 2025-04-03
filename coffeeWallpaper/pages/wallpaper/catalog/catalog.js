import { initWallpapersData } from '../../../services/wallpaper/fetchWallpapers';
import { fetchWallpapersList } from '../../../services/wallpaper/fetchWallpapers';
import { CatalogTabMap } from '../../../config/index';
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    catalog: '',
    imgSrcs: [],
    tabList: [],
    wallpapersList: [],
    wallpapersListLoadStatus: 0,
    current: 1,
    autoplay: true,
    duration: '500',
    interval: 5000,
    navigation: { type: 'dots' },
    swiperImageProps: { mode: 'aspectFill' },
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

  onLoad(query) {
    const { catalog } = query;
    this.setData({
      catalog: catalog,
    });
    this.init();
  },

  onReachBottom() {
    if (this.data.wallpapersListLoadStatus === 0) {
      this.loadWallpapersList();
    }
  },

  onPullDownRefresh() {
    this.init();
  },
  
  async loadWallpapersData() {
    try {
      await initWallpapersData(this.data.catalog);
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
    // let tabCatalog = CatalogTabMap[this.data.catalog];

    this.setData({
      tabList: CatalogTabMap[this.data.catalog],
    });
    this.loadWallpapersList(true);
  },
  
  tabChangeHandle(e) {
    this.privateData.tabIndex = e.detail;
    this.loadWallpapersList(true);
  },

  onReTry() {
    this.loadWallpapersList();
  },

  async loadWallpapersList(fresh = false) {
    if (fresh) {
      wx.pageScrollTo({
        scrollTop: 0,
      });
    }

    this.setData({ wallpapersListLoadStatus: 1 });

    const pageSize = this.wallpaperListPagination.num;
    // let pageIndex = this.privateData.tabIndex * pageSize + this.wallpaperListPagination.index + 1;
	  let pageIndex = this.wallpaperListPagination.index + 1;
    if (fresh) {
      pageIndex = 0;
    }
	
    try {
      const nextList = await fetchWallpapersList(this.data.catalog, pageIndex, pageSize,this.privateData.tabIndex.value);
	  this.setData({
        wallpapersList: fresh ? nextList : this.data.wallpapersList.concat(nextList),
        wallpapersListLoadStatus: 0,
      });

      this.wallpaperListPagination.index = pageIndex;
      this.wallpaperListPagination.num = pageSize;
    } catch (err) {
	  console.log(err);
      this.setData({ wallpapersListLoadStatus: 3 });
    }
  },

  wallpaperListClickHandle(e) {
	  
    const { index } = e.detail;
	  const { detail } = this.data.wallpapersList[index];
    
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

  navToSearchPage() {
    wx.navigateTo({ url: '/pages/goods/search/index' });
  },

  navToActivityDetail(e) {	  
    const { index } = e.detail;
    var detail = this.data.swipersList[index];
    
    wx.navigateTo({
      url: `/pages/wallpaper/details/index?thumb=${detail}`,
    });
  },
});
