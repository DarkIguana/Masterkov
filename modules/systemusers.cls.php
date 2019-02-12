<?php
class systemusers_admin extends glb {
	
	function Update() {
		
		if (isset ( $_POST ['active'] )) {
			$Active = ( int ) $_POST ['active'];
		} else {
			$Active = 0;
		}
		
		mysql_query ( "update users set  `active`='$Active' where id='$_POST[id]'" );
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
		if (isset ( $_POST ['id'] ) ){
			unset( $_POST ['id']  );
		}
		if ($id == 0 or empty ( $id )) {
			if (! isset ( $_POST ['login'] ) or isset ( $_POST ['login'] ) && empty ( $_POST ['login'] )) {
				echo json_encode ( array ("failure" => true, "msg" => $this->en ( "Не заполнено поле Имя пользователя" ) ) );
				return false;
			}
			if (! isset ( $_POST ['password'] ) or isset ( $_POST ['password'] ) && empty ( $_POST ['password'] )) {
				echo json_encode ( array ("failure" => true, "msg" => $this->en ( "Не заполнено поле Пароль" ) ) );
				return false;
			}
			mysql_query ( "insert into `users` (`active`) values ('1')" );
			$id = mysql_insert_id ();
		}
		$_POST ['password'] = isset ( $_POST ['password'] ) ? trim ( $_POST ['password'] ) : '';
		if (empty ( $_POST ['password'] )) {
			unset($_POST['password']);
		} else {
			$_POST ['password'] = isset ( $_POST ['password'] ) ? md5 ( $_POST ['password'] ) : '';
		}
		$fields = array ();
		$values = array ();
		$columns = array ();
		$sql = mysql_query ( "SHOW COLUMNS FROM `users`" );
		while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
			$columns [] = $row ['Field'];
		}
		foreach ( $_POST as $field => $value ) {
			if (in_array ( $field, $columns )) {
				
				$fields [$field] = $field;
				$values [$field] = addslashes ( $value );
			}
		}
		
		mysql_query ( "update `users` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( htmlspecialchars ( mysql_error () ) ) . "'}" );
		
		echo "{success:true}";
		
	//echo "\nupdate `users` set {$this->A2Up($fields, $values)} where `id`='$id'";
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
		
		$sql_count = "SELECT * FROM `users` ";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '{"total":"' . $rows . '","results":' . $jsonresult . '}';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		mysql_query ( "delete from `users` where `id`='$_POST[id]'" );
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