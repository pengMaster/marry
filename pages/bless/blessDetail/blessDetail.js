// pages/bless/index.js
var api = require('../../../api/api.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          userInfo: res.userInfo
        })
      }
    }),
      that.getPraiseList()
    
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
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.getPraiseList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // 获取赞列表
  getPraiseList: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_PRAISE',
      },
      data: {
        userId: app.globalData.hostUserId
      },
      success: function (res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          console.log(res.data)
          //更新数据
          that.setData({
            zanLog: res.data
          })
        }
      },
    })
  },
  loadMoreFriends: function (e) {
    wx.navigateTo({
      url: 'blessDetail/blessDetail'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    //console.log(that.data);
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1167.jpg',
      path: "pages/splash/splash?hostUserId=" + app.globalData.hostUserId,
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
  zan: function (event) {
    var that = this;

    var userInfo = that.data.userInfo;
    console.log(userInfo)
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;
    var openId = userInfo.openId;
    wx.request({
      url: api.mobileIn,
      data: { 'nickName': name, 'nickImage': face, 'openId': openId },
      header: { method: 'SAVE_PRAISE' },
      method: "GET",
      dataType: "json",
      success: res => {
        if (200 == res.statusCode) {
          console.log(res.data)
          that.getPraiseList()
          wx.showModal({
            title: '提示',
            content: res.data,
            showCancel: false
          })
        }
      }
    })
  }
})