
    $(".reg_link").click( function(){
      location.href ="./register.html"
    })
    $(".logo-bg").click( function(){
      location.href ="./index.html"
    })
    
 class Login{
      constructor(){
          this.username=$("#username")
          this.password=$("#password")
          this.login_btn=$("#login_btn")
          this.init();
          this.bindEvent();
          this.url="http://localhost/server/sign.php";
      }
      init(){
          var username_cookie=getCookie("username")
          var password_cookie=getCookie("password")
        //   console.log(username_cookie)
          if(password_cookie&&username_cookie){
              this.username.val(username_cookie);
              this.password.val(password_cookie);
          }else{
              return false;
          }
      }
      bindEvent(){
          this.login_btn.on("click",()=>{
              this.submit();
          })
      }
      submit(){
          $.ajax({
              url:this.url,
              type:"GET",
              data:{
                  username:this.username.val(),
                  password:this.password.val(),
                  type:"login"
              },
              dataType:"json"
          }).then((res)=>{
              if(res.type==="success"){
                  alert("登陆成功，2秒后为您跳转主页")
                    cookie("username",this.username.val());
                    cookie("password",this.password.val());
                    cookie("url",res.url)
                  setTimeout(()=>{
                      location.href="./index.html"
                  })
              }else{
                  alert(res.errorType)
              }
          })
      }
  }
  new Login();