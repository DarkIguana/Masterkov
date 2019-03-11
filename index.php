<?php
session_start ();
session_cache_limiter ( 'nocache' );
// header('Content-Type: text/html; charset=utf-8');
require "classes/global.php";
/*
if (preg_match ( '#//|/$#', getenv ( 'REQUEST_URI' ) )) {
	header ( "HTTP/1.x 404 Not Found" );
}
*/

if(strlen(getenv('REQUEST_URI'))>3 && substr(getenv('REQUEST_URI'), -1)=='/'){
	header("HTTP/1.x 404 Not Found");
	include($_SERVER['DOCUMENT_ROOT']."/404.html");
	exit;
}

$r301=array(

		'/akcii'=> '/shtukaturno-malyarnye-raboty',
		'/index.php' => '/',
		'/index.html' => '/'
);

foreach($r301 as $key=>$value)
{
	if (getenv('REQUEST_URI')==$key)
	{
		header('HTTP/1.1 Moved Permanently');
		header("Location: {$value}");
		exit();
	}
}

$glb = new glb ();
$glb->view ();

mysql_close ();
