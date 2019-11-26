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
    var nickName = that.data.nickName;
    var avatarUrl = that.data.avatarUrl;
    var db = "no";
    //获取用户信息
    wx.getUserInfo({
        success: function(res){
            that.data.nickName = res.userInfo.nickName,
            that.data.avatarUrl = res.userInfo.avatarUrl,
            that.setData({
                nickName:that.data.nickName,
                avatarUrl:that.data.avatarUrl,
            }),
            that.setData({
                db:'ok'
            })
            if(db = "ok"){
                var name,url;
                wx.request({
                    url: 'http://127.0.0.1/nannan/public/user',
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                       },
                    data: {
                        username : res.userInfo.nickName,
                        userimg : res.userInfo.avatarUrl
                    },
                    method: 'GET', 
                    success: function(res){
                      console.log(res.data[0])
                       that.setData({
                           article:res.data
                       })
                       
                    },
                    fail: function() {
                        console.log("fail")
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
            //获取关注数
            wx.request({
                url: 'http://127.0.0.1/nannan/public/follow_num',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                  },
                data: {
                    username : res.userInfo.nickName,
                  },
                method: 'GET', 
                success: function(res){
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
                    username : res.userInfo.nickName,
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
        },
        fail: function(res) {
            
        },
        complete: function() {
            // complete
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
        //url: '/pages/pesonal/pesonal',
      })
  }

  
})