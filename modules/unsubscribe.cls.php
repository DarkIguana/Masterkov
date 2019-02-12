<?php
class unsubscribe {
	var $over = "";
	function __construct() {
		$_SESSION ['Titles'] ['title'] .= " / Отписаться от рассылки новостей";
		$_SESSION ['Road'] .= "Отписаться от рассылки новостей";
		$out = '';
		$err='';
		if (isset ( $_POST ['unsubscribe'] )) {
			$email = $_POST ['email'];
			if (preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$em = addslashes ( $email );
				$test = mysql_result ( mysql_query ( "select `id` from `shop_users` where `email`='$em'" ), 0 );
				if ($test > 0) {
					mysql_query ( "update `shop_users` set `Mailed`='0' where `id`='{$test}'" );
					$out .= "<script>alert('Вы успешно отписались от рассылки новостей');</script>";
				}
				else {
					$out .= "<script>alert('Введеный Email адрес не найден');</script>";
				}
			
			}
			else {
				$out .= "<script>alert('Не правильно введен Email адрес');</script>";
			}
		}
		
		$this->over .= "<p class='zag1'>Отписаться от рассылки<br/> новостей</p><p>&nbsp;</p><p>{road}</p>";
		$out .= $err . '<p>&nbsp;</p>
		<p style="padding-left:35%"><strong>Отписаться от рассылки новостей:</strong></p>
		<form method="post"  name="subscription_to_news">
                
                   
                   <center><input style="width:30%" type="text" value="Введите ваш e-mail" onclick="if (this.value==\'Введите ваш e-mail\'){this.value=\'\'}" name="email" /></center><br/>
                 <center> <input type="submit" name="unsubscribe" style="border:1px solid #cccccc" value="Отписаться" /></center>
                
                </form>';
		$this->over .= $out;
	}
}