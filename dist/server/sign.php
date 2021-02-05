<?php

# 1. 获取前端的数据
$username = $_GET["username"];
$password = $_GET["password"];
$type     = $_GET["type"];
# 默认头像地址; 
$url = "http://note.youdao.com/yws/public/resource/7e404b39691042c5addf546b840b06b5/xmlnote/EFA672AF6B404EDF9C9C2B6DCCD5470C/6160";

$conn = mysqli_connect("localhost" , "root" , "root", "bk2007");
if($type === "register"){
      # 查询语句
      $sql = "SELECT * FROM `usertable` WHERE `username`='$username'";
      # 登陆的sql语句; 
      # "SELECT * FROM `usertable` WHERE `username`='$username' AND `password`='$password'";
      # 执行查询语句 
      $res = mysqli_query( $conn , $sql );

      # 如果while语句执行了那么则表示我们的用户名重复了; 
      # 如果我们的查询语句没有查到结果那么 mysqli_fetch_assoc 结果应该是 null; 
      if( mysqli_fetch_assoc($res) ){
            mysqli_close($conn);
            die('{"type" : "error" , "msg":"用户名重复"}');
      }
      # - 编写sql语句 ; 
      $sql = "INSERT INTO `usertable` (`username` , `password` , `url` ) VALUES ('$username' , '$password', '$url')";
      # - 执行sql语句;
      $res = mysqli_query($conn , $sql);
      if(!$res){
            die(mysqli_error($conn));
      }
      echo '{"type" : "success"}';
      mysqli_close($conn);
}else{
      $sql = "SELECT * FROM `usertable` WHERE `username`='$username' AND `password`='$password'";
      $res = mysqli_query( $conn , $sql );
      if( $row = mysqli_fetch_assoc($res) ){
            mysqli_close($conn);
            $row["type"] = "success";
            $row["msg"] = "登录成功";
            // 加密密码
            $row["password"] = md5($row["password"]);
            die(json_encode($row));
      }else{
            die('{"type" : "error" , "msg":"登录失败"}');
      }
}

