$(document).ready(function(){
	/*placeholder*/
	$('input[placeholder], textarea[placeholder]').placeholder();
})
function init_dw_Scroll() {
    // arguments: id of scroll area div, id of content div
    var wndo = new dw_scrollObj('wn', 'lyr1');
    // args: id, axis ('v' or 'h'), eType (event type for arrows), 
    // bScrollbar (include track and dragBar? true or false)
    wndo.buildScrollControls('scrollbar', 'h', 'mouseover', true);
}

// if code supported, link in the style sheet (optional) and call the init function onload
if ( dw_scrollObj.isSupported() ) {
    //dw_Util.writeStyleSheet('css/scrollbar_h.css');
    dw_Event.add( window, 'load', init_dw_Scroll);
}