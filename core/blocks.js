
var Blocksstore = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{module:'blocks', xaction: "LISTING"},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', type: 'int', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'title', mapping: 'title'},
	{name: 'link', mapping: 'link'},
	{name: 'text', mapping: 'text'}

	])

});

var Blocksact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'delete'
		,qtip:'Удалить'


	},
	{
		iconCls:'edit'
		,qtip:'Редактировать'


	}
	]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
function DeleteConfirmBlock()
{
	Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот блок', deleteBlock);
}
function deleteBlock(btn)
{
	if(btn=='yes'){
		var select = BlocksGrid.getSelectionModel().getSelected().get('id');
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'blocks', xaction: "DELETE",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					Blocksstore.reload();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	}
}
Blocksact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			winsh('Edit');
			var id = BlocksGrid.getSelectionModel().getSelected().get('id');
			var name = BlocksGrid.getSelectionModel().getSelected().get('name');
			var title = BlocksGrid.getSelectionModel().getSelected().get('title');
			var text = BlocksGrid.getSelectionModel().getSelected().get('text');
			var dmf = Ext.getCmp('BlockForm').getForm();
			
			dmf.findField('id').setValue(id);
			dmf.findField('name').setValue(name);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
		//	BlocksAddWin.setTitle(title);
	}
	if (action == 'delete')
	{
		DeleteConfirmBlock();
	}

}
});
function addBlocks(action){

	if (action == "Add")
	{
		var Blocksform = Ext.getCmp('BlockForm');
			var name =  Blocksform.getForm().findField('name').getValue();
	var title =  Blocksform.getForm().findField('title').getValue();
	var text =  Blocksform.getForm().findField('text').getValue();
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			module:'blocks', xaction: "Add",
			name: name,
			text: text,
			title: title
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 55:
				//Blocksform.getForm().reset();
				Blocksstore.reload();
				Ext.MessageBox.alert('', 'Новвый блок создан');
				
				break;
				case 66: 
				Ext.MessageBox.alert('Ошибка', 'Такое имя блока уже есть');
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
	}
	else
	{
		var Blocksform = Ext.getCmp('BlockForm');
		var id =Blocksform.getForm().findField('id').getValue();
		var name =  Blocksform.getForm().findField('name').getValue();
	var title =  Blocksform.getForm().findField('title').getValue();
	var text =  Blocksform.getForm().findField('text').getValue();
		Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			module:'blocks', xaction: "Edit",
			id: id,
			name: name,
			text: text,
			title: title
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 55:
				Ext.MessageBox.alert('', 'Изменения сохранны');
				//Blocksform.getForm().reset();
				Blocksstore.reload();
				break;
				case 66: 
				Ext.MessageBox.alert('Ошибка', 'Такое имя блока уже есть');
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
	}
};



Ext.apply(Ext.form.VTypes, {
     'name': function(){
         var re = /[a-zA-Z]/;
         return function(v){
             return re.test(v);
         }
     }(),
     'nameText' : 'В имени блока могут содержаться только латинские буквы'
});

function winsh(action)
{

	
var Blocksform= new Ext.FormPanel({
	labelAlign: 'top',
	labelWidth:80,
	id: 'BlockForm',
	frame:true,
	width: 1024,
	autoWidth: true,
	autoHeight: true,
	monitorValid:true,
	items:[
	{ xtype: 'hidden',
	name:'id'
	},
	
		new Ext.form.TextField({
		name: 'name',
		fieldLabel:'Имя блока (только латинские буквы)',
		vtype: 'name',
		allowBlank: false
		})
	
	,
	{
		xtype: 'textfield',
		name: 'title',
		fieldLabel:'Название блока',
		allowBlank: false
	
	},
	{
			width: '100%',
		xtype: "tinymce",
	tinymceSettings: {
		theme : "advanced",
		 forced_root_block : false,
         force_br_newlines : true,
         force_p_newlines : false,
		plugins: "safari,pagebreak,fullscreen,style,layer,table,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
		theme_advanced_buttons1 : "insertfile,bold,italic,underline,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,styleselect,formatselect,fontselect,fontsizeselect,pasteword,bullist,numlist,outdent,indent,blockquote,forecolor,backcolor,sub,sup,iespell,charmap,|,fullscreen",
		theme_advanced_buttons2 : "file_manager,undo,redo,link,unlink,anchor,image,cleanup,code,preview,tablecontrols,hr,removeformat,visualaid,advhr,print,insertlayer,moveforward,movebackward,absolute,cite,acronym,attribs,visualchars",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : false,
		extended_valid_elements : "a[charset|coords|href|hreflang|name|rel|rev|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],abbr[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],acronym[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],address[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],applet[code|object|align|alt|archive|codebase|height|hspace|name|vspace|width|class|id|style|title],area[alt|coords|href|nohref|shape|target|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],b[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],base[href|target],basefont[color|face|size|class|dir|id|lang|style|title],bdo[dir|class|id|lang|style|title],big[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],blockquote[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],body[alink|background|bgcolor|link|text|vlink|class|dir|id|lang|style|title|onclick|ondblclick|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onunload],br[class|id|style|title],button[disabled|name|type|value|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],caption[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],center[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],cite[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],code[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],col[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],colgroup[align|char|charoff|span|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],del[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dfn[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dir[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],div[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dl[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],dt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],em[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],fieldset[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],font[color|face|size|class|dir|id|lang|style|title],form[action|accept|accept-charset|enctype|method|name|target|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onreset|onsubmit],frame[frameborder|longdesc|marginheight|marginwidth|name|noresize|scrolling|src|class|id|style|title],frameset[cols|rows|class|id|style|title|onload|onunload],head[profile|dir|lang],h1[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h2[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h3[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h4[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h5[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],h6[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],hr[align|noshade|size|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],html[xmlns|dir|lang],i[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],iframe[align|frameborder|height|longdesc|marginheight|marginwidth|name|scrolling|src|width|class|id|style|title],img[alt|src|align|border|height|hspace|ismap|longdesc|usemap|vspace|width|class|dir|id|lang|style|title|onabort|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],input[],ins[cite|datetime|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],kbd[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],label[for|accesskey|class|dir|id|lang|style|title|onblur|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],legend[align|accesskey|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],li[type|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],link[charset|href|hreflang|media|rel|rev|target|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],map[name|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],menu[compact|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],meta[content|http-equiv|name|scheme|dir|lang],noframes[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],noscript[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],object[align|archive|border|classid|codebase|codetype|data|declare|height|hspace|name|standby|type|usemap|vspace|width|class|dir|id|lang|style|tabindex|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ol[compact|start|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],optgroup[label|disabled|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],option[disabled|label|selected|value|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],p[align|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],param[name|type|value|valuetype|id],pre[width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],q[cite|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],s[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],samp[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],script[type|charset|defer|src|xml:space],select[disabled|multiple|name|size|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],small[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],span[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strike[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],strong[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],style[type|media|dir|lang|title],sub[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],sup[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],table[align|bgcolor|border|cellpadding|cellspacing|frame|rules|summary|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tbody[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],td[abbr|align|axis|bgcolor|char|charoff|colspan|headers|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],textarea[cols|rows|disabled|name|readonly|accesskey|class|dir|id|lang|style|tabindex|title|onblur|onchange|onclick|ondblclick|onfocus|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup|onselect],tfoot[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],th[abbr|align|axis|bgcolor|char|charoff|colspan|height|nowrap|rowspan|scope|valign|width|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],thead[align|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],title[dir|lang],tr[align|bgcolor|char|charoff|valign|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],tt[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],u[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],ul[compact|type|class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup],var[class|dir|id|lang|style|title|onclick|ondblclick|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onkeydown|onkeypress|onkeyup]",
		template_external_list_url : "example_template_list.js",

		theme_advanced_buttons3 : "",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_path : false,
		theme_advanced_resize_horizontal : false,
		theme_advanced_resizing : true,

		setup : function(ed) {

			// Add a custom button

			ed.addButton('file_manager', {

				title : 'Медиа библеотека',

				image : 'core/images/icons/image_add.png',

				onclick : function() {

					
					medialib(ed);
					

				},
				file_browser_callback : 'FileBrowser'


			})}},
			value: '',
		fieldLabel:'Содержание',
		name:'text'
		
	}]
});
	var win = new Ext.Window({
	//applyTo     : 'hello-win',
	layout      : 'fit',
	id:'WinBlock',
	shim: false,
	modal: true,
	width       : 1024,
	height:400,
	autoScroll : true,
	closeAction :'close',
	autoScroll: true,
	plain       : true,
	items       : Blocksform,
	monitorValid:true,
	buttons: [{
		formBind: true,
		text: 'Сохранить',
		id: 'save-Block',
		handler:function ()
		{
			tinyMCE.triggerSave();
			addBlocks(action)
			Ext.getCmp('WinBlock').close();
		}
	}
	
	,{
		text: 'Закрыть',
		handler: function()
		{
			Blocksform.getForm().reset();
			Ext.getCmp('WinBlock').close();
		}
	}]
}).show();

}
var BlocksGrid = new Ext.grid.GridPanel({
	id: 'blocks',
	title: 'Управление дизайном - Блоки',
	store: Blocksstore,
	//loadMask: true,
	frame:true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id:'title', header: "Блок", width: 300, sortable: true, dataIndex: 'title'},
	{id:'link', header: "Ссылка", width: 300, sortable: false, dataIndex: 'link'},
	Blocksact
	],
	plugins: Blocksact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	iconCls:'icon-grid',
	split: true,
	tbar: [{
		text: 'Добавить Блок',
		iconCls:'add',
		handler: function()
		{
			winsh('Add');
		}
	}]

});

init_modules[init_modules.length] = BlocksGrid;
init_nav_settings[init_nav_settings.length] ={
	text:'Блоки', iconCls:'pages', handler:function(){
		Ext.getCmp('Content').layout.setActiveItem('blocks');
	
			if (Blocksstore.data.length  < 1)
			{
				Blocksstore.load();
			};
	}
};

Ext.apply(actions, {
'blocks': function()
{

	if (Ext.getCmp('Content').layout.activeItem.id != 'blocks')
	{
		Ext.getCmp('Content').layout.setActiveItem('blocks');
		if (Blocksstore.data.length  < 1)
		{
			Blocksstore.load();
		};

	}
}
});
ModulesRightMenu+='<li><img src="core/icons/package.png"/><a id="blocks" href="#">Блоки</a></li>';

