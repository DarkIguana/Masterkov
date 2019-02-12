<?php 
class wdg_htracer {
	var $over = '';
	function __construct(){
		include(dirname(dirname(dirname(__FILE__))).'/HTracer/HTracer.php');
		$this->over = get_keys_cloud("style=ul_list 5/50");
	}
}