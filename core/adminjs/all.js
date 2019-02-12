var start = {
	title:'Стартовая страница',
	html:''
}

var actions={};
var init_modules =new Array();
var init_nav_modules =new Array();
var init_nav_settings =new Array();

init_modules[init_modules.length] = start;

function htmled(m)
{
	if (m['width']){var width = m['width'];}else{var width = "100%";}
	if (m['height']){var height = m['height'];}else{var height = "";}
	if (m['label']){var label = m['label'];}else if (m['fieldLabel']){var label = m['fieldLabel'];}else{var label = "";}
	if (m['value']){var value = m['value'];}else{var value="";}
	if (m['addmod']){var addmod=m['addmod'];}else{var addmod="";}
	return {
		layout:'form',
	    autoHeight:true,
	    autoWidth:true,
		items:[{
		name:m['name'],
		//width:700,
		anchor:'100%',
		//autoHeight:true,
		height:height,
		fieldLabel: label,
		xtype: "tinymce",
		tinymceSettings: {
			convert_urls : 0,
			relative_urls : 0,
			forced_root_block : false,
	         force_br_newlines : true,
	         force_p_newlines : false,
            extended_valid_elements : "a[charset|coords|href|hreflang|name|rel|rev|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],abbr[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],acronym[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],address[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],applet[code|object|align|alt|archive|codebase|height|hspace|name|vspace|width|class|id|style|title],area[alt|coords|href|nohref|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],b[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],base[href|target],basefont[color|face|size|class|dir|id|lang|style|title],bdo[dir|class|id|lang|style|title],big[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],blockquote[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],body[alink|background|bgcolor|link|text|vlink|class|dir|id|lang|style|title|onclick|ondblclick|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onunload],br[class|id|style|title],button[disabled|name|type|value|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],caption[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],center[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],cite[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],code[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],col[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],colgroup[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],del[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dfn[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dir[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],div[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dl[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],em[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],fieldset[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],font[color|face|size|class|dir|id|lang|style|title],form[action|accept|accept-charset|enctype|method|name|target|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onreset|onsubmit],frame[frameborder|longdesc|marginheight|marginwidth|name|noresize|scrolling|src|class|id|style|title],frameset[cols|rows|class|id|style|title|onload|onunload],head[profile|dir|lang],h1[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h2[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h3[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h4[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h5[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h6[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],hr[align|noshade|size|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],html[xmlns|dir|lang],i[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],iframe[align|frameborder|height|longdesc|marginheight|marginwidth|name|scrolling|src|width|class|id|style|title],img[alt|src|align|border|height|hspace|ismap|longdesc|usemap|vspace|width|class|dir|id|lang|style|title|onabort|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],input[],ins[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],kbd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],label[for|accesskey|class|dir|id|lang|style|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],legend[align|accesskey|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],li[type|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],link[charset|href|hreflang|media|rel|rev|target|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],map[name|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],menu[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],meta[content|http-equiv|name|scheme|dir|lang],noframes[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],noscript[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],object[align|archive|border|classid|codebase|codetype|data|declare|height|hspace|name|standby|type|usemap|vspace|width|class|dir|id|lang|style|tabindex|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ol[compact|start|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],optgroup[label|disabled|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],option[disabled|label|selected|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],p[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],param[name|type|value|valuetype|id],pre[width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],q[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],s[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],samp[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],script[type|charset|defer|src|xml:space],select[disabled|multiple|name|size|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],small[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],span[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strike[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strong[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],style[type|media|dir|lang|title],sub[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],sup[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],table[align|bgcolor|border|cellpadding|cellspacing|frame|rules|summary|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tbody[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],td[abbr|align|axis|bgcolor|char|charoff|colspan|headers|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],textarea[cols|rows|disabled|name|readonly|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onselect],tfoot[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],th[abbr|align|axis|bgcolor|char|charoff|colspan|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],thead[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],title[dir|lang],tr[align|bgcolor|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],u[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ul[compact|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],var[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup]",
			theme : "advanced",
			plugins: "safari,pagebreak,filemanager, imagemanager,fullscreen,"+addmod+"style,layer,table,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
			theme_advanced_buttons1 : "insertfile,bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect,pasteword,bullist,numlist,outdent,indent,blockquote,forecolor,backcolor,sub,|,fullscreen",
			theme_advanced_buttons2 : "filemanager,imagemanager, undo,redo,link,unlink,anchor,image,cleanup,code,preview,tablecontrols,hr,removeformat,visualaid,advhr,print,insertlayer,moveforward,movebackward,absolute,cite,visualchars",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : false,
			extended_valid_elements : "a[charset|coords|href|hreflang|name|rel|rev|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],abbr[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],acronym[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],address[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],applet[code|object|align|alt|archive|codebase|height|hspace|name|vspace|width|class|id|style|title],area[alt|coords|href|nohref|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],b[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],base[href|target],basefont[color|face|size|class|dir|id|lang|style|title],bdo[dir|class|id|lang|style|title],big[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],blockquote[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],body[alink|background|bgcolor|link|text|vlink|class|dir|id|lang|style|title|onclick|ondblclick|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onunload],br[class|id|style|title],button[disabled|name|type|value|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],caption[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],center[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],cite[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],code[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],col[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],colgroup[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],del[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dfn[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dir[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],div[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dl[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],em[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],fieldset[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],font[color|face|size|class|dir|id|lang|style|title],form[action|accept|accept-charset|enctype|method|name|target|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onreset|onsubmit],frame[frameborder|longdesc|marginheight|marginwidth|name|noresize|scrolling|src|class|id|style|title],frameset[cols|rows|class|id|style|title|onload|onunload],head[profile|dir|lang],h1[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h2[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h3[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h4[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h5[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h6[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],hr[align|noshade|size|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],html[xmlns|dir|lang],i[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],iframe[align|frameborder|height|longdesc|marginheight|marginwidth|name|scrolling|src|width|class|id|style|title],img[alt|src|align|border|height|hspace|ismap|longdesc|usemap|vspace|width|class|dir|id|lang|style|title|onabort|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],input[],ins[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],kbd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],label[for|accesskey|class|dir|id|lang|style|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],legend[align|accesskey|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],li[type|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],link[charset|href|hreflang|media|rel|rev|target|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],map[name|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],menu[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],meta[content|http-equiv|name|scheme|dir|lang],noframes[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],noscript[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],object[align|archive|border|classid|codebase|codetype|data|declare|height|hspace|name|standby|type|usemap|vspace|width|class|dir|id|lang|style|tabindex|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ol[compact|start|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],optgroup[label|disabled|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],option[disabled|label|selected|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],p[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],param[name|type|value|valuetype|id],pre[width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],q[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],s[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],samp[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],script[type|charset|defer|src|xml:space],select[disabled|multiple|name|size|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],small[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],span[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strike[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strong[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],style[type|media|dir|lang|title],sub[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],sup[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],table[align|bgcolor|border|cellpadding|cellspacing|frame|rules|summary|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tbody[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],td[abbr|align|axis|bgcolor|char|charoff|colspan|headers|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],textarea[cols|rows|disabled|name|readonly|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onselect],tfoot[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],th[abbr|align|axis|bgcolor|char|charoff|colspan|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],thead[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],title[dir|lang],tr[align|bgcolor|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],u[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ul[compact|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],var[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup]",

			template_external_list_url : "example_template_list.js",
			theme_advanced_buttons3 : "",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_path : false,
			theme_advanced_resize_horizontal : false,
			theme_advanced_resizing : false,
			setup : function(ed) {
				ed.addButton('file_manager', {
					title : 'Медиа библеотека',
					image : 'core/images/icons/image_add.png',
					onclick : function() {
						medialib(ed);
					}
				}
				)
				ed.addButton('widgets_and_blocks', {
					title : 'Блоки и Виджеты',
					image : 'core/images/icons/folder_table.png',
					onclick : function() {
						widgets_blocks();
					}
				}
				)
			}
		},
		value: value
	}]}
}
function widgets_blocks()
{
	var StoreBlocks = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{module:'additional', xaction: "LoadStoreBlocks"},
		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'title', mapping: 'title'},
		{name: 'link', mapping: 'link'}
		])

	});
	var GridBlocks =  new Ext.grid.GridPanel({
		store:StoreBlocks,
		loadMask: true,
		border:false,
		listeners:{
		"rowclick":function(){
			Ext.getCmp('ButtWAB_B').enable();
		}
		},
		enableColLock:false,
		columns: [
		{id:'title', header: "Описание", width: 300, sortable: true, dataIndex: 'title'},
		{id:'link', header: "Ссылка", width: 300, sortable: false, dataIndex: 'link'},

		],
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		iconCls:'icon-grid',
		split: true
		,buttons:[{
			text:'Вставить'
			,id:'ButtWAB_B'
			,disabled:true
			,handler:function()
			{
				var name = GridBlocks.getSelectionModel().getSelected().get('link');
				tinyMCE.activeEditor.execCommand('mceInsertContent',false, name);
				Ext.getCmp('WindowBlocks&Widgets').close();
			}
		}]
	});
	var StoreWidgets = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),

		baseParams:{module:'additional', xaction: "LoadStoreWidgets"},
		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'title', mapping: 'title'},
		{name: 'link', mapping: 'link'}
		])

	});
	var GridWidgets =  new Ext.grid.GridPanel({
		store: StoreWidgets,
		loadMask: true,
		border:false,
		listeners:{
		"rowclick":function(){
			Ext.getCmp('ButtWAB_W').enable();
		}
		},
		enableColLock:false,
		clicksToEdit:1,
		columns: [
		{id:'title', header: "Описание", width: 300, sortable: true, dataIndex: 'title'},
		{id:'link', header: "Ссылка", width: 300, sortable: false, dataIndex: 'link'}
		],
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		iconCls:'icon-grid',
		split: true
		,buttons:[{
			text:'Вставить'
			,id:'ButtWAB_W'
			,disabled:true
			,handler:function()
			{
				var name = GridWidgets.getSelectionModel().getSelected().get('link');
				tinyMCE.activeEditor.execCommand('mceInsertContent',false, name);
				Ext.getCmp('WindowBlocks&Widgets').close();
			}
		}]
	});

	var TabPanel = new Ext.TabPanel({
		activeTab:0
		,border:false
		,frame:false
		,defaults:{
			layout:'fit'
			,width:500
			,height:230
			,frame:false
			,autoScroll:true
			,border:false
		}
		,items:[
		{
			listeners:{
			'activate': function()
			{
				if (GridBlocks.store.getCount()==0)
				{
				GridBlocks.store.load();
				}
				Ext.getCmp('ButtWAB_B').disable();
			}
			}

			,title:'Блоки'
			,items:[GridBlocks]
		},
		{
			listeners:{
			'activate': function()
			{
				if (GridWidgets.store.getCount()==0)
				{
				  GridWidgets.store.load();
				}
				Ext.getCmp('ButtWAB_W').disable();
			}
			}
			,title:'Виджеты'
			,items:[GridWidgets]
		}
		]
	});

	new Ext.Window({
		title:'Выберите виджет или блок'
		,width:500
		,id:'WindowBlocks&Widgets'
		,height:300
		,modal:true
		,closeAction:'close'
		,frame:true
		,items:[TabPanel]

	}).show();
}

var form = function (m, items)
{
	if (m['width']){var width = m['width'];}else{var width = "100%";}
	if (m['height']){var height = m['height'];}else{var height = "";}
	if (m['title']){var title = m['title'];}else{var title = "";}
	if (m['id']){var id = m['id'];}else{var id = "";}
	if (m['fileUpload']){var fileUpload = m['fileUpload'];}else{var fileUpload = false;}
	if (m['frame']){var frame = m['id'];}else{var frame = true;}
	if (m['autoWidth']){var autoWidth = m['autoWidth'];}else{var autoWidth = true;}
	if (m['autoHeight']){var autoHeight = m['autoWidth'];}else{var autoHeight = true;}
	if (m['labelAlign']){var labelAlign = m['labelAlign'];}else{var labelAlign = "top";}
	if (m['bodyStyle']){var bodyStyle = m['bodyStyle'];}else{var bodyStyle = "";}
	if (m['baseCls']){var baseCls = m['baseCls'];}else{var baseCls = "x-panel";}
	return new Ext.FormPanel({labelAlign: labelAlign,frame:frame,baseCls:baseCls,fileUpload:fileUpload, id:id, width: width,height: height,bodyStyle:bodyStyle,autoWidth: autoWidth,autoHeight: true,items: items});
}

var ModulesRightMenu = "";
var ModulesRightMenuS = "";
var App = new Ext.App({});
//Ext.WindowMgr.zseed = 10801;

