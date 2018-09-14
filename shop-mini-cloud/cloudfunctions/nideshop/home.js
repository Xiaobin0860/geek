const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()
const _ = db.command

index = async() => {
  ngoods = await db.collection('goods').field({
    id: true,
    name: true,
    list_pic_url: true,
    retail_price: true
  }).where({
    is_new: 1
  }).limit(4).get()
  hgoods = await db.collection('goods').field({
    id: true,
    name: true,
    list_pic_url: true,
    retail_price: true,
    goods_brief: true
  }).where({
    is_hot: 1
  }).limit(3).get()
  topics = await db.collection('topics').limit(3).get()
  brands = await db.collection('brands').where({
    is_new: 1
  }).limit(4).get()
  categories = await db.collection('categories').where({
    parent_id: 0
  }).get()
  console.log('categories', categories.data)
  const ncategories = []
  for (const category of categories.data) {
    const childCategories = await db.collection('categories').where({
      parent_id: category.id
    }).field({
      id: true
    }).get()
    childCategoryIds = []
    for (const childCategory of childCategories.data) {
      childCategoryIds.push(childCategory.id)
    }
    console.log('childCategoryIds', childCategoryIds)
    const categoryGoods = await db.collection('goods').field({
      id: true,
      name: true,
      list_pic_url: true,
      retail_price: true
    }).where({
      category_id: _.in(childCategoryIds)
    }).limit(7).get()
    console.log('categoryGoods', categoryGoods.data)
    ncategories.push({
      id: category.id,
      name: category.name,
      goodsList: categoryGoods.data
    })
  }
  ads = await db.collection('ads').get()
  channels = await db.collection('channels').get()
  return {
    errno: 0,
    data: {
      newGoodsList: ngoods.data,
      hotGoodsList: hgoods.data,
      topicList: topics.data,
      brandList: brands.data,
      categoryList: ncategories,
      banner: ads.data,
      channel: channels.data
    }
  }
}


module.exports = {
  index,
}