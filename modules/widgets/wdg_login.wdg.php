<?php 
class wdg_login {
	var $over = '';
	function __construct(){
		if (Users::iUser()==true){
			$this->over = '<a href="?lk">'.Users::$row['email'].'</a><a href="?lk&logout">Выйти</a>';
		}
		else {
			$this->over = '<a href="?lk">Вход</a><a href="?reg">Регистрация</a>';
		}
	}
}