const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()

list = async () => {
  const count = await db.collection('orders').count()
  const orderList = await db.collection('orders').get()
  let newOrderList = []
  for (const item of orderList.data) {
    // 订单的商品
    let data = await db.collection('order_goods').where({
      order_id: item.id
    }).get()
    item.goodsList = data.data
    item.goodsCount = 0
    item.goodsList.forEach(v => {
      item.goodsCount += v.number
    })

    // // 订单状态的处理
    // item.order_status_text = await this.model('order').getOrderStatusText(item.id)

    // // 可操作的选项
    // item.handleOption = await this.model('order').getOrderHandleOption(item.id)

    newOrderList.push(item)
  }

  return {
    errno: 0,
    data: {
      count: count.total,
      data: newOrderList
    }
  }
}

module.exports = {
  list
}