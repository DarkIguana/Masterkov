<?php
class banners_admin extends admin {
	function __construct() {
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	function SaveRecord() {
		$title = isset ( $_POST ['title'] ) ? addslashes ( $_POST ['title'] ) : '';
		$link = isset ( $_POST ['link'] ) ? addslashes ( $_POST ['link'] ) : '';
		
		$id = isset ( $_POST ['id'] ) ? addslashes ( $_POST ['id'] ) : 0;
		$width = isset($_POST['width'])?(int)$_POST['width']:0;
		$height = isset($_POST['height'])?(int)$_POST['height']:0;
		if (empty ( $id ) or $id == 0) {
			mysql_query ( "insert into `banners` (`title`, `link`, `width`, `height`) value ('$title', '$link', '{$width}', '{$height}')" );
			$id = mysql_insert_id ();
		} else {
			mysql_query ( "update `banners` set `title`='$title', `link`='$link', `width`='{$width}', `height`='{$height}' where `id`='$id'" );
		}
		$this->UploadFile ( $id );
		echo "{success:true}";
	}
	function UploadFile($id) {
		if (isset ( $_FILES ['photo-path'] ) && isset ( $_FILES ['photo-path'] ['name'] ) && ! empty ( $_FILES ['photo-path'] ['name'] )) {
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/banners/";
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			// $uploadfile = $uploaddir.basename($_FILES['photo-path']['name']);
			$ext = "";
			if (isset ( $p ['extension'] )) {
				$ext = strtolower ( $p ['extension'] );
			}
			$file = "{$id}.{$ext}";
			if (in_array ( $ext, array ("jpeg", "jpg", "gif", "png", "bmp", "swf" ) )) {
				$file = "{$id}.{$ext}";
				$uploadfile = $uploaddir . $file;
				//$file ="files/files/".basename($_FILES['photo-path']['name']);
				$sql = mysql_query ( "select `image` from `banners` where `id`='$id'" );
				if (mysql_num_rows ( $sql ) > 0) {
					$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
					$row ['image'] = trim ( $row ['image'] );
					if (! empty ( $row ['image'] ) && file_exists ( "files/banners/{$row['image']}" )) {
						unlink ( "files/banners/{$row['image']}" );
					}
				}
				if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile )) {
					$file = addslashes ( $file );
					$type = 0;
					if ($ext == 'swf') {
						$type = 1;
					}
					mysql_query ( "update `banners` set `image`='$file', `bannerType`='{$type}' where `id`='$id'" );
				}
			}
		}
	}
	function UpdateRecord() {
		$active = isset ( $_POST ['active'] ) ? mysql_real_escape_string ( $_POST ['active'] ) : 2;
		$type = isset ( $_POST ['type'] ) ? mysql_real_escape_string ( $_POST ['type'] ) : 2;
		$id = isset ( $_POST ['id'] ) ? mysql_real_escape_string ( $_POST ['id'] ) : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "update `banners` set `active`='$active', `type`='$type' where `id`='$id'" );
		}
		echo "33";
	}
	function DeleteRecord() {
		$id = isset ( $_POST ['id'] ) ? mysql_real_escape_string ( $_POST ['id'] ) : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "delete from `banners` where `id`='$id' limit 1" );
		}
		echo "55";
	}
	function Listing() {
		$sql_count = "SELECT * FROM `banners` order by `active` asc";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr ['id'] = $this->en ( $obj ['id'] );
				$arr ['title'] = $this->en ( $obj ['title'] );
				$arr ['bannerType'] = $obj ['bannerType'];
				$arr ['link'] = $this->en ( $obj ['link'] );
				$arr['width'] = $obj['width'];
				$arr['height'] = $obj['height'];
				$arr ['image'] = ! empty ( $obj ['image'] ) ? "files/banners/$obj[image]" : 'nofoto_s.jpg';
				if (! empty ( $obj ['image'] )) {
					$sizes = '';
					if ($obj ['width'] != 0) {
						$sizes .= ' width="' . $obj ['width'] . '"';
					}
					if ($obj ['height'] != 0) {
						$sizes .= ' height="' . $obj ['height'] . '"';
					}
					if ($obj ['bannerType'] == 0) {
						$arr ['html'] = '<img src="' . $arr ['image'] . '" ' . $sizes . ' />';
					} else {
						$arr ['html'] = <<<HTML
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
				} else {
					$arr ['html'] = $this->en ( 'Баннер не найден' );
				}
				$arr ['active'] = $obj ['active'];
				$arr ['type'] = $obj ['type'];
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
}