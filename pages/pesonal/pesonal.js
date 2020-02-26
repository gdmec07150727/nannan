Page({

  data: {
    source:'',
    imgPath:null,
    userimg:'',
    dizhi:'http://127.0.0.1/nannan/public/static/upload/weixin/'
  },

  uploadimg: function () {
    var that = this;
    wx.chooseImage({  //从本地相册选择图片或使用相机拍照
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //前台显示
        console.log(res.tempFilePaths)
        that.setData({
          imgPath: res.tempFilePaths
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'http://127.0.0.1/nannan/public/uploadimg',
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
              var rrr = JSON.parse(res.data)
              console.log(rrr.replace('\\','/'))
            that.setData({
              userimg:rrr.replace('\\','/')
            })
          }
        })
      }
    })
  },

  formSubmit: function (e) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/nannan/public/user_edit',
      method:'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
       },
      data:{
        'img':that.data.userimg,
        'newname':e.detail.value.username,
        'username':that.data.nickName,
        openid:that.data.openid
      },
      success:function(res){
          console.log(that.data.path)
        if(res.data.state==1){
          wx.showToast({
            title: '提交成功'
          })
          that.onLoad()
        }else{
          wx.showToast({
            title: '提交失败'
          });
        }
      },
      fail:function(){

      },
      complete:function(){

      }
    })
    
  },

  onLoad: function (options) {
    var that = this;
    var nickName = that.data.nickName;
    var path = that.data.avatarUrl;
    wx.getUserInfo({
        success: function(res){
            that.data.nickName = res.userInfo.nickName,
            that.data.avatarUrl = res.userInfo.avatarUrl,
            that.setData({
                nickName:that.data.nickName,
            })
            wx.login({
              success: function(res){
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
                      openid:res.data
                    })
                    wx.request({
                      url: 'http://127.0.0.1/nannan/public/user_lst',
                      header: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                       },
                       data:{
                        openid:res.data
                       },
                      method: 'GET', 
                      success: function(res){
                          console.log(res.data)
                          that.setData({
                            user:res.data,
                            userimg:res.data.userimg
                          })
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
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
            
        },
        fail: function() {
        },
        complete: function() {
        }
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

  
})