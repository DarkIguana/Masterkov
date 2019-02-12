<?php

class files_admin extends glb {
	
	function __construct() {
		//ini_set ( "memory_limit", "78M" );
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
		mysql_query ( "update files set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
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
	function save() {
		
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if ($id == 0 or empty ( $id )) {
			mysql_query ( "insert into `files` (`id`, `active`) values ('', '1')" );
			$id = mysql_insert_id ();
		}
		$fields = array ();
		$values = array ();
		foreach ( $_POST as $field => $value ) {
			if (! preg_match ( "/(id|module|task|xaction|ext-c|cat_name)/is", $field ) or preg_match ( "/cat_id/is", $field )) {
				
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		$fields ['date'] = 'date';
		$values ['date'] = time ();
		mysql_query ( "update `files` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		$this->uploadPhoto ( $id, true );
		echo "{success:true}";
	
		//echo "\nupdate `files` set {$this->A2Up($fields, $values)} where `id`='$id'";
	}
	function uploadPhoto($id, $deleteOld = false) {
		$allow = array ("php", "pl", "php5", "php3", "php4", "cgi" );
		if (! empty ( $id ) && $id != 0) {
			if (isset ( $_FILES ['photo-path'] ) && isset ( $_FILES ['photo-path'] ['name'] ) && ! empty ( $_FILES ['photo-path'] ['name'] )) {
				$pathinfo = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
				if (isset ( $pathinfo ['extension'] )) {
					$ext = strtolower ( $pathinfo ['extension'] );
					if (! in_array ( $ext, $allow )) {
						$fileName = $this->translit ( $this->getFileName ( $_FILES ['photo-path'] ['name'] ) );
						$newFile = 'files/publications/' . $fileName . '_' . $id . '.' . $ext;
						if ($deleteOld == true) {
							$sql = mysql_query ( "select  `ext`, `id`, `fileName` from `files` where `id`='$id'" );
							if (mysql_num_rows ( $sql ) > 0) {
								$row = mysql_fetch_assoc ( $sql );
								if (! empty ( $row ['ext'] ) && file_exists ( "files/publications/{$row['fileName']}_{$row['id']}.{$row['ext']}" )) {
									@unlink ( "files/publications/{$row['fileName']}_{$row['id']}.{$row['ext']}" );
								}
							}
						}
						if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $newFile )) {
							
							chmod ( $newFile, 0755 );
							$newFile = addslashes ( $newFile );
							$fileName = addslashes ( $fileName );
							mysql_query ( "update `files` set `ext`='$ext', `fileName`='$fileName' where `id`='$id'" );
						}
					}
				}
			}
		}
		return true;
	}
	function getFileName($fileName) {
		$name = explode ( ".", $fileName );
		$file = array ();
		$i = 0;
		$count = count ( $name );
		foreach ( $name as $str ) {
			$i ++;
			if ($i < $count) {
				$file [] = $str;
			}
		
		}
		return implode ( ".", $file );
	}
	function Listing() {
		
		$sql_count = "SELECT * FROM `files` order by `pos` asc";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				if (file_exists ( "files/publications/{$obj['fileName']}_{$obj['id']}.{$obj['ext']}" )) {
					$record ['link'] = "files/publications/{$obj['fileName']}_{$obj['id']}.{$obj['ext']}";
					$record ['filesize'] = number_format ( filesize ( "files/publications/{$obj['fileName']}_{$obj['id']}.{$obj['ext']}" ) / 1024, 0, "", " " ) . " kb";
				} else {
					$record ['filesize'] = "0 kb";
					$record ['link'] = "Файл не существует";
				}
				$record ['date'] = date ( "d-m-Y", $record ['date'] );
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		
		$sql = mysql_query ( "select  `ext`, `id` from `files` where `id`='$id'" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			if (! empty ( $row ['ext'] ) && file_exists ( "files/publications/{$row['fileName']}_{$row['id']}.{$row['ext']}" )) {
				@unlink ( "files/publications/{$row['fileName']}_{$row['id']}.{$row['ext']}" );
			}
		}
		mysql_query ( "delete from `files` where `id`='$_POST[id]'" );
		echo "33";
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