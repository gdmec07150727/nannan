const app = getApp()
var form_data;
var psw_vaule = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '晒晒日常' },
      { bindtap: 'Menu2', txt: '我的校园' },
      { bindtap: 'Menu3', txt: '吃喝玩乐' },
      { bindtap: 'Menu4', txt: '热衷打卡' }
    ],
    lab:'选择标签值',
    cateid:'',
    tempFilePaths: [],
    img_arr: [],
    concent:'',
  },
  //选择标签
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden,
    })
    console.log(this.data.cateid)
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function () {
    this.setData({
      lab: '晒晒日常',
      actionSheetHidden: !this.data.actionSheetHidden,
      cateid:'1'
    })
  },
  bindMenu2: function () {
    this.setData({
      lab: '我的校园',
      actionSheetHidden: !this.data.actionSheetHidden,
      cateid:'2'
    })
  },
  bindMenu3: function () {
    this.setData({
      lab: '吃喝玩乐',
      actionSheetHidden: !this.data.actionSheetHidden,
      cateid:'3'
    })
  },
  bindMenu4: function () {
    this.setData({
      lab: '热衷打卡',
      actionSheetHidden: !this.data.actionSheetHidden,
      cateid:'4'
    })
  },
  //标签--end
  //获取textarea的值
  bindTextAreaBlur: function (e) {
    console.log(e.detail.value)
    this.setData({
      concent: e.detail.value,
    })
  },
  //上传图片到服务器 
  formSubmit: function () {
    var that = this
    var adds = that.data.img_arr;
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        url: 'http://127.0.0.1/nannan/public/ara',
        filePath: adds[0],
        name: 'file', 
        header: {
          'content-type': 'application/json'
        },
        formData:{
          'txt':that.data.concent,
          'cateid':that.data.cateid,
          'username':that.data.nickName,
          'picture':that.data.avatarUrl,
          'openid':that.data.openid
        },
        success: function (res) {
          //打印
          console.log(res.data)
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
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
      })
    }
    this.setData({
      formdata: ''
    })
  },
  //从本地获取照片 
  upimg: function () {
    var that = this;
    if (this.data.img_arr.length < 3) {
      wx.chooseImage({
        count: 1,        //一次性上传到小程序的数量     
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          const tempFilePaths = res.tempFilePaths
          console.log(res.tempFilePaths)
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多上传三张图片',
        icon: 'loading',
        duration: 2000
      })
    }
  },
  //删除照片功能与预览照片功能 
  deleteImg: function (e) {
    var that = this;
    var img_arr = that.data.img_arr;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          img_arr.splice(index, 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          img_arr: img_arr
        });
      }
    })
  },
  previewImg: function (e) {
    var index = e.currentTarget.dataset.index;
    var img_arr = this.data.img_arr;
    wx.previewImage({
      current: img_arr[index],
      urls: img_arr
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function(res){
        // success
            that.data.nickName = res.userInfo.nickName,
            that.data.avatarUrl = res.userInfo.avatarUrl,
            that.setData({
                nickName:that.data.nickName,
                avatarUrl:that.data.avatarUrl,
                hasUserInfo:true
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
                    console.log(res.data)
                    that.setData({
                      openid: res.data
                    })
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