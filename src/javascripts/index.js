
$(function(){
  new Swiper("#swiper" , {
      
    loop:true,
    pagination: {
      el: '.swiper-pagination',
      clickable:true
    },
    autoplay: {
      delay: 4000,//1秒切换一次
      disableOnInteraction:false,
    }
  });
  $(".item-list").mouseover(function(){
        $(this).addClass("active")
        .siblings().removeClass("active");
        
  
  })
  onscroll = function(){
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    if(scrollTop > 90){
      $(".head-content").css({
         display:"block",
         top: 36,
        
      })
      $(".top-wrap").css({
          position: "fixed",
          top: 0,
          
      })
      
    }else{
      $(".head-content").css({
        display:"none",
        
     })
    
    $(".top-wrap").css({
      position: "relative", 
     })
    }
  }
  $(".temp-active").click( function(){
    location.href ="./active.html"
  })
  $("#delu").click( function(){
    console.log(1);
    location.href ="./login.html"  
  })
  $("#zhuce").click( function(){
    location.href ="./register.html"
  })
  let jsq= () => {
    let a = new Date(2020, 12, 31, 23, 10, 0, 0);
    let b = Date.now();
    let c = a.getTime() - b;
    
    let hour = parseInt(c / 1000 / 60 / 60) % 24;
    let minute = parseInt(c / 1000 / 60) % 60;
    let second = parseInt(c / 1000) % 60;
    // time-con.innerHTML = `<span class="ymjsq">  ${hour} </span> 
    //     <span class="ymjsq"> ${minute} </span>
    //     <span class="ymjsq"> ${second}  </span>`
    $(".time-con").html(`<span class="hours">${hour}</span>
       <label>:</label>
    <span class="minute">${minute}</span>
        <label>:</label>
    <span class="seconds">${second}</span>`)
    
    }
    setInterval(function () {
    jsq();
    }, 1000)
    jsq();
})