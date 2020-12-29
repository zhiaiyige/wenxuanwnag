

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
  }

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
    //楼梯滚动效果
    onscroll = function(){
      var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
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
      top: 2000, 
      behavior: "smooth" 
     })
  })  


//动态页面渲染

var container = document.querySelector(".box");
// document.onscroll = function(){
   // 1. 发送请求: 
   var xhr = new XMLHttpRequest();
   // url : 因为我们请求发起的html文件一定是服务器上的文件; 
   // 所以我们可以选择使用相对路径; 
   xhr.open("GET" , "./libs/data.json");
   xhr.send(null);

   // 2. 接受响应 : 
   xhr.onload = function(){
         // 我们获取的响应 结果一定是字符串; 
         // console.log(xhr.responseText);
         // 把字符串变成数组对象数组形式; 
         // JSON.parse => 字符串转换成数组对象形式，方便我们增删改查; 
         var list = JSON.parse( xhr.responseText ); 
         // console.log(list);
         // 使用之前的字符串拼接方案处理这个数组即可; 
         var html = list.map( function(item ){
              return  `<div class="bt-col" >
                            <img src="${item.image}" alt="">
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
                         </div>`;

         }).join("");
         container.innerHTML += html;
   }     
// }

