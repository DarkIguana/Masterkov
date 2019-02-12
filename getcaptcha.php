<?php

	function getSecretCode()
	{
		
		$words = file('./captcha/dict.txt');
		$word = trim($words[rand(0, count($words))]);
		if(strlen($word) > 1)
			return $word;
		else {
			return getSecretCode();
		}
	}
	
	function write($x, $y, $text)
	{
		global $img;
		global $black;
		
		$text = iconv('windows-1251', 'UTF-8', $text);
		imagettftext($img, 25, 0, $x, $y, $black, './captcha/arialbd.ttf', $text);
	}	

	session_start();
	//session_register("secret_code");

	$r = getSecretCode();
	
	$_SESSION["secret_code"] = $r;

	for($i = 0; $i < strlen($r); $i++)
		$arr[$i] = substr($r, $i, 1);
		
	//$arr[rand(0, strlen($r) - 1)] = '*';
	
	$img = imagecreatefrompng('./captcha/bg.png');
	
	//$black = imagecolorallocate($img, 106, 106, 106);
	$black = imagecolorallocate($img, 0, 0, 0);
	
	if(count($arr) > 8)
		$left = 5;
	else
		$left = 15;
	
	for($i = 0; $i < count($arr); $i++)
	{
		$top = 35 - rand(0, 10);
		write($left, $top, $arr[$i]);
		$left += 22;
	}
	
	$noise = imagecreatefrompng('./captcha/noise.png');
	imagecopymerge ( $img, $noise, 0, 0, 0, 0, 235, 56, 67 );
	
	header('Content-type: image/png');
	imagepng($img);
	imagedestroy($img);