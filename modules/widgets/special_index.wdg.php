<?php 
class special_index {
	var $over = '';
	function __construct(){
		$out ='';
		$sql = mysql_query("select `articles`.`id`, `articles`.`name`, `articles_img`.`id` as `idImage`, `articles_img`.`ext` from `articles`, `articles_img` where `articles_img`.`iditem`=`articles`.`id` and `articles`.`active`='1' group by `articles`.`id` order by rand()");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out.='<div class="block243" onclick="location.href="?special""><a href="?special">Спецпредложения<span>Спецпредложения</span></a></div>
		
		<div class="galHolder">
			<ul id="carousel" class="jcarousel-skin-tango">
				';
			while (($row = mysql_fetch_assoc($sql))!=false){
				$out.='<li><a href="?special='.$row['id'].'"><span>'.$row['name'].'<img src="template/default/img/bg19.gif" alt="" /></span><img src="/image.php?width=220&height=134&image=files/articles/o_'.$row['idImage'].'.'.$row['ext'].'" alt="" /></a></li>';
			}
			$out.='			</ul>
		</div>
		
		<a class="more3" href="?special">Все предложения</a>';
		}
		$this->over = $out;
	}
}