<?php
class articles {
	var $over = "";
	var $params = array (
			"template" => 'index' 
	);
	static $TitlePage = "Статьи";
	function __construct() {
		if (isset($_POST['ajax'])){
			Header ( "Content-type: text/html; charset=utf-8" );
			$id = isset($_POST['id'])?(int)$_POST['id']:0;
			$sql = mysql_query("select `id`, `name`, `notice` from `articles` where `active`='1' and `id`!='{$id}' order by rand() limit 1");
			if (is_resource($sql) && mysql_num_rows($sql)>0){
					
				while (($row = mysql_fetch_assoc($sql))!=false){
					$out.='
                	<img src="template/default/img/advice-pic'.(isset($_POST['up'])&&!empty($_POST['up'])?'2':'').'.png" alt="" class="advice-pic">
                    <div class="advice-ttl"><img src="template/default/img/advice-ttl'.(isset($_POST['up'])&&!empty($_POST['up'])?'2':'').'.png" alt=""></div>
                    <div class="advice-link"><a href="?articles='.$row['id'].'">'.$row['name'].'</a></div>
                    <p>'.$row['notice'].'</p>
                    <a href="#" class="advice-refresh" '.(isset($_POST['up'])&&!empty($_POST['up'])?'update="advice2"':'').' row="'.$row['id'].'"><img src="template/default/img/ico-refresh.png" alt="">Следующий совет</a>
                ';
					echo iconv('windows-1251', 'utf-8', $out);
				}
			}
			exit();
		}
		$over = "";
		$out = "";
		$id = isset ( $_GET ['articles'] ) && is_numeric ( $_GET ['articles'] ) ? ( int ) $_GET ['articles'] : 0;
		
		BreadcrumbsTitle::set ( 'Советы' );
		Breadcrumbs::add ( '<a href="?articles">Советы</a>' );
		if ($id != 0) {
			
			$sql = mysql_query ( "select * from `articles` where `id`='{$id}' and `cat_id`='0' and `active`='1' limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				// $out .= "<h2>{$row['name']}</h2>";
				if (! empty ( $row ['TitlePage'] )) {
					BreadcrumbsTitle::set ( $row ['TitlePage'] );
				} else {
					BreadcrumbsTitle::set ( $row ['name'] );
				}
				if (! empty ( $row ['DescPage'] )) {
					$_SESSION ['Titles'] ['desc'] = $row ['DescPage'];
				}
				if (! empty ( $row ['KeysPage'] )) {
					$_SESSION ['Titles'] ['keys'] = $row ['KeysPage'];
				}
				Breadcrumbs::add ( $row ['name'] );
				// $out .= '<div class="articles" style="background:none;">';
				$time = strtotime ( $row ['date'] );
				$day = date ( "d", $time );
				$year = date ( "Y", $time );
				
				$arts = array ();
				if (! empty ( $row ['arts'] )) {
					$exp = explode ( ",", $row ['arts'] );
					if (count ( $exp ) > 0) {
						foreach ( $exp as $str ) {
							$str = trim ( $str );
							if (! empty ( $str )) {
								$arts [] = "'" . mysql_real_escape_string ( $str ) . "'";
							}
						}
					}
				}
				
				if (count ( $arts ) > 0) {
					$sql = mysql_query ( "select * from `shop_items` where `art` in (" . implode ( ", ", $arts ) . ") and `cat_id`!='0'" );
					if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
						$out .= '<div class="block678">
<ul class="jcarousel-skin-tango2" id="list152">';
						while ( ($row2 = mysql_fetch_assoc ( $sql )) != false ) {
							$price = number_format ( $row2 ['price_rozn'], 0, ' ', ' ' );
							$newPrice = $row2 ['price_opt'];
							if ($newPrice > 0) {
								//$prices = '<span class="pr1">' . $price . '</span><span class="pr2"> ' . number_format ( $row2 ['price_opt'], 0, ' ', ' ' ) . ' <span>руб.</span></span>';
								$row2['price_rozn'] = number_format ( $row2 ['price_opt'], 0, ' ', ' ' );
							} 
							
							$image = $this->getItemImageShop ( $row2, 1 );
							$idImage = 0;
							$min = '';
							if ($image != false) {
								$idImage = ( int ) @$image ['id'];
								$min = $image ['min'];
								$image = '<a href="?shop='.$row2['id'].'"><img src="/thumbs/136x179/' . str_replace ( "files/shop/", "", $image ['big'] ) . '" alt=""></a>';
							} else {
								$image = '';
							}
							$out.='<li>'.$image.'
<h6><a href="?shop='.$row2['id'].'">'.$row2['name'].'</a></h6>
<p>Цена: <span><b>'.$row2['price_rozn'].'</b> руб.</span></p>
</li>';
						}
						$out .= '</ul></div>';
					}
				}
				
				self::$TitlePage = $row ['name'];
				$out .= '
                                ' . $row ['desc'] . '&nbsp;&nbsp;
                                
                          <p align="right" class="rightLink"><a href="/articles">Вернуться в раздел "Статьи"</a></p>
                                ';
			} else {
				
				$out .= "<h2>Запись не найдена</h2>";
			}
			// $out .= '</div>';
		} else {
			$dop = '';
			if(isset($_GET['page'])){
				$dop = ' - страница '.$_GET['page'];
			}
			BreadcrumbsTitle::set ( 'Информационные материалы компании Мастерков - разработка дизайна и ремонт квартир в Москве'.$dop );
			$_SESSION['Titles']['desc']='Информационные материалы компании Мастерков. Советы и обзоры специалистов, новые материалы и технологии на рынке строительства и ремонта.';
			$_SESSION['Titles']['keys']='информационные материалы компании Мастерков';
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
			
			$sql = mysql_query ( "select * from `articles` where `active`='1'  and `cat_id`='0' order by `date` desc, `pos` asc limit $start, $limit" );
			
			if (is_resource ( $sql ) && ($num = mysql_num_rows ( $sql )) > 0) {
				$tables = array (
						1 => "",
						2 => "" 
				);
				$i = 0;
				$v = 0;
				$out .= '<ul class="list1">';
				while ( ($row = mysql_fetch_assoc ( $sql )) != false ) {
					$i ++;
					$v ++;
					$class = "";
					$time = strtotime ( $row ['date'] );
					$day = date ( "d", $time );
					$year = date ( "Y", $time );
					$out .= '<li><a href="?articles=' . $row ['id'] . '">' . $row ['name'] . '</a></li>';
					if ($i == 2 or $v == $num) {
						$i = 0;
					}
				}
				$out .= '</ul>';
				
				$count = mysql_result ( mysql_query ( "select count(*) from `articles` where `active`='1'  and `cat_id`='0'" ), 0 );
				$totalPages = ceil ( $count / $limit );
				if ($totalPages > 1) {
					
					$out .= <<<HTML
				 
				    <table align="center" class="sort1">
			<tbody><tr>
				
				<td>
					   <center>{$this->pagginator($count, $limit)} </center>
				</td>
			</tr>
		</tbody></table>
				
HTML;
				}
			}
		}
		
		$this->over = $out;
	}
	function getItemImageShop($row, $mass = 0) {
		if (! empty ( $row ['photo'] ) && file_exists ( "files/shop/$row[photo]" )) {
			if ($mass == 0) {
				return "files/shop/$row[photo]";
			} else {
				return array (
						"min" => "files/shop/$row[photo]",
						"big" => "files/shop/" . str_replace ( "s", "b", $row ['photo'] ) 
				);
			}
		} else {
			$sql = mysql_query ( "select * from `shop_images` where `iditem`='$row[id]'" );
			if (mysql_num_rows ( $sql ) > 0) {
				while ( $row2 = mysql_fetch_array ( $sql ) ) {
					if (file_exists ( "files/shop/s_$row2[id].$row2[photo]" )) {
						if ($mass == 0) {
							return "files/shop/s_$row2[id].$row2[photo]";
						} else {
							return array (
									"id" => $row2 ['id'],
									"min" => "files/shop/s_$row2[id].$row2[photo]",
									"big" => "files/shop/b_$row2[id].$row2[photo]" 
							);
						}
					}
				}
			}
		}
		return false;
	}
	function pagginator($total_pages, $limit = 12) {
		$url = array (
				"articles" 
		);
		
		$adjacents = 3;
		if (isset ( $_POST ['quickSearch'] )) {
			$page = 1;
		} else {
			$page = isset ( $_GET ['page'] ) ? ( int ) $_GET ['page'] : 1;
		}
		if ($page < 1) {
			$page = 1;
		}
		
		if ($page == 0) {
			$page = 1;
		}
		$prev = $page - 1;
		$next = $page + 1;
		$lastpage = ceil ( $total_pages / $limit );
		
		$lpm1 = $lastpage - 1;
		
		$pagination = "";
		if ($lastpage > 1) {
			$pagination .= "<ul class=\"sortList2\">";
			
			if ($prev == 1) {
				$link = '?' . implode ( "&", $url ) . '';
				
				$pagination .= '<li><a href="' . $link . '"><img src="template/default/img/arr29c.gif" alt="" /></a></li>';
			} else {
				if ($prev < 1) {
					$pagination .= '<li><a href="#"><img src="template/default/img/arr29c.gif" alt="" /></a></li>';
				} else {
					$new = $url;
					if ($prev != 1) {
						$new [] = "page={$prev}";
					}
					$link = '?' . implode ( "&", $new ) . '';
					
					$pagination .= '<li><a  href="' . $link . '"><img src="template/default/img/arr29c.gif" alt="" /></a></li>';
				}
			}
			
			if ($lastpage < 7 + ($adjacents * 2)) {
				for($counter = 1; $counter <= $lastpage; $counter ++) {
					if ($counter == $page) {
						$pagination .= "<li class=\"curr1\"><span>{$counter}</span></li>";
					} else {
						$new = $url;
						if ($counter != 1) {
							$new [] = "page={$counter}";
						}
						$link = "?" . implode ( "&", $new );
						
						$pagination .= "<li><a class=\"lister\" href=\"" . $link . "\">$counter</a></li>";
					}
				}
			} elseif ($lastpage > 5 + ($adjacents * 2)) {
				// close to beginning; only hide later pages
				if ($page < 1 + ($adjacents * 2)) {
					for($counter = 1; $counter < 4 + ($adjacents * 2); $counter ++) {
						if ($counter == $page) {
							$pagination .= "<li><span>$counter</span></li>";
						} else {
							$new = $url;
							if ($counter != 1) {
								$new [] = "page={$counter}";
							}
							$link = "?" . implode ( "&", $new );
							
							$pagination .= "<li><a class=\"lister\" href=\"" . $link . "\">$counter</a></li>";
						}
					}
				} elseif ($lastpage - ($adjacents * 2) > $page && $page > ($adjacents * 2)) {
					
					for($counter = $page - $adjacents; $counter <= $page + $adjacents; $counter ++) {
						if ($counter == $page) {
							$pagination .= "<li><span class=\"current\">$counter</span></li>";
						} else {
							$new = $url;
							if ($counter != 1) {
								$new [] = "page={$counter}";
							}
							$link = "?" . implode ( "&", $new );
							
							$pagination .= "<li><a  class=\"lister\" href=\"" . $link . "\">$counter</a></li>";
						}
					}
				} else {
					
					for($counter = $lastpage - (2 + ($adjacents * 2)); $counter <= $lastpage; $counter ++) {
						if ($counter == $page) {
							$pagination .= "<li><span class=\"current\">$counter</span></li>";
						} else {
							$new = $url;
							if ($counter != 1) {
								$new [] = "page={$counter}";
							}
							$link = "?" . implode ( "&", $new );
							if (self::$Search == true) {
								$new = array (
										"page" => $counter,
										"category" => isset ( $_GET ['category'] ) ? $_GET ['category'] : '',
										"price" => isset ( $_GET ['price'] ) ? $_GET ['price'] : '' 
								);
								$link = '/shop-search.html?' . http_build_query ( $new );
							}
							$pagination .= "<li><a class=\"lister\" href=\"" . $link . "\">$counter</a></li>";
						}
					}
				}
			}
			
			// next button
			if ($page < $counter - 1) {
				$new = $url;
				$new [] = "page={$next}";
				$link = "?" . implode ( "&", $new );
				
				$pagination .= "<li><a href=\"" . $link . "\"><img src=\"template/default/img/arr29d.gif\" alt=\"\" /></a></li>";
			} else {
				$pagination .= "<li><a href=\"#\"><img src=\"template/default/img/arr29d.gif\" alt=\"\" /></a></li>";
			}
			$pagination .= "</ul>";
		}
		return $pagination;
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
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не заполненны обязательные поля</b></div>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не правильно заполнено поле EMail</b></div>";
			} elseif (! empty ( $File ) && ! in_array ( $FileExt, array (
					"jpeg",
					"jpg",
					"gif",
					"png" 
			) )) {
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
				// mail ( $this->getEmail (), " с сайта " . $_SERVER
				// ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
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
		$sql = mysql_query ( "select * from `articles_img` where `iditem`='$id' order by `osn` desc, `pos` asc limit 1" );
		if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_array ( $sql, MYSQL_ASSOC );
			
			return array (
					"min" => "s_{$row['id']}.{$row['ext']}",
					"big" => "b_{$row['id']}.{$row['ext']}",
					"orig" => "o_{$row['id']}.{$row['ext']}" 
			);
		}
		return array (
				"min" => "nofoto_s.jpg",
				"big" => 'nofoto_s.jpg' 
		);
	}
}
class articles_admin extends glb {
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
		mysql_query ( "update articles set pos='$pos', active='$Active' where id='$_POST[id]'" );
		echo "33";
	}
	function UpdateImagePos() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		$pos = isset ( $_POST ['pos'] ) ? ( int ) $_POST ['pos'] : 0;
		mysql_query ( "update `articles_img` set `pos`='{$pos}' where `id`='{$id}' limit 1" );
		echo "33";
	}
	function UploadPhoto() {
		if (isset ( $_POST ['id'] ) && ! empty ( $_POST ['id'] )) {
			mysql_query ( "insert into `articles_img` values ('', '$_POST[id]','', '', '0')" );
			$id = mysql_insert_id ();
			$uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "/files/articles/";
			$p = pathinfo ( basename ( $_FILES ['photo-path'] ['name'] ) );
			if (isset ( $p ['extension'] )) {
				$ext = strtolower ( $p ['extension'] );
				
				if (in_array ( $ext, array (
						"jpg",
						"jpeg",
						"png",
						"gif" 
				) )) {
					$uploadfile1 = $uploaddir . "b_$id.$ext";
					$uploadfile2 = $uploaddir . "s_$id.$ext";
					$uploadfile3 = $uploaddir . "o_$id.$ext";
					if (move_uploaded_file ( $_FILES ['photo-path'] ['tmp_name'], $uploadfile3 )) {
						
						$this->ResizeImage ( $uploadfile3, $uploadfile1, 600, 400 );
						if (copy ( $uploadfile1, $uploadfile2 )) {
							$this->ResizeImage ( $uploadfile2, $uploadfile2, 205, 142 );
						}
						
						mysql_query ( "update `articles_img` set `ext`='$ext' where `id`='$id' limit 1" );
					} else {
						mysql_query ( "delete from `articles_img` where `id`='$id' limit 1" );
						echo "{failure:true}";
						exit ();
					}
				} else {
					mysql_query ( "delete from `articles_img` where `id`='$id' limit 1" );
					echo "{failure:true}";
					exit ();
				}
			} else {
				mysql_query ( "delete from `articles_img` where `id`='$id' limit 1" );
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
		$sql = mysql_query ( "SHOW COLUMNS FROM `articles`" );
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
		$notallow = array (
				"id",
				"module",
				"task",
				"xaction",
				"ext-c",
				"cat_id" 
		);
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
		// mail("sun-go-down@yandex.ru", "Test", $this->A2Up($fields, $values));
		mysql_query ( "update `articles` set {$this->A2Up($fields, $values)} where `id`='$id'" ) or die ( "{failure:true, error:'" . addslashes ( mysql_error () ) . "'}" );
		echo "{success:true}";
	}
	function Listing() {
		$orderBy = 'order by ';
		if (isset ( $_POST ['dir'] ) && isset ( $_POST ['sort'] )) {
			$orderBy .= "`{$_POST['sort']}` {$_POST['dir']}";
		} else {
			$orderBy .= '`pos` asc';
		}
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM `articles` {$orderBy}";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count ) or die ( "kjdfsk" );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql ) or die ( "HELLO" );
		$arr = array ();
		$arr2 = array ();
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs, MYSQL_ASSOC ) ) {
				$record = $obj;
				$record ['link'] = "?articles=$obj[id]";
				$arr [] = $this->winDecode ( $record );
			}
			$jsonresult = $this->JEncode ( $arr );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
	function deleteItem() {
		$sql = mysql_query ( "select * from `articles_img` where `iditem`='$_POST[id]'" );
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/articles/";
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
			mysql_query ( "delete from `articles_img` where `id`='$row[id]' limit 1" );
		}
		mysql_query ( "delete from `articles` where `id`='$_POST[id]'" );
		echo "33";
	}
	function deleteImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select * from `articles_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		$dir = $_SERVER ['DOCUMENT_ROOT'] . "/files/articles/";
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
		mysql_query ( "delete from `articles_img` where `id`='$row[id]' limit 1" );
		echo "33";
	}
	function setOsnImage() {
		$id = ( int ) $_POST ['id'];
		$sql = mysql_query ( "select `id`,`iditem` from `articles_img` where `id`='$id' limit 1" );
		$row = mysql_fetch_array ( $sql );
		mysql_query ( "update `articles_img` set `osn`='0' where `iditem`='$row[iditem]'" );
		mysql_query ( "update `articles_img` set `osn`='1' where `id`='$row[id]'" );
	}
	function Listing_Images() {
		$id = ( int ) $_POST ['dd'];
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM `articles_img` where `iditem`='$id'";
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
		mysql_query ( "insert into `articles` (`id`, `active`) value ('', '0')" );
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

?>
