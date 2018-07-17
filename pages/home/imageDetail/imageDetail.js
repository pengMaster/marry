// pages/home/imageDetail/imageDetail.js
var api = require('../../../api/api.js')
var app = getApp()
var id = ''
var imgUrlPs = [
  'https://pengmaster.com/party/wechat/marry/1531296916221/1531296915822.jpg',
  'https://pengmaster.com/party/wechat/marry/1531296916221/1531296915822.jpg',
  'https://pengmaster.com/party/wechat/marry/1531296916221/1531296916221.jpg'
]


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    id = options.id
    that.getImageList()
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
  
  },
   /**
   * 点击图片
   */
  // onclickImage:function(){
  //   wx.navigateTo({
  //     url: '../pagerImage/pagerImage'
  //   });
  // },
  /** 
	 * 预览图片
	 */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgUrlPs // 需要预览的图片http链接列表
    })
  },
  // 获取图片
  getImageList: function () {
    var that = this
    console.log("optionsid:", id)
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      
      header: {
        method: 'GET_IMAGE',
      },
      data: {
        homeType: 'detail',
        moduleId: id

      },
      success: function (res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          if (res.data.length >= 1) {
            //更新数据
            that.setData({
              imgUrls: res.data
            })
          } 
        }
      },
    })
  }

})