<?php 
class catalog_price {
	var $over = '';
	function __construct(){
		if (class_exists('catalog')){
				$sql = mysql_query("select * from `pricelistfiles` where `catalog`='1' limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$row = mysql_fetch_assoc($sql);
			
			if (file_exists('files/pricelist/'."{$row['fileName']}_{$row['id']}.{$row['ext']}")){
			$this->over ='<a class="priceLink" target="_blank" href="files/pricelist/'."{$row['fileName']}_{$row['id']}.{$row['ext']}".'">
			<img alt="" src="template/default/img/pic133.gif"></a><br />';
			}
		}
		
		}
	}
}