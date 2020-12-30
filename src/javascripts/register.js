
    $(".logo-bg").click( function(){
      location.href ="./index.html"
    })

    class Register{
      constructor(){
          this.username=$("#username");
          this.password=$("#password");
          this.login_btn=$("#RegisterBtn");
          this.bindEvent();
          // this.url="http://localhost/server/sign.php"
      }
      bindEvent(){
          var _this=this;
          this.login_btn.click(function(){
              _this.submit();
          })
      }
      submit(){
          this.username_val=this.username.val();
          this.password_val=this.password.val();
          $.ajax({
              url:"http://localhost/server/sign.php",
              type:"GET",
              data:{
                  username:this.username_val,
                  password:this.password_val,
                  type:"register",
              },
              dataType:"json"
          }).then((res)=>{
              if(res.type==="success"){
                  alert("注册成功，两秒钟之后为您跳转至登录页面")
                    cookie("username",this.username_val)
                    cookie("password",this.password_val)
                  setTimeout(()=>{
                      location.href="./login.html"
                  })
              }else{
                  alert(res.errorType)
              }
          })
      }
  }
  new Register();