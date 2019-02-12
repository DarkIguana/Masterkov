<?php 
 
		// This file was created automatically by options.php
		// DON`T CHANGE!!!
		
			if(!isset($GLOBALS["htracer_encoding"]) 
			 ||!$GLOBALS["htracer_encoding"] 
			 ||strtolower($GLOBALS["htracer_encoding"])==="auto"
			 ||strtolower($GLOBALS["htracer_encoding"])==="global")
				$GLOBALS["htracer_encoding"]="UTF-8";
		
		if(!isset($GLOBALS['htracer_test']))
			$GLOBALS['htracer_test']=false;
		if(!isset($GLOBALS['htracer_cash_days']))
			$GLOBALS['htracer_cash_days']=0;
		if(!isset($GLOBALS['htracer_mysql']))
			$GLOBALS['htracer_mysql']=false;
		if(!isset($GLOBALS['htracer_mysql_login']))
			$GLOBALS['htracer_mysql_login']='root';
		if(!isset($GLOBALS['htracer_mysql_pass']))
			$GLOBALS['htracer_mysql_pass']='';
		if(!isset($GLOBALS['htracer_mysql_dbname']))
			$GLOBALS['htracer_mysql_dbname']='seotest';
		if(!isset($GLOBALS['htracer_mysql_host']))
			$GLOBALS['htracer_mysql_host']='localhost';
		if(!isset($GLOBALS['insert_keywords_where']))
			$GLOBALS['insert_keywords_where']='meta_keys+img_alt+a_title';
		if(!isset($GLOBALS['hkey_insert_context_links']))
			$GLOBALS['hkey_insert_context_links']=false;
		if(!isset($GLOBALS['htracer_site_stop_words']))
			$GLOBALS['htracer_site_stop_words']='';
		if(!isset($GLOBALS['htracer_context_links_b']))
			$GLOBALS['htracer_context_links_b']=false;
		if(!isset($GLOBALS['htracer_trace']))
			$GLOBALS['htracer_trace']=true;
		if(!isset($GLOBALS['htracer_trace_double_not_first_page']))
			$GLOBALS['htracer_trace_double_not_first_page']=false;
		if(!isset($GLOBALS['htracer_trace_double_comercial_query']))
			$GLOBALS['htracer_trace_double_comercial_query']=false; 
 ?>