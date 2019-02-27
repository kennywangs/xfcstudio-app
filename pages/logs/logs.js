//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    var logs = wx.getStorageSync('logs') || [];
    logs.push(new Date());
    this.setData({
      logs: logs.map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
