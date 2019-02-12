<?php
class debug extends glb {
	var $text = "";
	var $ll = array ();
	function ucFirst($str) {
		$split = str_split ( $str );
		$ar = str_split ( "éöóêåíãøùçõúôûâàïğîëäæıÿ÷ñìèòüáşqwertyuiopasdfghjklzxcvbnm" );
		$ar2 = str_split ( "ÉÖÓÊÅÍÃØÙÇÕÚÔÛÂÀÏĞÎËÄÆİß×ÑÌÈÒÜÁŞQWERTYUIOPASDFGHJKLZXCVBNM" );
		
		foreach ( $split as $nn => $tt ) {
			foreach ( $ar as $num => $y ) {
				
				if ($tt == $y) {
					
					$tt = $ar2 [$num];
					$split [$nn] = $tt;
					return implode ( "", $split );
				}
			}
		}
	
	}
	function ifthe($str) {
		$ar = str_split ( "éöóêåíãøùçõúôûâàïğîëäæıÿ÷ñìèòüáşqwertyuiopasdfghjklzxcvbnm" );
		$str = str_split ( $str );
		foreach ( $ar as $n ) {
			if (in_array ( $n, $str )) {
				return false;
			}
		}
		return true;
	}
	function __construct() {
		echo "<pre>";
		/*$sql = mysql_query ( "select `Title`, `Id` from `pages`" );
		while ( $row = mysql_fetch_assoc ( $sql ) ) {
			if ($this->ifthe ( htmlspecialchars_decode($row ['Title']) )) {
				$t = $this->strtomin ( htmlspecialchars_decode ( $row ['Title'] ) );
				$t = $this->ucFirst ( $t );
			} else {
				$t = htmlspecialchars_decode ( $row ['Title'] );
			}
			mysql_query("update `pages` set `Title`='".mysql_real_escape_string($t)."' where `Id`='{$row['Id']}'");
		}
		exit ();
		echo "<pre>";
		*/
		$txt = file_get_contents ( '1.js' );
		
		$this->text = $txt; //file_get_contents ( 'template/default/menu2/menu2.js' );
		$this->getAllLinks ();
		$this->ll ['?id=3'] = 111;
		$this->ll ['?id=1a5_1'] = 113;
		$this->ll ['?id=1a5_2'] = 114;
		$this->ll ['?id=1a5_3'] = 115;
		$this->ll ['?id=1a5_4'] = 116;
		$this->ll ['?id=1a5_5'] = 117;
		$this->ll ['?id=1a5_6'] = 118;
		$this->ll ['?id=1b5_1'] = 119;
		$this->ll ['?id=a1'] = 120;
		$this->ll ['?id=a2'] = 121;
		$this->ll ['?id=1f_4_1'] = 122;
		$this->ll ['?id=1f_4_2'] = 123;
		$this->ll ['?id=1f_4_3'] = 124;
		$this->ll ['?id=3_1'] = 125;
		print_r($this->ll);
		exit();
		$ss = str_replace ( "&quot;", htmlspecialchars ( "&quot;" ), $ss );
		//$ss = str_replace("&nbsp;", htmlspecialchars("&nbsp;"),$ss);
		foreach ( $this->ll as $n => $Id ) {
			$ss = str_replace ( "\"{$n}\"", "\"/pages-{$Id}.html\"", $ss );
		}
		preg_match_all ( '/0,"(.*?)","(.*?)","",-1,-1,0,"(.*?)"/', $this->text, $all );
		
		foreach ( $all [1] as $n => $name ) {
			$name2 = stripslashes ( $name );
			
		//	if (($ss = str_replace($name, htmlspecialchars($name2), $ss))){
		//		
		//	}
		//	else {
		//		echo "None";
		//	}
		

		}
		echo htmlspecialchars ( $ss );
		exit ();
		
		exit ();
		echo "<pre>";
		$file = File ( "photobase.txt" );
		foreach ( $file as $str ) {
			$exp = explode ( "|", $str );
			if (file_exists ( "template/default/images/photobase/{$exp[0]}.jpg" )) {
				$Image = "template/default/images/photobase/{$exp[0]}.jpg";
				$Text = mysql_real_escape_string ( trim ( $exp [1] ) );
				mysql_query ( "insert into `gallery` (`name`, `active`) values ('{$Text}', '1')" );
				$IdItem = mysql_insert_id ();
				mysql_query ( "insert into `gallery_img` (`iditem`, `ext`) values ('{$IdItem}', 'jpg')" );
				$idimage = mysql_insert_id ();
				$o = "files/gallery/o_{$idimage}.jpg";
				$b = "files/gallery/b_{$idimage}.jpg";
				$s = "files/gallery/s_{$idimage}.jpg";
				if (copy ( $Image, $o )) {
					$this->ResizeImage ( $o, $b, 600, 400, 100 );
					$this->ResizeImage ( $o, $s, 183, 142, 100 );
				}
			} else {
				//echo "{$exp[0]}<br/>";
			}
		}
		exit ();
	}
	function updatePages() {
		echo "<pre>";
		$txt = file_get_contents ( '1.js' );
		
		$this->text = $txt; //file_get_contents ( 'template/default/menu2/menu2.js' );
		$this->getAllLinks ();
		$this->ll ['?id=3'] = 111;
		$this->ll ['?id=1a5_1'] = 113;
		$this->ll ['?id=1a5_2'] = 114;
		$this->ll ['?id=1a5_3'] = 115;
		$this->ll ['?id=1a5_4'] = 116;
		$this->ll ['?id=1a5_5'] = 117;
		$this->ll ['?id=1a5_6'] = 118;
		$this->ll ['?id=1b5_1'] = 119;
		$this->ll ['?id=a1'] = 120;
		$this->ll ['?id=a2'] = 121;
		$this->ll ['?id=1f_4_1'] = 122;
		$this->ll ['?id=1f_4_2'] = 123;
		$this->ll ['?id=1f_4_3'] = 124;
		$this->ll ['?id=3_1'] = 125;
		$this->ll ['?id=1b1_3_0'] = 127;
		/*
		$ss = file_get_contents ( 'template/default/menu2/menu2.js' );
		$ss = str_replace("&quot;", htmlspecialchars("&quot;"),$ss);
		foreach ($this->ll as $n=>$Id){
			$ss = str_replace("\"{$n}\"", "\"/pages-{$Id}.html\"", $ss);
		}
		preg_match_all ( '/0,"(.*?)","(.*?)","",-1,-1,0,"(.*?)"/', $this->text, $all );
		
		foreach ( $all [1] as $n => $name ) {
			$name2 = stripslashes($name);
			
		//	if (($ss = str_replace($name, htmlspecialchars($name2), $ss))){
		//		
		//	}
		//	else {
		//		echo "None";
		//	}
			
		}
		echo $ss;
		exit();
		*/
		//print_r($this->ll);
		//exit();
		

		foreach ( $this->ll as $n => $Id ) {
			
			//echo "<h1> ($Id) -- {$n}</h1>";
			

			$text = mysql_real_escape_string ( trim ( $this->getText ( $n ) ) );
			mysql_query ( "update `pages` set `Text`='{$text}' where `Id`='{$Id}'" );
			
		//echo "<p>---------------------</p>";
		//exit ();
		}
		
		exit ();
	}
	function getText($link) {
		$text = file_get_contents ( 'http://silvery.ru/' . $link );
		$text = preg_replace ( "/<link(.*?)>/is", "", $text );
		$text = preg_replace ( "/<meta(.*?)>/is", "", $text );
		//$text = str_replace('<a href="price.doc">Ïğåéñêóğàíò íà óñëóãè</a>', '', $text);
		//$text = str_replace('<a href="?id=docum">Äîêóìåíòû</a><br>', '', $text);
		$tt = array ();
		$text = str_replace ( '?id=photo&img=', '', $text );
		$text = str_replace ( '?id=photo&amp;img=', '', $text );
		$text = str_replace ( "images/", "template/default/images/", $text );
		
		preg_match ( "/<!-- STARTCOPY -->(.*?)<!-- ENDCOPY -->/is", $text, $tt );
		preg_match_all ( "/href=(\"|')(.*?)(\"|')/", $tt [1], $links );
		
		if (isset ( $links [2] ) && count ( $links [2] ) > 0) {
			foreach ( $links [2] as $num => $ll ) {
				//	if (substr($ll, 0,4)!='?id'){
				//		continue;
				//	}
				$old = $ll;
				$ll = str_replace ( '?id=1d2_8', '?id=1d1_8', $ll );
				$ll = str_replace ( 'http://localhost/silvery/', '', $ll );
				$Id = $this->findByLink ( $ll );
				if ($Id != 0) {
					$tt [1] = str_replace ( $links [1] [$num] . $old . $links [3] [$num], "\"?pages={$Id}\"", $tt [1] );
				}
			}
		}
		return $tt [1];
	}
	function findByLink($link) {
		
		if (isset ( $this->ll [$link] )) {
			return $this->ll [$link];
		}
		return 0;
	}
	function getAllLinks() {
		preg_match_all ( '/0,"(.*?)","(.*?)","",-1,-1,0,"(.*?)"/', $this->text, $all );
		
		foreach ( $all [1] as $n => $name ) {
			$name = trim ( stripslashes ( $name ) );
			$Id = ( int ) $all [2] [$n];
			$this->ll [trim ( $all [3] [$n] )] = $Id;
		}
	}
	function getIdPage($name) {
		$name = addslashes ( $name );
		$sql = mysql_query ( "select `Id` from `pages` where `Title`='{$name}' limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			return mysql_result ( $sql, 0 );
		}
		return 0;
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