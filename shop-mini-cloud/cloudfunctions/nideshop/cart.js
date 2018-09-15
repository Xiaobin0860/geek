const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

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
  const cartData = await get_carts();
  return {
    errno: 0,
    data: {
      cartTotal: cartData.cartTotal
    }
  }
}

module.exports = {
  index,
  count
}