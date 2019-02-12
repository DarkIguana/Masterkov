// Категории Статей
var rss_newsaddform;
var HiddenField;
var cat_name;
var rss_news_loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{xaction:'Load_Tree_rss_news', module:'rss_news'}, preloadChildren: true});
function confirmdeleteCatrss_news(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту категорию', deleteCatrss_news);
};
function deleteCatrss_newsrss_newsrss_news(btn){
	if(btn=='yes'){
		var select = rss_newsCatTree.selModel.selNode;

		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				xaction: "Delete_Category_rss_news",
				id:  select.id,
				module:'rss_news'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
					rss_newsCatTree.root.expand();
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

function EditSettingModule_rss_news()
{
	
	var form = new Ext.FormPanel({
		width:740,
		height:600,
		frame:true,
		layout:'fit',
		autoScroll:true,
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			border:false,
			frame:true,
			defaults:{layout:'form',frame:true, bodyStyle:'padding:10px', autoScroll:true}
			,items:[{
				title:'Настройки модуля',
				items:[{
					xtype:'textfield',
					fieldLabel:'Название модуля',
					name:'name_mod',
					anchor:'50%'
				},{
					xtype:'textfield',
					fieldLabel:'Статей на странице',
					name:'per_page',
					width:100
				}]
			},{
				title:'Настройки дизайна',
				
				items:[{
			xtype:'textarea',
			fieldLabel:'Единичная запись',
			width:550,
			height:300,
			name:'design_one'
		},{
			xtype:'textarea',
			fieldLabel:'Все записи',
			width:550,
			height:300,
			name:'design_all'
		}]
			}]
		}
		]
	});
	var win = new Ext.Window({
		shim:true,
		frame:true,
		width:600,
		tools:[{id:'help', qtip:'Справка',handler:function(){new Ext.Window({
		width:300,
		height:300,
		layout:'fit',
		frame:true,
		title:'Справка',
		closeAction:'close',
		autoLoad:{url:'admincp.php?help=news'}
	}).show();}}],
		height:400,
		layout:'fit',
		iconCls:'setting',
		title:'Настройки модуля',
		buttons:[{
			text:'Сохранить',
			handler:function(){
				form.getForm().submit({
					url:'admincp.php',
					params:{task:'SaveSetting', module:'rss_news'},
					success:function(){
						win.close();
						Ext.MessageBox.alert('','Настройки успешно изменены');
					},
					failure:function(){
						Ext.MessageBox.alert('','Во время сохранения произошла ошибка, попробуйте чуть позднее');
					}
				});
			}
		}],
		listeners:{
			"show": function(){
				form.load({
					url:'admincp.php',
					method:'post',
					waitMsg:'Подождите идёт загрузка данных',
					params:{module:'rss_news', task:'LoadSetting'}
				});
			}
		},
		items:form
	}).show();
}

// function UpdateCat on nodeDrop
function updateCatArt(id, parent, name){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "Update_Category_rss_news",
			Id :  id,
			module:'rss_news',
			parent: parent,
			name: name
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				//rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
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
function addCatArt(name, parentId){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		method: 'POST',
		params: {
			xaction: "Add_Category_rss_news",
			name: name,
			module:'rss_news',
			parentId: parentId
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
				rss_newsCatTree.root.expand();
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


// Categoree of rss_news
var rss_newsCatTree = new Ext.tree.TreePanel({
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
	loader: rss_news_loader_tree ,
	root:new Ext.tree.AsyncTreeNode({
		text: 'Корень',
		expanded:false,
		draggable:false,
		id:'0'
	}),
	tbar: [ {
		text: 'Создать',
		handler: function(){
	new Ext.Window({
				modal:true,
				width:400,
				actionClose:'close',
				frame:true,
				id:'NewCatArticlesWindow',
				height:130,
				items:[new Ext.FormPanel({
					width:400,
					height:130,
					frame:true,
					id:'NewCatArticlesForm',
					defaults:{
						xtype:'textfield'
						,anchor:'90%'
					},
					items:[{
						fieldLabel:'Название',
						allowBlank:false,
						name:'name'
					},{
						fieldLabel:'RSS Канал',
						allowBlank:false,
						name:'channel'
						
					}]
				})],
				buttonAlign:'center',
				buttons:[{
					text:'Создать новую категорию',
					handler:function(){
						var form = Ext.getCmp('NewCatArticlesForm');
						if (form.getForm().isValid())
						{

							form.getForm().submit({
								waitMsg: 'Пожалуйста подождите...',
								url: 'admincp.php',
								method: 'POST',
								params: {
									xaction: "Add_Category_rss_news",
									module:'rss_news'
								},
								success: function(response){
								
										rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
										rss_newsCatTree.root.expand();
										Ext.getCmp('NewCatArticlesWindow').close();
						
								},
								failure: function(response){
									Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
								}
							})
						}
						else
						{
							Ext.MessageBox.alert('Ошибка', 'Не заполнены обязательные поля');
						}
					}
				}]
			}).show();
		}

	},{
		text: 'Редактировать',
		handler: function(){
			new Ext.Window({
				modal:true,
				width:400,
				actionClose:'close',
				frame:true,
				id:'NewCatArticlesWindow',
				height:130,
				items:[new Ext.FormPanel({
					width:400,
					height:130,
					frame:true,
					id:'NewCatArticlesForm',
					defaults:{
						xtype:'textfield'
						,anchor:'90%'
					},
					items:[{xtype:'hidden', name:'id'},{
						fieldLabel:'Название',
						allowBlank:false,
						name:'name'
					},{
						fieldLabel:'Описание',
						allowBlank:false,
						name:'channel'
					}]
				})],
				buttonAlign:'center',
				buttons:[{
					text:'Сохранить изменения',
					handler:function(){
						var form = Ext.getCmp('NewCatArticlesForm');
						if (form.getForm().isValid())
						{
							
							form.getForm().submit({
								waitMsg: 'Пожалуйста подождите...',
								url: 'admincp.php',
								method: 'POST',
								params: {
									xaction: "Update_Category_rss_news",
									module:'rss_news'
									
								},
								success: function(response){
								
										rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
										rss_newsCatTree.root.expand();
										Ext.getCmp('NewCatArticlesWindow').close();
						
								},
								failure: function(response){
									Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
								}
							})
						}
						else
						{
							Ext.MessageBox.alert('Ошибка', 'Не заполнены обязательные поля');
						}
					}
				}]
			}).show();
			var sel = rss_newsCatTree.selModel.selNode;
			if (sel)
			{
			 var desc = sel.attributes.channel;
			 var id = sel.id;
			 var name = sel.text;
			 var form = Ext.getCmp('NewCatArticlesForm').getForm();
			 form.findField('id').setValue(id);
			 form.findField('name').setValue(name);
			 form.findField('channel').setValue(desc);
			}
			// rss_newsCatTree.getLoader().load(rss_newsCatTree.root);
			// alert();



		}

	},{
		text: 'Удалить',
		handler: confirmdeleteCatrss_news

	}]

});


//
// Action on nodeDrop Cat
rss_newsCatTree.on('nodeDrop',
function(n, dd, e, data)
{
	var id = n.dropNode.id;
	var parentId = n.dropNode.parentNode.id;
	updateCatArt(id, parentId);


}
);

rss_newsCatTree.on("enddrag", function(tree) {

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
		params:{xaction:'SortOrderrss_news', nodes: encNodes, module:'rss_news'}
	});

});



// Action on Cat Click
rss_newsCatTree.on('click', function(n){
	rss_newsbase.baseParams = {xaction: "Listing_rss_news", module:'rss_news', id:n.id};
	rss_newsbase.load({params:{start:0, limit:25}});

});
//End;


// Просмотр и редактирование статей

// Base for rss_newsGrid

var rss_newsbase = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_rss_news", module:'rss_news'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'pos', mapping: 'pos'},
	{name: 'title', mapping: 'title'},
	{name: 'link', mapping: 'link'},
	{name: 'text', mapping: 'text'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});
// End Base for rss_newsGrid

// PagingBar for rss_newsgrid
var rss_newspagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: rss_newsbase,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction



//
//rss_newsGrid
//

var rss_newsgrid = new Ext.grid.EditorGridPanel({
	store: rss_newsbase,
	title: 'Статьи',
	frame:true,
	id:'rss_newsgrid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{id: 'id', header: "#", width: 30, sortable: true, dataIndex: 'Id'},
	{id:'title', header: "Заголовок", width: 100, sortable: true, dataIndex: 'title'},
	{id:'link', header: "link", width: 60, sortable: false, dataIndex: 'link'}
	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: rss_newspagingBar,
	
	iconCls:'icon-grid',
	split: true,
	tbar:[
	
		'->',{xtype:'buttongroup',
	items:[{
text:'<b>Настройки модуля</b>', iconCls:'setting', handler: EditSettingModule_rss_news}]}],
		region: 'center'

});



// End rss_newsGrid

var rss_newsview = {
	id:'rss_news',
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
	items: [rss_newsCatTree,rss_newsgrid]
}
init_modules[init_modules.length] = rss_newsview;
init_nav_modules[init_nav_modules.length] ={
	text:'Статьи', iconCls:'pages', handler:function(){
		Ext.getCmp('Content').layout.setActiveItem('rss_news');
		if (PagesStore.data.length  < 1)
		{
			rss_newsbase.load({params:{start:0, limit:25}});
			rss_newsCatTree.root.expand();
		};
	}
};

Ext.apply(actions, {
'rss_news': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'rss_news')
	{
		Ext.getCmp('Content').layout.setActiveItem('rss_news');
		if (rss_newsbase.data.length  < 1)
		{
			rss_newsbase.load({params:{start:0, limit:25}});
			rss_newsCatTree.root.expand();
			
		};

	}
}
});
ModulesRightMenu+='<li><img src="core/icons/page_copy.png"/><a id="rss_news" href="#">RSS Новости</a></li>';