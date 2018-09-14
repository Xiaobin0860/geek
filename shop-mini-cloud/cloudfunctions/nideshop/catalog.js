const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

index = async() => {
  const categories = await db.collection('categories').limit(10).where({
    parent_id: 0
  }).get()

  let currentCategory = categories.data[0]

  // 获取子分类数据
  if (currentCategory && currentCategory.id) {
    subcategories = await db.collection('categories').where({
      'parent_id': currentCategory.id
    }).get()
    currentCategory.subCategoryList = subcategories.data
  }

  return {
    errno: 0,
    data: {
      categoryList: categories.data,
      currentCategory: currentCategory
    }
  }
}

module.exports = {
  index
}