//app.js
App({
  onLaunch: function () {
    var self = this;
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  globalData: {
    serverContext:'https://i.smellbang.com',
    userInfo: null,
    authUserInfo: false,
    hasLogin: false,
  },
  login: function (res,token,callback) {
    var self = this;
    callback('redirect home');
    return;
    var mobile = wx.getStorageSync('mobile');
    if (!mobile){
      wx.showToast({
        title: '没有手机号',
        icon: 'loading',
      });
      throw new Error('没有手机号');
    }
    if (!(/^1[34578]\d{9}$/.test(mobile))) {
      wx.showToast({
        title: '手机号码有误',
        icon: 'loading',
      });
      throw new Error('手机号码有误');
    }
    wx.request({
      url: self.globalData.serverContext+'/weixin/login',
      data: { code: res.code, token: token, mobile: mobile},
      dataType: 'json',
      success: function (res) {
        console.log(res.data.data);
        if (res.data.success){
          wx.setStorageSync('token', res.data.data.token);
          if (callback){
            callback(res.data.data);
          }
          self.globalData.hasLogin = true;
        }else{
          wx.showToast({
            title: res.data.msg,
            icon: 'loading',
          });
        }
      }
    });
  },
  getUserInfo: function(callback){
    var self = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          self.globalData.authUserInfo = true;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              self.globalData.userInfo = res.userInfo;
              callback();

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  console.log('res code:' + res.code);
                  var token = wx.getStorageSync('token');
                  self.login(res, token, function (data) {
                    console.log(data.token);
                    wx.redirectTo({
                      url: '/pages/home/home'
                    })
                  });
                }
              });
            }
          });
        }
      }
    });
  }
})