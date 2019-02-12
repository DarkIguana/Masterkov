<?php
require_once 'excel.php';

class getExcel {
	var $items = array ();
	var $itemsObjects = null;
	var $catsID = array ();
	var $itemsID = array ();
	var $catsPos = array ();
	function load($file) {
		if (! ($this->base = new Spreadsheet_Excel_Reader ( $file, true, 'windows-1251' ))) {
			return false;
		}
		for($i = 0; $i < count ( $this->base->sheets ); $i ++) {
			$this->get ( $i );
		}
		$this->import ();
		return true;
	}
	function getCatID($name, $parentID = 0, $sort = 0) {
		$name = mysql_real_escape_string ( $name );
		$sql = mysql_query ( "select `id` from `price_cat` where `name`='{$name}' and `parentId`='{$parentID}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$id = mysql_result ( $sql, 0 );
			mysql_query ( "update `price_cat` set `sort`='{$sort}' where `id`='{$id}'" );
			return $id;
		}
		mysql_query ( "insert into `price_cat` (`name`, `parentId`, `sort`) values ('{$name}', '{$parentID}', '{$sort}')" );
		return mysql_insert_id ();
		
	}
	
	function get($sheet = 0) {
		
		$main = $this->base->val ( 5, 6, $sheet );
		$this->items [$main] = array ();
		$this->catsPos [$main] = $sheet + 1;
		$firstCat = '';
		$secondCat = '';
		$thirdCat = '';
		$start = 1;
		$sortCat = 0;
		$itemPos = 0;
		for($row = 7; $row <= $this->base->rowcount ( $sheet ); $row ++) {
			if (self::isEmpty ( $row, $sheet ) != false) {
				continue;
			}
			$start = 1;
			$isCat = false;
			$test1 = trim ( $this->base->val ( $row, 1, $sheet ) );
			if (! empty ( $test1 )) {
				$sortCat ++;
				$firstCat = $test1;
				$firstCatPos = $sortCat;
				$isCat = true;
				$secondCatPost = 0;
				$secondCat = '';
				$thirdCatPos = 0;
				$thirdCat = '';
			}
			$test1 = trim ( $this->base->val ( $row, 2, $sheet ) );
			$font = $this->base->height ( $row, 2, $sheet );
			
			if (! empty ( $test1 ) && $font != 8) {
				$sortCat ++;
				$secondCatPos = $sortCat;
				$secondCat = $test1;
				$thirdCat = '';
				$thirdCatPos = 0;
				$isCat = true;
			}
			
			$test1 = trim ( $this->base->val ( $row, 3, $sheet ) );
			$font = $this->base->height ( $row, 3, $sheet );
			
			if (! empty ( $test1 ) && $font != 8) {
				$isCat = true;
				$sortCat ++;
				$thirdCatPos = $sortCat;
				$thirdCat = $test1;
			}
			if (! $isCat) {
				$itemPos ++;
				if (! empty ( $firstCat ) && ! empty ( $secondCat ) && ! empty ( $thirdCat )) {
					$start = 4;
				} elseif (! empty ( $firstCat ) && ! empty ( $secondCat )) {
					$start = 3;
				} elseif (! empty ( $firstCat )) {
					$start = 2;
				}
				$start = $this->findStart ( $row, $sheet );
				$name = trim ( $this->base->val ( $row, $start, $sheet ) );
				$desc = trim ( $this->base->val ( $row, $start + 1, $sheet ) );
				$price = trim ( $this->base->val ( $row, $start + 2, $sheet ) );
				$Cats = array ('Level1' => array ('name' => $main, 'pos' => ($sheet + 1) ), 'Level2' => array ('name' => $firstCat, 'pos' => $firstCatPos ), 'Level3' => array ('name' => $secondCat, 'pos' => $secondCatPos ), 'Level4' => array ('name' => $thirdCat, 'pos' => $thirdCatPos ) );
				foreach ( $Cats as $namelevel => $nameCat ) {
					if (empty ( $nameCat ['name'] )) {
						unset ( $Cats [$namelevel] );
					}
				}
				
				$new = new stdClass ();
				$new->valute = $this->detectValute ( $this->base->val ( $row, $start + 2, $sheet ) );
				$new->categoryes = ( object ) $Cats;
				$new->name = $name;
				$new->desc = $desc;
				$new->price = str_replace("?", "&euro;", $price);
				$new->price = str_replace("И", "&euro;", $price);
				$new->pos = $itemPos;
				
				$this->itemsObjects [] = $new;
				unset ( $new );
			}
		
		}
	}
	function price($price) {
		$price = str_replace ( " ", "", $price );
		$price = str_replace ( "$", "", $price );
		$price = str_replace ( "И", "", $price );
		return $price;
	}
	function findStart($row, $sheet) {
		for($col = 1; $col <= $this->base->colcount ( $sheet ); $col ++) {
			$val = trim ( $this->base->val ( $row, $col, $sheet ) );
			if (! empty ( $val )) {
				return $col;
			}
		}
		return 1;
	}
	function itemExists($name, $catId) {
		$sql = mysql_query ( "select `id` from `price` where `name`='{$name}' and `cat_id`='{$catId}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			return mysql_result ( $sql, 0 );
		}
		return false;
	}
	function detectValute($price) {
		$price = str_split ( $price );
		if (in_array ( "$", $price )) {
			return 1;
		} elseif (in_array ( "И", $price )) {
			return 2;
		}
		return 0;
	}
	function import() {
		$ids = array ();
		
		foreach ( $this->itemsObjects as $object ) {
			$lastID = 0;
			foreach ( $object->categoryes as $catName ) {
				if (! empty ( $catName['name'] )) {
					$lastID = $this->getCatID ( $catName['name'], $lastID, $catName['pos'] );
					$this->catsID [] = $lastID;
				}
			}
			
			$name = mysql_real_escape_string ( $object->name );
			$desc = mysql_real_escape_string ( $object->desc );
			$price = mysql_real_escape_string ( $object->price );
			if (($idItem = $this->itemExists ( $name, $lastID )) != false) {
				
				mysql_query ( "update `price` set `shortdesc`='{$desc}', `price`='{$price}', `pos`='{$object->pos}', `valute`='{$object->valute}', `active`='1' where `id`='{$idItem}'" ) or die(json_encode(array("failure"=>true, "error"=>mysql_error())));
				$ids [] = $idItem;
			} else {
				mysql_query ( "insert into `price`  (`cat_id`, `name`, `shortdesc`, `price`, `active`, `valute`, `pos`) values ('{$lastID}', '{$name}', '{$desc}', '{$price}', '1', '{$object->valute}', '{$object->pos}')" ) or die(json_encode(array("failure"=>true, "error"=>mysql_error())));
				$ids [] = mysql_insert_id ();
			}
		
		}
		if (count ( $this->catsID ) > 0) {
			mysql_query ( "update `price_cat` set `active`='0' where `id` not in (" . implode ( ",", $this->catsID ) . ")" );
			mysql_query ( "update `price_cat` set `active`='1' where `id` in (" . implode ( ",", $this->catsID ) . ")" );
		}
		if (count ( $ids ) > 0) {
			mysql_query ( "update `price` set `active`='0' where `id` not in (" . implode ( ",", $ids ) . ")" );
		}
	}
	function isEmpty($row, $sheet) {
		for($col = 1; $col <= $this->base->colcount ( $sheet ); $col ++) {
			$test = trim ( $this->base->val ( $row, $col, $sheet ) );
			if (! empty ( $test )) {
				unset ( $test );
				return false;
			}
		}
		return true;
	}
}
class price_admin extends glb {
	var $over = "";
	function __construct() {
		ini_set ( "memory_limit", "78M" );
	}
	function uploadExcel() {
		if (isset ( $_FILES ['photo-path'] ) && isset ( $_FILES ['photo-path'] ['name'] ) && ! empty ( $_FILES ['photo-path'] ['name'] )) {
			$ext = strtolower ( pathinfo ( $_FILES ['photo-path'] ['name'], PATHINFO_EXTENSION ) );
			if ($ext == "xls") {
				$s = new getExcel ();
				if ($s->load ( $_FILES ['photo-path'] ['tmp_name'] ) == true) {
					echo json_encode ( array ("success" => true, "msg" => $this->en ( 'ѕрайс-лист успешно обработан' ), "objects" => $s->itemsObjects ) );
					return false;
				} else {
					echo json_encode ( array ("failure" => true, "msg" => $this->en ( 'не удалось открыть файл' ) ) );
					return false;
				}
			} else {
				echo json_encode ( array ("failure" => true, "msg" => $this->en ( '‘айл должен быть формата XLS версии Windows 98/2003/XP' ) ) );
				return false;
			}
		}
		echo json_encode ( array ("failure" => true, "msg" => $this->en ( 'Ќе удалось загрузить файл' ) ) );
		return false;
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
		mysql_query ( "update price set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function UpdateImagePos() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$pos = isset ( $_POST ['pos'] ) ? ( int ) $_POST ['pos'] : 0;
		$name = isset ( $_POST ['name'] ) ? mysql_real_escape_string ( $this->encode ( $_POST ['name'] ) ) : '';
		mysql_query ( "update `price_img` set `pos`='{$pos}', `name`='{$name}' where `id`='{$id}' limit 1" );
		echo "33";
	}
	function UploadPhoto() {
		if (isset ( $_POST ['id'] ) && ! empty ( $_POST ['id'] )) {
			$_POST ['id'] = ( int ) $_POST ['id'];
			$name = isset ( $_POST ['name'] ) ? mysql_real_escape_string ( $_POST ['name'] ) : '';
			mysql_query ( "insert into `price_img` values ('', '$_POST[id]','{$name}','', '', '0')" );
			$id = mysql_insert_id ();
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
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
						
						mysql_query ( "update `price_img` set `ext`='$ext' where `id`='$id' limit 1" );
					} else {
						mysql_query ( "delete from `price_img` where `id`='$id' limit 1" );
						echo "{failure:true}";
						exit ();
					}
				
				} else {
					mysql_query ( "delete from `price_img` where `id`='$id' limit 1" );
					echo "{failure:true}";
					exit ();
				}
			} else {
				mysql_query ( "delete from `price_img` where `id`='$id' limit 1" );
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
	function getCols() {
		$cols = array ();
		$sql = mysql_query ( "SHOW COLUMNS FROM `price`" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$cols [] = $row ['Field'];
			}
		}
		return $cols;
	}
	function save() {
		$id = isset ( $_POST ['id'] ) ? $_POST ['id'] : 0;
		
		$fields = array ();
		$values = array ();
		$cols = $this->getCols ();
		$_POST ['spec'] = isset ( $_POST ['spec'] ) ? ( int ) $_POST ['spec'] : 0;
		$_POST ['new'] = isset ( $_POST ['new'] ) ? ( int ) $_POST ['new'] : 0;
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $cols )) {
				$fields [$field] = $field;
				$values [$field] = addslashes ( $this->encode ( $value ) );
			}
		}
		$fields ['active'] = 'active';
		$values ['active'] = 1;
		//mail("sun-go-down@yandex.ru", "Test", $this->A2Up($fields, $values));
		mysql_query ( "update `price` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( json_encode ( array ("failure" => true, "error" => mysql_error () ) ) );
		echo "{success:true}";
	}
	function Listing() {
		if (! isset ( $_POST ['id'] )) {
			$id = 0;
		} else {
			$id = ( int ) $_POST ['id'];
		}
		$orderBy = 'order by ';
		if (isset ( $_POST ['dir'] ) && isset ( $_POST ['sort'] )) {
			$orderBy .= " `{$_POST['sort']}` {$_POST['dir']}";
		} else {
			$orderBy .= " `pos`";
		}
		
		$sql_count = "SELECT * FROM `price` where cat_id='$id' {$orderBy}";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				$record ['link'] = "?price=$obj[id]";
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		
		$sql = mysql_query ( "select * from `price_img` where `iditem`='$_POST[id]'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
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
			mysql_query ( "delete from `price_img` where `id`='$row[id]' limit 1" );
		}
		mysql_query ( "delete from `price` where `id`='$_POST[id]'" );
		echo "33";
	}
	function deleteImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select * from `price_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
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
		mysql_query ( "delete from `price_img` where `id`='$row[id]' limit 1" );
		echo "33";
	}
	function setOsnImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select `id`,`iditem` from `price_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		mysql_query ( "update `price_img` set `osn`='0' where `iditem`='$row[iditem]'" );
		mysql_query ( "update `price_img` set `osn`='1' where `id`='$row[id]'" );
	}
	function Listing_Images() {
		$id = $_POST ['dd'];
		
		$sql_count = "SELECT * FROM `price_img` where `iditem`='$id'";
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
				$arr2 ['name'] = $this->en ( $obj ['name'] );
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
		mysql_query ( "insert into `price` (`id`, `active`) value ('', '0')" );
		$id = mysql_insert_id ();
		echo $id;
	}
	function deepCat($parentId) {
		$sql = mysql_query ( "select * from `price_cat` where `parentId`='{$parentId}'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$this->deepCat ( $row ['id'] );
				$id = $row ['id'];
				mysql_query ( "delete from `price_cat` where `id`='$id' limit 1" );
				$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
				$d = dir ( $dir );
				while ( $name = $d->Read () ) {
					if ($name == ".." or $name == ".") {
						continue;
					}
					$p = pathinfo ( $name );
					$filename = $p ['filename'];
					if ($filename == "cat_{$id}") {
						unlink ( $dir . $name );
					}
				}
				$sql2 = mysql_query ( "select * from `price` where `cat_id`='$id'" );
				while ( $rr = mysql_fetch_array ( $sql2 ) ) {
					$sql = mysql_query ( "select * from `price_img` where `iditem`='$rr[id]'" );
					while ( $row = mysql_fetch_array ( $sql ) ) {
						$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
						$file = "s_{$row['id']}.{$row['ext']}";
						$file2 = "b_{$row['id']}.{$row['ext']}";
						$file3 = "o_{$row['id']}.{$row['ext']}";
						if (file_exists ( $dir . $file )) {
							$dd = $dir . $file;
							@unlink ( $dd );
						}
						if (file_exists ( $dir . $file2 )) {
							$dd = $dir . $file2;
							@unlink ( $dd );
						}
						if (file_exists ( $dir . $file3 )) {
							$dd = $dir . $file3;
							@unlink ( $dd );
						}
						mysql_query ( "delete from `price_img` where `id`='$row[id]' limit 1" );
					}
					mysql_query ( "delete from `price` where `id`='$rr[id]'" );
				}
			}
		}
	}
	function deletecat() {
		$id = ( int ) $_POST ['id'];
		$this->deepCat ( $id );
		mysql_query ( "delete from `price_cat` where `id`='$id' limit 1" );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
		$d = dir ( $dir );
		while ( $name = $d->Read () ) {
			if ($name == ".." or $name == ".") {
				continue;
			}
			$p = pathinfo ( $name );
			$filename = $p ['filename'];
			if ($filename == "cat_{$id}") {
				unlink ( $dir . $name );
			}
		}
		$sql2 = mysql_query ( "select * from `price` where `cat_id`='$id'" );
		while ( $rr = mysql_fetch_array ( $sql2 ) ) {
			$sql = mysql_query ( "select * from `price_img` where `iditem`='$rr[id]'" );
			while ( $row = mysql_fetch_array ( $sql ) ) {
				$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
				$file = "s_{$row['id']}.{$row['ext']}";
				$file2 = "b_{$row['id']}.{$row['ext']}";
				$file3 = "o_{$row['id']}.{$row['ext']}";
				if (file_exists ( $dir . $file )) {
					$dd = $dir . $file;
					@unlink ( $dd );
				}
				if (file_exists ( $dir . $file2 )) {
					$dd = $dir . $file2;
					@unlink ( $dd );
				}
				if (file_exists ( $dir . $file3 )) {
					$dd = $dir . $file3;
					@unlink ( $dd );
				}
				mysql_query ( "delete from `price_img` where `id`='$row[id]' limit 1" );
			}
			mysql_query ( "delete from `price` where `id`='$rr[id]'" );
		}
		
		echo '33';
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
	function AddCat() {
		$name = $_POST ['name'];
		$id = isset ( $_POST ['id'] ) ? $_POST ['id'] : 0;
		$active=isset($_POST['active'])?(int)$_POST['active']:0;
		if (!in_array($active, array(0,1))){
			$active=0;
		}
		$desc = isset ( $_POST ['desc'] ) ? mysql_real_escape_string ( $_POST ['desc'] ) : '';
		if ($id == 0) {
			$query = "INSERT INTO `price_cat` values ('', '', '$name', '{$desc}','','0', '{$active}')";
			mysql_query ( $query ) or die ( "{failure:true, error:'" . addslashes ( mysql_error () ) . "'}" );
			$id = mysql_insert_id ();
			
		//echo "{success:true, add:1}";
		} else {
			$query = "update `price_cat` set `name`='$name', `desc`='{$desc}', `active`='{$active}' where `id`='$id'";
			mysql_query ( $query );
		}
		if (isset ( $_FILES ['photo-path'] ) && isset ( $_FILES ['photo-path'] ['name'] ) && ! empty ( $_FILES ['photo-path'] ['name'] )) {
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/price/";
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			if (isset ( $p ['extension'] )) {
				$ext = strtolower ( $p ['extension'] );
				if (in_array ( $ext, array ("jpg", "jpeg", "png", "gif", "bmp", "tiff" ) )) {
					$uploadfile1 = $uploaddir . "cat_$id.$ext";
					if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile1 )) {
						mysql_query ( "update `price_cat` set `iconExt`='{$ext}' where `id`='{$ext}'" );
						@chmod ( $uploadfile1, 0777 );
					}
				}
			}
		}
		echo '{success:true}';
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
	function Load_Tree() {
		if (isset ( $_POST ['node'] ) && $_POST ['node'] != "0") {
			$jsonresult = $this->JEncode ( $this->getChild ( $_POST ['node'] ) );
			echo $jsonresult;
		}
		echo $this->JEncode ( $this->getRoot () );
	}
	function Update_Category() {
		if (isset ( $_POST ['id'] ) && $_POST ['id'] != 0) {
			mysql_query ( "update `price_cat` set `parentId`='$_POST[parent]' where `id`='$_POST[id]'" );
			echo "33";
		}
	}
	function SortOrder() {
		$nodes .= "[";
		$nodes .= stripslashes ( $_POST ['nodes'] );
		$nodes .= "]";
		$mass = $this->JEncode ( $nodes, 2 );
		$this->update_nodes ( $mass [0] );
	}
	function update_nodes($nodes, $parent_id = 0) {
		$display_order = 0;
		foreach ( $nodes as $id => $children ) {
			$display_order ++;
			$n = count ( $children );
			mysql_query ( "update `price_cat` set `sort`='$display_order' where id='$id'" );
			$this->update_nodes ( $children, $id );
		}
	}
	function getRoot() {
		$sql = mysql_query ( "select * from price_cat where parentId=0 order by `sort`" );
		$num = mysql_num_rows ( $sql );
		if ($num == "0") {
			$nodes = "";
		}
		$nodes = array ();
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$nu = mysql_num_rows ( mysql_query ( "select * from price_cat where parentId=$row[id] order by `sort` asc" ) );
			$child = $this->getChild ( $row ['id'] );
			$tmp = array ();
			$tmp ['text'] = $this->en ( $row ['name'] );
			$tmp ['desc'] = $this->en ( $row ['desc'] );
			$tmp ['active'] =  $row ['active'];
			$tmp ['id'] = $row ['id'];
			$tmp ['sortorder'] = $row ['sort'];
			$tmp ['leaf'] = false;
			$tmp ['img'] = ""; // $row ['img'];
			$tmp ['children'] = $child;
			$nodes [] = $tmp;
		}
		return $nodes;
	}
	function getChild($id) {
		$sql = mysql_query ( "select * from price_cat where parentId='$id' order by `sort` ASC" );
		$num = mysql_num_rows ( $sql );
		$children = array ();
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$child = $this->getChild ( $row ['id'] );
			$tmp = array ();
			if ($child) {
				$tmp ['text'] = $this->en ( $row ['name'] );
				$tmp ['id'] = $row ['id'];
				$tmp ['desc'] = $this->en ( $row ['desc'] );
				$tmp ['img'] = ""; //$row ['img'];
				$tmp ['leaf'] = false;
				$tmp ['active'] =  $row ['active'];
				$tmp ['children'] = $child;
				$children [] = $tmp;
			} else { 
				$tmp ['text'] = $this->en ( $row ['name'] );
				$tmp ['id'] = $row ['id'];
				$tmp ['desc'] = $this->en ( $row ['desc'] );
				$tmp ['img'] = ""; //$row ['img'];
				$tmp ['active'] =  $row ['active'];
				$tmp ['leaf'] = false;
				
				$children [] = $tmp;
			}
		
		}
		
		if (count ( $children ) == 0) {
			$children = "";
		}
		return $children;
	}
}

?>