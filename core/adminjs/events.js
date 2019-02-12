
var items_Even = [{
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
			fieldLabel: 'Заголовок (не обязательно)',
			name: 'title',
			dataIndex: 'title',
			anchor:'95%'
		}]
}]},{xtype:'textarea', name:'text', anchor:'90%', fieldLabel:'Текст сообщения', height:150}];


// Редактировать новости
var editEvenform = form({fileUpload:true}, items_Even);
// create the window on the first click and reuse on subsequent clicks
var  win2Even = new Ext.Window({
	// applyTo     : 'hello-win',
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	maximizable:true,
	width       :  550,
	height:350,
	autoScroll : true,
	closeAction :'hide',
	plain       : true,
	items       : editEvenform,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			editEvenform.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение новости...',
				params: {xaction: "UpdateEven",module:'events'},
				waitMsg: 'Пожалуйста подождите',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Изменения сохранены.');
					editEvenform.getForm().reset();
					win2Even.hide();
					dsEven.reload();
				},
				failure: function(editEvenform, ermsg)
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
			editEvenform.getForm().reset();
			win2Even.hide();
		}

	}]
});



// Добавить новость
var topEven = form({fileUpload:true}, items_Even);

var  winEven = new Ext.Window({
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	width       : 550,
	autoScroll : true,
	height:350,
	closeAction :'hide',
	plain       : true,
	items       : topEven,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			topEven.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение отзыва...',
				waitMsg: 'Пожалуйста подождите',
				params: {xaction:'AddEven',module:'events'},
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Документ сохранен.');
					topEven.getForm().reset();
					winEven.hide();
					dsEven.reload();
				},
				failure: function(toEvenp, ermsg)
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
			topEven.getForm().reset();
			winEven.hide();
		}
	}]
});

var xgEven = Ext.grid;
var dsEven = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',

		method: 'post'
	}),
	baseParams: {xaction:'ListingEven', module:'events'},
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

var pagingBarEven = new Ext.PagingToolbar({
	pageSize: 25,
	store: dsEven,
	displayInfo: true


});
function updateEven(oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "UpdateActiveEven",
			Id :  oGrid_event.record.data.Id,
			Active: oGrid_event.record.data.Active,
			module:'events'


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				dsEven.commitChanges();
				dsEven.reload();
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
function confirmDeleteEven(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить это событие', deleteEven);
};
function deleteEven(btn){
	if(btn=='yes'){
		var select = gridEven.getSelectionModel().getSelected().get('Id');
		Ext.Ajax.request({

			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				xaction: "DeleteEven",
				id:  select,
				module:'events'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
						dsEven.reload();
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
var Evenact = new Ext.ux.grid.RowActions({

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
Evenact.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			confirmDeleteEven();
		}
		if (action == 'edit')
		{
			win2Even.show();
			var id = grid.getSelectionModel().getSelected().get('Id');
			var date = grid.getSelectionModel().getSelected().get('date');
			var title = grid.getSelectionModel().getSelected().get('title');
			var text = grid.getSelectionModel().getSelected().get('text');
			var full = grid.getSelectionModel().getSelected().get('full');
			var dmf = editEvenform.getForm();

			dmf.findField('id').setValue(id);
		//	dmf.findField('date').setValue(date);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
		//	dmf.findField('full').setValue(full);
			Ext.ux.TinyMCE.initTinyMCE();

		}
	}
});

///
var gridEven = new Ext.grid.EditorGridPanel({
	store: dsEven,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	
	{id:'title', header: "Заголовок", width: 100, sortable: true, dataIndex: 'title'},
	//{id:'date', header: "Дата", width: 100, sortable: true, dataIndex: 'date'},
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
	//{id:'link', header: "Ссылка", width: 100, sortable: false, dataIndex: 'link'},
	Evenact
	],
	plugins: Evenact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: pagingBarEven,
	iconCls:'icon-grid',
	split: true,
	region: 'north'
});



gridEven.on('afteredit', updateEven);

gridEven.on('rowdblclick', function(grid, rowIndex, e) {
	var grid = gridEven;
	var idEven = grid.getSelectionModel().getSelected().get('Id');
	win2Even.show();
	var id = grid.getSelectionModel().getSelected().get('Id');
	var date =grid.getSelectionModel().getSelected().get('date');
	var title = grid.getSelectionModel().getSelected().get('title');
	var text = grid.getSelectionModel().getSelected().get('text');
	var full = grid.getSelectionModel().getSelected().get('full');
	var dmf = editEvenform.getForm();

	dmf.findField('id').setValue(id);
	//dmf.findField('date').setValue(date);
	dmf.findField('title').setValue(title);
	dmf.findField('text').setValue(text);
//	dmf.findField('full').setValue(full);
});







var module_Even = {
	//title: 'Список с',
	id: 'Even',
	layout: 'fit',
	autoScroll: true,
	items: {
		cls: 'email-form',
		layout: 'fit',
		autoScroll: true,
		frame: true,
		items: gridEven,
		tbar:[
		{
			text: 'Добавить',
			handler:function(){
				winEven.show();
			},
			iconCls: 'add'}]
	}};
	init_modules[init_modules.length] = module_Even;
	init_nav_modules[init_nav_modules.length] ={
		text:'События', iconCls:'pages', handler:function(){
			
				dsEven.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('Even');


		}
	};

	Ext.apply(actions, {
	'Even': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'Even')
		{
			Ext.getCmp('Content').layout.setActiveItem('Even');
			if (dsEven.data.length  < 1)
			{
				dsEven.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/comment.png"/><a id="Even" href="#">Блок "Кстати"</a></li>';