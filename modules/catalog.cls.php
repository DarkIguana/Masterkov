<?php
class CatalogCategory {
	static $all = array ();
	static $dop = '';
	static public function getChilds($id) {
		if ($id == 0) {
			return false;
		}
		self::$all = array ();
		self::$all [] = $id;
		self::$dop = '';
		if (($s = CatalogSystem::getDisabledCategoryImplode ()) != false) {
			self::$dop = ' and `id` not in (' . $s . ')';
		}
		$sql = mysql_query ( "select `id` from `price_cat` where `parentId`='{$id}'" . self::$dop );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::deepChilds ( $row ['id'] );
			}
		}
	
	}
	protected function deepChilds($id) {
		if ($id == 0) {
			return false;
		}
		
		self::$all [] = $id;
		$sql = mysql_query ( "select `id` from `price_cat` where `parentId`='{$id}'" . self::$dop );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				self::deepChilds ( $row ['id'] );
			}
		}
	}
	static public function countItems($id) {
		self::getChilds ( $id );
		$sql = mysql_query ( "select count(*) from `price` where `cat_id` in (" . implode ( ",", self::$all ) . ") and `active`='1'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			return mysql_result ( $sql, 0 );
		}
		return 0;
	}
}
class catalog {
	var $over = "";
	var $road = array ();
	var $roadTitle = array ();
	static $nowCatId = 0;
	static $Title = "Каталог оборудования";
	static $SecTitle = "";
	var $params = array ('template' => 'index' );
	function showChilds($id, $class = "") {
		$out = '';
		$dop = '';
		$s = CatalogSystem::getDisabledCategoryImplode ();
		if ($s != false) {
			$dop = ' and `id` not in (' . $s . ')';
		}
		$sql = mysql_query ( "select * from `price_cat` where `parentId`='{$id}' {$dop} order by `sort` asc" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '<ul' . $class . '>';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$count = CatalogCategory::countItems ( $row ['id'] );
				$out .= '<li><a href="?catalog&catid=' . $row ['id'] . '">' . $row ['name'] . '</a> <span>(' . $count . ')</span>' . $this->showChilds ( $row ['id'] ) . '</li>';
			}
			$out .= '</ul>';
		}
		return $out;
	}
	function __construct() {
		//print_r($_GET);
		$_SESSION ['Titles'] ['title'] .= ' / Каталог оборудования';
		$_SESSION ['Road'] .= '<a href="?catalog">Каталог оборудования</a>';
		$idItem = isset ( $_GET ['catalog'] ) && is_numeric ( $_GET ['catalog'] ) ? ( int ) $_GET ['catalog'] : 0;
		$catId = isset ( $_GET ['catid'] ) && is_numeric ( $_GET ['catid'] ) ? ( int ) $_GET ['catid'] : 0;
		
		if ($idItem != 0) {
			
			$this->over = $this->getDescItem ( $idItem );
		} elseif ($catId != 0) {
			
			$this->over = $this->getDescCat ( $catId );
			if ($this->hasChilds ( $catId ) == true) {
				self::$nowCatId = $catId;
				$this->getCatToRoad ( $catId );
				if (count ( $this->road ) > 1) {
					self::$Title = strip_tags ( current ( $this->road ) );
					self::$SecTitle = strip_tags ( $this->road [0] );
				} else {
					self::$Title = strip_tags ( $this->road [0] );
				}
				$dop = '';
				$s = CatalogSystem::getDisabledCategoryImplode ();
				if ($s != false) {
					$dop = ' and `id` not in (' . $s . ')';
				}
				
				$sql = mysql_query ( "select `id`, `name` from `price_cat` where `parentId`='{$catId}' {$dop} order by `sort` asc" );
				if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
					
					$w = array ();
					$n = array ();
					while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
						$count = CatalogCategory::countItems ( $row ['id'] );
						if ($this->hasChilds ( $row ['id'] )) {
							$w [] = '<h3>' . $row ['name'] . '</h3>' . $this->showChilds ( $row ['id'], ' class="list1"' );
						} else {
							$n [] = '<li><a href="?catalog&catid=' . $row ['id'] . '">' . $row ['name'] . '</a> <span>(' . $count . ')</span></li>';
						}
					}
					$out .= implode ( "", $w );
					$out .= '<ul class="list1 exp">';
					$out .= implode ( "", $n );
					$out .= '</ul>';
				}
				$this->over .= $out;
			} else {
				self::$nowCatId = $catId;
				$this->getCatToRoad ( $catId );
				if (count ( $this->road ) > 1) {
					self::$Title = strip_tags ( current ( $this->road ) );
					self::$SecTitle = strip_tags ( $this->road [0] );
				} else {
					self::$Title = strip_tags ( $this->road [0] );
				}
				
				$this->over .= $this->getList ( $catId );
			}
		} elseif (isset ( $_GET ['catalog'] ) && $_GET ['catalog'] == 'new') {
			self::$Title = 'Новинки';
			$this->road [] = '<a href="?catalog=new">Новинки</a>';
			$this->roadTitle [] = 'Новинки';
			$this->over = $this->getList ( 'new' );
		} elseif (isset ( $_GET ['catalog'] ) && $_GET ['catalog'] == 'search' && isset ( $_GET ['query'] )) {
			self::$Title = 'Поиск по Каталог оборудованияу';
			$this->road [] = '<a href="?catalog=new">Поиск по Каталог оборудованияу</a>';
			$this->roadTitle [] = 'Поиск по Каталог оборудованияу';
			$this->over = $this->getList ( 'search' );
		} else {
			$sql = mysql_query ( "select `id`, `name` from `price_cat` where `parentId`='0' order by `sort`" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$w = array ();
				$n = array ();
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$count = CatalogCategory::countItems ( $row ['id'] );
					if ($this->hasChilds ( $row ['id'] )) {
						$w [] = '<h3>' . $row ['name'] . '</h3>' . $this->showChilds ( $row ['id'], ' class="list1"' );
					} else {
						$n [] = '<li><a href="?catalog&catid=' . $row ['id'] . '">' . $row ['name'] . '</a> <span>(' . $count . ')</span></li>';
					}
				}
				$out .= implode ( "", $w );
				$out .= '<ul class="list1 exp">';
				$out .= implode ( "", $n );
				$out .= '</ul>';
			}
			$this->over = $out;
		}
		
		krsort ( $this->road );
		$i = 0;
		
		foreach ( $this->road as $r ) {
			$i ++;
			if ($i == count ( $this->road )) {
				$r = strip_tags ( $r );
			}
			$_SESSION ['Road'] .= ' / ' . $r;
		}
		krsort ( $this->roadTitle );
		if (count ( $this->roadTitle ) > 0) {
			$_SESSION ['Titles'] ['title'] .= ' / ' . implode ( " / ", $this->roadTitle );
		}
	
	}
	function hasChilds($id) {
		$s = CatalogSystem::getDisabledCategoryImplode ();
		if ($s != false) {
			$dop = ' and `id` not in (' . $s . ')';
		}
		$sql = mysql_query ( "select count(*) from `price_cat` where `parentId`='{$id}' {$dop}" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0 && mysql_result ( $sql, 0 ) > 0) {
			return true;
		}
		return false;
	}
	function getDescCat($id) {
		
		$sql = mysql_query ( "select `desc` from `price_cat` where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$desc = mysql_result ( $sql, 0 );
			
			$test = trim ( strip_tags ( $desc ) );
			
			if (! empty ( $test )) {
				
				return "<div class='txt22'>" . $desc . '</div><p>&nbsp;</p>';
			}
		}
		return '';
	}
	function genSearch($query) {
		$sql = mysql_query ( "SHOW COLUMNS FROM `price` where `Type` like '%text%' or `Type` like '%char%'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$q = array ();
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$q [] = "`{$row['Field']}` LIKE '%{$query}%'";
			}
			return implode ( " OR ", $q );
		}
		return false;
	}
	function getList($catId) {
		$out = '<br /><br />';
		$s = CatalogSystem::getDisabledCategoryImplode ();
		if ($s != false) {
			$dop = ' and `cat_id` not in (' . $s . ')';
		}
		$sql = mysql_query ( "select `id`, `name`, `valute`, `shortdesc`, `price`, `desc`, `teh` from `price` where `active`='1' and `cat_id`!=0 and `cat_id`='{$catId}' {$dop} order by `pos`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '<table class="data1">
					<tr>
						<th><span>Наименование</span></th>
						<th><span>Описание</span></th>
						<th><span>Стоимость</span></th>
					</tr>';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				/*	$valute = ' руб.';
				if ($row ['valute'] == 1) {
					$valute = ' $';
				} elseif ($row ['valute'] == 2) {
					$valute = ' &euro;';
				}
				$price = '';
				if ($row ['price'] == 0) {
					$price = 'Звоните!';
				} else {
					$price = '' . number_format ( $row ['price'], 0, '', ' ' ) . '' . $valute;
				}
				*/
				$price = $row ['price'];
				$link = $row ['name'];
				if ($this->imageExists ( $row ['id'] ) !=false or !empty ( $row ['desc'] ) or !empty ( $row ['teh'] )) {
					
									$link = '<a href="?catalog=' . $row ['id'] . '">' . $row ['name'] . '</a>';
					
				}
				$out .= '<tr>
						<td>' . $link . '&nbsp;</td>
						<td>' . $row ['shortdesc'] . '&nbsp;</td>
						<td>' . $price . '</td>
					</tr>';
			}
			$out .= '</table>';
		} else {
			$out .= '<p align="center">Категория пуста</p>';
		}
		return $out;
	}
	function getCatToRoad($id) {
		
		if ($id == 0) {
			return null;
		}
		
		$sql = mysql_query ( "select `name`, `id`, `parentId` from `price_cat` where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$this->roadTitle [] = $row ['name'];
			$this->road [] = "<a href='?catalog&catid={$row['id']}'>{$row['name']}</a>";
			$this->getCatToRoad ( $row ['parentId'] );
		
		}
	
	}
	
	function getDescItem($id) {
		$out = "";
		$s = CatalogSystem::getDisabledCategoryImplode ();
		if ($s != false) {
			$dop = ' and `cat_id` not in (' . $s . ')';
		}
		$sql = mysql_query ( "select * from `price` where `id`='{$id}' and `cat_id`!=0 {$dop} and `active`='1' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$out .= <<<HTML
			 <script type="text/javascript" src='/highslide/highslide-full.js'></script>
		
<link rel="stylesheet" type="text/css" href='/highslide/highslide.css' />

<script type="text/javascript">
hs.graphicsDir = '/highslide/graphics/';
hs.wrapperClassName = 'wide-border';

var galleryOptions = {
slideshowGroup: 'gallery',
//wrapperClassName: 'dark',
//outlineType: 'glossy-dark',
dimmingOpacity: 0.8,
align: 'center',
transitions: ['expand', 'crossfade'],
fadeInOut: true,
wrapperClassName: 'wide-border',
marginLeft: 100,
marginBottom: 0,
//numberPosition: 'caption'
};

if (hs.addSlideshow) hs.addSlideshow({
slideshowGroup: 'gallery',
interval: 5000,
repeat: true,
useControls: true,
overlayOptions: {
	//className: 'text-controls',
	position: 'bottom center',
	relativeTo: 'caption',
	offsetY: 70
},


});
</script>
HTML;
			self::$Title = $row ['name'];
			
			$image = $this->getItemImage ( $row ['id'] );
			$idImage = $image ['id'];
			if ($image ['id'] != 0) {
				$image = '<img src="files/price/' . $image ['big'] . '"  class="bp"/>';
			} else {
				$image = "&nbsp;";
			}
			$dopImages = '';
			$sqlImages = mysql_query ( "select * from `price_img` where `iditem`='{$row['id']}' and `id`!='{$idImage}'" );
			if (is_resource ( $sqlImages ) && mysql_num_rows ( $sqlImages ) > 0) {
				$dopImages = '<ul>';
				while ( ($img = mysql_fetch_assoc ( $sqlImages )) != false ) {
					$dopImages .= '<li>
					<a href="/files/price/o_' . $img ['id'] . '.' . $img ['ext'] . '" onclick="return hs.expand(this,galleryOptions)" class="highslide"><img width="65" height="50" src="/image.php?width=65&height=50&image=files/price/s_' . $img ['id'] . '.' . $img ['ext'] . '" /></a>
					</li>';
				}
				$dopImages .= '</ul>';
			}
			
			$this->road [] = $row ['name'];
			$this->roadTitle [] = $row ['name'];
			$this->getCatToRoad ( $row ['cat_id'] );
			self::$nowCatId = $row ['cat_id'];
			$out .= '   
<br /><br /><br />
					
					<table class="twinView">
						<tr>
							<td>
								' . $image . '
								' . $dopImages . '
							</td>

							<td>
								<span style="padding-left:0">' .  $row ['price'] . '</span>
								' . $row ['desc'] . '
							</td>

						</tr>
					</table>
			
			
			
              ';
			if (! empty ( $row ['teh'] )) {
				$out .= '<h3 style="font-size:20px">Технические характеристики</h3><p style="padding-left:29px">' . $row ['teh'] . '</p>';
			}
		
		} else {
			$out .= '<p align="center">Запись не найдена</p>';
		}
		return $out;
	}
	function getImages($id, $notID) {
		$out = '';
		$sql = mysql_query ( "select * from `price_img` where `iditem`='{$id}' and `id`!={$notID}" );
		if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
			$out = '<table>';
			$i = 0;
			$v = 0;
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$i ++;
				$v ++;
				if ($i == 1) {
					$out .= '<tr>';
				}
				$out .= '<td><a href="files/price/o_' . $row ['id'] . '.' . $row ['ext'] . '" class="highslide" onclick="return hs.expand(this);"><img height="154" src="files/price/b_' . $row ['id'] . '.' . $row ['ext'] . '" border="0" align="middle" /> </a></td>';
				if ($i < 3) {
					$out .= '<td width="35">&nbsp;</td>';
				}
				if ($i == 3 or $v == $num) {
					$out .= "</tr>";
					$out .= "<tr><td colspan='10'>&nbsp;</td></tr>";
				}
			
			}
			$out .= "</table>";
		}
		return $out;
	}
	function getNameCat($id) {
		$sql = mysql_query ( "select `name` from `price_cat` where `id`='{$id}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['name'];
		}
		return '';
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `price_img` where `iditem`='$id' order by `osn` desc limit 1" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			$this->imgId = $row ['id'];
			return array ("min" => "s_{$row['id']}.{$row['ext']}", "id" => $row ['id'], "big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return array ("min" => "nofoto_s.jpg", "big" => 'nofoto_s.jpg', "id" => 0 );
	}
	function imageExists($id) {
		
		$sql = mysql_query ( "select `id` from `price_img` where `iditem`='$id' " );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			return true;
		}
		return false;
	}
}