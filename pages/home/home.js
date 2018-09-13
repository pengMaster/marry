var api = require('../../api/api.js')
var app = getApp()
//数据可用接口返回 - 在此展示只是为了方便查看数据体
Page({
  data: {
    imgUrls: [{
        imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0764.jpg',
        type: '别致角楼'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1165.jpg',
        type: '欧洲风情'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1065.jpg',
        type: '粉红佳人'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1159.jpg',
        type: '大气典雅'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg',
        type: '狗娃特写'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1049.jpg',
        type: '中国风'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1214.jpg',
        type: '酒吧一条街'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0893.jpg',
        type: '绿叶红花'
      },
      {
        imgUrl: 'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0868.jpg',
        type: '绿野仙踪'
      }


    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2600,
    duration: 1200,
    //item_image
    item_one_image: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    userInfo: {},
    isPlayingMusic: true,
    music_url: "http://dl.stream.qqmusic.qq.com/C100000gSW7F2IKT1w.m4a?fromtag=46"
  },
  //生命周期函数--监听页面加载
  onLoad: function() {
    var that = this
    wx.playBackgroundAudio({
      dataUrl: "http://dl.stream.qqmusic.qq.com/C100000gSW7F2IKT1w.m4a?fromtag=46",
      title: '',
      coverImgUrl: ''
    }),
      that.getWxUserInfo()

  },
  getWxUserInfo: function(){
    var that = this
    wx.getUserInfo({
      success: function (res) {
        that.saveUser(app.globalData.openId, res.userInfo)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this
    //that.getImageList()

  },
  // 每条List点击事件
  jump: function(e) {
    let id = e.currentTarget.dataset.id
    console.debug(id)
    console.log("id:", id)
    wx.navigateTo({
      url: 'gridview/gridview?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //保存用户信息
  saveUser: function (openId,userInfo){
    console.log('userInfo',userInfo)
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'SAVE_USER',
      },
      data: {
        openId: openId,
        userInfo: userInfo

      }
    })
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

  },
  // 获取图片
  getImageList: function() {
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
      success: function(res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          if (res.data.length >= 1) {
            console.log(res.data)
            //更新数据
            that.setData({
              // imgUrls: res.data
            })
          }
        }
      },
    })
  },
  play: function(event) {
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