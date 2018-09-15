const cloud = require('wx-server-sdk')
cloud.init({
  env: 'geek-dev'
})
const db = cloud.database()
const _ = db.command

list = async () => {
  let addressList = []
  const addresses = await db.collection('addresses').get()
  for (const addressItem of addresses.data) {
    let address = {}
    let data = await db.collection('regions').where({id: addressItem.province_id}).get()
    address.province_name = data.data[0].name
    data = await db.collection('regions').where({ id: addressItem.city_id }).get()
    address.city_name = data.data[0].name
    data = await db.collection('regions').where({ id: addressItem.district_id }).get()
    address.district_name = data.data[0].name
    address.full_region = address.province_name + address.city_name + address.district_name
    address.address = addressItem.address
    addressList.push(address)
  }

  return {
    errno: 0,
    data: addressList
  }
}

module.exports = {
  list
}