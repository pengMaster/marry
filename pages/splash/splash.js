var api = require('../../api/api.js')
//获取应用实例
var app = getApp()

Page({
  data: {
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,
    logo: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg'
  },
  onLoad: function(options) {
    var that = this

    //获取宿主用户Id
    if (null != options)
      app.globalData.hostUserId = options.hostUserId

    that.setData({
      //图片地址
      wave: api.splashWave,
      loading: api.splashLoading
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady: function() {
    var _this = this;
    setTimeout(function() {
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (_this.data.angle !== angle) {
        _this.setData({
          angle: angle
        });
      }
    });
  },
  btnEnter: function() {
    this.getUser()
    this.copyFile()
  },
  //进入主页面
  goHome: function() {
    wx.switchTab({
      url: '../home/home'
    });
  },
  getUserInfo(e) {
    if (e.detail.errMsg === 'getUserInfo:ok') {
      console.log('获取用户信息成功')
      app.globalData.userInfo = e.detail.rawData
      console.log('app.globalData.userInfo', app.globalData.userInfo)
    } else {
      console.log('fail', '获取用户信息失败')
      wx.showModal({
        title: '提示',
        content: '获取用户信息失败',
        showCancel: false,
        confirmColor: '#e2211c',
        success(res) {

        }
      })
    }
  },
  /**
   * 复制图片信息
   */
  copyFile: function() {
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'COPY_FILE',
      },
      data: {
        openId: app.globalData.openId

      },
      success: function(res) {
        console.log(res)

      },
      error: function() {
      
      }
    })
  },
  /**
   * 获取宿主用户信息
   */
  getUser: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_HOST_USER',
      },
      data: {
        openId: app.globalData.openId

      },
      success: function (res) {
        if (200 == res.statusCode) {

          if (res.data.length >= 1) {
            //自己创建小程序了
            if (undefined == app.globalData.hostUserId) {
              app.globalData.hostUserId = app.globalData.openId
            } 
          }else{
            //展示官方实例
            app.globalData.hostUserId = 'osaod0ZlCZxFk3qxoDRrrx9lRvU8'
            app.globalData.isCreate = false
          }
          that.goHome()
        }else{
          //展示官方实例
          app.globalData.isCreate = false
          app.globalData.hostUserId = 'osaod0ZlCZxFk3qxoDRrrx9lRvU8'
          wx.showModal({
            title: '提示',
            content: '获取openId失败，是否进入？',
            showCancel: false,//是否显示取消按钮
            confirmText: "进入",//默认是“确定”
            success: function (res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                that.goHome()
              }
            }
          })
        }
       
      },
      error: function () {
        app.globalData.isCreate = false
        that.goHome()
      }
    })
  }
})