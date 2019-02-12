var shortmembers = htmled({name:'text', height:'150', label:'Описание'});
var items_members = [{
	layout:'column',
	items:[{
		columnWidth:.3,
		layout: 'form',
		items: [{
			xtype:'hidden',
			name: 'id',
			hidden: true
		},{
			xtype:'textfield',
			fieldLabel: 'Название',
			name: 'title',
			dataIndex: 'title',
			allowBlank:false,
			anchor:'95%'
		},{
			xtype:'textfield',
			fieldLabel: 'Адрес',
			name: 'adress',
			dataIndex: 'adress',
			anchor:'95%'
		}]
	},{
		columnWidth:.2,
		layout: 'form',
		items: [{
			xtype:'textfield',
			name: 'tel',
		    fieldLabel:'Телефоны'
			
		},{
			xtype:'textfield',
			fieldLabel: 'Почта',
			name: 'emails',
			dataIndex: 'emails'
		}]
	},
	{
		columnWidth:.3,
		layout: 'form',
		items: [{
			xtype:'textfield',
			name: 'site',
		    fieldLabel:'сайт'
			
		}]
	}
	]
},{
	xtype: 'fileuploadfield',
	emptyText: 'Выберите файл для загрузки',
	fieldLabel: 'Фотография',
	anchor:'70%',
	name: 'photo-path',
	buttonCfg: {
		text: ' ',
		iconCls: 'upload-icon'
	}
},shortmembers];


// Редактировать новости
var editmembersform = form({fileUpload:true}, items_members);
// create the window on the first click and reuse on subsequent clicks
var  win2members = new Ext.Window({
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
	items       : editmembersform,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			editmembersform.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение документа...',
				params: {xaction: "Updatemembers",module:'members'},
				waitMsg: 'Пожалуйста подождите',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Документ сохранен.');
					editmembersform.getForm().reset();
					win2members.hide();
					dsmembers.reload();
				},
				failure: function(editmembersform, ermsg)
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
			editmembersform.getForm().reset();
			win2members.hide();
		}

	}]
});



// Добавить новость
var topmembers = form({fileUpload:true}, items_members);

var  winmembers = new Ext.Window({
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	width       : 1024,
	autoScroll : true,
	height:550,
	closeAction :'hide',
	plain       : true,
	items       : topmembers,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			topmembers.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение...',
				waitMsg: 'Пожалуйста подождите',
				params: {xaction:'Addmembers',module:'members'},
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Документ сохранен.');
					topmembers.getForm().reset();
					winmembers.hide();
					dsmembers.reload();
				},
				failure: function(tomembersp, ermsg)
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
			topmembers.getForm().reset();
			winmembers.hide();
		}
	}]
});

var xgmembers = Ext.grid;
var dsmembers = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',

		method: 'post'
	}),
	baseParams: {xaction:'Listingmembers', module:'members'},
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
	{name: 'tel', mapping: 'tel'},
	{name: 'emails', mapping: 'emails'},
	{name: 'site', mapping: 'site'},
	{name: 'adress', mapping: 'adress'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});

var pagingBarmembers = new Ext.PagingToolbar({
	pageSize: 25,
	store: dsmembers,
	displayInfo: true


});
function updatemembers(oGrid_memberst){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "UpdateActivemembers",
			Id :  oGrid_memberst.record.data.Id,
			Active: oGrid_memberst.record.data.Active,
			module:'membersts'


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				dsmembers.commitChanges();
				dsmembers.reload();
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
function confirmDeletemembers(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить это событие', deletemembers);
};
function deletemembers(btn){
	if(btn=='yes'){
		var select = grid.getSelectionModel().getSelected().get('Id');
		Ext.Ajax.request({

			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				xaction: "Deletemembers",
				id:  select,
				module:'membersts'
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
var membersact = new Ext.ux.grid.RowActions({

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
membersact.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			confirmDeletemembers();
		}
		if (action == 'edit')
		{
			win2members.show();
			var id = grid.getSelectionModel().getSelected().get('Id');
			var date = grid.getSelectionModel().getSelected().get('date');
			var title = grid.getSelectionModel().getSelected().get('title');
			var text = grid.getSelectionModel().getSelected().get('text');
			var full = grid.getSelectionModel().getSelected().get('full');
			var tel = grid.getSelectionModel().getSelected().get('tel');
			var emails = grid.getSelectionModel().getSelected().get('emails');
			var site = grid.getSelectionModel().getSelected().get('site');
			var adress = grid.getSelectionModel().getSelected().get('adress');
			var dmf = editmembersform.getForm();

			dmf.findField('id').setValue(id);
			dmf.findField('tel').setValue(tel);
			dmf.findField('emails').setValue(emails);
			dmf.findField('site').setValue(site);
			dmf.findField('adress').setValue(adress);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
		//	dmf.findField('full').setValue(full);
			Ext.ux.TinyMCE.initTinyMCE();

		}
	}
});

///
var gridmembers = new Ext.grid.EditorGridPanel({
	store: dsmembers,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "#", width: 40, sortable: true, dataIndex: 'Id'},
	{id:'title', header: "Наименование", width: 100, sortable: true, dataIndex: 'title'},
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
	{id:'link', header: "Ссылка", width: 100, sortable: false, dataIndex: 'link'},
	membersact
	],
	plugins: membersact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: pagingBarmembers,
	iconCls:'icon-grid',
	split: true,
	region: 'north'
});



gridmembers.on('afteredit', updatemembers);

gridmembers.on('rowdblclick', function(grid, rowIndex, e) {
	var grid = gridmembers;
	var idmembers = grid.getSelectionModel().getSelected().get('Id');
	win2members.show();
	var id = grid.getSelectionModel().getSelected().get('Id');
	var date = grid.getSelectionModel().getSelected().get('date');
	var title = grid.getSelectionModel().getSelected().get('title');
	var text = grid.getSelectionModel().getSelected().get('text');
	var full = grid.getSelectionModel().getSelected().get('full');
	var tel = grid.getSelectionModel().getSelected().get('tel');
	var emails = grid.getSelectionModel().getSelected().get('emails');
	var site = grid.getSelectionModel().getSelected().get('site');
	var adress = grid.getSelectionModel().getSelected().get('adress');
	var dmf = editmembersform.getForm();

	dmf.findField('id').setValue(id);
	dmf.findField('tel').setValue(tel);
	dmf.findField('emails').setValue(emails);
	dmf.findField('site').setValue(site);
	dmf.findField('adress').setValue(adress);
	dmf.findField('title').setValue(title);
	dmf.findField('text').setValue(text);
//	dmf.findField('full').setValue(full);
	Ext.ux.TinyMCE.initTinyMCE();
});







var module_members = {
	//title: 'Список событий',
	id: 'members',
	layout: 'fit',
	autoScroll: true,
	items: {
		cls: 'email-form',
		layout: 'fit',
		autoScroll: true,
		frame: true,
		items: gridmembers,
		tbar:[
		{
			text: 'Добавить члена',
			handler:function(){
				winmembers.show();
			},
			iconCls: 'add'}]
	}};
	init_modules[init_modules.length] = module_members;
	init_nav_modules[init_nav_modules.length] ={
		text:'Члены', iconCls:'pages', handler:function(){
			
				dsmembers.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('members');


		}
	};

	Ext.apply(actions, {
	'members': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'members')
		{
			Ext.getCmp('Content').layout.setActiveItem('members');
			if (dsmembers.data.length  < 1)
			{
				dsmembers.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/date.png"/><a id="members" href="#">Члены</a></li>';