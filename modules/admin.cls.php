<?php
class admin_admin extends admin {
	function __construct() {
	
	}
	function loadTree() {
		$sql = mysql_query ( "select `Name`, `Pos` from `modulesPath` order by `Pos` " );
		
		$tree = array ();
		while ( $row = mysql_fetch_array ( $sql ) ) {
			
			$mod = mysql_query ( "select * from `modules` where `ModulePath`='$row[Name]' and `Active`='1' order by `Pos` asc" );
			if (mysql_num_rows ( $mod ) > 0) {
				$tmp = array ();
				$childrens = array ();
				
				while ( $m = mysql_fetch_array ( $mod ) ) {
					$children = array ();
					$children ['text'] = $this->en ( $m ['Name'] );
					$children ['id'] = $m ['ModuleID'];
					$children['leaf'] = true;
					if (!eregi("/", $m['Module_Icon']))
					{
						$children['iconCls'] = $m['Module_Icon'];
					}
					else
					{
					$children ['icon'] = $m ['Module_Icon'];
					}
					$childrens [] = $children;
				}
				$tmp ['text'] = $this->en ( $row ['Name'] );
				$tmp ['exapnded'] = true;
				$tmp ['children'] = $childrens;
				$tree [] = $tmp;
			}
		}
		
		$tree[] = array("text"=>$this->en("Настройки сайта"), "icon"=>"core/icons/bullet_wrench.png", "leaf"=>true, "id"=>"site_settings");
		$tree[] = array("text"=>$this->en("Настройка модулей"), "icon"=>"core/icons/door_out.png", "leaf"=>true, "id"=>"install");
		$tree[] = array("text"=>$this->en("Выход"), "icon"=>"core/icons/door_out.png", "leaf"=>true, "id"=>"exit");
		echo $this->JEncode ( $tree );
	}
	function AllModules()
	{
		$dir = $_SERVER['DOCUMENT_ROOT']."/modules/";
		$d = dir($dir);
		$modules = array();
		$rows=0;
		while ($name = $d->Read())
		{
		    $tmp = array();
			if (is_file($dir.$name))
			{
				$p = pathinfo($name);
				$file = preg_replace("/.cls/is", "",$p['filename']);
				if ($name== ".htaccess"){continue;}
				require_once $dir.$name;
				
				$class = "{$file}_admin";
				if (class_exists($class))
				{
					$rows++;
				   $cls = new $class();
				   if (method_exists($cls,"InstallModule"))
				   {
				   	$sql = mysql_query("select * from `modules` where `ModuleID`='{$cls->ModuleID}'");
				   	if (mysql_num_rows($sql)>0)
				   	{
				   		$row = mysql_fetch_array($sql);
				   		$tmp['id'] = $row['Id'];
				   		$tmp['installed']=1;
				   		//$cls->InstallModule();
				   	//	$sql = mysql_query("select * from `modules` where `ModuleID`='{$cls->ModuleID}'");
				   	}
				   	else
				   	{
				   	    $tmp['id'] =  $this->en($cls->ModuleID);
				   		$tmp['installed']=0;
				   	}
				   	  $row = mysql_fetch_array($sql);
				   	  if ($tmp['installed']==1)
				   	  {
				   	  	$tmp['Name'] = "<b>".$this->en($cls->ModuleName)."</b>";
				   	  }
				   	  else
				   	  {
				   	   $tmp['Name'] = $this->en($cls->ModuleName);
				   	  }
				   	   $tmp['ModuleId'] = $this->en($cls->ModuleID);
				   	   $tmp['Global']=$cls->Global;
				   	   $tmp['file']=$name;
				   	   $tmp['cls']=$class;
				   	   $modules[] = $tmp;
				   	  //$cls->InstallModule();
				   }
				}
			}
		}
		$d->close();
	if ($rows>0)
		{
			$jsonresult= $this->JEncode($modules);
			echo '({"total":"'.$rows.'","results":'.$jsonresult.'})';
		}
		else
		{
			echo '({"total":"0", "results":""})';
		}
	}
	function installModuleAdmin()
	{
		if (file_exists("modules/$_POST[file]"))
		{
			require_once 'modules/'.$_POST['file'];
			if (class_exists($_POST['cls']))
			{
				$cls = new $_POST['cls']();
		        $cls->InstallModule();
			}
		}
	}
    function deleteModuleAdmin()
	{
		if (file_exists("modules/$_POST[file]"))
		{
			require_once 'modules/'.$_POST['file'];
			if (class_exists($_POST['cls']))
			{
				$cls = new $_POST['cls']();
			$cls->DeleteModule();
			}
		}
	}
}
?>