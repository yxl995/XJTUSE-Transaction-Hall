// pages/news/news.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		index: "",
		news: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			index: options.index
		})
		let i = parseInt(this.data.index)
		db.collection("news").orderBy("date", "desc").skip(i).limit(1).get().then(res => {
			this.setData({
				news: res.data[0]
			})
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		// let title = "理论框架打发绿卡地方"
		// let pre_title;
		// if (title.length > 11) {
		// 	pre_title = title.substring(0, 10) + "..."
		// } else {
		// 	pre_title = title
		// }
		// db.collection("news").add({
		// 	data: {
		// 		title,
		// 		pre_title,
		// 		date: "2020-02-21",
		// 		content: `全国大学外语四、六级口语考试将于11月21-22日进行。请大家及时上网打印准考证，准备好考试用具。

		// 		目前新冠肺炎疫情防控已经进入常态化，为保障考生健康安全和考试的平稳顺利进行，根据《教育部考试中心新冠肺炎疫情防控常态化下全国大学英语四、六级考试口语考试组考防疫工作指导意见》的文件精神，请广大考生注意以下防疫要求：
				
		// 		1.保证日常体温测量和身体健康状况的网上日报的填报，身体异常的要及时诊疗。如考生为新冠肺炎确诊病例、无症状感染者、疑似患者、确诊病例密切接触者，或治愈未超过14天的病例、不能排除感染可能的发热患者，不得参加本次考试。
				
		// 		2.尽量减少外出，减少到人员密集的校外公共场所活动；注意个人卫生，外出归来注意手卫生；科学安排作息，确保以健康的状态、良好的心态参加考试。
				
		// 		3.请所有考生自备口罩，听从考试工作人员指挥有序进入考场，不得因为佩戴口罩影响身份识别。在进入考场前要佩戴口罩，进入考场后自行决定是否佩戴。
				
		// 		4.考试结束散场时，要按监考员的指令有序离场，不得拥挤，保持人员间距。
				
		// 		5.校外考生请持身份证、准考证、西安市健康一码通进入校园。`
		// 	}
		// })
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})