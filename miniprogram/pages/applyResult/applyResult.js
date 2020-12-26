// pages/applyResult/applyResult.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		dataList: "",
		state: "",
		title: ""
	},

	returnIndex: function (event) {
		wx.reLaunch({
			url: '../index/index?role=' + this.data.dataList.role + '&username=' + this.data.dataList.username,
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let dataList = JSON.parse(options.JSONstr)
		this.setData({
			dataList: dataList
		})
		if (options.state == "success") {
			this.setData({
				state: "success",
				title: "恭喜您，申请成功!"
			})
		} else {
			this.setData({
				state: "fail",
				title: "抱歉，申请失败!"
			})
		}
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