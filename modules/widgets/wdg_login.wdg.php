<?php 
class wdg_login {
	var $over = '';
	function __construct(){
		if (Users::iUser()==true){
			$this->over = '<a href="?lk">'.Users::$row['email'].'</a><a href="?lk&logout">�����</a>';
		}
		else {
			$this->over = '<a href="?lk">����</a><a href="?reg">�����������</a>';
		}
	}
}