<?php 
class publications {
	var $over = ''; 
	static $TitlePage = 'Публикации';
	//var $params = array('template'=>'publ');
	function __construct(){
		$out='';
		$_SESSION['Titles']['title'].=' / Публикации';
		$_SESSION['Road'].='Публикации';
		$nowPage = isset($_GET['page'])?(int)$_GET['page']:1;
		if ($nowPage<1){
			$nowPage = 1;
		}
		$page = $nowPage-1;
		$limit = 7;
		$start = abs($limit*$page);
		$sql = mysql_query("select * from `files` where `active`='1' order by `pos` limit {$start}, {$limit}");
		if (is_resource($sql) && mysql_num_rows($sql)>0){
			$out.='<ul class="list2">';
			while (($row = mysql_fetch_assoc($sql))!=false){
				if (file_exists('files/publications/'.$row['fileName'].'_'.$row['id'].'.'.$row['ext'].'')){
				$out.='<li>
						<h5>'.$row['name'].'</h5>
						<h6>'.$row['shortdesc'].'</h6>
						<p>'.strip_tags($row['fulldesc'],'<a><br><span><font><sup><b><strong>').'</p>
						<span><a target="_blank" href="files/publications/'.$row['fileName'].'_'.$row['id'].'.'.$row['ext'].'"><img alt="" src="template/default/img/icon31.gif">Подробнее</a>('.strtoupper($row['ext']).'; '.number_format(filesize('files/publications/'.$row['fileName'].'_'.$row['id'].'.'.$row['ext'].'')/1024, 0).' КБ)</span>
					</li>';
				}
			}
			$out.='</ul>';
			$count = mysql_result(mysql_query("select count(*) from `files`  where `active`='1'"),0);
			$total = ceil($count/$limit);
			if ($total>1){
				$out.='<p align="center">Страницы: ';
				$pages = array();
				for ($i=1; $i<=$total; $i++){
					if ($i==1){
						$link = '?publications';
					}
					else {
						$link = "?publications&page={$i}";
					}
					if ($i==$nowPage){
						$pages[] = "<strong>{$i}<strong>";
					}
					else {
						$pages[] = "<a href='{$link}'>{$i}</a>";
					}
					
				}
				$out.=implode("&nbsp;|&nbsp;", $pages);
				$out.='</p>';
			}
		}
		else {
			$out.='<p align="center">Нет ни одной записи</p>';
		}
		$this->over = $out;
	}
} 