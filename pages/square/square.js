
const app = getApp()

Page({

  data: {
    showtab: 0,
    btns: ["南南广场", "我的关注"],
    active: 0,
    imga:[
      {
        "imgPath":"../../images/swi1.jpg"
      },
      {
        "imgPath":"../../images/swi2.jpg"
      },
      {
        "imgPath": "../../images/swi3.jpg"
      },
      {
        "imgPath": "../../images/swi4.jpg"
      }
    ],
    cateid:0,
    nickName:'',
    hid:'false',
  },
  onShow:function(){
    this.onLoad()
    // wx.showToast({
    //   title:'发表成功',
    //   icon:'success',
    //   duration:1500
    // })
  },
  onLoad: function () {
    
    var that = this;
    wx.request({
      url: 'https://hungking.top/nannan/public/cate',
      method:'GET',
      success:function(res){
        that.setData({  
          cate:res.data,
          tabnum:res.data.length,
        })
      },
      fail:function(){
      },
      complete:function(){
      }
    }),
    wx.request({
      url: 'https://hungking.top/nannan/public/article',
      data:{
        id:that.data.cateid
      },
      method:'GET',
      success:function(res){
        //console.log(res.data)
        that.setData({  
          article:res.data,
        })
      },
      fail:function(){
      },
      complete:function(){
      }
    }),
    wx.getUserInfo({
      success: function(res){
        that.data.nickName = res.userInfo.nickName
        wx.login({
          success: function (res) {
            //console.log(res.code)
            //发送请求
            wx.request({
              url: 'https://hungking.top/nannan/public/aaa', //仅为示例，并非真实的接口地址
              data: {
                code: res.code
              },
              method: 'GET', 
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              success(res) {
                //console.log(res.data)
                wx.request({
                  url: 'https://hungking.top/nannan/public/follow',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                  },
                   data: {
                    openid : res.data
                  },
                  method: 'GET', 
                  success: function(ress){
                    console.log(ress)
                    that.setData({
                      guanzhu:ress.data
                    })
                  },
                  fail: function() {
                  },
                  complete: function() {
                  }
                })
              }
            })
          }
        })
        
      },
      fail: function() {
      },
      complete: function() {
      }
    })
  },

  toggle: function (e) {

    this.setData({
      active: e.currentTarget.dataset.index,
    })

  },
  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    var that = this;
    wx.request({
      url: 'https://hungking.top/nannan/public/article',
      data: {
        id:e.currentTarget.dataset.tabindex
      },
      method: 'GET', 
      success: function(res){
        console.log(res.data[0].cate_id-1,edata.tabindex);
        that.setData({
          article:res.data,
          showtab: edata.tabindex,
          cateid:res.data[0].cate_id-1,
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },
  checksession: function () {
    wx.checkSession({
      success: function (res) {
        console.log(res, '登录未过期')
        wx.showToast({
          title: '登录未过期啊',
        })
      },
      fail: function (res) {
        console.log(res, '登录过期了')
        wx.showModal({
          title: '提示',
          content: '你的登录信息过期了，请重新登录',
        })
        //再次调用wx.login()
        wx.login({
          success: function (res) {
            console.log(res.code)
            //发送请求
            wx.request({
              url: 'https://hungking.top/test/json/aaa.php', //仅为示例，并非真实的接口地址
              data: {
                code: res.code
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                console.log(res)
              }
            })
          }
        })
      }
    })
  },
  previewImg(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
    })
  },
  fabiao:function(){
    wx.navigateTo({
      url: '/pages/publish/publish',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  arti:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/article/article?id='+id,
      success: function(res){
        // success
        //console.log(id)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})