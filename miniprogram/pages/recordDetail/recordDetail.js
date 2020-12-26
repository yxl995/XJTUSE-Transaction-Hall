// pages/recordDetail/recordDetail.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		role: "",
		dataList: ""
	},

	back: function (event) {
		wx.navigateBack({
			delta: 0,
		})
	},

	changeState: function (event) {
		wx.cloud.callFunction({
			name: 'updateState',
			data: {
				date: this.data.dataList.date,
				start_time: this.data.dataList.start_time,
				username: this.data.username
			}
		}).then(res => {
			wx.showToast({
				title: '修改成功!',
				mask: true
			})
			wx.reLaunch({
				url: '../index/index?username=' + this.data.username + '&role=' + this.data.role,
			})
		}).catch(err => {
			wx.showToast({
				title: '修改失败,请稍后重试!',
				icon: 'none',
				mask: true
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let dataList = JSON.parse(options.JSONstr);
		if (dataList.submit_time.minute < 10) {
			dataList.submit_time.minute = '0' + dataList.submit_time.minute
		}
		if (dataList.submit_time.second < 10) {
			dataList.submit_time.second = '0' + dataList.submit_time.second
		}
		this.setData({
			username: options.username,
			role: options.role,
			dataList: dataList
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