//app.js
var api = require('/api/api.js')
var AppId = 'wxc028256ea6d51af1'
var AppSecret = '81f336c525fa5cf56384c9442e5735df'

App({
  onLaunch: function () {
  },
  getUserInfo: function (cb) {
    var that = this
    //调用登录接口，获取 code
    wx.login({
      success: function (res) {
        //发起网络请求
        wx.request({
          url: api.mobileIn,
          data: {
            appid: AppId,
            secret: AppSecret,
            code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            method: 'GET_OPENID'
          },
          method: 'GET',
          success: function (res) {
            // 将openId设成全局
            that.globalData.openId = res.data.openid
            console.log('res.data.openid', res.data.openid)
            that.globalData.flag = res.data.flag
            wx.getUserInfo({
              success: function (res) {
                // 将userInfo设成全局
                that.globalData.userInfo = res.userInfo
                // that.goHome()
                typeof cb == "function" && cb(that.globalData.userInfo, that.globalData.openId, that.globalData.user, that.globalData.flag)
              }
            })
          },
          fail: function (res) { },
          complete: function (res) { 
            // that.goHome()
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    user: null,
    flag: null
  }
})