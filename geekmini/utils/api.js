const SERVER_URL = "http://localhost:4020/wx/api"

const login = (code, cb) => {
  wx.request({
    url: SERVER_URL + '/login',
    method: 'POST',
    data: {
      code: code
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      cb(res.data.data)
    }
  })
}

const update = (id, info, cb) => {
  wx.request({
    url: SERVER_URL + '/update',
    method: 'POST',
    data: {
      id: id,
      user: {
        avatar: info.avatarUrl,
        nick: info.nickName,
        gender: info.gender
      }
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: res => {
      cb(res.data.data)
    }
  })
}

module.exports = {
  login: login,
  update: update
}