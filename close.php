<?php 
session_start();

$_SESSION['chat_status'] = isset($_POST['open'])?'open':'close';