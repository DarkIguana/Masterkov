<?

class mapsite extends glb {
	var $over = "";
	
	var $links = array ();
	function __construct() {
		$_SESSION ['Road'] .= " Карта сайта";
		$_SESSION ['Titles'] ['title'] .= " / Карта сайта";
		$d = '';
		$this->over = "<ul style='padding-left:0px;list-style:none;' id='sitemap'><li style='list-style:none;'><a href='/'>Главная</a>" . $this->getPages ( 0 ) . "</li>";
		$this->over .= $this->getNews ();
		$this->over .= $this->getArticles ();
		$this->over .= "<li style='list-style:none;'><a href='?faq'><strong>Вопрос-ответ</strong></a></li>";
		$this->over .= "<li style='list-style:none;'><a href='?catalog'><strong>Каталог</strong></a>{$this->getCatalogCats()}</li>";
		//$this->over.="<li><a href='?comments'><strong>Отзывы</strong></a></li>";
		//$this->over.="<li><a href='?faq'><strong>Задать вопрос</strong></a></li>";
		

		$this->over .= "</ul>";
	}
	function getCatalogCats($parentId = 0) {
		$out = '';
		$sql = mysql_query ( "select `id`, `name` from `price_cat` where `parentId`='{$parentId}' order by `sort`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= "<ul style='list-style:none;'>";
			while ( ($row = mysql_fetch_assoc ( $sql ))!=false ) {
				$out .= "<li style='list-style:none;'><a href='?catalog&catid={$row['id']}'>{$row['name']}</a>{$this->getCatalogCats($row['id'])}{$this->getItems($row['id'])}</li>";
			}
			$out .= "</ul>";
		}
		return $out;
	}
	function getItems($catId) {
		$out = '';
		$sql = mysql_query ( "select `id`, `name`,`teh`,`desc` from `price` where `cat_id`='{$catId}' and `cat_id`!=0 and `active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= "<ul style='list-style:none;'>";
			while ( ($row = mysql_fetch_object ( $sql ))!=false ) {
				if ($this->imageExists ( $row->id ) == false or empty ( $row->desc ) or empty ( $row->teh )) {
					
				}
				else {
					$out .= "<li style='list-style:none;'><a href='?catalog&catid={$row->id}'>{$row->name}</a></li>";
				}
			}
			$out .= "</ul>";
		}
	}
	function imageExists($id) {
		$sql = mysql_query ( "select `id` from `price_img` where `iditem`='$id' " );
		if (mysql_num_rows ( $sql ) > 0) {
			return true;
		}
		return false;
	}
	
	function getNews() {
		$out = "<li style='list-style:none;'><a href='?news'><strong>Новости</strong></a>";
		$sql = mysql_query ( "select `id`, `name` from `news` where `active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= "<ul style='list-style:none;'>";
			while ( ($row = mysql_fetch_assoc ( $sql ))!=false ) {
				$out .= "<li style='list-style:none;'><a href='?news={$row['id']}'>{$row['name']}</a></li>";
			}
			$out .= "</ul>";
		}
		$out .= "</li>";
		return $out;
	}
	function getArticles() {
		$out = "<li style='list-style:none;'><a href='?special'><strong>Спецпредложения</strong></a>";
		$sql = mysql_query ( "select `id`, `name` from `news` where `active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= "<ul style='padding-left:10px;list-style:none;'>";
			while ( ($row = mysql_fetch_assoc ( $sql ))!=false ) {
				$out .= "<li style='list-style:none;'><a href='?special={$row['id']}'>{$row['name']}</a></li>";
			}
			$out .= "</ul>";
		}
		$out .= "</li>";
		return $out;
	}
	
	function getPages($parent) {
		$out = "";
		$sql = mysql_query ( "select `Id`, `Title`, `parentId`  from `pages` where `parentId`='{$parent}' and `OnIndex`=0 and `Active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			if ($parent == 0) {
				$ss = 'padding-left:0px;';
			} else {
				$ss = 'padding-left:10px;';
			}
			$out .= "<ul style='{$ss}list-style:none;'>";
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if ($row ['parentId'] == 0 or $this->hasChild ( $row ['Id'] ) == true) {
					$row ['Title'] = "<strong>{$row['Title']}</strong>";
				}
				
				$out .= "<li style='list-style:none;'><a href='?pages={$row['Id']}'>{$row['Title']}</a>{$this->getPages($row['Id'])}</li>";
			
			}
			$out .= "</ul>";
		}
		return $out;
	}
	function hasChild($id) {
		$sql = mysql_query ( "select count(*) from `pages` where `parentId`='{$id}'" );
		if (is_resource ( $sql ) && mysql_result ( $sql, 0 ) > 0) {
			return true;
		}
		return false;
	}
	
	
} 
