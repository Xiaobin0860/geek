const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

list = async(p) => {
  page = p.page
  size = p.size
  if(size>20) {
    size = 20
  }
  count = await db.collection('brands').count()
  const brands = await db.collection('brands').field({
    id: true,
    name: true,
    floor_price: true,
    app_list_pic_url: true
  }).skip((page - 1) * size).limit(size).get()

  return {
    errno: 0,
    data: {
      totalPages: Math.ceil(count.total/size),
      data: brands.data
    }
  }
}

detail = async (p) => {
  const brands = await db.collection('brands').where({id: p.id}).get()

  return {
    errno: 0,
    data: {
      brand: brands.data[0]
    }
  }
}

module.exports = {
  list,
  detail
}