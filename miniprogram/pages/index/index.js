const db = wx.cloud.database()
const page = 5
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiper: ["./images/swiper0.jpg", "./images/swiper1.png"],
    role: "",
    username: "",
    function: [],
    newsList: [],
    skip: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    app.globalData.username = options.username
    app.globalData.role = options.role
    this.setData({
      role: options.role,
      username: options.username
    })
    if (this.data.role == "student") {
      this.setData({
        function: [{
          name: "教室申请",
          icon: "./images/apply_room.png",
          page: "../applyRoom/applyRoom"
        }, {
          name: "获奖登记",
          icon: "./images/register_award.png",
          page: "../registerAward/registerAward"
        }, {
          name: "获奖查询",
          icon: "./images/award.png",
          page: "../award/award"
        }]
      })
    } else {
      this.setData({
        function: [{
          name: "教室申请",
          icon: "./images/apply_room.png",
          page: "../applyRoom/applyRoom"
        }, {
          name: "查询学生",
          icon: "./images/query_student.png",
          page: "../queryStudent/queryStudent"
        }]
      })
    }
    db.collection("news").orderBy("date", "desc").skip(this.data.skip).limit(page).get().then(res => {
      let skip = this.data.skip
      let array = this.data.newsList
      res.data.forEach(element => {
        array.push({
          pre_title: element.pre_title,
          date: element.date
        })
      })
      this.setData({
        newsList: array,
        skip: skip + page
      })
    })
  },

  changePage: function (event) {
    let page = this.data.function[event.currentTarget.id].page;
    wx.navigateTo({
      url: page + '?username=' + this.data.username + '&role=' + this.data.role,
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
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    db.collection("news").orderBy("date", "desc").skip(this.data.skip).limit(page).get().then(res => {
      if (res.data.length == 0) {
        wx.showToast({
          title: '已经到底啦!',
          mask: true,
          icon: "none"
        })
      } else {
        let skip = this.data.skip
        let array = this.data.newsList
        res.data.forEach(element => {
          array.push({
            pre_title: element.pre_title,
            date: element.date
          })
        })
        this.setData({
          newsList: array,
          skip: skip + page
        })
      }
    })
    setTimeout(res => {
      wx.hideLoading()
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})