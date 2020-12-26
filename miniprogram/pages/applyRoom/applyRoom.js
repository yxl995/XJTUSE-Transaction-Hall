// pages/applyRoom/applyRoom.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		role: "",
		boxList: [{
			img: "./images/apply_room.png",
			text_chinese: "提交申请",
			text_english: "Submit application",
			tip: "tip"
		}, {
			img: "./images/apply_record.png",
			text_chinese: "申请记录",
			text_english: "Application record",
			tip: "record"
		}],
		isShadow: "hide",
		tip_text: `1. 至少提前一个工作日在网上提交申请，周末使用请提前两个工作日。使用时必需保证教室内设施的安全及环境的卫生，不得大声喧哗，以免影响其它教室的教学活动。
2. 使用教室，必须遵守学校关于教室管理有关规定，不得发生违规行为，对在教室内进行商业行为、违法活动，管理人员有权制止并停止使用。
3. 其中教室101及教室102为专题实验室，配备实验箱等实验设备，请注意按需选择。
4. ………………
5. ………………
6. ………………
7. ………………
8. ………………
9. ………………`,
		tip_out: "hide"
	},

	record: function (event) {
		wx.navigateTo({
			url: '../applyRecord/applyRecord?username=' + this.data.username + '&role=' + this.data.role,
		})
	},

	tip: function (event) {
		this.setData({
			isShadow: "shadow",
			tip_out: "tip_out"
		})
	},

	hideTip: function (event) {
		this.setData({
			isShadow: "hide",
			tip_out: "hide"
		})
	},

	submitApply: function (event) {
		wx.redirectTo({
			url: '../submitApply/submitApply?username=' + this.data.username + '&role=' + this.data.role,
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