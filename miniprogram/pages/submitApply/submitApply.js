// pages/submitApply/submitApply.js
const db = wx.cloud.database()
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		username: "",
		role: "",
		date: "",
		start: "",
		end: "",
		weekDay: "",
		submit_time: "",
		roomList: [],
		timeList: [],
		room_time_recordList: [],
		selectedRoom: "",
		selectedTime: "",
		roomInfo: [{
			name: "教室:",
			msg: "未选择"
		}, {
			name: "座位:",
			msg: ""
		}, {
			name: "电脑数量:",
			msg: ""
		}, {
			name: "实验箱:",
			msg: ""
		}]
	},

	radioChange: function (event) {
		let i1 = event.detail.value.charAt(0);
		let j1 = event.detail.value.charAt(2);
		let newList = this.data.room_time_recordList;
		for (let i2 = 0; i2 < newList.length; i2++) {
			for (let j2 = 0; j2 < newList[i2].length; j2++) {
				if (newList[i2][j2].className == "selected") {
					newList[i2][j2].className = "space";
				}
				if (i1 == i2 && j1 == j2) {
					newList[i2][j2].className = "selected";
				}
			}
		}
		this.setData({
			room_time_recordList: newList,
			selectedRoom: i1,
			selectedTime: j1,
			roomInfo: [{
				name: "教室:",
				msg: this.data.roomList[i1].num
			}, {
				name: "座位:",
				msg: this.data.roomList[i1].seat_count
			}, {
				name: "电脑数量:",
				msg: this.data.roomList[i1].computer_count
			}, {
				name: "实验箱:",
				msg: this.data.roomList[i1].exp_box_count
			}]
		})
	},

	bindDateChange: async function (event) {
		let date = event.detail.value;
		let day = new Date(date).getDay();
		let weekDay;
		switch (day) {
			case 0:
				weekDay = "日";
				break;
			case 1:
				weekDay = "一";
				break;
			case 2:
				weekDay = "二";
				break;
			case 3:
				weekDay = "三";
				break;
			case 4:
				weekDay = "四";
				break;
			case 5:
				weekDay = "五";
				break;
			case 6:
				weekDay = "六";
				break;
		}
		await db.collection("room_time_record").where({
			date: date
		}).get().then(res => {
			let newArray = [];
			let result = []
			for (let i = 0; i < res.data.length; i++) {
				result[i] = {
					room: res.data[i].room_num,
					time: res.data[i].start_time
				}
			}
			for (let i = 0; i < this.data.roomList.length; i++) {
				let childArray = [];
				for (let j = 0; j < this.data.timeList.length; j++) {
					let index1 = result.findIndex(obj => obj.room === this.data.roomList[i].num)
					let index2 = result.findIndex(obj => obj.time === this.data.timeList[j].start_time)
					if (index1 != -1 && index1 == index2) {
						childArray.push({
							use: false
						});
					} else {
						childArray.push({
							use: true,
							className: "space"
						});
					}
				}
				newArray.push(childArray);
			}
			this.setData({
				room_time_recordList: newArray
			})
		})
		this.setData({
			date: date,
			weekDay: weekDay,
			selectedRoom: "",
			selectedTime: "",
			roomInfo: [{
				name: "教室:",
				msg: "未选择"
			}, {
				name: "座位:",
				msg: ""
			}, {
				name: "电脑数量:",
				msg: ""
			}, {
				name: "实验箱:",
				msg: ""
			}]
		})
	},

	next: function (event) {
		if (this.data.selectedRoom == "" || this.data.selectedTime == "") {
			wx.showToast({
				title: '请选择教室和时间',
				icon: "none",
				mask: true
			})
		} else {
			let start_time = this.data.timeList[this.data.selectedTime].start_time;
			let end_time = this.data.timeList[this.data.selectedTime].end_time;
			let room_num = this.data.roomList[this.data.selectedRoom].num;
			let str = JSON.stringify(this.data.submit_time)
			wx.navigateTo({
				url: '../submitApply1/submitApply1?room_num=' + room_num + '&start_time=' + start_time + '&end_time=' + end_time + '&date=' + this.data.date + '&weekDay=' + this.data.weekDay + '&username=' + this.data.username + '&role=' + this.data.role + '&JSONstr=' + str,
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		let date = new Date();
		let year1 = date.getFullYear();
		let month1 = date.getMonth() + 1;
		let day1 = date.getDate();
		let weekDay;
		await db.collection("room").orderBy("num", "asc").get().then(res => {
			let newArray = [];
			for (let i = 0; i < res.data.length; i++) {
				newArray[i] = {
					num: res.data[i].num,
					seat_count: res.data[i].seat_count,
					computer_count: res.data[i].computer_count,
					exp_box_count: res.data[i].exp_box_count
				}
			}
			this.setData({
				roomList: newArray
			})
		})
		await db.collection("time").orderBy("start_time", "asc").get().then(res => {
			let newArray = [];
			for (let i = 0; i < res.data.length; i++) {
				newArray[i] = {
					start_time: res.data[i].start_time,
					end_time: res.data[i].end_time,
				}
			}
			this.setData({
				timeList: newArray
			})
		})
		date.setDate(day1 + 7);
		if (month1 < 10) {
			month1 = "0" + month1;
		}
		if (day1 < 10) {
			day1 = "0" + day1;
		}
		await db.collection("room_time_record").where({
			date: year1 + "-" + month1 + "-" + day1
		}).get().then(res => {
			let newArray = [];
			let result = []
			for (let i = 0; i < res.data.length; i++) {
				result[i] = {
					room: res.data[i].room_num,
					time: res.data[i].start_time
				}
			}
			for (let i = 0; i < this.data.roomList.length; i++) {
				let childArray = [];
				for (let j = 0; j < this.data.timeList.length; j++) {
					let index1 = result.findIndex(obj => obj.room === this.data.roomList[i].num)
					let index2 = result.findIndex(obj => obj.time === this.data.timeList[j].start_time)
					if (index1 != -1 && index1 == index2) {
						childArray.push({
							use: false
						});
					} else {
						childArray.push({
							use: true,
							className: "space"
						});
					}
				}
				newArray.push(childArray);
			}
			this.setData({
				room_time_recordList: newArray
			})
		})
		switch (date.getDay()) {
			case 0:
				weekDay = "日";
				break;
			case 1:
				weekDay = "一";
				break;
			case 2:
				weekDay = "二";
				break;
			case 3:
				weekDay = "三";
				break;
			case 4:
				weekDay = "四";
				break;
			case 5:
				weekDay = "五";
				break;
			case 6:
				weekDay = "六";
				break;
		}
		let year2 = date.getFullYear();
		let month2 = date.getMonth() + 1;
		let day2 = date.getDate();
		this.setData({
			username: options.username,
			role: options.role,
			date: year1 + "-" + month1 + "-" + day1,
			start: year1 + "-" + month1 + "-" + day1,
			end: year2 + "-" + month2 + "-" + day2,
			weekDay: weekDay
		})
		this.setData({
			submit_time: {
				date: this.data.date,
				weekDay: this.data.weekDay
			}
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

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