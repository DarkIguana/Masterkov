<?php
class catalog_tree {
	var $over = '';
	var $catsOpen = array ();
	var $cat= 0;
	function __construct() {
		$out = '';
		if (class_exists('shop')){
			$this->cat = shop::$NowCat;
		}
		$sql = mysql_query ( "select `id`, `name`, `photo` from `shop_cat` where `parentId`='0' and LENGTH(`photo`)>0 order by `pos` asc" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (file_exists ( 'files/shop/' . $row ['photo'] )) {
					
					$link = "?shop&catid={$row['id']}";
					$onClick = "";
					
					$out .= '<img src="files/shop/'.$row['photo'].'">';
				    $out.=$this->loadChild($row['id']);
					
				}
			}
			$out .= '</ul>';
		}
		$this->over = $out;
	}
	function loadChild($id, $class = 'leftmenu2') {
		$out = '';
		$sql = mysql_query ( "select `id`, `name` from `shop_cat` where `parentId`='{$id}' order by `pos`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			
			$out .= '<ul>';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$dop = '';
				if ($this->cat == $row['id']){
					$dop = ' class="active1 activeMenu"';
				}
				$out .= '<li'.$dop.'><a href="?shop&catid=' . $row ['id'] . '">' . $row ['name'] . '</a></li>';
			}
			$out .= '</ul>';
		}
		return $out;
	}
	function hasChild($id) {
		$sql = mysql_query ( "select count(*) from `price_cat` where `parentId`='{$id}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0 && mysql_result ( $sql, 0 ) > 0) {
			return true;
		}
		return false;
	}
}