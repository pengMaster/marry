var api = require('../../api/api.js')
var app = getApp()
var server = 'https://wx.qiaker.cn/api';
var appid = 'wxade372ce7f2da061';
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2600,
    duration: 1200,
    //item_image
  item_one_image:'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    userInfo: {},
    isPlayingMusic: false  
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    var that = this
    wx.request({
      url: server,
      method: 'GET',
      data: { 'c': 'info', 'appid': appid },
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        wx.playBackgroundAudio({
          dataUrl: res.data.music_url,
          title: '',
          coverImgUrl: ''
        })

        that.setData({
          mainInfo: res.data.mainInfo,
          slideList: res.data.slideList,
          music_url: res.data.music_url
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    that.getImageList()
    
  },
  // 每条List点击事件
  jump: function (e) {
    let id = e.currentTarget.dataset.id
    console.debug(id)
    console.log("id:",id)
    wx.navigateTo({
      url: 'imageDetail/imageDetail?id=' + id,
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  // 获取图片
  getImageList: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_IMAGE',
      },
      data: {
        homeType: 'banner'

      },
      success: function (res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          if (res.data.length >= 1) {
            console.log(res.data)
            //更新数据
            that.setData({
              imgUrls: res.data
            })
          } 
        }
      },
    })
  },
  play: function (event) {
    if (this.data.isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
    } else {
      console.log('this.data.music_url', this.data.music_url)
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: true
      })
    }
  }
})
