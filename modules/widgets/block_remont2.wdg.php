<?php 
class block_remont2 {
var $over = '';
	function __construct(){
		$limit ='';
		if (getenv('REQUEST_URI')=='/'){
			//$limit = ' limit 4';
		}
		$out = '';
		$sql = mysql_query("select `Id`, `Title` from `pages` where `Active`='1' and `inMenu`='1' and `parentId`='9' order by `module` {$limit}");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out.='<ul>';
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<li><a href="?pages='.$row['Id'].'">'.$row['Title'].'</a></li>';
			}
			$out.='</ul>';
		}
		$this->over = $out;
	}
}