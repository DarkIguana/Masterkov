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

						<ul>
							<!-- <li><a href="#" class="refresh"><span>Следующий совет!!!!!!</span></a></li> -->
							<li><div><a href="/reviews">Все отзывы</a></div></li>			
						
						</ul>

						<!-- <a href="#" class="rev" id="reviewsb" ><span>Следующий отзыв</span></a> 
						<a class="rev" href="/reviews"></a> -->	
					</div>';
			}

			$this->over = $out;
		}
	}
}
?>


	
