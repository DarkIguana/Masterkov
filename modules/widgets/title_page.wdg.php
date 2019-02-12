<?php
class title_page {
	var $over = "";
	function __construct() {
		if (isset ( $_GET ['module'] )) {
			switch ($_GET ['module']) {
				
				case "pages" :
					$this->over = $this->getPage ( isset ( $_GET ['pages'] ) ? $_GET ['pages'] : "index" );
					break;
				case "articles" :
					$this->over = articles::$TitlePage;
					break;
				case "help" :
					$this->over = help::$TitlePage;
					break;
				case "news" :
					$this->over = news::$TitlePage;
					break;
				case "cart" :
					$this->over = 'Корзина';
					break;
				case "mapsite" :
					$this->over = "Карта сайта";
					break;
				case "shop" :
					$this->over = shop::$Title; // .$this->getPrice();
					break;
				case "publications" :
					$this->over = publications::$TitlePage;
					break;
				case "gallery" :
					$this->over = gallery::$TitlePage;
					break;
				case "photos" :
					$this->over = photos::$TitlePage;
					break;
				case "search" :
					$this->over = "Поиск по сайту";
					break;
				case "comments" :
					$this->over = "Отзывы";
					break;
				case "special" :
					$this->over = special::$TitlePage;
					break;
				case "specialists" :
					$this->over = "Специалисты";
					break;
				case "faq" :
					$this->over = "Вопрос-ответ";
					break;
				case "reviews" :
						$this->over = comments::$TitlePage;
						break;
			}
		} else {
			if ($_SERVER ['REQUEST_URI'] == "/") {
				$this->over = $this->getPage ( isset ( $_GET ['pages'] ) ? $_GET ['pages'] : "index" );
			}
		}
	}
	function getPrice() {
		$sql = mysql_query ( "select * from `pricelistfiles` where `catalog`='1' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			
			if (file_exists ( 'files/pricelist/' . "{$row['fileName']}_{$row['id']}.{$row['ext']}" )) {
				return '<a target="_blank" href="files/pricelist/' . "{$row['fileName']}_{$row['id']}.{$row['ext']}" . '">
			<img alt="" src="template/default/img/pic133.gif"></a>';
			}
		}
		return '';
	}
	function getNews() {
		if (isset ( $_GET ['news'] ) && is_numeric ( $_GET ['news'] )) {
			$id = ( int ) $_GET ['news'];
			$sql = mysql_query ( "select `title` from `news` where `id`='$id'" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				
				return "<div class=\"zag1\">$row[title]</div>";
			}
		}
		return "<div class=\"zag1\">Новости</div>";
	}
	function getArticles() {
		if (isset ( $_GET ['articles'] ) && is_numeric ( $_GET ['articles'] )) {
			$id = ( int ) $_GET ['articles'];
			$sql = mysql_query ( "select `title` from `articles` where `id`='$id'" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				return "<div class=\"zag1\">$row[title]</div>";
			}
		}
		return "";
	}
	function catalog() {
		if (isset ( $_GET ['shop'] ) && is_numeric ( $_GET ['shop'] )) {
			$id = ( int ) $_GET ['shop'];
			$sql = mysql_query ( "select `name` from `shop_items` where `id`='$id' and `cat_id`!=0 limit 1" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				return "<div class=\"zag1\">$row[name]</div>";
			}
		}
		if (isset ( $_GET ['search'] )) {
			$d = "<div class=\"zag1\">Поиск</div>";
			if (isset ( $_GET ['query'] )) {
				$d .= "<p class='text'>Вы искали по фразе \"" . urldecode ( $_GET ['query'] ) . "\"</p>";
			}
			return $d;
		}
		if (isset ( $_GET ['catid'] )) {
			$id = ( int ) $_GET ['catid'];
			$sql = mysql_query ( "select * from `shop_cat` where `id`='$id'" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
				return "<div class=\"zag1\">$row[name]</div>";
			}
		}
		
		return "<div class=\"zag1\">Каталог</div>";
	}
	function getPage($id) {
		if (pages::$PageRow ['OnIndex'] == 1) {
			return "<h1>".pages::$PageRow ['secondTitle']."</h1>";
		} else {
			if (! empty ( pages::$PageRow ['secondTitle'] )) {
				return pages::$PageRow ['secondTitle'];
			}
			return pages::$PageRow ['Title'];
		}
		if ($id == "index") {
			$sql = mysql_query ( "select `Title` from `pages` where `OnIndex`='1' limit 1" );
		} else {
			$id = ( int ) $id;
			$sql = mysql_query ( "select `Title` from `pages` where `Id`='$id' limit 1" );
		}
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			return "" . $row ['Title'] . "";
		}
		return '';
	}
}