<?php

  $username = $_POST['username'];
  $password = $_POST['password'];

  // 准备查询数据库进行验证
  $conn = mysql_connect('localhost', 'root', 'root');
  mysql_select_db('test');

  $sql = "SELECT * FROM `denglu` WHERE `username`='$username' AND `password`='$password'";
  $res = mysql_query($sql);

  if (!$res) {
    die('执行 sql 语句出错 ' . mysql_error());
  }

  // 如果能来到这里证明 执行 sql 语句没错
  // 解析结果
  $row = mysql_fetch_assoc($res);

  if ($row) {
    // 证明登录成功
    echo json_encode(array(
      "message" => "登录成功",
      "code" => 1
    ));
  } else {
    // 登录失败
    echo json_encode(array(
      "message" => "登录失败",
      "code" => 0
    ));
  }

  mysql_close();

?>
