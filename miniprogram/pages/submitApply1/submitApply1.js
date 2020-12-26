// pages/submitApply1/submitApply1.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		room_num: "",
		start_time: "",
		end_time: "",
		date: "",
		weekDay: "",
		username: "",
		role: "",
		boxList: [{
			title: "申请单位",
			name: "applicant",
			placeholder: "请填写单位名称/个人姓名",
			type: "text",
			value: ""
		}, {
			title: "申请用途",
			name: "way",
			placeholder: "请填写申请用途",
			type: "text",
			value: ""
		}, {
			title: "申请人数",
			name: "count",
			placeholder: "请填写人数",
			type: "number",
			value: ""
		}, {
			title: "联系方式",
			name: "phone",
			placeholder: "请填写手机号码",
			type: "number",
			value: ""
		}],
		isShadow: "hide",
		check: "hide",
		input: "",
		submit_time: {}
	},

	checkSubmit: function (event) {
		this.setData({
			boxList: [{
				title: "申请单位",
				name: "applicant",
				placeholder: "请填写单位名称/个人姓名",
				type: "text",
				value: event.detail.value.applicant
			}, {
				title: "申请用途",
				name: "way",
				placeholder: "请填写申请用途",
				type: "text",
				value: event.detail.value.way
			}, {
				title: "申请人数",
				name: "count",
				placeholder: "请填写人数",
				type: "number",
				value: event.detail.value.count
			}, {
				title: "联系方式",
				name: "phone",
				placeholder: "请填写手机号码",
				type: "number",
				value: event.detail.value.phone
			}]
		})
		if (this.data.boxList.findIndex(obj => obj.value === "") == -1) {
			this.setData({
				isShadow: "shadow",
				check: "check",
				input: "hide",
			})
		} else {
			wx.showToast({
				title: '请完善信息!',
				icon: "none",
				mask: true
			})
		}
	},

	hideCheck: function (event) {
		this.setData({
			isShadow: "hide",
			check: "hide",
			input: ""
		})
	},

	submit: function (event) {
		let boxList = [];
		for (let i = 0; i < this.data.boxList.length; i++) {
			boxList.push({
				title: this.data.boxList[i].title,
				value: this.data.boxList[i].value
			})
		}
		let now = new Date();
		let hour = now.getHours()
		let minute = now.getMinutes()
		let second = now.getSeconds()
		let submit_time = {
			date: this.data.submit_time.date,
			weekDay: this.data.submit_time.weekDay,
			hour: hour,
			minute: minute,
			second: second
		}
		let dataList = {
			room_num: parseInt(this.data.room_num),
			start_time: this.data.start_time,
			end_time: this.data.end_time,
			date: this.data.date,
			weekDay: this.data.weekDay,
			username: this.data.username,
			role: this.data.role,
			use_state: false,
			boxList: boxList,
			submit_time: submit_time
		}
		let str = JSON.stringify(dataList)
		db.collection("room_time_record").add({
			data: dataList
		}).then(res => {
			wx.reLaunch({
				url: '../applyResult/applyResult?JSONstr=' + str + '&state=success',
			})
		}).catch(err => {
			wx.reLaunch({
				url: '../applyResult/applyResult?JSONstr=' + str + '&state=fail',
			})
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let submit_time = JSON.parse(options.JSONstr);
		this.setData({
			room_num: options.room_num,
			start_time: options.start_time,
			end_time: options.end_time,
			date: options.date,
			weekDay: options.weekDay,
			username: options.username,
			role: options.role,
			submit_time: submit_time
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