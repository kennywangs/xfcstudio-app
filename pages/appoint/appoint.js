const util = require('../../utils/util.js')
const dateTools = require('../../utils/date.js')
const app = getApp()

Page({
  data: {
    now: util.formatDate(new Date()),
    nowTime: util.formatpickTime(new Date()),
    durationArray: [1,2,3,4,5,6,7,8],
    attendants: null,
    load_more_hide:true,
    list_hide: true,
    create_hide: true,
    choose_date: null,
    attendant: {},
    appointDate: null,
    appointTime: null,
    appointDuration: 1,
    comment: '',
    appoints: [],
    no: 0,
    limit: 10,
  },

  bindDateChange: function (e) {
    var self = this
    var more = e.detail.more
    if (more) {
      this.data.no++;
    } else {
      this.data.no = 0;
    }
    var data = { page: this.data.no, size: this.data.limit, date: e.detail.value }
    util.request({
      url: app.globalData.serverContext + '/customer/appoint/mylist',
      method: 'GET',
      data: data,
      success: res => {
        console.log(res.data)
        if (!more) {
          self.data.appoints = []
        }
        res.data.forEach(a => {
          a.statusText = app.getStatusText(a.status)
          self.data.appoints.push(a)
        })
        this.setData({
          list_hide: false,
          create_hide: true,
          choose_date: e.detail.value,
          appoints: self.data.appoints
        })
        if ((self.data.no + 1) < res.totalPage) {
          self.setData({ load_more_hide: false })
        } else {
          self.setData({ load_more_hide: true })
        }
      }
    })
  },
  loadMore: function (e) {
    this.bindDateChange({ detail: { value: this.data.choose_date, more: true }});
  },
  createAppoint: function (e) {
    if (this.data.attendants){
      this.setData({
        list_hide: true,
        create_hide: false
      })
      return
    }
    util.request({
      url: app.globalData.serverContext +'/customer/appoint/list-attendant',
      method: 'POST',
      success: res => {
        console.log(res.data)
        this.setData({
          attendants: res.data,
          list_hide: true,
          create_hide: false
        })
      }
    })
  },
  bindAttendantChange: function (e) {
    this.setData({
      attendant: this.data.attendants[e.detail.value]
    })
  },
  bindAppointDateChange: function (e) {
    this.setData({
      appointDate: e.detail.value
    })
  },
  bindAppointTimeChange: function (e) {
    this.setData({
      appointTime: e.detail.value
    })
  },
  bindDurationChange: function (e) {
    this.setData({
      appointDuration: this.data.durationArray[e.detail.value]
    })
  },
  setComment: function (e) {
    this.data.comment = e.detail.value;
  },
  submit: function (e) {
    if (!this.data.attendant.id) {
      wx.showToast({
        title: '请选择一个技师',
        icon: 'loading',
      });
      return;
    }
    var startDate = dateTools.fromString(this.data.appointDate + ' ' + this.data.appointTime, 'yyyy-MM-dd hh:mm');
    var endDate = dateTools.increase(startDate, this.data.appointDuration, 'h');
    var startDateStr = dateTools.toString(startDate, dateTools.DEFAULT_FORMAT1);
    var endDateStr = dateTools.toString(endDate, dateTools.DEFAULT_FORMAT1);
    var appoint = { attendant: this.data.attendant, comment: this.data.comment, startDate: startDateStr, endDate: endDateStr };
    console.log(appoint);
    util.request({
      url: app.globalData.serverContext + '/customer/appoint/start',
      method: 'POST',
      data: appoint,
      success: res => {
        console.log(res.data)
        this.setData({
          attendant: {},
          appointDate: null,
          appointTime: null,
          appointDuration: 1,
          comment: '',
          list_hide: true,
          create_hide: true
        })
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 3000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})