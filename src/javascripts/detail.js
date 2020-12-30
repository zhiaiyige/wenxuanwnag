$(".master-logo").click( function(){
      location.href ="./index.html"
})
$(".temp-active").click( function(){
      location.href ="./active.html"
    })


function Magnifier(){
    this.small_ele = $(".small");
    this.small_img_ele = $(".small img");
    this.mask_ele  = $(".mask");
    this.big_ele   = $(".big");
    this.big_img_ele = $(".big img");
    this.container_ele = $(".info-side");
    // this.list_imgs  = $(".list img");
//     this.src_list = [
//           {
//                 small : "./images/small.jpg",
//                 big : "./asset/1.big.jpg"
//           },
//           {
//                 small : "./asset/2.jpg",
//                 big : "./asset/2.big.jpg"
//           }
//     ];
    this.bindEvent();
    this.init();
}
Magnifier.prototype.bindEvent = function(){
    var _this = this;
    // 给small绑定事件; 
    this.small_ele.mouseover(function(){
          // this => DOM对象; 
          _this.toggle("block");
    });
    this.small_ele.mouseout(function(){
          _this.toggle("none");
    });
    // 给small绑定鼠标移动事件; 
    this.small_ele.mousemove(function( evt ){
          var e = evt || event;

          var x = e.pageX ; 
          var y = e.pageY ; 
          

          _this.maskMove( x , y );
    });
    // this.list_imgs.mouseover(function(){
    //       var i = $(this).index(".list img") ;
    //       console.log(i , _this.src_list);
    //       _this.changeImage( _this.src_list[i].big , _this.src_list[i].small , this);
    // });
};
// 显示隐藏功能
Magnifier.prototype.toggle = function( type ){
    this.mask_ele.css({
          display : type
    });
    this.big_ele.css({
          display : type
    });
}
Magnifier.prototype.init  = function(){
    // 1. 获取数据 : 
    // 获取small的宽高; 
    this.small_size = this.small_ele.width();
    this.big_img_size =  this.big_img_ele.width();
    this.big_size =  this.big_ele.width();
    this.mask_size = this.small_size / this.big_img_size * this.big_size;
    // 给mask赋值; 
//     console.log(this.small_size,this.big_img_size,this.big_size)
    this.mask_ele.css({
          width : this.mask_size ,
          height : this.mask_size
    }) ;
    // 获取container根据浏览器可是窗口的偏移; 
    this.offset_left = this.container_ele.offset().left;
    this.offset_top = this.container_ele.offset().top;

};
Magnifier.prototype.maskMove = function( x , y ){
    // 处理x,y ; 
    var _left = x - this.mask_size / 2 - this.offset_left;
    var _top  = y - this.mask_size / 2 - this.offset_top;
    // 边界检测; 
    // - 最小值
    _left = _left < 0 ? 0 : _left;
    _top  = _top  < 0 ? 0 : _top;
    //  - 最大值
    var max = this.small_size - this.mask_size;
    _left = _left > max ? max : _left;
    _top  = _top  > max ? max : _top ; 

    this.mask_ele.css({
          left : _left ,
          top  : _top 
    });

    // 计算百分比 : 
    var _left_prop = _left / ( this.small_size - this.mask_size);
    var _top_prop  = _top  / ( this.small_size - this.mask_size);

    this.bigImageMove(_left_prop , _top_prop);
};

Magnifier.prototype.bigImageMove = function( _left_prop , _top_prop){
    this.big_img_ele.css({
          left : _left_prop * ( this.big_size - this.big_img_size) , 
          top  : _top_prop * ( this.big_size - this.big_img_size)
      
    });
};
// Magnifier.prototype.changeImage = function( big , small , ele){
//     this.big_img_ele.attr("src" , big);
//     this.small_img_ele.attr("src" , small);
   
//     $(ele).addClass("active")
//     .siblings()
//     .removeClass("active");
// };

new Magnifier();