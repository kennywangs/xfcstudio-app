const app = getApp();

Page({
  data: {
    motto: 'Hello World',
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