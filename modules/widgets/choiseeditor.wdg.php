<?php
class choiseeditor {
	var $over = '';
	function __construct() {
		$out = '';
		$sql = mysql_query ( "select `shop_items`.`id`, `shop_items`.`name`, `shop_items`.`price_rozn`, `shop_items`.`photo`, `shop_cat`.`name` as `catname` from `shop_items`, `shop_cat` where `shop_cat`.`id`=`shop_items`.`cat_id` and `editorChoice`='1' order by rand() limit 3" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '<h4>Выбор редакции</h4>';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$image = $this->getItemImage ( $row, 1 );
				if ($image != false) {
					$image = '<a href="?shop=' . $row ['id'] . '"><img border="0" src="' . $image ['min'] . '" width="100" alt="" class="pic102" /></a>';
				} else {
					$image = '';
				}
				
				$out .= '<div class="block122">
			<div class="block122top"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
			<div class="block122middle">
				' . $image . '
				<p>' . $row ['name'] . '<span>' . $row ['catname'] . '</span></p>
				<span class="pr1">' . number_format ( $row ['price_rozn'], 0, ' ', ' ' ) . ' руб.</span>
			</div>
			<div class="block122bottom"><img src="template/default/img/pix.gif" width="1" height="6" alt="" /></div>
		</div>';
			}
		}
		$this->over = $out;
	}
	function getItemImage($row, $mass = 0) {
		if (! empty ( $row ['photo'] ) && file_exists ( "files/shop/$row[photo]" )) {
			if ($mass == 0) {
				return "files/shop/$row[photo]";
			} else {
				return array ("min" => "files/shop/$row[photo]", "big" => "files/shop/" . str_replace ( "s", "b", $row ['photo'] ) );
			}
		} else {
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row2 = mysql_fetch_array ( $sql ) ) {
					if (file_exists ( "files/shop/s_$row2[id].$row2[photo]" )) {
						if ($mass == 0) {
							return "files/shop/s_$row2[id].$row2[photo]";
						} else {
							return array ("id" => $row2 ['id'], "min" => "files/shop/s_$row2[id].$row2[photo]", "big" => "files/shop/b_$row2[id].$row2[photo]" );
						}
					}
				}
			}
		}
		return false;
	}
}