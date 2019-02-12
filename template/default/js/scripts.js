$(document).ready(function() {
	$('.text2 ul').jcarousel({
		scroll : 1
	});
	
	$('.top ul li:eq(3), .top ul li:last').addClass('w1');
	$('.top ul li:eq(4)').addClass('w2');
	$('.text2 ul li:nth-child(4n)').addClass('el4');

	$('.black_white').hover(function() {
		$(this).attr('src', $(this).attr('source'));
	}, function() {
		$(this).attr('src', $(this).attr('black'));
	});
	
	$('.callBackLink, .cb31').click(function() {
		var x = $('body').height();
		$('#fade').height(x + 20);
		$('#container2').fadeIn('slow');
		$('#fade').fadeTo('slow', 0.5);
		return false;
	});
	
	$('.callBackLink2').click(function() {
		var x = $('body').height();
		$('#fade').height(x + 20);
		$('#container3').fadeIn('slow');
		$('#fade').fadeTo('slow', 0.5);
		return false;
	});
	
	
	$('.closer21').click(function() {
		$('#fade, #container2, #container3').fadeOut('slow');
	});

	
	
});

$(window).load(function() {
	$('.slider1 ul').roundabout({
		minScale : 0.7
	});
});

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

	$('#reviewsb').live('click', function() {

		var up = $(this).attr('update');
		var id = $(this).attr('row');
		Ext.Ajax.request({
			url : '/reviews',
			params : {
				id : id,
				ajax : true,
				up : up
			},
			success : function(o) {
				if (up) {
					$('div.' + up).html(o.responseText);

				} else {
					$('div.text3').html(o.responseText);

				}
			}
		});

		return false;
	});
	
	
	$('.refresh').live('click', function() {

		var up = $(this).attr('update');
		var id = $(this).attr('row');
		Ext.Ajax.request({
			url : '/advice',
			params : {
				id : id,
				ajax : true,
				up : up
			},
			success : function(o) {
				if (up) {
					$('div.' + up).html(o.responseText);

				} else {
					$('div.text4').html(o.responseText);

				}
			}
		});

		return false;
	});
	

	/* placeholder */
	// $('input[placeholder], textarea[placeholder]').placeholder();
	/* prettyCheckboxes */
	/*
	 * $('input[type=checkbox]').prettyCheckboxes({ display: 'list' });
	 */
	/* zebra */
	$('.price tr:odd').addClass('zebra');
	$('a[href$=pdf]').each(function() {
		$(this).remove();
	});

})


hs.showCredits = 0;
hs.padToMinWidth = true;

// hs.align = 'center';
if (hs.registerOverlay) {
	// The white controlbar overlay
	hs.registerOverlay({
		thumbnailId : 'thumb3',
		overlayId : 'controlbar',
		position : 'top right',
		hideOnMouseOut : true
	});
	// The simple semitransparent close button overlay
	hs
			.registerOverlay({
				thumbnailId : 'thumb2',
				html : '<div class="closebutton"	onclick="return hs.close(this)" title="Close"></div>',
				position : 'top right',
				fade : 2
			// fading the semi-transparent overlay looks bad in IE
			});
}
if (hs.addEventListener && hs.Outline)
	hs.addEventListener(window, 'load', function() {
		new hs.Outline('rounded-white');
		new hs.Outline('glossy-dark');
	});

// The gallery example on the front page
var galleryOptions = {
	slideshowGroup : 'gallery',
	wrapperClassName : 'dark',
	// outlineType: 'glossy-dark',
	dimmingOpacity : 0.8,
	align : 'center',
	transitions : [ 'expand', 'crossfade' ],
	fadeInOut : true,
	wrapperClassName : 'borderless floating-caption',
	marginLeft : 100,
	marginBottom : 80,
	numberPosition : 'caption'

};

var imagesOptions = {
		//thumbnailId: 'thumb2', 
		slideshowGroup: 'group2',
		useBox: true,
		width: 1016,
		height: 677
	};


hs.dimmingOpacity = 0.8;
if (hs.addSlideshow) {
	hs.addSlideshow({
		// slideshowGroup: 'group1',
		interval : 5000,
		repeat : false,
		useControls : true,
		fixedControls : 'fit',
		overlayOptions : {
			position : 'bottom center',
			opacity : .75,
			hideOnMouseOut : true
		},
		thumbstrip : {
			position : 'above',
			mode : 'horizontal',
			relativeTo : 'expander'
		}
	});

}
