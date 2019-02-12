<?php
class email_admin {
	var $over = "";
	function __construct() {
	   $this->over = $this->getEmailAdmin();
	}
	function getEmailAdmin() {
		$sql = mysql_query ( "select * from `site_setting` where `option`='email_admin'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return "mailto:".$row ['value'];
		}
		return "#";
	}
}