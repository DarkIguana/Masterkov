<?
class medialib_admin extends admin {
	function __construct() {
		ini_set ( "memory_limit", "70M" );
		if (!isset($_SESSION['admin'])){
			exit();
		}
	}
	
	function ResizeImage($image_from, $image_to, $fitwidth = 450, $fitheight = 450, $quality = 100) {
		global $php_inc;
		
		$os = $originalsize = getimagesize ( $image_from );
		
		if ($originalsize [2] != 2 && $originalsize [2] != 3 && $originalsize [2] != 1 && $originalsize [2] != 6 && ($originalsize [2] < 9 or $originalsize [2] > 12)) {
			return false;
		}
		
		if ($originalsize [0] > $fitwidth or $originalsize [1] > $fitheight) {
			$h = getimagesize ( $image_from );
			if (($h [0] / $fitwidth) > ($h [1] / $fitheight)) {
				$fitheight = $h [1] * $fitwidth / $h [0];
			} else {
				$fitwidth = $h [0] * $fitheight / $h [1];
			}
			
			if ($os [2] == 1) {
				$i = @imagecreatefromgif ( $image_from );
				if (! $i) {
					return false;
				}
				$o = ImageCreateTrueColor ( $fitwidth, $fitheight );
				
				$trans_color = imagecolortransparent ( $i );
				$trans_index = imagecolorallocate ( $i, $trans_color ['red'], $trans_color ['green'], $trans_color ['blue'] );
				imagecolortransparent ( $i, $trans_index );
				
				imagesavealpha ( $i, true );
				imagesavealpha ( $o, true );
				imagecopyresampled ( $o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1] );
				imagegif ( $o, $image_to );
				chmod ( $image_to, 0777 );
				imagedestroy ( $o );
				imagedestroy ( $i );
			} 

			elseif ($os [2] == 2 or ($os [2] >= 9 && $os [2] <= 12)) {
				$i = @ImageCreateFromJPEG ( $image_from );
				if (! $i) {
					return false;
				}
				$o = ImageCreateTrueColor ( $fitwidth, $fitheight );
				imagecopyresampled ( $o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1] );
				imagejpeg ( $o, $image_to, $quality );
				chmod ( $image_to, 0777 );
				imagedestroy ( $o );
				imagedestroy ( $i );
			} elseif ($os [2] == 3) {
				$i = @ImageCreateFromPng ( $image_from );
				if (! $i) {
					return false;
				}
				$o = ImageCreateTrueColor ( $fitwidth, $fitheight );
				imagesavealpha ( $i, true );
				
				imagesavealpha ( $i, true );
				imagealphablending ( $o, false );
				
				imagesavealpha ( $o, true );
				imagecopyresampled ( $o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1] );
				
				imagesavealpha ( $o, true );
				imagepng ( $o, $image_to );
				chmod ( $image_to, 0777 );
				imagedestroy ( $o );
				imagedestroy ( $i );
			}
			
			return 2;
		}
		if ($originalsize [0] <= $fitwidth && $originalsize [1] <= $fitheight) {
			if ($os [2] == 1) {
				$i = @imagecreatefromgif ( $image_from );
				if (! $i) {
					return false;
				}
				imagesavealpha ( $i, true );
				imagegif ( $i, $image_to );
			} elseif ($os [2] == 3) {
				$i = @ImageCreateFromPng ( $image_from );
				if (! $i) {
					return false;
				}
				imagesavealpha ( $i, true );
				imagepng ( $i, $image_to );
			} else {
				$i = @ImageCreateFromJPEG ( $image_from );
				if (! $i) {
					return false;
				}
				imagejpeg ( $i, $image_to, $quality );
			}
			imagedestroy ( $i );
			chmod ( $image_to, 0777 );
			return 1;
		}
	}
	protected function DELETEIMG() {
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/";
		$im = $_POST ['ext'];
		$id = $_POST ['id'];
		mysql_query ( "delete from medialib where id='$id' limit 1" );
		unlink ( $dir . "files/medialib/$id.$im" );
		echo "55";
	}
	protected function DELETECAT() {
		$id = $_POST ['id'];
		$sql = mysql_query ( "select * from medialib_cat where par='$id'" );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/";
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$r = mysql_query ( "select * from medialib where catid='$row[id]'" );
			while ( $s = mysql_fetch_array ( $r ) ) {
				unlink ( $dir . "files/medialib/$s[id].$s[name]" );
				mysql_query ( "delete from medialib where id='$id' limit 1" );
			}
			mysql_query ( "delete from articles_cat where id='$row[id]'" );
			$this->deleteall ( $row ['id'] );
		}
		$r = mysql_query ( "select * from medialib where catid='$id'" );
		while ( $s = mysql_fetch_array ( $r ) ) {
			unlink ( $dir . "files/medialib/$s[id].$s[name]" );
			mysql_query ( "delete from medialib where id='$id' limit 1" );
		}
		mysql_query ( "delete from medialib_cat where id='$id'" );
		
		echo "55";
	}
	protected function deleteall($id) {
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/";
		$sql = mysql_query ( "select * from medialib_cat where par='$id'" );
		
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$r = mysql_query ( "select * from medialib where catid='$row[id]'" );
			while ( $s = mysql_fetch_array ( $r ) ) {
				unlink ( $dir . "files/galery/$s[id].$s[name]" );
				mysql_query ( "delete from medialib where id='$id' limit 1" );
			}
			mysql_query ( "delete from medialib_cat where id='$row[id]'" );
			deleteall ( $row ['id'] );
		}
		$r = mysql_query ( "select * from medialib where catid='$id'" );
		while ( $s = mysql_fetch_array ( $r ) ) {
			unlink ( $dir . "files/gallery/$s[id].$s[name]" );
			mysql_query ( "delete from medialib where id='$id' limit 1" );
		}
		mysql_query ( "delete from medialib_cat where id='$id'" );
	}
	protected function UPDATECAT() {
		$id = $_POST ['Id'];
		$parentid = $_POST ['parent'];
		$name = $this->encode ( $_POST ['name'] );
		if ($name == "") {
			$query = "UPDATE medialib_cat SET par='$parentid' WHERE id='$id'";
		} else {
			$query = "UPDATE medialib_cat SET name='$name' WHERE id='$id'";
		}
		mysql_query ( $query ) or die ( mysql_error () );
		echo '33';
	}
	protected function ADDCAT() {
		$name = $this->encode ( $_POST ['name'] );
		$parentid = $_POST ['parentId'];
		$query = "INSERT INTO medialib_cat value('', '$parentid', '$name')";
		mysql_query ( $query );
		echo '33';
	}
	protected function UploadPhoto() {
		$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/medialib/";
		$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
		if (isset ( $p ['extension'] )) {
			$ext = strtolower ( $p ['extension'] );
			if (isset ( $_POST ['cat_id'] )) {
				$cat_id = $_POST ['cat_id'];
			} else {
				$cat_id = 0;
			}
			$s = mysql_query ( "insert into medialib values ('', '$cat_id', '$ext')" ) or die ( mysql_error () );
			$id = mysql_insert_id ();
			$uploadfile = $uploaddir . "$id.$ext";
			$name2 = basename ( $_FILES ['photo-path'] ['name'] );
			$name2 = strtolower ( $name2 );
			if (in_array ( $ext, array ("jpg", "jpeg", "png", "gif" ) )) {
				if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile )) {
					$size = getimagesize ( $uploadfile );
					if ($size [0] > 450 or $size [1] > 450) {
						$this->ResizeImage ( $uploadfile, $uploaddir . $id . "_min.$ext" );
						$minimage = "files/medialib/" . $id . "_min.$ext";
					
					}
					if (isset ( $minimage ) && $minimage != null) {
						$image = $minimage;
					} else {
						$image = "files/medialib/$id.$ext";
					
					}
					$size = getimagesize ( $_SERVER ['DOCUMENT_ROOT'] . "/" . $image );
					$height = $size [1];
					echo '{success:true, id: ' . $id . ', ext: "' . $ext . '", image: "' . $image . '", height: ' . $height . '}';
				} else {
					echo "{failure: true}";
					mysql_query ( "delete from medialib where id='$id' limit 1" );
				}
			} else {
				echo '{failure:true, msg:55}';
				mysql_query ( "delete from medialib where id='$id' limit 1" );
			}
		} else {
			echo '{failure:true, msg:55}';
		}
	}
	function getRoot() {
		$nodes = array ();
		$tmp = array ();
		$sql = mysql_query ( "select * from medialib_cat where par=0" );
		$num = mysql_num_rows ( $sql );
		if ($num == "0") {
			
			$nodes = "";
		}
		
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$nu = mysql_num_rows ( mysql_query ( "select * from medialib_cat where par=$row[id]" ) );
			$child = $this->getChild ( $row ['id'] );
			
			$tmp ['text'] = $this->en ( $row ['name'] );
			$tmp ['id'] = $row ['id'];
			$tmp ['leaf'] = false;
			$tmp ['children'] = $child;
			$nodes [] = $tmp;
		}
		return $nodes;
	}
	function getChild($id) {
		$tmp = array ();
		$children = array ();
		$sql = mysql_query ( "select * from medialib_cat where par='$id'" );
		$num = mysql_num_rows ( $sql );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$child = $this->getChild ( $row ['id'] );
			if ($child) {
				$tmp ['text'] = $this->en ( $row ['name'] );
				$tmp ['id'] = $row ['id'];
				$tmp ['leaf'] = false;
				$tmp ['children'] = $child;
				$children [] = $tmp;
			} else {
				$tmp ['text'] = $this->en ( $row ['name'] );
				$tmp ['id'] = $row ['id'];
				$tmp ['leaf'] = false;
				$children [] = $tmp;
			}
		}
		if (count ( $children ) > 0) {
			return $children;
		} else {
			return "";
		}
	}
	protected function Load_Tree() {
		if (isset ( $_POST ['node'] ) && $_POST ['node'] != "0") {
			$jsonresult = $this->JEncode ( $this->getChild ( $_POST ['node'] ) );
			echo $jsonresult;
		}
		echo $this->JEncode ( $this->getRoot () );
	}
	protected function LISTING() {
		
		if (! isset ( $_POST ['id'] )) {
			$id = 0;
		} else {
			$id = $_POST ['id'];
		}
		$sql_count = "SELECT * FROM medialib where catid='$id'";
		//echo $sql_count;
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		//echo $sql;
		

		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		
		$rows = mysql_num_rows ( $rs_count );
		
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$all = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr ['name'] = $obj ['id'] . "." . $obj ['name'];
				$arr ['url'] = "files/medialib/" . $arr ['name'];
				$arr ['id'] = $obj ['id'];
				$arr ['ext'] = $obj ['name'];
				$all [] = $arr;
			}
			$jsonresult = $this->JEncode ( $all );
			$jsonresult = str_replace ( "\\/", "/", $jsonresult );
			
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
}