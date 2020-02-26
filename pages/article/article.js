Page({

  /**
   * 页面的初始数据
   */
  data: {
    guan:'false',
    hideModal: true, //模态框的状态  true-隐藏  false-显示
    animationData: {},//
    a:'true'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/nannan/public/arti_det?id='+options.id,
      data: {},
      method: 'GET', 
      success: function(res){
        console.log(res.data[0].openid)
        that.setData({
          detail:res.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.login({
      success: function (res) {
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
            that.setData({
              openid:res.data
            })
            wx.request({
              url: 'http://127.0.0.1/nannan/public/guan',
              data: {
                openid:res.data,
                id:options.id
              },
              method: 'GET', 
              success: function(res){
                console.log(res.data)
                that.setData({
                  guan:res.data
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
      }
    })
    wx.request({
      url: 'http://127.0.0.1/nannan/public/comm',
      data: {
        art_id:options.id
      },
      method: 'GET', 
      success: function(res){
        console.log(res)
        that.setData({
          com:res.data,
          com_num:res.data.length
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
  guan:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1/nannan/public/follow_add',
      data: {
        uopenid:that.data.openid,
        fopenid:that.data.detail[0].openid
      },
      method: 'GET', 
      success: function(res){
        that.setData({
          guan:res.data
        })
        that.onLoad()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  del:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1/nannan/public/follow_del',
      data: {
        fopenid:that.data.detail[0].openid
      },
      method: 'GET', 
      success: function(res){
        that.setData({
          guan:res.data
        })
        that.onLoad()
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },

  // 显示遮罩层
  showModal: function () {
    var that = this;
    that.setData({
      hideModal: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    setTimeout(function () {
      that.fadeIn();//调用显示动画
    }, 200)
  },

  // 隐藏遮罩层
  hideModal: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })
    this.animation = animation
    that.fadeDown();//调用隐藏动画   
    setTimeout(function () {
      that.setData({
        hideModal: true
      })
    }, 720)//先执行下滑动画，再隐藏模块

  },

  //动画集
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })
  },
  fadeDown: function () {
    this.animation.translateY(300).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent: e.detail.value,
    })
  },
  formSubmit:function(){
    var that = this
    wx.request({
      url: 'http://127.0.0.1/nannan/public/com_add',
      data: {
        art_id:that.data.detail[0].id,
        uopenid:that.data.openid,
        content:that.data.concent
      },
      method: 'GET', 
      success: function(res){
        console.log("success")
        that.hideModal()
        
      },
      fail: function() {
        // fail
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})