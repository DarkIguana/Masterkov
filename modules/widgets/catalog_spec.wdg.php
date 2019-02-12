<?php
class catalog_spec {
	var $over = "";
	function __construct() {
		$out = '';
		$sql = mysql_query ( "select * from `price` where `cat_id`!=0 and `spec`='1' and `active`='1' order by rand() limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			
			
		$image = $this->getItemImage ( $row ['id'] );
				if ($image ['id'] != 0) {
					$image = '<a href="?catalog=' . $row ['id'] . '"><img width="57"  border="0" alt="" src="files/price/' . $image ['min'] . '"></a>';
				} else {
					$image = '&nbsp;';
				}
			
			$out .= ' <div class="special_offer">
                <h2>Спецпредложение <img src="template/default/images/spec_offer.png" alt="" align="absmiddle" /></h2>
                 <div class="special_offer_item">
                    '.$image.'
                    <a href="?catalog=' . $row ['id'] . '" class="special_offer_item_title">' . $row ['name'] . '</a>
                    <p>' . $row ['shortdesc'] . '</p>
                    <a href="?catalog=' . $row ['id'] . '">подробнее</a>
                </div>
            </div>
                
                ';
		}
		$this->over = $out;
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
}