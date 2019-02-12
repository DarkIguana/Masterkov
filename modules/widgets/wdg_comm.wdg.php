<?php 
class wdg_comm {
	var $over = "";
	function __construct(){
		$out = "";
		$sql = mysql_query("select * from `reviews` where `active`!=2 order by rand() desc limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$row = mysql_fetch_assoc($sql);
			$out.='  
					
					 <div class="review">
                	<img src="template/default/img/review-pic.png" alt="" class="review-pic">
                    <div class="review-ttl"><img src="template/default/img/review-ttl.png" alt=""></div>
                    <p>'.nl2br(trim($row ['text'])).'</p>
                    <div class="review-author">'.$row['name'].'</div>
                    <a href="#" class="review-refresh" row="'.$row['id'].'"><img src="template/default/img/ico-refresh.png" alt="">Следующий отзыв</a>
                </div>
					
					
				 
			';
			
		}
		$this->over = $out;
	}
}