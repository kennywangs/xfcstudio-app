const app = getApp()
Page({
  data: {
    latitude: 25.028212,
    longitude: 102.699713,
    markers: [{
      iconPath: '/images/location.png',
      id: 1,
      longitude: 102.699713,
      latitude: 25.028212,
      width: 50,
      height: 50,
      title: '安康路86号工人新村干休所小别墅5-1 香蜂草工作室'
    }],
    polyline: [{
      points: [{
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude
      }, {
        longitude: 102.699713,
        latitude: 25.028212
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }]
  },
  moveToLocation() {
    this.mapCtx.moveToLocation()
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
})