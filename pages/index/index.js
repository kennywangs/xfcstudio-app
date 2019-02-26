//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    info: '请同意我们获取您的头像昵称',
    mobile: wx.getStorageSync('mobile'),
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    app.getUserInfo(this.updateData);
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     app.globalData.userInfo = res.userInfo;
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo;
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  updateData: function() {
    if (app.globalData.userInfo) {
      this.setData({ info: '已得到您的授权，请输入手机号登录', hasUserInfo: true });
    }
    console.log(this.data);
  },
  setMobile: function(e) {
    this.data.mobile = e.detail.value;
  },
  getUserInfo: function(e) {
    console.log(e.detail);
    app.globalData.userInfo = e.detail.userInfo;
    if (app.globalData.userInfo){
      this.setData({ info: '已得到您的授权，请输入手机号登录', hasUserInfo: true });
      console.log(this.data);
    }
  },
  login: function() {
    wx.setStorageSync('mobile', this.data.mobile);
    app.getUserInfo(this.updateData);
  }
})
