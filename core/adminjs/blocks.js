
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
	htmled({
        name: 'text',
        label: 'Содержание',
        height: 350
    })]
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

