<?php
class search extends glb {
	var $over = "";
	var $query = '';
	var $querys = array ('pages' => NULL, 'shop_items' => NULL, 'articles' => NULL, 'news' => null );
	function __construct() {
		Breadcrumbs::add ( 'Расширенный поиск' );
		BreadcrumbsTitle::set ( 'Расширенный поиск' );
		$total = 0;
		$out = '';
		if (isset ( $_GET ['query'] ) && ! empty ( $_GET ['query'] )) {
			$this->query = urldecode ( $_GET ['query'] );
			$fields = array (0 => "`Id` as `id`, `Title` as `name`", 1 => "`id`, `name`", 2 => "`id`,`name`", 3 => "`id`,`name`" );
			$where [0] = " and `Active`='1' and `OnIndex`='0'";
			$where [1] = " and `cat_id`!=0";
			$where [2] = " and `active`='1'";
			$where [3] = " and `active`='1'";
			$url [0] = '?pages=';
			$url [1] = '?catalog=';
			$url [2] = '?articles=';
			$url [3] = '?news=';
			$name [0] = 'Разделы сайта';
			$name [1] = 'Каталог';
			$name [2] = 'Статьи';
			$name [3] = 'Новости';
			$num = - 1;
			
			foreach ( $this->querys as $table => $null ) {
				$num ++;
				$q = $this->query ( $table, $where [$num], $fields [$num] ); 
				$total += is_resource($q)?mysql_num_rows ( $q ):0;
				
				if (is_resource ( $q ) && mysql_num_rows ( $q ) > 0) {
					
					$out .= '<h3>' . $name [$num] . '</h3><p>&nbsp;</p><ul class="list1">';
					while ( ($row = mysql_fetch_object ( $q )) != false ) {
						$link = '<a href="' . $url [$num] . $row->id . '">' . $row->name . '</a>';
						if ($table == "shop_items") {
							$link = '<a href="?shop=' . $row->id . '">' . $row->name . '</a>';
						}
						$out .= '<li>' . $link . '</li>';
					}
					$out .= '</ul><p>&nbsp;</p>';
				}
			}
		} else {
			$out .= '<p align="center">По вашему запросу ничего не найдено</p>';
		}
		
		$this->over = "<ul class='list1'><li style='color:black;'><strong>Результаты поиска по запросу \"{$this->query}\", найдено {$total}</strong></li></ul>" . $out;
	}
	
	function query($table, $where = '', $f = '*') {
		$fields = array ();
		$sql = mysql_query ( "SHOW COLUMNS from `{$table}` WHERE `Type` LIKE '%text%' OR `Type` LIKE '%varchar%'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$query = mysql_real_escape_string ( $this->query );
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$fields [] = "`{$row['Field']}` LIKE '%{$query}%'";
			}
		}
		
		return mysql_query ( "select {$f} from `{$table}` where (" . implode ( " OR ", $fields ) . ") {$where}" ) ;
	}

}
?>