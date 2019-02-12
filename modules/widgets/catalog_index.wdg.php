<?php
class catalog_index {
	var $over = "";
	function __construct() {
		$sql = mysql_query ( "select `id`, `photo`, `name`, `price_rozn`, `price_opt`, `onecs`, `new`, `bestsell` from `shop_items` where `onindex`='1'  and `cat_id`!=0 order by rand() limit 12" );
		$out = "";
		if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
			
			$out .= ' <ul class="list220">';
			$i = 0;
			$v = 0;
			
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$image = $this->getItemImage ( $row, 1 );
				$idImage = 0;
				$min = '';
				if ($image != false) {
					$idImage = ( int ) @$image ['id'];
					$min = $image ['min'];
					$image = '<img src="/image.php?width=219&height=294&image=' . $image ['big'] . '" alt="">';
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
				<p>÷ена: ' . $prices . '</p>
				</li>';
			}
			$out .= '</ul>';
		}
		$this->over = $out;
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
}