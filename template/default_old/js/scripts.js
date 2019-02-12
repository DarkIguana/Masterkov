function init_dw_Scroll() {
	// arguments: id of scroll area div, id of content div
	var wndo = new dw_scrollObj('wn', 'lyr1');
	// args: id, axis ('v' or 'h'), eType (event type for arrows),
	// bScrollbar (include track and dragBar? true or false)
	wndo.buildScrollControls('scrollbar', 'h', 'mouseover', true);
}

// if code supported, link in the style sheet (optional) and call the init
// function onload
if (dw_scrollObj.isSupported()) {
	// dw_Util.writeStyleSheet('css/scrollbar_h.css');
	dw_Event.add(window, 'load', init_dw_Scroll);
}
$(document).ready(function() {

	$('.review-refresh').live('click', function() {
		Ext.Ajax.request({
			url : '/reviews',
			params : {
				id : $(this).attr('row'),
				ajax : true
			},
			success : function(o) {
				$('div.review').html(o.responseText);
			}
		});
		return false;
	});
	$('.advice-refresh').live('click', function() {
		var up = $(this).attr('update');
		var id = $(this).attr('row');
		Ext.Ajax.request({
			url : '/articles',
			params : {
				id : id,
				ajax : true,
				up:up
			},
			success : function(o) {
				if (up) {
					$('div.' + up).html(o.responseText);
				} else {
					$('div.advice').html(o.responseText);
				}
			}
		});
		return false;
	});

	/* placeholder */
	$('input[placeholder], textarea[placeholder]').placeholder();
	/* prettyCheckboxes */
	/*
	 * $('input[type=checkbox]').prettyCheckboxes({ display: 'list' });
	 */
	/* zebra */
	$('.price tr:odd').addClass('zebra');

	$('a[name=modal]').click(function(e) {
		e.preventDefault();
		var id = $(this).attr('href');

		var maskHeight = $(document).height();
		var maskWidth = $(window).width();

		$('#mask').css({
			'width' : maskWidth,
			'height' : maskHeight
		});

		$('#mask').fadeIn(700);

		var winH = $(window).height();
		var winW = $(window).width();

		$(id).css('top', winH / 2 - $(id).height() / 2);
		$(id).css('left', winW / 2 - $(id).width() / 2);

		$(id).fadeIn(1000);

	});

	$('.window .close').click(function(e) {
		e.preventDefault();
		$('#mask, .window').hide();
	});

	$('#mask').click(function() {
		$(this).hide();
		$('.window').hide();
	});
})