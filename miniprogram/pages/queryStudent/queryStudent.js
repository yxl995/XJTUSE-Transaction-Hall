// pages/queryStudent/queryStudent.js
const db = wx.cloud.database()
Page({


	/**
	 * 页面的初始数据
	 */
	data: {
		grades: [2017, 2018, 2019],
		grade: 2017,
		classes: [71, 72, 73],
		class: 71,
		names: ["学生-71-0", "学生-71-1", "学生-71-2", "学生-71-3", "学生-71-4"],
		name: "学生-71-0",
		value: [0, 0, 0]
	},

	bindChange: async function (e) {
		let val = e.detail.value
		if (val[0] != this.data.value[0]) {
			val[1] = 0;
			val[2] = 0;
			await db.collection((7 + val[0]) + "1").get().then(res => {
				let names = []
				for (let i = 0; i < res.data.length; i++) {
					names.push(res.data[i].name)
				}
				this.setData({
					names: names
				})
				if (val[0] == 0) {
					this.setData({
						classes: [71, 72, 73]
					})
				}
				if (val[0] == 1) {
					this.setData({
						classes: [81, 82, 83, 84]
					})
				}
				if (val[0] == 2) {
					this.setData({
						classes: [91, 92, 93]
					})
				}
			})
		}
		if (val[1] != this.data.value[1]) {
			val[2] = 0
			await db.collection((val[0] + 7) + '' + (val[1] + 1)).get().then(res => {
				let names = []
				for (let i = 0; i < res.data.length; i++) {
					names.push(res.data[i].name)
				}
				this.setData({
					names: names
				})
			})
		}
		this.setData({
			grade: this.data.grades[val[0]],
			class: this.data.classes[val[1]],
			name: this.data.names[val[2]],
			value: val
		})
	},

	query: function (event) {
		wx.navigateTo({
			url: '../showStudent/showStudent?name=' + this.data.name,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

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