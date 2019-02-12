$(document).ready(function() {

	
	$('.galleryBlock ul').each(function() {
		$('li:gt(3)',this).hide();
	});
	
	$('.morePhotos').click(function() {
		$(this).prev().find('li:gt(3)').show();
		$(this).hide();
		$(this).next().show();
		return false;
	});
	
	$('.lessPhotos').click(function() {
		$(this).prev().prev().find('li:gt(3)').hide();
		$(this).hide();
		$(this).prev().show();
		return false;
	});
	
	
	});