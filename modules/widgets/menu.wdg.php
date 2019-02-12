<?php
class menu {
	var $over = "";
	function __construct() {
		$out = "";
		$t = 0;
		
		$sql = mysql_query ( "select * from `price_cat` where `parentId`='0' order by `sort`" );
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out.=' <div class="catalog">
                <h2>Каталог товаров</h2>
                <ul>';
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<li><a href="?catalog&catid='.$row['id'].'">'.$row['name'].'</a>';
			}
			$out.='   </ul>
            </div>';
		}
		$this->over = $out;
	}
}