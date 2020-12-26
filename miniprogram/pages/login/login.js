// pages/login/login.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	submit: function (event) {
		let username = event.detail.value.username;
		let password = event.detail.value.password;
		if (username == "") {
			wx.showToast({
				title: '请输入学号/工号!',
				icon: "none",
				mask: true
			})
		} else if (password == "") {
			wx.showToast({
				title: '请输入密码!',
				icon: "none",
				mask: true
			})
		} else {
			db.collection("user").where({
				username: username,
				password: password
			}).get().then(res => {
				if (res.data.length == 0) {
					wx.showToast({
						title: '用户名或密码错误！',
						icon: "none",
						mask: true
					})
				} else {
					wx.reLaunch({
						url: '../index/index?role=' + res.data[0].role + '&username=' + username,
					})
				}
			})
		}
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