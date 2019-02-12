<?
class poll_admin extends admin
{
var $Version="1.35";
	var $Pos = 4;
	var $ModuleName = "Опросы";
	var $PathModule = "Разделы сайта";
	var $ModuleID = "poll";
	var $PathPos = "0";
	var $File = "poll.js";
	var $Global = 0;
	var $Icon = "poll";
  function InstallModule()
	{
		$sql = mysql_query("select * from `modules` where `ModuleID`='{$this->ModuleID}'");
		$sql2 = mysql_query("select * from `modulesPath` where `Name`='{$this->PathModule}'");
		if (mysql_num_rows($sql2)==0)
		{
			mysql_query("insert into `modulesPath` values ('', '{$this->PathModule}', '{$this->PathPos}')");
		}
		if (mysql_num_rows($sql) == 0)
		{
			mysql_query("insert into `modules` (`Name`, `ModulePath`, `ModuleID`, `Version`, `File`, `Active`, `isGlobal`, `Module_Icon`, `Pos`) value ('$this->ModuleName', '$this->PathModule', '{$this->ModuleID}', '$this->Version', '{$this->File}', '1', '{$this->Global}', '{$this->Icon}', '$this->Pos')");
		}
		else
		{
			$row = mysql_fetch_array($sql);
			if ($row['Version'] != $this->Version)
			{
			mysql_query("update `modules` set `Version`='$this->Version' where `Id`='$row[Id]'");
			}
		}
	}
function DeleteModule()
	{
		mysql_query("delete from `modules` where `ModuleID`='{$this->ModuleID}'");
		$sql2 = mysql_query("select * from `modulesPath` where `Name`='{$this->PathModule}'");
		if (mysql_num_rows($sql2)==0)
		{
			mysql_query("delete from `modulesPath` where `Name`='{$this->PathModule}'");
		}
	}
	function __construct()
	{
		if (!isset($_SESSION['admin']))
		{
			exit();
		}
	}

	function save()
	{
		$s = mysql_query("select * from polls where active='1'");
		$r = mysql_fetch_array($s);
		$d = mysql_query("update polls set active='2' where id='$r[id]'");
		$q = addslashes($this->encode($_POST['quest']));
		$sql = mysql_query("insert into polls values ('', '$q', '1')") or die('eror');
		$id = mysql_insert_id();
		for ($i=1; $i<11; $i++)
		{
			if (isset($_POST['ans_'.$i]) && $_POST['ans_'.$i] != null)
			{
				$ans = addslashes($this->encode($_POST['ans_'.$i]));
				mysql_query("insert into poll_ans (`id_q`, `ans`) values ('$id', '$ans')");
			}
		}
	}
	function UPACT()
	{
		if (isset($_POST['id']) && $_POST['id'] != null)
		{
			mysql_query("update poll_ans set active='$_POST[active]' where id='$_POST[id]'");
		}
	}
	function loadds()
	{
		$sql_count = "SELECT * FROM polls ORDER BY `id` DESC";
		$sql = $sql_count . " LIMIT ". (int) $_POST['start'].", ". (int) $_POST['limit'];
		$rs_count = mysql_query($sql_count);
		$arr = array();
		$arr2=array();
		$rows = mysql_num_rows($rs_count);
		$rs = mysql_query($sql);
		if ($rows>0)
		{
			while($o = mysql_fetch_array($rs))
			{
				$arr2['id'] = $o['id'];
				$arr2['quest'] = $this->en($o['quest']);
				$arr2['active'] = $this->en($o['active']);
				$arr[] = $arr2;
			}
			$jsonresult = $this->JEncode($arr);
			echo '({"total":"'.$rows.'","results":'.$jsonresult.'})';
		}
		else
		{
			echo '({"total":"0", "results":""})';
		}
	}
	function load2form()
	{
		$sql = mysql_query("select * from polls where id='$_POST[id]'");
		$row =  mysql_fetch_array($sql);
		$sql2 = mysql_query("select * from poll_ans where id_q='$row[id]' order by `id` asc");
		$i = 0;
		$s['quest'] = $this->en($row['quest']);
		$s['id'] = $row['id'];
		while ($r = mysql_fetch_array($sql2))
		{
			$i++;
			$s['ansid_'.$i] = $r['id'];
			$s['ans_'.$i] = $this->en($r['ans']);
			$s['ansact_'.$i] = $r['active'];
		}
		$my= array('success'=>true,'data' => $s);
		echo $this->JEncode($my);
	}
	function editsave()
	{
		mysql_query("update polls set quest='".$this->encode($_POST['quest'])."' where id='$_POST[id]'");
		for ($i=1; $i<11; $i++)
		{
			if (isset($_POST['ans_'.$i]) && isset($_POST['ansid_'.$i]) && $_POST['ans_'.$i] != null && $_POST['ansid_'.$i] == null)
			{
				$ans = $this->encode($_POST['ans_'.$i]);
				mysql_query("insert into poll_ans (`id_q`, `ans`) values ('$_POST[id]', '$ans')");
			}
			else
			{
				if (isset($_POST['ans_'.$i]) && isset($_POST['ansid_'.$i]) && $_POST['ansact_'.$i])
				{
					$ans = $this->encode($_POST['ans_'.$i]);
					$idans = $_POST['ansid_'.$i];
					$act = $_POST['ansact_'.$i];
					if ($act == null)
					{
						$act = 0;
					}
					mysql_query("update poll_ans set ans='$ans', active='$act' where id='$idans'");
				}
			}

		}
		echo "{success:true}";
	}
	function poll_results()
	{
		if (isset($_POST['id']))
		{
			$t = 0;
		$sql = mysql_query("select * from polls where `id`='$_POST[id]'");
		$row = mysql_fetch_array($sql);
		$sql2 = mysql_query("select * from poll_ans where id_q='$row[id]' order by `id` asc");
		$arr = array();
		$a = array();
		$s = mysql_query("select * from poll_ans where id_q='$row[id]'");
			while ($g = mysql_fetch_array($s))
	{
		$t += $g['polls'];
	}
			while ($r = mysql_fetch_array($sql2))
			{
				if ($t >0)
				{
					$ff = intval(round(($r['polls']/$t)*100));
				}
				else
				{
					$ff = 0;
				}
				$a['ans'] = $this->en($r['ans']);
				$a['proc'] = $ff; 
				$arr[] = $a;
			}
			$t_ans = count($arr);
			echo "{success:true, quest:'{$row['quest']}', total:'$t', t_ans:'$t_ans', answers:{$this->JEncode($arr)}}";
		}
		
	}
	function UPDATE()
	{
		if (isset($_POST['Active']) && $_POST['Active'] == '2')
		{
			$d = mysql_query("update polls set active='2' where id='$_POST[Id]'");
			echo "33";
		}
		else
		{
			$s = mysql_query("select * from polls where active='1'");
			$r = mysql_fetch_array($s);
			$d = mysql_query("update polls set active='2' where id='$r[id]'");
			mysql_query("update polls set active='1' where id='$_POST[Id]'");
			echo "33";
		}
	}
	function DELETE()
	{
		mysql_query("delete from poll_ans where id_q='$_POST[id]'") or die("1");
		mysql_query("delete from polls where id='$_POST[id]'") or die("2");
		echo "55";
	}
}
?>