const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatpickTime = date => {
  const hour = date.getHours() + 1
  const minute = 0

  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request = args => {
  var header = {
    'content-type': 'application/json; charset=utf-8',
    'cookie': 'access-token='+wx.getStorageSync("access-token")
  }
  if (args.method == 'POST'){
    args.data = JSON.stringify(args.data)
  }
  wx.request({
    url: args.url,
    data: args.data,
    header: header,
    method: args.method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      console.log(res)
      if (res.data.success){
        if (args.success) args.success(res.data)
      }else{
        console.error(res.data.msg)
      }
    },
    fail: function (res) {
      console.error('wx.request fail')
    },
    complete: function(res) {
      if (args.complete) args.complete(res)
    },
  })
}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  formatpickTime: formatpickTime,
  request: request
}
