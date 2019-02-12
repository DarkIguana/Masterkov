<?php
class shop_comments_admin extends glb {
	var $over = "";
	function __construct() {
		ini_set ( "memory_limit", "78M" );
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	function Update() {
		$_POST['id'] = (int)$_POST['id'];
		if (isset ( $_POST ['active'] )) {
			$Active = $_POST ['active'];
		} else {
			$Active = "";
		}
		mysql_query ( "update shop_items_comments  active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	
	function UploadPhoto() {
		if (isset ( $_POST ['id'] ) && ! empty ( $_POST ['id'] )) {
			mysql_query ( "insert into `shop_items_comments_img` values ('', '$_POST[id]','')" );
			$id = mysql_insert_id ();
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop_comments/";
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			if (isset ( $p ['extension'] )) {
				$ext = strtolower ( $p ['extension'] );
				
				if (in_array ( $ext, array ("jpg", "jpeg", "png", "gif" ) )) {
					
					$uploadfile3 = $uploaddir . "$id.$ext";
					if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile3 )) {
						mysql_query ( "update `shop_items_comments_img` set `ext`='$ext' where `id`='$id' limit 1" );
					} else {
						mysql_query ( "delete from `shop_items_comments_img` where `id`='$id' limit 1" );
						echo "{failure:true}";
						exit ();
					}
				
				} else {
					mysql_query ( "delete from `shop_items_comments_img` where `id`='$id' limit 1" );
					echo "{failure:true}";
					exit ();
				}
			} else {
				mysql_query ( "delete from `shop_items_comments_img` where `id`='$id' limit 1" );
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
		$sql = mysql_query ( "SHOW COLUMNS FROM `shop_items_comments`" );
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
		LogFF::log('Вытаскиваем записи комментариев');
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT  `shop_items_comments`.*, (select `name` from `shop_users` where `id`=`shop_items_comments`.`uid` limit 1) as `userName` FROM `shop_items_comments` where `iditem`='{$id}' order by `date` desc";
		
		
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				if (empty($record['userName'])){
					$record['userName'] = 'Неизвестно';
				}
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		
		$sql = mysql_query ( "select * from `shop_items_comments_img` where `iditem`='$_POST[id]'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop_comments/";
			$file = "{$row['id']}.{$row['ext']}";
			
			if (file_exists ( $dir . $file )) {
				$dd = $dir . $file;
				@unlink ( $dd );
			}
		
			mysql_query ( "delete from `shop_items_comments_img` where `id`='$row[id]' limit 1" );
		}
		mysql_query ( "delete from `shop_items_comments` where `id`='$_POST[id]'" );
		echo "33";
	}
	function deleteImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select * from `slider_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/shop_comments/";
		$file = "{$row['id']}.{$row['ext']}";
		if (file_exists ( $dir . $file )) {
			$dd = $dir . $file;
			@unlink ( $dd );
		}
		
		mysql_query ( "delete from `shop_items_comments_img` where `id`='$row[id]' limit 1" );
		echo "33";
	}
	
	function Listing_Images() {
		$id = ( int ) $_POST ['dd'];
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM `shop_items_comments_img` where `iditem`='$id'";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				$arr2 ['id'] = $this->en ( $obj ['id'] );
				$arr2 ['image'] = "{$obj['id']}.{$obj['ext']}";
				$arr2 ['file'] = "{$obj['id']}.{$obj['ext']}";
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
}
