const app = getApp()

Page({
  data:{
    
  },
  onLoad:function(){
    var that = this;
    wx.request({
      url: 'https://hungking.top/nannan/public/news',
      method:'GET',
      success:function(res){
        that.setData({
          news:res.data
        })
      },
      fail:function(){
      },
      complete:function(){
      }
    })
  },
  news:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/news_detail/news_detail?id='+id,
    })
  }
})