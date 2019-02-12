var pricelistfiles = {};

pricelistfiles.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			catalog: oGrid_event.record.data.catalog,
			module:'pricelistfiles',
			pos:oGrid_event.record.data.pos
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				pricelistfiles.base.commitChanges();   // changes successful, get rid of the red triangles
				pricelistfiles.base.reload();          // reload our datastore.
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


pricelistfiles.addedit = function (id){
	
	
	
	
	var form = new Ext.FormPanel({
		id:'pricelistfiles.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				},{
					xtype: 'fileuploadfield',
					emptyText: 'Выберите файл для загрузки',
					fieldLabel: 'Файл',
					anchor:'70%',
					name: 'photo-path',
					buttonCfg: {
						text: ' ',
						iconCls: 'upload-icon'
					}
				},htmled({name:'fulldesc', label:'Описание', height:250})]
			}]
		}]
	});
	new Ext.Window({
		width:900,
		height:550,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'pricelistfiles.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('pricelistfiles.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('pricelistfiles.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'pricelistfiles', task:'save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('pricelistfiles.WindowAddEdit').close();
					pricelistfiles.base.reload();

				}
			});
		}}]
	}).show();
};


pricelistfiles.base = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing", module:'pricelistfiles'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'pos', mapping: 'pos'},
	{name: 'date', mapping: 'date'},
	{name: 'filesize', mapping: 'filesize'},
	{name: 'mark', mapping: 'mark'},
	{name: 'name', mapping: 'name'},
	{name: 'url', mapping: 'url'},
	{name: 'photo', mapping: 'photo'},
	
	{name: 'fulldesc', mapping: 'fulldesc'},

	{name: 'link', mapping: 'link'},
	{name: 'catalog', type: 'int'},
	{name: 'active', type: 'int', mapping: 'active'}

	])

});
// End Base for ArticleGrid



// PagingBar for articlegrid
pricelistfiles.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: pricelistfiles.base,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction

pricelistfiles.RowAction = new Ext.ux.grid.RowActions({

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
pricelistfiles.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'pricelistfiles', task:'deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							pricelistfiles.base.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			pricelistfiles.addedit(record.data.id);
			Ext.getCmp('pricelistfiles.form').getForm().loadRecord(record);
			
		}
	}
});
pricelistfiles.grid = new Ext.grid.EditorGridPanel({
	store: pricelistfiles.base,
	title: '',
	frame:true,
	 loadMask:true,
	id:'pricelistfiles.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{id: 'id', header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{id: 'pos', header: "Поз.", width: 20, sortable: true, dataIndex: 'pos',
	editor: new Ext.form.TextField},
	{id:'date', header: "Дата", width: 20, sortable: false, dataIndex: 'date'},
	
	{id:'name', header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{id:'filesize', header: "Размер файла", width: 30, sortable: false, dataIndex: 'filesize'},
	{id:'link', header: "Ссылка", width: 60, sortable: false, dataIndex: 'link'},
	{id:'catalogActive', header: '', dataIndex:'catalog',
		width: 50,
		editor: {
		    xtype:'combo',
			typeAhead: true,
			triggerAction: 'all',
			name:'catalog',
			hiddenName:'catalog',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [[0,'Не основной'],[1,'Основной']]
			}),
			editable:false,
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			listClass: 'x-combo-list-small'
		},  renderer: function(value) {
			if (value == '1') {
				return "Основной";
			}
			return "Не основной";
		}

		},
	{id: 'Active', header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	pricelistfiles.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: pricelistfiles.pagingBar,
	plugins:pricelistfiles.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		pricelistfiles.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

pricelistfiles.grid.on('afteredit', pricelistfiles.updateRecord);



pricelistfiles.view = {
	id:'pricelistfiles',
	title: 'Скачать прайс-листы',
	layout:'border',
	bodyBorder: false,
	defaults: {
		collapsible: true,
		split: true,
		animFloat: false,
		autoHide: false,
		useSplitTips: true,
		bodyStyle: 'padding:15px'
	},
	items: [pricelistfiles.grid]
};
init_modules[init_modules.length] = pricelistfiles.view;
init_nav_modules[init_nav_modules.length] ={
	text:'Прайс-листы', iconCls:'pages', handler:function(){
	if (Ext.getCmp('Content').layout.activeItem.id != 'pricelistfiles')
	{
		Ext.getCmp('Content').layout.setActiveItem('pricelistfiles');
		if (pricelistfiles.base.data.length  < 1)
		{
			pricelistfiles.base.load({params:{start:0, limit:25}});
			
			
		};

	}
	}
};

Ext.apply(actions, {
'pricelistfiles': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'pricelistfiles')
	{
		Ext.getCmp('Content').layout.setActiveItem('pricelistfiles');
		if (pricelistfiles.base.data.length  < 1)
		{
			pricelistfiles.base.load({params:{start:0, limit:25}});
		};

	}
}
});
ModulesRightMenu+='<li><img src="core/icons/price.png"/><a id="pricelistfiles" href="#">Прайс-листы</a></li>';
