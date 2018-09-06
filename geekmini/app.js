//app.js
const api = require('./utils/api.js')

App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res)
        api.login(res.code, (data) => {
          this.globalData.id = data.id
          if (this.globalData.userInfo) this.updateUser()
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)

              this.globalData.userInfo = res.userInfo
              if (this.globalData.id) this.updateUser()

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  updateUser: function() {
    api.update(this.globalData.id, this.globalData.userInfo, data => {
      console.log(data)
    })
  },
  globalData: {
    userInfo: null,
    id: 0
  }
})