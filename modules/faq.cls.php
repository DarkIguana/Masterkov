<?php
class faq extends glb {
	var $over = "";
	var $params = array ("template" => "index" );
	function __construct() {
		
		$d = '';
		BreadcrumbsTitle::set("Вопрос-ответ");
		Breadcrumbs::add("<a href=\"?faq\">Вопрос-ответ</a>");
	
		$page = isset ( $_GET ['page'] ) ? $_GET ['page'] - 1 : 0;
		$limit = 10;
		$start = abs ( $limit * $page );
		$sql = mysql_query ( "select * from `faq` where `active`!=2 order by `date` desc limit $start, $limit" );
		$count = mysql_result ( mysql_query ( "select COUNT(*) from `faq` where `active`!=2" ), 0 );
		
		if ($count == 0) {
			$this->over = "<p>Нет ни одного вопроса</p>" . $this->form ();
			return true;
		}
		$page = isset ( $_GET ['page'] ) ? $_GET ['page'] : 1;
		$numPages = ceil ( $count / $limit );
		
		$d .= "<ul class='aList'>";
		while ( $row = mysql_fetch_array ( $sql ) ) {
			$d .= '<li><a href="#">Вопрос: ' . $row ['text'] . ' (' . $row ['name'] . ')</a>
					<p class="faq_name"><br/>' . $row ['answer'] . '<br/></p>
					<p> ' . $row ['answer'] . '</p></li>';
		
		}
		$d .= "</ul>";
		
		if ($numPages > 1) {
			$d .= '<center>Страницы:<br/>';
			for($i = 1; $i <= $numPages; $i ++) {
				if ($i == $page) {
					$d .= "<strong>$i</strong>&nbsp;&nbsp;";
				} else {
					if ($i==1){
						$d .= "<a href='?faq'>$i</a>&nbsp;&nbsp;";
					}
					else {
					$d .= "<a href='?faq&page=$i'>$i</a>&nbsp;&nbsp;";
					}
				}
			}
			$d .= "</center>";
		}
		
		$d .= "";
		$this->over .= $d . $this->form ();
	}
	function getEmail() {
		$sql = mysql_query ( "SELECT * FROM `site_setting` WHERE `option` = 'email_admin'" );
		if (mysql_num_rows ( $sql ) > 0) {
			$row = mysql_fetch_assoc ( $sql );
			return $row ['value'];
		}
	}
	function date_rus($time = "") {
		
		$day = date ( "j", $time );
		$month = date ( "m", $time );
		$year = date ( "Y", $time );
		$hour = date ( "H", $time );
		$minute = date ( "i", $time );
		$dd = date ( 'w', $time );
		
		switch ($dd) {
			case 0 :
				$dd = 'воскресенье';
				break;
			case 1 :
				$dd = 'понедельник';
				break;
			case 2 :
				$dd = 'вторник';
				break;
			case 3 :
				$dd = 'среда';
				break;
			case 4 :
				$dd = 'четверг';
				break;
			case 5 :
				$dd = 'пятница';
				break;
			case 6 :
				$dd = 'пятница';
				break;
		}
		
		switch ($month) {
			case 01 :
				$month = "января";
				break;
			case 02 :
				$month = "февраля";
				break;
			case 03 :
				$month = "марта";
				break;
			case 04 :
				$month = "апреля";
				break;
			case 05 :
				$month = "мая";
				break;
			case 06 :
				$month = "июня";
				break;
			case 07 :
				$month = "июля";
				break;
			case 08 :
				$month = "августа";
				break;
			case 09 :
				$month = "сентября";
				break;
			case 10 :
				$month = "октября";
				break;
			case 11 :
				$month = "ноября";
				break;
			case 12 :
				$month = "декабря";
				break;
		}
		return "$day $month $year г.";
	}
	function no($str) {
		$str = str_replace ( "{", "", $str );
		$str = str_replace ( "}", "", $str );
		return strip_tags ( ($str) );
	}
	function test($str) {
		return preg_match ( "/[a-zA-Z0-9А-Яа-я]/is", $str );
	}
	function form() {
		$d = "";
		$values = array ();
		$values ['name'] = isset ( $_POST ['name'] ) ? $this->no ( $_POST ['name'] ) : '';
		$values ['code'] = isset ( $_POST ['code'] ) ? $this->no ( $_POST ['code'] ) : '';
		$values ['email'] = isset ( $_POST ['email'] ) ? $this->no ( $_POST ['email'] ) : '';
		$values ['where'] = isset ( $_POST ['where'] ) ? $this->no ( $_POST ['where'] ) : '';
		$values ['answer'] = isset ( $_POST ['answer'] ) ? $this->no ( $_POST ['answer'] ) : '';
		extract ( $values );
		$error = "";
		if (isset ( $_POST ['submitReview'] )) {
			$codeImage = $_SESSION ['secret_code'];
			if (! $this->test ( $name ) or ! $this->test ( $email ) or ! $this->test ( $answer ) or ! $this->test ( $code )) {
				$error .= "<p align='center' style='color:red'><b>Не заполненны обязательные поля</b></p>";
			} elseif ($codeImage != $code) {
				$error .= "<p align='center' style='color:red'><b>Слово с картинки введенно не верно</b></p>";
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $email )) {
				$error .= "<p align='center' style='color:red'><b>Не правильно заполнено поле EMail</b></p>";
			} else {
				
				$msg = "<b>Имя:</b>$name<br/>
				<b>Email:</b>$email<br/>
				<b>Вопрос:</b>$answer<br/>";
				$name = addslashes ( $name );
				$email = addslashes ( $email );
				$where = addslashes ( $where );
				$answer = addslashes ( $answer );
				$page = addslashes ( $_SERVER ['REQUEST_URI'] );
				$ip = addslashes ( $_SERVER ['REMOTE_ADDR'] );
				$time = time ();
				mysql_query ( "insert into `faq` (`name`, `email`, `text`, `active`, `date`) value ('$name', '$email',  '$answer', '2', '$time')" );
				$headers = 'From: robot@' . $_SERVER ['HTTP_HOST'] . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
				//	mail ($this->getEmail(), " Вопрос с сайта " . $_SERVER ['HTTP_HOST'], $msg, $headers ); //2sell@mail.ru
				$name = "";
				$email = "";
				$where = "";
				$answer = "";
				
				$error .= "<p align='center' style='color:red'><b>ваш вопрос отправлен администратору сайта, после ответа он появится на сайте!</b></p>";
			}
		}
		$d .= ' <p align="center">&nbsp;</p>		
		<h2>Задать свой вопрос</h2>
		
		<a name="addQuestion"></a>
      
     ' . $error . '
      
	  
	  <form action="#addQuestion" method="post">
		  <ul class="qList">
			<li>
				<table>
					<tr>
						<td><span>Представьтесь</span><input type="text" class="w210" name="name" value="' . $name . '" /></td>
						<td><span>Ваш e-mail</span><input type="text" class="w210" name="email" value="' . $email . '" /></td>
					</tr>
				</table>
			</li>
			
			<li><span>Ваш вопрос</span><textarea rows="5" cols="40" name="answer">' . $answer . '</textarea></li>
			<li><img src="getcaptcha.php" alt="На главную" /><input type="text" class="w210" name="code" value="Введите текст с картинки" onclick="this.value=\'\'"  /><br /><br /><br /></li>
			<li><input type="submit" class="subm133" value="Задать вопрос" name="submitReview" /></li>
		</ul>
	</form>
     
      
      <p >&nbsp;</p>
		';
		return $d;
	}
}
class faq_admin extends admin {
	function __construct() {
		if (! isset ( $_SESSION ['admin'] )) {
			exit ();
		}
	}
	function SaveRecord() {
		$name = isset ( $_POST ['name'] ) ? addslashes ( $this->encode ( $_POST ['name'] ) ) : '';
		$text = isset ( $_POST ['text'] ) ? addslashes ( $this->encode ( $_POST ['text'] ) ) : '';
		$email = isset ( $_POST ['email'] ) ? addslashes ( $this->encode ( $_POST ['email'] ) ) : '';
		$answer = isset ( $_POST ['answer'] ) ? addslashes ( $this->encode ( $_POST ['answer'] ) ) : '';
		$city = isset ( $_POST ['city'] ) ? addslashes ( $this->encode ( $_POST ['city'] ) ) : '';
		$homepage = isset ( $_POST ['homepage'] ) ? addslashes ( $this->encode ( $_POST ['homepage'] ) ) : '';
		$id = isset ( $_POST ['id'] ) ? addslashes ( $_POST ['id'] ) : 0;
		$date = isset ( $_POST ['date'] ) ? strtotime ( $_POST ['date'] ) : 0;
		
		if (empty ( $id ) or $id == 0) {
			mysql_query ( "insert into `faq` (`name`, `text`, `active`, `email`, `answer`, `city`, `homepage`, `date`) value ('$name', '$text', '1', '$email', '$answer', '$city', '$homepage', '$date')" );
		} else {
			mysql_query ( "update `faq` set `name`='$name', `email`='$email', `city`='$city', `homepage`='$homepage', `text`='$text', `answer`='$answer', `date`='$date' where `id`='$id'" );
			$sql = mysql_query ( "select * from `faq` where `id`='$id' limit 1" );
			if (is_resource ( $sql ) && mysql_num_rows ( $sql ) > 0) {
				$row = mysql_fetch_assoc ( $sql );
				$answer = trim ( strip_tags ( $row ['answer'] ) );
				$answer = trim ( str_replace ( "\n", "", $answer ) );
				if (! empty ( $answer ) && $row ['mail'] == 0 && ! empty ( $row ['email'] )) {
					$msg = "<b>Добрый день, $row[name]!</b>";
					$msg .= "<br/><br/>На ваш вопрос заданный на сайте www.avto-status.ru получен ответ, с текстом сообщения вы можете ознакомиться по ссылке <a href=\"http://www.avto-status.ru/faq.html\">http://www.avto-status.ru/faq.html</a>";
					$msg .= "<br/><br/>C Уважением, Администрация проекта";
					$headers = 'From: info@avto-status.ru' . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
					// mail ($row['email'], "ответ на ваш вопрос", $msg, $headers ); //2sell@mail.ru
				//  mysql_query("update `faq` set `mail`=1 where `id`='$row[id]");
				}
			
			}
		}
		
		echo "{success:true}";
	}
	function UpdateRecord() {
		$active = isset ( $_POST ['active'] ) ? mysql_real_escape_string ( $_POST ['active'] ) : 2;
		$id = isset ( $_POST ['id'] ) ? mysql_real_escape_string ( $_POST ['id'] ) : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "update `faq` set `active`='$active' where `id`='$id'" );
		}
		echo "33";
	}
	function DeleteRecord() {
		$id = isset ( $_POST ['id'] ) ? ( int ) $_POST ['id'] : 0;
		if (! empty ( $id ) && $id != 0) {
			mysql_query ( "delete from `faq` where `id`='$id' limit 1" );
		}
		echo "55";
	}
	function Listing() {
		$_POST ['start'] = isset ( $_POST ['start'] ) ? ( int ) $_POST ['start'] : 0;
		$_POST ['limit'] = isset ( $_POST ['limit'] ) ? ( int ) $_POST ['limit'] : 25;
		$sql_count = "SELECT * FROM faq order by `active` desc";
		$sql = $sql_count . " LIMIT " . ( int ) $_POST ['start'] . ", " . ( int ) $_POST ['limit'];
		$rs_count = mysql_query ( $sql_count );
		$rows = mysql_num_rows ( $rs_count );
		$rs = mysql_query ( $sql );
		if ($rows > 0) {
			while ( $obj = mysql_fetch_array ( $rs ) ) {
				
				$arr ['id'] = $this->en ( $obj ['id'] );
				$arr ['name'] = $this->en ( $obj ['name'] );
				$arr ['date'] = date ( "d-m-Y", $obj ['date'] );
				$arr ['answer'] = $this->en ( $obj ['answer'] );
				$arr ['answerHtml'] = $this->en ( nl2br ( $obj ['answer'] ) );
				$arr ['city'] = $this->en ( $obj ['city'] );
				$arr ['homepage'] = $this->en ( $obj ['homepage'] );
				$arr ['email'] = $this->en ( $obj ['email'] );
				$arr ['text'] = $this->en ( $obj ['text'] );
				$arr ['textHtml'] = $this->en ( nl2br ( $obj ['text'] ) );
				$arr ['active'] = $obj ['active'];
				$new [] = $arr;
			}
			$jsonresult = $this->JEncode ( $new );
			echo '({"total":"' . $rows . '","results":' . $jsonresult . '})';
		} else {
			echo '({"total":"0", "results":""})';
		}
	}
}