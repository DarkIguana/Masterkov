var systemusers = {};

systemusers.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			catalog: oGrid_event.record.data.catalog,
			module:'systemusers',
			pos:oGrid_event.record.data.pos
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				systemusers.base.commitChanges();   // changes successful, get rid of the red triangles
				systemusers.base.reload();          // reload our datastore.
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


systemusers.addedit = function (id){
	
	
	
	
	var form = new Ext.FormPanel({
		id:'systemusers.form',
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
				title:'Настройки',
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
					items:[{
						layout:'form',
						width:250,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Имя пользователя',
							name:'login',
							width:200
						}]
					},{
						layout:'form',
						width:600,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Пароль <span style="font-size:10px;">(Оставьте поле пустым, если не нужно менять пароль)</span>',
							name:'password',
							width:200
						}]
					}]
				},{
					layout:'table',
					layoutConfig:{columns:3,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:220},
					items:[
              {
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Настройки сайта"',
							name:'site_settings',
							hiddenName:'site_settings',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Основные разделы"',
							name:'pages',
							hiddenName:'pages',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Блоки"',
							name:'blocks',
							hiddenName:'blocks',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Новости"',
							name:'news',
							hiddenName:'news',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Отзывы"',
							name:'reviews',
							hiddenName:'reviews',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Спецпредложения"',
							name:'articles',
							hiddenName:'articles',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Каталог"',
							name:'price',
							hiddenName:'price',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Магазин"',
							name:'shop',
							hiddenName:'shop',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Вопрос-ответ"',
							name:'faq',
							hiddenName:'faq',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Публикации"',
							name:'files',
							hiddenName:'files',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Баннеры"',
							name:'banners',
							hiddenName:'banners',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Основные направления"',
							name:'slider',
							hiddenName:'slider',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Прайс-листы"',
							name:'pricelistfiles',
							hiddenName:'pricelistfiles',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Подписка"',
							name:'newsletter',
							hiddenName:'newsletter',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Пользователи"',
							name:'users',
							hiddenName:'users',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					},
{
						layout:'form',
						width:250,
						items:[{
							typeAhead: true,xtype:'combo',
							triggerAction: 'all',
							store:new Ext.data.SimpleStore({
								fields:['partyValue', 'partyName'],
								data: [['1','Доступен'],['0','Не доступен']]
							}),
							width:200,
							fieldLabel:'Модуль "Администраторы"',
							name:'systemusers',
							hiddenName:'systemusers',
							mode: 'local',
							displayField: 'partyName',
							valueField: 'partyValue',
							lazyRender:true,
							editable:false,
							listClass: 'x-combo-list-small'
						}]
					}]
				},{xtype:'hidden', name:'id'}]
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
		id:'systemusers.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('systemusers.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('systemusers.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'systemusers', task:'save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('systemusers.WindowAddEdit').close();
					systemusers.base.reload();

				}
			});
		}}]
	}).show();
};


systemusers.base = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing", module:'systemusers'},

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
	{name: 'login', mapping: 'login'},
	{name: 'url', mapping: 'url'},
	{name: 'photo', mapping: 'photo'},
	{name:'site_settings', mapping:'site_settings'},{name:'pages', mapping:'pages'},{name:'blocks', mapping:'blocks'},{name:'news', mapping:'news'},{name:'articles', mapping:'articles'},{name:'price', mapping:'price'},{name:'faq', mapping:'faq'},{name:'files', mapping:'files'},{name:'banners', mapping:'banners'},{name:'slider', mapping:'slider'},{name:'pricelistfiles', mapping:'pricelistfiles'},{name:'newsletter', mapping:'newsletter'},{name:'users', mapping:'users'},{name:'systemusers', mapping:'systemusers'},
	{name: 'fulldesc', mapping: 'fulldesc'},

	{name: 'link', mapping: 'link'},
	{name: 'catalog', type: 'int'},
	{name: 'active', type: 'int', mapping: 'active'}

	])

});
// End Base for ArticleGrid



// PagingBar for articlegrid
systemusers.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: systemusers.base,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction

systemusers.RowAction = new Ext.ux.grid.RowActions({

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
systemusers.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'systemusers', task:'deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							systemusers.base.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			systemusers.addedit(record.data.id);
			Ext.getCmp('systemusers.form').getForm().loadRecord(record);
			
		}
	}
});
systemusers.grid = new Ext.grid.EditorGridPanel({
	store: systemusers.base,
	title: '',
	frame:true,
	 loadMask:true,
	id:'systemusers.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{id: 'id', header: "#", width: 15, sortable: true, dataIndex: 'id'},
	
	
	
	{id:'name', header: "Имя пользователя", width: 100, sortable: true, dataIndex: 'login'},
	
	
	
	{id: 'Active', header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			editable:false,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активный'],['0','Не активный']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активный";
			}
			return "Не активный";
		}

		},
	systemusers.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: systemusers.pagingBar,
	plugins:systemusers.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить нового пользователя',
		handler:function(){
		
		systemusers.addedit(0);
	    var record = {};
	    record.data = {site_settings:0, pages:0, blocks:0, news:0, articles:0, price:0, faq:0, files:0, banners:0, slider:0, pricelistfiles:0, newsletter:0, users:0, systemusers:0};
	    Ext.getCmp('systemusers.form').getForm().loadRecord(record);
		
		},
		iconCls: 'add'}],
		region: 'center'

});

systemusers.grid.on('afteredit', systemusers.updateRecord);



systemusers.view = {
	id:'systemusers',
	title: 'Администраторы',
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
	items: [systemusers.grid]
};
init_modules[init_modules.length] = systemusers.view;
init_nav_modules[init_nav_modules.length] ={
	text:'Администраторы', iconCls:'pages', handler:function(){
	if (Ext.getCmp('Content').layout.activeItem.id != 'systemusers')
	{
		Ext.getCmp('Content').layout.setActiveItem('systemusers');
		if (systemusers.base.data.length  < 1)
		{
			systemusers.base.load({params:{start:0, limit:25}});
			
			
		};

	}
	}
};

Ext.apply(actions, {
'systemusers': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'systemusers')
	{
		Ext.getCmp('Content').layout.setActiveItem('systemusers');
		if (systemusers.base.data.length  < 1)
		{
			systemusers.base.load({params:{start:0, limit:25}});
		};

	}
}
});
ModulesRightMenu+='<li><img src="core/icons/admins.png"/><a id="systemusers" href="#">Администраторы</a></li>';
