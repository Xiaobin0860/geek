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
  bcategory = brotherCategory.data

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
      goodsList: goodsData.data,
      filterCategory: filterCategory
    }
  }
}

lnew = () => {
  return {
    errno: 0,
    data: {
      bannerInfo: {
        url: '',
        name: '坚持初心，为你寻觅世间好物',
        img_url: 'http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png'
      }
    }
  }
}

lhot = () => {
  return {
    errno: 0,
    data: {
      bannerInfo: {
        url: '',
        name: '大家都在买的严选好物',
        img_url: 'http://yanxuan.nosdn.127.net/8976116db321744084774643a933c5ce.png'
      }
    }
  }
}

detail = async(p) => {
  const goodsId = p.id
  const info = await db.collection('goods').where({
    id: goodsId
  }).get()
  console.log('goods', goodsId, info)
  const good = info.data[0]
  const gallery = await db.collection('goods_gallery').where({
    goods_id: goodsId
  }).limit(4).get()
  console.log('goods_gallery', gallery)
  const attributeData = await db.collection('goods_attributes').where({
    goods_id: goodsId
  }).get()
  attributeIds = []
  for (attribute of attributeData.data) {
    attributeIds.push(attribute.attribute_id)
  }
  console.log('attributeIds', attributeIds)
  const attributes = await db.collection('attributes').where({
    id: _.in(attributeIds)
  }).get()
  console.log('attributes', attributes)
  const issue = await db.collection('goods_issues').get()
  console.log('issue', issue)
  const brand = await db.collection('brands').where({
    id: good.brand_id
  }).get()
  console.log('brand', brand)
  const commentCount = await db.collection('comments').where({
    value_id: goodsId,
    type_id: 0
  }).count()
  console.log('commentCount', commentCount)
  const hotCommentData = await db.collection('comments').where({
    value_id: goodsId,
    type_id: 0
  }).get()
  console.log('hotCommentData', hotCommentData)
  let commentInfo = {}
  if (hotCommentData.data.length) {
    let = hotComment = hotCommentData.data[0]
    const commentUserData = await db.collection('users').field({
      nickname: true,
      username: true,
      avatar: true
    }).where({
      id: hotComment.user_id
    }).get()
    let nickname = ''
    let avatar = ''
    if (commentUserData.data.length) {
      const commentUser = commentUserData.data[0]
      nickname = commentUser.nickname
      avatar = commentUser.avatar
    }
    const pics = await db.collection('comment_pictures').where({
      comment_id: hotComment.id
    }).get()
    commentInfo = {
      content: Buffer.from(hotComment.content, 'base64').toString(),
      add_time: new Date(hotComment.add_time * 1000),
      nickname: nickname,
      avatar: avatar,
      pic_list: pics.data
    }
  }
  console.log('commentInfo', commentInfo)

  const comment = {
    count: commentCount.total,
    data: commentInfo
  }

  // 当前用户是否收藏
  collections = await db.collection('collections').where({
    value_id: goodsId
  }).get()
  console.log('collections', collections)
  const userHasCollect = collections.data.length

  // // 记录用户的足迹 TODO
  // await await db.collection('footprints').add({
  //   goods_id: goodsId
  // })

  const products = await db.collection('products').where({
    goods_id: goodsId
  }).get()
  console.log('products', products)

  return {
    errno: 0,
    data: {
      info: good,
      gallery: gallery.data,
      attribute: attributes.data,
      userHasCollect: userHasCollect,
      issue: issue.data,
      comment: comment,
      brand: brand.data,
      specificationList: [],
      productList: products.data
    }
  }
}

related = async(p) => {
  const goodsId = p.id
  const related_goods = await db.collection('related_goods').where({
    id: goodsId
  }).field({
    related_goods_id: true
  }).get()
  let relatedGoodsIds = []
  for (related of related_goods.data) {
    relatedGoodsIds.push(related.related_goods_id)
  }
  let relatedGoods = null
  if (relatedGoodsIds.length) {
    relatedGoods = await db.collection('goods').where({
      id: _.in(relatedGoodsIds)
    }).field({
      id: true,
      name: true,
      list_pic_url: true,
      retail_price: true
    }).get()
  } else {
    // 查找同分类下的商品
    const goodsCategory = await db.collection('goods').where({
      id: goodsId
    }).get()
    relatedGoods = await db.collection('goods').where({
      category_id: goodsCategory.data[0].category_id
    }).field({
      id: true,
      name: true,
      list_pic_url: true,
      retail_price: true
    }).limit(8).get()
  }

  return {
    errno: 0,
    data: {
      goodsList: relatedGoods.data
    }
  }
}

module.exports = {
  count,
  category,
  list,
  lnew,
  lhot,
  detail,
  related
}