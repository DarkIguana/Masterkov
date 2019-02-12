var shortotz = htmled({name:'text', height:'150', label:'Короткий Текст'});
var fullotz = htmled({name:'full', height:250, label:'Полный текст'});
var items_otz = [{
	layout:'column',
	items:[{
		columnWidth:.5,
		layout: 'form',
		items: [{
			xtype:'hidden',
			name: 'id',
			hidden: true
		},{
			xtype:'textfield',
			fieldLabel: 'Заголовок',
			name: 'title',
			dataIndex: 'title',
			allowBlank:false,
			anchor:'95%'
		},{
	xtype: 'fileuploadfield',
	emptyText: 'Выберите файл для загрузки',
	fieldLabel: 'Изображение',
	anchor:'70%',
	name: 'photo-path',
	buttonCfg: {
		text: ' ',
		iconCls: 'upload-icon'
	}
}]
	},{columnWidth:.5,
	layout: 'form',
	items: [{
		xtype:'datefield',
		fieldLabel: 'Дата',
		value: new Date(),
		name: 'date',
		format: 'd-m-Y',
		anchor:'40%'
	}]}]
},shortotz,fullotz];
// Редактировать новости
var editotzform = form({fileUpload:true}, items_otz);
// create the window on the first click and reuse on subsequent clicks
var  win2Otz = new Ext.Window({
	// applyTo     : 'hello-win',
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	maximizable:true,
	width       :  '1024',
	height:550,
	autoScroll : true,
	closeAction :'hide',
	plain       : true,
	items       : editotzform,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			editotzform.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение новости...',
				params: {xaction: "Updateotz",module:'otz'},
				waitMsg: 'Пожалуйста подождите',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Отзыв сохранен.');
					editotzform.getForm().reset();
					win2Otz.hide();
					dsOtz.reload();
				},
				failure: function(editotzform, ermsg)
				{
					if(ermsg.result.mm = 1)
					{
						Ext.MessageBox.alert('Статус', 'Не заполнено поле Текст');
					}

				}
			});
		}
	},{
		text: 'Закрыть',
		handler: function()
		{
			editotzform.getForm().reset();
			win2Otz.hide();
		}

	}]
});



// Добавить новость
var topOtz = form({fileUpload:true}, items_otz);

var  winOtz = new Ext.Window({
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	width       : 1024,
	autoScroll : true,
	height:550,
	closeAction :'hide',
	plain       : true,
	items       : topOtz,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			topOtz.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение отзыва...',
				waitMsg: 'Пожалуйста подождите',
				params: {xaction:'Addotz',module:'otz'},
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Новость сохранена.');
					topOtz.getForm().reset();
					winOtz.hide();
					dsOtz.reload();
				},
				failure: function(toOtzp, ermsg)
				{
					if(ermsg.result.mm = 1)
					{
						Ext.MessageBox.alert('Статус', 'Не заполнено поле Текст');
					}

				}


			});
		}
	},{
		text: 'Закрыть',
		handler: function()
		{
			topOtz.getForm().reset();
			winOtz.hide();
		}
	}]
});

var xgOtz = Ext.grid;
var dsOtz = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',

		method: 'post'
	}),
	baseParams: {xaction:'Listingotz', module:'otz'},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'date', mapping: 'date'},
	{name: 'title', mapping: 'title'},
	{name: 'text', mapping: 'text'},
	{name: 'link', mapping: 'link'},
	{name: 'full', mapping: 'full'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});

var pagingBarOtz = new Ext.PagingToolbar({
	pageSize: 25,
	store: dsOtz,
	displayInfo: true


});
function updateotz(oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "UpdateActiveotz",
			Id :  oGrid_event.record.data.Id,
			Active: oGrid_event.record.data.Active,
			module:'otz'


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				dsOtz.commitChanges();
				dsOtz.reload();
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
};
function confirmDeleteotz(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить этот отзыв', deleteotz);
};
function deleteotz(btn){
	if(btn=='yes'){
		var select = grid.getSelectionModel().getSelected().get('Id');
		Ext.Ajax.request({

			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				xaction: "Deleteotz",
				id:  select,
				module:'otz'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					ds.reload();
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



/////




////


/// Action row
var otzact = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
otzact.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			confirmDeleteotz();
		}
		if (action == 'edit')
		{
			win2Otz.show();
			var id = grid.getSelectionModel().getSelected().get('Id');
			var date = grid.getSelectionModel().getSelected().get('date');
			var title = grid.getSelectionModel().getSelected().get('title');
			var text = grid.getSelectionModel().getSelected().get('text');
			var full = grid.getSelectionModel().getSelected().get('full');
			var dmf = editotzform.getForm();

			dmf.findField('id').setValue(id);
			dmf.findField('date').setValue(date);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
			dmf.findField('full').setValue(full);
			Ext.ux.TinyMCE.initTinyMCE();

		}
	}
});

///
var gridOtz = new Ext.grid.EditorGridPanel({
	store: dsOtz,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "#", width: 30, sortable: true, dataIndex: 'Id'},
	{id:'title', header: "Заголовок", width: 100, sortable: true, dataIndex: 'title'},
	{id:'date', header: "Дата", width: 100, sortable: true, dataIndex: 'date'},
	{id: 'Active', header: '', dataIndex:'Active',
	// width: 150,
	editor: new Ext.form.ComboBox({
		typeAhead: true,
		triggerAction: 'all',
		store:new Ext.data.SimpleStore({
			fields:['partyValue', 'partyName'],
			data: [['1','Активная'],['2','Не активная']]
		}),
		mode: 'local',
		displayField: 'partyName',
		valueField: 'partyValue',
		lazyRender:true,
		listClass: 'x-combo-list-small'
	}),  renderer: function(value) {
		if (value == 1) {
			return "Активная";
		}
		return "Не активная";
	}

	},
	{id:'link', header: "Ссылка", width: 100, sortable: false, dataIndex: 'link'},
	otzact
	],
	plugins: otzact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: pagingBarOtz,
	iconCls:'icon-grid',
	split: true,
	region: 'north'
});



grid.on('afteredit', updateotz);

grid.on('rowdblclick', function(grid, rowIndex, e) {
	var grid = gridOtz;
	var idotz = grid.getSelectionModel().getSelected().get('Id');
	win2Otz.show();
	var id = grid.getSelectionModel().getSelected().get('Id');
	var date =grid.getSelectionModel().getSelected().get('date');
	var title = grid.getSelectionModel().getSelected().get('title');
	var text = grid.getSelectionModel().getSelected().get('text');
	var full = grid.getSelectionModel().getSelected().get('full');
	var dmf = editotzform.getForm();

	dmf.findField('id').setValue(id);
	dmf.findField('date').setValue(date);
	dmf.findField('title').setValue(title);
	dmf.findField('text').setValue(text);
	dmf.findField('full').setValue(full);
});







var module_otz = {
	title: 'Список отзывов',
	id: 'otz',
	layout: 'fit',
	autoScroll: true,
	items: {
		cls: 'email-form',
		layout: 'fit',
		autoScroll: true,
		frame: true,
		items: gridOtz,
		tbar:[
		{
			text: 'Добавить отзыв',
			handler:function(){
				winOtz.show();
			},
			iconCls: 'add'}]
	}};
	init_modules[init_modules.length] = module_otz;
	init_nav_modules[init_nav_modules.length] ={
		text:'Отзывы', iconCls:'pages', handler:function(){
			
				dsOtz.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('otz');


		}
	};

	Ext.apply(actions, {
	'otz': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'otz')
		{
			Ext.getCmp('Content').layout.setActiveItem('otz');
			if (dsOtz.data.length  < 1)
			{
				dsOtz.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/date.png"/><a id="otz" href="#">Отзывы</a></li>';