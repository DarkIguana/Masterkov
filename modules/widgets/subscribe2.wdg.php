<?php
class subscribe2 {
	var $over = "";
	function __construct() {
		$out='';
		
		if (isset ( $_GET ['unsubscribe'] ) && ! empty ( $_GET ['unsubscribe'] ) && !class_exists('unsubscribe')) {
			$email = base64_decode ( urldecode($_GET ['unsubscribe']) );
			if (preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$em = addslashes ( $email );
				$test = mysql_result ( mysql_query ( "select `id` from `shop_users` where `email`='$em'" ), 0 );
				if ($test > 0) {
					mysql_query("update `shop_users` set `Mailed`='0' where `id`='{$test}'");
					$out = "<script>alert('�� ������� ���������� �� �������� ��������');</script>";
				} 
					
			}
		}
		$err = "";
		$email = isset ( $_POST ['email'] ) ? strtolower ( trim ( $_POST ['email'] ) ) : '';
		if (isset ( $_POST ['subscribe'] )) {
			
			if (empty ( $email )) {
				$err = "<script>alert('������� ���� email �����');</script>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$err = "<script>alert('Email ����� ����� �� �����');</script>";
			} else {
				$em = addslashes ( $email );
				$test = mysql_result ( mysql_query ( "select count(*) from `shop_users` where `email`='$em'" ), 0 );
				if ($test > 0) {
					$err = "<script>alert('������ Email ��� �������� �� ��������');</script>";
				} else {
					$pass = addslashes ( base64_encode ( $this->generate_password ( 7 ) ) );
					
					mysql_query ( "insert into `shop_users` (`email`, `pass`, `IPReg`, `IPLast`, `Type`, `TypeText`) values ('{$em}', '$pass', '{$_SERVER['REMOTE_ADDR']}', '{$_SERVER['REMOTE_ADDR']}', '1', '��������� � �����')" );
					$err = "<script>alert('������� �� ��������! ��� e-mail �������� � ����.');</script>";
				}
			}
		}
		
		$out .= '' . $err . '
                
                <form method="post" action="#subscribe" name="subscription_to_news">
			<fieldset>
				<ul>
					<li style="float:left"><input type="text" name="email" class="w324_2" value="������� ��� e-mail" onfocus="if(this.value==\'������� ��� e-mail\') this.value=\'\';" onblur="if(this.value==\'\') this.value=\'������� ��� e-mail\';" /></li>
					<li style="float:left"><input type="submit" name="subscribe" class="btn111_2" value=" " /></li>
				</ul>
			</fieldset>
		</form>';
		
		$this->over = $out;
	}
	function generate_password($number) {
		$arr = array ('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', ',', '(', ')', '[', ']', '!', '?', '&', '^', '%', '@', '*', '$', '<', '>', '/', '|', '+', '-', '{', '}', '`', '~' );
		$pass = "";
		for($i = 0; $i < $number; $i ++) {
			
			$index = rand ( 0, count ( $arr ) - 1 );
			$pass .= $arr [$index];
		}
		return $pass;
	}
}