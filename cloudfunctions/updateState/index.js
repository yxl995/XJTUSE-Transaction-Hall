// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
	return await db.collection("room_time_record").where({
		username: event.username,
		date: event.date,
		start_time: event.start_time
	}).update({
		data: {
			use_state: true
		}
	})
}