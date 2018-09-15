const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

login_by_weixin = async(openid, data) => {
  const user = data.userInfo.userInfo
  console.log('\nlogin_by_weixin: user=', user)

  try {
    let result = await db.collection('users').where({
      openid: openid
    }).get()
    if (result.data.length === 0) {
      result = await db.collection('users').add({
        data: {
          openid: openid,
          token: openid,
          nick: user.nickName,
          avatar: user.avatarUrl
        }
      })
      console.log('\nusers db result=', result)
    }
    return {
      errno: 0,
      data: {
        token: openid,
        userInfo: {
          openid: openid,
          nickname: user.nickName,
          avatar: user.avatarUrl
        }
      }
    }
  } catch (e) {
    console.error(e)
    return {
      errno: 10001,
      error: e
    }
  }

}


module.exports = {
  login_by_weixin,
}