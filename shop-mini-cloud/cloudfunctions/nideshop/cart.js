const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()
const _ = db.command

get_carts = async() => {
  const cartList = await db.collection('carts').get()
  // 获取购物车统计信息
  let goodsCount = 0
  let goodsAmount = 0.00
  let checkedGoodsCount = 0
  let checkedGoodsAmount = 0.00
  for (const cartItem of cartList.data) {
    goodsCount += cartItem.number
    goodsAmount += cartItem.number * cartItem.retail_price
    if (cartItem.checked) {
      checkedGoodsCount += cartItem.number
      checkedGoodsAmount += cartItem.number * cartItem.retail_price
    }

    // 查找商品的图片
    pic = await db.collection('goods').where({
      id: cartItem.goods_id
    }).field({
      list_pic_url: true
    }).get()
    cartItem.list_pic_url = pic.data[0]
  }

  return {
    cartList: cartList.data,
    cartTotal: {
      goodsCount: goodsCount,
      goodsAmount: goodsAmount,
      checkedGoodsCount: checkedGoodsCount,
      checkedGoodsAmount: checkedGoodsAmount
    }
  }
}

index = async() => {
  return {
    errno: 0,
    data: await get_carts()
  }
}

count = async() => {
  const cartData = await get_carts()
  return {
    errno: 0,
    data: {
      cartTotal: {
        goodsCount: cartData.cartTotal.goodsCount
      }
    }
  }
}

add = async(p) => {
  const goodsId = p.goodsId
  const productId = p.productId
  const number = p.number

  // 判断商品是否可以购买
  const goods = await db.collection('goods').where({
    id: goodsId
  }).get()
  if (!goods.data.length || goods.data[0].is_delete === 1) {
    return this.fail(400, '商品已下架')
  }
  const goodsInfo = goods.data[0]
  // 取得规格的信息,判断规格库存
  const products = await db.collection('products').where({
    goods_id: goodsId,
    id: productId
  }).get()
  if (!products.data.length || products.data[0].goods_number < number) {
    return this.fail(400, '库存不足')
  }
  const productInfo = products.data[0]
  // 判断购物车中是否存在此规格商品
  const carts = await db.collection('carts').where({
    goods_id: goodsId,
    product_id: productId
  }).get()
  if (!carts.data.length) {
    // 添加操作

    // 添加规格名和值
    let goodsSepcifitionValue = []
    if (productInfo.goods_specification_ids) {
      goods_specifications = await db.collection('goods_specifications').where({
        goods_id: goodsId,
        id: _.in(productInfo.goods_specification_ids.split('_'))
      }).field({
        value: true
      }).get()
      for (goods_specification of goods_specifications.data) {
        goodsSepcifitionValue.push(goods_specification.value)
      }
    }

    // 添加到购物车
    const cartData = {
      goods_id: goodsId,
      product_id: productId,
      goods_sn: productInfo.goods_sn,
      goods_name: goodsInfo.name,
      list_pic_url: goodsInfo.list_pic_url,
      number: number,
      session_id: 1,
      //user_id: this.getLoginUserId(),
      retail_price: productInfo.retail_price,
      market_price: productInfo.retail_price,
      goods_specifition_name_value: goodsSepcifitionValue.join(''),
      goods_specifition_ids: productInfo.goods_specification_ids,
      checked: 1
    }

    await db.collection('carts').add({
      data: cartData
    })
  } else {
    const cartInfo = carts.data[0]
    // 如果已经存在购物车中，则数量增加
    if (productInfo.goods_number < (number + cartInfo.number)) {
      return this.fail(400, '库存不足')
    }

    await db.collection('carts').where({
      goods_id: goodsId,
      product_id: productId,
      id: cartInfo.id
    }).update({
      data: {
        'number': number
      }
    })
  }

  return {
    errno: 0,
    data: await get_carts()
  }
}

del = async(p) => {
  const productIds = p.productIds.split(',')
  console.log('del productIds', productIds)
  const result = await db.collection('carts').where({
    product_id: _.in(productIds)
  }).remove()
  console.log(result)
  return {
    errno: 0,
    data: await get_carts()
  }
}

checked = async(p) => {
  const productIds = p.productIds.toString().split(',')
  const isChecked = p.isChecked

  await db.collection('carts').where({
    product_id: _.in(productIds)
  }).update({
    data: {
      checked: parseInt(isChecked)
    }
  })

  return {
    errno: 0,
    data: await get_carts()
  }
}

module.exports = {
  index,
  count,
  add,
  del,
  checked
}