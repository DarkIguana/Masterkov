

Ext.override(Ext.form.CheckboxGroup, {
	getValue: function() {
		var v = [];
		this.items.each(function(item) {
			if (item.getValue()) {
				v.push(item.getRawValue());
			} else {
				v.push('');
			}
		});
		return v;
	},
	setValue: function(vals) {
		var a = [];
		if (Ext.isArray(vals)) {
			a = vals;
		} else {
			a = [vals];
		}
		this.items.each(function(item) {
			item.setValue(false); // reset value
			for ( var i = 0 ; i < a.length ; i ++ ) {
				var val = a[i];
				if ( val == item.getRawValue() ) {
					item.setValue(true);
				}
			};
		});
	}
});

Ext.override(Ext.form.RadioGroup, {

	getName: function(){
		return this.name;
	},
	getValue: function() {
		var v;
		this.items.each(function(item) {
			if ( item.getValue() ) {
				v = item.getRawValue();
				return false;
			}
		});
		return v;
	},

	setValue: function(v) {
		if(this.rendered)
		this.items.each(function(item) {
			item.setValue(item.getRawValue() == v);
		});
		else
		for(k in this.items) this.items[k].checked = this.items[k].inputValue == v;
	}
});

function accept_user_project(id)
{
	var Tree4CCOA = new Ext.tree.TreePanel({
		autoScroll:true,
		animate:true,
		enableDD:false,
		width: 200,
		floatable: false,
		margins: '5 0 0 0',
		cmargins: '5 5 0 0',
		split: true,
		rootVisible: false,
		expanded: true,
		containerScroll: true,
		lines: false,
		singleExpand: true,

		useArrows: true,
		loader:projects_loader_tree,
		root:{
			nodeType: 'async',
			text: 'Корень',
			expanded:true,
			draggable:false,
			id:'0'
		}
	});
	var ChangeCatOfArt = new Ext.Window({
		layout      : 'fit',
		title: 'Выберите категорию',
		shim: false,
		modal: true,
		width       : 200,
		height      : 250,
		id: 'WindowChangeCatArt',
		autoScroll : true,
		closeAction :'close',
		plain       : true,
		items       : Tree4CCOA,
		buttons: [{
			text: 'Выбрать',

			handler: function(){
				var tr = Tree4CCOA.getSelectionModel().getSelectedNode();
				if (tr)
				{
					var cat_id = tr.id;
					if (cat_id)
					{
						Ext.Ajax.request({
							url:'admincp.php',
							params:{task:'accept_project', id:id, cat_id:cat_id, module:'projects'},
							method:'post',
							success:function(){
								Ext.getCmp("WindowChangeCatArt").close();
								projectusersbase.reload();
							}
						});
					}
				}
			}
		}]
	}).show();

}


/// *** Users Projects ***\\\\\
var projectusersbase = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_projects", ver:0, module:'projects'},
	listeners:{
	"load":function(){
		if (projectusersbase.data.length > 0)
		{
			Ext.getCmp('projects_ver').setTitle('<b>Ожидают проверки ('+projectusersbase.data.length+')</b>');
		}
		else
		{
			Ext.getCmp('projects_ver').setTitle('Ожидают проверки (0)');
		}
	},
	"reload":function(){
		if (projectusersbase.data.length > 0)
		{
			Ext.getCmp('projects_ver').setTitle('<b>Ожидают проверки ('+projectusersbase.data.length+')</b>');
		}
		else
		{
			Ext.getCmp('projects_ver').setTitle('Ожидают проверки (0)');
		}
	}
	},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'cat_id', mapping: 'cat_id'},
	{name: 'user', mapping: 'user'},
	{name: 'uid', mapping: 'uid'},
	{name: 'title', mapping: 'title'},
	{name: 'num_project', mapping: 'num_project'},
	{name: 'price', mapping: 'price'},
	{name: 'ob_pl', mapping: 'ob_pl'},
	{name: 'jil_pl', mapping: 'jil_pl'},
	{name: 'stat', mapping: 'stat'}
	])
});
// End Base for projectuserGrid

// PagingBar for projectusergrid
var projectuserpagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: projectusersbase,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true
});
// End
// ArtclisRowAction

var projectuserRowAction = new Ext.ux.grid.RowActions({
	actions:[{
		iconCls: 'accept'
		,qtip:'Одобрить проект'
	},{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
projectuserRowAction.on({
	action:function(grid, record, action, row, col) {
		if (action =='edit')
		{
			var idnews = projectusergrid.getSelectionModel().getSelected().get('Id');
			window_projects(idnews, 1);
		}
		if (action == "accept")
		{
			var cat = projectusergrid.getSelectionModel().getSelected().get('cat_id');
			var id = projectusergrid.getSelectionModel().getSelected().get('Id');
			if (cat == "0")
			{
				accept_user_project(id);
			}
			else
			{
				Ext.Ajax.request({
							url:'admincp.php',
							params:{task:'accept_project', id:id, cat_id:cat, module:'projects'},
							method:'post',
							success:function(){
							
								projectusersbase.reload();
							}
						});
			}
		}
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот проект?',function (btn){
				if(btn=='yes'){
					var select = projectusergrid.getSelectionModel().getSelected().get('Id');

					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: 'admincp.php',
						params: {
							xaction: "Delete_projects",
							id:  select,
							module:'projects'
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								projectusersbase.reload();
								break;
							}
						},
						failure: function(response){
							var result=response.responseText;
							Ext.MessageBox.alert('error','could not connect to the database. retry later');
						}
					});
				}
			});
		}
	}
});

var projectusergrid = new Ext.grid.EditorGridPanel({
	store: projectusersbase,
	title: 'Проекты',
	frame:true,
	loadMask:true,
	id:'projectusersgrid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "Добавил", width: 90, sortable: true, dataIndex: 'user'},
	{header: "№ проекта", width: 50, sortable: true, dataIndex: 'num_project'},
	{header: "Название проекта", width: 100, sortable: true, dataIndex: 'title'},
	{ header: "Общ. Пл", width: 50, sortable: true, dataIndex: 'ob_pl'},
	{ header: "Жил. Пл", width: 50, sortable: true, dataIndex: 'jil_pl'},
	{ header: "Стоимость", width: 50, sortable: true, dataIndex: 'price'},
	projectuserRowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: projectuserpagingBar,
	plugins:projectuserRowAction,
	iconCls:'icon-grid',
	split: true
});

projectusergrid.on('afteredit', updateprojectuser);

function updateprojectuser(oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update_projectusers",
			Id :  oGrid_event.record.data.Id,
			Active: oGrid_event.record.data.Active,
			module:'projects',
			pos:oGrid_event.record.data.pos
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				projectusersbase.commitChanges();   // changes successful, get rid of the red triangles
				projectusersbase.reload();          // reload our datastore.
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
function confirmdeleteArtUserUser(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту статью', deleteArtUser);
};
























//// ***** \\\\\\


function img_zoom(url)
{
	new Ext.Window({
		width:400,
		height:400,
		modal:true,
		layout:'fit',
		closeAction:'close',
		html:'<center><img src="'+url+'" width="242"></center>'
	}).show();
}

function UploadProject(cat)
{
	var id_p = Ext.getCmp('ProjectForm').getForm().findField('id').getValue();

	var form = new Ext.FormPanel({
		fileUpload: true,
		width: '100%',
		frame: true,
		lauout:'form',
		shim: true,
		bodyStyle: 'padding: 10px 10px 0 10px;',
		labelWidth: 50,
		items: [{
			xtype: 'fileuploadfield',
			emptyText: 'Выберите файл для загрузки',
			fieldLabel: 'Файл',
			name: 'photo-path',
			width:'500',
			anchor: '95%',
			allowBlank: false,
			buttonCfg: {
				text: ' ',
				iconCls: 'upload-icon'
			}
		},{xtype:'textfield', name:'desc', fieldLabel:'Описание', anchor:'90%'},{xtype:'hidden', name:'id_p', value:id_p},{xtype:'hidden', name:'cat', value:cat}],
		buttonAlign:'center',
		buttons: [{
			text: 'Загрузить',
			handler:function()
			{
				if (form.getForm().isValid())
				{
					form.getForm().submit({
						url:'admincp.php',
						waitMsg:'Пожалуйста подождите',
						params:{module:'projects', task:'UploadPhoto'},
						success:function(){
							Ext.getCmp('GridPanel1').store.load({params:{cat:1, id_p:id_p}});
							Ext.getCmp('GridPanel2').store.load({params:{cat:2, id_p:id_p}});
							Ext.getCmp('GridPanel3').store.load({params:{cat:3, id_p:id_p}});
							Ext.getCmp('WindowUploadProject').close();

						},
						failure: function (o)
						{
							Ext.MessageBox.alert('', 'Фотография может имать только формат JPEG ил JPG');
						}
					});
				}
			}
		}]
	});
	var win = new Ext.Window({
		width:400,
		height:150,
		layout:'fit',
		closeAction:'close',
		id:'WindowUploadProject',
		title: 'Загрузка фотографий',
		modal:true,
		items:[form]
	}).show();
}
function window_projects(id, dr)
{
	var gridbase1 = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "Listing_img", module:'projects'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'img', mapping: 'img'},
		{name: 'title', mapping: 'title'},
		])

	});

	var gridpanel1 = new Ext.grid.EditorGridPanel({
		store:gridbase1,
		enableColLock:false,
		split: true,
		layout: 'fit',
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		enableColLock:false,
		clicksToEdit:1,
		id:'GridPanel1',
		autoWidth:true,
		listeners:{
		'afteredit':function(oGrid_event){
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					xaction: "Update_img",
					Id :  oGrid_event.record.data.id,
					title: oGrid_event.record.data.title,
					module:'projects'
					//	,pos:oGrid_event.record.data.pos
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 33:
						gridbase1.commitChanges();   // changes successful, get rid of the red triangles
						gridbase1.reload();          // reload our datastore.
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
		},
		columns: [
		{id:'title', header: "Описание", width: 100, sortable: true, dataIndex: 'title', editor: new Ext.form.TextField},
		{id:'img', header: "", width: 10, sortable: false, dataIndex: 'img', renderer:function(value){
			return '<span style="cursor:pointer"><img src="core/icons/zoom_in.png" onclick="'+"img_zoom('"+value+"')"+'"></span>';
		}}
		],
		viewConfig: {
			forceFit: true
		}
	});	var gridbase2 = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "Listing_img", module:'projects'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'pos', mapping: 'pos'},
		{name: 'img', mapping: 'img'},
		{name: 'title', mapping: 'title'},
		])
	});

	var gridpanel2 = new Ext.grid.EditorGridPanel({
		store:gridbase2,
		split: true,
		layout: 'fit',
		enableColLock:false,
		clicksToEdit:1,
		enableColLock:false,
		autoWidth:true,
		listeners:{
		'afteredit':function(oGrid_event){
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					xaction: "Update_img",
					Id :  oGrid_event.record.data.id,
					title: oGrid_event.record.data.title,
					module:'projects'
					,pos:oGrid_event.record.data.pos
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 33:
						gridbase2.commitChanges();   // changes successful, get rid of the red triangles
						gridbase2.reload();          // reload our datastore.
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
		},
		id:'GridPanel2',
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		columns: [
		{id:'pos', header: "Поз.", width: 30, sortable: true, dataIndex: 'pos', editor: new Ext.form.TextField},
		{id:'title', header: "Описание", width: 100, sortable: true, dataIndex: 'title', editor: new Ext.form.TextField},
		{id:'img', header: "", width: 10, sortable: false, dataIndex: 'img', renderer:function(value){
			return '<span style="cursor:pointer"><img src="core/icons/zoom_in.png" onclick="'+"img_zoom('"+value+"')"+'"></span>';
		}}
		],
		viewConfig: {
			forceFit: true
		}
	});var gridbase3 = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "Listing_img", module:'projects'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'pos', mapping: 'pos'},
		{name: 'img', mapping: 'img'},
		{name: 'title', mapping: 'title'},
		])

	});

	var gridpanel3 = new Ext.grid.EditorGridPanel({
		store:gridbase3,
		layout: 'fit',
		enableColLock:false,
		clicksToEdit:1,
		enableColLock:false,
		autoWidth:true,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		split: true,
		listeners:{
		'afteredit':function(oGrid_event){
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					xaction: "Update_img",
					Id :  oGrid_event.record.data.id,
					title: oGrid_event.record.data.title,
					module:'projects'
					,pos:oGrid_event.record.data.pos
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 33:
						gridbase3.commitChanges();   // changes successful, get rid of the red triangles
						gridbase3.reload();          // reload our datastore.
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
		},
		id:'GridPanel3',
		columns: [
		{id:'pos', header: "Поз.", width: 30, sortable: true, dataIndex: 'pos', editor: new Ext.form.TextField},
		{id:'title', header: "Описание", width: 100, sortable: true, dataIndex: 'title', editor: new Ext.form.TextField},
		{id:'img', header: "", width: 10, sortable: false, dataIndex: 'img', renderer:function(value){
			return '<span style="cursor:pointer"><img src="core/icons/zoom_in.png" onclick="'+"img_zoom('"+value+"')"+'"></span>';
		}}
		],
		viewConfig: {
			forceFit: true
		}
	});

	var panel1= new Ext.Panel({
		title:'Виды',
		width:600,
		id:'PPanel1',
		tbar:[{
			text:'Загрузить',
			iconCls:'add',
			handler:function()
			{
				UploadProject(1);
			}
		},{
			text:'Удалить',
			iconCls:'delete',
			handler:function(){
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту фотографию?', function(btn){
					if (btn=="yes")
					{
						var select = gridpanel1.getSelectionModel().getSelected().get('id');

						Ext.Ajax.request({
							waitMsg: 'Пожалуйста подождите',
							url: 'admincp.php',
							params: {
								xaction: "Delete_img",
								id:  select,
								module:'projects'
							},
							success: function(response){
								var result=eval(response.responseText);
								switch(result){
									case 55:  // Success : simply reload
									gridbase1.reload();
									break;
								}
							},
							failure: function(response){
								var result=response.responseText;
								Ext.MessageBox.alert('error','could not connect to the database. retry later');
							}
						});
					}

				});

			}
		}],
		border:true,
		layout:'fit',
		frame:true,
		listeners:{
		"beforeexpand":function(){
			Ext.getCmp('PPanel2').collapse(true);
			Ext.getCmp('PPanel3').collapse(true);
		}
		},
		collapsed:false,
		collapsible:true,
		height:250,
		items:[gridpanel1]
	});
	var panel2 = new Ext.Panel({
		title:'3D Прокрутка',
		width:600,
		height:250,
		border:true,
		id:'PPanel1',
		layout:'fit',
		tbar:[{
			text:'Загрузить',
			iconCls:'add',
			handler:function()
			{
				UploadProject(2);
			}
		},{
			text:'Удалить',
			iconCls:'delete',
			handler:function(){
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту фотографию?', function(btn){
					if (btn=="yes")
					{
						var select = gridpanel2.getSelectionModel().getSelected().get('id');

						Ext.Ajax.request({
							waitMsg: 'Пожалуйста подождите',
							url: 'admincp.php',
							params: {
								xaction: "Delete_img",
								id:  select,
								module:'projects'
							},
							success: function(response){
								var result=eval(response.responseText);
								switch(result){
									case 55:  // Success : simply reload
									gridbase2.reload();
									break;
								}
							},
							failure: function(response){
								var result=response.responseText;
								Ext.MessageBox.alert('error','could not connect to the database. retry later');
							}
						});
					}

				});

			}
		}],
		frame:true,
		listeners:{
		"beforeexpand":function(){
			Ext.getCmp('PPanel1').collapse(true);
			Ext.getCmp('PPanel3').collapse(true);
		}
		},
		collapsible:true,
		collapsed:true,
		id:'PPanel2',
		items:[gridpanel2]

	});
	var panel3 = new Ext.Panel({
		title:'Планировки',
		width:600,
		height:250,
		border:true,
		layout:'fit',
		id:'PPanel1',
		tbar:[{
			text:'Загрузить',
			iconCls:'add',
			handler:function()
			{
				UploadProject(3);
			}
		},{
			text:'Удалить',
			iconCls:'delete',
			handler:function(){
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту фотографию?', function(btn){
					if (btn=="yes")
					{
						var select = gridpanel3.getSelectionModel().getSelected().get('id');
						Ext.Ajax.request({
							waitMsg: 'Пожалуйста подождите',
							url: 'admincp.php',
							params: {
								xaction: "Delete_img",
								id:  select,
								module:'projects'
							},
							success: function(response){
								var result=eval(response.responseText);
								switch(result){
									case 55:  // Success : simply reload
									gridbase3.reload();
									break;
								}
							},
							failure: function(response){
								var result=response.responseText;
								Ext.MessageBox.alert('error','could not connect to the database. retry later');
							}
						});
					}

				});

			}
		}],
		frame:true,
		listeners:{
		"beforeexpand":function(){
			Ext.getCmp('PPanel2').collapse(true);
			Ext.getCmp('PPanel1').collapse(true);
		}
		},
		collapsed:true,
		collapsible:true,
		id:'PPanel3',
		items:[gridpanel3]
	});

	var form = new Ext.FormPanel({
		width:'100%',
		height:520,
		frame:true,
		labelAlign:'top',
		id:'ProjectForm',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:900, height:500, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				items:[{
					layout:'column',
					border:false,
					items:[{
						columnWidth:.5,
						layout:'form',
						border:false,
						items: [{
							xtype:'textfield',
							name:'name',
							anchor:'70%',
							fieldLabel:'Название проекта'
						},{
							xtype:'textfield',
							name:'num_project',
							fieldLabel:'Номер проекта'
						}
						]

					},{
						columnWidth:.5,
						layout:'form',

						border:false,
						items:[{
							xtype:'textfield',
							name: 'cat_name',
							fieldLabel: 'Категория',
							disabled:true
						},{
							xtype:'hidden',
							name: 'cat_id',
							value:'0'
						},
						{
							xtype:'hidden',
							name: 'id'
						},{
							xtype:'numberfield',
							maxValue: 1000000000,
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							fieldLabel:'Стоимость',
							name:'price'
						}]
					}]

				},{xtype: 'panel',
				columnWidth:.5,
				layout: 'form',
				style:'margin-left:640px; margin-top:-77px; position:absolute;',
				items:[ {
					xtype: 'button',
					text: 'Выбрать...',
					handler: chenge_cat_project
				}]},htmled({name:'desc', label:'Описание', height:350})]
			},{
				title:'Техническое описание',
				layout:'form',
				items:[{
					layout:'column',
					border:false,
					items:[{
						layout:'form',
						columnWidth:.2,
						items:[{
							xtype:'numberfield',
							fieldLabel:'<b>Общая площадь</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'ob_pl'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>высота дома</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'height'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>колличество спален</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'kol_spal'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>машиномест в гараже</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'kol_car'
						}]
					},
					{
						layout:'form',
						columnWidth:.2,
						items:[{
							xtype:'numberfield',
							fieldLabel:'<b>Жилая площадь</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'jil_pl'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>уровней</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'levels'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>колличество санузлов</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'kol_sanuz'
						}]
					},
					{
						layout:'form',
						columnWidth:.2,
						items:[{
							xtype:'numberfield',
							fieldLabel:'<b>площадь цоколя</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'cok_pl'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>площадь мансарды</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'man_pl'
						},{
							xtype:'numberfield',
							fieldLabel:'<b>площадь этажа</b>',
							allowNegative: false,
							maxValue: 1000000000,
							minValue: 0,
							emptyText:'0',
							name:'level_pl'
						}]
					}

					]


				},{
					layout:'form',
					xtype:'radiogroup',
					name:'matsten',
					fieldLabel:'<b>Материалы стен</b>',
					items:[
					{boxLabel:'Кирпич', value:1, inputValue: 1,id:'mat1', name:'matsten'},
					{boxLabel:'Пеноблок', value:2, inputValue: 2,id:'mat2', name:'matsten'},
					{boxLabel:'Монолит', value:3, inputValue:3,id:'mat3', name:'matsten'},
					{boxLabel:'Комбинированный', value:4, inputValue:4, id:'mat4', name:'matsten'}
					]


				},
				{


					layout:'column',
					fieldLabel:'<b>Дополнительный параметры</b>',
					items:[
					{columnWidth:.3, layout:'form', items:[{xtype:'hidden', value:1, name:'tehparam'}]},
					{columnWidth:.3, layout:'form', items:[{xtype:'checkbox', boxLabel:'Бассейн', value:1, inputValue:1, name:'bass'}]},
					{columnWidth:.3, layout:'form', items:[{xtype:'checkbox', boxLabel:'Мансарда', value:1, inputValue:1, name:'mansarda'}]},
					{columnWidth:.3, layout:'form', items:[{xtype:'checkbox', boxLabel:'Встроенный гараж', value:1, inputValue:1, name:'vstgar'}]},
					{columnWidth:.3, layout:'form', items:[{xtype:'checkbox', boxLabel:'Подвал', value:1, inputValue:1, name:'podval'}]}
					]

				}
				]},{
					title:'Фотографии',
					listeners: {
					"activate":function(){
						var id_p = Ext.getCmp('ProjectForm').getForm().findField('id').getValue();
						gridbase1.load({params:{cat:1, id_p:id_p}});
						gridbase2.load({params:{cat:2, id_p:id_p}});
						gridbase3.load({params:{cat:3, id_p:id_p}});
					}},
					items:[panel1,panel2,panel3]


				},{
					title:'Дополнительные параметры',
					layout:'form',
					defaults:{xtype:'checkbox'},
					items: [
					{xtype:'checkbox',boxLabel: 'Лучший', name: 'best', id:'best', inputValue: 1, value:1},
					{xtype:'checkbox',boxLabel: 'Рекомендуемый', name: 'recom', id:'recom', inputValue: 1, value:1},
					{xtype:'checkbox',boxLabel: 'Новинка', name: 'new', id:'new', inputValue: 1, value:1},
					{xtype:'checkbox',boxLabel: 'Оригинальный', name: 'orig', id:'orig', inputValue: 1, value:1},
					{xtype:'checkbox',name: 'DopSV', id:'DopSV', inputValue: 1, hidden:true, checked:true}
					]
				}]
		}]

	});
	new Ext.Window({
		width:1024,
		height:550,
		frame:true,
		closeAction:'close',
		modal:true,
		id:'ProjectWindow',
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.Ajax.request({
					url:'admincp.php',
					waitMsg:'Подождите пожалуйста',
					params:{module:'projects', task:'NewProject'},
					success:function(response)
					{
						var o = eval(response.responseText);
						Ext.getCmp('ProjectForm').getForm().findField('id').setValue(o);

					}
				});
			}
			else
			{

				form.getForm().load({
					url:'admincp.php',
					waitMsg:'Пожалуйста подождите...',
					params:{module:'projects', task:'LoadForm', id:id},
					success:function(form, o)
					{
						switch (o.result.data.matsten)
						{
							case "1": if (Ext.getCmp('mat1')){Ext.getCmp('mat1').setValue(true);}
							break;
							case "2":if (Ext.getCmp('mat2')){ Ext.getCmp('mat2').setValue(true);}
							break;
							case "3": if (Ext.getCmp('mat3')){Ext.getCmp('mat3').setValue(true);}
							break;
							case "4":if (Ext.getCmp('mat4')){ Ext.getCmp('mat4').setValue(true);}
							break;
						}
						//Ext.getCmp('ProjectForm').getForm().findField('matsten').setValue(o.result.data.matsten);

						//	alert(Ext.encode(o.data));

					}
				});
			}
		}
		},
		items:[form],
		buttons:[{
			text:'Сохранить',
			handler:function()
			{
				if (dr == 1)
				{
					var params = {task:'SaveProject', module:'projects', ver:0};
				}
				else
				{
					var params = {task:'SaveProject', module:'projects'};
				}
				Ext.ux.TinyMCE.initTinyMCE();
				tinyMCE.triggerSave();
				form.getForm().submit({
					url:'admincp.php',
					params:params,
					waitMsg:'Пожалуйста подождите',
					success:function(){

						Ext.getCmp('ProjectWindow').close();

						projectusersbase.load({params:{start:0, limit:25}});
						if (projectusersbase.data.length >0)
						{
							Ext.getCmp('projects_ver').setTitle('<b>Ожидают проверки ('+projectusersbase.data.length+')</b>');
						}
						else
						{
							Ext.getCmp('projects_ver').setTitle('Ожидают проверки (0)');
						}

						projectsbase.reload();

					}
				});
			}
		}]
	}).show();
}



var projects_loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{xaction:'Load_Tree_projects', module:'projects'}, preloadChilden: true});

function chenge_cat_project()
{
	var Tree4CCOA = new Ext.tree.TreePanel({
		autoScroll:true,
		animate:true,
		enableDD:false,
		width: 200,
		floatable: false,
		margins: '5 0 0 0',
		cmargins: '5 5 0 0',
		split: true,
		expanded: true,
		containerScroll: true,
		lines: false,
		singleExpand: true,

		useArrows: true,
		loader:projects_loader_tree,
		root:{
			nodeType: 'async',
			text: 'Корень',
			expanded:true,
			draggable:false,
			id:'0'
		}
	});
	var ChangeCatOfArt = new Ext.Window({
		layout      : 'fit',
		title: 'Выберите категорию',
		shim: false,
		modal: true,
		width       : 200,
		height      : 250,
		id: 'WindowChangeCatArt',
		autoScroll : true,
		closeAction :'close',
		plain       : true,
		items       : Tree4CCOA,
		buttons: [{
			text: 'Выбрать',

			handler: function(){
				var tr = Tree4CCOA.getSelectionModel().getSelectedNode();
				var id = tr.id;
				var name = tr.text;
				Ext.getCmp('ProjectForm').getForm().findField('cat_name').setValue(name);
				Ext.getCmp('ProjectForm').getForm().findField('cat_id').setValue(id);
				Ext.getCmp('WindowChangeCatArt').close();
			}
		}]
	}).show();

}

var projectCatTree = new Ext.tree.TreePanel({
	autoScroll:true,
	animate:true,
	enableDD:true,
	title: 'Категории',
	aling: 'top',
	width: 200,
	floatable: false,
	margins: '5 0 0 0',
	cmargins: '5 5 0 0',
	split: true,
	expanded: true,
	region:'west',
	containerScroll: true,
	lines: false,
	singleExpand: true,
	useArrows: true,
	loader: projects_loader_tree ,
	root:new Ext.tree.AsyncTreeNode({
		text: 'Корень',
		expanded:false,
		draggable:false,
		id:'0'
	}),
	tbar: [ {
		text: 'Создать',
		handler: function(){
			var node = projectCatTree.root.appendChild(new Ext.tree.TreeNode({
				text:'Новая категория',
				id: 'new',
				cls:'folder'
			}));

			projectCatTree.getSelectionModel().select(node);
			setTimeout(function(){
				projecttreeedit.editNode = node;
				projecttreeedit.startEdit(node.ui.textNode);


			}, 10);
		}

	},{
		text: 'Редактировать',
		handler: function(){
			var sel = projectCatTree.selModel.selNode;

			//projectCatTree.getSelectionModel().select;
			if (sel != null)
			{
				setTimeout(function(){
					projecttreeedit.editNode = sel;
					projecttreeedit.startEdit(sel.ui.textNode);


				}, 10);
			}
			// projectCatTree.getLoader().load(projectCatTree.root);
			// alert();



		}

	},{
		text: 'Удалить',
		handler:function(){
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту категорию', function(btn){
				if(btn=='yes'){
					var select = projectCatTree.selModel.selNode;

					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: 'admincp.php',
						params: {
							xaction: "Delete_Category_projects",
							id:  select.id,
							module:'projects'
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								projectCatTree.getLoader().load(projectCatTree.root);
								projectCatTree.root.expand();
								break;
							}
						},
						failure: function(response){
							var result=response.responseText;
							Ext.MessageBox.alert('error','could not connect to the database. retry later');
						}
					});
				}
			})
		}

	}]

});
var projecttreeedit = new Ext.tree.TreeEditor(projectCatTree, {
	allowBlank:false,
	blankText:'Требуеться название категории',
	updateEl:true,
	cancelOnEsc:true,
	completeOnEnter:true

});
//
// Action on nodeDrop Cat
projectCatTree.on('nodeDrop',
function(n, dd, e, data)
{
	var id = n.dropNode.id;
	var parentId = n.dropNode.parentNode.id;
	updateCatArt(id, parentId);


}
);

projectCatTree.on("enddrag", function(tree) {

	function simplifyNodes(node) {
		var resultNode = {};
		var kids = node.childNodes;
		var len = kids.length;
		for (var i = 0; i < len; i++) {
			resultNode[kids[i].id] = simplifyNodes(kids[i]);
		}
		return resultNode;
	}


	var encNodes = Ext.encode(simplifyNodes(tree.root));


	Ext.Ajax.request({
		method:'POST',
		url:'admincp.php',
		params:{xaction:'SortOrderprojects', nodes: encNodes, module:'projects'}
	});

});
function addCatProject(name, parentId){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		method: 'POST',
		params: {
			xaction: "Add_Category_projects",
			name: name,
			module:'projects',
			parentId: parentId
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				projectCatTree.getLoader().load(projectCatTree.root);
				projectCatTree.root.expand();
				//ds.commitChanges();   // changes successful, get rid of the red triangles
				//ds.reload();          // reload our datastore.
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later '+id+' '+parentId);
		}
	});
};
function updateCatProject(id, parent, name){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update_Category_projects",
			Id :  id,
			module:'projects',
			parent: parent,
			name: name
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				projectCatTree.getLoader().load(projectCatTree.root);
				projectCatTree.root.expand();
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
//End;
// aFterEdit Save
projecttreeedit.on('complete', function(e, value)
{
	e.editNode.setText(value);
	var idcat = projecttreeedit.editNode.id;
	var cattext = e.editNode.text;
	var parentId = e.editNode.parentNode.id;
	if (idcat == "new"){
		addCatProject(cattext, parentId);
	}
	else
	{
		updateCatProject(idcat, parentId, cattext)
	}
}
);
//end;
projectCatTree.on('nodeDrop',
function(n, dd, e, data)
{
	var id = n.dropNode.id;
	var parentId = n.dropNode.parentNode.id;
	updateCatProject(id, parentId);


}
);
// Action on Cat Click
projectCatTree.on('click', function(n){
	Ext.getCmp('projectsgrid').setTitle('Статьи -- '+n.text);
	projectsbase.baseParams = {xaction: "Listing_projects", module:'projects', id:n.id};
	projectsbase.load({params:{start:0, limit:25}});

});
//End;


// Просмотр и редактирование статей

// Base for projectGrid

var projectsbase = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_projects", module:'projects'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'title', mapping: 'title'},
	{name: 'num_project', mapping: 'num_project'},
	{name: 'price', mapping: 'price'},
	{name: 'ob_pl', mapping: 'ob_pl'},
	{name: 'jil_pl', mapping: 'jil_pl'},
	{name: 'stat', mapping: 'stat'},
	{name: 'link', mapping: 'link'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])
});
// End Base for projectGrid

// PagingBar for projectgrid
var projectpagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: projectsbase,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true

});
// End
// ArtclisRowAction

var projectRowAction = new Ext.ux.grid.RowActions({
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
projectRowAction.on({
	action:function(grid, record, action, row, col) {
		if (action =='edit')
		{
			var idnews = projectgrid.getSelectionModel().getSelected().get('Id');
			window_projects(idnews, 0);
		}
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот проект?',function (btn){
				if(btn=='yes'){
					var select = projectgrid.getSelectionModel().getSelected().get('Id');

					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: 'admincp.php',
						params: {
							xaction: "Delete_projects",
							id:  select,
							module:'projects'
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								projectsbase.reload();
								break;
							}
						},
						failure: function(response){
							var result=response.responseText;
							Ext.MessageBox.alert('error','could not connect to the database. retry later');
						}
					});
				}
			});
		}
	}
});


var projectgrid = new Ext.grid.EditorGridPanel({
	store: projectsbase,
	title: 'Проекты',
	frame:true,
	id:'projectsgrid',
	layout: 'fit',
	loadMask:true,
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "№ проекта", width: 50, sortable: true, dataIndex: 'num_project'},
	{header: "Название проекта", width: 100, sortable: true, dataIndex: 'title'},
	{ header: "Общ. Пл", width: 50, sortable: true, dataIndex: 'ob_pl'},
	{ header: "Жил. Пл", width: 50, sortable: true, dataIndex: 'jil_pl'},
	{ header: "Стоимость", width: 50, sortable: true, dataIndex: 'price'},


	{id:'stat', header: "Просмотров", width: 50, sortable: true, dataIndex: 'stat'},
	{id: 'Active', header: '', dataIndex:'Active',
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
		listClass: 'x-combo-list-small'
	}),  renderer: function(value) {
		if (value == 1) {
			return "Активная";
		}
		return "Не активная";
	}

	},
	//{id:'link', header: "link", width: 60, sortable: false, dataIndex: 'link'},
	projectRowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: projectpagingBar,
	plugins:projectRowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить Проект',
		handler:function(){window_projects('0');},
		iconCls: 'add'}
		,'-',{xtype:'textfield', fieldLabel:'Поиск', emptyText:'Поиск по проектам', width:120, id:'SearchProjects'},{xtype:'button', iconCls:'zoom', text:'Поиск',
		handler:function(){
			var f = Ext.getCmp('SearchProjects');
			var value = f.getValue();
			if (value != '')
			{
				projectsbase.baseParams = {xaction: "Listing_projects", module:'projects', search:value};
				projectsbase.load({params:{search:value,start:0, limit:25}});
			}
		}
		}
		],
		region: 'center'

});

projectgrid.on('afteredit', updateproject);

function updateproject(oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update_projects",
			Id :  oGrid_event.record.data.Id,
			Active: oGrid_event.record.data.Active,
			module:'projects',
			pos:oGrid_event.record.data.pos
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				projectsbase.commitChanges();   // changes successful, get rid of the red triangles
				projectsbase.reload();          // reload our datastore.
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
function confirmDeleteArt(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту статью', deleteArt);
};
// End projectGrid

var projectsview = {
	id:'projects',
	title: 'Разделы сайта',

	layout:'fit',
	bodyBorder: false,
	items: [
	{
		xtype:'tabpanel',
		activeItem:0,
		items:[{
			title:'Проекты',
			layout:'border',
			items:[projectCatTree,projectgrid]
		},{
			title:'Ожидают проверки',
			layout:'fit',
			id:'projects_ver',
			items:[projectusergrid]
		}]
	}]
}
init_modules[init_modules.length] = projectsview;
init_nav_modules[init_nav_modules.length] ={
	text:'Статьи', iconCls:'pages', handler:function(){
		Ext.getCmp('Content').layout.setActiveItem('projects');
		if (PagesStore.data.length  < 1)
		{
			projectsbase.load({params:{start:0, limit:25}});
			projectCatTree.root.expand();
		};
	}
};

Ext.apply(actions, {
'projects': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'projects')
	{
		Ext.getCmp('Content').layout.setActiveItem('projects');
		if (projectsbase.data.length  < 1)
		{
			projectsbase.load({params:{start:0, limit:25}});
			projectCatTree.root.expand();

		};
		projectusersbase.load({params:{start:0, limit:25}});
	}

}
});
ModulesRightMenu+='<li><img src="core/icons/page_copy.png"/><a id="projects" href="#">Проекты</a></li>';