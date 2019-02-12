<?php
class news_index {
	var $over = "";
	function __construct() {
		$out = "";
		$sql = mysql_query ( "select `id`, `name`, `date`, `notice` from `news` where `active`='1' order by `date` desc limit 3" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$out .= '
				<p class="p_h3">Новости<a href="?news"><img src="template/default/img/btn102a.gif" class="btn102a" alt="" /></a></p><ul class="list1">';
			$i = 0;
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$i ++;
				$cls = '';
				if ($i == 1) {
					$cls = 'first';
				}
				$time = strtotime ( $row ['date'] );
				$img = '&nbsp;';
				//if (($image = $this->getItemImage ( $row ['id'] )) != false) {
				//	$img = '<div><img src="image.php?width=145&height=96&image=files/news/' . $image ['orig'] . '" width="145" height="96" alt="" /></div>';
				//}
				
				$out.='<li><span>'.date("d.m.Y", $time).'</span><a href="?news='.$row['id'].'">'.$row['name'].'</a></li>';
				/*
				$out .= '  
				<span>' . date ( "d", $time ) . ' ' . $this->getMonth ( $time ) . ' ' . date ( 'Y', $time ) . '</span><h4><a href="?news=' . $row ['id'] . '">' . $row ['name'] . '</a></h4>
						<p>' . trim ( strip_tags ( $row ['notice'] ) ) . '</p>
				
				
				';
				*/
			}
			
			$out .= '</ul>
				
			';
		}
		$this->over = $out;
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `news_img` where `iditem`='$id' order by `osn` desc limit 1" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			$this->imgId = $row ['id'];
			return array ("min" => "s_{$row['id']}.{$row['ext']}", "id" => $row ['id'], "big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return false;
		return array ("min" => "nofoto_s.jpg", "big" => 'nofoto_s.jpg', "id" => 0 );
	}
	function getMonth($time) {
		$Month = "";
		switch (date ( "m", $time )) {
			case "01" :
				$Month = "Января";
				break;
			case "02" :
				$Month = "Февраля";
				break;
			case "03" :
				$Month = "Марта";
				break;
			case "04" :
				$Month = "Апреля";
				break;
			case "05" :
				$Month = "Мая";
				break;
			case "06" :
				$Month = "Июня";
				break;
			case "07" :
				$Month = "Июля";
				break;
			case "08" :
				$Month = "Августа";
				break;
			case "09" :
				$Month = "Сентября";
				break;
			case "10" :
				$Month = "Октября";
				break;
			case "11" :
				$Month = "Ноября";
				break;
			case "12" :
				$Month = "Декабря";
				break;
		}
		return $Month;
	}
}