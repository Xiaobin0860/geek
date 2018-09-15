// 云函数入口文件
const login = require('login')
const home = require('home')
const topic = require('topic')
const catalog = require('catalog')
const goods = require('goods')
const cart = require('cart')
const brand = require('brand')
const comment = require('comment')
const adress = require('adress')
const order = require('order')
const footprint = require('footprint')
const collection = require('collection')
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
    case 'TopicDetail':
      data = topic.detail(event.data)
      break
    case 'TopicRelated':
      data = topic.related(event.data)
      break
    case 'CatalogList':
      data = catalog.index()
      break
    case 'CatalogCurrent':
      data = catalog.current(event.data)
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
    case 'GoodsNew':
      data = goods.lnew(event.data)
      break
    case 'GoodsHot':
      data = goods.lhot(event.data)
      break
    case 'GoodsDetail':
      data = goods.detail(event.data)
      break
    case 'GoodsRelated':
      data = goods.related(event.data)
      break
    case 'CartList':
      data = cart.index()
      break
    case 'CartGoodsCount':
      data = cart.count()
      break
    case 'BrandList':
      data = brand.list(event.data)
      break
    case 'BrandDetail':
      data = brand.detail(event.data)
      break
    case 'CommentList':
      data = comment.list(event.data)
      break
    case 'CommentCount':
      data = comment.count(event.data)
      break
    case 'AddressList':
      data = adress.list(event.data)
      break
    case 'OrderList':
      data = order.list(event.data)
      break
    case 'CollectList':
      data = collection.list(event.data)
      break
    case 'FootprintList':
      data = footprint.list(event.data)
      break
    default:
      break
  }


  return data
}