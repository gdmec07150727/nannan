const app = getApp()
Page({
  data:{
    nickName:'',
    avatarUrl:'',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  
  onLoad:function(){
      //以下获取当前的头像昵称
    var that = this;
    var db = "no";
    //console.log(that.data.openid)
    //获取用户信息
    wx.getUserInfo({
        success: function(res){
            that.data.nickName = res.userInfo.nickName,
            that.data.avatarUrl = res.userInfo.avatarUrl,
            that.setData({
                nickName:that.data.nickName,
                avatarUrl:that.data.avatarUrl,
                hasUserInfo:true
            }),
            that.setData({
                db:'ok'
            })
            if(db = "ok"){
                var name,url;
                that.getInfo()
            }
            wx.login({
              success: function (res) {
                //console.log(res.code)
                //发送请求
                wx.request({
                  url: 'http://127.0.0.1/nannan/public/aaa', //仅为示例，并非真实的接口地址
                  data: {
                    code: res.code
                  },
                  method: 'GET', 
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                  },
                  success(res) {
                    //获取关注数
                    wx.request({
                      url: 'http://127.0.0.1/nannan/public/follow_num',
                      header: {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                      data: {
                          openid : res.data,
                        },
                      method: 'GET', 
                      success: function(res){
                        console.log(res)
                          that.setData({
                              follow_num:res.data.length
                          })
                      },
                      fail: function() {
                      },
                      complete: function() {
                      }
                  })
                  //获取被关注数
                  wx.request({
                      url: 'http://127.0.0.1/nannan/public/follow_pass',
                      header: {
                          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        },
                      data: {
                          openid : res.data,
                        },
                      method: 'GET', 
                      success: function(res){
                          that.setData({
                              follow_pass:res.data.length
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
        fail: function(res) {
            
        },
        complete: function() {
            // complete
        }
    })
    

  },
  //获取用户的信息(获取权限)
  info: function () {
    var that = this
    that.getInfo()
    that.onLoad()
  },
  //获取openid和用户基本信息
  getInfo:function(){
    var that = this
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        var city = res.userInfo.city
        var country = res.userInfo.country
        var nickName = res.userInfo.nickName
        var province = res.userInfo.province
        var avatarUrl = res.userInfo.avatarUrl
        that.setData({
          city: city,
          country: country,
          nickName: nickName,
          province: province,
          hasUserInfo: true
        })
        wx.login({
          success: function (res) {
            //console.log(res.code)
            //发送请求
            wx.request({
              url: 'http://127.0.0.1/nannan/public/aaa', //仅为示例，并非真实的接口地址
              data: {
                code: res.code
              },
              method: 'GET', 
              header: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              },
              success(res) {
                //console.log(res.data)
                that.setData({
                  openid: res.data
                })
                wx.request({
                  url: 'http://127.0.0.1/nannan/public/user',
                  header: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                     },
                  data: {
                      username : nickName,
                      userimg : avatarUrl,
                      openid : res.data
                  },
                  method: 'GET', 
                  success: function(res){
                    console.log(res.data)
                     that.setData({
                         article:res.data
                     })
                  },
              })

              }
            })
            
            
          }
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
        console.log(res)
    }
    return {
      title: '加入南南，一起打卡生活吧~',
      path: '/pages/index/index',
      imageUrl:'',
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  user_xin:function(res){
    wx.navigateTo({
        url: '/pages/pesonal/pesonal',
      })
  },
  previewImg(e){
    wx.previewImage({
      urls: [e.currentTarget.dataset.img],
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