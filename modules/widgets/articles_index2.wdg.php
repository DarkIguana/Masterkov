<?php 
class articles_index2 {
	var $over = "";
	function __construct(){
		$out="";
		$sql = mysql_query("select `id`, `name`, `notice` from `articles` where `active`='1' order by rand() asc limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<div class="advice2">
                				<div class="advice-link"><a href="?articles='.$row['id'].'">'.$row['name'].'</a></div>
                   				<p>'.$row['notice'].'</p>
						<div class="adviceGoldLink"><a  href="/advice">Все советы</a></div>	

                  				 <!-- <a href="#" class="advice-refresh" update="advice2" row="'.$row['id'].'">
							<img src="template/default/img/ico-refresh.png" alt="">Следующий совет </a> -->
              				  </div>';
			}
			
		
			$this->over = $out;
		}
	}
}
