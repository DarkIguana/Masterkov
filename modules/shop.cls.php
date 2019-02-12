<?php
class out {
	var $over = '';
	function __construct() {
		$this->over = '<a class="btn153b" href="?shop&catid=' . shop::$NowCat . '"><img alt="" src="template/default/img/btn153b.gif"></a>';
	}
}
class shop_tree {
	var $over = '';
	var $firstCat = 0;
	function __construct() {
		$out = '';
		$id = shop::$NowCat;
		$getParent = 0;
		$sql = mysql_query ( "select `id`, `parentId` from `shop_cat` where `id`='{$id}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			if ($row ['parentId'] == 0) {
				$getParent = $row ['id'];
			} else {
				$getParent = $this->getRoot ( $row ['id'] );
			}
		}
		if ($getParent != 0) {
			$sql = mysql_query ( "select `id`, `name` from `shop_cat` where `parentId`='{$getParent}' order by `pos`" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$out .= '<h4>Каталог</h4>';
				$out .= '<ul class="list4">';
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					if (shop::$NowCat == $row ['id']) {
						$out .= '<li><strong>' . $row ['name'] . '</strong></li>';
					} else {
						$out .= '<li><a href="?shop&catid=' . $row ['id'] . '">' . $row ['name'] . '</a></li>';
					}
				}
				$out .= '</li>';
			}
		}
		$this->over = $out;
	}
	function getRoot($id) {
		$sql = mysql_query ( "select `parentId` from `shop_cat` where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$parent = mysql_result ( $sql, 0 );
			if ($parent == 0) {
				return $id;
			} else {
				return $this->getRoot ( $parent );
			}
		}
		return 0;
	}
}
class shop extends glb {
	public $over = "";
	static $ShowItems = array ();
	public $catid = 0;
	public $itemid = 0;
	public $item = "";
	public $firstCat = 0;
	public $usd = 1;
	public $eur = 1;
	static $NowCat = 0;
	static $ShopQuickItems = array ();
	// var $params = array ("template" => "catalogue" );
	static $Title = 'Продукция';
	static $New = false;
	static $error = false;
	static $Search = false;
	static $FirstCat = 0;
	static $Favorite = false;
	function __construct() {
		if (isset ( $_POST ['quickSearch'] )) {
			$_SESSION ['quickSearch'] = $_POST;
		}
		if (! isset ( $_SESSION ['ShowOnPage'] )) {
			$_SESSION ['ShowOnPage'] = 12;
		}
		if (! isset ( $_SESSION ['ShopSort'] )) {
			$_SESSION ['ShopSort'] = 'priceasc';
		}
		if (! isset ( $_SESSION ['ShowStocks'] )) {
			$_SESSION ['ShowStocks'] = true;
		}
		if (isset ( $_GET ['new'] )) {
			self::$New = true;
		}
		if (isset ( $_GET ['favorite'] )) {
			self::$Favorite = true;
		}
		if (isset ( $_GET ['search'] )) {
			self::$Search = true;
		}
		if (isset ( $_GET ['ShowOnpage'] )) {
			switch ($_GET ['ShowOnpage']) {
				case "all" :
					$_SESSION ['ShowOnPage'] = 'all';
					break;
				case "12" :
					$_SESSION ['ShowOnPage'] = 12;
					break;
				case "36" :
					$_SESSION ['ShowOnPage'] = 36;
					break;
				default :
					$_SESSION ['ShowOnPage'] = 12;
					break;
			}
		}
		if (isset ( $_GET ['sort'] )) {
			switch ($_GET ['sort']) {
				case "new" :
					$_SESSION ['ShopSort'] = 'new';
					break;
				case "bestsell" :
					$_SESSION ['ShopSort'] = 'bestsell';
					break;
				case "priceasc" :
					$_SESSION ['ShopSort'] = 'priceasc';
					break;
				case "pricedesc" :
					$_SESSION ['ShopSort'] = 'pricedesc';
					break;
				default :
					$_SESSION ['ShopSort'] = 'priceasc';
			}
		}
		
		$this->over .= $this->getPage ();
	}
	function getFirstCat($id) {
		$sql = mysql_query ( "select `parentId` from `shop_cat` where  `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$parent = mysql_result ( $sql, 0 );
			if ($parent != 0) {
				self::getFirstCat ( $parent );
			} else {
				self::$FirstCat = $id;
			}
		}
	}
	function chpu_links_replace($a) {
		preg_match_all ( "/href=(\"|')(.*?)(\"|')/is", $a, $links_chpu );
		
		foreach ( $links_chpu [2] as $num => $link ) {
			
			if (! preg_match ( "/href=(\"|')(http:\/\/)/is", $links_chpu [0] [$num] )) {
				$links_chpu [2] [$num] = htmlspecialchars_decode ( $links_chpu [2] [$num] );
				
				$link = $links_chpu [2] [$num];
				$link = htmlspecialchars_decode ( $link );
				if ($this->chpu == 1) {
					
					$l = str_replace ( "?", "", $link );
					$l = str_replace ( "&amp", "-", $l );
					$l = preg_replace ( "/&amp;/is", "-", $l );
					$l = preg_replace ( "/&/is", "-", $l );
					$l = str_replace ( "=", "-", $l );
					
					$pz = pathinfo ( $l );
					if ($l == "/") {
						continue;
					}
					if (substr ( $l, 0, 1 ) == "/") {
						continue;
					}
					if (eregi ( "mailto:", $l )) {
						continue;
					}
					if (eregi ( "#", $l )) {
						continue;
					}
					
					$get = self::parseLink ( $l );
					if ($l != "/" && ! empty ( $l ) && ! isset ( $pz ['extension'] )) {
						
						$test = $this->parseLink ( $l );
						$l = "/" . $l . ".{$this->extention}";
					}
					
					if (substr ( $l, 0, 7 ) != "http://" && substr ( $l, 0, 8 ) != "https://" && substr ( $l, 0, 1 ) != "/") {
						$l = "/{$l}";
					}
				} elseif ($this->chpu == 2) {
					if (substr ( $link, 0, 1 ) == "/")
						continue;
					$l = str_replace ( "?", "/", $link );
					$l = preg_replace ( "/&amp;/is", "/", $l );
					
					$l = preg_replace ( "/&/is", "/", $l );
					$l = str_replace ( "=", "/", $l );
					
					if (eregi ( "mailto:", $l ))
						continue;
					if (eregi ( "#", $l ))
						continue;
				}
				// if (substr($l,0,1)!="/")continue;
				$a = str_replace ( $links_chpu [0] [$num], "href={$links_chpu [1] [$num]}$l{$links_chpu [1] [$num]}", $a );
				$links_chpu [0] [$num] = str_replace ( $links_chpu [0] [$num], "href={$links_chpu [1] [$num]}$l{$links_chpu [1] [$num]}", $links_chpu [0] [$num] );
				if ($this->chpu == 2) {
					if (! preg_match ( "/href=(\"|')\//is", $links_chpu [0] [$num] )) {
						
						$a = str_replace ( $links_chpu [0] [$num], "href='/$l'", $a );
					}
				}
			}
		}
		return $a;
	}
	function getParent($id) {
		$sql = mysql_query ( "select `id`, `parentId` from `shop_cat` where `id`='$id'" );
		$row = mysql_fetch_array ( $sql );
		if ($row ['parentId'] == 0) {
			$this->firstCat = $row ['id'];
			return true;
		} else {
			$this->getParent ( $row ['parentId'] );
		}
	}
	function testCategory2($id) {
		$test = mysql_result ( mysql_query ( "select COUNT(*) from `shop_cat` where `parentId`='$id'" ), 0 );
		if ($test == 0) {
			return false;
		}
		return true;
	}
	function getPage() {
		$out = "";
		
		$catId = isset ( $_GET ['catid'] ) ? ( int ) $_GET ['catid'] : '0'; // Категория
		self::getFirstCat ( $catId );
		$idItem = isset ( $_GET ['shop'] ) ? ( int ) $_GET ['shop'] : '0'; // Индефикатор
		self::$NowCat = $catId; // товара
		
		if (is_numeric ( $catId ) && ! empty ( $catId )) {
			
			// $out="";
			$descCatSql = mysql_query ( "select * from `shop_cat` where id='$catId'" );
			if (mysql_num_rows ( $descCatSql ) > 0) {
				$row = mysql_fetch_array ( $descCatSql );
				self::$Title = $row ['name'];
				$this->getParent ( $catId );
				$this->catid = "$catId";
				$this->catRow = $row;
				if (! empty ( $row ['desc'] )) {
					$this->descCat = "<p>$row[desc]</p>";
				}
			}
		}
		if (self::$New == true) {
			self::$Title = 'Новинки';
			$this->road [] = ('Новинки');
			$this->roadTitle [] = ('Новинки');
			$out .= <<<HTML
		<script type="text/javascript" src='/countdown.js'></script>
			<div id="controlbar"><div class="closebutton"	onclick="return hs.close(this)" title="Close"></div></div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
		   <script type="text/javascript" src='/highslide/highslide-full.js'></script>
		
		
		
			<div class="highslide-html-content" id="highslide-html-9" >
			
	    			<div class="closebutton"	onclick="return hs.close(this)" title="Close"></div>
			 
			
			    <div class="highslide-body"></div>
			
			
			</div>
		
<link rel="stylesheet" type="text/css" href='highslide/highslide.css' />
<script type="text/javascript" src="template/default/js/script2.js.js"></script>		

HTML;
			$out .= $this->getItemsFromCategories ( 'new' );
		} elseif (self::$Search == true) {
			self::$Title = 'Расширенный поиск';
			$this->road [] = ('Расширенный поиск');
			$this->roadTitle [] = ('Расширенный поиск');
			
			$out .= $this->getItemsFromCategories ( 'search' );
		} elseif (self::$Favorite == true) {
			self::$Title = 'Избранное';
			$this->road [] = ('Избранное');
			$this->roadTitle [] = ('Избранное');
			$out .= '<h2>Избранное</h2>';
			
			$out .= <<<HTML
		<script type="text/javascript" src='/countdown.js'></script>
			<div id="controlbar"><div class="closebutton"	onclick="return hs.close(this)" title="Close"></div></div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
		   <script type="text/javascript" src='/highslide/highslide-full.js'></script>
		
		
		
			<div class="highslide-html-content" id="highslide-html-9">
			
	    			<div class="closebutton"	onclick="return hs.close(this)" title="Close"></div>
			 
			
			    <div class="highslide-body"></div>
			
			
			</div>
		
<link rel="stylesheet" type="text/css" href='highslide/highslide.css' />
<script type="text/javascript" src="template/default/js/script2.js.js"></script>		

HTML;
			if (Users::iUser ()) {
				$out .= $this->getItemsFromCategories ( 'favorite' );
			} else {
				$out .= '<p align="center">Фунция доступна только зарегистрированным пользователям. Пожалуйста пройдите <a href="?lk">авторизацию</a> или <a href="?reg">зарегистрируйтесь</a></p>';
			}
		} elseif ($catId != 0 && ! empty ( $catId ) && is_numeric ( $catId )) {
			$this->getParent ( $catId );
			$this->catid = "$catId";
			$catName = $this->get_name_cat ( $catId );
			$out .= <<<HTML
			<script type="text/javascript" src='/countdown.js'></script>
			<div id="controlbar"><div class="closebutton"	onclick="return hs.close(this)" title="Close"></div></div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
		   <script type="text/javascript" src='/highslide/highslide-full.js'></script>
			
			
			
			<div class="highslide-html-content" id="highslide-html-9" >
			   
	    			<div class="closebutton"	onclick="return hs.close(this)" title="Close"></div>
			    

			    <div class="highslide-body"></div>

				
			</div>
			
<link rel="stylesheet" type="text/css" href='highslide/highslide.css' />
<script type="text/javascript" src="template/default/js/script2.js.js"></script>				

HTML;
			switch ($catId) {
				case is_numeric ( $catId ) && ! empty ( $catId ) :
					$this->catid = $catId;
					
					$out .= $this->getItemsFromCategories ( $catId );
					break;
				default :
					
					$out .= $this->getItemsFromCategories ( 'all' );
					break;
			}
		} elseif ($idItem != 0 && ! empty ( $idItem ) && is_numeric ( $idItem )) {
			$sql = mysql_query ( "select `cat_id` from `shop_items` where `id`='$idItem'" );
			$row = mysql_fetch_array ( $sql );
			$this->getParent ( $row ['cat_id'] );
			$out .= $this->getDescItem ( $idItem );
		} elseif (isset ( $_GET ['quickview'] ) && is_numeric ( $_GET ['quickview'] )) {
			$idItem = ( int ) $_GET ['quickview'];
			$sql = mysql_query ( "select `cat_id` from `shop_items` where `id`='$idItem'" );
			$row = mysql_fetch_array ( $sql );
			$this->getParent ( $row ['cat_id'] );
			$out .= $this->getDescItem2 ( $idItem );
			echo $out;
			exit ();
		}
		if (isset ( $this->descCat ) && ! isset ( $_GET ['page'] )) {
			$out .= $this->descCat;
		}
		
		$this->road ();
		
		return $out;
	}
	function getItemImage4($id) {
		$sql1 = mysql_query ( "select * from `price_attach` where `attach`='$id'" );
		if (mysql_num_rows ( $sql1 ) > 0) {
			$r = mysql_fetch_array ( $sql1, MYSQL_ASSOC );
			$sql = mysql_query ( "select * from `price_img` where `iditem`='$r[iditem]' order by `osn` desc limit 1" );
			if (mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
				return array (
						"min" => "shop/s_{$row['id']}.{$row['ext']}",
						"big" => "shop/b_{$row['id']}.{$row['ext']}",
						"orig" => "o_{$row['id']}.{$row['ext']}" 
				);
			}
		}
		return array (
				"min" => "nofoto_s.jpg",
				"big" => 'nofoto_s.jpg' 
		);
	}
	function get_name_cat($id) {
		$sql = mysql_query ( "select * from shop_cat where id='$id'" );
		$row = mysql_fetch_array ( $sql );
		$lng = "";
		if (isset ( $_SESSION ['lang'] ) && $_SESSION ['lang'] == "_en") {
			$name_module = "Press";
			$lng = "_en";
		}
		return $row ['name' . $lng];
	}
	function getParentCat($id) {
		$sql = mysql_query ( "select `id`, `name`, `parentId` from `shop_cat`  where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$this->road [] = ("<a href='?shop&catid=$row[id]'>" . $row ['name'] . "</a>");
			$this->roadTitle [] = ("<a href='?shop&catid=$row[id]'>" . $row ['name'] . "</a>");
			if ($row ['parentId'] != 0) {
				$this->getParentCat ( $row ['parentId'] );
			}
		}
	}
	function road() {
		if ($this->item != "") {
			$this->road [] = ($this->item);
			$this->roadTitle [] = ($this->item);
		}
		if ($this->catid != 0) {
			$this->getParentCat ( $this->catid );
		}
		krsort ( $this->road );
		krsort ( $this->roadTitle );
		foreach ( $this->road as $road ) {
			Breadcrumbs::add ( $road );
		}
		
		// foreach ( $this->roadTitle as $road ) {
		BreadcrumbsTitle::set ( end ( $this->roadTitle ) );
		// }
		
		if (isset ( $this->catRow ) ) {
			if (! empty ( $this->catRow ['TitlePage'] )){
			BreadcrumbsTitle::set ( $this->catRow ['TitlePage'] );
			}
			if (!empty($this->catRow['DescPage'])){
				$_SESSION['Titles']['desc']=$this->catRow['DescPage'];
			}
			if (!empty($this->catRow['KeysPage'])){
				$_SESSION['Titles']['keys']=$this->catRow['KeysPage'];
			}
		}
		
		// Breadcrumbs::forward ();
		// BreadcrumbsTitle::forward ();
	}
	function getOnly() {
		$ids = array ();
		if (isset ( $_SESSION ['ShowOnPage'] )) {
			switch ($_SESSION ['ShowOnPage']) {
				case "onhand" :
					if (self::$NowCat != 0) {
						$cats = $this->testCategory ( self::$NowCat );
						$sql = mysql_query ( "select `id` from `shop_items` where `cat_id` in (" . $cats . ") " );
						if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
							while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
								$count = mysql_result ( mysql_query ( "select count(1) from `shop_sizes_values` where `iditem`='{$row['id']}' and `store`='0'" ), 0 );
								if ($count > 0) {
									$ids [] = $row ['id'];
								}
							}
						}
					}
					break;
				case "withphoto" :
					if (self::$NowCat != 0) {
						$cats = $this->testCategory ( self::$NowCat );
						
						$sql = mysql_query ( "select `id` from `shop_items` where `cat_id` in (" . $cats . ") " );
						if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
							while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
								$count = mysql_result ( mysql_query ( "select count(1) from `shop_images` where `iditem`='{$row['id']}'" ), 0 );
								if ($count > 0) {
									$ids [] = $row ['id'];
								}
							}
						}
					}
					break;
			}
		}
		if (count ( self::$ShopQuickItems ) > 0) {
			$ids = array_merge ( $ids, self::$ShopQuickItems );
		}
		
		self::$ShowItems = $ids;
		return $ids;
	}
	function LookItems($id) {
		$new = array ();
		$d = "";
		$limit = 4;
		$i = 0;
		if (count ( $_SESSION ['LookItems'] ) > 0) {
			$a = array_unique ( $_SESSION ['LookItems'] );
			
			krsort ( $a );
			$limit = 0;
			foreach ( $a as $num => $id2 ) {
				
				if ($id != $id2) {
					$limit ++;
					$new [] = $id2;
				}
				if ($limit == 3) {
					break;
				}
			}
		}
		
		$out = '';
		
		if (count ( $new ) > 0) {
			$sql = mysql_query ( "select `shop_items`.`id`, `shop_items`.`name`, `shop_items`.`price_rozn`, `shop_items`.`photo`, `shop_cat`.`name` as `catname` from `shop_items`, `shop_cat` where `shop_cat`.`id`=`shop_items`.`cat_id` and `shop_items`.`id` in (" . implode ( ", ", $new ) . ") limit 3" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$out .= '<p class="txt1a">Ранее вы просматривали:</p>';
				$out .= '<ul class="list97">';
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$image = $this->getItemImage ( $row, 1 );
					if ($image != false) {
						$image = '<a href="?shop=' . $row ['id'] . '"><img  width="69" src="' . $image ['min'] . '" alt="" /></a>';
					} else {
						$image = '';
					}
					$out .= '<li>
					<div class="block97">
					<div class="block97top"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
					<div class="block97middle">
					' . $image . '
					<p>' . $row ['name'] . '<span>' . $row ['catname'] . '</span></p>
					<span class="pr1">' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' руб.</span>
					</div>
					<div class="block97bottom"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
					</div>
					</li>';
				}
				$out .= '</ul>';
			}
		}
		return $out;
	}
	function getColors($id) {
		$colors = array ();
		
		$sql = mysql_query ( "SELECT `shop_colors`.`name`
FROM `shop_colors` , `shop_colors_values`
WHERE `shop_colors_values`.`iditem` = '{$id}'
AND `shop_colors`.`id` = `shop_colors_values`.`value`
AND `shop_colors`.`active` = '1' order by `shop_colors`.`pos` asc" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$colors [] = $row ['name'];
			}
		}
		return $colors;
	}
	function getfullness($id) {
		$fullness = array ();
		$sql = mysql_query ( "SELECT `shop_fullness`.`name`
				FROM `shop_fullness` , `shop_fullness_values`
				WHERE `shop_fullness_values`.`iditem` = '{$id}'
				AND `shop_fullness`.`id` = `shop_fullness_values`.`value`
				AND `shop_fullness`.`active` = '1' order by `name`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$fullness [] = $row ['name'];
			}
		}
		return $fullness;
	}
	function getStyles($id) {
		$style = array ();
		$sql = mysql_query ( "SELECT `shop_style`.`name`
				FROM `shop_style` , `shop_style_values`
				WHERE `shop_style_values`.`iditem` = '{$id}'
				AND `shop_style`.`id` = `shop_style_values`.`value`
				AND `shop_style`.`active` = '1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$style [] = $row ['name'];
			}
		}
		return $style;
	}
	function getSizes($id) {
		$colors = array ();
		$sql = mysql_query ( "SELECT `shop_sizes`.`name`, `shop_sizes_values`.`store`
				FROM `shop_sizes` , `shop_sizes_values`
				WHERE `shop_sizes_values`.`iditem` = '{$id}'
				AND `shop_sizes`.`id` = `shop_sizes_values`.`value` and  `shop_sizes_values`.`store`!='0'
				AND `shop_sizes`.`active` = '1' order by `name` asc" );
		
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$colors [] = $row ['name'];
			}
		}
		return $colors;
	}
	function getCountDown($row) {
		$out = '';
		if ($row ['stock'] == 1) {
			$time = @strtotime ( "{$row['dateTo']} {$row['timeTo']}" );
			if ($time > time ()) {
				$year = date ( "Y" );
				$month = date ( "m" ) - 1;
				$day = date ( 'd' );
				$hour = date ( "H" );
				$min = date ( "i" );
				$sec = date ( "s" );
				$ms = ( int ) number_format ( date ( "u" ) / 1000, 0, '', '' );
				
				$year2 = date ( "Y", $time );
				$month2 = date ( "m", $time ) - 1;
				$hour2 = date ( "H", $time );
				$day2 = date ( 'd', $time );
				$minute = date ( "i", $time );
				$out = '
			<div id="Stock' . $row ['id'] . '"></div>
			<script>
		function ahead(){
		return new Date(' . $year . ', ' . $month . ', ' . $day . ', ' . $hour . ',' . $min . ', ' . $sec . ');
		}
		$(document).ready(function(){
		var dd = new Date(' . $year2 . ', ' . $month2 . ', ' . $day2 . ', ' . $hour2 . ',' . $minute . ');
		
		$("#Stock' . $row ['id'] . '").countdown({until:dd,format:\'HMS\',serverSync: ahead, layout: "{hn}:{mn}:{sn}"});
		});
		
		</script>';
			}
		}
		return $out;
	}
	function isStockActive($row) {
		if ($row ['stock'] == 1) {
			$time = @strtotime ( "{$row['dateTo']} {$row['timeTo']}" );
			if ($time > time ()) {
				return true;
			}
		}
		return false;
	}
	function recom($id, $catid, $recom = '') {
		$t = array ();
		if (! empty ( $recom )) {
			$exp = explode ( ",", $recom );
			foreach ( $exp as $a ) {
				$a = trim ( $a );
				if (! empty ( $a )) {
					$sql = mysql_query ( "select `id` from `shop_items` where `art`='" . mysql_real_escape_string ( $a ) . "' limit 1" );
					if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
						$t [] = mysql_result ( $sql, 0 );
					}
				}
			}
		}
		
		if (count ( $t ) > 0) {
			$sql = mysql_query ( "select `id`, `photo`, `name`, `price_rozn`, `price_opt` from `shop_items` where `id`!='{$id}' and `id` in (" . implode ( ", ", $t ) . ") order by rand() limit 3" );
		} else {
			$sql = mysql_query ( "select `id`, `photo`, `name`, `price_rozn`, `price_opt` from `shop_items` where `id`!='{$id}' and `cat_id`='{$catid}' order by rand() limit 3" );
		}
		$out = "";
		if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
			
			$out .= ' <p class="commet_h"><span>рекомендуем посмотреть</span></p><ul class="list220">';
			$i = 0;
			$v = 0;
			
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$image = $this->getItemImage ( $row, 1 );
				$idImage = 0;
				$min = '';
				if ($image != false) {
					$idImage = ( int ) @$image ['id'];
					$min = $image ['min'];
					$image = '<img src="/thumbs/219x294/' . str_replace ( "files/shop/", "", $image ['big'] ) . '" alt="">';
				} else {
					$image = '';
				}
				$price = number_format ( $row ['price_rozn'], 0, ' ', ' ' );
				$out .= '<li class="">
				<a href="?shop=' . $row ['id'] . '">' . $image . '</a>
				<p class="list220_p"><a href="?shop=' . $row ['id'] . '">' . $row ['name'] . '</a></p>
				<p>Цена: <span class="pr2">' . $price . ' руб</span></p>
				</li>';
			}
			$out .= '</ul>';
		}
		return $out;
	}
	function getDescItem($id) {
		$out = '';
		$sql = mysql_query ( "select * from `shop_items` where `id`='$id' and `cat_id`!=0" );
		if (mysql_num_rows ( $sql ) == 0) {
			return "Товара не существует";
		}
		$row = mysql_fetch_assoc ( $sql );
		self::getFirstCat ( $row ['cat_id'] );
		
		$this->params ['template'] = 'card';
		$_SESSION ['LookItems'] [] = $id;
		$this->itemid = $row ['id'];
		$this->catid = $row ['cat_id'];
		self::$NowCat = $row ['cat_id'];
		$this->item = $row ['name'];
		$this->catRow = $row;
		$image = $this->getItemImage ( $row, 1 );
		$idImage = 0;
		$min = '';
		$Loop = '';
		$imgsNext = '';
		$scriptLoad = '';
		if ($image != false) {
			$idImage = ( int ) @$image ['id'];
			$min = $image ['min'];
			$image = '<img   src="/thumbs/342x458/' . str_replace ( "files/shop/", "", $image ['big'] ) . '" alt="">';
		} else {
			$image = '';
		}
		$images = $this->getImagesNotId ( $row ['id'], $idImage, $min );
		
		$utube = "";
		if (! empty ( $row ['youtube'] )) {
			if (($parse = parse_url ( $row ['youtube'], PHP_URL_QUERY ))) {
				$var = null;
				parse_str ( $parse, $var );
				if (is_array ( $var ) && isset ( $var ['v'] )) {
					$utube = '<a class="btn122a" href="http://www.youtube.com/v/' . $var ['v'] . '&hl=nb_NO&fs=1" onclick="openYouTube(this); return false;"><img src="template/default/img/btn122.gif" alt="" /></a>';
				}
			}
		}
		
		$out .= <<<HTML
		<script type="text/javascript" src='/countdown.js'></script>
			
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/swfobject/2.1/swfobject.js"></script>
		   <script type="text/javascript" src='/highslide/highslide-full.js'></script>

		
<link rel="stylesheet" type="text/css" href='highslide/highslide.css' />
<script type="text/javascript" src="template/default/js/script3.js"></script>	

HTML;
		
		$imgsNext = '';
		$scriptLoad = '';
		$additionalImages = '';
		if (count ( $images ) > 0) {
			$scriptLoad .= '<script>';
			foreach ( $images as $img ) {
				$scriptLoad .= 'var img' . $img ['id'] . ' = new Image(); img' . $img ['id'] . '.src="files/shop/s_' . $img ['id'] . '.' . $img ['photo'] . '";';
				$imgsNext .= '<div style="display:none;" id="big' . $img ['id'] . '" class="itemImg"><img  big="/files/shop/b_' . $img ['id'] . '.' . $img ['photo'] . '" src="files/shop/b_' . $img ['id'] . '.' . $img ['photo'] . '" alt=""></div>';
			}
			$scriptLoad .= '</script>';
		}
		$images = $this->getImagesNotId ( $row ['id'], 0 );
		if (count ( $images ) > 0) {
			$additionalImages .= '<ul class="list80">';
			foreach ( $images as $img ) {
				$additionalImages .= '<li><a href="files/shop/b_' . $img ['id'] . '.' . $img ['photo'] . '" onclick="return hs.expand(this)"><img  class="cursor"  src="/thumbs/78x105/b_' . $img ['id'] . '.' . $img ['photo'] . '" /></a></li>';
			}
			$additionalImages .= '</ul>';
		}
		
		$colors = $this->getColors ( $row ['id'] );
		if (count ( $colors ) > 0) {
			$colors = '<tr>
				<td colspan="2"><p>Цвет: ' . implode ( ", ", $colors ) . '</p></td>
			</tr>';
		} else {
			$colors = '';
		}
		$prim = ! empty ( $row ['prim'] ) ? '<tr>
					<td>Состав:</td>
					<td>' . $row ['prim'] . '</td>
				</tr>' : '';
		$sizes = $this->getSizes ( $row ['id'] );
		if (count ( $sizes ) > 0) {
			$sizesText = '<tr>
					<td>Выберите размер:</td>
					<td>
					<input type="hidden" name="size" value="false"/>
						<ul class="list27">';
			foreach ( $sizes as $size ) {
				$sizesText .= '<li>' . $size . '</li>';
			}
			$sizesText .= '	</ul>
						<p class="srvLink2"><a href="?pages=12" target="_blank"><span>Помощь в определении размера</span></a></p>
					</td>
				</tr>';
		} else {
			$sizesText = '';
		}
		
		$fullness = $this->getFullNess ( $row ['id'] );
		if (count ( $fullness ) > 0) {
			$fullnessText = '<tr>
			<td>Выберите полноту:</td>
			<td>
			<input type="hidden" name="fullness" value="false"/>
			<ul class="list27">
			';
			foreach ( $fullness as $ness ) {
				$fullnessText .= '<li>' . $ness . '</li>';
			}
			$fullnessText .= '</ul>
			<p class="srvLink2"><a href="?pages=18" target="_blank"><span>Помощь в определении полноты</span></a></p>
			</td>
			</tr>';
		} else {
			$fullnessText = '';
		}
		$colors = $this->getColors ( $row ['id'] );
		if (count ( $colors ) > 0) {
			$colorsText = '<tr>
					<td>Выберите цвет:</td>
					<td><select size="1" name="color" class="w206">';
			foreach ( $colors as $color ) {
				$colorsText .= '<option value="' . htmlspecialchars ( $color ) . '">' . $color . '</option>';
			}
			$colorsText .= '</select>
					<p class="srvLink2"><a href="?pages=17" target="_blank"><span>Таблица цветов</span></a></p></td>
				</tr>';
		} else {
			$colorsText = '';
		}
		
		$styles = $this->getstyles ( $row ['id'] );
		if (count ( $styles ) > 0) {
			$stylesText = '<tr>
					<td>Выберите фасон трусиков:</td>
					<td><select size="1" name="style" class="w206">';
			foreach ( $styles as $style ) {
				$stylesText .= '<option value="' . htmlspecialchars ( $style ) . '">' . $style . '</option>';
			}
			$stylesText .= '</select>
					<p class="srvLink2"><a href="?pages=19" target="_blank"><span>Посмотреть примеры</span></a></p></td>
				</tr>';
		} else {
			$stylesText = '';
		}
		$price = number_format ( $row ['price_rozn'], 0, ' ', ' ' );
		$newPrice = $row ['price_opt'];
		if ($newPrice > 0) {
			$prices = '<span class="pr5">' . $price . '</span><span class="pr6"> ' . number_format ( $row ['price_opt'], 0, ' ', ' ' ) . ' <span>руб.</span></span>';
		} else {
			$prices = '<span class="pr6"> ' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' <span>руб.</span></span>';
		}
		$dopImage = '';
		if ($row ['new'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-red.gif" alt="" class="pic75" />';
		} elseif ($row ['onecs'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-blue.gif" alt="" class="pic75" />';
		} elseif ($row ['bestsell'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-yellow.gif" alt="" class="pic75" />';
		}
		$out .= '<div class="block344">
		<div class="pic344">' . $dopImage . '	' . $image . '</div>
			' . $additionalImages . '<div class="clear"></div>
				
			<div class="h37">
				<span>Поделиться ссылкой:</span>
				<ul class"share_lk">
					<li><script type="text/javascript" src="//yandex.st/share/share.js" charset="utf-8"></script>
<div class="yashare-auto-init" data-yashareL10n="ru" data-yashareType="none" data-yashareQuickServices="yaru,vkontakte,facebook,twitter,odnoklassniki,moimir"></div> 
				</li>
								
				</ul>
					
			</div>
				<div class="clear"></div>
		</div>
		
		<div class="block353">
	     <form method="post" action="/cart.html" name="formOrder" id="formOrder">
	       <input type="hidden" name="add" value="' . $row ['id'] . '" />
			<h1>' . $row ['name'] . '</h1>
			<table class="data2">
				<tr>
					<td>Артикул:</td>
					<td>' . $row ['art'] . '</td>
				</tr>
				' . $prim . '
				<tr>
					<td>Описание:</td>
					<td>' . strip_tags ( $row ['shortdesc'], '<a><br><p>' ) . '</td>
				</tr>
				' . $colorsText . '
				' . $sizesText . '
				' . $fullnessText . '
				' . $stylesText . '
			</table>
			<div class="h52">
				<img src="template/default/img/btn103a.gif" onclick="return submitItemToCart();" class="btn103a" alt="" />
				' . $prices . '
			</div>
			</form>
		</div>
						
		';
		$out .= '
		';
		$test = trim ( strip_tags ( $row ['description'] ) );
		if (! empty ( $test )) {
			$out .= '<div class="txt2">' . $row ['description'] . '</div>';
		}
		
		$out .= '<div class="clear"></div>
		<div class="extraBlock1">' . $this->recom ( $row ['id'], $row ['cat_id'], $row ['recom'] );
		$out .= $this->getComments ( $row ['id'] );
		$out .= '</div>';
		
		return $out;
	}
	function getComments($id) {
		$out = '';
		$fields = array (
				'name',
				'code',
				'msg' 
		);
		foreach ( $fields as $field ) {
			$$field = isset ( $_POST [$field] ) ? $_POST [$field] : '';
			$$field = strip_tags ( $$field );
			$$field = trim ( $$field );
			$$field = str_replace ( "{", "", $$field );
			$$field = str_replace ( "}", "", $$field );
		}
		if (isset ( $_POST ['submitForm'] )) {
			if (empty ( $name ) or empty ( $code ) or empty ( $msg )) {
				$out .= '<script>alert("Не заполненны обязательные поля");</script>';
			} elseif (! isset ( $_SESSION ['secret_code'] ) or isset ( $_SESSION ['secret_code'] ) && $this->strtomin ( $code ) != $this->strtomin ( $_SESSION ['secret_code'] )) {
				$out .= '<script>alert("Не верно введен проверочный код");</script>';
			} else {
				$out .= '<script>alert("Ваш комментарий успешно добавлен");</script>';
				$name = mysql_real_escape_string ( $name );
				$msg = mysql_real_escape_string ( $msg );
				mysql_query ( "insert into `shop_items_comments` (`name`, `desc`, `active`, `iditem`) values ('{$name}', '{$msg}', '1', '{$id}')" );
				unset ( $_POST );
				foreach ( $fields as $field ) {
					$$field = isset ( $_POST [$field] ) ? $_POST [$field] : '';
					$$field = strip_tags ( $$field );
					$$field = trim ( $$field );
					$$field = str_replace ( "{", "", $$field );
					$$field = str_replace ( "}", "", $$field );
				}
			}
		}
		$out .= '<p class="commet_h"><span>отзывы и комментарии к этому товару</span></p>';
		$sql = mysql_query ( "select * from `shop_items_comments` where `iditem`='{$id}' order by `date`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '<ul class="list2">';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$out .= '<li>';
				
				$out .= '<span>' . $row ['name'] . ':</span>';
				$out .= '&mdash; ' . nl2br ( strip_tags ( $row ['desc'] ) ) . '';
				$out .= '</li>';
			}
			$out .= '</ul>';
		} else {
			$out .= '<p style=" clear: both;
    min-height: 1px;
    padding: 20px 0 10px;background:url(/template/default/img/dot2.gif) repeat-x scroll center top transparent">Нет ни одного комментария</p><p>&nbsp;</p>';
		}
		
		$out .= '<p class="h3_comm">Написать комментарий:</p>
		<a name="comments"></a>
		<form class="form-comm" method="post" name="formComment">
		<input type="hidden" name="submitForm" value="true" />
		<table>
			<tbody>
				<tr>
				<td><p class="p_name">Ваше имя</p></td>
				<td><input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" class="w561 w111" /></td>				
			</tr>
			<tr>
				<td><p class="p_comment">Комментарий</p></td>
				<td><textarea class="h51 w427" rows="5" name="msg" cols="40">' . htmlspecialchars ( $msg ) . '</textarea></td>				
			</tr>
			<tr>
				<td><p class="p_code">Введите код:</p></td>
				<td><img class="captcha1" alt="" width="88" height="38" src="/getcaptcha.php">
				<div class="code_img"><input type="text" name="code"  class="w111 w4444"><div>
				</td>
				
			</tr>
			</tbody>
		</table>
		
		
		
		
		
		<!--
		<p class="txt3">Введите ваше имя:</p>
		<input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" class="w111">
		<p class="txt3">Введите текст комментария:</p>
		<textarea class="w427" name="msg" cols="30" rows="5">' . htmlspecialchars ( $msg ) . '</textarea>
		<p class="txt3">Введите проверочный код:</p>
		<img class="captcha1" alt="" width="88" height="38" src="/getcaptcha.php">
		<input type="text" name="code"  class="w111">-->
		
		
		<div class="clear"></div>
		
		<a class="btn79a" href="#" onclick="formComment.submit(); return false;"><img class="btn296a" alt="" src="template/default/img/btn296a.gif"></a>
		</form>
		';
		// $out .= '</div>';
		return $out;
	}
	function likeIt($catid, $not) {
		$out = '';
		$categorys = $this->testCategory ( self::$FirstCat );
		$sql = mysql_query ( "select `shop_items`.`id`, `shop_items`.`name`, `shop_items`.`price_rozn`, `shop_items`.`photo`, `shop_cat`.`name` as `catname` from `shop_items`, `shop_cat` where `shop_items`.`id`!='{$not}' and  `shop_cat`.`id`=`shop_items`.`cat_id` and `shop_items`.`cat_id` in ($categorys) order by rand() limit 3" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '<p class="txt1">Вам также может понравиться:</p>
		<ul class="list97">';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$image = $this->getItemImage ( $row, 1 );
				if ($image != false) {
					$image = '<a href="?shop=' . $row ['id'] . '"><img  width="69" src="' . $image ['min'] . '" alt="" /></a>';
				} else {
					$image = '';
				}
				$out .= '<li>
				<div class="block97">
					<div class="block97top"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
					<div class="block97middle">
						' . $image . '
						<p>' . $row ['name'] . '<span>' . $row ['catname'] . '</span></p>
						<span class="pr1">' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' руб.</span>
					</div>
					<div class="block97bottom"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
				</div>
			</li>';
			}
			$out .= '</ul>';
		}
		return $out;
	}
	function inAttach($id) {
		$out = '';
		$sql = mysql_query ( "select `shop_items`.`id`, `shop_items`.`name`, `shop_items`.`price_rozn`, `shop_items`.`photo`, `shop_cat`.`name` as `catname` from `shop_items`, `shop_cat`, `shop_attach` where `shop_attach`.`iditem`='{$id}' and `shop_items`.`id`=`shop_attach`.`attach` and `shop_cat`.`id`=`shop_items`.`cat_id`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out = '<p class="txt1">В этом наборе:</p>';
			$out .= '<ul class="list5">';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$image = $this->getItemImage ( $row, 1 );
				if ($image != false) {
					$image = '<a href="?shop=' . $row ['id'] . '"><img  width="112" src="' . $image ['min'] . '" alt="" /></a>';
				} else {
					$image = '';
				}
				$out .= '<li>
				' . $image . '
				<h4><a href="?shop=' . $row ['id'] . '">' . $row ['name'] . '</a><span>' . $row ['catname'] . '</span></h4>
				<p>' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' руб.</p>
			</li>';
			}
			$out .= '</ul>';
		}
		return $out;
	}
	function getImagesNotId($id, $not, $min = '') {
		$images = array ();
		
		$sql = mysql_query ( "select * from `shop_images` where `iditem`='{$id}' and `id`!='{$not}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if ($min != "files/shop/s_{$row['id']}.{$row['photo']}") {
					$images [] = $row;
				}
			}
		}
		return $images;
	}
	function getCatItem($row, $last = false) {
		$out = "";
		$image = $this->getItemImage ( $row, 1 );
		$idImage = 0;
		$min = '';
		if ($image != false) {
			$idImage = ( int ) @$image ['id'];
			$min = $image ['min'];
			$image = '<img src="/thumbs/219x294/' . str_replace ( "files/shop/", "", $image ['big'] ) . '" alt="">';
		} else {
			$image = '';
		}
		$dopImage = '';
		if ($row ['new'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-red.gif" alt="" class="pic75" />';
		} elseif ($row ['onecs'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-blue.gif" alt="" class="pic75" />';
		} elseif ($row ['bestsell'] == 1) {
			$dopImage = '<img src="/template/default/img/pic75-yellow.gif" alt="" class="pic75" />';
		}
		$price = number_format ( $row ['price_rozn'], 0, ' ', ' ' );
		$price = number_format ( $row ['price_rozn'], 0, ' ', ' ' );
		$newPrice = $row ['price_opt'];
		if ($newPrice > 0) {
			$prices = '<span class="pr1">' . $price . '</span><span class="pr2"> ' . number_format ( $row ['price_opt'], 0, ' ', ' ' ) . ' <span>руб.</span></span>';
		} else {
			$prices = '<span class="pr2"> ' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' <span>руб.</span></span';
		}
		
		$out .= '<li class="">
				' . $dopImage . '
				<a href="?shop=' . $row ['id'] . '">' . $image . '</a>
				<p class="list220_p"><a href="?shop=' . $row ['id'] . '">' . $row ['name'] . '</a></p>
				<p>Цена: ' . $prices . '</p>
			</li>';
		/*
		 * $out .= '<li> <form method="post" action="/cart.html" id="basketForm'
		 * . $row ['id'] . '" name="basketForm"> <input type="hidden" name="add"
		 * value="' . $row ['id'] . '" /> <input type="hidden" name="size"
		 * id="basketSize' . $row ['id'] . '" /> </form> <form method="post"
		 * action="/cart.html" id="basketForm2' . $row ['id'] . '"
		 * name="basketForm"> <input type="hidden" name="add" value="' . $row
		 * ['id'] . '" /> <input type="hidden" name="size" id="basketSize2' .
		 * $row ['id'] . '" value="' . $firstSize . '" /> </form> ' .
		 * $scriptLoad . ' <span class="item253top"><img
		 * src="template/default/img/pix.gif" width="1" height="7" alt=""
		 * /></span> <div class="item253"> <div class="pictureArea" id="images'
		 * . $row ['id'] . '"> ' . $image . ' ' . $imgsNext . ' <a
		 * href="?shop&quickview=' . $row ['id'] . '" class="fastlink1"
		 * style="display: none;" onclick="return openQuickView(this)"><img
		 * id="desc' . $row ['id'] . '" src="template/default/img/pic132.gif"
		 * alt=""></a> <img style="display:' . (count ( $images ) > 0 ? 'block'
		 * : 'none') . '" onclick="changePrevImage(\'images' . $row ['id'] .
		 * '\')" src="template/default/img/arr9lt.gif" alt="" class="moveLeft"
		 * /> <img style="display:' . (count ( $images ) > 0 ? 'block' : 'none')
		 * . ';" onclick="changeNextImage(\'images' . $row ['id'] . '\')"
		 * src="template/default/img/arr9rt.gif" alt="" class="moveRight" /> ' .
		 * $promo . ' <div id="favorite'.$row['id'].'">'.$favorite.'</div>
		 * </div> <p class="itemData"><a href="?shop=' . $row ['id'] . '">' .
		 * $row ['name'] . '</a><span>' . $row ['prim'] . '</span></p> <table
		 * class="itemPrice"> <tr> <td> ' . $price . ' ' . $this->getCountDown (
		 * $row ) . ' </td> <td>' . $sizes . '</td> <td>' .
		 * ($this->isStockActive ( $row ) ? '<p>До конца акции:</p>' : '') . '<a
		 * href="#" onclick="document.getElementById(\'basketForm2' . $row
		 * ['id'] . '\').submit();return false;"><img
		 * src="template/default/img/btn98.gif" alt="" class="btn98" /></a></td>
		 * </tr> </table> </div> <span class="item253bottom"><img
		 * src="template/default/img/pix.gif" width="1" height="7" alt=""
		 * /></span> <script> hs.registerOverlay({ thumbnailId: \'desc' . $row
		 * ['id'] . '\', html: \'<div class="closebutton"	onclick="return
		 * hs.close(this)" title="Close"></div>\', position: \'top right\',
		 * fade: 2 // fading the semi-transparent overlay looks bad in IE });
		 * </script> </li>';
		 */
		return $out;
	}
	function pagginator($total_pages, $limit = 12) {
		$url = array (
				"shop" 
		);
		if (self::$New == true) {
			$url [] = "new";
		}
		if (self::$Search == true) {
			$url [] = "search";
		}
		if (isset ( $_GET ['catid'] )) {
			$url [] = "catid={$_GET['catid']}";
		}
		
		if (isset ( $_GET ['brand'] )) {
			$url [] = "brand={$_GET['brand']}";
		}
		if (isset ( $_GET ['catid'] )) {
			$url [] = "catid={$_GET['catid']}";
		}
		if (isset ( $_GET ['bestsell'] )) {
			$url [] = "bestsell={$_GET['bestsell']}";
		}
		
		$adjacents = 1;
		if (isset ( $_POST ['quickSearch'] )) {
			$page = 1;
		} else {
			$page = isset ( $_GET ['page'] ) ? ( int ) $_GET ['page'] : 1;
		}
		if ($page < 1) {
			$page = 1;
		}
		
		if ($page == 0) {
			$page = 1;
		}
		$add = '';
		$prev = $page - 1;
		$next = $page + 1;
		$lastpage = ceil ( $total_pages / $limit );
		
		$lpm1 = $lastpage - 1;
		
		$pagination = "";
		if ($lastpage > 1) {
			$pagination .= "<ul class=\"sortList2\">";
			
			if ($prev == 1) {
				$pagination .= '<li><a href="' . $add . '' . $this->genUrl ( true ) . '" class=\'sort_list_ul\'><img alt="" src="/template/default/img/arr29c.gif"></a></li>';
			} else {
				if ($prev < 1) {
					// $pagination .= '<li><a href="#"
				// style=\'text-decoration:none;
				// font-weight:normal\'>&laquo;</a></li>';
				} else {
					$new = array ();
					if ($prev != 1) {
						$new [] = "page={$prev}";
					}
					$pagination .= '<li><a href="' . $add . '' . $this->genUrl ( true, $new ) . '" class=\'sort_list_ul\'>&laquo;</a></li>';
				}
			}
			$now = $lastpage - (2 + ($adjacents * 2));
			if (($page - 2) >= 1 or ($page - 2) == 1) {
				$now = $page - 2;
			} elseif (($page - 2) < 1) {
				$now = 1;
			} 

			elseif ($lastpage - (2 + ($adjacents * 2)) > $page) {
				$now = $page;
			}
			$end = $lastpage;
			if (($now + 4) < $lastpage) {
				$end = $now + 4;
			}
			$tot = $end - $now + 1;
			
			if ($tot < 5 && $lastpage >= 5) {
				$now = $now - 2;
				if ($now < 1) {
					$now = 1;
				}
				
				$end = $end + 2;
				if ($end > $lastpage) {
					$end = $lastpage;
				}
			}
			for($counter = $now; $counter <= $end; $counter ++) {
				if ($counter == $page) {
					$pagination .= "<li class=\"curr1\"><span class=\"current\">$counter</span></li>";
				} else {
					$new = array ();
					if ($counter != 1) {
						$new [] = "page={$counter}";
					}
					$pagination .= "<li><a class='lister' href=\"" . $add . "" . $this->genUrl ( true, $new ) . "\">$counter</a></li>";
				}
			}
			// next button
			if ($page < $counter - 1) {
				$new = array ();
				$new [] = "page={$next}";
				// $pagination .= "<li><a href=\"" . $this->implode ( "&", $new
				// ) . "\"><img src=\"template/default/img/arrow16a.gif\"
				// alt=\"\" /></a></li>";
				$pagination .= "<li><a href=\"" . $this->genUrl ( true, $new ) . "\" class='sort_list_ul'>" . '<img alt="" src="/template/default/img/arr29d.gif">' . "</a></li>";
			} else {
				// $pagination .= "<li><a href=\"#\"><img
			// src=\"template/default/img/arrow16a.gif\" alt=\"\" /></a></li>";
				// $pagination .= "<li><a href=\"#\"
			// style='text-decoration:none;
			// font-weight:normal'>&raquo;</a></li>";
			}
			$pagination .= "</ul>";
		}
		return $pagination;
	}
	function getItemsFromCategories($id = "all", $orderBy = "order by `new` desc") {
		$per_page = 12;
		$Limited = false;
		$onShow = '<li><span>12</span></li>
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=36">36</a></li>						
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=all">все</a></li>		';
		if (isset ( $_SESSION ['ShowOnPage'] )) {
			switch ($_SESSION ['ShowOnPage']) {
				case "all" :
					$onShow = '<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=12">12</a></li>
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=36">36</a></li>
						<li><span>все</span></li>		';
					$Limited = true;
					break;
				case "12" :
					$onShow = '<li><span>12</span></li>
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=36">36</a></li>
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=all">все</a></li>		';
					
					$per_page = 12;
					break;
				case "36" :
					$onShow = '<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=12">12</a></li>
						<li><span>36</span></li>
						<li><a href="' . $this->genUrl ( true ) . '?ShowOnpage=all">все</a></li>		';
					
					$per_page = 36;
					break;
			}
		}
		
		$dopQuery = self::genQuickSearch ();
		if (! empty ( $dopQuery )) {
			$dopQuery .= " and ";
		}
		$onlyItems = self::getOnly ();
		if (isset ( $_POST ['quickSearch'] )) {
			$page = 0;
		} else {
			if (isset ( $_GET ['page'] )) {
				$page = $_GET ['page'] - 1;
			} else {
				$page = 0;
			}
		}
		$start = abs ( $per_page * $page );
		
		$sql = "";
		if ($id != 'all' && $id != 'sale' && $id != "dop" && $id != "new" && $id != 'search' && $id != 'favorite') {
			$testCategory = mysql_query ( "select `id` from `shop_cat` where `id`='$id'" );
			if (is_resource ( $testCategory ) && mysql_num_rows ( $testCategory ) == 0) {
				self::$error = true;
				return "Категории не существует";
			}
		}
		
		$nameSort = 'новинки';
		if (isset ( $_SESSION ['ShopSort'] )) {
			switch ($_SESSION ['ShopSort']) {
				case "new" :
					$orderBy = "order by `new` desc";
					$nameSort = 'новинки';
					break;
				case "bestsell" :
					$orderBy = "order by `bestsell` desc";
					$nameSort = 'бестселлеры';
					break;
				case "priceasc" :
					$orderBy = "order by `pos` desc, `price_rozn` asc";
					$nameSort = 'цена по возрастанию';
					break;
				case "pricedesc" :
					$orderBy = "order by `pos` desc,`price_rozn` desc";
					$nameSort = 'цена по убыванию';
					break;
				default :
					$orderBy = "order by `new` desc";
					$nameSort = 'новинки';
			}
		}
		
		$limitSql = "limit $start,$per_page";
		if ($Limited == true) {
			$limitSql = '';
		}
		switch ($id) {
			case "search" :
				$where = array ();
				if (isset ( $_GET ['price'] )) {
					switch (( int ) $_GET ['price']) {
						case 1 :
							$where [] = "`price_rozn`>='0' and `price_rozn`<='1000'";
							break;
						case 2 :
							$where [] = "`price_rozn`>='1000' and `price_rozn`<='3000'";
							break;
						case 3 :
							$where [] = "`price_rozn`>='3000' and `price_rozn`<='8000'";
							break;
					}
				}
				if (isset ( $_GET ['category'] ) && $_GET ['category'] != "-1") {
					$where [] = "`cat_id`='" . ( int ) $_GET ['category'] . "'";
				}
				if (count ( $where ) > 0) {
					$where = implode ( " and ", $where ) . ' and ';
				} else {
					$where = '';
				}
				
				$sql = "select * from `shop_items` where {$where} `cat_id`!='0'   $orderBy $limitSql";
				
				$sql_count = "select `id` from `shop_items` where {$where}  `cat_id`!='0' ";
				$sql_count2 = "select count(1) from `shop_items` where {$where}  `cat_id`!='0' ";
				break;
			case "new" :
				
				$dop = '';
				if (count ( $onlyItems ) > 0) {
					$dop = " and `id` in (" . implode ( ", ", $onlyItems ) . ")";
				}
				
				$sql = "select * from `shop_items` where `new`='1'  and `cat_id`!='0' {$dop}  $orderBy $limitSql";
				
				$sql_count = "select `id` from `shop_items` where  `new`='1'  and `cat_id`!='0'  {$dop}";
				$sql_count2 = "select count(1) from `shop_items` where  `new`='1'  and `cat_id`!='0' {$dop} ";
				break;
			case "favorite" :
				
				$dop = '';
				if (count ( $onlyItems ) > 0) {
					$dop = " and `shop_items`.`id` in (" . implode ( ", ", $onlyItems ) . ")";
				}
				
				$sql = "select `shop_items`.* from `shop_items`, `shop_favorite` where `shop_favorite`.`iditem`=`shop_items`.`id` and `shop_favorite`.`uid`='" . Users::$row ['id'] . "' and `shop_items`.`cat_id`!='0' {$dop}  $orderBy $limitSql";
				
				$sql_count = "select `shop_items`.`id` from `shop_items`, `shop_favorite` where `shop_favorite`.`iditem`=`shop_items`.`id` and `shop_favorite`.`uid`='" . Users::$row ['id'] . "'  and `shop_items`.`cat_id`!='0'  {$dop}";
				
				$sql_count2 = "select count(1) from `shop_items`, `shop_favorite` where `shop_favorite`.`iditem`=`shop_items`.`id` and `shop_favorite`.`uid`='" . Users::$row ['id'] . "' and `shop_items`.`cat_id`!='0' {$dop} ";
				break;
			default :
				$dop = '';
				if (count ( $onlyItems ) > 0) {
					$dop = " and `id` in (" . implode ( ", ", $onlyItems ) . ")";
				}
				$categorys = $this->testCategory ( $id );
				if ($categorys == 0) {
					$sql = "select * from `shop_items` where {$dopQuery} `cat_id`='$id'  and `cat_id`!='0' {$dop}  $orderBy $limitSql";
					$sql_count = "select `id` from `shop_items` where {$dopQuery} `cat_id`='$id'  and `cat_id`!='0'  {$dop}";
					$sql_count2 = "select count(*) from `shop_items` where `cat_id`='$id'  and `cat_id`!='0'  {$dop}";
				} else {
					$sql = "select * from `shop_items` where {$dopQuery} `cat_id` IN ($categorys)   and `cat_id`!='0' {$dop} $orderBy $limitSql";
					$sql_count = "select `id` from `shop_items` where {$dopQuery} `cat_id` IN ($categorys)   and `cat_id`!='0' {$dop}";
					$sql_count2 = "select count(*) from `shop_items` where  `cat_id` IN ($categorys)   and `cat_id`!='0' ";
				}
				break;
		}
		
		$results = mysql_query ( $sql );
		if (mysql_num_rows ( $results ) == 0) {
			$ss = mysql_result ( mysql_query ( $sql_count2 ), 0 );
			if ($ss == 0) {
				self::$error = true;
			}
			return "Нет ни одного товара";
		}
		$numColumns = 2;
		$i = 0;
		
		$lng = "";
		$pagelng = "Страница";
		
		if (isset ( $_SESSION ['lang'] ) && $_SESSION ['lang'] == "_en") {
			$pagelng = "Page";
			$lng = "_en";
		}
		
		$start = 1;
		
		$out = "";
		$count = mysql_query ( $sql_count );
		
		$total_rows = mysql_num_rows ( $count );
		
		$n = array (
				0 => (($_SESSION ['ShopSort'] == 'pricedesc') ? 'id="q29"' : ''),
				1 => (($_SESSION ['ShopSort'] == 'priceasc') ? 'id="q29"' : '') 
		);
		
		$pagg = $this->pagginator ( $total_rows, $per_page );
		if ($Limited) {
			$pagg = '';
		}
		$sortable = <<<HTML
		
		<table class="sort1">
			<tbody><tr>
				<td>
				<p class="sortTxt1">Сортировать по цене:</p>
				<ul class="sortList1">
						<li {$n[0]}><a href="{$this->genUrl(true)}?sort=pricedesc"><img alt="" src="/template/default/img/arr29a.gif"></a></li>
						<li {$n[1]}><a href="{$this->genUrl(true)}?sort=priceasc"><img alt="" src="/template/default/img/arr29b.gif"></a></li>
				</ul>
				</td>
				
				<td>
					{$pagg}
				</td>
				<td><p class="sortTxt2">Показывать по:</p></td>
				<td class="sort_cena_r">
					<ul class="sortList3">
						{$onShow}				
					</ul>
				</td>
			</tr>
		</tbody></table>
		
	
HTML;
		
		$i = 0;
		$b = 0;
		$out .= $sortable;
		$out .= '<ul class="list220">';
		while ( ($row = mysql_fetch_assoc ( $results )) != false ) {
			$i ++;
			$last = false;
			if ($i == 4) {
				$i = 0;
				$last = true;
			}
			self::$ShowItems [] = $row ['id'];
			$out .= $this->getCatItem ( $row, $last );
		}
		$out .= '</ul><div class="clear"></div>';
		$out .= $sortable;
		
		return $out;
	}
	function genQuickSearch() {
		$query = array ();
		$iditems = array ();
		if (isset ( $_SESSION ['quickSearch'] ) && is_array ( $_SESSION ['quickSearch'] )) {
			if (isset ( $_SESSION ['quickSearch'] ['colors'] ) && is_array ( $_SESSION ['quickSearch'] ['colors'] ) && count ( $_SESSION ['quickSearch'] ['colors'] ) > 0) {
				$sql = mysql_query ( "select `iditem` from `shop_colors_values` where `value`  in (" . implode ( ", ", $_SESSION ['quickSearch'] ['colors'] ) . ")" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
						$iditems [] = $row ['iditem'];
					}
				}
			}
			if (isset ( $_SESSION ['quickSearch'] ['sizes'] ) && is_array ( $_SESSION ['quickSearch'] ['sizes'] ) && count ( $_SESSION ['quickSearch'] ['sizes'] ) > 0) {
				$sql = mysql_query ( "select `iditem` from `shop_sizes_values` where `value`  in (" . implode ( ", ", $_SESSION ['quickSearch'] ['sizes'] ) . ")" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
						$iditems [] = $row ['iditem'];
					}
				}
			}
			if (isset ( $_SESSION ['quickSearch'] ['marks'] ) && is_array ( $_SESSION ['quickSearch'] ['marks'] ) && count ( $_SESSION ['quickSearch'] ['marks'] ) > 0) {
				$query [] = "`mark` in (" . implode ( ",", $_SESSION ['quickSearch'] ['marks'] ) . ")";
			}
			if (isset ( $_SESSION ['quickSearch'] ['sleeve_length'] ) && is_array ( $_SESSION ['quickSearch'] ['sleeve_length'] ) && count ( $_SESSION ['quickSearch'] ['sleeve_length'] ) > 0) {
				$query [] = "`sleeve_length` in (" . $this->implodeIn ( $_SESSION ['quickSearch'] ['sleeve_length'] ) . ")";
			}
			
			if (isset ( $_SESSION ['quickSearch'] ['priceFrom'] ) && isset ( $_SESSION ['quickSearch'] ['priceTo'] )) {
				$query [] = "`price_rozn`>='" . ( int ) $_SESSION ['quickSearch'] ['priceFrom'] . "'";
				$query [] = "`price_rozn`<='" . ( int ) $_SESSION ['quickSearch'] ['priceTo'] . "'";
			}
			
			if (isset ( $_SESSION ['quickSearch'] ['delivery'] ) && is_array ( $_SESSION ['quickSearch'] ['delivery'] ) && count ( $_SESSION ['quickSearch'] ['delivery'] ) > 0) {
				$query [] = "`delivery` in (" . $this->implodeIn ( $_SESSION ['quickSearch'] ['delivery'] ) . ")";
			}
			if (isset ( $_SESSION ['quickSearch'] ['length'] ) && is_array ( $_SESSION ['quickSearch'] ['length'] ) && count ( $_SESSION ['quickSearch'] ['length'] ) > 0) {
				$query [] = "`length` in (" . $this->implodeIn ( $_SESSION ['quickSearch'] ['length'] ) . ")";
			}
			if (count ( $iditems ) > 0) {
				self::$ShopQuickItems = $iditems;
			}
		}
		return implode ( " and ", $query );
	}
	function implodeIn($a) {
		foreach ( $a as $key => $value ) {
			$value = ( int ) $value;
			$a [$key] = "'{$value}'";
		}
		return implode ( ", ", $a );
	}
	function genUrl($rewrite = false, $dop = array(), $isSearch = false) {
		if (self::$Search == true) {
			$url = "/shop-search.html";
			$url .= '?query=' . (isset ( $_GET ['query'] ) ? $_GET ['query'] : '');
			$url .= '&category=' . (isset ( $_GET ['category'] ) ? $_GET ['category'] : '');
			$url .= '&price=' . (isset ( $_GET ['price'] ) ? $_GET ['price'] : '');
			$url .= "&" . implode ( "&", $dop );
			return $url;
		}
		$url = array ();
		$url [] = "?shop";
		if (self::$NowCat != 0) {
			$url [] = "catid=" . self::$NowCat;
		}
		
		$url = implode ( "&", $url );
		if ($rewrite == true) {
			$url = str_replace ( "?", "/", $url );
			$url = str_replace ( "&", "/", $url );
			$url = str_replace ( "=", "/", $url );
			$get = glb::$RewriteUrl->match ( $url );
			if ($get ['module'] == 'shop' && isset ( $get ['catid'] ) && isset ( glb::$rewriteUrls ['shop_cat'] [( int ) $get ['catid']] )) {
				
				$url = glb::$rewriteUrls ['shop_cat'] [( int ) $get ['catid']];
			} elseif ($get ['module'] == 'shop' && isset ( $get ['shop'] ) && isset ( glb::$rewriteUrls ['shop'] [( int ) $get ['shop']] )) {
				
				$url = glb::$rewriteUrls ['shop'] [( int ) $get ['shop']];
			}
			if (count ( $dop ) > 0) {
				$url .= '?' . implode ( "&", $dop );
			}
			
			// $url .= ".html";
		}
		if (substr ( $url, 0, 1 ) != '/') {
			return '/' . $url;
		}
		return $url;
	}
	function getItemImage($row, $mass = 0) {
		if (! empty ( $row ['photo'] ) && file_exists ( "files/shop/$row[photo]" )) {
			if ($mass == 0) {
				return "files/shop/$row[photo]";
			} else {
				return array (
						"min" => "files/shop/$row[photo]",
						"big" => "files/shop/" . str_replace ( "s", "b", $row ['photo'] ) 
				);
			}
		} else {
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row2 = mysql_fetch_array ( $sql ) ) {
					if (file_exists ( "files/shop/s_$row2[id].$row2[photo]" )) {
						if ($mass == 0) {
							return "files/shop/s_$row2[id].$row2[photo]";
						} else {
							return array (
									"id" => $row2 ['id'],
									"min" => "files/shop/s_$row2[id].$row2[photo]",
									"big" => "files/shop/b_$row2[id].$row2[photo]" 
							);
						}
					}
				}
			}
		}
		return false;
	}
	function testCategory($id) {
		if (! empty ( $id ) && is_numeric ( $id )) {
			$new = array ();
			self::implodeArray ( $this->getCatI ( $id ), $new );
			return implode ( ",", $new );
		}
	}
	function implodeArray($array, &$new) {
		if (is_array ( $array )) {
			foreach ( $array as $id ) {
				if (is_array ( $id )) {
					self::implodeArray ( $id, $new );
				} else {
					$new [] = $id;
				}
			}
		}
	}
	function getCatI($id) {
		$sql = mysql_query ( "select `id` from `shop_cat` where `parentId`='$id'" );
		$d = array ();
		$d [] = $id;
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$d [] = $this->getCatI ( $row ['id'] );
		}
		return $d;
	}
}
class shop_admin extends admin {
	function deleteAttach() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		mysql_query ( "delete from `shop_attach` where `id`='$id' limit 1" ) or die ( "{failure:true}" );
		echo "{success:true}";
	}
	function AddMassAttache() {
		$iditem = ( int ) $_POST ['iditem'];
		$_POST ['ids'] = stripslashes ( $_POST ['ids'] );
		$items = $this->JEncode ( $_POST ['ids'], 2 );
		$items = get_object_vars ( $items );
		// print_r($items);
		foreach ( $items as $id => $value ) {
			if ($id != 0 && ! empty ( $id )) {
				$this->AddAttach2 ( $iditem, $id );
			}
		}
		echo "{success:true}";
	}
	function AddAttach2($iditem, $idattach) {
		$test = mysql_result ( mysql_query ( "select COUNT(*) from `shop_attach` where `iditem`='$iditem' and `attach`='$idattach'" ), 0 );
		if ($test == 0) {
			mysql_query ( "insert into `shop_attach` values ('', '$iditem', '$idattach')" );
		}
	}
	function AddAttach() {
		$iditem = ( int ) $_POST ['iditem'];
		$idattach = ( int ) $_POST ['idattach'];
		$test = mysql_result ( mysql_query ( "select COUNT(*) from `shop_attach` where `iditem`='$iditem' and `attach`='$idattach'" ), 0 );
		if ($test == 0) {
			mysql_query ( "insert into `shop_attach` values ('', '$iditem', '$idattach')" ) or die ( "{failure:true}" );
		}
		echo "{success:true}";
	}
	function ListingAttachItems() {
		$idItem = ( int ) $_POST ['iditem'];
		$sql_count = "SELECT `shop_items`.`id`, `shop_items`.`art`, `shop_items`.`name`,`shop_attach`.`id` `idattach` FROM `shop_attach`, `shop_items` where `shop_attach`.`iditem`='$idItem' and `shop_items`.`id`=`shop_attach`.`attach`";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr2 ['Id'] = $this->en ( $obj ['id'] );
				$arr2 ['idAttach'] = $this->en ( $obj ['idattach'] );
				$arr2 ['art'] = $this->en ( $obj ['art'] );
				$arr2 ['name'] = $this->en ( $obj ['name'] );
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function totalEmails() {
		$dop = '';
		$group = isset ( $_POST ['to'] ) ? $this->encode ( $_POST ['to'] ) : '';
		if ($group != 'redactor_all' && ! empty ( $group )) {
			$dop = " and `TypeText`='" . mysql_real_escape_string ( $group ) . "'";
		} else {
		}
		$total = 0;
		$sql = mysql_query ( "select count(*) from `shop_users` where `Mailed`='1'{$dop}" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$total = mysql_result ( $sql, 0 );
		}
		echo json_encode ( array (
				"total" => $total 
		) );
	}
	function getUsersGroups() {
		$sql = mysql_query ( "select `TypeText` from `shop_users` group by `TypeText` order by `TypeText` asc" );
		$groups = array (
				array (
						"id" => "redactor_all",
						"state" => $this->en ( "Все группы" ) 
				) 
		);
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				if (! empty ( $row ['TypeText'] )) {
					$name = $this->en ( $row ['TypeText'] );
					$groups [] = array (
							"id" => $name,
							"state" => $name 
					);
				}
			}
		}
		echo json_encode ( array (
				"cats" => $groups 
		) );
	}
	function updateBase() {
		if (isset ( $_POST ['etap'] ) && $_POST ['etap'] == 1) {
			
			if (isset ( $_FILES ['photo-path'] ) && isset ( $_FILES ['photo-path'] ['name'] ) && ! empty ( $_FILES ['photo-path'] ['name'] )) {
				$ext = strtolower ( pathinfo ( $_FILES ['photo-path'] ['name'], PATHINFO_EXTENSION ) );
				$GroupUpdate = $_POST ['TypeText'];
				$Groups = array ();
				if ($ext == "xls") {
					set_time_limit ( 60 );
					ini_set ( "memory_limit", "50M" );
					require_once 'excel.php';
					if (is_readable ( $_FILES ['photo-path'] ['tmp_name'] )) {
						$price = new Spreadsheet_Excel_Reader ( $_FILES ['photo-path'] ['tmp_name'], true, "windows-1251" );
						$lastGroup = "";
						$res = array ();
						for($i = 2; $i <= $price->rowcount (); $i ++) {
							$colspan = $price->colspan ( $i, 1 );
							if ($colspan == 2) {
								$lastGroup = trim ( $price->val ( $i, 1 ) );
								if (! isset ( $Groups [$lastGroup] )) {
									$Groups [$lastGroup] = array ();
								}
								continue;
							}
							$name = trim ( $price->val ( $i, 1 ) );
							
							preg_match_all ( "/[a-z0-9_-]{1,20}@(([a-z0-9-]+\.)+(com|net|org|mil|edu|gov|arpa|info|biz|inc|ru|name|[a-z]{2})|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})/is", $price->val ( $i, 2 ), $emails );
							
							if (isset ( $emails [0] ) && count ( $emails [0] ) > 0) {
								foreach ( $emails [0] as $email ) {
									if (! empty ( $email )) {
										$Groups [$lastGroup] [] = array (
												$email,
												$name 
										);
									}
								}
							}
							$insert = array ();
							$GroupsNext = array ();
							$new = array ();
							foreach ( $Groups as $Group => $Emails ) {
								$GroupsNext [] = $Group;
								$new [$this->en ( $Group )] = $Emails;
								foreach ( $Emails as $num => $name ) {
									$em = mysql_real_escape_string ( $name [0] );
									$name = mysql_real_escape_string ( $name [1] );
									$Group2 = mysql_real_escape_string ( $Group );
									
									// $test = mysql_result ( mysql_query (
									// "select count(*) from `shop_users` where
									// `email`='{$em}'" ), 0 );
									
									// if ($test == 0) {
									// $insert [] = "('$em','{$name}',
									// '$Group2')";
									// }
								}
							}
						}
						$Groups = $this->arrayEncode ( $new );
						$GroupsNext = $this->arrayEncode ( $GroupsNext );
						
						echo json_encode ( array (
								"success" => true,
								"inserted" => "123",
								"Groups" => $GroupsNext,
								"result" => $Groups 
						) );
					} else {
						echo json_encode ( array (
								"failure" => true,
								"error" => "NotReadeble" 
						) );
					}
				} else {
					echo json_encode ( array (
							"failure" => true,
							"error" => "not xls" 
					) );
				}
			} else {
				echo json_encode ( array (
						"failure" => true,
						"no file" 
				) );
			}
		} elseif (isset ( $_POST ['loadGroups'] )) {
			$new = array ();
			$groups = $_POST ['loadGroups'];
			if (is_array ( $groups ) && count ( $groups ) > 0) {
				foreach ( $groups as $group ) {
					$new [] = array (
							"id" => $group,
							"state" => $group 
					);
				}
			}
			// $new = $this->arrayEncode($new);
			echo json_encode ( array (
					"cats" => $new 
			) );
		} elseif (isset ( $_POST ['etap'] ) && $_POST ['etap'] == 2) {
			
			$result = ( array ) $this->JEncode ( $_POST ['result'], 2 );
			$Type = explode ( ",", $_POST ['TypeText'] );
			
			if (is_array ( $result ) && count ( $result ) > 0) {
				
				foreach ( $result as $Group => $Emails ) {
					if (in_array ( $Group, $Type )) {
						foreach ( $Emails as $num => $name ) {
							
							$em = mysql_real_escape_string ( $name [0] );
							$name = mysql_real_escape_string ( str_replace ( "\\", "", $name [1] ) );
							$Group2 = mysql_real_escape_string ( $Group );
							
							$test = mysql_result ( mysql_query ( "select count(*) from `shop_users` where `email`='{$em}'" ), 0 );
							
							if ($test == 0) {
								$insert [] = "('$em','{$name}', '$Group2')";
							}
						}
					}
				}
				if (count ( $insert ) > 0) {
					$query = "insert into `shop_users` (`email`, `lname`, `TypeText`) values " . implode ( ",", $insert );
					mysql_query ( $query ) or die ( json_encode ( array (
							"failure" => true,
							"error" => "base error" 
					) ) );
					echo json_encode ( array (
							"success" => true 
					) );
				} else {
					echo json_encode ( array (
							"failure" => true,
							"error" => "no insert" 
					) );
				}
			} else {
				echo json_encode ( array (
						"failure" => true,
						"error" => "no values" 
				) );
			}
		}
	}
	function arrayEncode($ar) {
		$return = array ();
		if (is_array ( $ar )) {
			foreach ( $ar as $name => $value ) {
				$return [$name] = $this->arrayEncode ( $value );
			}
		} else {
			return $this->en ( $ar );
		}
		
		return $return;
	}
	function arrayDecode($ar) {
		$return = array ();
		if (is_array ( $ar )) {
			foreach ( $ar as $name => $value ) {
				$return [$this->encode ( $name )] = $this->arrayEncode ( $value );
			}
		} else {
			return $this->encode ( $str );
		}
		
		return $return;
	}
	function loadNewsletter() {
		$sql = mysql_query ( "select * from `Newsletter`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$row ['to'] = 'redactor_all';
			$row = $this->arrayEncode ( $row );
			
			echo json_encode ( array (
					"success" => true,
					"data" => $row 
			) );
			return true;
		}
		echo "{failure:true}";
	}
	function getEmail() {
		$sql = mysql_query ( "select `value` from `site_setting` where `option`='admin_email' limit 1" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			if (! empty ( $row ['value'] )) {
				return $row ['value'];
			}
		}
		return false;
	}
	function sendNewsletterTest() {
		$sql = mysql_query ( "select * from `Newsletter`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$mail = mysql_fetch_assoc ( $sql );
			$mail ['message'] = "<div style='color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'>{$mail['message']}</div>";
			
			$send = new Email ();
			$send->setFrom ( 'info@' . preg_replace ( "/www./is", "", getenv ( "HTTP_HOST" ) ), $mail ['name'] );
			$to = $this->getEmail ();
			$send->EmailHTML ( $to, $mail ['subject'], $mail ['message'] );
		}
		echo "{success:true}";
	}
	function saveNewsletter() {
		$subject = isset ( $_POST ['subject'] ) ? addslashes ( $this->encode ( $_POST ['subject'] ) ) : '';
		$message = isset ( $_POST ['message'] ) ? addslashes ( $this->encode ( $_POST ['message'] ) ) : '';
		$name = isset ( $_POST ['name'] ) ? addslashes ( $this->encode ( $_POST ['name'] ) ) : '';
		
		$sql = mysql_query ( "select * from `Newsletter`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			mysql_query ( "update `Newsletter` set `subject`='{$subject}', `name`='{$name}', `message`='{$message}'" );
		} else {
			mysql_query ( "insert into `Newsletter` values ('$subject','$message','{$name}')" );
		}
		echo "{success:true}";
	}
	function sendNewsletter() {
		set_time_limit ( 3600 );
		$to = isset ( $_POST ['to'] ) && $_POST ['to'] != "redactor_all" ? " where `TypeText`='" . mysql_real_escape_string ( $this->encode ( $_POST ['to'] ) ) . "' and `Mailed`='1'" : ' where `Mailed`="1"';
		$sql = mysql_query ( "select * from `Newsletter` " );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$mail = mysql_fetch_assoc ( $sql );
			$mail ['message'] = "<div style='color: #333;font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;font-size: 11px;'>{$mail['message']}</div>";
			
			$to = (isset ( $_POST ['to'] ) && $_POST ['to'] != "redactor_all") ? " where `TypeText`='" . mysql_real_escape_string ( $this->encode ( $_POST ['to'] ) ) . "'" : '';
			
			$sql = mysql_query ( "select * from `shop_users` {$to}" );
			while ( ($row = mysql_fetch_assoc ( $sql )) ) {
				$send = new Email ();
				$unlink = "http://" . getenv ( "HTTP_HOST" ) . "/?unsubscribe=" . base64_encode ( $row ['email'] );
				$unlink = "<a href='{$unlink}' target='_blank'>{$unlink}</a>";
				$mail ['message'] = preg_replace ( "/{linkmail}/is", $unlink, $mail ['message'] );
				$send->setFrom ( 'info@' . preg_replace ( "/www./is", "", getenv ( "HTTP_HOST" ) ), $mail ['name'] );
				$send->EmailHTML ( $row ['email'], $mail ['subject'], $mail ['message'] );
				usleep ( 30000 );
			}
		}
		echo "{success:true}";
	}
	function RecordUpdate() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		$_POST ['id'] = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		
		mysql_query ( "update `shop_items` set pos='$pos' where id='$_POST[id]'" );
		echo "33";
	}
	function __construct() {
		if (! isset ( $_SESSION ['admin'] )) {
			exit ( "{failure:true, login:true}" );
		}
	}
	function SaveDopSVItem() {
		if (isset ( $_POST ['DopSV'] )) {
			if (! isset ( $_POST ['onindex'] )) {
				$_POST ['onindex'] = 0;
			}
			if (! isset ( $_POST ['onlider'] )) {
				$_POST ['onlider'] = 0;
			}
			if (! isset ( $_POST ['onsells'] )) {
				$_POST ['onsells'] = 0;
			}
			if (! isset ( $_POST ['onecs'] )) {
				$_POST ['onecs'] = 0;
			}
			$onindex = $_POST ['onindex'];
			$onlider = $_POST ['onlider'];
			$onsells = $_POST ['onsells'];
			$onex = $_POST ['onecs'];
			$z = '';
			$z .= "`onindex`='$onindex'";
			$z .= ", `onlider`='$onlider'";
			$z .= ", `onsells`='$onsells'";
			$z .= ", `editorChoice`='" . (isset ( $_POST ['editorChoice'] ) ? ( int ) $_POST ['editorChoice'] : 0) . "'";
			$z .= ", `new`='" . (isset ( $_POST ['new'] ) ? ( int ) $_POST ['new'] : 0) . "'";
			$z .= ", `bestsell`='" . (isset ( $_POST ['bestsell'] ) ? ( int ) $_POST ['bestsell'] : 0) . "'";
			$z .= ", `onecs`='" . (isset ( $_POST ['onecs'] ) ? ( int ) $_POST ['onecs'] : 0) . "'";
			mysql_query ( "update shop_items set $z where id='$_POST[id]'" );
			// $z .= ", `onecs`='$onex'";
			
			if (isset ( $_POST ['colors'] ) && is_array ( $_POST ['colors'] ) && count ( $_POST ['colors'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['colors'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = $idColor;
					mysql_query ( "insert into `shop_colors_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
			}
			
			if (isset ( $_POST ['fullness'] ) && is_array ( $_POST ['fullness'] ) && count ( $_POST ['fullness'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['fullness'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = $idColor;
					mysql_query ( "insert into `shop_fullness_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
			}
			
			if (isset ( $_POST ['style'] ) && is_array ( $_POST ['style'] ) && count ( $_POST ['style'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['style'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = $idColor;
					mysql_query ( "insert into `shop_style_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
			}
			if (isset ( $_POST ['sizes'] ) && is_array ( $_POST ['sizes'] ) && count ( $_POST ['sizes'] ) > 0) {
				$notId = array ();
				// mysql_query ( "delete from `shop_sizes_values` where
				// `iditem`='{$_POST['id']}'" );
				
				foreach ( $_POST ['sizes'] as $idSize => $store ) {
					$idSize = ( int ) $idSize;
					$notId [] = "'{$idSize}'";
					$count = mysql_result ( mysql_query ( "select count(1) from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" ), 0 );
					if ($count == 0) {
						mysql_query ( "insert into `shop_sizes_values` (`iditem`, `value`, `store`) values ('{$_POST['id']}', '{$idSize}', '{$store}')" );
					} else {
						
						mysql_query ( "update `shop_sizes_values` set `store`='{$store}' where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" );
					}
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
			}
		}
		// echo "update shop_items set $z where id='$_POST[id]'";
		echo "{success:true}";
	}
	function UpdateIdTmpItem() {
		mysql_query ( "update shop_tmp set id='$_POST[Id]' where id='$_POST[old]'" ) or die ( mysql_error () );
		echo 33;
	}
	function UploadPhotoMassPhoto() {
		$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
		$uploadfile = $uploaddir . basename ( $_FILES ['photo-path'] ['name'] );
		$name2 = basename ( $_FILES ['photo-path'] ['name'] );
		if (eregi ( '.jpg', $name2 ) || eregi ( '.gif', $name2 ) || eregi ( '.png', $name2 )) {
			if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile )) {
				echo '{success:true}';
			} else {
				
				echo "{failure: true, msg:66}";
			}
		} else {
			$err = $this->en ( "Не правильный формат файла!" );
			$ss = array (
					"file" => array (
							"success" => false,
							"error" => $err 
					) 
			);
			$osh = $this->JEncode ( $ss );
			echo '{success:false, error:"GGG", msg:55, ' . $osh . '}';
		}
	}
	function ShopMassChangeCat() {
		$_POST ['id'] = stripslashes ( $_POST ['id'] );
		$items = $this->JEncode ( $_POST ['id'], 2 );
		foreach ( $items as $id => $value ) {
			mysql_query ( "update shop_items set cat_id='$_POST[catid]' where id='$id'" );
		}
		echo "{success:true}";
	}
	function ShopMassDelete() {
		$_POST ['id'] = stripslashes ( $_POST ['id'] );
		$items = $this->JEncode ( $_POST ['id'], 2 );
		foreach ( $items as $id => $value ) {
			$sql = mysql_query ( "delete from shop_items where id='$id'" );
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$id'" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$dir = $_SERVER ['DOCUMENT_ROOT'];
				while ( $row = mysql_fetch_array ( $sql ) ) {
					@unlink ( $dir . "/files/shop/s_$row[id].$row[photo]" );
					@unlink ( $dir . "/files/shop/b_$row[id].$row[photo]" );
					mysql_query ( "delete from `shop_images` where `id`='$row[id]'" );
				}
			}
			$sql = mysql_query ( "select * from `shop_items_comments` where `iditem`='$id'" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$dir = $_SERVER ['DOCUMENT_ROOT'];
				while ( $row = mysql_fetch_array ( $sql ) ) {
					$sql2 = mysql_query ( "select * from `shop_items_comments_img` where `iditem`='$row[id]'" );
					if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
						while ( ($row2 = mysql_fetch_assoc ( $sql2 )) != false ) {
							@unlink ( $dir . "/files/shop_comments/$row2[id].$row2[ext]" );
							mysql_query ( "delete from `shop_items_comments_img` where `id`='{$row2['id']}'" );
						}
					}
					mysql_query ( "delete from `shop_items_comments` where `id`='$row[id]'" );
				}
			}
			mysql_query ( "delete from `shop_items_rating` where `iditem`='{$id}'" );
			mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$id}'" );
			mysql_query ( "delete from `shop_colors_values` where `iditem`='{$id}'" );
		}
		echo "{success:true}";
	}
	function ShopMassTmpChangeCat() {
		$_POST ['id'] = stripslashes ( $_POST ['id'] );
		$items = $this->JEncode ( $_POST ['id'], 2 );
		foreach ( $items as $id => $value ) {
			if (isset ( $_POST ['ignorid'] ) && $_POST ['ignorid'] == "true") {
				$sql = mysql_query ( "select * from shop_tmp where id='$id'" );
				$row = mysql_fetch_array ( $sql );
				$cat_id = $_POST ['catid'];
				$art = addslashes ( $row ['art'] );
				$name = addslashes ( $row ['name'] );
				$price = $row ['price_rozn'];
				$kol = $row ['kol'];
				$mark = addslashes ( $row ['mark'] );
				$short = addslashes ( $row ['shortdesc'] );
				$full = addslashes ( $row ['fulldesc'] );
				mysql_query ( "insert into shop_items (`cat_id`, `art`, `name`, `kol`, `price_rozn`, `shortdesc`, `fulldesc`, `mark`) values ('$cat_id', '$art', '$name', '$kol', '$price', '$short', '$full', '$mark')" );
				mysql_query ( "delete from shop_tmp where id='$id'" );
			} elseif (isset ( $_POST ['ignorid'] ) && $_POST ['ignorid'] == 'false') {
				
				$test = mysql_num_rows ( mysql_query ( "select * from shop_items where id='$id'" ) );
				if ($test == 0) {
					
					$sql = mysql_query ( "select * from shop_tmp where id='$id'" );
					$row = mysql_fetch_array ( $sql );
					$id = $row ['id'];
					$cat_id = $_POST ['catid'];
					$art = addslashes ( $row ['art'] );
					$name = addslashes ( $row ['name'] );
					$price = $row ['price_rozn'];
					$kol = $row ['kol'];
					$mark = addslashes ( $row ['mark'] );
					$short = addslashes ( $row ['shortdesc'] );
					$full = addslashes ( $row ['fulldesc'] );
					mysql_query ( "insert into shop_items (`id`, `cat_id`, `art`, `name`, `kol`, `price_rozn`, `shortdesc`, `fulldesc`, `mark`) values ('$id', '$cat_id', '$art', '$name', '$kol', '$price', '$short', '$full', '$mark')" );
					mysql_query ( "delete from shop_tmp where id='$id'" );
				}
			}
		}
		echo "{success:true}";
	}
	function ShopMassTmpDelete() {
		$_POST ['id'] = stripslashes ( $_POST ['id'] );
		$items = $this->JEncode ( $_POST ['id'], 2 );
		foreach ( $items as $id => $value ) {
			mysql_query ( "delete from shop_tmp where id='$id'" );
		}
		echo "{success:true}";
	}
	function LoadShopConfig() {
		$sql_count = "SELECT * FROM settings_shop";
		$dd = mysql_query ( $sql_count );
		$arr = array ();
		while ( $obj = mysql_fetch_array ( $dd ) ) {
			if ($obj ['param'] == "valute") {
				switch ($obj ['value']) {
					case "0" :
						$arr ['valute_id'] = 0;
						
						break;
					case "1" :
						$arr ['valute_id'] = 1;
						break;
					case "2" :
						$arr ['valute_id'] = 2;
						break;
					default :
						$arr ['valute_id'] = 0;
						break;
				}
			}
			$arr [$obj ['param']] = $this->en ( $obj ['value'] );
		}
		
		$my = array (
				'success' => true,
				'data' => $arr 
		);
		
		echo $this->JEncode ( $my );
	}
	function SaveShopConfig() {
		if (count ( $_POST ) > 0) {
			foreach ( $_POST as $name => $value ) {
				if (! preg_match ( "/(module|task|xaction|valute)/is", $name ) or preg_match ( "/valute_id/is", $name )) {
					if (preg_match ( "/valute_id/is", $name )) {
						$name = "valute";
					}
					$test = mysql_result ( mysql_query ( "select COUNT(*) from `settings_shop` where `param`='$name'" ), 0 );
					if ($test == 0) {
						$v = addslashes ( $this->encode ( $value ) );
						mysql_query ( "insert into `settings_shop` values ('', '$name', '$v')" );
					} else {
						$v = addslashes ( $this->encode ( $value ) );
						mysql_query ( "update `settings_shop` set `value`='$v' where param='$name'" );
					}
				}
			}
		}
	}
	function ListOrdersShop() {
		$id = $_POST ['id'];
		$datestart = $_POST ['datestart'];
		$dateend = $_POST ['dateend'];
		if ($id == null) {
			$id = 0;
		}
		if ($datestart == null && $dateend == null) {
			$datestart = time ();
			$dateend = $datestart;
			$da = "`date`<='$datestart'";
		} else {
			$da = "`date` >= '$datestart' AND `date` <= '$dateend'";
		}
		if ($_POST ['st0'] != null or $_POST ['st1'] != null or $_POST ['st2'] != null) {
			$st = "and `status` in (";
		}
		if ($_POST ['st0'] != null) {
			$st .= "0";
		}
		if ($_POST ['st1'] != null) {
			if ($_POST ['st0'] != null) {
				$st .= ", 1";
			} else {
				$st .= "1";
			}
		}
		if ($_POST ['st2'] != null) {
			if ($_POST ['st0'] != null or $_POST ['st1'] != null) {
				$st .= ", 2";
			} else {
				$st .= "2";
			}
		}
		if ($_POST ['st0'] != null or $_POST ['st1'] != null or $_POST ['st2'] != null) {
			$st .= ")";
		}
		if ($_POST ['start'] == null) {
			$_POST ['start'] = 0;
		}
		if ($_POST ['limit'] == null) {
			$_POST ['limit'] = 25;
		}
		$sql_count = "SELECT * FROM `shop_orders` WHERE $da $st ORDER BY `date` DESC";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		
		$rows = mysql_num_rows ( $rs_count );
		
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs ) ) {
				// echo $obj;
				if ($o ['uid'] != null) {
					$sf = mysql_fetch_array ( mysql_query ( "select * from users_portal where id='$o[uid]'" ) );
					$sk = mysql_fetch_array ( mysql_query ( "select * from shop_sk_users where `uid`='$o[uid]'" ) );
					if (! $sk ['sk']) {
						$sk = 0;
					} else {
						$sk = $sk ['sk'];
					}
				}
				$arr2 ['id'] = $o ['id'];
				$arr2 ['date'] = date ( "Y-m-d", $o ['date'] );
				$arr2 ['tel'] = $this->en ( $o ['phone'] );
				$arr2 ['uid'] = $o ['uid'];
				$arr2 ['email'] = $o ['email'];
				$arr2 ['suma'] = $o ['suma'];
				$arr2 ['sk'] = $sk;
				$arr2 ['delivery'] = $this->en ( $o ['delivery'] );
				$arr2 ['delivery_price'] = $this->en ( $o ['delivery_price'] );
				$arr2 ['ob'] = $this->en ( $o ['obhvati'] );
				$arr2 ['adres'] = $this->en ( "Город:{$o['city']}, {$o['index']}, {$o['street']}<br/>{$o['house']}/{$o['korpus']} п.{$o['podezd']} э.{$o['level']} {$o['kv']}" );
				$arr2 ['status'] = $o ['status'];
				$arr2 ['fio'] = $this->en ( $o ['name'] );
				$arr2 ['company'] = $this->en ( $o ['company'] );
				$arr2 ['coment'] = $this->en ( $o ['comment'] );
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			// echo $jsonresult;
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function UpdateOrdersShop() {
		$id = $_POST ['id'];
		$status = $_POST ['status'];
		mysql_query ( "update shop_orders set status='$status' where id='$id'" ) or die ( "{failure:true}" );
		echo "33";
	}
	function update_nodes_shop($nodes, $parent_id = 0, $display_order = 0) {
		$display_order = 0;
		foreach ( $nodes as $id => $children ) {
			$display_order ++;
			$n = count ( $children );
			mysql_query ( "update shop_cat set `pos`='$display_order' where id='$id'" );
			$this->update_nodes_shop_children ( $children, $id );
		}
	}
	function update_nodes_shop_children($nodes, $parent_id = 0) {
		$display_order = 0;
		foreach ( $nodes as $id => $children ) {
			$display_order ++;
			$n = count ( $children );
			mysql_query ( "update shop_cat set `pos`='$display_order' where id='$id'" );
			$this->update_nodes_shop_children ( $children, $id );
		}
	}
	function SortOrderShop() {
		$nodes = "";
		$nodes .= "[";
		$nodes .= stripslashes ( $_POST ['nodes'] );
		$nodes .= "]";
		$mass = $this->JEncode ( $nodes, 2 );
		$this->update_nodes_shop ( $mass [0] );
	}
	function Load_Tree_Shop() {
		if (isset ( $_POST ['node'] ) && $_POST ['node'] != "0") {
			$jsonresult = $this->JEncode ( $this->getChild_Shop ( $_POST ['node'] ) );
			echo $jsonresult;
		}
		echo $this->JEncode ( $this->getRoot_Shop () );
	}
	function getRoot_Shop() {
		$sql = mysql_query ( "select * from shop_cat where parentId=0 order by `pos` ASC" );
		$num = mysql_num_rows ( $sql );
		if ($num == "0") {
			$nodes = "";
		}
		while ( $row = mysql_fetch_assoc( $sql ) ) {
			$nu = mysql_num_rows ( mysql_query ( "select * from shop_cat where parentId=$row[id]" ) );
			$child = $this->getChild_Shop ( $row ['id'] );
			$tmp = array ();
			$tmp ['text'] = $this->en ( $row ['name'] );
			$tmp ['id'] = $row ['id'];
			$tmp ['leaf'] = false;
			$tmp ['desc'] = $this->en ( $row ['desc'] );
			$tmp ['url'] = $this->en ( $row ['url'] );
			
			$tmp ['data'] = $this->decodeArray ( $row );
			$tmp ['children'] = $child;
			$nodes [] = $tmp;
		}
		return $nodes;
	}
	function getColumnsFromTable($tableName) {
		$columns = array ();
		$sql = mysql_query ( "SHOW COLUMNS FROM `{$tableName}`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$columns [] = $row ['Field'];
			}
		}
		return $columns;
	}
	function decodeArray($array) {
		foreach ( $array as $name => $value ) {
			$array [$name] = $this->en ( $value );
		}
		return $array;
	}
	function getChild_Shop($id) {
		$sql = mysql_query ( "select * from shop_cat where parentId='$id' order by `pos` ASC" );
		$num = mysql_num_rows ( $sql );
		$children = array ();
		while ( $row = mysql_fetch_assoc ( $sql ) ) {
			$child = $this->getChild_Shop ( $row ['id'] );
			$tmp = array ();
			$tmp ['text'] = $this->en ( $row ['name'] );
			$tmp ['id'] = $row ['id'];
			$tmp ['leaf'] = false;
			$tmp ['url'] = $this->en ( $row ['url'] );
			
			$tmp ['desc'] = $this->en ( $row ['desc'] );
			$tmp ['data'] = $this->decodeArray ( $row );
			$tmp ['children'] = $child;
			$children [] = $tmp;
		}
		if (isset ( $children ) && count ( $children ) == 0) {
			$children = "";
		}
		return $children;
	}
	function DeleteTmpShopItem() {
		$id = $_POST ['id'];
		if ($id != null) {
			$sql = mysql_query ( "delete from shop_tmp where id='$id'" );
		}
	}
	function winDecode($string) {
		if (is_array ( $string )) {
			$newArray = array ();
			foreach ( $string as $name => $value ) {
				if (is_array ( $value )) {
					$newArray [$name] = $this->winDecode ( $value );
				} else {
					if (is_string ( $value )) {
						$newArray [$name] = iconv ( "windows-1251", "utf-8", $value );
					} else {
						$newArray [$name] = $value;
					}
				}
			}
			return $newArray;
		} else {
			if (is_string ( $string )) {
				return iconv ( "windows-1251", "utf-8", $string );
			}
		}
		return $string;
	}
	function AddShopItem() {
		if (isset ( $_POST ['id'] )) {
			$id = $_POST ['id'];
		} else {
			$id = "";
		}
		if (isset ( $_POST ['title'] )) {
			$name = addslashes ( $this->encode ( $_POST ['title'] ) );
		} else {
			$name = "";
		}
		if (isset ( $_POST ['cat_id'] )) {
			$cat_id = $this->encode ( $_POST ['cat_id'] );
		} else {
			$cat_id = "";
		}
		if (isset ( $_POST ['newtext'] )) {
			$text = addslashes ( $this->encode ( $_POST ['newtext'] ) );
		} else {
			$text = "";
		}
		if (isset ( $_POST ['newfull'] )) {
			$full = addslashes ( $this->encode ( $_POST ['newfull'] ) );
		} else {
			$full = "";
		}
		if (isset ( $_POST ['post'] )) {
			$post = addslashes ( $this->encode ( $_POST ['post'] ) );
		} else {
			$post = "";
		}
		if (isset ( $_POST ['price_rozn'] )) {
			$opt = $this->encode ( $_POST ['price_rozn'] );
		} else {
			$opt = "";
		}
		if (isset ( $_POST ['rozn'] )) {
			$rozn = $this->encode ( $_POST ['rozn'] );
		} else {
			$rozn = "";
		}
		if (isset ( $_POST ['art'] )) {
			$art = addslashes ( $this->encode ( $_POST ['art'] ) );
		} else {
			$art = "";
		}
		if (isset ( $_POST ['kol'] )) {
			$kol = $_POST ['kol'];
		} else {
			$kol = "";
		}
		if (isset ( $_POST ['mark'] )) {
			$mark = addslashes ( $this->encode ( $_POST ['mark'] ) );
		} else {
			$mark = "";
		}
		if (isset ( $_POST ['onindex'] )) {
			$onindex = $_POST ['onindex'];
		} else {
			$onindex = "";
		}
		if (isset ( $_POST ['onlider'] )) {
			$onlider = $_POST ['onlider'];
		} else {
			$onlider = "";
		}
		if (isset ( $_POST ['onsells'] )) {
			$onsells = $_POST ['onsells'];
		} else {
			$onsells = "";
		}
		if (isset ( $_POST ['onecs'] )) {
			$onex = $_POST ['onecs'];
		} else {
			$onex = "";
		}
		if (is_null ( $post )) {
			$post = "";
		}
		
		$_POST ['id'] = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$stock = isset ( $_POST ['stock'] ) ? mysql_real_escape_string ( $_POST ['stock'] ) : 0;
		$youtube = isset ( $_POST ['youtube'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['youtube'] ) ) : '';
		$timeTo = isset ( $_POST ['timeTo'] ) ? mysql_real_escape_string ( $_POST ['timeTo'] ) : '00:00';
		$dateTo = isset ( $_POST ['dateTo'] ) ? mysql_real_escape_string ( $_POST ['dateTo'] ) : date ( "Y-m-d" );
		$z = "";
		$z .= ",`recom`='" . (isset ( $_POST ['recom'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['recom'] ) ) : '') . "'";
		$z .= ",`description`='" . (isset ( $_POST ['description'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['description'] ) ) : '') . "'";
		if (isset ( $_POST ['DopSV'] )) {
			$z .= ", `onindex`='$onindex'";
			$z .= ", `onlider`='$onlider'";
			$z .= ", `onsells`='$onsells'";
			$z .= ", `editorChoice`='" . (isset ( $_POST ['editorChoice'] ) ? ( int ) $_POST ['editorChoice'] : 0) . "'";
			$z .= ", `new`='" . (isset ( $_POST ['new'] ) ? ( int ) $_POST ['new'] : 0) . "'";
			$z .= ", `onecs`='" . (isset ( $_POST ['onecs'] ) ? ( int ) $_POST ['onecs'] : 0) . "'";
			
			$z .= ", `bestsell`='" . (isset ( $_POST ['bestsell'] ) ? ( int ) $_POST ['bestsell'] : 0) . "'";
			if (isset ( $_POST ['colors'] ) && is_array ( $_POST ['colors'] ) && count ( $_POST ['colors'] ) > 0) {
				$notId = array ();
				
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['colors'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_colors_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
			}
			
			if (isset ( $_POST ['fullness'] ) && is_array ( $_POST ['fullness'] ) && count ( $_POST ['fullness'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['fullness'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_fullness_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
			}
			
			if (isset ( $_POST ['style'] ) && is_array ( $_POST ['style'] ) && count ( $_POST ['style'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['style'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_style_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
			}
			if (isset ( $_POST ['sizes'] ) && is_array ( $_POST ['sizes'] ) && count ( $_POST ['sizes'] ) > 0) {
				$notId = array ();
				// mysql_query ( "delete from `shop_sizes_values` where
				// `iditem`='{$_POST['id']}'" );
				
				foreach ( $_POST ['sizes'] as $idSize => $store ) {
					$idSize = ( int ) $idSize;
					$notId [] = "'{$idSize}'";
					$count = mysql_result ( mysql_query ( "select count(1) from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" ), 0 );
					if ($count == 0) {
						mysql_query ( "insert into `shop_sizes_values` (`iditem`, `value`, `store`) values ('{$_POST['id']}', '{$idSize}', '{$store}')" );
					} else {
						
						mysql_query ( "update `shop_sizes_values` set `store`='{$store}' where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" );
					}
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
			}
		}
		
		if (isset ( $_POST ['metas'] )) {
			$z .= ', `TitlePage`=\'' . (isset ( $_POST ['title_page'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['title_page'] ) ) : '') . '\'';
			$z .= ', `DescPage`=\'' . (isset ( $_POST ['desc'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['desc'] ) ) : '') . '\'';
			$z .= ', `KeysPage`=\'' . (isset ( $_POST ['keys'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['keys'] ) ) : '') . '\'';
			$z .= ', `url`=\'' . (isset ( $_POST ['url'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['url'] ) ) : '') . '\'';
		}
		
		$sleeve_length = isset ( $_POST ['sleeve_length'] ) ? mysql_real_escape_string ( $_POST ['sleeve_length'] ) : '-1';
		$length = isset ( $_POST ['length'] ) ? mysql_real_escape_string ( $_POST ['length'] ) : '-1';
		$delivery = isset ( $_POST ['delivery'] ) ? mysql_real_escape_string ( $_POST ['delivery'] ) : '-1';
		
		$deliveryDesc = isset ( $_POST ['deliveryDesc'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['deliveryDesc'] ) ) : '';
		$sizesDesc = isset ( $_POST ['sizesDesc'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['sizesDesc'] ) ) : '';
		$caring = isset ( $_POST ['caring'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['caring'] ) ) : '';
		
		$alt = isset ( $_POST ['alt'] ) ? addslashes ( $this->encode ( $_POST ['alt'] ) ) : '';
		$ed = isset ( $_POST ['ed'] ) ? addslashes ( $this->encode ( $_POST ['ed'] ) ) : '';
		$ot50 = isset ( $_POST ['ot50'] ) ? addslashes ( $this->encode ( $_POST ['ot50'] ) ) : '';
		$ot100 = isset ( $_POST ['ot100'] ) ? addslashes ( $this->encode ( $_POST ['ot100'] ) ) : '';
		$ot150 = isset ( $_POST ['ot150'] ) ? addslashes ( $this->encode ( $_POST ['ot150'] ) ) : '';
		$valute = isset ( $_POST ['valute'] ) ? addslashes ( $_POST ['valute'] ) : 0;
		$mark_eng = $this->tr ( $this->encode ( $_POST ['mark'] ) );
		$sql = mysql_query ( "update shop_items set `youtube`='{$youtube}',`dateTo`='{$dateTo}', `timeTo`='{$timeTo}', `stock`='{$stock}',`deliveryDesc`='{$deliveryDesc}', `sizesDesc`='{$sizesDesc}', `caring`='{$caring}', `sleeve_length`='{$sleeve_length}', `length`='{$length}', `delivery`='{$delivery}', `prim`='" . (isset ( $_POST ['prim'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['prim'] ) ) : '') . "',art='$art', cat_id='$cat_id', name='$name', shortdesc='$text', fulldesc='$full', price_rozn='$rozn', price_opt='$opt', kol='$kol', mark='$mark', mark_eng='$mark_eng', `post`='$post' $z where id='$id'" ) or die ( mysql_error () );
		
		echo "{success:true}";
	}
	function printOrder() {
		$or = mysql_fetch_array ( mysql_query ( "select * from shop_orders where id='$_POST[id]'" ) );
		$d = "";
		$d .= '
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<center>
<table border="0" width="514" height="298">
	<tr>
		<td height="7" width="498" colspan="2">Номер заказ # ' . $or ['id'] . '</b></td>
	</tr>';
		
		$d .= '<tr>
		<td height="28" width="79">Ф.И.О</td>
		<td height="28" width="419">' . $or ['fio'] . '</td>
	</tr>
	<tr>
		<td height="29" width="79"><b>Телефон</b></td>
		<td height="29" width="419">' . $or ['tel'] . '</td>
	</tr>
	<tr>
		<td height="32" width="79">EMAIL</td>
		<td height="32" width="419">' . $or ['email'] . '</td>
	</tr>
	<tr>
		<td height="37" width="79">Коментарии</td>
		<td height="37" width="419">' . $or ['coment'] . '</td>
	</tr>';
		
		if ($or ['uid'] != 0) {
			
			$d .= '<tr><td>';
			
			$uid = $or ['uid'];
			
			$d .= '<table cellpadding="0" cellspacing="0" width="100%">';
			$sql = mysql_query ( "select * from userform" );
			while ( $row = mysql_fetch_array ( $sql ) ) {
				$ss = mysql_query ( "select * from userform_values where iduser='$uid' and idfield='$row[id]'" );
				$rr = mysql_fetch_array ( $ss );
				$d .= '<tr>
		<td><b>' . $row ['fieldLabel'] . '</b></td>
		<td>' . $rr ['value'] . '</td>
	</tr>
';
			}
			$d .= "</table>";
			
			$d .= '</td></tr>';
		}
		$d .= '
	<tr>
		<td height="7" width="514" colspan="2"><b>Заказ</b></td>
	</tr>
	<tr>
		<td height="94" width="514" colspan="2">
		<table border="0" width="525" height="1" id="table1">
			<tr>
				<td height="8" width="168">Наименование</td>
				<td height="8" width="118">Кол</td>
				<td height="8" width="73">Розн. Цена</td>
				<td height="8" width="51">Опт. Цена</td>
			</tr>
			';
		
		$sql = mysql_query ( "select * from shop_orders_items where id_order='$or[id]'" );
		while ( $itor = mysql_fetch_array ( $sql ) ) {
			$d .= '<tr>
				<td height="5" width="168">' . $itor ['name'] . '</td>
				<td height="5" width="118">' . $itor ['kol'] . '</td>
				<td height="5" width="-6">' . $itor ['price_rozn'] . '</td>
				<td height="5" width="73">' . $itor ['price_opt'] . '</td>';
			
			echo '</tr>';
			$total_rozn += $itor ['price_rozn'] * $itor ['kol'];
			$total_opt += $itor ['price_opt'] * $itor ['kol'];
		}
		$d .= '<tr>
				<td height="6" width="279" height="300" colspan="2"><b>Всего</b></td>
				<td height="6" width="70">' . $total_rozn . '</td>
				<td height="6" width="70">' . $total_opt . '</td>
			</tr>
		</table>
		</td>
	</tr>
</table>';
		echo $d;
	}
	function UpdateTMPShop() {
		if (isset ( $_POST ['id'] )) {
			$id = $_POST ['id'];
		} else {
			$id = "";
		}
		if (isset ( $_POST ['title'] )) {
			$name = addslashes ( $this->encode ( $_POST ['title'] ) );
		} else {
			$name = "";
		}
		if (isset ( $_POST ['cat_id'] )) {
			$cat_id = $this->encode ( $_POST ['cat_id'] );
		} else {
			$cat_id = "";
		}
		if (isset ( $_POST ['newtext'] )) {
			$text = addslashes ( $this->encode ( $_POST ['newtext'] ) );
		} else {
			$text = "";
		}
		if (isset ( $_POST ['newfull'] )) {
			$full = addslashes ( $this->encode ( $_POST ['newfull'] ) );
		} else {
			$full = "";
		}
		if (isset ( $_POST ['post'] )) {
			$post = addslashes ( $this->encode ( $_POST ['post'] ) );
		} else {
			$post = "";
		}
		if (isset ( $_POST ['opt'] )) {
			$opt = $this->encode ( $_POST ['opt'] );
		} else {
			$opt = "";
		}
		if (isset ( $_POST ['rozn'] )) {
			$rozn = $this->encode ( $_POST ['rozn'] );
		} else {
			$rozn = "";
		}
		if (isset ( $_POST ['art'] )) {
			$art = addslashes ( $this->encode ( $_POST ['art'] ) );
		} else {
			$art = "";
		}
		if (isset ( $_POST ['kol'] )) {
			$kol = $_POST ['kol'];
		} else {
			$kol = "";
		}
		if (isset ( $_POST ['mark'] )) {
			$mark_eng = $this->tr ( $this->encode ( $_POST ['mark'] ) );
			$mark = addslashes ( $this->encode ( $_POST ['mark'] ) );
		} else {
			$mark_eng = "";
			$mark = "";
		}
		if (isset ( $_POST ['onindex'] )) {
			$onindex = $_POST ['onindex'];
		} else {
			$onindex = "";
		}
		if (isset ( $_POST ['onlider'] )) {
			$onlider = $_POST ['onlider'];
		} else {
			$onlider = "";
		}
		if (isset ( $_POST ['onsells'] )) {
			$onsells = $_POST ['onsells'];
		} else {
			$onsells = "";
		}
		if (isset ( $_POST ['onecs'] )) {
			$onex = $_POST ['onecs'];
		} else {
			$onex = "";
		}
		$z = "";
		if (isset ( $_POST ['DopSV'] )) {
			$z .= ", `onindex`='$onindex'";
			$z .= ", `onlider`='$onlider'";
			$z .= ", `onsells`='$onsells'";
			$z .= ", `editorChoice`='" . (isset ( $_POST ['editorChoice'] ) ? ( int ) $_POST ['editorChoice'] : 0) . "'";
			$z .= ", `new`='" . (isset ( $_POST ['new'] ) ? ( int ) $_POST ['new'] : 0) . "'";
			$z .= ", `bestsell`='" . (isset ( $_POST ['bestsell'] ) ? ( int ) $_POST ['bestsell'] : 0) . "'";
			$z .= ", `onecs`='" . (isset ( $_POST ['onecs'] ) ? ( int ) $_POST ['onecs'] : 0) . "'";
			// $z .= ", `onecs`='$onex'";
		}
		
		$sql = mysql_query ( "update shop_items set art='$art', cat_id='$cat_id', name='$name', shortdesc='$text', fulldesc='$full', price_rozn='$rozn', price_opt='$opt', kol='$kol', mark='$mark', mark_eng='$mark_eng', `post`='$post' $z where id='$id'" ) or die ( mysql_error () );
		
		if (isset ( $_POST ['title_page'] )) {
			$title_page = addslashes ( $this->encode ( $_POST ['title_page'] ) );
		} else {
			$title_page = "";
		}
		if (isset ( $_POST ['desc'] )) {
			$desc = addslashes ( $this->encode ( $_POST ['desc'] ) );
		} else {
			$desc = "";
		}
		if (isset ( $_POST ['keys'] )) {
			$keys = addslashes ( $this->encode ( $_POST ['keys'] ) );
		} else {
			$keys = "";
		}
		if (isset ( $_POST ['title_page'] )) {
			$sql2 = mysql_query ( "update shop_items_dop set title='$title_page', desc='$desc', keys='$keys' where item='$id'" );
		}
		if (isset ( $_POST ['DopSV'] )) {
			$dr = mysql_query ( "select * from shop_dop" );
			$sv = "";
			while ( $rd = mysql_fetch_array ( $dr, MYSQL_ASSOC ) ) {
				if (isset ( $_POST ['dop_' . $rd ['id']] )) {
					$test = mysql_result ( mysql_query ( "select COUNT(*) from `shop_dop_values` where `iditem`='$_POST[id]' and `value`='$rd[id]'" ), 0 );
					if ($test == 0) {
						mysql_query ( "insert into `shop_dop_values` (`iditem`, `value`) values ('$_POST[id]', '$rd[id]')" );
					}
					$sv .= ",$rd[id]";
				} else {
					$test = mysql_result ( mysql_query ( "select COUNT(*) from `shop_dop_values` where `iditem`='$_POST[id]' and `value`='$rd[id]'" ), 0 );
					if ($test > 0) {
						mysql_query ( "delete from `shop_dop_values` where `iditem`='$_POST[id]' and `value`='$rd[id]'" );
					}
				}
			}
		}
		echo "{success:true}";
	}
	function CreateItemTmpShop() {
		$sql = mysql_query ( "insert into shop_items (id, cat_id) values (null, 0)" );
		$id = mysql_insert_id ();
		$sql2 = mysql_query ( "insert into shop_items_dop values('', '$id', '', '', '')" );
		echo "$id";
	}
	function ResizeImage($image_from, $image_to, $fitwidth = 450, $fitheight = 450, $quality = 100) {
		global $php_inc;
		$os = $originalsize = getimagesize ( $image_from );
		if ($originalsize [2] != 2 && $originalsize [2] != 3 && $originalsize [2] != 6 && ($originalsize [2] < 9 or $originalsize [2] > 12)) {
			return false;
		}
		if ($originalsize [0] > $fitwidth or $originalsize [1] > $fitheight) {
			$h = getimagesize ( $image_from );
			if (($h [0] / $fitwidth) > ($h [1] / $fitheight)) {
				$fitheight = $h [1] * $fitwidth / $h [0];
			} else {
				$fitwidth = $h [0] * $fitheight / $h [1];
			}
			if ($os [2] == 2 or ($os [2] >= 9 && $os [2] <= 12))
				$i = ImageCreateFromJPEG ( $image_from );
			if ($os [2] == 3)
				$i = ImageCreateFromPng ( $image_from );
			$o = ImageCreateTrueColor ( $fitwidth, $fitheight );
			imagecopyresampled ( $o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1] );
			imagejpeg ( $o, $image_to, $quality );
			chmod ( $image_to, 0777 );
			imagedestroy ( $o );
			imagedestroy ( $i );
			return 2;
		}
		if ($originalsize [0] <= $fitwidth && $originalsize [1] <= $fitheight) {
			$i = ImageCreateFromJPEG ( $image_from );
			imagejpeg ( $i, $image_to, $quality );
			chmod ( $image_to, 0777 );
			return 1;
		}
	}
	function si($img, $d = 's') {
		$sizes = getimagesize ( $img );
		$width = $sizes [0];
		$height = $sizes [1];
		if ($height > $width) {
			return "h";
		} elseif ($height < $width) {
			return "w";
		}
	}
	function UpdateLastName($name) {
		if (file_exists ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/infoLastImportFile.txt" )) {
			unlink ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/infoLastImportFile.txt" );
		}
		$file = fopen ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/infoLastImportFile.txt", "a" );
		if (file_exists ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/infoLastImportFile.txt" )) {
			chmod ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/infoLastImportFile.txt", 0777 );
			if ($file) {
				fwrite ( $file, $name );
				fclose ( $file );
			}
		}
	}
	function ImportCsvShop() {
		$p = pathinfo ( basename ( $_FILES ['price'] ['name'] ) );
		$this->UpdateLastName ( basename ( $_FILES ['price'] ['name'] ) );
		$ext = "";
		if (isset ( $p ['extension'] )) {
			$ext = $p ['extension'];
		}
		if (! preg_match ( "/xls/is", $ext )) {
			echo "{failure:true, error:'2'}";
			return true;
		}
		if (file_exists ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/www.xls" )) {
			unlink ( $_SERVER ['DOCUMENT_ROOT'] . "/tmp/www.xls" );
		}
		$upload = $_SERVER ['DOCUMENT_ROOT'] . "/tmp/www.xls";
		if (move_uploaded_file ( $_FILES ['price'] ['tmp_name'], $upload )) {
			chmod ( $upload, 0777 );
			new import ();
		}
	}
	function UploadPhotoShopItem() {
		$z = 0;
		mysql_query ( "insert into `shop_images` values ('', '$_POST[id]', '')" );
		$id = mysql_insert_id ();
		$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
		$p = pathinfo ( basename ( $_FILES ['big'] ['name'] ) );
		$p2 = pathinfo ( basename ( $_FILES ['min'] ['name'] ) );
		$ext = $p ['extension'];
		$ext2 = $p2 ['extension'];
		
		$uploadfile1 = $uploaddir . "b_{$id}.{$ext}";
		$uploadfile2 = $uploaddir . "s_$id.{$ext2}";
		if (! preg_match ( "/{$ext}/is", $ext2 )) {
			echo "{failure:true, error:1}";
			exit ();
		}
		if (! isset ( $_FILES ['big'] )) {
			if (! empty ( $id )) {
				mysql_query ( "delete from `shop_images` where `id`='$id'" );
			}
			echo "{success:false, msg:1}";
		}
		
		if (preg_match ( "/(jpg|jpeg|bmp|gif|png)/is", $ext ) && preg_match ( "/(jpg|jpeg|bmp|gif|png)/is", $ext2 )) {
			if (move_uploaded_file ( $_FILES ['big'] ['tmp_name'], $uploadfile1 )) {
				if (move_uploaded_file ( $_FILES ['min'] ['tmp_name'], $uploadfile2 )) {
					$s1 = getimagesize ( $uploadfile1 );
				} else {
					if (file_exists ( $uploadfile1 )) {
						unlink ( $uploadfile1 );
					}
					if (! empty ( $id )) {
						mysql_query ( "delete from `shop_images` where `id`='$id'" );
					}
					echo "{success:false, msg:1}";
					exit ();
				}
			} else {
				if (! empty ( $id )) {
					mysql_query ( "delete from `shop_images` where `id`='$id'" );
				}
				echo "{success:false, msg:1}";
				exit ();
			}
			
			$s2 = getimagesize ( $uploadfile2 );
			if ($s2 [0] != 155 && $s2 [1] != 205) {
				$error = 5;
			} else {
				$error = 0;
			}
			// if ($s2[])
			mysql_query ( "update `shop_images` set `photo`='$ext' where `id`='$id'" );
			echo '{success:true, ez:' . $error . '}';
		} else {
			if (! empty ( $id )) {
				mysql_query ( "delete from `shop_images` where `id`='$id'" );
			}
			$err = $this->en ( "Не правильный формат файла!" );
			$ss = array (
					"file" => array (
							"success" => false,
							"error" => $err 
					) 
			);
			$osh = $this->JEncode ( $ss );
			echo '{success:false, error:"GGG", msg:55}';
		}
	}
	function UploadPhotoShopItem2() {
		$z = 0;
		
		$sql = mysql_query ( "insert into `shop_colors` (`itemid`,`desc`) values ('$_POST[id]', '" . addslashes ( $_POST ['desc'] ) . "')" );
		$idi = mysql_insert_id ();
		$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
		$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
		$num = $z + 1;
		$ext = $p ['extension'];
		$uploadfile1 = $uploaddir . "bc_{$idi}.$ext";
		$uploadfile2 = $uploaddir . "sc_{$idi}.$ext";
		mysql_query ( "update `shop_colors` set `ext`='$ext' where `id`='$idi'" );
		if (! isset ( $_FILES ['photo-path'] )) {
			mysql_query ( "delete from `shop_colors` where `id`='$idi'" );
			echo "{success:false, msg:1}";
		}
		$name2 = basename ( $_FILES ['photo-path'] ['name'] );
		if (preg_match ( "/(jpg|jpeg|bmp|gif|png)/is", $ext )) {
			if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile1 )) {
				$s1 = getimagesize ( $uploadfile1 );
				if ($s1 [1] > 400) {
					$this->ResizeImage ( $uploadfile1, $uploadfile1, "400", "400" );
				}
				if (copy ( $uploadfile1, $uploadfile2 )) {
					$this->ResizeImage ( $uploadfile2, $uploadfile2, "80", "97" );
				}
			}
			
			$s1 = getimagesize ( $uploadfile1 );
			$s2 = getimagesize ( $uploadfile2 );
			$w1 = $s1 [0];
			$w2 = $s1 [0];
			if ($w1 > 400) {
				$this->ResizeImage ( $uploadfile1, $uploadfile1, "400", "400" );
			}
			if ($w2 > 140) {
				$this->ResizeImage ( $uploadfile2, $uploadfile2, "80", "97" );
			}
			echo '{success:true, msg:"' . $uploadfile2 . '"}';
		} else {
			mysql_query ( "delete from `shop_colors` where `id`='$idi'" );
			$err = en ( "Не правильный формат файла!" );
			$ss = array (
					"file" => array (
							"success" => false,
							"error" => $err 
					) 
			);
			$osh = JEncode ( $ss );
			echo '{success:false, error:"GGG", msg:55, ' . $osh . '}';
		}
	}
	function GetListPhotosItemShop() {
		if (isset ( $_POST ['id'] ) && ! empty ( $_POST ['id'] )) {
			$ii = mysql_fetch_array ( mysql_query ( "select * from shop_items where id='$_POST[id]'" ) );
			$zd = mysql_query ( "select * from `shop_images` where `iditem`='$_POST[id]'" );
			$ii = $ii ['photo'];
			$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
			
			while ( $row = mysql_fetch_array ( $zd ) ) {
				
				if (file_exists ( $dir . "s_$row[id].$row[photo]" )) {
					
					if ($ii == "s_$row[id].$row[photo]") {
						$osn = "s_$row[id].$row[photo]" . "<br>(Основная)";
					} else {
						$osn = "s_$row[id].$row[photo]";
					}
					$osn = $this->en ( $osn );
					$idim = $row ['id'];
					$images [] = array (
							'name' => "s_$row[id].$row[photo]",
							'size' => $osn,
							'url' => 'files/shop/' . "s_$row[id].$row[photo]",
							'osn' => $osn,
							'idim' => $idim 
					);
				} else {
					
					mysql_query ( "delete from `shop_images` where `id`='$row[id]'" );
				}
			}
			
			if (count ( $images ) == 0) {
				$images = "";
			}
			$o = array (
					'images' => $images 
			);
			echo $this->JEncode ( $o );
		} else {
			echo "{'images':[]}";
		}
	}
	function GetListPhotosItemShop2() {
		if (isset ( $_POST ['id'] ) && $_POST ['id'] != null) {
			$ii = mysql_query ( "select * from `shop_colors` where `itemid`='$_POST[id]'" );
			if (mysql_num_rows ( $ii ) > 0) {
				while ( $row = mysql_fetch_array ( $ii ) ) {
					
					$osn = $row ['desc'];
					$id = $row ['id'];
					
					$ext = $row ['ext'];
					$osn = $this->en ( $osn );
					$img = "sc_{$row['id']}.{$row['ext']}";
					$images [] = array (
							'name' => $img,
							'size' => $osn,
							'id' => $id,
							'ext' => $ext,
							'url' => 'files/shop/' . $img,
							'osn' => $osn 
					);
				}
				$o = array (
						'images' => $images 
				);
				echo $this->JEncode ( $o );
			} else {
				echo "{'images':[]}";
			}
		} else {
			echo "{'images':[]}";
		}
	}
	function DeletePhotoItemShop() {
		$id = $_POST ['id'];
		$idim = $_POST ['idim'];
		$im = $_POST ['image'];
		$im2 = str_replace ( "s_", "b_", $_POST ['image'] );
		$sql = mysql_query ( "select * from `shop_images` where `id`='$idim'" );
		if (mysql_num_rows ( $sql ) > 0) {
			$dir = $_SERVER ['DOCUMENT_ROOT'];
			
			$row = mysql_fetch_array ( $sql );
			
			if (unlink ( $dir . "/files/shop/s_$row[id].$row[photo]" )) {
				unlink ( $dir . "/files/shop/b_$row[id].$row[photo]" );
				echo "{success:true}";
			}
		} else {
			echo "{success:true}";
		}
	}
	function EditShopImageDesc() {
		$id = $_POST ['id'];
		$desc = addslashes ( $this->encode ( $_POST ['desc'] ) );
		mysql_query ( "update `shop_colors` set `desc`='$desc' where `id`='$id'" );
		echo "{success:true}";
	}
	function DeletePhotoItemShop2() {
		$id = $_POST ['id'];
		$im = $_POST ['image'];
		$ext = $_POST ['ext'];
		mysql_query ( "delete from `shop_colors` where `id`='$im'" );
		
		$im2 = str_replace ( "sc_", "bc_", $_POST ['image'] );
		$dir = $_SERVER ['DOCUMENT_ROOT'];
		if (unlink ( $dir . "/files/shop/sc_{$im}.{$ext}" )) {
			unlink ( $dir . "/files/shop/bc_{$im}.{$ext}" );
			echo "{success:true}";
		}
	}
	function LISTORDERITEMS() {
		$id = isset ( $_POST ['orderId'] ) ? ( int ) $_POST ['orderId'] : 0;
		$sql_count = "SELECT * FROM `shop_orders_items` WHERE `id_order`='$id'";
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql_count ) or die ( "HELLO" );
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				
				$arr2 ['id'] = $o ['id'];
				$arr2 ['id_order'] = $o ['id_order'];
				$arr2 ['kol'] = $o ['kol'];
				$arr2 ['price_rozn'] = $o ['price_rozn'];
				$arr2 ['price'] = $o ['price_rozn'];
				$arr2 ['sk'] = $o ['sk'];
				$arr2 ['sk2'] = $o ['sk2'];
				$arr2 ['all'] = $o ['price_rozn'] * $o ['kol'];
				
				$arr2 ['name'] = $this->en ( $o ['name'] . " (размер: {$o['size']}, цвет: {$o['color']}, стиль:{$o['style']}, полнота:{$row['fullness']} )" );
				$arr2 ['art'] = $this->en ( $o ['art'] );
				
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			// echo $jsonresult;
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function ShopIndexImage() {
		mysql_query ( "update shop_items set `photo`='$_POST[image]' where id='$_POST[id]'" ) or die ( mysql_error () );
		echo "{success:true}";
	}
	function DeleteShopItem() {
		$_POST ['id'] = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$sql = mysql_query ( "delete from shop_items where id='$_POST[id]'" );
		$sql = mysql_query ( "select * from `shop_images` where `iditem`='$_POST[id]'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$dir = $_SERVER ['DOCUMENT_ROOT'];
			while ( $row = mysql_fetch_array ( $sql ) ) {
				@unlink ( $dir . "/files/shop/s_$row[id].$row[photo]" );
				@unlink ( $dir . "/files/shop/b_$row[id].$row[photo]" );
				mysql_query ( "delete from `shop_images` where `id`='$row[id]'" );
			}
		}
		$sql = mysql_query ( "select * from `shop_items_comments` where `iditem`='$_POST[id]'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$dir = $_SERVER ['DOCUMENT_ROOT'];
			while ( $row = mysql_fetch_array ( $sql ) ) {
				$sql2 = mysql_query ( "select * from `shop_items_comments_img` where `iditem`='$row[id]'" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					while ( ($row2 = mysql_fetch_assoc ( $sql2 )) != false ) {
						@unlink ( $dir . "/files/shop_comments/$row2[id].$row2[ext]" );
						mysql_query ( "delete from `shop_items_comments_img` where `id`='{$row2['id']}'" );
					}
				}
				mysql_query ( "delete from `shop_items_comments` where `id`='$row[id]'" );
			}
		}
		mysql_query ( "delete from `shop_items_rating` where `iditem`='{$_POST['id']}'" );
		mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
		mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
		echo "55";
	}
	function EditShopItem() {
		if (isset ( $_POST ['onindex'] )) {
			$onindex = $_POST ['onindex'];
		} else {
			$onindex = "";
		}
		;
		if (isset ( $_POST ['onlider'] )) {
			$onlider = $_POST ['onlider'];
		} else {
			$onlider = "";
		}
		if (isset ( $_POST ['onecs'] )) {
			$onex = $_POST ['onecs'];
		} else {
			$onex = "";
		}
		if (isset ( $_POST ['onsells'] )) {
			$onsells = $_POST ['onsells'];
		} else {
			$onsells = "";
		}
		if (isset ( $_POST ['mark'] )) {
			$mark_eng = $this->tr ( $this->encode ( $_POST ['mark'] ) );
			$mark = addslashes ( $this->encode ( $_POST ['mark'] ) );
		} else {
			$mark_eng = "";
			$mark = "";
		}
		if (isset ( $_POST ['art'] )) {
			$art = $this->encode ( $_POST ['art'] );
		} else {
			$art = "";
		}
		if (isset ( $_POST ['title'] )) {
			$title = addslashes ( $this->encode ( $_POST ['title'] ) );
		} else {
			$title = "";
		}
		if (isset ( $_POST ['shortdesc'] )) {
			$shortdesc = $this->encode ( addslashes ( $_POST ['shortdesc'] ) );
		} else {
			$shortdesc = "";
		}
		if (isset ( $_POST ['price_rozn'] )) {
			$opt = addslashes ( $this->encode ( $_POST ['price_rozn'] ) );
		} else {
			$opt = "";
		}
		if (isset ( $_POST ['rozn'] )) {
			$rozn = addslashes ( $this->encode ( $_POST ['rozn'] ) );
		} else {
			$rozn = "";
		}
		if (isset ( $_POST ['post'] )) {
			$post = $this->encode ( addslashes ( $_POST ['post'] ) );
		} else {
			$post = "";
		}
		if (isset ( $_POST ['kol'] )) {
			$kol = $this->encode ( addslashes ( $_POST ['kol'] ) );
		} else {
			$kol = "";
		}
		
		$z = "";
		$z .= ",`recom`='" . (isset ( $_POST ['recom'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['recom'] ) ) : '') . "'";
		$z .= ",`description`='" . (isset ( $_POST ['description'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['description'] ) ) : '') . "'";
		
		if (isset ( $_POST ['DopSV'] )) {
			$z .= ", `onindex`='$onindex'";
			$z .= ", `onlider`='$onlider'";
			$z .= ", `onsells`='$onsells'";
			$z .= ", `editorChoice`='" . (isset ( $_POST ['editorChoice'] ) ? ( int ) $_POST ['editorChoice'] : 0) . "'";
			$z .= ", `new`='" . (isset ( $_POST ['new'] ) ? ( int ) $_POST ['new'] : 0) . "'";
			$z .= ", `bestsell`='" . (isset ( $_POST ['bestsell'] ) ? ( int ) $_POST ['bestsell'] : 0) . "'";
			$z .= ", `onecs`='" . (isset ( $_POST ['onecs'] ) ? ( int ) $_POST ['onecs'] : 0) . "'";
			if (isset ( $_POST ['colors'] ) && is_array ( $_POST ['colors'] ) && count ( $_POST ['colors'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['colors'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_colors_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_colors_values` where `iditem`='{$_POST['id']}'" );
			}
			if (isset ( $_POST ['fullness'] ) && is_array ( $_POST ['fullness'] ) && count ( $_POST ['fullness'] ) > 0) {
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				$notId = array ();
				foreach ( $_POST ['fullness'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_fullness_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_fullness_values` where `iditem`='{$_POST['id']}'" );
			}
			
			if (isset ( $_POST ['style'] ) && is_array ( $_POST ['style'] ) && count ( $_POST ['style'] ) > 0) {
				$notId = array ();
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				foreach ( $_POST ['style'] as $idColor ) {
					$idColor = ( int ) $idColor;
					$notId [] = "'{$idColor}'";
					mysql_query ( "insert into `shop_style_values` (`iditem`, `value`) values ('{$_POST['id']}', '{$idColor}')" );
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_style_values` where `iditem`='{$_POST['id']}'" );
			}
			if (isset ( $_POST ['sizes'] ) && is_array ( $_POST ['sizes'] ) && count ( $_POST ['sizes'] ) > 0) {
				$notId = array ();
				// mysql_query ( "delete from `shop_sizes_values` where
				// `iditem`='{$_POST['id']}'" );
				
				foreach ( $_POST ['sizes'] as $idSize => $store ) {
					$idSize = ( int ) $idSize;
					$notId [] = "'{$idSize}'";
					$count = mysql_result ( mysql_query ( "select count(1) from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" ), 0 );
					if ($count == 0) {
						mysql_query ( "insert into `shop_sizes_values` (`iditem`, `value`, `store`) values ('{$_POST['id']}', '{$idSize}', '{$store}')" );
					} else {
						mysql_query ( "update `shop_sizes_values` set `store`='{$store}' where `iditem`='{$_POST['id']}' and `value`='{$idSize}'" );
					}
				}
				if (count ( $notId ) > 0) {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}' and `value` not in (" . implode ( ",", $notId ) . ")" );
				} else {
					mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
				}
			} else {
				mysql_query ( "delete from `shop_sizes_values` where `iditem`='{$_POST['id']}'" );
			}
		}
		if (isset ( $_POST ['metas'] )) {
			$z .= ', `TitlePage`=\'' . (isset ( $_POST ['title_page'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['title_page'] ) ) : '') . '\'';
			$z .= ', `DescPage`=\'' . (isset ( $_POST ['desc'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['desc'] ) ) : '') . '\'';
			$z .= ', `KeysPage`=\'' . (isset ( $_POST ['keys'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['keys'] ) ) : '') . '\'';
			$z .= ', `url`=\'' . (isset ( $_POST ['url'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['url'] ) ) : '') . '\'';
		}
		if (isset ( $_POST ['fulldesc'] )) {
			$full = addslashes ( $this->encode ( $_POST ['fulldesc'] ) );
		} else {
			$full = "";
		}
		$deliveryDesc = isset ( $_POST ['deliveryDesc'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['deliveryDesc'] ) ) : '';
		$sizesDesc = isset ( $_POST ['sizesDesc'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['sizesDesc'] ) ) : '';
		$caring = isset ( $_POST ['caring'] ) ? mysql_real_escape_string ( $this->en ( $_POST ['caring'] ) ) : '';
		
		$sleeve_length = isset ( $_POST ['sleeve_length'] ) ? mysql_real_escape_string ( $_POST ['sleeve_length'] ) : '-1';
		$length = isset ( $_POST ['length'] ) ? mysql_real_escape_string ( $_POST ['length'] ) : '-1';
		$delivery = isset ( $_POST ['delivery'] ) ? mysql_real_escape_string ( $_POST ['delivery'] ) : '-1';
		$alt = isset ( $_POST ['alt'] ) ? addslashes ( $this->encode ( $_POST ['alt'] ) ) : '';
		$ed = isset ( $_POST ['ed'] ) ? addslashes ( $this->encode ( $_POST ['ed'] ) ) : '';
		$ot50 = isset ( $_POST ['ot50'] ) ? addslashes ( $this->encode ( $_POST ['ot50'] ) ) : '';
		$ot100 = isset ( $_POST ['ot100'] ) ? addslashes ( $this->encode ( $_POST ['ot100'] ) ) : '';
		$ot150 = isset ( $_POST ['ot150'] ) ? addslashes ( $this->encode ( $_POST ['ot150'] ) ) : '';
		$valute = isset ( $_POST ['valute'] ) ? addslashes ( $_POST ['valute'] ) : 0;
		$_POST ['cat_id'] = isset ( $_POST ['cat_id'] ) ? ( int ) $_POST ['cat_id'] : 0;
		$youtube = isset ( $_POST ['youtube'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['youtube'] ) ) : '';
		
		$stock = isset ( $_POST ['stock'] ) ? mysql_real_escape_string ( $_POST ['stock'] ) : 0;
		$timeTo = isset ( $_POST ['timeTo'] ) ? mysql_real_escape_string ( $_POST ['timeTo'] ) : '00:00';
		$dateTo = isset ( $_POST ['dateTo'] ) ? mysql_real_escape_string ( $_POST ['dateTo'] ) : date ( "Y-m-d" );
		$sql = mysql_query ( "update shop_items set  `youtube`='{$youtube}',`dateTo`='{$dateTo}', `timeTo`='{$timeTo}', `stock`='{$stock}', `deliveryDesc`='{$deliveryDesc}', `sizesDesc`='{$sizesDesc}', `caring`='{$caring}', `sleeve_length`='{$sleeve_length}', `length`='{$length}', `delivery`='{$delivery}', `cat_id`='$_POST[cat_id]', `prim`='" . (isset ( $_POST ['prim'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['prim'] ) ) : "") . "', `art`='" . $art . "', `name`='" . $title . "', `shortdesc`='" . $shortdesc . "',
		`fulldesc`='" . $full . "',
		 `price_opt`='$opt', `price_rozn`='$rozn', `kol`='$kol', 
		 `mark`='" . $mark . "',
		  `post`='" . $post . "',
		   mark_eng='$mark_eng' $z where `id`='$_POST[id]'" ) or die ( mysql_error () );
		
		echo "{success:true}";
	}
	function delete_all_cat_shop($id) {
		$sql = mysql_query ( "select * from shop_cat where parentId='$id'" );
		$sql2 = mysql_query ( "update shop_items set cat_id='0' where cat_id='$id'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			mysql_query ( "delete from shop_cat where id='$row[id]'" );
			$this->deleteCatIcon ( $row ['id'], $row ['photo'] );
			$this->delete_all_cat_shop ( $row ['id'] );
		}
		mysql_query ( "delete from shop_cat where id='$id'" );
	}
	function DeleteCatShop() {
		$id = $_POST ['id'];
		$sql = mysql_query ( "select * from shop_cat where parentId='$id'" );
		$this->deleteCatIcon ( $id );
		$sql2 = mysql_query ( "update shop_items set cat_id='0' where cat_id='$id'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			mysql_query ( "delete from shop_cat where id='$row[id]'" );
			$this->deleteCatIcon ( $row ['id'], $row ['photo'] );
			$this->delete_all_cat_shop ( $row ['id'] );
		}
		mysql_query ( "delete from shop_cat where id='$id'" );
		echo "55";
	}
	function deleteCatIcon($id, $photo = "") {
		if (! empty ( $id ) && ! empty ( $photo )) {
			if (file_exists ( $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/$photo" )) {
				unlink ( $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/$photo" );
			}
		}
	}
	function deleteDopIcon($id) {
		if (! empty ( $id )) {
			if (file_exists ( $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/dop_{$id}.gif" )) {
				unlink ( $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/dop_{$id}.gif" );
			}
		}
	}
	function nullRating() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		mysql_query ( "update `shop_items` set `rating`='0' where `id`='{$id}'" );
		mysql_query ( "delete from `shop_items_rating` where `iditem`='{$id}'" );
		echo "33";
	}
	function UpdateCatShop() {
		$id = $_POST ['Id'];
		$parentid = $_POST ['parent'];
		$name = $_POST ['name'];
		$desc = $_POST ['desc'];
		if ($name == "") {
			$query = "UPDATE shop_cat SET parentId='$parentid' WHERE id='$id'";
		} else {
			$query = "UPDATE shop_cat SET name='$name' WHERE id='$id'";
		}
		mysql_query ( $query ) or die ( mysql_error () );
		echo '33';
	}
	function AddShopCat() {
		$id = ( int ) $_POST ['id'];
		$name = addslashes ( $_POST ['name'] );
		$desc = addslashes ( $_POST ['desc'] );
		$url = addslashes ( $_POST ['url'] );
		$TitlePage = mysql_real_escape_string($_POST['TitlePage']);
		$DescPage = mysql_real_escape_string($_POST['DescPage']);
		$KeysPage = mysql_real_escape_string($_POST['KeysPage']);
		
		$parentid = 0; // isset($_POST ['parentId'];
		$insert = 0;
		if (empty ( $id )) {
			$query = "INSERT INTO `shop_cat` (`name`, `desc`, `url`, `TitlePage`, `DescPage`, `KeysPage`) values ('$name', '$desc', '{$url}', '{$TitlePage}','{$DescPage}','{$KeysPage}')";
			$insert = 1;
		} else {
			$query = "UPDATE shop_cat SET name='$name', `desc`='$desc', `url`='{$url}', `TitlePage`='{$TitlePage}', `DescPage`='{$DescPage}', `KeysPage`='{$KeysPage}' WHERE id='$id'";
		}
		
		mysql_query ( $query ) or die ( "{failure:true, error:'" . addslashes ( mysql_error () ) . "'}" );
		if ($insert == 1) {
			$id = mysql_insert_id ();
		}
		$this->UploadCatIcon ( $id );
		echo '{success:true}';
	}
	function UploadCatIcon($id) {
		if (isset ( $_FILES ['photo-path'] ['name'] ) && !empty( $_FILES ['photo-path'] ['name'])) {
			$sql = mysql_query ( "select * from `shop_cat` where `id`='$id'" );
			$row = mysql_fetch_array ( $sql );
			if (! empty ( $row ['photo'] )) {
				$this->deleteCatIcon ( $id, $row ['photo'] );
			}
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			if (isset ( $p ['extension'] )) {
				$ext = $p ['extension'];
				if (preg_match ( "/(jpg|jpeg|bmp|gif|png)/is", $ext )) {
					$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
					$uploadfile1 = $uploaddir . "cat_{$id}.{$ext}";
					$file = "cat_{$id}.{$ext}";
					
					if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile1 )) {
						mysql_query ( "update `shop_cat` set `photo`='$file' where `id`='$id'" );
					}
				}
			}
		}
	}
	function UploadDopIcon($id) {
		if (isset ( $_FILES ['photo-path'] )) {
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			$ext = $p ['extension'];
			if (preg_match ( "/(jpg|jpeg|bmp|gif|png)/is", $ext )) {
				$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop/";
				$uploadfile1 = $uploaddir . "dop_{$id}.gif";
				
				if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile1 )) {
				}
			}
		}
	}
	function ListingShopTmpItems() {
		$id = 0;
		
		$sql_count = "SELECT * FROM shop_tmp ";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs ) ) {
				$ss = mysql_query ( "select * from shop_items_dop where `item`='$o[id]'" );
				$d = mysql_fetch_array ( $ss );
				$test = mysql_num_rows ( mysql_query ( "select * from shop_items where id='$o[id]'" ) );
				$arr2 ['title_page'] = $this->en ( $d ['title'] );
				$arr2 ['desc'] = $this->en ( $d ['desc'] );
				$arr2 ['keys'] = $this->en ( $d ['keys'] );
				$arr2 ['id'] = $o ['id'];
				$arr2 ['oldid'] = $o ['id'];
				$arr2 ['cat_id'] = $o ['cat_id'];
				$arr2 ['art'] = $this->en ( $o ['art'] );
				$arr2 ['name'] = $this->en ( $o ['name'] );
				$arr2 ['post'] = $this->en ( $o ['post'] );
				$arr2 ['shortdesc'] = $this->en ( $o ['shortdesc'] );
				$arr2 ['fulldesc'] = $this->en ( $o ['fulldesc'] );
				$arr2 ['price_rozn'] = $this->en ( $o ['price_rozn'] );
				$arr2 ['onindex'] = $this->en ( $o ['onindex'] );
				$arr2 ['onlider'] = $this->en ( $o ['onlider'] );
				$arr2 ['onsells'] = $this->en ( $o ['onsells'] );
				$arr2 ['onecs'] = $this->en ( $o ['onecs'] );
				$arr2 ['mark'] = $this->en ( $o ['mark'] );
				if ($test > 0) {
					$prim = $this->en ( "Товар с таким индефикатор уже существует!" );
				} else {
					$prim = "";
				}
				$arr2 ['prim'] = "" . $prim;
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function getCollection($idItem) {
		$sql2 = mysql_query ( "select * from shop_dop_values where iditem='$idItem'" );
		$row2 = mysql_fetch_array ( $sql2 );
		$ex = explode ( ",", $row2 ['value'] );
		$nn = "";
		// $nn.="<strong>Коллекция: </strong>";
		foreach ( $ex as $value ) {
			if ($value != null) {
				$rt = mysql_query ( "select * from shop_dop where id='$value'" );
				$rs = mysql_fetch_array ( $rt );
				if ($rs ['sv'] == 1) {
					$nn .= "$rs[title] ";
				}
			}
		}
		return $nn;
	}
	function ListingShopItems() {
		if (isset ( $_POST ['id'] )) {
			$id = $_POST ['id'];
		}
		if (! isset ( $id )) {
			$id = 0;
		}
		$dop = "";
		if (isset ( $_POST ['orderby'] )) {
			$dop = "order by `onecs` asc";
		}
		$sql_count = "SELECT * FROM shop_items where cat_id='$id'";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		
		if ($rows > 0) {
			
			while ( $o = mysql_fetch_array ( $rs ) ) {
				$arr2 = array ();
				$arr2 ['total_comments'] = ( int ) mysql_result ( mysql_query ( "select count(1) from `shop_items_comments` where `iditem`='{$o['id']}'" ), 0 );
				$arr2 ['title_page'] = $this->en ( $o ['TitlePage'] );
				$arr2 ['desc'] = $this->en ( $o ['DescPage'] );
				$arr2 ['description'] = $this->en ( $o ['description'] );
				$arr2 ['recom'] = $this->en ( $o ['recom'] );
				$arr2 ['editorChoice'] = $o ['editorChoice'];
				$arr2 ['new'] = $o ['new'];
				$arr2 ['pos'] = $o ['pos'];
				$arr2 ['bestsell'] = $o ['bestsell'];
				$arr2 ['onecs'] = $o ['onecs'];
				$arr2 ['dateTo'] = $this->en ( $o ['dateTo'] );
				$arr2 ['timeTo'] = date ( "H:i", strtotime ( "1971-01-01 " . $o ['timeTo'] ) );
				$arr2 ['stock'] = $this->en ( $o ['stock'] );
				$arr2 ['keys'] = $this->en ( $o ['KeysPage'] );
				$arr2 ['url'] = $this->en ( $o ['url'] );
				$arr2 ['sleeve_length'] = $o ['sleeve_length'];
				$arr2 ['rating'] = $o ['rating'];
				$arr2 ['length'] = $o ['length'];
				$arr2 ['delivery'] = $o ['delivery'];
				$arr2 ['deliveryDesc'] = $this->en ( $o ['deliveryDesc'] );
				$arr2 ['sizesDesc'] = $this->en ( $o ['sizesDesc'] );
				$arr2 ['caring'] = $this->en ( $o ['caring'] );
				$arr2 ['id'] = $o ['id'];
				
				$arr2 ['cat_id'] = $o ['cat_id'];
				$arr2 ['art'] = $this->en ( $o ['art'] );
				$arr2 ['name'] = $this->en ( $o ['name'] );
				$arr2 ['link'] = "?shop=" . $o ['id'];
				$arr2 ['post'] = $this->en ( $o ['post'] );
				$arr2 ['kol'] = $this->en ( $o ['kol'] );
				$arr2 ['prim'] = $this->en ( $o ['prim'] );
				
				$arr2 ['shortdesc'] = $this->en ( $o ['shortdesc'] );
				$arr2 ['fulldesc'] = $this->en ( $o ['fulldesc'] );
				$arr2 ['price_rozn'] = $this->en ( $o ['price_rozn'] );
				$arr2 ['price_opt'] = $this->en ( $o ['price_opt'] );
				$arr2 ['onindex'] = $this->en ( $o ['onindex'] );
				$arr2 ['onlider'] = $this->en ( $o ['onlider'] );
				$arr2 ['onsells'] = $this->en ( $o ['onsells'] );
				$arr2 ['onecs'] = $this->en ( $o ['onecs'] );
				$arr2 ['mark'] = $this->en ( $o ['mark'] );
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function Listing_Shop_PostSV() {
		$sql_count = "SELECT * FROM shop_post";
		$sql = $sql_count;
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr ['id'] = $this->en ( $obj ['id'] );
				$arr ['title'] = $this->en ( $obj ['title'] );
				$arr ['last_upd'] = $this->en ( $obj ['last_upd'] );
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function ListingPostShop() {
		$sql_count = "SELECT * FROM shop_post";
		$sql = $sql_count;
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr ['value'] = $this->en ( $obj ['id'] );
				$arr ['title'] = $this->en ( $obj ['title'] );
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"posts":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function DeletePostSVShop() {
		mysql_query ( "delete from shop_post where id='$_POST[id]'" );
		echo "55";
	}
	function AddShopPostSV() {
		$title = $this->encode ( $_POST ['title'] );
		mysql_query ( "insert into shop_post (`title`) values ('$title')" );
		echo "55";
	}
	function EditShopPostSV() {
		$title = $this->encode ( $_POST ['title'] );
		$id = $this->encode ( $_POST ['id'] );
		mysql_query ( "update shop_post set `title`='$title' where id='$id'" );
		echo "55";
	}
	function Listing_Shop_DopSV() {
		$sql_count = "SELECT * FROM shop_dop";
		$sql = $sql_count;
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		$i = 0;
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$i ++;
				$arr ['id'] = $this->en ( $obj ['id'] );
				$arr ['name'] = $this->en ( $obj ['name'] );
				$arr ['title'] = $this->en ( $obj ['title'] );
				$arr ['text'] = $this->en ( $obj ['text'] );
				$arr ['sv'] = $this->en ( $obj ['sv'] );
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function DeleteDopSVShop() {
		mysql_query ( "delete from shop_dop where id='$_POST[id]'" );
		mysql_query ( "delete from `shop_dop_values` where `value`='$_POST[id]'" );
		$this->deleteDopIcon ( $_POST ['id'] );
		echo "55";
	}
	function AddShopDopSV() {
		$name = isset ( $_POST ['name'] ) ? addslashes ( $_POST ['name'] ) : '';
		$title = isset ( $_POST ['title'] ) ? addslashes ( $_POST ['title'] ) : '';
		$text1 = isset ( $_POST ['text'] ) ? addslashes ( $_POST ['text'] ) : '';
		$text = isset ( $_POST ['sv'] ) ? ( int ) $_POST ['sv'] : 1;
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($text == 0 or empty ( $text )) {
			$text = 1;
		}
		if (! empty ( $id ) && $id != 0) {
			$test = mysql_num_rows ( mysql_query ( "select * from shop_dop where name='$name' and `id` !='$id'" ) );
			if ($test == 1) {
				echo "{failure:true, msg:'" . $this->en ( "Такое имя свойства уже есть" ) . "'}";
			} else {
				mysql_query ( "update shop_dop set `sv`='$text', `name`='$name', `text`='{$text1}', `title`='$title' where id='$id'" );
				$this->UploadDopIcon ( $id );
				echo "{success:true}";
			}
		} else {
			
			$sql = mysql_query ( "select * from shop_dop where name='$name'" ) or die ( "66" );
			$test = mysql_num_rows ( $sql );
			
			if ($test != null) {
				echo "{failure:true, msg:'" . $this->en ( "Такое имя свойства уже есть" ) . "'}";
			} else {
				mysql_query ( "insert into shop_dop (`name`, `title`, `sv`, `text`) values ('$name', '$title', '$text', '{$text1}')" );
				$id = mysql_insert_id ();
				$this->UploadDopIcon ( $id );
				echo "{success:true}";
			}
		}
	}
	function EditShopDopSV() {
		foreach ( $_POST as $name => $val ) {
			if (is_string ( $val )) {
				$val = mysql_real_escape_string ( trim ( $this->encode ( $val ) ) );
			}
			$_POST [$name] = $val;
		}
		$name = $_POST ['name'];
		$title = $_POST ['title'];
		$text = $_POST ['sv'];
		$text1 = $_POST ['text'];
		$id = ( int ) $_POST ['id'];
		$test = mysql_num_rows ( mysql_query ( "select * from shop_dop where name='$name' and `id` !='$id'" ) );
		if ($test == 1) {
			echo "66";
		} else {
			mysql_query ( "update shop_dop set `sv`='$text', `name`='$name', `title`='$title', `text`='{$text1}' where id='$id'" );
			$this->UploadDopIcon ( $id );
			echo "55";
		}
	}
	function ShowDopsItemShop() {
		$did = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$all = array ();
		$sql = mysql_query ( "select `id`, `name` from `shop_colors` where `active`='1'" );
		
		if (is_resource ( $sql ) && ($total = mysql_num_rows ( $sql )) > 0) {
			$r = array ();
			$r ['fieldLabel'] = $this->en ( "<b>Цвета</b>" );
			$r ['xtype'] = "checkboxgroup";
			if ($total >= 3) {
				$r ['columns'] = 3;
				$r ['vertical'] = true;
				$r ['itemCls'] = "x-check-group-alt";
			}
			$r ['autoHeight'] = true;
			$r ['items'] = array ();
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$isCheck = mysql_result ( mysql_query ( "select count(1) from `shop_colors_values` where `iditem`='{$did}' and `value`='{$row['id']}'" ), 0 );
				$item = array ();
				if ($isCheck > 0) {
					$item ['checked'] = true;
				} else {
					$item ['checked'] = false;
				}
				$item ['boxLabel'] = $this->en ( $row ['name'] );
				$item ['name'] = 'colors[]';
				$item ['value'] = $row ['id'];
				$item ['inputValue'] = $row ['id'];
				$r ['items'] [] = $item;
			}
			$all [] = $r;
		}
		
		$sql = mysql_query ( "select `id`, `name` from `shop_fullness` where `active`='1'" );
		
		if (is_resource ( $sql ) && ($total = mysql_num_rows ( $sql )) > 0) {
			$r = array ();
			$r ['fieldLabel'] = $this->en ( "<b>Полнота</b>" );
			$r ['xtype'] = "checkboxgroup";
			if ($total >= 3) {
				$r ['columns'] = 3;
				$r ['vertical'] = true;
				$r ['itemCls'] = "x-check-group-alt";
			}
			$r ['autoHeight'] = true;
			$r ['items'] = array ();
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$isCheck = mysql_result ( mysql_query ( "select count(1) from `shop_fullness_values` where `iditem`='{$did}' and `value`='{$row['id']}'" ), 0 );
				$item = array ();
				if ($isCheck > 0) {
					$item ['checked'] = true;
				} else {
					$item ['checked'] = false;
				}
				$item ['boxLabel'] = $this->en ( $row ['name'] );
				$item ['name'] = 'fullness[]';
				$item ['value'] = $row ['id'];
				$item ['inputValue'] = $row ['id'];
				$r ['items'] [] = $item;
			}
			$all [] = $r;
		}
		$sql = mysql_query ( "select `id`, `name` from `shop_style` where `active`='1'" );
		
		if (is_resource ( $sql ) && ($total = mysql_num_rows ( $sql )) > 0) {
			$r = array ();
			$r ['fieldLabel'] = $this->en ( "<b>Фасоны</b>" );
			$r ['xtype'] = "checkboxgroup";
			if ($total >= 3) {
				$r ['columns'] = 3;
				$r ['vertical'] = true;
				$r ['itemCls'] = "x-check-group-alt";
			}
			$r ['autoHeight'] = true;
			$r ['items'] = array ();
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$isCheck = mysql_result ( mysql_query ( "select count(1) from `shop_style_values` where `iditem`='{$did}' and `value`='{$row['id']}'" ), 0 );
				$item = array ();
				if ($isCheck > 0) {
					$item ['checked'] = true;
				} else {
					$item ['checked'] = false;
				}
				$item ['boxLabel'] = $this->en ( $row ['name'] );
				$item ['name'] = 'style[]';
				$item ['value'] = $row ['id'];
				$item ['inputValue'] = $row ['id'];
				$r ['items'] [] = $item;
			}
			$all [] = $r;
		}
		$sql = mysql_query ( "select `id`, `name` from `shop_sizes` where `active`='1'" );
		if (is_resource ( $sql ) && ($total = mysql_num_rows ( $sql )) > 0) {
			
			$item = array ();
			$item ['border'] = false;
			$item ['baseCls'] = 'x-plain';
			$item ['html'] = $this->en ( "<h3>Размеры</h3>" );
			$all [] = $item;
			$r = array ();
			$r ['layout'] = 'table';
			$item ['border'] = false;
			$item ['baseCls'] = 'x-plain';
			$r ['layoutConfig'] = array (
					"columns" => 4 
			);
			$r ['items'] = array ();
			
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$isCheck = mysql_query ( "select `store` from `shop_sizes_values` where `iditem`='{$did}' and `value`='{$row['id']}'" );
				if (is_resource ( $isCheck ) && mysql_num_rows ( $isCheck ) > 0) {
					$isCheck = mysql_result ( $isCheck, 0 );
				} else {
					$isCheck = 0;
				}
				$item = array ();
				
				$item ['layout'] = 'form';
				$item ['width'] = '220';
				$item ['border'] = false;
				$item ['labelAlign'] = 'top';
				$item ['baseCls'] = 'x-plain';
				$item ['items'] = array (
						array (
								"xtype" => "combo",
								"width" => "200",
								"mode" => "local",
								"store" => "STORE",
								"listWidth" => "250",
								"id" => "sizes_{$row['id']}",
								"listeners" => array (
										"render" => "function(combo){this.setValue($isCheck)}" 
								),
								"editable" => false,
								"fieldLabel" => $this->en ( "Размер: " . $row ['name'] ),
								"lazyRender" => true,
								
								"triggerAction" => "all",
								"typeAhead" => true,
								"name" => "sizes[{$row['id']}]",
								"hiddenName" => "sizes[{$row['id']}]",
								
								"displayField" => "Index",
								"valueField" => "partyValue" 
						) 
				);
				
				$r ['items'] [] = $item;
			}
			
			$all [] = $r;
		}
		
		if (count ( $all ) > 0) {
			echo $this->changeStore ( $this->JEncode ( $all ) );
		} else {
			echo "{xtype:'hidden'}";
		}
	}
	function changeStore($str) {
		$store = $this->en ( "new Ext.data.SimpleStore({fields: ['partyValue', 'Index'], data: [ [ 0, 'Нет в наличии' ], [ 1, 'Есть в наличии' ], [ 2, 'Предзаказ' ],[ 3, 'Уведомить по Email о поступлении' ] ]})" );
		$str = str_replace ( '"STORE"', $store, $str );
		$str = preg_replace ( "/\"render\":\"(.*?)\"/is", "\"render\":$1", $str );
		$str = preg_replace ( "/\"change\":\"(.*?)\"/is", "\"change\":$1", $str );
		return $str;
	}
	function Check_Dosv_Shop($id, $idi) {
		$sql = mysql_query ( "select COUNT(*) from shop_dop_values where iditem='$idi' and `value`='$id'" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_result ( $sql, 0 );
			
			if ($row == 0) {
				return false;
			} else {
				return true;
			}
		}
		return false;
	}
	function listdop_Shop($sv = "", $did = 0) {
		if ($sv == "") {
			$sv = 1;
		}
		if ($did == 0) {
			$did = $_POST ['id'];
		}
		$sql = mysql_query ( "select * from shop_dop where sv='$sv'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$r ['boxLabel'] = "" . $this->en ( $row ['title'] );
			$r ['name'] = "dop_$row[id]";
			$r ['inputValue'] = "$row[id]";
			if (isset ( $_POST ['id'] )) {
				$r ['checked'] = $this->Check_Dosv_Shop ( $row ['id'], $did );
			} else {
				$r ['checked'] = false;
			}
			
			$arr [] = $r;
			unset ( $r );
		}
		if (count ( $arr ) == null) {
			return "[
{
	hidden:true}]";
		} else {
			return $arr;
		}
	}
	function deleteUser() {
		mysql_query ( "delete from `shop_users` where `id`='$_POST[id]' limit 1" );
		echo 33;
	}
	function saveUser() {
		$id = isset ( $_POST ['id'] ) ? $_POST ['id'] : 0;
		$_POST ['OnlyOnStore'] = isset ( $_POST ['OnlyOnStore'] ) ? ( int ) $_POST ['OnlyOnStore'] : 0;
		$fields = array ();
		$values = array ();
		$NotAllow = array (
				"id",
				"module",
				"task",
				"xaction" 
		);
		
		$Columns = array ();
		$sql = mysql_query ( "SHOW COLUMNS FROM `shop_users`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$Columns [] = $row ['Field'];
			}
		}
		
		foreach ( $_POST as $field => $value ) {
			if (! in_array ( $field, $NotAllow )) {
				if (in_array ( $field, $Columns )) {
					$fields [$field] = $field;
					$values [$field] = $value;
				}
			}
		}
		
		$pass = isset ( $values ['pass'] ) ? $values ['pass'] : '';
		$email = isset ( $values ['email'] ) ? strtolower ( trim ( $values ['email'] ) ) : '';
		foreach ( $values as $f => $v ) {
			$values [$f] = addslashes ( trim ( $this->encode ( $v ) ) );
		}
		if (empty ( $id ) && empty ( $email )) {
			echo "{success:true, msg:'66'}";
			exit ();
		}
		if (empty ( $id ) && ! empty ( $email )) {
			$test = mysql_query ( "select COUNT(*) from `shop_users` where `email`='$email'" );
			$c = mysql_result ( $test, 0 );
			if ($c > 0) {
				echo "{success:true, msg:'77'}";
				exit ();
			}
		}
		if (empty ( $id ) && empty ( $pass )) {
			echo "{success:true, msg:'55'}";
			exit ();
		}
		$values ['pass'] = base64_encode ( $pass );
		$pass = $values ['pass'];
		if (empty ( $id )) {
			
			mysql_query ( "insert into `shop_users` ({$this->A2S($fields, ',', '`')}) values ({$this->A2S($values, ',', "'")})" ) or die ( "{failure:true, ss:'" . addslashes ( trim ( mysql_error () ) ) . "'}" );
		} else {
			unset ( $fields ['pass'] );
			unset ( $values ['pass'] );
			if (! empty ( $pass )) {
				$dop = ", `pass`='$pass'";
			} else {
				$dop = "";
			}
			
			mysql_query ( "update `shop_users` set {$this->A2Up($fields, $values)} $dop where `id`='$id'" ) or die ( "{failure:true, ss:'" . addslashes ( trim ( mysql_error () ) ) . "'}" );
		}
		
		echo "{success:true, msg:'33'}";
	}
	function BanUser() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$sql = mysql_query ( "select * from `shop_users` where `id`='{$id}'" );
		$row = null;
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
		}
		
		$banned = isset ( $_POST ['banned'] ) ? ( int ) $_POST ['banned'] : 0;
		$Mailed = isset ( $_POST ['Mailed'] ) ? ( int ) $_POST ['Mailed'] : 0;
		$Type = isset ( $_POST ['Type'] ) ? ( int ) $_POST ['Type'] : 0;
		
		if (mysql_query ( "update `shop_users` set `banned`='{$banned}', `Mailed`='{$Mailed}', `Type`='{$Type}' where `id`='{$id}'" )) {
			
			if (! is_null ( $row )) {
				
				if ($row ['Type'] != $Type) {
					
					if (($text = $this->getTextStatus ( $Type )) != false) {
						$send = new Email ();
						$send->setFrom ( 'robot@' . preg_replace ( "/www./is", "", getenv ( "HTTP_HOST" ) ) );
						$send->EmailHTML ( $row ['email'], "Уведомление с сайта " . preg_replace ( "/www./is", "", getenv ( "HTTP_HOST" ) ), $text );
					}
				}
			}
		}
		
		echo "33";
	}
	function getTextStatus($num) {
		$sql = mysql_query ( "select * from `blocks` where `name`='status{$num}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$test = trim ( strip_tags ( $row ['text'] ) );
			if (! empty ( $test )) {
				return $row ['text'];
			}
		}
		return false;
	}
	function A2Up($fields, $values) {
		$string = "";
		$i = 0;
		foreach ( $fields as $name => $value ) {
			$i ++;
			if ($i > 1) {
				$string .= ",";
			}
			if (is_array ( $value )) {
				$this->A2Up ( $value, $Sep );
			} else {
				$vv = isset ( $values [$name] ) ? $values [$name] : '';
				$string .= "`{$value}`='$vv'";
			}
		}
		return $string;
	}
	function A2S($Array, $Sep = ",", $Closer = "", $Slashes = false) {
		if (is_array ( $Array )) {
			$string = "";
			$i = 0;
			foreach ( $Array as $name => $value ) {
				$i ++;
				if ($i > 1) {
					$string .= "{$Sep}";
				}
				if (is_array ( $value )) {
					$this->A2S ( $value, $Sep, $Closer, $Slashes );
				} else {
					if ($Slashes == true) {
						$value = addslashes ( $value );
					}
					$string .= "{$Closer}{$value}{$Closer}";
				}
			}
			return $string;
		}
		return $Array;
	}
	function ListingUsers() {
		$_POST ['start'] = isset ( $_POST ['start'] ) ? $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? $_POST ['limit'] : 25;
		$dop = '';
		$group = isset ( $_POST ['to'] ) ? $this->encode ( $_POST ['to'] ) : '';
		if ($group != 'redactor_all' && ! empty ( $group )) {
			$dop = " where `TypeText`='" . mysql_real_escape_string ( $group ) . "'";
		} else {
		}
		$sql_count = "SELECT * FROM `shop_users` {$dop} order by `email`";
		
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( mysql_error () );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs ) ) {
				
				$sum = mysql_result ( mysql_query ( "select SUM(`suma`) from `shop_orders` where `uid`='$o[id]'" ), 0 );
				if (empty ( $sum ) or $sum == NULL) {
					$sum = 0;
				}
				/*
				 * $arr2 ['id'] = $o ['id']; $arr2 ['sk'] = $o['sk']; $arr2
				 * ['adres'] = $this->en ( $o ['adres'] ); $arr2 ['tel'] =
				 * $this->en ( $o ['tel'] ); $arr2 ['fio'] = $this->en ( $o
				 * ['fio'] ); $arr2 ['user'] = $this->en ( $o ['user'] );
				 */
				foreach ( $o as $name => $value ) {
					
					$arr2 [$name] = $this->en ( $value );
				}
				$arr2 ['orders'] = mysql_result ( mysql_query ( "select COUNT(*) from `shop_orders` where `uid`='$o[id]'" ), 0 );
				$arr2 ['sum'] = $sum;
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	
	/*
	 * Colors
	 */
	function colors_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$pos = isset ( $_POST ['pos'] ) ? ( int ) $_POST ['pos'] : 0;
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_colors` set `pos`='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function colors_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_colors` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_colors" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_colors` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function colors_Listing() {
		$sql_count = "SELECT * FROM `shop_colors`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function colors_deleteItem() {
		mysql_query ( "delete from `shop_colors` where `id`='$_POST[id]'" );
		echo "33";
	}
	
	/*
	 * fullness
	 */
	function fullness_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_fullness` set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function fullness_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_fullness` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_fullness" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_fullness` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function fullness_Listing() {
		$sql_count = "SELECT * FROM `shop_fullness`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function fullness_deleteItem() {
		mysql_query ( "delete from `shop_fullness` where `id`='$_POST[id]'" );
		echo "33";
	}
	
	/*
	 * style
	 */
	function style_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_style` set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function style_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_style` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_style" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_style` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function style_Listing() {
		$sql_count = "SELECT * FROM `shop_style`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function style_deleteItem() {
		mysql_query ( "delete from `shop_style` where `id`='$_POST[id]'" );
		echo "33";
	}
	/*
	 * Sizes
	 */
	function sizes_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_sizes` set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function sizes_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_sizes` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_sizes" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_sizes` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function getMarks() {
		$result = array (
				"cats" => array () 
		);
		
		$row ['name'] = $this->en ( 'Не выбран' );
		$row ['id'] = 0;
		$result ['cats'] [] = $row;
		
		$sql = mysql_query ( "select `id`, `name` from `shop_brands` where `active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$row ['name'] = $this->en ( $row ['name'] );
				$result ['cats'] [] = $row;
			}
		}
		echo json_encode ( $result );
	}
	function sizes_Listing() {
		$sql_count = "SELECT * FROM `shop_sizes`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '{"total":"0", "results":""}';
		}
	}
	function sizes_deleteItem() {
		mysql_query ( "delete from `shop_sizes` where `id`='$_POST[id]'" );
		echo "33";
	}
	
	/*
	 * Brands
	 */
	function brands_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_brands` set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function brands_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_brands` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_brands" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_brands` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function brands_Listing() {
		$sql_count = "SELECT * FROM `shop_brands`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function brands_deleteItem() {
		mysql_query ( "delete from `shop_brands` where `id`='$_POST[id]'" );
		echo "33";
	}
	
	/*
	 * delivery
	 */
	function delivery_Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		$catalog = isset ( $_POST ['catalog'] ) ? ( int ) $_POST ['catalog'] : 0;
		mysql_query ( "update `shop_delivery` set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function delivery_save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `shop_delivery` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$columns = $this->getColumnsFromTable ( "shop_delivery" );
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `shop_delivery` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		echo "{success:true}";
	}
	function delivery_Listing() {
		$sql_count = "SELECT * FROM `shop_delivery`";
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( mysql_error () );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function delivery_deleteItem() {
		mysql_query ( "delete from `shop_delivery` where `id`='$_POST[id]'" );
		echo "33";
	}
}

?>
