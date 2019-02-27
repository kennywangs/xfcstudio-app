const app = getApp();

Page({
  data: {
    grids: [
      { id: 1, image: '/images/icon_tabbar.png', label: '预约', url: '/pages/appoint/appoint'},
      { id: 2, image: '/images/icon_tabbar.png', label: '日志', url: '/pages/logs/logs'},
      {id: 3, image: '/images/icon_nav_form.png', label: '敬请期待', url: ''}
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    }
    // else{
    //   app.userInfoReadyCallback = res => {
    //     app.globalData.userInfo = res.userInfo;
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     });
    //   }
    // }
  },
  getlocal: function(){
    console.log('getlocal');
  }
});