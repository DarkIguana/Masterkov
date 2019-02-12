var medialibwindowgroup = new Ext.WindowGroup();
medialibwindowgroup.zseed = 10000;
function deleteMediaImage(ext, id)
{
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите',
		url: 'admincp.php',
		params: {
			xaction: "DELETEIMG",
			id:  id,
			module:'medialib',
			ext: ext
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 55:  // Success : simply reload
				Ext.getCmp('medialibDV').store.reload();
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
}

function medialib(editor)
{
	

	//var ed;
	function deleteCatMedia(btn){
		if(btn=='yes'){
			var select = medialibCatTree.selModel.selNode;

			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите',
				url: 'admincp.php',
				params: {
					xaction: "DELETECAT",
					module:'medialib',
					id:  select.id
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 55:  // Success : simply reload
						medialibstore.baseParams= {id:0, xaction: "LISTING", module:'medialib'};
						medialibstore.load({params:{start:0, limit:25}});
						medialibCatTree.getLoader().load(medialibCatTree.root);
						medialibCatTree.root.expand();
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

	// function UpdateCat on nodeDrop
	function updateCatMedia(id, parent, name){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			params: {
				xaction: "UPDATECAT",
				Id :  id,
				module:'medialib',
				parent: parent,
				name: name

			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					medialibCatTree.getLoader().load(medialibCatTree.root);
					medialibCatTree.root.expand();
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
	// End;



	// Function Add Cat on Tree
	function addCatMedia(name, parentId){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			method: 'POST',
			params: {
				xaction: "ADDCAT",
				name: name,
				module:'medialib',
				parentId: parentId
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					medialibCatTree.getLoader().load(medialibCatTree.root);
					medialibCatTree.root.expand();
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




var gallery_loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{xaction:'Load_Tree', module:'medialib'}, preloadChildren: true});

	// Категории
	var medialibCatTree = new Ext.tree.TreePanel({
		//useArrows:true,
		autoScroll:true,
		animate:true,
		enableDD:true,
		title: 'Категории',
		aling: 'top',
		width: 200,
		floatable: false,
		margins: '5 0 0 0',
		//style: 'z-index:200001',
		cmargins: '5 5 0 0',
		split: true,
		expanded: true,
		region:'west',
		containerScroll: true,
		lines: false,
		singleExpand: true,
		//rootVisible: false,
		useArrows: true,
		//resize:medialibCatTree,

		loader:gallery_loader_tree,

		root:{
			nodeType: 'async',
			text: 'Корень',
			expanded:true,
			draggable:false,
			id:'0'
		},
		tbar: [ {
			text: 'Создать',
			handler: function(){
				var node = medialibCatTree.root.appendChild(new Ext.tree.TreeNode({
					text:'Новая категория',
					id: 'new',
					cls:'folder'
				}));

				medialibCatTree.getSelectionModel().select(node);
				setTimeout(function(){
					medialibcatedit.editNode = node;
					medialibcatedit.startEdit(node.ui.textNode);


				}, 10);
				// medialibCatTree.getLoader().load(medialibCatTree.root);
				// alert();
			}

		},{
			text: 'Редактировать',
			handler: function(){
				var sel = medialibCatTree.selModel.selNode;

				//medialibCatTree.getSelectionModel().select;
				if (sel != null)
				{
					setTimeout(function(){
						medialibcatedit.editNode = sel;
						medialibcatedit.startEdit(sel.ui.textNode);


					}, 10);
				}
				// medialibCatTree.getLoader().load(medialibCatTree.root);
				// alert();



			}

		},{
			text: 'Удалить',
			handler: function(){
				Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту категорию?<br>Все файлы и подкатегории будут удалены', deleteCatMedia);
			}

		}]

	});
	var medialibcatedit = new Ext.tree.TreeEditor(medialibCatTree, {
		allowBlank:false,
		blankText:'Требуеться название категории',
		// selectOnFocus:true,
		cls: 'x-small-editor x-tree-editor2',
		style: 'z-index:200001;',
		updateEl:true,
		cancelOnEsc:true,
		completeOnEnter:true

	});
	//
	// Action on nodeDrop Cat
	medialibCatTree.on('nodeDrop',
	function(n, dd, e, data)
	{
		var id = n.dropNode.id;
		var parentId = n.dropNode.parentNode.id;
		//var name = "";
		updateCatMedia(id, parentId);
	}
	);
	//End;
	// aFterEdit Save
	medialibcatedit.on('complete', function(e, value)
	{
		e.editNode.setText(value);
		var idcat = medialibcatedit.editNode.id;
		var cattext = e.editNode.text;
		var parentId = e.editNode.parentNode.id;
		if (idcat == "new"){
			addCatMedia(cattext, parentId);
			//alert('Changed '+cattext);
		}
		else
		{
			updateCatMedia(idcat, parentId, cattext)
			//alert('old'+k);
		}
	}
	);
	//end;

	// Action on Cat Click
	medialibCatTree.on('click', function(n){
		medialibstore.baseParams={xaction:'LISTING', module:'medialib', id:n.id};
		medialibstore.load({params:{start:0, limit:25}});
	});

	var medialibstore = new Ext.data.JsonStore({
		url: 'admincp.php',
		baseParams:{xaction:'LISTING', module:'medialib'},
		root: 'results',
		totalProperty: 'total',
		fields: ['name', 'url', 'ext', 'id']
	});
	medialibstore.load({params:{start:0, limit:25, id:0}});
	medialibCatTree.root.expand();
	var medialibtpl = new Ext.XTemplate(
	'<tpl for=".">',
	'<div class="thumb-wrap" id="{name}">',
	'<div class="thumb"><img src="{url}" title="{name}"></div>',
	'<span class="x-editable"><a href="#" onclick="deleteMediaImage('+"'{ext}', '{id}'"+')">Удалить</a></span></div>',
	'</tpl>',
	'<div class="x-clear"></div>'
	);
	medialibstore.on('load', function() {
		Ext.getCmp('InsertImageMedia').disable();
	});
	var medialibDV = new Ext.DataView({
		store: medialibstore,
		id: 'medialibDV',
		tpl: medialibtpl,
		singleSelect: true,
		listeners: {
		"selectionchange" : function()
		{
			Ext.getCmp('InsertImageMedia').enable();

		}
		},
		autoHeight:true,
		// multiSelect: false,
		overClass:'x-view-over',
		// selectedClass: 'x-view-selected',
		itemSelector:'div.thumb-wrap',
		emptyText: 'Нет файлов',

		plugins: [
		//new Ext.DataView.DragSelector()
		//new Ext.DataView.LabelEditor({dataIndex: 'name'})
		],

		prepareData: function(data){
			data.shortName = Ext.util.Format.ellipsis(data.name, 15);
			return data;
		}
	});
	function uploadsuccess(id, ext, image, height)
	{
		var imagepanel = new Ext.Panel({
			//title: 'Изображение',
			baseCls: 'x-plain',
			width: 500,
			height: height,
			html: '<center><img src="'+image+'"></center>'
		});
		var window = new Ext.Window({
			layout : 'fit',
			shim: false,
			id: 'windowuploadsuccess',
			modal: true,
			manager: medialibwindowgroup,
			width       : 500,
			autoScroll : true,
			closeAction :'hide',
			plain       : true,
			items: [imagepanel],
			buttonAlign: 'center',
			buttons: [{
				text:'Вставить',
				handler: function()
				{
					tinyMCE.activeEditor.execCommand('mceInsertContent',false,'<img src="'+image+'">');
					Ext.getCmp('windowuploadsuccess').close();
					Ext.getCmp('windowMediaLib').close();

				}

			},{
				text: 'Удалить',
				handler: function()
				{
					deleteMediaImage(ext, id);
					Ext.getCmp('windowuploadsuccess').close();
				}
			},{
				text: 'Закрыть',
				handler: function()
				{
					Ext.getCmp('windowuploadsuccess').close();
				}
			}]
		}).show();
	}
	var medialibUpload = new Ext.FormPanel({
		//renderTo: 'fi-form',
		fileUpload: true,
		baseCls: 'x-plain',

		autoHeight: true,
		bodyStyle: 'padding: 10px 10px 0 10px;',
		labelWidth: 50,
		defaults: {
			anchor: '95%',
			allowBlank: false,
			msgTarget: 'side'
		},
		items: [{
			xtype: 'fileuploadfield',

			emptyText: 'Выберите файл для загрузки',
			fieldLabel: 'Файл',
			name: 'photo-path',
			buttonCfg: {
				text: ' ',
				iconCls: 'upload-icon'
			}
		}]
	});
	var  medialibUploadWin = new Ext.Window({
		//applyTo     : 'hello-win',
		//	layout      : 'fit',
		shim: false,
		modal: true,
		width       : 600,
		manager: medialibwindowgroup,
		autoScroll : true,
		closeAction :'hide',
		plain       : true,
		items       : [medialibUpload],
		buttonAlign: 'center',
		buttons: [

		{
			text: 'Загрузить',
			handler: function(){
				var sel = medialibCatTree.selModel.selNode;
				if (sel == null)
				{
					id = "0";
				}
				else
				{
					id = sel.id;
				}
				if(medialibUpload.getForm().isValid()){
					medialibUpload.getForm().submit({
						url: 'admincp.php',
						params:{xaction:'UploadPhoto', catid:id, module:'medialib'},
						waitMsg: 'Пожалуйста подождите, идёт загрузка файла...',
						success: function(medialibUpload, o){
							uploadsuccess(o.result.id, o.result.ext, o.result.image, o.result.height);
							medialibstore.reload();
							medialibUploadWin.hide();
						},
						failure: function(medialibUpload, o){
							if (o.result.msg == 55)
							{
								Ext.MessageBox.alert('Ошибка', 'Неверный формат файла.<br>Файл для загрузки может быть только с форматами: JPG, GIF, PNG');
							}
						}
					});
				}
			}
		},
		{
			text: 'Закрыть',
			handler: function()
			{
				medialibUploadWin.hide();
			}
		}
		]
	});
	var medialibpB = new Ext.PagingToolbar({
		pageSize: 25,
		autoWidth: true,
		store: medialibstore
		//displayInfo: true
	});
	var medialibPP = new Ext.Panel({
		id:'images-view',
		frame:true,
		region:'center',
		autoHeight:true,
		collapsible:true,

		bbar: [medialibpB],
		tbar:[{
			text:'Загрузить файл',
			iconCls: 'uploadImage',
			handler: function()
			{
				medialibUploadWin.show();
			}
		},{
			text:'Вставить выбранный файл',
			iconCls: 'InsertMediaFile',
			id: 'InsertImageMedia',
			disabled: true,
			handler: function()
			{
				var selNode = medialibDV.getSelectedRecords();
				var records = medialibDV.getSelectedRecords();
				for(i=0,len = records.length;i < len; i++){
					tinyMCE.activeEditor.execCommand('mceInsertContent',false,'<img src="'+records[i].data.url+'">');
				}

				Ext.getCmp('windowMediaLib').close();

			}
		}],
		items:[medialibDV]

	});
	var window  = new Ext.Window({
		layout : 'fit',
		shim: false,
		modal: true,
		id: 'windowMediaLib',
		width       : 1024,
		height:550,
		autoScroll : true,
		//manager: medialibwindowgroup,
		closeAction :'close',
		plain       : true,
		listeners: {
		"show" : function()
		{
			medialibstore.baseParams= {id:0, xaction: "LISTING", module:'medialib'};
			medialibstore.load({params:{start:0, limit:25}});
		}
		},
		items: {
			xtype:'tabpanel',
			activeTab: 0,
			//defaults:{autoHeight:true, bodyStyle:'padding:10px'},
			items:[{
				title:'Медиа библеотека',
				id: 'MediaLibWindow',
				layout: 'border',
				//autoHeight:true,
				height: 520,
				items: [medialibCatTree, medialibPP]
			}]
		}
	});
	

	Ext.getCmp('windowMediaLib').show();
	Ext.getCmp('windowMediaLib').toFront();

}
