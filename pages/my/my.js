// my.js
var api = require('../../api/api.js')
//获取应用实例
var app = getApp()
var inputinfo = "";
var isMaster = true;
var user_identity = '原创'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: "",
    showModalStatus: false,
    user_identity:'原创'
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
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

  btnSwitchUser: function (e) {
    var that = this
    console.log('app.globalData.userInfo', app.globalData.userInfo)
    if(isMaster){
      that.setData({
        user_identity: '原创'
      })
      isMaster = false;
    }else{
      that.setData({
        user_identity: '自创'
      })
      isMaster = true;
    }
  },
  btnMyCreate: function () {
    wx.showModal({
      title: '提示',
      content: "请去后台进行配置",
      showCancel: false
    })
  },
  //关于我
  btnAboutMy: function () {
    wx.navigateTo({
      url: 'aboutus/aboutus'
    })
  },
  //项目简介
  btnCommonQuestion: function () {
    wx.navigateTo({
      url: 'aboutProject/aboutProject'
    })
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
    var that = this;
    //console.log(that.data);
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao/HY2A0764.jpg',
      path: "pages/home/home",
      success: function (res) {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享取消',
        })
      }
    }
  },
  btnShareFriends: function () {
    wx.showModal({
      title: '提示',
      content: "邮箱或者QQ反馈行吧？",
      showCancel: false
    })
  }
})