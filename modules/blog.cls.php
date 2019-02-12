 <?
 class blog extends glb
 {
 	public $over = "";
 	public $item = "";
 	public $date = "";
 	public $month = "";
 	function __construct()
 	{

 		$this->over = self::get_news();
 		$this->getRoad();
 	}
 	function getRoad()
 	{
 		$item = $this->item;
 		$road = "<li><span class=\"hum\"><a href='?blog'>Блог</a></span></li>";
 		if (isset($_GET['year']))
 		{
 			$road .= "<li><span class=\"hum\"><a href='?blog&year=$_GET[year]'>$_GET[year]</a></span></li>";
 		}
 		elseif (!empty($item))
 		{
 			
 			$date = strtotime($this->date);
 			$year = date("Y", $date);
 			$month = date("m", $date);
 			$rusmonth = $this->date_rus($month);
 			$road .= "<li><span class=\"hum\"><a href='?blog&year=$year'>$year</a></span></li>";
 			$road .= "<li><span class=\"hum\"><a href='?blog&date={$year}-{$month}'>{$rusmonth}</a></span></li>";
 			$road .= "<li><span class=\"hum\">{$this->item}</span></li>";
 		}
 		elseif (isset($_GET['date']))
 		{
 			$date = strtotime($_GET['date']);
 			$year = date("Y", $date);
 			$month = date("m", $date);
 			$rusmonth = $this->date_rus($month);
 			$road .= "<li><span class=\"hum\"><a href='?blog&year=$year'>$year</a></span></li>";
 			$road .= "<li><span class=\"hum\"><a href='?blog&date={$year}-{$month}'>{$rusmonth}</a></span></li>";
 		}
 		elseif (isset($_GET['tag']))
 		{
 			$tag = $_GET['tag'];
 			$tag2 = urldecode($_GET['tag']);
 			$road .="<li><span class=\"hum\"><a href='?blog&tag={$tag}'>Поиск по тегу \"$tag2\"</a></span></li>";
 		}
 		
 		$_SESSION['Road'] = $road;
 	}
 	function addComment($blog)
 	{
 		$date = time();
 		$query = mysql_query("insert into `comments_blog` values ('', '{$blog['id']}', '$date', '$blog[name]', '$blog[email]', '$blog[text]')");
 		$newId = mysql_insert_id();
 		header("Location: /blog/$blog[id]/#$newId");
 		return $newId;
 	}
 	function normTag($tag)
 	{

 		$tag = ltrim($tag);
 		$n = 0;
 		$end = mb_strlen($tag, "windows-1251");
 		$test2 = substr($tag, -1);
 		if (empty($test2))
 		{
 			$end = $end-1;
 		}
 		return urlencode(substr($tag, $n, $end));
 	}

 	function testEmail($email)
 	{
 		if(eregi('^([a-z0-9_]|\\-|\\.)+'.'@'.'(([a-z0-9_]|\\-)+\\.)+'.'[a-z0-9]{2,4}$', $email))
 		{
 			return true;
 		}
 		else
 		{
 			return false;
 		}
 	}
 	function get_news()
 	{
 		if (isset($_GET['id']) && $_GET['id'] != null or isset($_GET['blog']) && is_numeric($_GET['blog']))
 		{

 			$id = isset($_GET['blog'])?$_GET['blog']:'0';
 			$row = mysql_fetch_array(mysql_query("select * from blog where id='$id'"));
 			$date = @date("d/m/Y", $row['date']);
 			$_GET['date']=date("Y-m", $row['date']);
 			$this->date = date("Y-m", $row['date']);
 			$this->item = $row['title'];
 	        $this->month = $this->date_rus(date("m"), $row['date']);
 			$tg = explode("," ,$row['full']);
 			$z=0;
 			$tags="";
 			foreach ($tg as $tag)
 			{
 				$tag2 = $this->normTag($tag);
 				$z++;
 				if ($z == 1)
 				{
 					$tr = "";
 				}else{$tr=', ';}
 				$tags .= $tr.'<a href="?blog&tag='.$tag2.'">'.$tag.'</a>';
 			}
 		$back="";
		    $backUrl = $_SERVER['HTTP_REFERER'];
			$par = parse_url($backUrl);
			if (preg_match("/brainbag.ru/is", $par['host']))
			{
				$back ="<p align='right'><a href='$backUrl'>Вернуться</a></p>";
			}

 			$d.='<div class="textblock">
               <p class="zag_bl">'.$row['title'].'</p>
               <p>'.$row['text'].'</p>
               <div class="blog_bottom"> <span>Дата: '.$date.'</span> '.$tags.'</div>
               '.$back.'
             </div>
			';
 			$d.="<p style='font:18px arial; color:#918439;'>Комментарии</p>";




 			$d.="<p style='font:15px arial; color:#918439;' ><a href='#' onclick='return false;' id='AddComment'>Добавить комментарии</a></p>";

 			$text = isset($_POST['text'])?$_POST['text']:'';
 			$name = isset($_POST['name'])?$_POST['name']:'';
 			$email = isset($_POST['email'])?$_POST['email']:'';
 			$error = "";
 			if (isset($_POST['add']))
 			{
 				$disp = 'block;';

 				if (empty($name) or empty($text))
 				{
 					$error.= "<p style='color:red;'>Не заполнены обязательные поля</p>";
 				}
 				elseif ($this->testEmail($email)==false)
 				{
 					$error.= "<p style='color:red;'>Не правильнно введён Email адрес</p>";
 				}
 				if (empty($error))
 				{
 					$newId = $this->addComment(array("id"=>$id, "name"=>strip_tags($name), "email"=>$email, "text"=>strip_tags($text)));
 					header("Location: http://www.brainbag.ru/blog/$id#$newId");
 				}
 			}
 			else{$disp="none;";}
 			
 			
 			
 			$d.="<p>
			$error
			<a name='Comments'></a>
			<form method='post'  id='comment' style='display:$disp'>
			<table width='500'>
			<tr>
			<td><b>Ваше Имя:</b></td>
			<td><input type='text' name='name' size='30' value='$name'></td>
			</tr>
			<tr>
			<td><b>Ваш Email:</b></td>
			<td><input type='text' name='email' size='40' value='$email'></td>
			</tr>
			<tr>
			<td style='vertical-align:top;'><b>Текст сообщения:</b></td>
			<td><textarea name='text' rows='10' cols='50'>$text</textarea></td>
			</tr>
			<tr>
			<td colspan='2' align='center'><br><center><input type='submit' name='add' value='Добавить комментарий'></center></td>
			</tr>
			</table>
			</form>
			<p>&nbsp;</p>
			</p> ";
 			$comm = mysql_query("select * from `comments_blog` where `blog`='$id'");
 			if (mysql_num_rows($comm)==0)
 			{
 				$d.="<p>Нет ни одного коментария</p>";
 			}
 			else{
 				while ($row = mysql_fetch_array($comm))
 				{
 					$date = @date("d/m/Y", $row['date']);
 					$d.='<div class="textblock" name="'.$row['id'].'">
 					<a name="'.$row['id'].'"></a>
               <p>Написал: '.$row['name'].'</p>
               <p>'.$row['text'].'</p>
               <div class="blog_bottom"> <span>Дата: '.$date.'</span></div>
             </div>
		     	';
 				}
 			}


 			return $d;
 		}
 		elseif (isset($_GET['tag']))
 		{
 			$tag = isset($_GET['tag'])?urldecode($_GET['tag']):'';
 			if (!empty($_GET['tag']))
 			{
 				$per_page = 10;
 				if (isset($_GET['page'])){$page=$_GET['page']-1;}else{$page=0;}
 				$stop = abs($per_page*$page);

 				$dateStart = strtotime(date("Y-m-01"));
 				$dateEnd= strtotime(date("Y-m-d H:i"));
 				//	select * from blog where `full` like '%$tag%' and `active`='1' ORDER BY `date` DESC
 				$showall2 = mysql_query("select * from `blog` where  `active`='1' and `full` like '%$tag%' ORDER BY `date` DESC");
 				$newsnum = mysql_num_rows($showall2);
 			    
 				
 				
 				
 				if ($newsnum == 0)
 				{
 					return "Нет ни одной записи";
 				}
 				else
 				{


 					$per_page = 5;
 					if (isset($_GET['limit']))
 					{
 						switch ($_GET['limit'])
 						{
 							case "5":$_SESSION['blog_limit']=5;
 							break;
 							case "10":$_SESSION['blog_limit']=10;
 							break;
 							case "15":$_SESSION['blog_limit']=15;
 							break;
 							default:$_SESSION['blog_limit']=5;
 							break;
 						}
 					}

 					if (isset($_SESSION['blog_limit']))
 					{
 						$per_page = $_SESSION['blog_limit'];
 					}

 					if (isset($_GET['page'])){$page=$_GET['page']-1;}else{$page=0;}
 					$stop = abs($per_page*$page);

 					$d= '<p class="zag_bl">Поиск по тегу "'.$tag.'"</p>';//'<div class="sobr_box" style="padding-right:10px;"><h2><span>Собрания</span></h2>';
 					//$s = dis("news", 'all');
 					//$d.= beforewhile($s, $vacancy, "news");
 					$showall = mysql_query("select * from blog where `full` like '%$tag%' and `active`='1' ORDER BY `date` DESC limit $stop,$per_page");
 					$d.=$this->navi($showall2, $per_page);
 					while ($row = mysql_fetch_array($showall))
 					{
 						$date = @date("d/m/Y", $row['date']);
 						$tg = explode("," ,$row['full']);
 						$z=0;
 						$tags="";
 						foreach ($tg as $tag)
 						{
 							$tag2 = $this->normTag($tag);
 							$z++;
 							if ($z == 1)
 							{
 								$tr = "";
 							}else{$tr=', ';}
 							$tags .= $tr.'<a href="?blog&tag='.$tag2.'">'.$tag.'</a>';
 						}


 						$d.='<div class="textblock">
               <p class="zag_bl">'.$row['title'].'</p>
               <p>'.$row['anons'].' &nbsp;<a href="?blog='.$row['id'].'">читать далее</a></p>
               <div class="blog_bottom"> <span>Дата: '.$date.'</span> '.$tags.'</div>
             </div>
			';
 					}
 					//$d.='</table>';

 					$showall = mysql_query("select * from blog where `active`='1' ORDER BY `date` DESC ");
 					$newsnum = mysql_num_rows($showall);
 					if (isset($_GET['str'])){$page=$_GET['str'];}elseif(isset($page) && $page==0){$page=1;}else{$page=1;}

 					$nn = abs($newsnum/$start);
 					if ($nn >= 1)
 					{
 						$d.='<center><b>Страницы</b><br>';
 						for ($i=1; $i<=$nn; $i++)
 						{
 							if ($i == $page)
 							{
 								$d.="<b>$i</b> &nbsp;|&nbsp;";
 							}
 							else
 							{
 								$d.="<a href='?blog&str=$i'>$i</a>&nbsp;|&nbsp;";
 							}
 						}
 						$d.='</center>';
 					}
 					//$d.="</div>";
 					return $d;
 				}
 			}
 		}
 		else
 		{

 			if (isset($_GET['date']))
 			{
 				$dateStart = strtotime(date("Y-m-01", strtotime($_GET['date'])));
 				$dateEnd = strtotime("+1 month", $dateStart);
 			}
 			elseif (isset($_GET['year'])) {
 				$dateStart = strtotime(date("Y-01-01", strtotime($_GET['year']."-01-01")));
 				$dateEnd = strtotime("+12 month", $dateStart);
 				//echo date("Y-m-d", $dateStart)."----".date("Y-m-d", $dateEnd);
 			}
 			else
 			{
 				$dateStart = strtotime(date("Y-m-01"));
 				$dateEnd= strtotime(date("Y-m-d H:i"));
 			}

 			$per_page = 5;
 			if (isset($_GET['limit']))
 			{
 				switch ($_GET['limit'])
 				{
 					case "5":$_SESSION['blog_limit']=5;
 					break;
 					case "10":$_SESSION['blog_limit']=10;
 					break;
 					case "15":$_SESSION['blog_limit']=15;
 					break;
 					default:$_SESSION['blog_limit']=5;
 					break;
 				}
 			}

 			if (isset($_SESSION['blog_limit']))
 			{
 				$per_page = $_SESSION['blog_limit'];
 			}




 			if (isset($_GET['page'])){$page=$_GET['page']-1;}else{$page=0;}
 			$stop = abs($per_page*$page);
 			//echo "select * from `blog` where `date`>='$dateStart' and `date`<='$dateEnd' and `active`='1' ORDER BY `date` DESC";
 			$showall2 = mysql_query("select * from `blog` where `date`>='$dateStart' and `date`<='$dateEnd' and `active`='1' ORDER BY `date` DESC");
 			$newsnum = mysql_num_rows($showall2);
 			
 			if ($newsnum==0)
 			{
 				
 				   $showall2 = mysql_query("select * from `blog` where `active`='1' ORDER BY `date` DESC");
 				$newsnum = mysql_num_rows($showall2);
 			}
 			//	echo "$newsnum";
 			if ($newsnum == 0)
 			{
 				
 					return "Нет ни одной записи";
 				
 				
 			}
 			else
 			{


 				if (isset($_GET['page'])){$page=$_GET['page']-1;}else{$page=0;}
 				$stop = abs($per_page*$page);

 				$showall = mysql_query("select * from `blog` where `date`>='$dateStart' and `date`<='$dateEnd' and `active`='1' ORDER BY `date` DESC limit $stop, $per_page");
 				if (mysql_num_rows($showall)<1)
 				{
 					$showall = mysql_query("select * from `blog` where `active`='1' ORDER BY `date` DESC limit $stop, $per_page");
 				}
 		
 				$d.=$this->navi($showall2, $per_page);
 				while ($row = mysql_fetch_array($showall))
 				{
 					$date = @date("d/m/Y", $row['date']);
 					$tg = explode("," ,$row['full']);
 					$z=0;
 					$tags="";
 					foreach ($tg as $tag)
 					{
 						$tag2 = $this->normTag($tag);
 						$z++;
 						if ($z == 1)
 						{
 							$tr = "";
 						}else{$tr=', ';}
 						$tags .= $tr.'<a href="?blog&tag='.$tag2.'">'.$tag.'</a>';
 					}


 					$d.='<div class="textblock">
               <p class="zag_bl">'.$row['title'].'</p>
               <p>'.$row['anons'].' &nbsp;<a href="?blog='.$row['id'].'">читать далее</a></p>
               <div class="blog_bottom"> <span>Дата: '.$date.'</span> '.$tags.'</div>

             </div>
			';
 				}
 				//$d.='</table>';
 				return $d;
 			}
 			//$d.="</div>";
 			echo $d;
 			return $d;
 		}
 	}

 	function navi($sql, $per_page=5)
 	{

 		if (isset($_GET['year'])){
 			$year="&year=$_GET[year]";
 		}else{$year="";}
 		if (isset($_GET['date'])){
 			$date = "&date=$_GET[date]";
 		}else{$date="";}
 		if (isset($_GET['tag'])){$tag="&tag=$_GET[tag]";}else{$tag="";}
 		if (isset($_SESSION['blog_limit']))
 		{
 			switch ($_SESSION['blog_limit'])
 			{
 				case "5": $limit = '<span>5</span> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=10">10</a> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=15">15</a>';
 				break;
 				case "10":$limit = '<a href="?blog'."{$date}{$year}{$tag}".'&limit=5">5</a> | <span>10</span> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=15">15</a>';
 				break;
 				case "15": $limit = '<a href="?blog'."{$date}{$year}{$tag}".'&limit=5">5</a> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=10">10</a> | <span>15</span>';
 				break;
 				default:$limit = '<span>5</span> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=10">10</a> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=15">15</a>';
 				break;
 			}
 		}
 		else
 		{
 			$limit = '<span>5</span> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=10">10</a> | <a href="?blog'."{$date}{$year}{$tag}".'&limit=15">15</a>';
 		}
 		$start=1;
 		$pages = "";
 		$count = $sql;
 		$num_pages = ceil(mysql_num_rows($count)/$per_page);

 		if ($num_pages == 1 or $num_pages == 0)
 		{
 			$pages = "<span>1</span>";
 		}
 		elseif ($num_pages>1)
 		{
 			if (isset($_GET['page']))
 			{
 				$start=$_GET['page']-3;
 				if ($start<1){$start=1;}
 				$end = $_GET['page']+3;
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
 			for ($i=$start; $i<=$end;$i++)
 			{
 				if ($st==$i)
 				{
 					$pages .= "<span>$i</span> &nbsp; ";
 				}
 				else
 				{
 					$pages .= "<a href='?blog{$date}{$year}&page=$i'>$i</a> &nbsp; ";
 				}
 				if ($i!=$end)
 				{
 					$pages .= "| &nbsp;";
 				}
 			}

 		}
 		return "<div class=\"option\"><strong>Выводить по:</strong>&nbsp;&nbsp;$limit &nbsp;&nbsp;&nbsp;&nbsp; <strong>Страница:</strong>&nbsp;&nbsp; $pages</div>";
 	}
 	function date_rus($month)
	{
		switch ($month)
		{
			case '01':$month = "январь";
			break;
			case '02':$month = "февраль";
			break;
			case '03':$month = "март";
			break;
			case '04':$month = "апрел";
			break;
			case '05':$month = "май";
			break;
			case '06':$month = "июнь";
			break;
			case '07':$month = "июль";
			break;
			case '08':$month = "август";
			break;
			case '09':$month = "сентябрь";
			break;
			case '10':$month = "октябрь";
			break;
			case '11':$month = "ноябрь";
			break;
			case '12':$month = "декабрь";
			break;
		}
		return $month;
	}
 }


 class blog_admin extends admin {
 	function __construct()
 	{

 	}
 	protected  function UpdateActiveblog()
 	{
 		$id = $_POST['Id'];
 		$Active = $_POST['Active'];
 		$query = "UPDATE `blog` SET active='$Active' WHERE id='$id'";
 		mysql_query($query);
 		echo '33';
 	}
 	protected  function Addblog()
 	{

 		$date = @strtotime($_POST['date']);
 		if ($_POST['text'] == null)
 		{
 			echo '{failure:true, mm:1}';
 			exit();
 		}
 		else
 		{

 			mysql_query("insert into blog values('', '$date', '".addslashes($_POST['title'])."', '".addslashes($_POST['anons'])."' , '".addslashes($_POST['text'])."', '".addslashes($_POST['full'])."', '1', '')");
 			$id = mysql_insert_id();
 			if (isset($_FILES['photo-path']))
 			{
 				$uploaddir =  $_SERVER['DOCUMENT_ROOT']."/files/blog/";
 				$p=pathinfo(basename($_FILES['photo-path']['name']));
 				$ext = $p['extension'];
 				$uploadfile = $uploaddir ."$id.$ext";
 				$name3 = "$id.$ext";
 				$name2 =  basename($_FILES['photo-path']['name']);
 				if(eregi('.jpg', $name2) || eregi('.gif', $name2) || eregi('.png', $name2))
 				{
 					if (move_uploaded_file($_FILES['photo-path']['tmp_name'], $uploadfile)) {
 						$img = $name3;
 						mysql_query("update blog set `img`='$img' where `id`='$id'");
 					}
 				}
 			}
 			echo '{success:true}';
 			exit();
 		}
 	}
 	protected function Listingblog()
 	{
 		$sql_count = "SELECT * FROM blog";
 		$sql = $sql_count . " LIMIT ". (int) $_POST['start'].", ". (int) $_POST['limit'];
 		$rs_count = mysql_query($sql_count);
 		$rows = mysql_num_rows($rs_count);
 		$rs = mysql_query($sql);
 		if ($rows>0)
 		{
 			while($obj = mysql_fetch_array($rs))
 			{
 				$zs =  mysql_query("select * from `comments_blog` where `blog`='$obj[id]'");
 				$arr['id'] = $this->en($obj['id']);
 				$arr['date'] = @date('d-m-Y', $obj['date']);
 				$arr['title'] = $this->en($obj['title']);
 				$arr['text'] = $this->en($obj['text']);
 				$arr['anons'] = $this->en($obj['anons']);
 				$arr['full'] = $this->en($obj['full']);

 				$arr['comments'] = mysql_num_rows($zs);
 				$arr['link'] = "?blog=".$obj['id'];
 				$arr['active'] = $this->en($obj['active']);
 				$new[] = $arr;
 				unset($arr);
 			}
 			$jsonresult = $this->JEncode($new);
 			echo $_GET['callback'].'({"total":"'.$rows.'","results":'.$jsonresult.'})';
 		}
 		else
 		{
 			echo '({"total":"0", "results":""})';
 		}
 	}
 	protected function ListingComments()
 	{
 		$sql_count = "SELECT * FROM comments_blog where `blog`='$_POST[id]'";
 		$sql = $sql_count . " LIMIT ". (int) $_POST['start'].", ". (int) $_POST['limit'];
 		$rs_count = mysql_query($sql_count);
 		$rows = mysql_num_rows($rs_count);
 		$rs = mysql_query($sql);
 		if ($rows>0)
 		{
 			while($obj = mysql_fetch_array($rs))
 			{

 				$arr['id'] = $this->en($obj['id']);
 				$arr['date'] = @date('d-m-Y', $obj['date']);
 				$arr['name'] = $this->en($obj['name']);
 				$arr['text'] = $this->en($obj['text']);
 				$arr['email'] = $this->en($obj['email']);
 				//$arr['link'] = "?blog=".$obj['id'];
 				//	$arr['active'] = $this->en($obj['active']);
 				$new[] = $arr;
 				unset($arr);
 			}
 			$jsonresult = $this->JEncode($new);
 			echo $_GET['callback'].'({"total":"'.$rows.'","results":'.$jsonresult.'})';
 		}
 		else
 		{
 			echo '({"total":"0", "results":""})';
 		}
 	}
 	protected function Updateblog()
 	{
 		$date = @strtotime($_POST['date']);
 		if ($_POST['text'] == null)
 		{
 			echo '{failure:true, mm:1}';
 			exit();
 		}
 		else
 		{
 			if (isset($_FILES['photo-path']))
 			{
 				$id= $_POST['id'];
 				$uploaddir =  $_SERVER['DOCUMENT_ROOT']."/files/blog/";
 				$p=pathinfo(basename($_FILES['photo-path']['name']));
 				$ext = $p['extension'];
 				$uploadfile = $uploaddir ."$id.$ext";
 				$name3 = "$id.$ext";
 				$name2 =  basename($_FILES['photo-path']['name']);
 				if(eregi('.jpg', $name2) || eregi('.gif', $name2) || eregi('.png', $name2))
 				{
 					if (move_uploaded_file($_FILES['photo-path']['tmp_name'], $uploadfile)) {
 						$img = $name3;
 						mysql_query("update blog set `img`='$img' where `id`='$id'");
 					}
 				}
 			}
 			$title = addslashes($_POST['title']);
 			$text = addslashes($_POST['text']);
 			$full = addslashes($_POST['full']);
 			$anons = addslashes($_POST['anons']);
 			mysql_query("update blog set `date`='$date', `title`='$title', `text`='$text', `full`='$full', `anons`='$anons' where id=$_POST[id]");
 			echo '{success:true}';
 			exit();
 		}
 	}

 	protected function UpdateComment()
 	{
 		//$date = @strtotime($_POST['date']);
 		if ($_POST['text'] == null)
 		{
 			echo '{failure:true, mm:1}';
 			exit();
 		}
 		else
 		{
 			$title = addslashes($this->encode($_POST['name']));
 			$text = addslashes($this->encode($_POST['text']));
 			mysql_query("update comments_blog set  `name`='$title', `text`='$text' where id=$_POST[id]");
 			echo '{success:true}';
 			exit();
 		}
 	}
 	protected function Deleteblog()
 	{
 		mysql_query("delete from `blog` where `id`='$_POST[id]'");
 		mysql_query("delete from `comments_blog` where `blog`='$_POST[id]'");
 		echo "55";
 	}
 	protected function DeleteComment()
 	{
 		mysql_query("delete from `comments_blog` where `id`='$_POST[id]'");
 		echo "55";
 	}
 }
?>
