// pages/home/gridview/gridview.js 
var api = require('../../../api/api.js')
const app = getApp()
var id = ''
var imgUrlsDefault = []
var imgUrlsDefaultPre = []
var defaultDesc = '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icAdd: api.image + "ic_add_round.png",
    defaultDesc: defaultDesc,
    isOfficial: app.globalData.isOfficial
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    console.log('onShow', app.globalData.isOfficial)
    this.setData({
      isOfficial: app.globalData.isOfficial
    })
  },
  /** 
   * 预览图片
   */
  previewImage: function(e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: imgUrlsDefaultPre // 需要预览的图片http链接列表
    })

  },
  /**
   * add点击事件
   */
  addImg: function(e) {
    var that = this;
    that.setData({
      showModal: true
    })
  },
  /**
   * 选择图片
   */
  chooseImg: function() {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths;
        imgUrlsDefault[imgUrlsDefault.length] = {
          imgUrl: `${tempFilePaths[0]}`,
          desc: defaultDesc,
        }
        imgUrlsDefaultPre[imgUrlsDefaultPre.length] = tempFilePaths[0]
        wx.showLoading({
          title: '正在上传...',
        })
        wx.uploadFile({
          url: api.mobileIn, //此处换上你的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json',
            'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
            'method': 'SAVE_DETAIL_IMAGES'
          },
          formData: {
            'desc': defaultDesc,
            'userId': app.globalData.openId,
            'id': (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5),
            'bannerId': id,
            'host': api.host,
          },
          success: function(res) {
            wx.hideLoading()
            that.setData({
              //将临时变量赋值给已经在data中定义好的变量
              imgUrls: imgUrlsDefault
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
  * 现在首页数据
  */
  downLoadDetaiilImgs: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_DETAIL_IMAGES',
      },
      data: {
        bannerId: id
      },
      success: function (res) {
        if (200 == res.statusCode) {
          if (null != res.data && res.data.length >= 1) {
            for(var i=0;i<res.data.length;i++){
              imgUrlsDefaultPre[i] = res.data[i].imgUrl
            }
            //更新数据
            that.setData({
              imgUrls: res.data
            })
          }
        }

      },
      error: function () {

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
    defaultDesc = '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
    this.chooseImg();

  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    this.hideModal();
    this.chooseImg();
  },
  /**
   * input输入框内容
   */
  inputChange: function(e) {
    defaultDesc = e.detail.value

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    id = options.id
    this.setData({
      isOfficial: app.globalData.isOfficial
    })
    that.downLoadDetaiilImgs()
    console.log('options.id:' + options.id)
    imgUrlsDefault = []
    imgUrlsDefaultPre = []
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

  }
})