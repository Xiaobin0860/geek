const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()
const _ = db.command

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

category = async(p) => {
  const currentCategory = await db.collection('categories').where({
    id: p.id
  }).get()
  ccategory = currentCategory.data[0]
  const parentCategory = await db.collection('categories').where({
    id: ccategory.parent_id
  }).get()
  pcategory = parentCategory.data[0]
  const brotherCategory = await db.collection('categories').where({
    parent_id: ccategory.parent_id
  }).get()
  bcategory = brotherCategory.data[0]

  return {
    errno: 0,
    data: {
      currentCategory: ccategory,
      parentCategory: pcategory,
      brotherCategory: bcategory
    }
  }
}

list = async(p) => {
  const currentCategory = await db.collection('categories').where({
    id: p.id
  }).get()
  ccategory = currentCategory.data[0]
  const parentCategory = await db.collection('categories').where({
    id: ccategory.parent_id
  }).get()
  pcategory = parentCategory.data[0]
  const brotherCategory = await db.collection('categories').where({
    parent_id: ccategory.parent_id
  }).get()
  bcategory = brotherCategory.data[0]


  const categoryId = p.categoryId
  const brandId = p.brandId
  const keyword = p.keyword
  const isNew = p.isNew
  const isHot = p.isHot
  const page = p.page
  let size = p.size
  if (size > 20) {
    size = 20
  }
  // const sort = p.sort
  // const order = p.order

  const whereMap = {}
  if (isNew != undefined) {
    whereMap.is_new = isNew
  }

  if (isHot != undefined) {
    whereMap.is_hot = isHot
  }

  // if (keyword != undefined) {
  //   whereMap.name = ['like', `%${keyword}%`]
  //   // 添加到搜索历史
  //   await this.model('search_history').add({
  //     keyword: keyword,
  //     user_id: this.getLoginUserId(),
  //     add_time: parseInt(new Date().getTime() / 1000)
  //   })
  // }

  if (brandId != undefined) {
    whereMap.brand_id = brandId
  }

  // // 排序
  // let orderMap = {}
  // if (sort === 'price') {
  //   // 按价格
  //   orderMap = {
  //     retail_price: order
  //   }
  // } else {
  //   // 按商品添加时间
  //   orderMap = {
  //     id: 'desc'
  //   }
  // }

  // 筛选的分类
  let filterCategory = [{
    'id': 0,
    'name': '全部',
    'checked': false
  }]

  const categoryIds = await db.collection('goods').where(whereMap).field({
    category_id: true
  }).get()
  if (categoryIds.data.length) {
    cids = []
    for (cid of categoryIds.data) {
      cids.push(cid.category_id)
    }
    // 查找二级分类的parent_id
    const parentIds = await db.collection('categories').where({
      id: _.in(cids)
    }).field({
      parent_id: true
    }).get()
    pids = []
    for (pid of parentIds.data) {
      pids.push(pid.parent_id)
    }
    // 一级分类
    const parentCategory = await db.collection('categories').field({
      id: true,
      name: true
    }).orderBy('sort_order', 'asc').where({
      id: _.in(pids)
    }).get()

    if (parentCategory.data.length) {
      filterCategory = filterCategory.concat(parentCategory.data)
    }
  }

  // // 加入分类条件
  // if (categoryId != undefined && parseInt(categoryId) > 0) {
  //   whereMap.category_id = ['in', await this.model('category').getCategoryWhereIn(categoryId)]
  // }

  // 搜索到的商品
  const goodsData = await db.collection('goods').where(whereMap).field({
    id: true,
    name: true,
    list_pic_url: true,
    retail_price: true
  }).skip((page - 1) * size).limit(size).get()
  // goodsData.filterCategory = filterCategory.map(function (v) {
  //   v.checked = (think.isEmpty(categoryId) && v.id === 0) || v.id === parseInt(categoryId)
  //   return v
  // })

  return {
    errno: 0,
    data: {
      goodsList: goodsData.data
    }
  }
}

module.exports = {
  count,
  category,
  list
}