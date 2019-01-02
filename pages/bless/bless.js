// pages/bless/index.js
var api = require('../../api/api.js')
var app = getApp()
var bgShare = ''

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    inputValue: '',
    zanNum: 0,
    editImg: api.image + "ic_edit.png",
    isOfficial: app.globalData.isOfficial
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    console.log('onLoad', app.globalData.isOfficial)
    wx.getUserInfo({
        success: function(res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      }),
      that.getPraiseList(),

      that.getCommentList(),

      that.getSharePic()

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow',app.globalData.isOfficial)
    this.setData({
      isOfficial: app.globalData.isOfficial
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
   * 获取分享图片
   */
  getSharePic: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_SHARE_INFO',
      },
      data: {
        userId: app.globalData.hostUserId
      },
      success: function (res) {
        wx.hideToast()
        if (200 == res.statusCode) {
          console.log(res.data)
          //更新数据
          bgShare = res.data[0][2]
        }
      },
    })
  },
  /**
   * 修改分享图片
   */
  editBg: function(e) {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
          url: api.mobileIn, //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
            'method': 'SAVE_SHARE_INFO'
          },
          formData: {
            'userId': app.globalData.hostUserId,
            'host': api.host,
          },
          success: function (res) {
            wx.showModal({
              title: '提示',
              content: res.data,
              showCancel: false
            })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: res.data,
              showCancel: false
            })
          },
        })

      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.getPraiseList(),
      that.getCommentList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  // 获取评论列表
  getCommentList: function() {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      data: {
        userId: app.globalData.hostUserId
      },
      header: {
        method: 'GET_COMMENT'
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          chatList: res.data
        });
      }
    })
  },
  // 获取赞列表
  getPraiseList: function() {
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
      success: function(res) {
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
  loadMoreFriends: function(e) {
    wx.navigateTo({
      url: 'blessDetail/blessDetail'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

    var that = this;
    return {
      title: '诚意邀请你参加我们的婚礼',
      imageUrl: bgShare,
      path: "pages/splash/splash?hostUserId=" + app.globalData.hostUserId,
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
  zan: function(event) {
    var that = this;

    var userInfo = app.globalData.userInfo;
    console.log(userInfo)
    var name = userInfo.nickName;
    var face = userInfo.avatarUrl;

    wx.request({
      url: api.mobileIn,
      data: {
        'nickName': name,
        'nickImage': face,
        'openId': app.globalData.openId,
        'hostUserId': app.globalData.hostUserId
      },
      header: {
        method: 'SAVE_PRAISE'
      },
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
  },
  foo: function() {
    var that = this;
    if (that.data.inputValue) {
      //留言内容不是空值

      var userInfo = app.globalData.userInfo;
      var name = userInfo.nickName;
      var face = userInfo.avatarUrl;
      var words = that.data.inputValue;
      wx.request({
        url: api.mobileIn,
        data: {
          'nickName': name,
          'nickImage': face,
          'comment': words,
          'openId': app.globalData.openId,
          'hostUserId': app.globalData.hostUserId
        },
        header: {
          method: 'SAVE_COMMENT'
        },
        method: "GET",
        dataType: "json",
        success: res => {
          if (200 == res.statusCode) {
            console.log(res.data)
            that.getCommentList()
            wx.showModal({
              title: '提示',
              content: res.data,
              showCancel: false
            })
          }
        }
      })
    } else {
      //Catch Error
      wx.showModal({
        title: '提示',
        content: '您还没有填写内容',
        showCancel: false
      })
    }
    that.setData({
      inputValue: '' //将data的inputValue清空
    });
    return;
  }
})