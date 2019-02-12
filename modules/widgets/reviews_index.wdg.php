<?php 
class reviews_index {
	var $over = "";
	function __construct(){
		$out="";
		$sql = mysql_query("select `id`, `name`, `text` from `reviews` where `active`='1' order by rand() asc limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<div class="text3">
		<b>Отзыв о ремонте</b>
		<p>'.$row['text'].'<span><span>'.$row['name'].'</span></span></p>
		<a href="#" class="rev" id="reviewsb" ><span>Следующий отзыв</span></a>
	</div>';
			}

			$this->over = $out;
		}
	}
}
?>


	