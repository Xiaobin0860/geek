const ApiRootUrl = 'http://127.0.0.1:8360/api/';

module.exports = {
  // IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  IndexUrl: 'IndexUrl', //首页数据接口
  //CatalogList: ApiRootUrl + 'catalog/index', //分类目录全部分类数据接口
  CatalogList: 'CatalogList',
  //CatalogCurrent: ApiRootUrl + 'catalog/current', //分类目录当前分类数据接口
  CatalogCurrent: 'CatalogCurrent',

  //AuthLoginByWeixin: ApiRootUrl + 'auth/loginByWeixin', //微信登录
  AuthLoginByWeixin: "AuthLoginByWeixin",

  //GoodsCount: ApiRootUrl + 'goods/count', //统计商品总数
  GoodsCount: 'GoodsCount',
  //GoodsList: ApiRootUrl + 'goods/list', //获得商品列表
  GoodsList: 'GoodsList',
  //GoodsCategory: ApiRootUrl + 'goods/category', //获得分类数据
  GoodsCategory: 'GoodsCategory',
  //GoodsDetail: ApiRootUrl + 'goods/detail', //获得商品的详情
  GoodsDetail: 'GoodsDetail',
  //GoodsNew: ApiRootUrl + 'goods/new', //新品
  GoodsNew: 'GoodsNew',
  //GoodsHot: ApiRootUrl + 'goods/hot', //热门
  GoodsHot: 'GoodsHot',
  //GoodsRelated: ApiRootUrl + 'goods/related', //商品详情页的关联商品（大家都在看）
  GoodsRelated: 'GoodsRelated',

  //BrandList: ApiRootUrl + 'brand/list', //品牌列表
  BrandList: 'BrandList',
  //BrandDetail: ApiRootUrl + 'brand/detail', //品牌详情
  BrandDetail: 'BrandDetail',

  //CartList: ApiRootUrl + 'cart/index', //获取购物车的数据
  CartList: 'CartList',
  //CartAdd: ApiRootUrl + 'cart/add', // 添加商品到购物车
  CartAdd: 'CartAdd',
  CartUpdate: ApiRootUrl + 'cart/update', // 更新购物车的商品
  //CartDelete: ApiRootUrl + 'cart/delete', // 删除购物车的商品
  CartDelete: 'CartDelete',
  //CartChecked: ApiRootUrl + 'cart/checked', // 选择或取消选择商品
  CartChecked: 'CartChecked',
  //CartGoodsCount: ApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
  CartGoodsCount: 'CartGoodsCount',
  CartCheckout: ApiRootUrl + 'cart/checkout', // 下单前信息确认

  OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  // CollectList: ApiRootUrl + 'collect/list', //收藏列表
  CollectList: 'CollectList',
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete', //添加或取消收藏

  //CommentList: ApiRootUrl + 'comment/list', //评论列表
  CommentList: 'CommentList',
  // CommentCount: ApiRootUrl + 'comment/count', //评论总数
  CommentCount: 'CommentCount',
  CommentPost: ApiRootUrl + 'comment/post', //发表评论

  //TopicList: ApiRootUrl + 'topic/list',  //专题列表
  TopicList: 'TopicList',
  //TopicDetail: ApiRootUrl + 'topic/detail', //专题详情
  TopicDetail: 'TopicDetail',
  //TopicRelated: ApiRootUrl + 'topic/related', //相关专题
  TopicRelated: 'TopicRelated',

  SearchIndex: ApiRootUrl + 'search/index', //搜索页面数据
  SearchResult: ApiRootUrl + 'search/result', //搜索数据
  SearchHelper: ApiRootUrl + 'search/helper', //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory', //搜索帮助

  //AddressList: ApiRootUrl + 'address/list', //收货地址列表
  AddressList: 'AddressList',
  AddressDetail: ApiRootUrl + 'address/detail', //收货地址详情
  AddressSave: ApiRootUrl + 'address/save', //保存收货地址
  AddressDelete: ApiRootUrl + 'address/delete', //保存收货地址

  RegionList: ApiRootUrl + 'region/list', //获取区域列表

  //OrderList: ApiRootUrl + 'order/list', //订单列表
  OrderList: 'OrderList',
  OrderDetail: ApiRootUrl + 'order/detail', //订单详情
  OrderCancel: ApiRootUrl + 'order/cancel', //取消订单
  OrderExpress: ApiRootUrl + 'order/express', //物流详情

  //FootprintList: ApiRootUrl + 'footprint/list', //足迹列表
  FootprintList: 'FootprintList',
  FootprintDelete: ApiRootUrl + 'footprint/delete', //删除足迹
};