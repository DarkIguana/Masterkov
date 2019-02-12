<?php
class page_gallery {
	var $over = '';
	function __construct() {
		$out = '';
		
		$idPage = $_GET['pages'];
		$sql = mysql_query("select `id`,`ext` from pages_img where `iditem`='$idPage'");
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$titleGallery = 'Галерея';
			$sqlTitle = mysql_query("select `galleryTitle` from pages where `id`='$idPage'");
			if (is_resource ( $sqlTitle ) && mysql_num_rows ( $sqlTitle ) > 0) {
				$title = mysql_fetch_assoc ( $sqlTitle );
				if(!empty($title['galleryTitle'])){
				$titleGallery = $title['galleryTitle'];
				}
			}
			$out .= '<a name="photo"></a><h2>'.$titleGallery.'</h2>
					<ul class="gallery1">';
			while (($row = mysql_fetch_assoc ( $sql ))!=false){
				$out .= "<li><a href=\"/files/pages/b_{$row['id']}.{$row['ext']}\" class=\"highslide\" onclick=\"return hs.expand(this, galleryOptions)\"><img src=\"/files/pages/s_{$row['id']}.{$row['ext']}\" alt=\"\"></a></li>";
			}
			
			$out .= '</ul>
	<div style="clear:both"></div>';  
		}

		
		$this->over = $out;
	}
}

?>