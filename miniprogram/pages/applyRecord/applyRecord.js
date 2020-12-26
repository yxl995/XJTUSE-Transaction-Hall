// pages/applyRecord/applyRecord.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "yxl995",
		role: "student",
		recordList: []
	},

	detailRecord: function (event) {
		let str = JSON.stringify(this.data.recordList[event.currentTarget.id])
		wx.navigateTo({
			url: '../recordDetail/recordDetail?JSONstr=' + str + '&username=' + this.data.username + '&role=' + this.data.role,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			username: options.username,
			role: options.role
		})
		db.collection("room_time_record").where({
				username: this.data.username
			})
			.orderBy("use_state", "asc")
			.orderBy("date", "desc")
			.orderBy("start_time", "desc")
			.get().then(res => {
				this.setData({
					recordList: res.data
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