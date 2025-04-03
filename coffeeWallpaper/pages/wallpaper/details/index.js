import Toast from 'tdesign-miniprogram/toast/index';
import { cdnBase } from '../../../config/index';

const imgPrefix = `${cdnBase}/`;

const recLeftImg = `${imgPrefix}common/rec-left.png`;
const recRightImg = `${imgPrefix}common/rec-right.png`;
const obj2Params = (obj = {}, encode = false) => {
  const result = [];
  Object.keys(obj).forEach((key) =>
    result.push(`${key}=${encode ? encodeURIComponent(obj[key]) : obj[key]}`),
  );

  return result.join('&');
};

Page({
  data: {
    thumb: '',
  },


  showCurImg(e) {
    const { index } = e.detail;
    const { images } = this.data.details;
    wx.previewImage({
      current: images[index],
      urls: images, // 需要预览的图片http链接列表
    });
  },

  onLoad(query) {
    const { thumb } = query;
    this.setData({
      thumb: thumb,
    });
  },
  
  downloadClick: function() {
	  
	  this.downloadImage(this.data.thumb);
  },
  
  
  downloadImage: function(imageSrc) {

    const that = this;
	
	// 获取当前日期
	const currentDate = new Date().toLocaleDateString();
	// 从本地缓存中获取下载记录
	let downloadRecord = wx.getStorageSync('downloadRecord');
	if (!downloadRecord) {
		// 如果没有记录，初始化记录
		downloadRecord = {
		date: currentDate,
		count: 0
		};
		wx.setStorageSync('downloadRecord', downloadRecord);
	}

	// 检查日期是否一致
	if (downloadRecord.date === currentDate) {
		if (downloadRecord.count >= 3) {
			// 达到下载次数限制
			wx.showToast({
				title: '今日下载次数已达上限',
				icon: 'none'
			});
			return;
		}
	} else {
		// 日期不一致，重置下载次数
		downloadRecord = {
		date: currentDate,
		count: 0
		};
		wx.setStorageSync('downloadRecord', downloadRecord);
	}

    wx.showModal({
      title: '提示',
      content: '是否确定要下载图片？',
      success: function(res) {
        if (res.confirm) {
          wx.getSetting({
            success: function(res) {
              that.saveImage(imageSrc);
            }
          });
        } else if (res.cancel) {
          console.log('用户取消下载');
		  wx.showToast({ title: '取消下载v.07', icon: 'none' });
        }
      }
    });
  },
  
  saveImage: function(imageSrc) {
    const that = this;
	
	wx.getSetting({
	  success(res) {
	    if (res.authSetting['scope.writePhotosAlbum']) {
	      // 用户已经授权保存到相册的权限
	      console.log('用户已授权保存到相册权限');
	      // 可以执行需要该权限的操作，如保存图片到相册
	      that.doSaveImage(imageSrc);
	    } else {
	      // 用户未授权保存到相册的权限
	      console.log('用户未授权保存到相册权限');
	      if (typeof res.authSetting['scope.writePhotosAlbum'] === 'undefined') {
	        // 用户还没有对该权限进行过任何操作，可引导用户授权
	        wx.authorize({
	          scope: 'scope.writePhotosAlbum',
	          success() {
	            console.log('用户同意授权保存到相册权限');
	            // 再次执行需要该权限的操作
	            that.doSaveImage(imageSrc);
	          },
	          fail() {
	            console.log('用户拒绝授权保存到相册权限');
	            // 可以提示用户去设置中手动开启权限
	            wx.showModal({
	              title: '提示',
	              content: '您拒绝了保存图片到相册的权限，如需使用该功能，请在设置中开启。',
	              confirmText: '去设置',
	              success: function (res) {
	                if (res.confirm) {
	                  wx.openSetting({
	                    success(res) {
	                      console.log('用户进入设置页面', res.authSetting);
	                    }
	                  });
	                }
	              }
	            });
	          }
	        });
	      } else {
	        // 用户之前已经拒绝过该权限，可引导用户去设置中手动开启权限
	        wx.showModal({
	          title: '提示',
	          content: '您之前拒绝了保存图片到相册的权限，如需使用该功能，请在设置中开启。',
	          confirmText: '去设置',
	          success: function (res) {
	            if (res.confirm) {
	              wx.openSetting({
	                success(res) {
	                  console.log('用户进入设置页面', res.authSetting);
	                }
	              });
	            }
	          }
	        });
	      }
	    }
	  },
	  fail(err) {
	    console.log('获取用户设置失败', err);
	  }
	});
	
  },
  
  doSaveImage: function(url) {
	  wx.downloadFile({
	    url: url,
	    success: function(res) {
	      if (res.statusCode === 200) {
	        wx.saveImageToPhotosAlbum({
	          filePath: res.tempFilePath,
	          success: function() {

				let downloadRecord = wx.getStorageSync('downloadRecord');
				downloadRecord.count++;
            	wx.setStorageSync('downloadRecord', downloadRecord);

	            wx.showToast({ title: '保存成功' });
	          },
	          fail: function(err) {
	            wx.showToast({ title: '保存失败' + err.errMsg, icon: 'none' });
	          }
	        });
	      }
	    },
	    fail: function(err) {
	      wx.showToast({ title: '下载失败' + err.errMsg, icon: 'none' });
	    }
	  });
	}
});
