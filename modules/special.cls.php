<?php
class special {
	var $over = "";
	var $params = array ("template" => 'index' );
	static $TitlePage = "���������������";
	var $nowYear = null;
	var $allYears = array ();
	function __construct() {
		$over = "";
		$out = "";
		$this->nowYear =$this->getLastYear();
		
		$id = isset ( $_GET ['special'] ) && is_numeric ( $_GET ['special'] ) ? ( int ) $_GET ['special'] : 0;
		if (isset ( $_GET ['year'] )) {
			$this->nowYear = ( int ) $_GET ['year'];
		}
		
		if ($id != 0) {
			$_SESSION ['Titles'] ['title'] .= ' / ���������������';
		$_SESSION ['Road'] .= "<a href='?special'>���������������</a>";
			$sql = mysql_query ( "select * from `articles` where `id`='{$id}' and `active`='1' limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				//$out .= "<h2>{$row['name']}</h2>";
				$_SESSION ['Road'] .= " / {$row['name']}";
				$_SESSION ['Titles'] ['title'] .= ' / ' . $row ['name'];
				//$out .= '<div class="articles" style="background:none;">';
				$time = strtotime ( $row ['date'] );
				$day = date ( "d", $time );
				$year = date ( "Y", $time );
				$time = strtotime ( $row ['date'] );
				$out .= '<table class="newslist padd29 margin29">';
				$img = '&nbsp;';
				if (($image = $this->getItemImage ( $row ['id'] )) != false) {
					$img = '<div><img src="image.php?width=145&height=96&image=files/articles/' . $image ['orig'] . '" width="145" height="96" alt="" /></div>';
				}
				self::$TitlePage = $row['name'];
				$out .= '<tr>
						<td>' . $img . '
						' . $row ['desc'] . '</td>
					</tr>';
				
				$out .= '</table><p align="right" style="padding-right:29px;"><a href="?special">��������� � ������ "���������������"</a></p>';
			
			} else {
				
				$out .= "<h2>������ �� �������</h2>";
			}
		
		} else {
		$_SESSION ['Titles'] ['title'] .= ' / ���������������';
		$_SESSION ['Road'] .= "���������������";
			$limit = 10;
			$nowPage = isset ( $_GET ['page'] ) ? ( int ) $_GET ['page'] : 1;
			if ($nowPage < 1) {
				$nowPage = 1;
			}
			$page = $nowPage - 1;
			if ($page < 0) {
				$page = 0;
			}
			$start = abs ( $limit * $page );
			$now = mysql_real_escape_string ( $this->nowYear );
			
			
			
			
			$sql = mysql_query ( "select * from `articles` where `active`='1' order by `pos` asc limit $start, $limit" );
			
			
		
			if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
				$tables = array (1 => "", 2 => "" );
				$i = 0;
				$v = 0;
				$out .= '<table class="newslist padd29">';
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$i ++;
					$cls = '';
					if ($i == 1) {
						$cls = 'first';
					}
					$time = strtotime ( $row ['date'] );
					$img = '&nbsp;';
					if (($image = $this->getItemImage ( $row ['id'] )) != false) {
						$img = '<div><img src="image.php?width=145&height=96&image=files/articles/' . $image ['orig'] . '" width="145" height="96" alt="" /></div>';
					}
					$out .= '<tr>
						<td>' . $img . '<h4><a href="?special=' . $row ['id'] . '">' . $row ['name'] . '</a></h4>
						<p>' . trim ( strip_tags ( $row ['notice'] ) ) . '</p></td>
					</tr>';
				}
				
				$out .= '</table>';
				
				$count = mysql_result ( mysql_query ( "select count(*) from `articles` where `active`='1'" ), 0 );
				$totalPages = ceil ( $count / $limit );
				if ($totalPages > 1) {
					
					$out .= '<p align="center"><strong>��������</strong>&nbsp;';
					for($i = 1; $i <= $totalPages; $i ++) {
						if ($i == $nowPage) {
							$out .= '<strong>' . $i . '</strong>&nbsp;&nbsp;';
						} else {
							
							$out .= '<a href="?special&page=' . $i . '">' . $i . '</a>&nbsp;&nbsp;';
						
						}
					}
					$out .= "</p>";
				
				}
			} else {
				$out .= "<p align='center'>��� �� ������ ���������������</p>";
			}
		}
		
		$this->over = $out;
	}
	function getLastYear() {
		$sql = mysql_query ( "select YEAR(`date`) from `articles` group by YEAR(`date`) order by YEAR(`date`) desc limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			return mysql_result ( $sql, 0 );
		}
		return date ( 'Y' );
	}
	function getYears() {
		$out = '';
		$sql = mysql_query ( "select YEAR(`date`) from `articles` group by YEAR(`date`) order by YEAR(`date`) desc limit 3" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			//$out .= '<ul>';
			$year = array();
			while ( ($row = mysql_fetch_array ( $sql, MYSQL_NUM )) ) {
				if ($this->nowYear==$row[0]){
					$year[] = "<strong style=\"font-weight:bold;\">{$row[0]}</strong>";
				}
				else {
					$year[] = "<a href='?special&year={$row[0]}'>{$row[0]}</a>";
				}
			}
			$out.=implode("&nbsp;|&nbsp;", $year);
			//$out .= '</ul>';
		}
		return $out;
	}
	function getMonth($time) {
		$Month = "";
		switch (date ( "m", $time )) {
			case "01" :
				$Month = "������";
				break;
			case "02" :
				$Month = "�������";
				break;
			case "03" :
				$Month = "�����";
				break;
			case "04" :
				$Month = "������";
				break;
			case "05" :
				$Month = "���";
				break;
			case "06" :
				$Month = "����";
				break;
			case "07" :
				$Month = "����";
				break;
			case "08" :
				$Month = "�������";
				break;
			case "09" :
				$Month = "��������";
				break;
			case "10" :
				$Month = "�������";
				break;
			case "11" :
				$Month = "������";
				break;
			case "12" :
				$Month = "�������";
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
		$module = 'articles';
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
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>�� ���������� ������������ ����</b></div>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>�� ��������� ��������� ���� EMail</b></div>";
			} elseif (! empty ( $File ) && ! in_array ( $FileExt, array ("jpeg", "jpg", "gif", "png" ) )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>�� ������ ������ �����... ����������� ������ ����� ������ JPEG, PNG ��� GIF</b></div>";
			} elseif (! empty ( $File ) && $FileSize > 150) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>���� ������� �������, ���� �� ������ ��������� 150Kb</b></div>";
			} else {
				
				$msg = "
				�������� ����� ����������� � ������ <a href='http://" . getenv ( "HTTP_HOST" ) . "/{$module}-{$itemID}.html'>http://" . getenv ( "HTTP_HOST" ) . "/{$module}-{$itemID}.html</a>
				<br/><br/>
				<b>���:</b>$name<br/><b>Email:</b>$email<br/><b>�����:</b>$answer<br/>";
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
				$send->EmailHTML ( $this->getEmailAdmin (), "�������� ����� ����������� �� ����� " . $_SERVER ['HTTP_HOST'], $msg );
				//mail ( $this->getEmail (), " � ����� " . $_SERVER ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
				$name = "";
				$email = "";
				$_SESSION ['MessageBlock'] = true;
				
				$answer = "";
				
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>��� ����������� ������� ��������!<br/> ������� �� ����������� ������� � ������ �������!</b></div>";
			}
		}
		
		$out = '
		 
		<div id="footer_recipe_comments">
	   <div class="header">����������� �������������</div>';
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
                    <h3>' . $row ['name'] . ' �����:</h3>
                    ' . $row ['message'] . '</div>
            ';
			}
		} else {
			$out .= '<div class="footer_comments_box">��� �� ������ �����������</div>';
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
        	<div class="header">�������� �����������</div>
            <center>' . $error . '</center>
            <input type="hidden" name="submitReview" value="true"/>
            <div class="footer_form_text">���� ���</div>
            <div class="footer_form_input">
            	<div id="comments_input"><input type="text" name="name" value="' . htmlspecialchars ( $name ) . '" /></div>
            </div>
            
            <div class="footer_form_text">��� email</div>
            <div class="footer_form_input">
            	<div id="comments_input"><input type="text" name="email" value="' . htmlspecialchars ( $email ) . '" /></div>
            </div>
            <div class="footer_form_text">������</div>
            <div class="footer_form_input" >
            
            	<input type="file" name="file" id="FileSelect2"/>
            </div>
            <div class="footer_form_text">���������</div>
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
		return preg_match ( "/[a-zA-Z0-9�-��-�]/is", $str );
	}
	function no($str) {
		$str = str_replace ( "{", "", $str );
		$str = str_replace ( "}", "", $str );
		return trim ( strip_tags ( ($str) ) );
	}
	function getItemImage($id) {
		$sql = mysql_query ( "select * from `articles_img` where `iditem`='$id' order by `osn` desc limit 1" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			$this->imgId = $row ['id'];
			return array ("min" => "s_{$row['id']}.{$row['ext']}", "id" => $row ['id'], "big" => "b_{$row['id']}.{$row['ext']}", "orig" => "o_{$row['id']}.{$row['ext']}" );
		}
		return false;
		return array ("min" => "nofoto_s.jpg", "big" => 'nofoto_s.jpg', "id" => 0 );
	}
}