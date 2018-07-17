var api = require('../../api/api.js')
var app = getApp()

Page({
  data: {
    markers: [{
      iconPath: "/image/nav.png",
      id: 0,
      latitude: 37.895525,
      longitude: 117.398193,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    wx.openLocation({
      latitude: 37.895525,
      longitude: 117.398193,
      scale: 18,
      name: '',
      address: ''
    })
  },
  controltap(e) {
    console.log(e.controlId)
  }
})