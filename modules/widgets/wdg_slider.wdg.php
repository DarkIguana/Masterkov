<?php
class wdg_slider {
	var $over = '';
	function __construct() {
		$out = '';
		$sql = mysql_query ( "select * from `slider` where `active`='1' order by `pos`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= <<<HTML
			
  	
		
 
			<div class="slider1"><ul>
  
HTML;
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$back = "none";
				if (($image = $this->getItemImage ( $row ['id'] )) != false) {
					
					// 
					$out .= '<li><a href="'.$row['pageLink'].'"><img src="/thumbs/crop/496x335/files/slider/' . $image ['orig'] . '" alt="" /></a></li>';
				} else {
					continue;
				}
			}
			$out .= '</ul>
				</div>';
		}
		$this->over = $out;
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `slider_img` where `iditem`='$id' order by `osn` desc limit 1" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			$this->imgId = $row ['id'];
			return array (
					"min" => "s_{$row['id']}.{$row['ext']}",
					"id" => $row ['id'],
					"big" => "b_{$row['id']}.{$row['ext']}",
					"orig" => "o_{$row['id']}.{$row['ext']}" 
			);
		}
		return false;
		return array (
				"min" => "nofoto_s.jpg",
				"big" => 'nofoto_s.jpg',
				"id" => 0 
		);
	}
}