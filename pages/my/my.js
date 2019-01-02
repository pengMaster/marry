// my.js
var api = require('../../api/api.js')
//获取应用实例
var app = getApp()
var inputinfo = "";
var user_identity = '原创'
var inputWechat = ''
var inputPhone = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    showModalStatus: false,
    user_identity: user_identity,
    title_hint: '请填写',
    logo: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg'
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    that.downLoadLogo()
    //更新数据
    that.setData({
      userInfo: app.globalData.userInfo,
      myBanner: api.myBanner,
      myXiaoxi: api.myXiaoxi,
      myXinde: api.myXinde,
      myZan: api.myZan,
      myArrowChart: api.myArrowChart,
      //图片地址
      wave: api.splashWave,
      loading: api.splashLoading
    })
  },
  /**
   * 下载用户图片
   */
  downLoadLogo: function() {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_IMAGE_LOGO',
      },
      data: {
        userId: app.globalData.hostUserId

      },
      success: function(res) {
        if (200 == res.statusCode) {
          if (res.data.length >= 1) {
            console.log(res.data)
            //更新数据
            that.setData({
              logo: res.data[0].imgUrl
            })
          }
        }

      },
      error: function() {

      }
    })
  },
  btnMyCreateInfo: function() {
    wx.navigateTo({
      url: 'flow/flow'
    })
  },
  btnMyCreate: function() {
    var that = this
    if (undefined != app.globalData.openId && "" != app.globalData.openId) {
      this.setData({
        showModal: true
      })
    } else {
      wx.showModal({
        title: '提示',
        content: "未获取到openId，不允许创建！！",
        showCancel: false
      })
    }
  },
  //关于我
  btnAboutMy: function() {
    wx.navigateTo({
      url: 'aboutus/aboutus'
    })
  },
  //项目简介
  btnCommonQuestion: function() {
    wx.navigateTo({
      url: 'aboutProject/aboutProject'
    })
  },
  /**
   * 上传头像
   */
  uploadLogo: function() {
    if (!app.globalData.isOfficial) {
      this.chooseImage()
    }

  },
  /**
   * 选择图片
   */
  chooseImage: function() {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;

        /**
         * 上传图片
         */
        wx.uploadFile({
          url: api.mobileIn, //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
            'method': 'SAVE_IMAGE_LOGO'
          },
          formData: {
            'id': (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5),
            'userId': app.globalData.hostUserId,
            'host': api.host
          },
          success: function(res) {
            wx.hideLoading()
            that.setData({
              //将临时变量赋值给已经在data中定义好的变量
              logo: tempFilePaths[0]
            })
          },
          fail: function(res) {
            console.log('fail');
            wx.hideLoading()

          },
        })

      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    var that = this
    if ('' == inputPhone) {
      that.setData({
        title_hint: '请填写手机号'
      })
    } else if ('' == inputWechat) {
      that.setData({
        title_hint: '请填写微信号'
      })
    } else {
      that.saveHostUser()
      that.hideModal();
    }
  },

  /**
   * inputChangePhone
   */
  inputChangePhone: function(e) {
    inputPhone = e.detail.value
  },
  /**
   * inputChangePhone
   */
  inputChangeWechat: function(e) {
    inputWechat = e.detail.value
  },

  /**
   * 保存用户
   */
  saveHostUser: function() {
    var that = this
    user_identity = '自创'
    wx.showLoading({
      title: '正在上传...',
    })
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'SAVE_HOST_USER',
      },
      data: {
        openId: app.globalData.openId,
        userInfo: app.globalData.userInfo,
        isOriginal: user_identity,
        userPhone: inputPhone,
        userWechat: inputWechat

      },
      success: function(res) {
        wx.hideLoading()
        if (200 == res.statusCode) {
          app.globalData.isOfficial = false
          app.globalData.hostUserId = app.globalData.openId
          if (res.data.length >= 1) {
            //更新数据
            that.setData({
              user_identity: user_identity
            })
          }
        }
      },
      error: function() {
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this;
    //console.log(that.data);
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao/HY2A0764.jpg',
      path: "pages/home/home",
      success: function(res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  btnShareFriends: function() {
    wx.showModal({
      title: '提示',
      content: "客官加群或者微信吧！！",
      showCancel: false
    })
  }
})