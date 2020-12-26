const app = getApp()
const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    JSONstr: "",
    rowList: [{
      url: "../userInfo/userInfo?JSONstr=",
      icon: "./images/info.png",
      txt: "个人资料"
    }, {
      url: "../commonQ&A/commonQ&A?JSONstr=",
      icon: "./images/help.png",
      txt: "常见问题"
    }, {
      url: "../about/about?JSONstr=",
      icon: "./images/about.png",
      txt: "关于我们"
    }]
  },

  showImg: function (event) {
    wx.previewImage({
      urls: [this.data.userinfo.head],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let username = app.globalData.username;
    db.collection("user").where({
      username: username
    }).get().then(res => {
      this.setData({
        userinfo: res.data[0],
        JSONstr: JSON.stringify(res.data[0])
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