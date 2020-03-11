Page({

  /**
   * 页面的初始数据
   */
  data: {
    guan:'false'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
    wx.login({
        success: function(res){
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
                    that.setData({
                    openid: res.data
                    })
                    wx.request({
                        url: 'https://hungking.top/nannan/public/follow_pass',
                        data: {
                            openid:res.data
                        },
                        method: 'GET', 
                        success: function(res){
                            console.log(res.data)
                            that.setData({
                                foll:res.data,
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
                    // fail
                },
                complete: function() {
                    // complete
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