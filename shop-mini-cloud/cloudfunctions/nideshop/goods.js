const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

count = async() => {
  data = await db.collection('goods').where({
    is_delete: 0,
    is_on_sale: 1
  }).count()
  return {
    errno: 0,
    data: {
      goodsCount: data.total
    }
  }
}

module.exports = {
  count
}