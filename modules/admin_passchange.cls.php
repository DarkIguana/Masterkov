<?
class admin_passchange_admin extends admin {
	function __construct() {
	
	}
	function PassChange() {
		$sql = mysql_query ( "select * from users where login='$_SESSION[admin]'" );
		$row = mysql_fetch_array ( $sql );
		$oldpass = md5 ( $_POST ['oldpass'] );
		if ($oldpass != $row ['password']) {
			echo "{failure: true, msg: '1'}";
		} else {
			$newpass = mysql_real_escape_string ( md5 ( $_POST ['newpass'] ) );
			$ss = mysql_query ( "update users set password='$newpass' where id='$row[id]'" );
			echo "{success: true}";
		}
	}
}