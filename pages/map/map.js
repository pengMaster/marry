var api = require('../../api/api.js')
var app = getApp()
var editId = ''
var editName = ''
var bgImg = 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1176.jpg'

/**
 * 需要上传信息
 * inviteLongitude:经度
 * inviteLatitude:纬度
 */
let inviteName = 'Mr.王&Miss.刘'
let inviteDateOne = '谨定于 2018年8月18日'
let inviteDateTwo = '农历 2018年七月初八 举办婚礼'
let inviteAddress = '地址：沧州市盐山县庆云镇前簸箕村(点击导航)'
let inviteLongitude = 117.398193
let inviteLatitude = 37.895525

Page({
  data: {
    inviteName: inviteName,
    inviteDateOne: inviteDateOne,
    inviteDateTwo: inviteDateTwo,
    inviteAddress: inviteAddress,
    inviteLongitude: inviteLongitude,
    inviteLatitude: inviteLatitude,
    isOfficial: app.globalData.isOfficial,
    editImg: api.image + "ic_edit.png",
    saveImg: api.image + "ic_save.png",
    editWhiteImg: api.image + "ic_edit_white.png",
    bgImg: bgImg
  },
  onLoad: function() {
    var that = this
    that.downLoadMapInfo()
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
 * 现在首页数据
 */
  downLoadMapInfo: function () {
    var that = this
    wx.request({
      url: api.mobileIn,
      method: 'GET',
      header: {
        method: 'GET_MAP_INFO',
      },
      data: {
        // userId:'osaod0ZlCZxFk3qxoDRrrx9lRvU8'
        userId: app.globalData.hostUserId

      },
      success: function (res) {
        if (200 == res.statusCode) {
          if (res.data.length >= 1) {
            console.log(res.data)
            //更新数据
            that.setData({
              inviteName: res.data[0][5],
              inviteDateOne: res.data[0][6],
              inviteDateTwo: res.data[0][7],
              inviteAddress: res.data[0][8],
              inviteLongitude: res.data[0][9],
              inviteLatitude: res.data[0][10],
              bgImg: res.data[0][11]
            })
          }
        }

      },
      error: function () {

      }
    })
  },

  /**
   * 地图导航
   */
  markertap(e) {
    wx.openLocation({
      latitude: inviteLatitude,
      longitude: inviteLongitude,
      scale: 18,
      name: '',
      address: ''
    })
  },

  /**
   * 地址修改
   */
  btnName: function() {
    this.setData({
      showModal: true,
      editId: 'btnName',
      editName: 'Mr.王 & Miss.刘',
      isAddress: false
    })
  },
  /**
   * 阳历日期
   */
  btnDateOne: function() {
    this.setData({
      showModal: true,
      editId: 'btnDateOne',
      editName: '谨定于 2018年8月18日',
      isAddress: false
    })
  },
  /**
   * 阴历日期
   */
  btnDateTwo: function() {
    this.setData({
      showModal: true,
      editId: 'btnDateTwo',
      editName: '农历 2018年七月初八 举办婚礼',
      isAddress: false
    })
  },
  /**
   * 地址修改
   */
  btnAddress: function() {
    this.setData({
      showModal: true,
      editId: 'btnAddress',
      editName: '地址：沧州市盐山县庆云镇前簸箕村(点击导航)',
      isAddress: true
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
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.hideModal();
  },
  /**
   * input输入框内容
   */
  inputChange: function(e) {
    if ('btnName' == e.target.id) {
      inviteName = e.detail.value
    } else if ('btnDateOne' == e.target.id) {
      inviteDateOne = e.detail.value
    } else if ('btnDateTwo' == e.target.id) {
      inviteDateTwo = e.detail.value
    } else if ('btnAddress' == e.target.id) {
      inviteAddress = e.detail.value
    }

  },
  /**
   * input输入框经度内容
   */
  inputChangeJd: function(e) {
    inviteLongitude = e.detail.value
    console.log('inviteLongitude:', inviteLongitude)
  },
  /**
   * input输入框纬度内容
   */
  inputChangeWd: function(e) {
    console.log(e.detail.value)
  },
  /**
   * 保存信息
   */
  btnSave: function(e) {
    wx.showLoading({
      title: '正在上传...',
    })
    wx.uploadFile({
      url: api.mobileIn, //此处换上你的接口地址
      filePath: bgImg,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        'accept': 'application/json',
        'Authorization': 'Bearer ..', //若有token，此处换上你的token，没有的话省略
        'method': 'SAVE_MAP_INFO'
      },
      formData: {
        'inviteName': inviteName,
        'inviteDateOne': inviteDateOne,
        'inviteDateTwo': inviteDateTwo,
        'inviteAddress': inviteAddress,
        'inviteLongitude': inviteLongitude,
        'inviteLatitude': inviteLatitude,
        'userId': app.globalData.hostUserId,
        'host': api.host,
        'isOfficial':app.globalData.isOfficial
      },
      success: function(res) {
        wx.hideLoading()
        var data = res.data;
        console.log('data');
      },
      fail: function(res) {
        console.log('fail');
        wx.hideLoading()

      },
    })
  },
  /**
   * 修改背景图片
   */
  editBg: function(e) {
    var that = this;
    wx.chooseImage({
      // 设置最多可以选择的图片张数，默认9,如果我们设置了多张,那么接收时//就不在是单个变量了,
      count: 1,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // 获取成功,将获取到的地址赋值给临时变量
        var tempFilePaths = res.tempFilePaths
        bgImg = tempFilePaths[0]
        that.setData({
          //将临时变量赋值给已经在data中定义好的变量
          bgImg: bgImg
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
})