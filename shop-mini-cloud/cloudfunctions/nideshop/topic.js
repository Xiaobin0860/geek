const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

list = async(p) => {
  page = p.page
  size = p.size
  count = await db.collection('topics').count()
  topics = await db.collection('topics').field({
    id: true,
    title: true,
    price_info: true,
    scene_pic_url: true,
    subtitle: true
  }).skip((page - 1) * size).limit(size).get()
  return {
    errno: 0,
    data: {
      count: count.total,
      data: topics.data
    }
  }
}

module.exports = {
  list
}