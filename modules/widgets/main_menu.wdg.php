<?php
class main_menu {
	var $over = "";
	var $li = array ();
	var $a = array ();
	var $idPages = array ();
	static $Pages = array ();
	function isLiSelect($id) {
		if (in_array ( $id, $this->idPages )) {
			return " class='active4 activeMenu'";
		}
		return '';
	}
	
	function isASelect($id) {
		if (in_array ( $id, $this->idPages )) {
			return " class='curr2'";
		}
		return '';
	}
	function getChilds($id) {
		$id = ( int ) $id;
		if ($id == 0) {
			return true;
		}
		$this->idPages [] = ( int ) $id;
		$sql = mysql_query ( "select `parentId` from `pages` where `Id`='{$id}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$this->getChilds ( $row ['parentId'] );
			}
		}
	}
	
	function __construct() {
		if (class_exists ( 'pages' ) && ! is_null ( pages::$PageRow )) {
			if (pages::$PageRow ['OnIndex'] == 1) {
				$this->idPages [] = '/';
			} else {
				$this->getChilds ( pages::$PageRow ['Id'] );
			}
		} elseif (class_exists('shop')){
			if (shop::$New==true){
				$this->idPages[] = 'new';
			}
			else {
				$this->idPages[] = 'cat'.shop::$FirstCat;
			}
		}
		elseif (class_exists('comments')){
			
				$this->idPages[] = 'reviews';
			
		}
		elseif (class_exists('help')){
				
			$this->idPages[] = 'help';
				
		}
	
		self::$Pages = $this->idPages;
		
		$this->over = ' <ul>
				<li'.$this->isLiSelect('/').'><a href="/">главная</a></li>
				<li'.$this->isLiSelect(2).'><a href="?pages=2">о нас</a></li>
				<li '.$this->isLiSelect(3).'><a href="?pages=3">доставка</a></li>
				<li'.$this->isLiSelect(4).'><a href="?pages=4">оплата</a></li>
				<li'.$this->isLiSelect('help').'><a href="?help">в помощь</a></li>
				<li'.$this->isLiSelect('reviews').'><a href="?reviews">отзывы</a></li>
				<li'.$this->isLiSelect(6).'><a href="?pages=6">контакты</a></li>
			</ul>';
	}
}