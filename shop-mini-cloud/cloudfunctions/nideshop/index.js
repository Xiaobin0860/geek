// 云函数入口文件
const login = require('login')
const home = require('home')
const topic = require('topic')
const catalog = require('catalog')
const goods = require('goods')
const cart = require('cart')
const brand = require('brand')
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'geek-dev'
})

// 云函数入口函数
exports.main = async(event, context) => {
  console.log(event)
  console.log(context)

  data = null

  switch (event.url) {
    case 'AuthLoginByWeixin':
      data = login.login_by_weixin(event.userInfo.openId, event.data)
      break
    case 'IndexUrl':
      data = home.index()
      break
    case 'TopicList':
      data = topic.list(event.data)
      break
    case 'CatalogList':
      data = catalog.index()
      break
    case 'GoodsCount':
      data = goods.count()
      break
    case 'GoodsCategory':
      data = goods.category(event.data)
      break
    case 'GoodsList':
      data = goods.list(event.data)
      break
    case 'CartList':
      data = cart.index()
      break
    case 'BrandList':
      data = brand.list(event.data)
      break
    default:
      break
  }


  return data
}