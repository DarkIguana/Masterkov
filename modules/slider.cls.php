<?php
class slider_admin extends glb {
	var $over = "";
	function __construct() {
		ini_set ( "memory_limit", "78M" );
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	function Update() {
		if (isset ( $_POST ['pos'] )) {
			$pos = $_POST ['pos'];
		} else {
			$pos = "";
		}
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		mysql_query ( "update slider set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function UpdateImagePos() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$pos = isset ( $_POST ['pos'] ) ? ( int ) $_POST ['pos'] : 0;
		mysql_query ( "update `slider_img` set `pos`='{$pos}' where `id`='{$id}' limit 1" );
		echo "33";
	}
	function UploadPhoto() {
		if (isset ( $_POST ['id'] ) && ! empty ( $_POST ['id'] )) {
			mysql_query ( "insert into `slider_img` values ('', '$_POST[id]','', '', '0')" );
			$id = mysql_insert_id ();
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/slider/";
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			if (isset ( $p ['extension'] )) {
				$ext = strtolower ( $p ['extension'] );
				
				if (in_array ( $ext, array ("jpg", "jpeg", "png", "gif" ) )) {
					$uploadfile1 = $uploaddir . "b_$id.$ext";
					$uploadfile2 = $uploaddir . "s_$id.$ext";
					$uploadfile3 = $uploaddir . "o_$id.$ext";
					if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile3 )) {
						
						$this->ResizeImage ( $uploadfile3, $uploadfile1, 600, 400 );
						if (copy ( $uploadfile1, $uploadfile2 )) {
							$this->ResizeImage ( $uploadfile2, $uploadfile2, 205, 142 );
						}
						
						mysql_query ( "update `slider_img` set `ext`='$ext' where `id`='$id' limit 1" );
					} else {
						mysql_query ( "delete from `slider_img` where `id`='$id' limit 1" );
						echo "{failure:true}";
						exit ();
					}
				
				} else {
					mysql_query ( "delete from `slider_img` where `id`='$id' limit 1" );
					echo "{failure:true}";
					exit ();
				}
			} else {
				mysql_query ( "delete from `slider_img` where `id`='$id' limit 1" );
				echo "{failure:true}";
				exit ();
			}
		}
		echo "{success:true}";
	}
	function A2Up($fields, $values) {
		
		$string = "";
		$i = 0;
		foreach ( $fields as $name => $value ) {
			$i ++;
			if ($i > 1) {
				$string .= ",";
			}
			
			$value = addslashes ( $value );
			$vv = isset ( $values [$name] ) ? $values [$name] : '';
			$string .= "`{$value}`='$vv'";
		
		}
		return $string;
	}
	function A2S($Array, $Sep = ",", $Closer = "", $Slashes = false) {
		if (is_array ( $Array )) {
			$string = "";
			$i = 0;
			foreach ( $Array as $name => $value ) {
				$i ++;
				if ($i > 1) {
					$string .= "{$Sep}";
				}
				if (is_array ( $value )) {
					$this->A2S ( $value, $Sep, $Closer, $Slashes );
				} else {
					if ($Slashes == true) {
						$value = addslashes ( $value );
					}
					$string .= "{$Closer}{$value}{$Closer}";
				}
			}
			return $string;
		}
		return $Array;
	}
	function getColumns() {
		$cols = array ();
		$sql = mysql_query ( "SHOW COLUMNS FROM `slider`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$cols [] = strtolower ( $row ['Field'] );
			}
		}
		return $cols;
	}
	function save() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if (isset ( $_POST ['id'] )) {
			unset ( $_POST ['id'] );
		}
		$fields = array ();
		$values = array ();
		$notallow = array ("id", "module", "task", "xaction", "ext-c", "cat_id" );
		$allow = $this->getColumns ();
		foreach ( $_POST as $field => $value ) {
			$test = strtolower ( $field );
			if (in_array ( $test, $allow )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $this->encode ( $value ) );
			}
		}
		$fields ['active'] = 'active';
		$values ['active'] = 1;
		//mail("sun-go-down@yandex.ru", "Test", $this->A2Up($fields, $values));
		mysql_query ( "update `slider` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( mysql_error () ) . "'}" );
		echo "{success:true}";
	}
	function Listing() {
		if (! isset ( $_POST ['id'] )) {
			$id = 0;
		} else {
			$id = $_POST ['id'];
		}
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM `slider`";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				$record ['link'] = "?slider=$obj[id]";
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		
		$sql = mysql_query ( "select * from `slider_img` where `iditem`='$_POST[id]'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/slider/";
			$file = "s_{$row['id']}.{$row['ext']}";
			$file2 = "b_{$row['id']}.{$row['ext']}";
			if (file_exists ( $dir . $file )) {
				$dd = $dir . $file;
				@unlink ( $dd );
			}
			if (file_exists ( $dir . $file2 )) {
				$dd = $dir . $file2;
				@unlink ( $dd );
			}
			mysql_query ( "delete from `slider_img` where `id`='$row[id]' limit 1" );
		}
		mysql_query ( "delete from `slider` where `id`='$_POST[id]'" );
		echo "33";
	}
	function deleteImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select * from `slider_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/slider/";
		$file = "s_{$row['id']}.{$row['ext']}";
		$file2 = "b_{$row['id']}.{$row['ext']}";
		if (file_exists ( $dir . $file )) {
			$dd = $dir . $file;
			@unlink ( $dd );
		}
		if (file_exists ( $dir . $file2 )) {
			$dd = $dir . $file2;
			@unlink ( $dd );
		}
		mysql_query ( "delete from `slider_img` where `id`='$row[id]' limit 1" );
		echo "33";
	}
	function setOsnImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select `id`,`iditem` from `slider_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		mysql_query ( "update `slider_img` set `osn`='0' where `iditem`='$row[iditem]'" );
		mysql_query ( "update `slider_img` set `osn`='1' where `id`='$row[id]'" );
	}
	function Listing_Images() {
		$id = ( int ) $_POST ['dd'];
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM `slider_img` where `iditem`='$id'";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr2 ['id'] = $this->en ( $obj ['id'] );
				$arr2 ['image'] = "s_{$obj['id']}.{$obj['ext']}";
				$arr2 ['file'] = "s_{$obj['id']}.{$obj['ext']}";
				$arr2 ['osn'] = $obj ['osn'];
				$arr2 ['pos'] = $obj ['pos'];
				$arr [] = $arr2;
			
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function NewItem() {
		mysql_query ( "insert into `slider` (`id`, `active`) value ('', '0')" );
		$id = mysql_insert_id ();
		echo $id;
	}
	
	function winDecode($string) {
		if (is_array ( $string )) {
			$newArray = array ();
			foreach ( $string as $name => $value ) {
				if (is_array ( $value )) {
					$newArray [$name] = $this->winDecode ( $value );
				} else {
					if (is_string ( $value )) {
						$newArray [$name] = iconv ( "windows-1251", "utf-8", $value );
					} else {
						$newArray [$name] = $value;
					}
				}
			}
			return $newArray;
		} else {
			if (is_string ( $string )) {
				return iconv ( "windows-1251", "utf-8", $string );
			}
		}
		return $string;
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

}
