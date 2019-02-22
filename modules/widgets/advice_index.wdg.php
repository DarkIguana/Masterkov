<?php 
class advice_index {
	var $over = "";
	function __construct(){
		$out="";
		$sql = mysql_query("select `id`, `name`, `text` from `advice` where `active`='1' order by rand() asc limit 1");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='	<div class="text4" ><b>Советы от Мастерков</b>
						<p><a class="lrefr" href="/advice">'.$row['name'].'</a></p>
						<p>'.$row['text'].'</p>
						<ul>
							<li><div><a href="/advice">Все советы</a></div></li>			
		
						</ul>
				
					</div>';
			}
			
		
			$this->over = $out;
		}
	}
}
?>


		
			
		
	
