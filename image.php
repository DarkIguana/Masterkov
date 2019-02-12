<?php
if (isset ( $_GET ['black'] ) && isset ( $_GET ['crop'] ) && isset ( $_GET ['image'] ) && ! empty ( $_GET ['image'] ) && file_exists ( dirname ( __FILE__ ) . "/" . urldecode ( $_GET ['image'] ) )) {
	header ( "Content-Type: image/jpeg" );
	$filename = pathinfo ( $_GET ['image'], PATHINFO_BASENAME );
	$path = pathinfo ( $_GET ['image'], PATHINFO_DIRNAME );
	$width = isset ( $_GET ['width'] ) ? ( int ) $_GET ['width'] : 0;
	$height = isset ( $_GET ['height'] ) ? ( int ) $_GET ['height'] : 0;
	
	$bg = ImageEditor::MaskImage ( dirname ( __FILE__ ) . "/" . urldecode ( $_GET ['image'] ) );
	$bg->setImageColorSpace(Imagick::COLORSPACE_GRAY); 
	echo $bg;
	$bg->setImageColorSpace(Imagick::COLORSPACE_GRAY); 
	mkdir ( dirname ( __FILE__ ) . "/thumbs/black/crop/{$width}x{$height}/" . $path, 0777, true );
	$f = fopen(dirname ( __FILE__ ) . "/thumbs/black/crop/{$width}x{$height}/{$path}/{$filename}" , 'a+');
	fwrite($f, $bg);
	fclose($f);
	//$bg->writeImage ( dirname ( __FILE__ ) . "/thumbs/black/crop/{$width}x{$height}/{$path}/{$filename}" );
	chmod ( dirname ( __FILE__ ) . "/thumbs/black/crop/{$width}x{$height}/" . $path . '/' . $filename, 0666 );
	$bg->destroy ();
} elseif (isset ( $_GET ['crop'] ) && isset ( $_GET ['image'] ) && ! empty ( $_GET ['image'] ) && file_exists ( dirname ( __FILE__ ) . "/" . urldecode ( $_GET ['image'] ) )) {
	header ( "Content-Type: image/jpeg" );
	$filename = pathinfo ( $_GET ['image'], PATHINFO_BASENAME );
	$path = pathinfo ( $_GET ['image'], PATHINFO_DIRNAME );
	$width = isset ( $_GET ['width'] ) ? ( int ) $_GET ['width'] : 0;
	$height = isset ( $_GET ['height'] ) ? ( int ) $_GET ['height'] : 0;
	
	$bg = ImageEditor::MaskImage ( dirname ( __FILE__ ) . "/" . urldecode ( $_GET ['image'] ) );
	echo $bg;
	mkdir ( dirname ( __FILE__ ) . "/thumbs/crop/{$width}x{$height}/" . $path, 0777, true );
	$bg->writeImage ( dirname ( __FILE__ ) . "/thumbs/crop/{$width}x{$height}/{$path}/{$filename}" );
	chmod ( dirname ( __FILE__ ) . "/thumbs/crop/{$width}x{$height}/" . $path . '/' . $filename, 0666 );
	$bg->destroy ();
} elseif (isset ( $_GET ['image'] ) && ! empty ( $_GET ['image'] ) && file_exists ( getenv ( 'DOCUMENT_ROOT' ) . '/' . $_GET ['image'] )) {
	$width = isset ( $_GET ['width'] ) ? ( int ) $_GET ['width'] : 0;
	$height = isset ( $_GET ['height'] ) ? ( int ) $_GET ['height'] : 0;
	$water = isset ( $_GET ['water'] ) ? true : false;
	$image = new Imagick ();
	$image->readIMage ( getenv ( 'DOCUMENT_ROOT' ) . '/' . $_GET ['image'] );
	$filename = pathinfo ( $_GET ['image'], PATHINFO_BASENAME );
	$path = pathinfo ( $_GET ['image'], PATHINFO_DIRNAME );
	
	$iWidth = $image->getImageWidth ();
	$iHeight = $image->getImageHeight ();
	if ($width != 0 && $height != 0) {
		
		$bg = new Imagick ();
		$pixel = new ImagickPixel ( 'white' );
		
		$bg->newImage ( $width, $height, $pixel );
		$bg->setImageFormat ( 'jpeg' );
		
		if ($width <= $iWidth or $height <= $iHeight) {
			$image->thumbnailimage ( $width, $height, true );
		}
		
		$iWidth = $image->getImageWidth ();
		$iHeight = $image->getImageHeight ();
		
		if ($width < $iWidth) {
			$x = ($iWidth - $width) / 2;
		} else {
			$x = ($width - $iWidth) / 2;
		}
		if ($height < $iHeight) {
			$y = ($iHeight - $height) / 2;
		} else {
			$y = ($height - $iHeight) / 2;
		}
		$bg->setImageColorspace ( $image->getImageColorspace () );
		$bg->compositeImage ( $image, $image->getImageCompose (), $x, $y );
		$image = $bg;
	}
	
	if (file_exists ( "water.png" )) {
		$watermark = new Imagick ();
		$watermark->readImage ( "water.png" );
		// how big are the images?
		
		$wWidth = $watermark->getImageWidth ();
		$wHeight = $watermark->getImageHeight ();
		
		if ($iHeight < $wHeight || $iWidth < $wWidth) {
			// resize the watermark
			$watermark->scaleImage ( $iWidth, $iHeight );
			// get new size
			$wWidth = $watermark->getImageWidth ();
			$wHeight = $watermark->getImageHeight ();
		}
		
		$x = 0;
		$y = ($iHeight - $wHeight);
		
		$image->compositeImage ( $watermark, imagick::COMPOSITE_OVER, $x, $y );
		$watermark->destroy ();
	}
	
	header ( "Content-Type: image/jpeg" );
	header ( "Content-Type: image/jpeg" );
	$length = strlen ( $image );
	header ( 'Content-Length: ' . $length );
	echo $image;
	@mkdir ( dirname ( __FILE__ ) . "/thumbs/{$width}x{$height}/" . $path, 0777, true );
	$image->writeImage ( dirname ( __FILE__ ) . "/thumbs/{$width}x{$height}/{$path}/{$filename}" );
	chmod ( dirname ( __FILE__ ) . "/thumbs/{$width}x{$height}/" . $path . '/' . $filename, 0666 );
	$bg->destroy ();
	$image->destroy ();
}
class ImageEditor {
	static function MaskImage($SrcImage, $DstImage = '', $Position = 'center') {
		$image = new Imagick ();
		$image->readImage ( $SrcImage );
		
		$iWidth = $image->getImageWidth ();
		$iHeight = $image->getImageHeight ();
		$plusWidth = 0;
		$plusHeight = 0;
		$newWidth = isset ( $_GET ['width'] ) ? ( int ) $_GET ['width'] : 0;
		$newHeight = isset ( $_GET ['height'] ) ? ( int ) $_GET ['height'] : 0;
		$ratio = round ( (max ( $iWidth, $iHeight ) - min ( $iWidth, $iHeight )) / 2 );
		$is = true;
		if ($iWidth > $iHeight) {
			$plusWidth += $ratio;
			// $is = false;
		} elseif ($iWidth < $iHeight) {
			$plusHeight += $ratio;
			// $is = true;
		}
		
		$size = self::getResizeSize ( ($newWidth + $plusWidth), ($newHeight + $plusHeight), $iWidth, $iHeight, $is );
		if ($size [0] < $newWidth or $size [1] < $newHeight) {
			$size = self::getResizeSize ( ($newWidth + $plusWidth), ($newHeight + $plusHeight), $iWidth, $iHeight, false );
		}
		$image->thumbnailimage ( $size [0], $size [1] );
		
		$iWidth = $image->getImageWidth ();
		$iHeight = $image->getImageHeight ();
		
		$bg = new Imagick ();
		
		$pixel = new ImagickPixel ( 'white' );
		
		$bg->newImage ( $newWidth, $newHeight, $pixel );
		$bg->setImageFormat ( 'jpeg' );
		
		switch ($Position) {
			default :
				$x = ($newWidth - $iWidth) / 2;
				$y = ($newHeight - $iHeight) / 2;
		}
		
		$bg->setImageColorspace ( $image->getImageColorspace () );
		$bg->compositeImage ( $image, $image->getImageCompose (), $x, $y );
		// $bg->compositeImage ( $mask, $mask->getImageCompose (), 0, 0 );
		$image->destroy ();
		
		return $bg;
	}
	function getResizeSize($width, $height, $origWidth, $origHeight, $is = false) {
		$percent = 0.9;
		
		$fitwidth = intval ( ($width) );
		$fitheight = intval ( ($height) );
		
		$os = $originalsize = array (
				$origWidth,
				$origHeight 
		);
		
		if ($originalsize [0] > $fitwidth or $originalsize [1] > $fitheight) {
			$h = array (
					$origWidth,
					$origHeight 
			);
			
			if ($is == true) {
				$fitheight = $h [1] * $fitwidth / $h [0];
			} else {
				$fitwidth = $h [0] * $fitheight / $h [1];
			}
			
			return array (
					( int ) $fitwidth,
					( int ) $fitheight 
			);
		}
		return array (
				( int ) ($os [0]),
				( int ) ($os [1]) 
		);
	}
}


