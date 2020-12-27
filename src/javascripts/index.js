 new Swiper("#swiper" , {
      autoplay: {
            delay: 4000,//1秒切换一次
          },
          pagination: {
            el: '.swiper-pagination',
          },
 });
        
 $(function(){
  $(".item-list").mouseover(function(){
        $(this).addClass("active")
        .siblings().removeClass("active");
        
  
  })
})