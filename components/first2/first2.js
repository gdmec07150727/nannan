// components/first2/first2.js
Component({
  /**
   * 组件的属性列表
   */
  
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    map:function(){
      wx.navigateTo({
        url: '/pages/map/map',
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
    school:function(){
      wx.navigateTo({
        url: '/pages/school/school',
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
    data:function(){
      wx.navigateTo({
        url: '/pages/calen/calen',
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
    }
  }
})
