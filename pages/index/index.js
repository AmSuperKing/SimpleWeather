//index.js
//获取应用实例
const app = getApp()
// 引入JS SDK 核心类
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({
  data: {
    longitude: "",
    latitude: "",
    weather: {},//实况天气
    weatherweek: [],//七日天气
    value:null,
    date:'',
    humidity:"",
    yiyan:{},
    cityWord: ""
  },

  cityWordInput: function (e) {
    this.setData({
      cityWord: e.detail.value.trim()
    })
    // console.log("搜索城市名=>",this.data.cityWord)
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()  //重新加载数据
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  onLoad: function () {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    var _this = this;
    //实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'RBJBZ-VCO6Q-23U5B-GZQ77-OWTGE-VXFCR'
    });
    //wx获取位置接口
    wx.getLocation({
      success: function(res) {
        //获取经纬度
        // console.log("位置经纬度=>",res);
        //逆地址解析
        qqmapsdk.reverseGeocoder({
          location:{
            latitude:res.latitude,
            longitude:res.longitude
          },
          success:function(res){
            // console.log("位置=>", res.result.address_component.district);
            // console.log("位置信息=>", res.result);
            _this.weathertoday(res.result.address_component.district.substr(0,2));
            _this.weatherweekday(res.result.address_component.district.substr(0, 2));
          }
        })
      }
    });

    // 一言
    wx.request({
      url: 'https://v1.hitokoto.cn/', //填写真实的接口地址
      method: "get",
      dataType: "json",
      //请求参数
      data: {
        x: '',
        y: '',
        encode: "json"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log("一言=>",res.data)
        _this.setData({
          yiyan: res.data
        })
      }
    });

    // 每隔10秒定时刷新一条一言
    setInterval(function () {
      wx.request({
        url: 'https://v1.hitokoto.cn/', //填写真实的接口地址
        method: "get",
        dataType: "json",
        //请求参数
        data: {
          x: '',
          y: '',
          encode: "json"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // console.log("一言=>",res.data)
          _this.setData({
            yiyan: res.data
          })
        }
      });
    }, 10000)
  },

  search: function () {
    var _this = this;
    var keyWord = _this.data.cityWord;
    // console.log("=>搜索城市名", keyWord)
    if (keyWord.length != 0) {
      _this.weathertoday(keyWord);
      _this.weatherweekday(keyWord);
      _this.setData({
        value: ''
      })
    }
  },

  finish:function(e){
    var _this = this;
    // console.log("搜索位置=>",e.detail.value);
    if(e.detail.value.length != 0){
      _this.weathertoday(e.detail.value);
      _this.weatherweekday(e.detail.value);
      // 清空输入框的值
      _this.setData({
        value:''
      })
    }
  },

  //天气api实况天气
  weathertoday:function(city){
    var _this = this;
    wx.request({
      url: 'https://www.tianqiapi.com/api?version=v6&appid=36554428&appsecret=9zyZPUIk',
      data:{
        'city':city
      },
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        // console.log("今日天气=>",res.data);
        _this.setData({
          weather:res.data,
          date: res.data.date.substr(5, 5),
          humidity: res.data.humidity.substr(0, 2)
        });
        console.log("今日天气 =>",_this.data.weather)
      }
    });
  },

  // 天气api七日天气
  weatherweekday:function(city){
    var _this = this;
    wx.request({
      url:'https://www.tianqiapi.com/api?version=v1&appid=36554428&appsecret=9zyZPUIk',
      data:{
        'city':city
      },
      method:'GET',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success:function(res){
        _this.setData({
          weatherweek:res.data
        });
        console.log("7日天气 =>",_this.data.weatherweek)
      }
    });
  },

  click: function () {
    var _this = this;
    //发起一个网络请求
    wx.request({
      url: 'https://v1.hitokoto.cn/', //填写真实的接口地址
      //请求参数
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(res.data);
        _this.setData({
          yiyan: res.data,
        })
      }
    });
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
  },

  // 分享朋友圈
  onShareTimeline: function () {
    return {
      title: '我的当前位置天气信息',
      query: '/pages/index/index'
    }
  },
  
})
