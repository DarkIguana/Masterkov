<?php 
class pricelist {
	var $over = '';
	function __construct(){
		$out = '';
		$sql = mysql_query("select * from `pricelistfiles` where `active`='1' order by `catalog` desc, `pos` asc");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out .='<div class="dnlBlock"><h5>Скачать прайс-листы</h5><ul>';
			while (($row = mysql_fetch_assoc($sql))!=false){
				if (file_exists('files/pricelist/'."{$row['fileName']}_{$row['id']}.{$row['ext']}")){
				     $out.='<li><a target="_blank" href="files/pricelist/'."{$row['fileName']}_{$row['id']}.{$row['ext']}".'">'.$row['name'].'</a></li>';
				}
			}
			$out.='</ul></div>';
		}
		$this->over = $out;
	}
}
