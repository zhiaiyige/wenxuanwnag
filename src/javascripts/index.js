

  //轮播图
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
  //手风琴效果
  $(".item-list").mouseover(function(){
        $(this).addClass("active")
        .siblings().removeClass("active");
        
  
  })
  

  //各页面跳转
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

  //文轩倒计时
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
    //回到顶部
    $(".backtop").click(function(){
      scrollTo({
        top: 0, 
        behavior: "smooth" 
       })
    })     
   
  //楼梯效果
   $(".nav-item_2").click(function(){
    scrollTo({
      top: 0, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(0)").click(function(){
    scrollTo({
      top: 760, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(1)").click(function(){
    scrollTo({
      top: 1640, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(2)").click(function(){
    scrollTo({
      top: 3100, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(3)").click(function(){
    scrollTo({
      top: 5100, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(4)").click(function(){
    scrollTo({
      top: 5660, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item:eq(5)").click(function(){
    scrollTo({
      top: 5900, 
      behavior: "smooth" 
     })
  })  
   $(".nav-item_1").click(function(){
      alert("没有客服");
  })  
   $(".nav-item_2").click(function(){
    scrollTo({
      top: 0, 
      behavior: "smooth" 
     })
  })  

//吸顶导航栏
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
  if(scrollTop > 760){
    $(".left-nav").css({
      transform: "scale(1)",
      transition: "all .3s",
     
    })
  }else{
    $(".left-nav").css({
      transform: "scale(0)",
     
    })
  }
}

 //楼梯滚动效果

//动态页面渲染

// var container = document.querySelector(".box");
// var contorn = document.querySelector(".bxo"); 
//    var xhr = new XMLHttpRequest();
 
//    xhr.open("GET" , "./libs/data.json");
//    xhr.send(null);
//    xhr.onload = function(){
//          var list = JSON.parse( xhr.responseText ); 
//          var html = list.map( function(item ){
//               return  `<div class="bt-col" >
//                             <img src="${item.image}" alt="">
//                                  <div class="name">
//                                        ${item.name}
//                                 </div>
//                                 <div class="author">
//                                        ${item.author}
//                                    </div>
//                            <div class="price">
//                               <span class="price-l"> ${item.pricelf}</span>
//                            <span class="price-r"> ${item.pricerg}</span>
//                           </div>
//                          </div>`;

//          }).join("");
//          container.innerHTML += html;
//          contorn.innerHTML += html;

//    }     
$.ajax({
  url:"./libs/data.json",
  type:"get",
  datatype:"json"
})
.then(function(res){
  console.log(res);
  var list = res; 
  console.log(list);
  var html = list.map( function(item ){
    return  `<div class="bt-col" >
                   <img data-src="${item.image}" alt="">
                      <div class="name">
                         ${item.name}
                      </div>
                      <div class="author">
                         ${item.author}
                      </div>
                      <div class="price">
                       <span class="price-l"> ${item.pricelf}</span>
                       <span class="price-r"> ${item.pricerg}</span>
                      </div>
          </div>`
  }).join("");
  $(".box").html(html).find("img").lazyload();
  $(".bxo").html(html).find("img").lazyload();
}) 