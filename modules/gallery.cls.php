<?php

class gallery {

    var $over = "";
    // var $params = array ("template" => 'gallery' );
    static $TitlePage = "";

    function __construct() {
        $over = "";
        $out = "";
        $id = isset($_GET ['gallery']) && is_numeric($_GET ['gallery']) ? (int) $_GET ['gallery'] : 0;

        //BreadcrumbsTitle::add ( 'Портфолио' );
        Breadcrumbs::add("<a href='?gallery'>Портфолио</a>");
        $out .= '<div class="galleryBlock">';
        if ($id != 0) {
            $out .= '<script src="/template/default/js/photos.js" type="text/javascript"></script>';

            $sql = mysql_query("select * from `gallery` where `active`='1' and `id`='{$id}' order by  `pos` asc ");
            if (is_resource($sql) && mysql_num_rows($sql) > 0) {
                $desc = '';
                while (($row = mysql_fetch_assoc($sql)) != false) {
                    BreadcrumbsTitle::set($row ['name']);
                    if (!empty($row['TitlePage']))
                        BreadcrumbsTitle::set($row ['TitlePage']);

                    $_SESSION['Titles']['desc'] = $row['DescPage'];
                    $_SESSION['Titles']['keys'] = $row['KeysPage'];
                    Breadcrumbs::add("<a href='?gallery={$row['id']}'>{$row['name']}</a>");

                    self::$TitlePage = $row ['name'];
                    $desc = $row ['desc'];
                    $sql2 = mysql_query("select * from `gallery_img` where `iditem`='{$row['id']}'  and `itog`=0 order by `osn` desc, `pos` asc");
                    if (is_resource($sql2) && ($num = mysql_num_rows($sql2)) > 0) {
                        $out .= '<p class="h6">Дизайн проект</p>';
                        $out .= '<ul>';
                        $i = 0;
                        $v = 0;
                        while (($img = mysql_fetch_assoc($sql2)) != false) {
                            $image = array(
                                "orig" => "o_{$img['id']}.{$img['ext']}",
                                "big" => "b_{$img['id']}.{$img['ext']}",
                                "min" => "s_{$img['id']}.{$img['ext']}"
                            );
                            $i ++;
                            $v ++;
                            $dop = '';
                            if ($i == 4) {
                                $dop = ' class="noM"';
                            }
                            $out .= '<li' . $dop . '><a href="/files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, galleryOptions)">
					<img border="0"  src="/thumbs/crop/220x162//files/gallery/' . $image ['orig'] . '"  /></a></li>';
                            if ($i == 4 or $v == $num) {
                                $i = 0;
                            }
                        }
                        $out .= '</ul>';
                        if ($v > 4) {
                            $out .= '<p class="morePhotos"><a href="#">Еще эскизы&hellip;</a></p><p class="lessPhotos"><a href="#">Свернуть эскизы&hellip;</a></p>';
                        }
                    }



                    self::$TitlePage = $row ['name'];
                    $desc = $row ['desc'];
                    $sql2 = mysql_query("select * from `gallery_img` where `iditem`='{$row['id']}' and `itog`=1 order by `osn` desc, `pos` asc");
                    if (is_resource($sql2) && ($num = mysql_num_rows($sql2)) > 0) {
                        $i = 0;
                        $v = 0;
                        $out .= '<p class="h6">Фото</p>';
                        $out .= '<ul>';
                        while (($img = mysql_fetch_assoc($sql2)) != false) {
                            $image = array(
                                "orig" => "o_{$img['id']}.{$img['ext']}",
                                "big" => "b_{$img['id']}.{$img['ext']}",
                                "min" => "s_{$img['id']}.{$img['ext']}"
                            );
                            $i ++;
                            $v ++;
                            $dop = '';
                            if ($i == 4) {
                                $dop = ' class="noM"';
                            }
                            $out .= '<li' . $dop . '><a href="/files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, galleryOptions)">
					<img border="0"  src="/thumbs/crop/220x162//files/gallery/' . $image ['orig'] . '"  /></a></li>';
                            if ($i == 4 or $v == $num) {
                                $i = 0;
                            }
                        }
                        $out .= '</ul>';
                        if ($v > 4) {
                            $out .= '<p class="morePhotos"><a href="#">Еще фотографии&hellip;</a></p><p class="lessPhotos"><a href="#">Свернуть фотографии&hellip;</a></p>';
                        }
                    }
                }

                $out .= '<div class="dslBlock">' . $desc . '</div>';
            }
        } else {
            self::$TitlePage = 'Портфолио';
            BreadcrumbsTitle::set('Лучшие дизайн проекты квартир от компании Мастерков');
            $_SESSION['Titles']['desc'] = 'Примеры лучших дизайн проектов квартир от компании Мастерков за 2015-2016 год. Разработка проекта и ремонт квартир под ключ от недорогих до элитных, фото дизайна квартиры, комнаты, планировка квартиры.';
            $_SESSION['Titles']['keys'] = 'лучшие дизайн проекты квартир, лучшие дизайн проекты квартир 2016';

            $out .= '<script src="/template/default/js/photos.js" type="text/javascript"></script>';
            $diz = '';

            $sql = mysql_query("select * from `gallery` where `active`='1' and (select count(1) from `gallery_img` where `iditem`=`gallery`.`id`)>0  order by  `pos` asc ");
            if (is_resource($sql) && ($diz = mysql_num_rows($sql)) > 0) {

                while (($row = mysql_fetch_assoc($sql)) != false) {

                    $sql2 = mysql_query("select * from `gallery_img` where `iditem`='{$row['id']}'   order by `osn` desc, `pos` asc  limit 4");
                    if (is_resource($sql2) && ($num = mysql_num_rows($sql2)) > 0) {
                        $out .= '<h2 class="h6">' . $row ['name'] . ' </h2>';
                        $out .= '<ul>';
                        $i = 0;

                        while (($img = mysql_fetch_assoc($sql2)) != false) {
                            $image = array(
                                "orig" => "o_{$img['id']}.{$img['ext']}",
                                "big" => "b_{$img['id']}.{$img['ext']}",
                                "min" => "s_{$img['id']}.{$img['ext']}"
                            );
                            $i ++;
                            $dop = '';
                            if ($i == 4) {
                                $dop = ' class="noM"';
                            }
                            $out .= '<li' . $dop . '><a href="/gallery/' . $row ['id'] . '">
					<img border="0"  src="/thumbs/crop/220x162//files/gallery/' . $image ['orig'] . '"  /></a></li>';
                        }
                        $out .= '</ul>';
                        $out .= '<div class="clear:both"></div>';
                        $out .= '<p align="right"><a style="font-size:14px;" href="/gallery/' . $row ['id'] . '">подробнее</a></p>';
                    }
                }

                // if ($diz >= 4) {
                // $out .= '<p class="morePhotos"><a href="#">Еще фотографии&hellip;</a></p><p class="lessPhotos"><a href="#">Менее фотографий&hellip;</a></p>';
                // }
            }

            /*
             * $out.='<script src="/template/default/js/photos.js" type="text/javascript"></script>'; $sql = mysql_query ( "select * from `gallery` where `active`='1' order by `date` desc, `pos` asc " ); if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) { while ( ($row = mysql_fetch_assoc ( $sql )) != false ) { $sql2 = mysql_query ( "select * from `gallery_img` where `iditem`='{$row['id']}' order by `osn` desc, `pos` asc " ); if (is_resource ( $sql2 ) && ($num = mysql_num_rows ( $sql2 )) > 0) { $i = 0; $out .= '<p class="h6">' . $row ['name'] . '</p>'; $out .= '<ul>'; while ( ($img = mysql_fetch_assoc ( $sql2 )) != false ) { $image = array ( "orig" => "o_{$img['id']}.{$img['ext']}", "big" => "b_{$img['id']}.{$img['ext']}", "min" => "s_{$img['id']}.{$img['ext']}" ); $i ++; $dop = ''; if ($i == 4) { $dop = ' class="noM"'; } $out .= '<li' . $dop . '><a href="?gallery=' . $row ['id'] . '"> <img border="0" src="/thumbs/crop/220x162//files/gallery/' . $image ['orig'] . '" /></a></li>'; } $out .= '</ul><p class="morePhotos"><a href="#">Еще фотографии&hellip;</a></p><p class="lessPhotos"><a href="#">Менее фотографий&hellip;</a></p>';
             */
            // $count = mysql_result ( mysql_query ( "select count(1) from `gallery_img` where `iditem`='{$row['id']}'" ), 0 );
            // $out .= '<p>' . $row ['notice'] . '</p>';
            // $out .= '<p><a href="?gallery=' . $row ['id'] . '">Посмотреть все работы (' . $count . ')</a></p>';
        }

        $out .= '</div>';

        $out .= '
		
		<div class="formBlock1">
			<form action="" id="order_rem" method="post">
				<fieldset>
					<table>
						<caption>Заявка на ремонт</caption>
						<tr>
							<td>
								<ul>
									<li><input type="text" name="Name" placeholder="Ф.И.О."></li>
									<li><input type="text" name="Phone"  placeholder="Телефон"></li>
									<li><input type="text" name="Email"  placeholder="E-mail"></li>
								</ul>
							</td>
							<td><textarea rows="" cols="" name="Comments" placeholder="Комментарий"></textarea>
                                                                                                                 <input type="submit" onclick="send_rem(); return false;" class="formSubmit1" value="Отправить заявку">
                                                                                                                 </td>
						</tr>
					</table>
				</fieldset>
			</form>
		</div>';
        $this->over = $out;
    }

    function getImages($id) {
        $out = "";
        $sql = mysql_query("select * from `gallery_img` where `iditem`='{$id}' order by `pos` asc");
        if (is_resource($sql) && ($num = mysql_num_rows($sql)) > 0) {
            $out .= '<table>';
            $i = 0;
            $v = 0;
            while (($row = mysql_fetch_assoc($sql)) != false) {
                $i ++;
                $v ++;
                $class = "";
                if ($i == 1) {
                    $out .= "<tr>";
                }
                $image = array(
                    "min" => "s_{$row['id']}.{$row['ext']}",
                    "orig" => "o_{$row['id']}.{$row['ext']}"
                );

                $out .= '<td width="150"><a href="/files/gallery/' . $image ['orig'] . '" class="highslide" onclick="return hs.expand(this, {slideshowGroup: \'gallery\',
align: \'center\',
	
	
	
	dimmingOpacity: 0,
transitions: [\'expand\', \'crossfade\'],
	fadeInOut: true,
	wrapperClassName: \'wide-border\',
	marginLeft: 100,
	marginBottom: 200,
    height:750,
    width:750})">
					<img border="0" style="border:7px solid  #f2f2f2" src="/files/gallery/' . $image ['min'] . '" width="100" />
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
        switch (date("m", $time)) {
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
        if (count($_POST) > 0 && isset($_SESSION ['MessageBlock'])) {
            unset($_POST);
        } elseif (count($_POST) == 0 && isset($_SESSION ['MessageBlock'])) {
            unset($_SESSION ['MessageBlock']);
        }
        $module = 'gallery';
        $values = array();
        $values ['name'] = isset($_POST ['name']) ? $this->no($_POST ['name']) : '';
        $values ['code'] = isset($_POST ['code']) ? $this->no($_POST ['code']) : '';
        $values ['email'] = isset($_POST ['email']) ? $this->no($_POST ['email']) : '';

        $values ['answer'] = isset($_POST ['answer']) ? $this->no($_POST ['answer']) : '';
        extract($values);
        $error = "";
        if (isset($_POST ['submitReview'])) {
            $File = isset($_FILES ['file']) && isset($_FILES ['file'] ['name']) && !empty($_FILES ['file'] ['name']) ? trim($_FILES ['file'] ['name']) : '';
            $FileExt = !empty($File) ? trim(strtolower(pathinfo($File, PATHINFO_EXTENSION))) : null;
            $FileSize = !empty($File) ? (int) $_FILES ['file'] ['size'] / 1024 : 99999999999;
            if (!$this->test($name) or ! $this->test($email) or ! $this->test($answer)) {
                $error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не заполненны обязательные поля</b></div>";
            } elseif (!preg_match("/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email)) {
                $error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не правильно заполнено поле EMail</b></div>";
            } elseif (!empty($File) && !in_array($FileExt, array(
                        "jpeg",
                        "jpg",
                        "gif",
                        "png"
                    ))) {
                $error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Не верный формат файла... изображение должно иметь формат JPEG, PNG или GIF</b></div>";
            } elseif (!empty($File) && $FileSize > 150) {
                $error .= '<div style="padding: 0px; height: 55px; width: 100%; margin: 0px;" class="footer_comments_box">' . "<b>Файл слишком большой, файл не должен превышать 150Kb</b></div>";
            } else {

                $msg = "
				Добавлен новый комментарий в раздел <a href='http://" . getenv("HTTP_HOST") . "/{$module}-{$itemID}.html'>http://" . getenv("HTTP_HOST") . "/{$module}-{$itemID}.html</a>
				<br/><br/>
				<b>Имя:</b>$name<br/><b>Email:</b>$email<br/><b>Отзыв:</b>$answer<br/>";
                $name = addslashes($name);
                $email = addslashes($email);
                $answer = addslashes($answer);
                $page = addslashes($_SERVER ['REQUEST_URI']);
                $ip = addslashes($_SERVER ['REMOTE_ADDR']);
                $time = time();
                mysql_query("insert into `comments` (`name`, `email`, `message`, `ip`, `page`, `active`, `date`, `module`, `item`) value ('$name', '$email',  '$answer', '$ip', '$page', '1', '$time', '$module', '$itemID')");
                $Id = mysql_insert_id();
                if (!empty($File)) {
                    $FileName = "{$Id}.{$FileExt}";
                    if (move_uploaded_file($_FILES ['file'] ['tmp_name'], "/files/users/{$FileName}")) {
                        $this->ResizeImage("/files/users/{$FileName}", "/files/users/{$FileName}", 56, 56, 100);
                        mysql_query("update `comments` set `avatar`='{$FileName}' where `id`='{$Id}'");
                    }
                }
                $headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
                $send = new Email ();
                $send->setFrom("robot@" . preg_replace("/www./is", "", getenv("HTTP_HOST")));
                $send->EmailHTML($this->getEmailAdmin(), "Добавлен новый комментарий на сайте " . $_SERVER ['HTTP_HOST'], $msg);
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
        $sql = mysql_query("select * from `comments` where `module`='{$module}' and `item`='{$itemID}'  and `active`='1' order by `date` asc");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            while (($row = mysql_fetch_assoc($sql)) != false) {
                $Image = '<img src="template/default/images/comment_face.gif" alt="comment img" />';
                if (!empty($row ['avatar']) && file_exists("/files/users/{$row['avatar']}")) {
                    $Image = '<img src="/files/users/' . $row ['avatar'] . '" alt="comment img" />';
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
            	<div id="comments_input"><input type="text" name="name" value="' . htmlspecialchars($name) . '" /></div>
            </div>
            
            <div class="footer_form_text">Ваш email</div>
            <div class="footer_form_input">
            	<div id="comments_input"><input type="text" name="email" value="' . htmlspecialchars($email) . '" /></div>
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
        $sql = mysql_query("select * from `site_setting` where `option`='admin_email'");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $row = mysql_fetch_assoc($sql);
            return $row ['value'];
        }
        return "";
    }

    function ResizeImage($image_from, $image_to, $fitwidth = 450, $fitheight = 450, $quality = 100) {
        global $php_inc;

        $os = $originalsize = getimagesize($image_from);

        if ($originalsize [2] != 2 && $originalsize [2] != 3 && $originalsize [2] != 1 && $originalsize [2] != 6 && ($originalsize [2] < 9 or $originalsize [2] > 12)) {
            return false;
        }

        if ($originalsize [0] > $fitwidth or $originalsize [1] > $fitheight) {
            $h = getimagesize($image_from);
            if (($h [0] / $fitwidth) > ($h [1] / $fitheight)) {
                $fitheight = $h [1] * $fitwidth / $h [0];
            } else {
                $fitwidth = $h [0] * $fitheight / $h [1];
            }

            if ($os [2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);

                $trans_color = imagecolortransparent($i);
                $trans_index = imagecolorallocate($i, $trans_color ['red'], $trans_color ['green'], $trans_color ['blue']);
                imagecolortransparent($i, $trans_index);

                imagesavealpha($i, true);
                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);
                imagegif($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } elseif ($os [2] == 2 or ( $os [2] >= 9 && $os [2] <= 12)) {
                $i = @ImageCreateFromJPEG($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);
                imagejpeg($o, $image_to, $quality);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } elseif ($os [2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagesavealpha($i, true);

                imagesavealpha($i, true);
                imagealphablending($o, false);

                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);

                imagesavealpha($o, true);
                imagepng($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            }

            return 2;
        }
        if ($originalsize [0] <= $fitwidth && $originalsize [1] <= $fitheight) {
            if ($os [2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (!$i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagegif($i, $image_to);
            } elseif ($os [2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (!$i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagepng($i, $image_to);
            } else {
                $i = @ImageCreateFromJPEG($image_from);
                if (!$i) {
                    return false;
                }
                imagejpeg($i, $image_to, $quality);
            }
            imagedestroy($i);
            chmod($image_to, 0777);
            return 1;
        }
    }

    function test($str) {
        return preg_match("/[a-zA-Z0-9А-Яа-я]/is", $str);
    }

    function no($str) {
        $str = str_replace("{", "", $str);
        $str = str_replace("}", "", $str);
        return trim(strip_tags(($str)));
    }

    function getItemImage($id) {
        $sql = mysql_query("select * from `gallery_img` where `iditem`='$id' order by `osn` desc, `pos` asc limit 1");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            $row = mysql_fetch_array($sql, MYSQL_ASSOC);

            return array(
                "min" => "s_{$row['id']}.{$row['ext']}",
                "big" => "b_{$row['id']}.{$row['ext']}",
                "orig" => "o_{$row['id']}.{$row['ext']}"
            );
        }
        return array(
            "min" => "nofoto_s.jpg",
            "big" => 'nofoto_s.jpg'
        );
    }

}

class gallery_admin extends glb {

    var $over = "";

    function __construct() {
        ini_set("memory_limit", "78M");
        if (!isset($_SESSION ['admin'])) {
            exit();
        }
    }

    function Update() {
        if (isset($_POST ['pos'])) {
            $pos = $_POST ['pos'];
        } else {
            $pos = "";
        }
        if (isset($_POST ['active'])) {
            $Active = $_POST ['active'];
        } else {
            $Active = "";
        }
        if (isset($_POST ['types'])) {
            $Types = $_POST ['types'];
        } else {
            $Types = "";
        }
        mysql_query("update gallery set pos='$pos', active='$Active', types='$Types' where id='$_POST[id]'");
        echo "33";
    }

    function UpdateImagePos() {
        $id = isset($_POST ['id']) ? (int) $_POST ['id'] : 0;
        $pos = isset($_POST ['pos']) ? (int) $_POST ['pos'] : 0;
        mysql_query("update `gallery_img` set `pos`='{$pos}', `itog`='" . (int) $_POST ['itog'] . "' where `id`='{$id}' limit 1");
        echo "33";
    }

    function UploadPhoto() {
        if (isset($_POST ['id']) && !empty($_POST ['id'])) {
            mysql_query("insert into `gallery_img` values ('', '$_POST[id]','', '', '0', '0')");
            $id = mysql_insert_id();
            $uploaddir = $_SERVER ['DOCUMENT_ROOT'] . "//files/gallery/";
            $p = pathinfo(basename($_FILES ['photo-path'] ['name']));
            if (isset($p ['extension'])) {
                $ext = strtolower($p ['extension']);

                if (in_array($ext, array(
                            "jpg",
                            "jpeg",
                            "png",
                            "gif"
                        ))) {
                    $uploadfile1 = $uploaddir . "b_$id.$ext";
                    $uploadfile2 = $uploaddir . "s_$id.$ext";
                    $uploadfile3 = $uploaddir . "o_$id.$ext";
                    if (move_uploaded_file($_FILES ['photo-path'] ['tmp_name'], $uploadfile3)) {

                        $this->ResizeImage($uploadfile3, $uploadfile1, 600, 400);
                        if (copy($uploadfile1, $uploadfile2)) {
                            $this->ResizeImage($uploadfile2, $uploadfile2, 205, 142);
                        }

                        mysql_query("update `gallery_img` set `ext`='$ext' where `id`='$id' limit 1");
                    } else {
                        mysql_query("delete from `gallery_img` where `id`='$id' limit 1");
                        echo "{failure:true}";
                        exit();
                    }
                } else {
                    mysql_query("delete from `gallery_img` where `id`='$id' limit 1");
                    echo "{failure:true}";
                    exit();
                }
            } else {
                mysql_query("delete from `gallery_img` where `id`='$id' limit 1");
                echo "{failure:true}";
                exit();
            }
        }
        echo "{success:true}";
    }

    function A2Up($fields, $values) {
        $string = "";
        $i = 0;
        foreach ($fields as $name => $value) {
            $i ++;
            if ($i > 1) {
                $string .= ",";
            }

            $value = addslashes($value);
            $vv = isset($values [$name]) ? $values [$name] : '';
            $string .= "`{$value}`='$vv'";
        }
        return $string;
    }

    function A2S($Array, $Sep = ",", $Closer = "", $Slashes = false) {
        if (is_array($Array)) {
            $string = "";
            $i = 0;
            foreach ($Array as $name => $value) {
                $i ++;
                if ($i > 1) {
                    $string .= "{$Sep}";
                }
                if (is_array($value)) {
                    $this->A2S($value, $Sep, $Closer, $Slashes);
                } else {
                    if ($Slashes == true) {
                        $value = addslashes($value);
                    }
                    $string .= "{$Closer}{$value}{$Closer}";
                }
            }
            return $string;
        }
        return $Array;
    }

    function getColumns() {
        $cols = array();
        $sql = mysql_query("SHOW COLUMNS FROM `gallery`");
        if (is_resource($sql) && mysql_num_rows($sql) > 0) {
            while (($row = mysql_fetch_assoc($sql)) != false) {
                $cols [] = strtolower($row ['Field']);
            }
        }
        return $cols;
    }

    function save() {
        $id = isset($_POST ['id']) ? (int) $_POST ['id'] : 0;
        if (isset($_POST ['id'])) {
            unset($_POST ['id']);
        }
        $fields = array();
        $values = array();
        $notallow = array(
            "id",
            "module",
            "task",
            "xaction",
            "ext-c",
            "cat_id"
        );
        $allow = $this->getColumns();
        foreach ($_POST as $field => $value) {
            $test = strtolower($field);
            if (in_array($test, $allow)) {
                $fields [$field] = $field;
                $values [$field] = addslashes($this->encode($value));
            }
        }
        $fields ['active'] = 'active';
        $values ['active'] = 1;
        // mail("sun-go-down@yandex.ru", "Test", $this->A2Up($fields, $values));
        mysql_query("update `gallery` set {$this->A2Up($fields, $values)} where `id`='$id'") or die("{failure:true, error:'" . addslashes(mysql_error()) . "'}");
        echo "{success:true}";
    }

    function Listing() {
        if (!isset($_POST ['id'])) {
            $id = 0;
        } else {
            $id = $_POST ['id'];
        }
        $_POST ['start'] = isset($_POST ['start']) ? (int) $_POST ['start'] : 0;
        $_POST ['limit'] = isset($_POST ['limit']) ? (int) $_POST ['limit'] : 25;
        $sql_count = "SELECT * FROM `gallery`";
        $sql = $sql_count . " LIMIT " . (int) $_POST ['start'] . ", " . (int) $_POST ['limit'];
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql) or die("HELLO");
        $arr = array();
        $arr2 = array();
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs, MYSQL_ASSOC)) {
                $record = $obj;
                $record ['link'] = "?gallery=$obj[id]";
                $arr [] = $this->winDecode($record);
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function getRecords() {
        if (!isset($_POST ['id'])) {
            $id = 0;
        } else {
            $id = $_POST ['id'];
        }
        $_POST ['start'] = isset($_POST ['start']) ? (int) $_POST ['start'] : 0;
        $_POST ['limit'] = isset($_POST ['limit']) ? (int) $_POST ['limit'] : 25;
        $sql_count = "SELECT * FROM `gallery`";
        $sql = $sql_count . " LIMIT " . (int) $_POST ['start'] . ", " . (int) $_POST ['limit'];
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql) or die("HELLO");
        $arr = array();
        $arr2 = array();
        $arr [] = $this->winDecode(array(
            "id" => 0,
            "name" => "Без галереи"
        ));
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs, MYSQL_ASSOC)) {
                $record = $obj;
                $record ['link'] = "?gallery=$obj[id]";
                $arr [] = $this->winDecode($record);
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function deleteItem() {
        $sql = mysql_query("select * from `gallery_img` where `iditem`='$_POST[id]'");
        while ($row = mysql_fetch_array($sql)) {
            $dir = $_SERVER ['DOCUMENT_ROOT'] . "//files/gallery/";
            $file = "s_{$row['id']}.{$row['ext']}";
            $file2 = "b_{$row['id']}.{$row['ext']}";
            if (file_exists($dir . $file)) {
                $dd = $dir . $file;
                @unlink($dd);
            }
            if (file_exists($dir . $file2)) {
                $dd = $dir . $file2;
                @unlink($dd);
            }
            $file3 = "o_{$row['id']}.{$row['ext']}";
            if (file_exists($dir . $file3)) {
                $dd = $dir . $file;
                @unlink($dd);
            }
            mysql_query("delete from `gallery_img` where `id`='$row[id]' limit 1");
        }
        mysql_query("delete from `gallery` where `id`='$_POST[id]'");
        echo "33";
    }

    function deleteImage() {
        $id = (int) $_POST ['id'];
        $sql = mysql_query("select * from `gallery_img` where `id`='$id' limit 1");
        $row = mysql_fetch_array($sql);
        $dir = $_SERVER ['DOCUMENT_ROOT'] . "//files/gallery/";
        $file = "s_{$row['id']}.{$row['ext']}";
        $file2 = "b_{$row['id']}.{$row['ext']}";
        if (file_exists($dir . $file)) {
            $dd = $dir . $file;
            @unlink($dd);
        }
        if (file_exists($dir . $file2)) {
            $dd = $dir . $file2;
            @unlink($dd);
        }
        $file3 = "o_{$row['id']}.{$row['ext']}";
        if (file_exists($dir . $file3)) {
            $dd = $dir . $file;
            @unlink($dd);
        }
        mysql_query("delete from `gallery_img` where `id`='$row[id]' limit 1");
        echo "33";
    }

    function setOsnImage() {
        $id = (int) $_POST ['id'];
        $sql = mysql_query("select `id`,`iditem` from `gallery_img` where `id`='$id' limit 1");
        $row = mysql_fetch_array($sql);
        mysql_query("update `gallery_img` set `osn`='0' where `iditem`='$row[iditem]'");
        mysql_query("update `gallery_img` set `osn`='1' where `id`='$row[id]'");
    }

    function Listing_Images() {
        $id = (int) $_POST ['dd'];
        $_POST ['start'] = isset($_POST ['start']) ? (int) $_POST ['start'] : 0;
        $_POST ['limit'] = isset($_POST ['limit']) ? (int) $_POST ['limit'] : 25;
        $sql_count = "SELECT * FROM `gallery_img` where `iditem`='$id'";
        $sql = $sql_count . " LIMIT " . (int) $_POST ['start'] . ", " . (int) $_POST ['limit'];
        $rs_count = mysql_query($sql_count) or die("kjdfsk");
        $rows = mysql_num_rows($rs_count);
        $rs = mysql_query($sql) or die("HELLO");
        $arr = array();
        $arr2 = array();
        if ($rows > 0) {
            while ($obj = mysql_fetch_array($rs)) {
                $arr2 ['id'] = $this->en($obj ['id']);
                $arr2 ['image'] = "o_{$obj['id']}.{$obj['ext']}";
                $arr2 ['file'] = "o_{$obj['id']}.{$obj['ext']}";
                $arr2 ['osn'] = $obj ['osn'];
                $arr2 ['pos'] = $obj ['pos'];
                $arr2 ['itog'] = $obj ['itog'];
                $arr [] = $arr2;
            }
            $jsonresult = $this->JEncode($arr);
            echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
        } else {
            echo '({"total":"0", "results":""})';
        }
    }

    function NewItem() {
        mysql_query("insert into `gallery` (`id`, `active`) values ('', '0')");
        $id = mysql_insert_id();
        echo $id;
    }

    function winDecode($string) {
        if (is_array($string)) {
            $newArray = array();
            foreach ($string as $name => $value) {
                if (is_array($value)) {
                    $newArray [$name] = $this->winDecode($value);
                } else {
                    if (is_string($value)) {
                        $newArray [$name] = iconv("windows-1251", "utf-8", $value);
                    } else {
                        $newArray [$name] = $value;
                    }
                }
            }
            return $newArray;
        } else {
            if (is_string($string)) {
                return iconv("windows-1251", "utf-8", $string);
            }
        }
        return $string;
    }

    function UploadZip() {
        if (class_exists('ZipArchive') && is_writable("/files/gallery") && isset($_FILES ['photo-path']) && isset($_FILES ['photo-path'] ['name']) && !empty($_FILES ['photo-path'] ['name']) && ($extension = strtolower(pathinfo($_FILES ['photo-path'] ['name'], PATHINFO_EXTENSION))) != false && $extension == 'zip') {
            $allow = array(
                "jpg",
                "jpeg",
                "png",
                "gif"
            );
            $zip = new ZipArchive ();
            if (($zip->open($_FILES ['photo-path'] ['tmp_name'])) == true) {
                $delete = 0;
                $add = 0;
                for ($i = 0; $i < $zip->numFiles; $i ++) {
                    $filename = $zip->getNameIndex($i);
                    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
                    if (in_array($extension, $allow)) {

                        $sth = mysql_query("INSERT INTO `gallery_img` (`iditem`, `ext`) VALUES (" . (int) $_POST ['id'] . ", '{$extension}')");

                        $Id = mysql_insert_id();
                        if ($Id) {
                            $f = fopen('/files/gallery/o_' . $Id . '.' . $extension, 'a+');
                            if (is_resource($f)) {
                                $index = $zip->getFromIndex($i);
                                fwrite($f, $index);
                                $add ++;
                                fclose($f);
                            } else {
                                mysql_query("DELETE FROM `gallery_img` WHERE `id`='{$Id}' LIMIT 1");
                                $delete ++;
                            }
                        }
                    }
                }
                echo json_encode(array(
                    "success" => true,
                    'count' => $zip->numFiles,
                    'add' => $add,
                    'delete' => $delete
                ));
                return true;
            }
        } else {
            echo json_encode(array(
                "failure" => true
            ));
        }
    }

    function ResizeImage($image_from, $image_to, $fitwidth = 450, $fitheight = 450, $quality = 100) {
        global $php_inc;

        $os = $originalsize = getimagesize($image_from);

        if ($originalsize [2] != 2 && $originalsize [2] != 3 && $originalsize [2] != 1 && $originalsize [2] != 6 && ($originalsize [2] < 9 or $originalsize [2] > 12)) {
            return false;
        }

        if ($originalsize [0] > $fitwidth or $originalsize [1] > $fitheight) {
            $h = getimagesize($image_from);
            if (($h [0] / $fitwidth) > ($h [1] / $fitheight)) {
                $fitheight = $h [1] * $fitwidth / $h [0];
            } else {
                $fitwidth = $h [0] * $fitheight / $h [1];
            }

            if ($os [2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);

                $trans_color = imagecolortransparent($i);
                $trans_index = imagecolorallocate($i, $trans_color ['red'], $trans_color ['green'], $trans_color ['blue']);
                imagecolortransparent($i, $trans_index);

                imagesavealpha($i, true);
                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);
                imagegif($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } elseif ($os [2] == 2 or ( $os [2] >= 9 && $os [2] <= 12)) {
                $i = @ImageCreateFromJPEG($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);
                imagejpeg($o, $image_to, $quality);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            } elseif ($os [2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (!$i) {
                    return false;
                }
                $o = ImageCreateTrueColor($fitwidth, $fitheight);
                imagesavealpha($i, true);

                imagesavealpha($i, true);
                imagealphablending($o, false);

                imagesavealpha($o, true);
                imagecopyresampled($o, $i, 0, 0, 0, 0, $fitwidth, $fitheight, $h [0], $h [1]);

                imagesavealpha($o, true);
                imagepng($o, $image_to);
                chmod($image_to, 0777);
                imagedestroy($o);
                imagedestroy($i);
            }

            return 2;
        }
        if ($originalsize [0] <= $fitwidth && $originalsize [1] <= $fitheight) {
            if ($os [2] == 1) {
                $i = @imagecreatefromgif($image_from);
                if (!$i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagegif($i, $image_to);
            } elseif ($os [2] == 3) {
                $i = @ImageCreateFromPng($image_from);
                if (!$i) {
                    return false;
                }
                imagesavealpha($i, true);
                imagepng($i, $image_to);
            } else {
                $i = @ImageCreateFromJPEG($image_from);
                if (!$i) {
                    return false;
                }
                imagejpeg($i, $image_to, $quality);
            }
            imagedestroy($i);
            chmod($image_to, 0777);
            return 1;
        }
    }

}

?>
