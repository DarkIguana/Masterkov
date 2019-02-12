<?php 
class help_index {
	var $over = "";
	function __construct(){
		$out="";
		$sql = mysql_query("select `id`, `name`, `notice` from `articles` where `active`='1' and `cat_id`='1' order by `pos` asc limit 5");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out.='      <td>
					<h5>В помощь</h5>
					<ul>
			';
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<li><a href="?help='.$row['id'].'">'.$row['name'].'</a></li>';
			}
			
			$out.='<li><a href="?help">все разделы</a></li>';
			$out.='    	</ul>
				</td>
			';
			$this->over = $out;
		}
	}
}