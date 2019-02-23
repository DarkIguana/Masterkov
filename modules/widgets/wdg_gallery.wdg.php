<?php
class wdg_gallery {
	var $over = "";
	function __construct() {
		$out = "";
		$rows = array ();
		$sql = mysql_query ( "SELECT `gallery`.`name`, `gallery`.`date`, `gallery_img`.`id`, `gallery_img`.`ext`, `gallery_img`.`iditem`, `gallery_img`.`osn`  FROM `gallery`, `gallery_img` where `gallery`.`id`=`gallery_img`.`iditem` and `gallery`.`active`=1 and `gallery_img`.`osn`='1'  group by `gallery`.`id` order by `gallery_img`.`osn` desc, `gallery_img`.`pos` asc " );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			
			$script = '<script>';
			$out .= '<div class="text2">	<p>Примеры наших работ</p>
	<ul class="jcarousel-skin-tango">';
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$date = strtotime ( $row ['date'] );
				$script .= 'var img'.$row['id'].' = new Image(); img.src="/thumbs/crop/227x162/files/gallery/o_' . $row ['id'] . '.' . $row ['ext'] . '";';
				$out .= '		<li class="galerySlider">
						<a href="?gallery=' . $row ['iditem'] . '">
	<img black="/thumbs/black/crop/227x162/files/gallery/o_' . $row ['id'] . '.' . $row ['ext'] . '"
	 source="/thumbs/crop/227x162/files/gallery/o_' . $row ['id'] . '.' . $row ['ext'] . '"
	 src="/thumbs/crop/227x162/files/gallery/o_' . $row ['id'] . '.' . $row ['ext'] . '" alt="">
						</a></li>';
		/* class="black_white"	/thumbs/black/		 */
			}
			$script.='</script>';
			$out .= '</ul>
</div>';
			$out.=$script;
		}
		$this->over = $out;
	}
}
?>



	

