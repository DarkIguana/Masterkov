<?php
class specs {
	var $over = "";
	function __construct() {
		$out = '';
		$sql = mysql_query ( "select * from `specialists` where `active`='1' order by rand() limit 3" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
		    $out.='<p class="staff_head"><img src="template/default/images/specialists.png" alt="" width="207" height="51" /></p>';
		    while (($row = mysql_fetch_assoc($sql))!=false){
		    	$nage = 'лет';
		    	if ($row['age'] == 1){
		    		$nage = 'год';
		    	}
		    	elseif ($row['age']>=2 && $row['age']<=4){
		    		$nage = 'года';
		    	}
		    	$image = $this->getItemImage($row['id']);
		    	$out.=' <div class="staff_block">
        <p><a href="?specialists='.$row['id'].'"><img src="'.$image['min'].'" alt="" width="58" height="57" />'.$row['name'].'</a></p>
        <p>'.$row['prof'].'<br />
        '.$row['age'].' '.$nage.' стажа</p>
      </div>';
		    }
		    $out.='      <p class="all_staff"><a href="?specialists">Все специалисты <img src="template/default/images/arrow-1.png" alt="" width="8" height="7" /></a></p>
		';
		}
		$this->over = $out;
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `specialists_img` where `iditem`='$id' order by `osn` desc, `pos` asc limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			
			return array ("min" => "files/specialists/s_{$row['id']}.{$row['ext']}", "files/specialists/big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return array ("min" => "/template/default/images/staff.png", "big" => '/template/default/images/staff.png' );
	}
}