const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()
const _ = db.command

list = async(p) => {
  const typeId = p.typeId
  const valueId = p.valueId
  const showType = p.showType // 选择评论的类型 0 全部， 1 只显示图片
  let page = p.page
  if (!page) {
    page = 1
  }
  let size = p.size
  if (!size || size > 20) {
    size = 20
  }
  const count = await db.collection('comments').where({
    type_id: typeId,
    value_id: valueId
  }).count()
  const comments = await db.collection('comments').where({
    type_id: typeId,
    value_id: valueId
  }).skip((page - 1) * size).limit(size).get()

  const commentList = []
  for (const commentItem of comments.data) {
    const comment = {}
    comment.content = Buffer.from(commentItem.content, 'base64').toString()
    comment.type_id = commentItem.type_id
    comment.value_id = commentItem.value_id
    comment.id = commentItem.id
    comment.add_time = new Date(commentItem.add_time * 1000)
    const users = await db.collection('users').field({
      username: true,
      avatar: true,
      nickname: true
    }).where({
      id: commentItem.user_id
    }).get()
    console.log(users)
    if (users.data.length) {
      comment.user_info = users.data[0]
    }
    pics = db.collection('comment_pictures').where({
      comment_id: commentItem.id
    }).get()
    comment.pic_list = pics.data
    commentList.push(comment)
  }
  return {
    errno: 0,
    data: {
      data: commentList,
      count: count.total,
      currentPage: page
    }
  }
}

count = async(p) => {
  const typeId = p.typeId
  const valueId = p.valueId

  const allCount = await db.collection('comments').field({
    id: true
  }).where({
    type_id: typeId,
    value_id: valueId
  }).get();
  let commentIds = []
  for (cid of allCount.data) {
    commentIds.push(cid)
  }
  const pics = await db.collection('comment_pictures').where({
    comment_id: _.in(commentIds)
  }).count()

  return {
    errno: 0,
    data: {
      allCount: commentIds.length,
      hasPicCount: pics.total
    }
  }
}

module.exports = {
  list,
  count
}