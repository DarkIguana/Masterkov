<?
class links extends glb {
	var $over = "";
	function __construct() {
		if (isset ( $_GET ['get'] )) {
			$this->getCaptcha ();
			exit ();
		}
		$d="<h2><a href='?links'>Обмен ссылками</a></h2><p align='right'><a href='?links=add' title='Добавить сайт' alt='Добавить сайт'>Добавить сайт</a></p>";
		if (isset($_GET['links']) && is_numeric($_GET['links']))
		{
			$sql = mysql_query("select * from `links` where `id`='$_GET[links]'");
			if (mysql_num_rows($sql)==0)
			{
				$d.="<center>Ссылка не найдена</center>";
			}
			else
			{
				$row = mysql_fetch_array($sql);
				$d.="<br><br><div class='data'><ul><li><table width='90%'>
				<tr><td width='150' height='20'>Название сайта</td><td><a href='?links=$row[id]' title='$row[name]'>$row[name]</a></td></tr>
				<tr><td width='70' height='20'>Описание:</td><td>$row[desc]<br></td></tr>
				<tr><td width='70'>URL:</td><td><a href='$row[url]' title='$row[name]'>$row[url]</a></td></tr></table></li>
				</ul></div>";
			}
			$this->over=$d;
		}
		elseif (isset ( $_GET ['links'] ) && $_GET ['links'] == "add") {
			$this->addLink ();
		}
		else
		{
			$limit = 25;
			if (isset($_GET['page'])){$page=$_GET['page']-1;}else{$page=0;}
			$start =  abs($limit*$page);
			$sql=mysql_query("select * from `links` limit $start, $limit");
			
			$d.="<center><br><br>".$this->GetPages()."</center><div class='data'><ul>";
			if (mysql_num_rows($sql)>0)
			{
			while ($row = mysql_fetch_array($sql))
			{
				$d.="<li><table width='90%'>
				<tr><td width='150' height='20'>Название сайта</td><td><a href='?links=$row[id]' title='$row[name]'>$row[name]</a></td></tr>
				<tr><td width='70' height='20'>Описание:</td><td>$row[desc]<br></td></tr>
				<tr><td width='70'>URL:</td><td><a href='$row[url]' title='$row[name]'>$row[url]</a></td></tr></table></li>
				";
			}
			}
			else
			{
				$d.="<li><center>Нет ни одной ссылки</center></li>";
			}
			$d.="</ul></div><br><br>{$this->GetPages()}</center>";
			$this->over=$d;
		}
		
	}
	
    function GetPages($limit=25)
	{
		$page = $_GET['page'];
		$count =mysql_query("select * from `links`");
		
		$num_pages = ceil(mysql_num_rows($count)/$limit);
		
		$pages="<div id='navi'>";
		if ($num_pages == 1 or $num_pages == 0)
		{
			$pages = "<span>1</span>";
		}
		elseif ($num_pages>1)
		{
			if (isset($_GET['page']))
			{
				
				if ($page>2){$start=$page-1;}
				
				elseif ($_GET['page']==1) {
					$start=1;
				}
				
				elseif ($_GET['page']>4) {
					$start=$_GET['page']-4;
				}
				else 
				{
					$start=1;
				}
				
				$end = $_GET['page']+4;
				if ($end>$num_pages){$end=$num_pages;}
			}
			else {
				$start=1;
				if ($num_pages>=5)
				{
					$end=5;
				}
				else
				{
					$end = $num_pages;
				}
			}
			if (isset($_GET['page'])){$st=$_GET['page'];}else{$st=1;}
			$br = $st-1;
			$br2 = $st+1;
			if ($br !=0 && $st!=1)
			{
				$pages .= "<a href='?links&page=$br'><span> << </span></a>&nbsp;&nbsp;";
			}
			for ($i=$start; $i<=$end;$i++)
			{
				if ($st==$i)
				{
					$pages .= "<span class='here'>$i</span> &nbsp; ";
				}
				else
				{
					$pages .= "<a href='?links&page=$i'><span>$i</span></a> &nbsp; ";
				}
				if ($i!=$end)
				{
					$pages .= " &nbsp;";
				}
			}
			if ($br2 != $num_pages && $st!=$num_pages)
			{
				$pages .= "<a href='?links&page=$br2'><span> >> </span></a>";
			}

			return "<p>".$pages."</p></div><br>";
		}
	}
	
	
	function getCaptcha() {
		$im = imagecreate ( 135, 30 );
		
		$first = rand ( 20, 50 );
		$end = rand ( 1, 10 );
		
		$pm = rand ( 0, 1 );
		$arr = array (0 => "+", 1 => "-" );
		$fr = rand ( 0, 3 );
		
		if ($arr [$pm] == "-") {
			$_SESSION ['secret_code'] = $first - $end;
		} else {
			$_SESSION ['secret_code'] = $first + $end;
		}
		// White background and blue text
		$bg = imagecolorallocate ( $im, 255, 255, 255 );
		$textcolor = imagecolorallocate ( $im, 0, 0, 0 );
		$font = $_SERVER ['DOCUMENT_ROOT'] . "/fonts/{$fr}.ttf";
		
		imagettftext ( $im, 15, 0, 11, 21, $textcolor, $font, "$first {$arr[$pm]} $end = ?" );
		//imagestring($im, 2, 0, 0, 'Сколько будет'.$first."-".$end, $textcolor);
		header ( 'Content-type: image/png' );
		
		imagepng ( $im );
		imagedestroy ( $im );
	}
	function testDB($url) {
		$url = $this->checkurl ( $url );
		$parse = parse_url ( $url );
		if (isset ( $parse ['host'] )) {
			$host = strtolower ( $parse ['host'] );
			
			$sql = mysql_query ( "select * from `links` where `domain`='$host'" );
			if (mysql_num_rows ( $sql ) != 0) {
				return false;
			}
		}
		return true;
	}
	function testSite($url) {
		
		$buf = file_get_contents ( $url );
		if (! $buf) {
			return false;
		} else {
			return true;
		}
	}
	function testLink($url) {
		$url = $this->checkurl ( $url );
		
		$buf = file_get_contents ( $url );
		if ($buf) {
			if (preg_match ( "/href=\"http:\/\/www.allinnet.ru\"/is", $buf ) or preg_match ( "/http:\/\/www.allinnet.ru/is", $buf )) {
				return true;
			} else {
				return false;
			}
		}
	}
	function addLink() {
		$error [0] = "";
		$error [1] = "";
		$error [2] = "";
		$error [3] = "";
		$error [4] = "";
		$error [5] = "";
		$errors = 0;
		
		if (isset ( $_POST ['addlink'] )) {
			if (empty ( $_POST ['name'] )) {
				$error [0] = "<tr><td colspan=\"2\" style='color:red;'>Не заполнено поле Название сайта</td></tr>";
				$errors ++;
			}
		    if (strlen ( $_POST ['message'] )>500) {
				$error [0] = "<tr><td colspan=\"2\" style='color:red;'>Максимум допустимо 500 символов</td></tr>";
				$errors ++;
			}
			if (empty ( $_POST ['email'] )) {
				$error [1] = "<tr><td colspan='2' style='color:red'>Не заполнено поле Email адрес</td></tr>";
				$errors ++;
			} elseif (! preg_match ( "/^[a-z0-9_.-]+@([a-z0-9_]+.)+[a-z]{2,4}$/i", $_POST ['email'] )) {
				$error [1] = "<tr><td colspan='2' style='color:red'>Не правильно введён Email адрес</td></tr>";
				$errors ++;
			}
			if (empty ( $_POST ['site'] )) {
				$error [4] = "<tr><td colspan='2' style='color:red'>Не заполнено поле URL сайта</td></tr>";
				$errors ++;
			}
		    if (preg_match("/allinnet.ru/is", $_POST ['site'] )) {
				$error [4] = "<tr><td colspan='2' style='color:red'>Не правильно заполнено поле URL сайта</td></tr>";
				$errors ++;
			}
		  if (preg_match("/allinnet.ru/is", $_POST ['siteLink'] )) {
				$error [5] = "<tr><td colspan='2' style='color:red'>Не правильно заполнено поле Адрес обратной ссылки</td></tr>";
				$errors ++;
			}
			if ($this->testDB ( $_POST ['site'] ) == false) {
				$error [4] = "<tr><td colspan='2' style='color:red'>Этот сайт уже есть в базе</td></tr>";
				$errors ++;
			} else {
				if ($this->testSite ( $_POST ['site'] ) == false) {
					$error [4] = "<tr><td colspan='2' style='color:red'>Сайт недоступен или был введён ошибочный адрес</td></tr>";
					$errors ++;
				} else {
					if ($this->testLink ( $_POST ['siteLink'] ) == false) {
						$error [5] = "<tr><td colspan='2' style='color:red'>На указаной странице не было найденно нашей ссылки</td></tr>";
						$errors ++;
					}
				}
			
			}
			if ($_SESSION ['secret_code'] != $_POST ['cod']) {
				$error [3] = "<tr><td colspan='2' style='color:red'>Не правильно введён результат</td></tr>";
				$errors ++;
			}
		}
		
		if (isset ( $_POST ['addlink'] ) && $errors == 0) {
			
			if (isset ( $_SESSION ['mesfeed'] ) && $_SESSION ['mesfeed'] == 1) {
			
			} else {
				$name = isset ( $_POST ['name'] ) ? addslashes ( strip_tags($_POST ['name']) ) : '';
				$email = isset ( $_POST ['email'] ) ? $_POST ['email'] : '';
				$site = isset ( $_POST ['site'] ) ? addslashes ( strip_tags($_POST ['site']) ) : 'http://';
				$siteLink = isset ( $_POST ['siteLink'] ) ? addslashes ( strip_tags($_POST ['siteLink']) ) : 'http://';
				$message = isset ( $_POST ['message'] ) ? addslashes ( strip_tags($_POST ['message']) ) : '';
				
				$host = parse_url ( $site );
				$host = $host ['host'];
				$dateTest = strtotime ( date ( "Y-m-d" ) );
				$dateNextTest = strtotime ( "+1 week", $dateTest );
				$ip = $_SERVER ['REMOTE_ADDR'];
				mysql_query ( "insert into `links` (`domain`, `name`, `url`, `backurl`, `dateTest`, `dateNextTest`, `email`, `desc`) values 
			('$host', '$name', '$site', '$siteLink', '$dateTest', '$dateNextTest', '$email', '$message')" );
				$id = mysql_insert_id();
				$this->emailSend ("<h3>Ваш сайт успешно добавлен в базу</h3><br>
				Постоянная страница с ваше ссылкой: http://www.allinnet.ru/links-{$id}.html<br><br>
				Данные сайта:<br>
				Название сайта:$name<br>
				Описание сайта:$message<br>
				email:$email<br>
				<br><br>
				Примечание:
				<br><br>
				IP:$ip
				
				
				");
				$this->emailSend ( "<h3>Ваш сайт успешно добавлен в базу</h3><br>
				Постоянная страница с ваше ссылкой: http://www.allinnet.ru/links-{$id}.html<br><br>
				Данные сайта:<br>
				Название сайта:$name<br>
				Описание сайта:$message<br>
				email:$email<br>
				<br><br>
				Примечание:
				<br>Каждую неделю ваш сайт будет проверятся на наличие нашей ссылки!<br>
				Если в течении 3-х недель не будет нашей ссылки по указанному вами URL $siteLink <br>
				Ваш сайт будет удалён из нашей базы!
				", $email);
				$_SESSION ['mesfeed'] = 1;
				header ( "Location: links-add.html" );
				$_SESSION ['mesfeed'] = 1;
			
			}
		}
		if (! isset ( $_POST ['addlink'] ) or isset ( $_POST ['addlink'] ) && $errors != 0) {
			
			$d = "<h2><a href='?links'>Обмен ссылками</a></h2><br>";
			$name = isset ( $_POST ['name'] ) ? strip_tags($_POST ['name']) : '';
			$email = isset ( $_POST ['email'] ) ? $_POST ['email'] : '';
			$site = isset ( $_POST ['site'] ) ?  strip_tags($_POST ['site'])  : 'http://';
		    $siteLink = isset ( $_POST ['siteLink'] ) ? strip_tags($_POST ['siteLink']) : 'http://';
			$message = isset ( $_POST ['message'] ) ? strip_tags($_POST ['message']) : '';
			if (isset ( $_SESSION ['mesfeed'] ) && $_SESSION ['mesfeed'] == 1) {
				$d .= "<div class='data' ><ul><li><h2>Добавление ссылки</h2>";
				$d .= "<center>Ваш сайт успешно добавлен<br>Все данные о размещение вашего сайта высланы вам на ваш Email<br><br>Спасибо за проявленный интерес к нашему проекту</center>";
				$d .= "</li></ul></div>";
				$this->over = $d;
				$_SESSION ['mesfeed'] = 0;
				return true;
			}
			$d .= "<div class='data' ><ul><li><h2>Добавление ссылки</h2>";
			$d .= "<form method='post'>";
			$d .= "<table width=\"100%\">";
			$d .= "<tr><td>Название сайта*:</td><td colspan='2'><input type=\"text\" name='name' value='$name'></td></tr>";
			$d .= $error [0];
			
			$d .= "<tr><td>URL сайта*:</td><td colspan='2'><input type=\"text\" name='site' value='$site'></td></tr>";
			$d .= $error [4];
			$d .= "<tr><td>Адрес обратной ссылки:*</td><td colspan='2'><input type=\"text\" name='siteLink' value='$siteLink'></td></tr>";
			$d .= $error [5];
			$d .= "<tr><td><br><br>Наша ссылка:*</td><td colspan='2'><br><br><b>" . htmlspecialchars ( "<a href=\"http://www.allinnet.ru\">Allinnet.ru - Всё интересное в сети</a>" ) . "</b><br><br></td></tr>";
			$d .= "<tr><td>Описание сайта:**</td><td colspan='2'><textarea name='message' cols='40' rows='7'>$message</textarea></td></tr>";
			$d .= $error [2];
			$d .= "<tr><td>Ваш Email адрес*:</td><td colspan='2'><input type=\"text\" name='email' value='$email'></td></tr>";
			$d .= $error [1];
			$d .= "<tr><td>Ответьте на вопрос:</td><td width='50'><input type=\"text\" name='cod' size=4></td><td><img src='links.html?get=1'></td></tr>";
			$d .= $error [3];
			$d .= "<tr><td colspan='2'><input type='submit' name='addlink' value='Добавить ссылку'> </td></tr>";
			$d .= "</table></form>";
			$d .= "</li></ul></div>";
			$d .= "<div class='data' ><ul><li><center><b>* Поля помеченные звездочкой строго обязательны для заполнения.<br>** Максимум 500 символов</b><br><br>Прежеде чем добавить ссылку убедитесь что вы разместили нашу ссылку на вашем сайте.</center>
			</li></ul></div>";
			$this->over = $d;
		}
	}
	function checkurl($url) {
		// режем левые символы и крайние пробелы
		$url = trim ( $this->pregtrim ( $url ) );
		// если пусто - выход
		

		//проверяем УРЛ на правильность
		if (! preg_match ( "~^(?:(?:https?|ftp|telnet)://(?:[a-z0-9_-]{1,32}" . "(?::[a-z0-9_-]{1,32})?@)?)?(?:(?:[a-z0-9-]{1,128}\.)+(?:com|net|" . "org|mil|edu|arpa|gov|biz|info|aero|inc|name|[a-z]{2})|(?!0)(?:(?" . "!0[^.]|255)[0-9]{1,3}\.){3}(?!0|255)[0-9]{1,3})(?:/[a-z0-9.,_@%&" . "?+=\~/-]*)?(?:#[^ '\"&<>]*)?$~i", $url, $ok ))
			return - 1; // если не правильно - выход
		// если нет протокала - добавить
		if (! strstr ( $url, "://" ))
			$url = "http://" . $url;
			// заменить протокол на нижний регистр: hTtP -> http
		$url = preg_replace ( "~^[a-z]+~ie", "strtolower('\\0')", $url );
		return $url;
	}
	function pregtrim($str) {
		return preg_replace ( "/[^\x20-\xFF]/", "", @strval ( $str ) );
	}
	function emailSend($msg, $to="admin@allinnet.ru, jk@allinnet.ru", $theme = "Обмен ссылками с сайтом AllinNET.ru") {
		$headers = 'From:robot@allinnet.ru'  . "\r\n" . "Content-Type: text/html;" . 'charset="windows-1251"';
		mail ( $to, $theme, $msg, $headers );
	}

}
	