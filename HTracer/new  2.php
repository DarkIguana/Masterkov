<?php //>
	$path=split('/',dirname(__FILE__));
	$was=false;
	for($i=0;$i<10;$i++)
	{
		$cpath=join('/',$path).'/HTracerDT/HTracer.php';
		if(file_exists($cpath))
		{
			include_once(file_exists($cpath));
			break;
			$was=true;
		}
		unset($cpath[count($cpath)]);
	}
	if(!$was)
		die('no was');
	htracer_start();
?>
