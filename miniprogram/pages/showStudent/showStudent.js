// pages/showStudent/showStudent.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		name: "",
		userinfo: {},
		recordList: []
	},

	showHead: function (event) {
		wx.previewImage({
			current: this.data.userinfo.head,
			urls: [this.data.userinfo.head]
		})
	},

	showImg: function (event) {
		let index = event.currentTarget.id
		wx.previewImage({
			current: this.data.recordList[index].imgIDList[0],
			urls: this.data.recordList[index].imgIDList
		})
	},

	detailRecord: function (event) {
		let newArray = this.data.detail
		newArray[event.currentTarget.id] = !newArray[event.currentTarget.id]
		this.setData({
			detail: newArray
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		this.setData({
			name: options.name
		})
		await db.collection("user").where({
			name: this.data.name
		}).get().then(res => {
			this.setData({
				userinfo: res.data[0]
			})
		})
		await db.collection("award").where({
			username: this.data.userinfo.username
		}).get().then(res => {
			let detail = []
			for (let i = 0; i < res.data.length; i++) {
				detail.push(false)
			}
			this.setData({
				recordList: res.data,
				detail
			})
		})
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