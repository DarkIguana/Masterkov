<?php 
class photos {
	var $over = "";
	//var $params = array ("template" => 'gallery' );
	static $TitlePage = "Наши показы";
	function __construct() {
		$over = "";
		$out = "";
		$id = isset ( $_GET ['photos'] ) && is_numeric ( $_GET ['photos'] ) ? ( int ) $_GET ['photos'] : 0;
		
	//$_SESSION ['Titles'] ['title'] .= ' / Наши показы';
		//$_SESSION ['Road'] .= "<a href='?photos'>Наши показы</a>";
		Breadcrumbs::add('<a href="?photos">Наши показы</a>');
		BreadcrumbsTitle::add('Наши показы');
		if ($id == 0) {
			$sql = mysql_query ( "select * from `gallery` where `active`='1' and `pos`='0' order by `date` desc, `pos` asc " );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$sql2 = mysql_query ( "select * from `gallery_img` where `iditem`='{$row['id']}' limit 4" );
					if (is_resource ( $sql2 ) && mysql_num_rows ( $sql2 ) > 0) {
						$out .= '<div class="subGallery">';
						$out .= '<h3>' . $row ['name'] . '</h3><ul class="gallery">';
						while ( ($img = mysql_fetch_assoc ( $sql2 )) != false ) {
							$image = array ("orig" => "o_{$img['id']}.{$img['ext']}", "min" => "s_{$img['id']}.{$img['ext']}" );
							$out .= '<li><a href="files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	fadeInOut: true,
	wrapperClassName: \'wide-border\',
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" class="img_gall" src="image.php?width=140&height=140&image=files/gallery/' . $image ['orig'] . '" width="140" height="140" /></a></li>';
						}
						$out .= '</ul><div class="clear"></div><p align="right" class="padd_r"><a href="?photos=' . $row ['id'] . '">Посмотреть все</a></p></div>';
					}
				}
			}
		} else {
			$sql = mysql_query ( "select * from `gallery` where `active`='1' and `id`='{$id}' order by `date` desc, `pos` asc " );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$sql2 = mysql_query ( "select * from `gallery_img` where `iditem`='{$row['id']}' " );
					if (is_resource ( $sql2 ) && mysql_num_rows ( $sql2 ) > 0) {
						self::$TitlePage = $row ['name'];
						Breadcrumbs::add($row['name']);
						BreadcrumbsTitle::add($row['name']);
						//$_SESSION ['Titles'] ['title'] .= ' / ' . $row ['name'];
						//$_SESSION ['Road'] .= " / {$row['name']}";
						$out .= '<div class="subGallery">';
						$out .= '<ul class="gallery">';
						while ( ($img = mysql_fetch_assoc ( $sql2 )) != false ) {
							$image = array ("orig" => "o_{$img['id']}.{$img['ext']}", "min" => "s_{$img['id']}.{$img['ext']}" );
							$out .= '<li><a href="files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	fadeInOut: true,
	wrapperClassName: \'wide-border\',
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" class="img_gall" src="image.php?width=140&height=140&image=files/gallery/' . $image ['orig'] . '" width="140" height="140" /></a></li>';
						}
						$out .= '</ul><div class="clear"></div><p align="right" class="padd_r"><a href="?photos">Вернутся в раздел "Наши показы"</a></p></div>';
					}
				}
			}
		}
		/*
		$limit = 12;
		$nowPage = isset ( $_GET ['page'] ) ? ( int ) $_GET ['page'] : 1;
		if ($nowPage < 1) {
			$nowPage = 1;
		}
		$page = $nowPage - 1;
		if ($page < 0) {
			$page = 0;
		}
		$start = abs ( $limit * $page );
		
		$sql = mysql_query ( "select * from `gallery` where `active`='1' order by `date` desc, `pos` asc limit $start, $limit" );
		
		if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
			$out .= '<table>';
			$i = 0;
			$v = 0;
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$i ++;
				$v ++;
				$class = "";
				if ($i == 1) {
					$out .= "<tr>";
				}
				$image = $this->getItemImage ( $row ['id'] );
				
				$out .= '<td width="150"><a href="files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	fadeInOut: true,
	wrapperClassName: \'wide-border\',
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" style="border:7px solid  #f2f2f2" src="files/gallery/' . $image ['min'] . '" width="140" height="140" />
					</a>
					</td>';
				if ($i < 3) {
					$out .= '<td width="30">&nbsp;</td>';
				}
				
				if ($i == 3 or $v == $num) {
					$i = 0;
					$out .= "</tr><tr><td colspan='10' height='25'>&nbsp;</td></tr>";
				}
			}
			$out .= '</table>';
		}
		*/
		$this->over = $out;
	}
	function getImages($id) {
		$out = "";
		$sql = mysql_query ( "select * from `gallery_img` where `iditem`='{$id}' order by `pos` asc" );
		if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
			$out .= '<table>';
			$i = 0;
			$v = 0;
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$i ++;
				$v ++;
				$class = "";
				if ($i == 1) {
					$out .= "<tr>";
				}
				$image = array ("min" => "s_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
				
				$out .= '<td width="150"><a href="files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	fadeInOut: true,
	wrapperClassName: \'wide-border\',
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" class="img_gall" src="files/gallery/' . $image ['min'] . '" width="100" />
					</a>
					</td>';
				if ($i < 3) {
					$out .= '<td width="30">&nbsp;</td>';
				}
				
				if ($i == 3 or $v == $num) {
					$i = 0;
					$out .= "</tr><tr><td colspan='10' height='25'>&nbsp;</td></tr>";
				}
			}
			$out .= '</table>';
		}
		
		return $out;
	}
	function getMonth($time) {
		$Month = "";
		switch (date ( "m", $time )) {
			case "01" :
				$Month = "Января";
				break;
			case "02" :
				$Month = "Февраля";
				break;
			case "03" :
				$Month = "Марта";
				break;
			case "04" :
				$Month = "Апреля";
				break;
			case "05" :
				$Month = "Мая";
				break;
			case "06" :
				$Month = "Июня";
				break;
			case "07" :
				$Month = "Июля";
				break;
			case "08" :
				$Month = "Августа";
				break;
			case "09" :
				$Month = "Сентября";
				break;
			case "10" :
				$Month = "Октября";
				break;
			case "11" :
				$Month = "Ноября";
				break;
			case "12" :
				$Month = "Декабря";
				break;
		}
		return $Month;
	}
	function getComments($itemID) {
		
		if (count ( $_POST ) > 0 && isset ( $_SESSION ['MessageBlock'] )) {
			unset ( $_POST );
		} elseif (count ( $_POST ) == 0 && isset ( $_SESSION ['MessageBlock'] )) {
			unset ( $_SESSION ['MessageBlock'] );
		}
		$module = 'gallery';
		$values = array ();
		$values ['name'] = isset ( $_POST ['name'] ) ? $this->no ( $_POST ['name'] ) : '';
		$values ['code'] = isset ( $_POST ['code'] ) ? $this->no ( $_POST ['code'] ) : '';
		$values ['email'] = isset ( $_POST ['email'] ) ? $this->no ( $_POST ['email'] ) : '';
		
		$values ['answer'] = isset ( $_POST ['answer'] ) ? $this->no ( $_POST ['answer'] ) : '';
		extract ( $values );
		$error = "";
		if (isset ( $_POST ['submitReview'] )) {
			$File = isset ( $_FILES ['file'] ) && isset ( $_FILES ['file'] ['name'] ) && ! empty ( $_FILES ['file'] ['name'] ) ? trim ( $_FILES ['file'] ['name'] ) : '';
			$FileExt = ! empty ( $File ) ? trim ( strtolower ( pathinfo ( $File, PATHINFO_EXTENSION ) ) ) : null;
			$FileSize = ! empty ( $File ) ? ( int ) $_FILES ['file'] ['size'] / 1024 : 99999999999;
			if (! $this->test ( $name ) or ! $this->test ( $email ) or ! $this->test ( $answer )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не заполненны обязательные поля</b></div>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не правильно заполнено поле EMail</b></div>";
			} elseif (! empty ( $File ) && ! in_array ( $FileExt, array ("jpeg", "jpg", "gif", "png" ) )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не верный формат файла... изображение должно иметь формат JPEG, PNG или GIF</b></div>";
			} elseif (! empty ( $File ) && $FileSize > 150) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Файл слишком большой, файл не должен превышать 150Kb</b></div>";
			} else {
				
				$msg = "
				Добавлен новый комментарий в раздел <a href='http://" . getenv ( "HTTP_HOST" ) . "/{$module}-{$itemID}.html'>http://" . getenv ( "HTTP_HOST" ) . "/{$module}-{$itemID}.html</a>
				<br/><br/>
				<b>Имя:</b>$name<br/><b>Email:</b>$email<br/><b>Отзыв:</b>$answer<br/>";
				$name = addslashes ( $name );
				$email = addslashes ( $email );
				$answer = addslashes ( $answer );
				$page = addslashes ( $_SERVER ['REQUEST_URI'] );
				$ip = addslashes ( $_SERVER ['REMOTE_ADDR'] );
				$time = time ();
				mysql_query ( "insert into `comments` (`name`, `email`, `message`, `ip`, `page`, `active`, `date`, `module`, `item`) value ('$name', '$email',  '$answer', '$ip', '$page', '1', '$time', '$module', '$itemID')" );
				$Id = mysql_insert_id ();
				if (! empty ( $File )) {
					$FileName = "{$Id}.{$FileExt}";
					if (move_uploaded_file ( $_FILES ['file'] ['tmp_name'], "files/users/{$FileName}" )) {
						$this->ResizeImage ( "files/users/{$FileName}", "files/users/{$FileName}", 56, 56, 100 );
						mysql_query ( "update `comments` set `avatar`='{$FileName}' where `id`='{$Id}'" );
					}
				
				}
				$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
				$send = new Email ();
				$send->setFrom ( "robot@" . preg_replace ( "/www./is", "", getenv ( "HTTP_HOST" ) ) );
				$send->EmailHTML ( $this->getEmailAdmin (), "Добавлен новый комментарий на сайте " . $_SERVER ['HTTP_HOST'], $msg );
				//mail ( $this->getEmail (), " с сайта " . $_SERVER ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
				$name = "";
				$email = "";
				$_SESSION ['MessageBlock'] = true;
				
				$answer = "";
				
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Ваш комментарий успешно добавлен!<br/> Спасибо за проявленный интерес к нашему проекту!</b></div>";
			}
		}
		
		$out = '
		 
		<div id="footer_recipe_comments">
	   <div class="header">Комментарии пользователей</div>';
		$sql = mysql_query ( "select * from `comments` where `module`='{$module}' and `item`='{$itemID}'  and `active`='1' order by `date` asc" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
				$Image = '<img src="template/default/images/comment_face.gif" alt="comment img" />';
				if (! empty ( $row ['avatar'] ) && file_exists ( "files/users/{$row['avatar']}" )) {
					$Image = '<img src="files/users/' . $row ['avatar'] . '" alt="comment img" />';
				} else {
					$Image = '<img src="template/default/images/comment_face.gif" alt="comment img" />';
				}
				
				$out .= ' <div class="footer_comments_box">
                   ' . $Image . '
                    <h3>' . $row ['name'] . ' пишет:</h3>
                    ' . $row ['message'] . '</div>
            ';
			}
		} else {
			$out .= '<div class="footer_comments_box">Нет ни одного комментария</div>';
		}
		
		$out .= '</div>';
		
		$out .= '
		<script>
		$(document).ready(function(){
		   $("#FileSelect2").filestyle({ 
    image: "/template/default/images/file_input.png",
    imageheight : 20,
    imagewidth : 20,
    width : 250
});
	    });
		</script>
		<a name="addComment"></a>
		<div id="footer_form">
		<form method="POST" enctype="multipart/form-data" action="#addComment" name="commentsForm" id="commentsForm">
        	<div class="header">Оставить комментарий</div>
            <center>' . $error . '</center>
            <input type="hidden" name="submitReview" value="true"/>
            <div class="footer_form_text">Ваше имя</div>
            <div class="footer_form_input">
            	<div id="comments_input"><input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" /></div>
            </div>
            
            <div class="footer_form_text">Ваш email</div>
            <div class="footer_form_input">
            	<div id="comments_input"><input type="text" name="email" value="' . htmlspecialchars ( $email ) . '" /></div>
            </div>
            <div class="footer_form_text">Аватар</div>
            <div class="footer_form_input" >
            
            	<input type="file" name="file" id="FileSelect2"/>
            </div>
            <div class="footer_form_text">Сообщение</div>
            <div class="footer_form_textarea">
            	<div id="comments_input"><textarea name="answer">' . $answer . '</textarea></div>
            </div>
            
           
            
            <div class="footer_form_button"><a href="#" onclick="commentsForm.submit(); return false;"><img src="template/default/images/comment_send.png" /></a></div>
            </form>
        </div>
        
        ';
		return $out;
	}
	function getEmailAdmin() {
		$sql = mysql_query ( "select * from `site_setting` where `option`='admin_email'" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
		return "";
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
	function test($str) {
		return preg_match ( "/[a-zA-Z0-9А-Яа-я]/is", $str );
	}
	function no($str) {
		$str = str_replace ( "{", "", $str );
		$str = str_replace ( "}", "", $str );
		return trim ( strip_tags ( ($str) ) );
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `gallery_img` where `iditem`='$id' order by `osn` desc, `pos` asc limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			
			return array ("min" => "s_{$row['id']}.{$row['ext']}", "big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return array ("min" => "nofoto_s.jpg", "big" => 'nofoto_s.jpg' );
	}
}