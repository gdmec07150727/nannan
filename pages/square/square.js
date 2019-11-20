
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

  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1/nannan/public/cate',
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
      url: 'http://127.0.0.1/nannan/public/article',
      data:{
        id:that.data.cateid
      },
      method:'GET',
      success:function(res){
        that.setData({  
          article:res.data,
        })
      },
      fail:function(){
      },
      complete:function(){
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
      url: 'http://127.0.0.1/nannan/public/article',
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

})