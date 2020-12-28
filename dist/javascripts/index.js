"use strict";

$(function () {
  new Swiper("#swiper", {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 4000,
      //1秒切换一次
      disableOnInteraction: false
    }
  });
  $(".item-list").mouseover(function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  onscroll = function onscroll() {
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

    if (scrollTop > 90) {
      $(".head-content").css({
        display: "block",
        top: 36
      });
      $(".top-wrap").css({
        position: "fixed",
        top: 0
      });
    } else {
      $(".head-content").css({
        display: "none"
      });
      $(".top-wrap").css({
        position: "relative"
      });
    }
  };

  $(".temp-active").click(function () {
    location.href = "./active.html";
  });
  $("#delu").click(function () {
    console.log(1);
    location.href = "./login.html";
  });
  $("#zhuce").click(function () {
    location.href = "./register.html";
  });

  var jsq = function jsq() {
    var a = new Date(2020, 12, 31, 23, 10, 0, 0);
    var b = Date.now();
    var c = a.getTime() - b;
    var hour = parseInt(c / 1000 / 60 / 60) % 24;
    var minute = parseInt(c / 1000 / 60) % 60;
    var second = parseInt(c / 1000) % 60; // time-con.innerHTML = `<span class="ymjsq">  ${hour} </span> 
    //     <span class="ymjsq"> ${minute} </span>
    //     <span class="ymjsq"> ${second}  </span>`

    $(".time-con").html("<span class=\"hours\">".concat(hour, "</span>\n       <label>:</label>\n    <span class=\"minute\">").concat(minute, "</span>\n        <label>:</label>\n    <span class=\"seconds\">").concat(second, "</span>"));
  };

  setInterval(function () {
    jsq();
  }, 1000);
  jsq();
});