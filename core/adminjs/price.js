var price = {};

price.updateRecord=  function (oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'price',
			pos:oGrid_event.record.data.pos
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				price.base.commitChanges();   // changes successful, get rid of the red triangles
				price.base.reload();          // reload our datastore.
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
price.chenge_cat = function ()
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
		loader: price.loader_tree,
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
		id: 'price.WindowChangeCatArt',
		autoScroll : true,
		closeAction :'close',
		plain       : true,
		items       : Tree4CCOA,
		buttons: [{
			text: 'Выбрать',
			iconCls:'accept',
			handler: function(){
				var tr = Tree4CCOA.getSelectionModel().getSelectedNode();
				if (tr)
				{
				var id = tr.id;
				var name = tr.text;
				Ext.getCmp('price.form').getForm().findField('cat_name').setValue(name);
				Ext.getCmp('price.form').getForm().findField('cat_id').setValue(id);
				Ext.getCmp('price.WindowChangeCatArt').close();
				}
				else
				{
					Ext.MessageBox.alert('', 'Выберите категорию');
				}
			}
		}]
	}).show();
}


price.loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', 
	baseParams:{xaction:'Load_Tree', module:'price'},
	preloadChildren: true});

price.editTree = function ()
{
	var form = new Ext.FormPanel({
		labelAlign:'top',
		fileUpload: true,
		id:'price.EditFormTree',
		frame:true,
		
		monitorValid:true,
		items:[{xtype:'hidden', name:'id'},{
			xtype:'textfield',
			name:'name',
			anchor:'90%',
			fieldLabel:'Название',
			allowBlank:false
		},{
			xtype:'combo',
			fieldLabel:'Категория активна',
			editable:false,
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Да'],['0','Нет']]
			}),
			mode: 'local',
			name:'active',
			hiddenName:'active',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			listClass: 'x-combo-list-small'
		},htmled({name:'desc', label:'Описание', height:250})],
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			iconCls:'accept',
			handler:function(){
			var ff = Ext.getCmp('price.EditFormTree').getForm();
			ff.submit({
				url:'admincp.php',
				loadMask:true,
				waitMsg:'Подождите пожалуйста...',
				waitTitle:'Сохранение данных',
				params:{module:'price', task:'AddCat'},
				method:'post',
				success:function(){
					Ext.getCmp('price.EditWindowTree').close();
					price.tree.root.reload();
				},
				failure:function(){
					Ext.MessageBox.alert('', 'Во время сохранения произошла ошибка! попробуйте чуть позднее');
				}
			});
		}
		}]
	});
	return new Ext.Window({
		width:850,
		height:500,
		frame:true,
		modal:true,
		id:'price.EditWindowTree',
		actionClose:'close',
		items:form
	}).show();
}



price.tree = new Ext.tree.TreePanel({
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
	loader: price.loader_tree ,
	root:new Ext.tree.AsyncTreeNode({
		text: 'Корень',
		expanded:false,
		draggable:false,
		id:'0'
	}),
	tbar: [ {
		text: 'Создать',
		handler: function(){
		price.editTree();
		}

	},{
		text: 'Редактировать',
		handler: function(){
		var sel = price.tree.selModel.selNode;
		
		if (sel)
		{
			if (sel.id == 0)
			{
				Ext.MessageBox.alert('', 'Эту категорию нельзя редактировать');
			}
			else
			{
		price.editTree();
		var form = Ext.getCmp('price.EditFormTree').getForm();
		form.findField('id').setValue(sel.id);
		form.findField('name').setValue(sel.text);
		form.findField('active').setValue(sel.attributes.active);
		form.findField('desc').setValue(sel.attributes.desc);
			}
		}
		
		else
		{
			Ext.MessageBox.alert('', 'Выберите категорию')
		}



		}

	},{
		text: 'Удалить',
		handler: function(){
		var sel = price.tree.selModel.selNode;
		if (sel)
		{
			if (sel.id == 0)
			{
				Ext.MessageBox.alert('', 'Эту категорию нельзя удалить');
			}
			else
			{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту категорию?', function(btn){
				if (btn=="yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{task:'deletecat', id:sel.id, module:'price'},
						method:'post',
						success:function(){
							price.tree.root.reload();
						},
						failure:function(){
							Ext.MessageBox.alert('Ошибка', 'Не возможно удалить категорию');
						}
					})
				}
			});
			}
		}
		else
		{
			Ext.MessageBox.alert('', 'Выберите категорию')
		}
	}

	}]
});
price.updateCat = function (id, parent){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update_Category",
			id :  id,
			module:'price',
			parent: parent
			
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				//ArticleCatTree.getLoader().load(ArticleCatTree.root);
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

price.tree.on('nodeDrop',
		function(n, dd, e, data)
		{
			var id = n.dropNode.id;
			var parentId = n.dropNode.parentNode.id;
			price.updateCat(id, parentId);


		}
		);

price.tree.on("enddrag", function(tree) {

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
				params:{xaction:'SortOrder', nodes: encNodes, module:'price'}
			});

});


price.addedit = function (id){
	
	
	function UploadPhoto()
	{
		var fotoupload2 = new Ext.FormPanel({

			fileUpload: true,
			width: '100%',
			frame: true,
			//border:false,
			
			shim: true,
			bodyStyle: 'padding: 10px 10px 0 10px;',
			labelWidth: 50,
			items: [{
				xtype:'textfield',
				name:'name',
				fieldLabel:'Название',
				anchor:'95%'
			},{
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
			}],
			buttonAlign:'center',
			buttons: [{
				text: 'Загрузить',
				handler: function(){
					if(fotoupload2.getForm().isValid()){
						var idd = Ext.getCmp('price.form').getForm().findField('id').getValue();
						
						fotoupload2.getForm().submit({
							url: 'admincp.php',
							method:'POST',
							params:{id:idd, module:'price',task:'UploadPhoto'},
							waitTitle: 'Загрузка фотографии',
							waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
							success: function(fotoupload, o){
								//msg('Success', 'Processed file "'+o.result.file+'" on the server');
								//Ext.getCmp('price.form.tabimages.grid').store.reload();
								Ext.getCmp('price.UploadWindow').close();

							},
							failure: function(fotoupload2, o){
								Ext.MessageBox.alert('Ошибка','Не удалось загрузить фотографию');
							}
						});
					}
				}
			}]
		});
		var  shopupfileswin2 =
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			shim: false,
			modal: true,
			title: 'Загрузка фотографий',
			id:'price.UploadWindow',
			width       : 400,
			height      : 240,
			autoScroll : true,
			closeAction :'close',
			plain       : true,
			listeners: {'close':function(){Ext.getCmp('price.form.tabimages.grid').store.reload();}},
			items       : [fotoupload2],
			buttons: [
			{
				text: 'Закрыть',
				handler: function()
				{
					Ext.getCmp('price.form.tabimages.grid').store.reload();
					Ext.getCmp('price.UploadWindow').close();
				}
			}]
		}).show();
	}
	
	var base = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "Listing_Images", module:'price'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'image', mapping: 'image'},
		{name: 'file', mapping: 'file'},
		{name: 'osn', mapping: 'osn'},
		{name: 'name', mapping: 'name'},
		{name: 'pos', mapping: 'pos'}
		])

	});
	// End Base for ArticleGrid

	// PagingBar for articlegrid
	var pagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: base,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true


	});
	// End
	// ArtclisRowAction

 var RowAction = new Ext.ux.grid.RowActions({

		actions:[{
			iconCls: 'apply'
				,qtip:'Сделать основной'
			},{
			iconCls: 'delete'
			,qtip:'Удалить'
		}]
		,widthIntercept:Ext.isSafari ? 4 : 2
		,id:'actions'
	});
RowAction.on({
		action:function(grid, record, action, row, col) {
			if (action == 'delete')
			{
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту фотографию', function(btn){
					if (btn == "yes")
					{
						Ext.Ajax.request({
							url:'admincp.php',
							params:{module:'price', task:'deleteImage', id:record.data.id},
							method:'post',
							success:function(){
								base.reload();
							}
						});
					}
				})
			}
			if (action == "apply")
			{
				Ext.Ajax.request({
					url:'admincp.php',
					params:{module:'price', task:'setOsnImage', id:record.data.id},
					method:'post',
					success:function(){
						base.reload();
					}
				});
			}
	}});
	
var grid = new Ext.grid.EditorGridPanel({
	store: base,
	
	
	id:'price.form.tabimages.grid',
	enableColLock:false,
	clicksToEdit:1,
     height:'80%',
     frame:true,
     loadMask:true,
	autoWidth:true,
	listeners:{
		"afteredit":function (oGrid_event){
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					xaction: "UpdateImagePos",
					id :  oGrid_event.record.data.id,
					name :  oGrid_event.record.data.name,
					module:'price',
					pos:oGrid_event.record.data.pos
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 33:
						Ext.getCmp('price.form.tabimages.grid').store.commitChanges();   
					
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
	{id: 'image', header: "", width: 200, sortable: true, dataIndex: 'image', renderer:function (value){
		return "<center><img src='files/price/"+value+"' width='80'></center>";
	}},
	{id: 'file', header: "Файл", width: 150, sortable: true, dataIndex: 'file'},
	{id: 'name', header: "Название", width: 150, sortable: true, dataIndex: 'name', editor:Ext.form.TextField},
	{ header: "Поз.", width: 150, sortable: true, dataIndex: 'pos', editor:new Ext.form.NumberField()},
	{id: 'osn', header: "", width: 150, sortable: true, dataIndex: 'osn', renderer:function(value){
		if (value == 1)
		{
			return "<b>Основная</b>";
		}
		return "";
	}},
	RowAction

	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: false
	},
	height:150,
	bbar:pagingBar,
	plugins:RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Загрузить новую фотографию',
		handler:function(){
		UploadPhoto();
		
		},
		iconCls: 'add'}]
		

});
	
	
	var form = new Ext.FormPanel({
		id:'price.form',
		width:890,
		
		frame:true,
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
					layoutConfig:{columns:4,
					tableAttrs: {
	                style: {
	                    width: 880
	                }
	            }
					},
					defaults:{width:250},
					items:[{
						layout:'form',
						width:400,
						colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Название',
							name:'name',
							anchor:'99%'
						}]
					},{
						layout:'form',
						width:200,
						//style:'width:175px;',
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Катагория',
							name:'cat_name',
							disabled:true
						},{
							xtype:'hidden',
							name:'cat_id'
						},{
							xtype:'hidden',
							name:'id'
						}]
					},{
						layout:'form',
						width:200,
						items:[{
							width:180,
							xtype:'textfield',
							name:'price',
							fieldLabel:'Цена'
						}]
					}]
				},{
					xtype:'textfield',
					anchor:'95%',
					name:'shortdesc',
					fieldLabel:'Короткое описание'
				},htmled({name:'desc', label:'Описание', height:350}),htmled({name:'teh', label:'Техническое описание', height:350})]
			},{
				id:'price.form.tabimages',
				disabled:true,
				height:460,
				layout:'fit',
				title:'Фотографии',
				bodyStyle:'padding:0px;',
				iconCls:'imagesIcon',
				items:[grid],
				listeners:{
				activate:function(){
				base.load({params:{start:0, limit:25}});
			}
			}
			},{

				title:'Параметры SEO',
				layout:'form',
				width:1024,
				height:550,
				items: [{
					xtype:'textfield',
					fieldLabel: 'Заголовок страницы',
					name: 'TitlePage',
					

					anchor:'95%'
				},
				{
					xtype:'textarea',
					fieldLabel: 'Описание страницы',
					name: 'DescPage',
					

					anchor:'95%'
				},
				{
					xtype:'textarea',
					fieldLabel: 'KeyWords',
					name: 'KeysPage',
					

					anchor:'95%'
				}
				]}]
		}]
	});
	new Ext.Window({
		width:900,
		height:640,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		id:'price.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.Ajax.request({
					url:'admincp.php',
					waitMsg:'Подождите пожалуйста',
					params:{module:'price', task:'NewItem'},
					success:function(response)
					{
						Ext.getCmp('price.form.tabimages').enable(true);
						var o = eval(response.responseText);
						Ext.getCmp('price.form').getForm().findField('id').setValue(o);
						base.baseParams={xaction: "Listing_Images", module:'price', dd:o};
					}
				});
			}
			else
			{
				base.baseParams={xaction: "Listing_Images", module:'price', dd: id};
				Ext.getCmp('price.form.tabimages').enable(true);
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'price', task:'save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('price.WindowAddEdit').close();
					price.base.reload();

				}
			});
		}}]
	}).show();
}


price.base = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing", module:'price'},
	remoteSort:true,
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name:'id', mapping:'id'},
{name:'cat_id', mapping:'cat_id'},
{name:'pos', mapping:'pos'},
{name:'name', mapping:'name'},
{name:'desc', mapping:'desc'},
{name:'shortdesc', mapping:'shortdesc'},
{name:'price', mapping:'price'},
{name:'vol', mapping:'vol'},
{name:'teh', mapping:'teh'},
{name:'spec', mapping:'spec'},
{name:'new', mapping:'new'},
{name:'link', mapping:'link'},
{name:'TitlePage', mapping:'TitlePage'},
{name:'DescPage', mapping:'DescPage'},
{name:'KeysPage', mapping:'KeysPage'},
{name:'active', mapping:'active'}

	])

});
// End Base for ArticleGrid



price.tree.on('click', function(n){
	
	price.base.baseParams = {xaction: "Listing", module:'price', id:n.id};
	price.base.load({params:{start:0, limit:25}});

});

// PagingBar for articlegrid
price.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: price.base,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction

price.RowAction = new Ext.ux.grid.RowActions({

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
price.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'price', task:'deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							price.base.reload();
						}
					});
				}
			})
		}
		if (action == 'edit')
		{
			//price.form
			

			var cat_name = price.tree.getSelectionModel().getSelectedNode();
			if (!cat_name)
			{
				var catname = "Корень";
				var cat_name={};
				cat_name.id=0;
			}
			else
			{
			var catname = cat_name.text || "Корень";
			}
			price.addedit(record.data.id);
			Ext.getCmp('price.form').getForm().loadRecord(record)
			Ext.getCmp('price.form').getForm().findField('cat_name').setValue(catname);
			Ext.getCmp('price.form').getForm().findField('cat_id').setValue(cat_name.id);
		}
	}
});
price.grid = new Ext.grid.EditorGridPanel({
	store: price.base,
	title: '',
	frame:true,
	 loadMask:true,
	id:'price.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{id: 'id', header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{id: 'pos', header: "Поз.", width: 20, sortable: true, dataIndex: 'pos',
	editor: new Ext.form.TextField},
	{id:'name', header: "Заголовок", width: 100, sortable: true, dataIndex: 'name'},
	
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
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	price.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: price.pagingBar,
	plugins:price.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		var cat_name = price.tree.getSelectionModel().getSelectedNode();
		if (!cat_name)
		{
			var catname = "Корень";
			var cat_name={};
			cat_name.id=0;
		}
		else
		{
		var catname = cat_name.text || "Корень";
		}
		price.addedit(0);
		Ext.getCmp('price.form').getForm().findField('cat_name').setValue(catname);
		Ext.getCmp('price.form').getForm().findField('cat_id').setValue(cat_name.id);
		
		},
		iconCls: 'add'},'-', {text:'Загрузить прайс-лист', handler:function(){
			var fotoupload2 = new Ext.FormPanel({

				fileUpload: true,
				width: '100%',
				frame: true,
				//border:false,
				
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
				}],
				buttonAlign:'center',
				buttons: [{
					text: 'Загрузить',
					handler: function(){
						if(fotoupload2.getForm().isValid()){
							
							
							fotoupload2.getForm().submit({
								url: 'admincp.php',
								method:'POST',
								params:{module:'price',task:'uploadExcel'},
								waitTitle: 'Обработка прайс-листа',
								waitMsg: 'Пожалуйста подождите, идёт обработка прайс-листа...',
								success: function(fotoupload, o){
									
									var res = Ext.decode(o.response.responseText);
									if (res.msg){
										 Ext.MessageBox.alert('',res.msg);
									}
									else {
									   Ext.MessageBox.alert('','Прайс лист обработан успешно');
									}
									//msg('Success', 'Processed file "'+o.result.file+'" on the server');
									//Ext.getCmp('price.form.tabimages.grid').store.reload();
									Ext.getCmp('price.UploadWindow').close();
									price.tree.root.reload();

								},
								failure: function(fotoupload2, o){
									var res = Ext.decode(o.response.responseText);
									if (res.msg){
										 Ext.MessageBox.alert('Ошибка',res.msg);
									}
									else {
									   Ext.MessageBox.alert('Ошибка','Не удалось загрузить файл');
									}
								}
							});
						}
					}
				}]
			});
			var  shopupfileswin2 =
			new Ext.Window({
				//applyTo     : 'hello-win',
				layout      : 'fit',
				shim: false,
				modal: true,
				title: 'Загрузка прайс-лист',
				id:'price.UploadWindow',
				width       : 400,
				height      : 240,
				autoScroll : true,
				closeAction :'close',
				plain       : true,
				items:[fotoupload2], 
				buttons: [
				{
					text: 'Закрыть',
					handler: function()
					{ 
					
						Ext.getCmp('price.UploadWindow').close();
					}
				}]
			}).show();
		}}],
		region: 'center'

});

price.grid.on('afteredit', price.updateRecord);


// End articleGrid

price.view = {
	id:'price',
	title: 'Разделы сайта',
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
	items: [price.tree,price.grid]
}
init_modules[init_modules.length] = price.view;
init_nav_modules[init_nav_modules.length] ={
	text:'Каталог', iconCls:'pages', handler:function(){
	if (Ext.getCmp('Content').layout.activeItem.id != 'price')
	{
		Ext.getCmp('Content').layout.setActiveItem('price');
		if (price.base.data.length  < 1)
		{
			price.base.load({params:{start:0, limit:25}});
			price.tree.root.expand();
			
		};

	}
	}
};

Ext.apply(actions, {
'price': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'price')
	{
		Ext.getCmp('Content').layout.setActiveItem('price');
		if (price.base.data.length  < 1)
		{
			price.base.load({params:{start:0, limit:25}});
			price.tree.root.expand();
			
		};

	}
}
});
ModulesRightMenu+='<li><img src="core/icons/catalog.png"/><a id="price" href="#">Каталог</a></li>';
