<?
class blocks_admin extends admin
{
    var $Version="1.0";
	var $Pos = 0;
	var $ModuleName = "Блоки";
	var $PathModule = "Управление дизайном";
	var $PathPos = "10";
	var $ModuleID = "blocks";
	var $File = "blocks.js";
	var $Global =0;
	var $Icon = "core/icons/package.png";
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
			exit("{failure:true, error:'login_failure'}");
		}
	}
	function Edit()
	{
		if (isset($_POST['name'])){$name =addslashes( $this->encode($_POST['name']));}else{$name="";}
		if (isset($_POST['title'])){$title = addslashes($this->encode($_POST['title']));}else{$title="";}
		if (isset($_POST['text'])){$text = addslashes($this->encode($_POST['text']));}else{$text="";}
		$id = $this->encode($_POST['id']);
		$test = mysql_num_rows(mysql_query("select * from blocks where name='$name' and `id` !='$id'"));

		if ($test == 1)
		{
			echo "66";
		}
		else
		{
			mysql_query("update blocks set `text`='$text', `name`='$name', `title`='$title' where id='$id'");
			echo "55";
		}
	}
	function Add()
	{
		if (isset($_POST['name'])){$name = addslashes($this->encode($_POST['name']));}else{$name="";}
		if (isset($_POST['title'])){$title = addslashes($this->encode($_POST['title']));}else{$title="";}
		if (isset($_POST['text'])){$text = addslashes($this->encode($_POST['text']));}else{$text="";}

		$sql = mysql_query("select * from blocks where name='$name'") or die("66");
		$test = mysql_num_rows($sql);

		if ($test != null)
		{
			echo "66";
		}
		else
		{
			mysql_query("insert into blocks (`name`, `title`, `text`) values ('$name', '$title', '$text')");
			echo "55";
		}
	}
	function DELETE()
	{
		mysql_query("delete from blocks where id='$_POST[id]'");
		echo "55";
	}
	function LISTING()
	{
		$sql_count = "SELECT * FROM blocks";
		$sql = $sql_count;
		$rs_count = mysql_query($sql_count);
		$rows = mysql_num_rows($rs_count);
		$rs = mysql_query($sql);
		$new = array();
		$arr = array();
		if ($rows>0)
		{
			while($obj = mysql_fetch_array($rs))
			{

				$arr['id'] = $this->en($obj['id']);
				$arr['name'] = $this->en($obj['name']);
				$arr['link'] = "{block_".$obj['name']."}";
				$arr['title'] = $this->en($obj['title']);
				$arr['text'] = $this->en($obj['text']);
				$new[] = $arr;
			}
			$jsonresult = $this->JEncode($new);
			echo '({"total":"'.$rows.'","results":'.$jsonresult.'})';
		}
		else
		{
			echo '({"total":"0", "results":""})';
		}
	}
}