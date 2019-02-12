<?
class additional_admin extends admin {
	function __construct() {
		
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	
	// ************** подгрузка базы, для доп модуля редактора Выбор Виджетов и Блоков *******************\\\\\\\\
	

	function LoadStoreWidgets() {
		$sql_count = "SELECT * FROM widgets ORDER BY `name` ASC";
		$sql = $sql_count;
		$rs_count = mysql_query ( $sql_count );
		$arr = array ();
		$arr2 = array ();
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs ) ) {
				$arr2 ['title'] = $this->en ( $o ['title'] );
				$arr2 ['link'] = "{{$o['name']}}";
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function Load_Site_Settings() {
		$sql = mysql_query ( "select * from site_setting" );
		$tmp = array ();
		$data = array ();
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$tmp [$row ['option']] = $this->en ( $row ['value'] );
			//$data[] = $tmp;
		}
		echo "{success:true, data:{$this->JEncode($tmp)}}";
	}
	///   ***      Закачка файлов    *** \\\
	function UploadFile() {
		$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/files/";
		$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
		$uploadfile = $uploaddir . basename ( $_FILES ['photo-path'] ['name'] );
		$ext = $p ['extension'];
		if (preg_match ( "/php/is" )) {
			echo "{failure:true, msg:'{$this->en('Нельзя загружать скрипты на сервер')}'}";
		} else {
			$file = "files/files/" . basename ( $_FILES ['photo-path'] ['name'] );
			if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile )) {
				echo "{success:true, msg:'{$this->en($file)}'}";
			} else {
				echo "{failure:true, msg:'{$this->en('Во время загрузки произошла ошибка, попробуйте чуть позднее')}'}";
			}
		}
	}
	function Save_Site_Settings() {
		if (!isset($_POST['sk'])){
			$_POST['sk'] = 0;
		}
		foreach ( $_POST as $int => $value ) {
			$value = addslashes ( $this->encode ( $value ) );
			if (in_array(strtolower($int), array("module","task","xaction"))){
				continue;
			}
			$test = mysql_result ( mysql_query ( "select COUNT(*) from site_setting where `option`='$int'" ), 0 );
			if ($test == 0) {
				
				mysql_query ( "insert into site_setting values ('$int', '$value')" );
			} else {
				mysql_query ( "update site_setting set `value`='$value' where `option`='$int'" );
			}
		}
		echo "{success:true}";
	}
	function LoadStoreBlocks() {
		$sql_count = "SELECT * FROM `blocks` ORDER BY `id` ASC";
		$sql = $sql_count;
		$rs_count = mysql_query ( $sql_count ) or die ( mysql_error () );
		$arr = array ();
		$arr2 = array ();
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( mysql_error () );
		
		if ($rows > 0) {
			while ( $o = mysql_fetch_array ( $rs ) ) {
				$arr2 ['title'] = $this->en ( $o ['title'] );
				$arr2 ['link'] = "{block_{$o['name']}}";
				$arr [] = $arr2;
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	
	///   *** Редактирование дизайна *** \\\
	function SaveDesign() {
		$design = $this->encode ( $_POST ['design'] );
		$default_design = "";
		$default_design = @mysql_fetch_array ( mysql_query ( "select * from `site_settings` where `option`='template'" ) );
		if (! isset ( $default_design ['value'] ) or isset ( $default_design ['value'] ) && empty ( $default_design ['value'] ) or ! $default_design) {
			$default_design = "default";
		}
		//chmod($_SERVER['DOCUMENT_ROOT']."/template/{$default_design}/index.html", 755);
		$handler = fopen ( $_SERVER ['DOCUMENT_ROOT'] . "/template/{$default_design}/index.html", "w+" );
		fputs ( $handler, $design );
		fclose ( $handler );
		echo "{success:true}";
	}
	function LoadDesign() {
		$default_design = "";
		$default_design = @mysql_fetch_array ( mysql_query ( "select * from `site_settings` where `option`='template'" ) );
		if (! isset ( $default_design ['value'] ) or isset ( $default_design ['value'] ) && empty ( $default_design ['value'] ) or ! $default_design) {
			$default_design = "default";
		}
		$design = @file_get_contents ( "template/{$default_design}/index.html" );
		if ($design) {
			//	$design = str_replace("\n", "", $design);
			$design = $design;
			$design = $this->en ( $design );
			$a = array ("success" => true, "data" => array ("design" => $design ) );
			echo $this->JEncode ( $a );
		} else {
			$a = array ("success" => false, "error" => 1 );
			echo $this->JEncode ( $a );
			//echo "[{failure:true}]";
		}
	}
}