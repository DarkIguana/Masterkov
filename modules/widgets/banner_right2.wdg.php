<?php
class banner_right2 {
	var $over = '';
	function __construct() {
		$out = '';
		$sql = mysql_query ( "select * from `banners` where `active`='1' and `type`='2' order by rand() limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			$obj = $row;
			$sizes = '';
			$arr = array ();
			$arr ['image'] = ! empty ( $obj ['image'] ) ? "files/banners/$obj[image]" : '';
			if ($obj ['width'] != 0) {
				$sizes .= ' width="' . $obj ['width'] . '"';
			}
			if ($obj ['height'] != 0) {
				$sizes .= ' height="' . $obj ['height'] . '"';
			}
			if ($obj ['bannerType'] == 0) {
				$out .= '<a href="' . $row ['link'] . '"><img src="' . $arr ['image'] . '" ' . $sizes . ' border="0"/></a>';
			} else {
				$out .= <<<HTML
					    <object
			classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
			codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"
			{$sizes} align="middle" >
			<param name="allowScriptAccess" value="sameDomain" />
			<param name="movie" value="{$arr['image']}" />
			<param name="quality" value="high" />
			<embed src='{$arr['image']}' quality="high" 
				 {$sizes}
				align="middle" allowScriptAccess="sameDomain"
				type="application/x-shockwave-flash"
				pluginspage="http://www.macromedia.com/go/getflashplayer" /></object></div>
		</div>
HTML;
			}
		}
		$this->over = $out;
	}
}