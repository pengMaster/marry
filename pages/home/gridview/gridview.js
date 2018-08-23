// pages/home/gridview/gridview.js 
var id = ''
//为方便查看数据格式，写死在这里，后续可接口返回
var imgUrlPs = [
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0764.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0794.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0769.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0748.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0836.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0716.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0798.jpg',
  'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0791.jpg'
]
var imgUrlOzfq = [
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1165.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1139.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1167.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1138.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1168.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1136.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1171.jpg',
  'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1176.jpg'
]
var imgUrlHuahai = [
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0893.jpg',
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0899.jpg',
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0885.jpg',
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0895.jpg',
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0888.jpg',
  'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0889.jpg'
]
var imgUrlFhjr = [
  'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1065.jpg',
  'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1068.jpg',
  'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1069.jpg',
  'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1072.jpg',
  'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1079.jpg'
]
var imgUrlDqdy = [
  'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1159.jpg',
  'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1160.jpg',
  'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A0921.jpg',
  'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1146.jpg',
  'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1157.jpg'
]
var imgUrlGwtx = [
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1103.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1123.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1093.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1114.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1128.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1106.jpg',
  'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1117.jpg'
]
var imgUrlZgf = [
  'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1049.jpg',
  'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1038.jpg',
  'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1062.jpg'
]
var imgUrlJb = [
  'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1214.jpg',
  'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1249.jpg',
  'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1258.jpg',
  'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1263.jpg',
  'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1266.jpg'
]
var imgUrlLyxz = [
  'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0868.jpg',
  'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0866.jpg',
  'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0873.jpg'
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /** 
   * 预览图片
   */
  previewImage: function(e) {
    var current = e.target.dataset.src;
    if (id == '别致角楼') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlPs // 需要预览的图片http链接列表
      })
    } else if (id == '欧洲风情'){
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlOzfq // 需要预览的图片http链接列表
      })
    } else if (id == '绿叶红花') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlHuahai // 需要预览的图片http链接列表
      })
    } else if (id == '粉红佳人') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlFhjr // 需要预览的图片http链接列表
      })
    } else if (id == '大气典雅') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlDqdy // 需要预览的图片http链接列表
      })
    } else if (id == '狗娃特写') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlGwtx // 需要预览的图片http链接列表
      })
    } else if (id == '中国风') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlZgf // 需要预览的图片http链接列表
      })
    } else if (id == '酒吧一条街') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlJb // 需要预览的图片http链接列表
      })
    } else if (id == '绿野仙踪') {
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgUrlLyxz // 需要预览的图片http链接列表
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    id = options.id
    console.log('options.id:' + options.id)
    if (id == '别致角楼') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0764.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0794.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0769.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0748.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0836.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0716.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0798.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/tai_miao_zip/HY2A0791.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }

        ]
      });
    } else if (id == '欧洲风情') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1165.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1139.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1167.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1138.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1168.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1136.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1171.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/ozfq_zip/HY2A1176.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '绿叶红花') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0893.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0899.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0885.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0895.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0888.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/huahai_zip/HY2A0889.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '粉红佳人') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1065.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1068.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1069.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1072.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/fhjr_zip/HY2A1079.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '大气典雅') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1159.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1160.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A0921.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1146.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/dqdy_zip/HY2A1157.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '狗娃特写') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1088.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1103.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1123.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1093.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1114.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1128.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1106.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/gwtx_zip/HY2A1117.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '中国风') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1049.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1038.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/zgf_zip/HY2A1062.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '酒吧一条街') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1214.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1249.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1258.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1263.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/jbytj_zip/HY2A1266.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    } else if (id == '绿野仙踪') {
      that.setData({
        imgUrls: [{
          imgUrl: 'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0868.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0866.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          },
          {
            imgUrl: 'https://pengmaster.com/party/wechat/marry/lyxz_zip/HY2A0873.jpg',
            desc: '不管你走在哪里我都会站在你看得见的地方如果有委屈有过错只要你回头我始终站在你的身后'
          }
        ]
      });
    }
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