<?php
class unsubscribe {
	var $over = "";
	function __construct() {
		$_SESSION ['Titles'] ['title'] .= " / ���������� �� �������� ��������";
		$_SESSION ['Road'] .= "���������� �� �������� ��������";
		$out = '';
		$err='';
		if (isset ( $_POST ['unsubscribe'] )) {
			$email = $_POST ['email'];
			if (preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$em = addslashes ( $email );
				$test = mysql_result ( mysql_query ( "select `id` from `shop_users` where `email`='$em'" ), 0 );
				if ($test > 0) {
					mysql_query ( "update `shop_users` set `Mailed`='0' where `id`='{$test}'" );
					$out .= "<script>alert('�� ������� ���������� �� �������� ��������');</script>";
				}
				else {
					$out .= "<script>alert('�������� Email ����� �� ������');</script>";
				}
			
			}
			else {
				$out .= "<script>alert('�� ��������� ������ Email �����');</script>";
			}
		}
		
		$this->over .= "<p class='zag1'>���������� �� ��������<br/> ��������</p><p>&nbsp;</p><p>{road}</p>";
		$out .= $err . '<p>&nbsp;</p>
		<p style="padding-left:35%"><strong>���������� �� �������� ��������:</strong></p>
		<form method="post"  name="subscription_to_news">
                
                   
                   <center><input style="width:30%" type="text" value="������� ��� e-mail" onclick="if (this.value==\'������� ��� e-mail\'){this.value=\'\'}" name="email" /></center><br/>
                 <center> <input type="submit" name="unsubscribe" style="border:1px solid #cccccc" value="����������" /></center>
                
                </form>';
		$this->over .= $out;
	}
}