<?php 
class flag {
	var $over = "";
	function __construct(){
		$sql = mysql_query("select * from `site_setting` where `option`='sk'");
		if (is_resource($sql) && mysql_num_rows($sql) && ($row = mysql_fetch_assoc($sql)) && $row['value']==1){
			$this->over='<div class="spec"><a href="?pages=10"><span>Спецпредложение</span></a></div>';
		}
	}
}