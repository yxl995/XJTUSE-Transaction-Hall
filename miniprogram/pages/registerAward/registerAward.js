// pages/submitApply1/submitApply1.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		role: "",
		date: "",
		end: "",
		boxList: [],
		info: {},
		imgList: []
	},

	delete: function (event) {
		let index = event.currentTarget.id
		index = index.substring(3)
		index = parseInt(index)
		let newArray = this.data.imgList;
		newArray.splice(index, 1);
		this.setData({
			imgList: newArray
		})
	},

	showImg: function (event) {
		let index = event.currentTarget.id
		index = index.substring(3)
		index = parseInt(index)
		wx.previewImage({
			current: this.data.imgList[index],
			urls: this.data.imgList
		})
	},

	add: function (event) {
		let _this = this
		wx.chooseImage({
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera'],
			success(res) {
				wx.showToast({
					title: '正在上传...',
					icon: "loading",
					mask: true,
					duration: 500
				})
				let array = _this.data.imgList;
				array.push(res.tempFilePaths[0])
				_this.setData({
					imgList: array
				})
			}
		})
	},

	submit: function (event) {
		this.setData({
			boxList: [{
				title: "奖项名称",
				value: event.detail.value.name
			}, {
				title: "颁发单位",
				value: event.detail.value.unit
			}, {
				title: "获奖日期",
				value: this.data.date
			}, {
				title: "奖项描述",
				value: event.detail.value.description
			}]
		})
		let imgIDList = []
		if (this.data.boxList.findIndex(obj => obj.value === "") == -1 && this.data.imgList.length != 0) {
			let _this = this;
			let promiseArr = []
			let username = this.data.username;
			for (let i = 0; i < this.data.imgList.length; i++) {
				let element = this.data.imgList[i]
				let promise = new Promise((resolve, reject) => {
					let timestamp = Date.parse(new Date());
					timestamp /= 1000
					let item = element.substring(element.length - 4)
					let cloudPath = username + '-' + timestamp + i + item
					wx.cloud.uploadFile({
						cloudPath: cloudPath,
						filePath: element,
						success: res => {
							imgIDList.push(res.fileID)
							resolve(res.fileID)
						},
						fail: err => {
							wx.showToast({
								title: '图片上传失败!',
								icon: 'none',
								mask: true
							})
							reject(err)
						}
					})
				})
				promiseArr.push(promise)
			}
			Promise.all(promiseArr).then(res => {
				let dataList = {
					username: _this.data.username,
					date: _this.data.date,
					end: _this.data.end,
					boxList: _this.data.boxList,
					info: _this.data.info,
					imgIDList: imgIDList,
					state: false
				}
				db.collection("award").add({
					data: dataList
				}).then(res => {
					wx.showToast({
						title: '提交成功!',
						mask: true,
						duration: 1000,
						success: function () {
							setTimeout(function () {
								wx.reLaunch({
									url: '../index/index?username=' + _this.data.username + '&role=' + _this.data.role,
								})
							}, 1000)
						}
					})
				})
			})
		} else {
			wx.showToast({
				title: '请完善信息!',
				icon: "none",
				mask: true
			})
		}
	},

	dateChange: function (event) {
		this.setData({
			date: event.detail.value
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let date = new Date();
		db.collection("user").where({
			username: options.username
		}).get().then(res => {
			this.setData({
				username: options.username,
				role: options.role,
				end: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
				info: res.data[0]
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