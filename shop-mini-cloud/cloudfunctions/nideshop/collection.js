const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

list = async (p) => {
  const typeId = p.typeId

  return {
    errno: 0,
    data: {
      data: []
    }
  }
}

module.exports = {
  list
}