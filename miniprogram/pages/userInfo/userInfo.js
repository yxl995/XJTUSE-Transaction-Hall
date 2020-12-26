Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {},
    row: [{
      title: "姓名",
      info: "name"
    }, {
      title: "工号",
      info: "id"
    }, {
      title: "性别",
      info: "gender"
    }, {
      title: "手机号",
      info: "phone"
    }, {
      title: "邮箱",
      info: "Email"
    }, {
      title: "GitHub",
      info: "github"
    }]
  },

  showImg: function (event) {
    wx.previewImage({
      urls: [this.data.dataList.head],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dataList = JSON.parse(options.JSONstr)
    this.setData({
      dataList
    })
    if (this.data.dataList.role == "student") {
      this.setData({
        row: [{
          title: "姓名",
          info: "name"
        }, {
          title: "学号",
          info: "id"
        }, {
          title: "班级",
          info: "class"
        }, {
          title: "性别",
          info: "gender"
        }, {
          title: "手机号",
          info: "phone"
        }, {
          title: "邮箱",
          info: "Email"
        }, {
          title: "GitHub",
          info: "github"
        }]
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