// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uicon:'../../assets/icons/my.png',
    uname:'用户名',
    model:'',
    system:'',
    screenHeight:'',
    screenWidth:'',
    language:'',
    version:''   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this
    var _this=this;
    // 获取手机系统信息
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res)
        _this.setData({
        model:res.model,
        system:res.system,
        screenHeight:res.screenHeight,
        screenWidth:res.screenWidth,
        language:res.language,
        version:res.version
        })
      }
    });
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
    return {
      title: '精美有意思的天气小程序',
      desc: '发现一个精美有意思的小程序',
      path: '/pages/index/index'
    }
  }
})