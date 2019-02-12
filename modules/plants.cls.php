<?php 
class plants extends glb{
	var $over = '';
	function __construct()
	{
		$_SESSION['Titles']['title'].=" / Все о растениях";
		$_SESSION['Road'] .= "<a href='?plants'>Все о растениях</a>";
		$nav="";
	$rus = "а,б,в,г,д,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,э,ю,я, все";
			$rus = explode(",", $rus);
			$alp = array();
			foreach ( $rus as $num => $b ) {
				if (! empty ( $b )) {
					$alp[$num]=$b;
					if (isset($_GET['alf']) && $_GET['alf'] == $num or !isset($_GET['alf']) && $num==28)
					{
						$nav .= "<span style='font-weight:bold;'><b>$b</b></span> &nbsp;&nbsp;";
					}
					else{
					$nav .= "<a href='?plants&alf=$num'><span>$b</span></a>&nbsp;&nbsp;";
					}
					if ($num == 16)
					{
						//$nav.="<br>";
					}
				}
			}
			$d="<div style='font-size:18px;'>$nav</div> <br /><br/>";
			
		if (isset($_GET['plants']) && is_numeric($_GET['plants']))
		{
			$id = (int)$_GET['plants'];
			$sql = mysql_query("select * from `articles` where `id`='$id' and `cat_id`='21' limit 1");
			if (mysql_num_rows($sql)>0)
			{
				$row =mysql_fetch_array($sql);
				$_SESSION['Titles']['title'].=" / $row[title]";
		        $_SESSION['Road'] .= " / <a href='?plants=$row[id]'>$row[title]</a>";
		        $d.="$row[full]";
				
			}
			else
			{
				$d.="<p>Растение не найдено</P>";
			}
			
			
		}
		else
		{
		
		$page = isset($_GET['page'])?(int)$_GET['page']-1:0;
			$limit = 150;
			$start = abs($limit*$page);
			
			if (isset($_GET['alf']) && $_GET['alf']!=28)
			{
			$alf = (int)$_GET['alf'];
			if (isset($alp[$_GET['alf']]))
				{
				$a = $alp[$_GET['alf']];
				}
				else
				{
					$a = "а";
				}
			$sql = mysql_query("select `id`, `title` from `articles` where `cat_id`='21' and `title` like '$a%'  order by `title` asc limit $start, $limit");
			$count = mysql_result(mysql_query("select COUNT(*) from `articles` where `cat_id`='21' and `title` like '$a%'"),0);
			}
			else {
			$sql = mysql_query("select `id`, `title` from `articles` where `cat_id`='21' order by `title` asc limit $start, $limit");
			$count = mysql_result(mysql_query("select COUNT(*) from `articles` where `cat_id`='21'"),0);
			}
			if ($count==0)
			{
				$this->over= "$d<p>Нет ни одной записи</p>";
				return true;
			}
			$d.="<table width='100%'>";
			$z=0;
			$v=0;
			$num = mysql_num_rows($sql);
			while ($row = mysql_fetch_array($sql))
			{
				$z++;
				$v++;
				if ($z==1)
				{
					$d.="<tr>";
				}
				$d.="<td><a href='?plants=$row[id]'>$row[title]</a></td>";
				if ($z==2 or $v==$num)
				{
					$d.="</tr>";
					$z=0;
				}
			}
			$d.="</table>";
			$page = isset($_GET['page'])?(int)$_GET['page']:1;
			$numPages = ceil($count/$limit);
			if ($numPages==0)
			{
				$numPages=1;
			}
			
			$d.="<br/><center>Страницы: <br/><br/>";
			for ($i = 1; $i<=$numPages;$i++)
			{
				if ($page==$i)
				{
				$d.="<b>$i</b>&nbsp;&nbsp;";
				}
				else
				{
					$d.="<a href='?plants&page=$i'>$i</a>&nbsp;&nbsp;";
				}
			}
			
		}
		$this->over=$d;
	}
}