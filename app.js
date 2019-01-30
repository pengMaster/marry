//app.js
var api = require('/api/api.js')
var AppId = 'wxc028256ea6d51af1'
var AppSecret = '81f336c525fa5cf56384c9442e5735df'

App({
  onLaunch: function () {
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
          },
          fail: function (res) { },
          complete: function (res) {
          }
        });
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null,
    user: null,
    flag: null,
    hostUserId:null,
    isOfficial: true,
    isCreate: true
  }
})