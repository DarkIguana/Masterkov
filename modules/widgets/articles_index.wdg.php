<?php 
class articles_index {
	var $over = "";
	function __construct(){
		$out="";
		$sql = mysql_query("select `id`, `name`, `notice` from `articles` where `active`='1' order by rand() asc limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<div class="advice">
                	<img src="template/default/img/advice-pic.png" alt="" class="advice-pic">
                    <div class="advice-ttl"><img src="template/default/img/advice-ttl.png" alt=""></div>
                    <div class="advice-link"><a href="?articles='.$row['id'].'">'.$row['name'].'</a></div>
                    <p>'.$row['notice'].'</p>
                    <a href="#" class="advice-refresh" row="'.$row['id'].'"><img src="template/default/img/ico-refresh.png" alt="">Следующий совет</a>
                </div>';
			}
			
		
			$this->over = $out;
		}
	}
}
