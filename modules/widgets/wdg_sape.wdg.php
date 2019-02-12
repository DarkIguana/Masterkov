<?php
class wdg_sape {
	var $over = "";
	function __construct() {
		if (! defined ( '_SAPE_USER' )) {
			define ( '_SAPE_USER', '7281c0b08dc76e5a342ef98fb0215ac1' );
		}
		
		require_once ($_SERVER ['DOCUMENT_ROOT'] . '/' . _SAPE_USER . '/sape.php');
		
		$sape = new SAPE_client ();
		
		$this->over = $sape->return_links ();
	}
}
