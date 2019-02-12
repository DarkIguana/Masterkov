var shortblog = htmled({name:'text', height:'250', label:'Полный Текст'});
var fullblog = htmled({name:'anons', height:250, label:'Короткий текст'});
var items_blog = [{
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
},fullblog,shortblog,{
	xtype:'textfield',
	name:'full',
	fieldLabel:'Теги',
	anchor:'90%'
}];
// Редактировать новости
var editblogform = form({fileUpload:true}, items_blog);
// create the window on the first click and reuse on subsequent clicks
var  win2blog = new Ext.Window({
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
	items       : editblogform,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			editblogform.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение новости...',
				params: {xaction: "Updateblog",module:'blog'},
				waitMsg: 'Пожалуйста подождите',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'сохранен.');
					editblogform.getForm().reset();
					win2blog.hide();
					dsblog.reload();
				},
				failure: function(editblogform, ermsg)
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
			editblogform.getForm().reset();
			win2blog.hide();
		}

	}]
});



// Добавить новость
var topblog = form({fileUpload:true}, items_blog);

var  winblog = new Ext.Window({
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	width       : 1024,
	autoScroll : true,
	height:550,
	closeAction :'hide',
	plain       : true,
	items       : topblog,
	buttons: [{
		text: 'Сохранить',
		handler:function(){
			tinyMCE.triggerSave();
			topblog.getForm().submit({
				url: 'admincp.php',
				waitTitle: 'Сохранение отзыва...',
				waitMsg: 'Пожалуйста подождите',
				params: {xaction:'Addblog',module:'blog'},
				ermsg: '',
				success: function(){
				//	Ext.MessageBox.alert('Статус', 'Документ сохранен.');
					topblog.getForm().reset();
					winblog.hide();
					dsblog.reload();
				},
				failure: function(toblogp, ermsg)
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
			topblog.getForm().reset();
			winblog.hide();
		}
	}]
});

var xgblog = Ext.grid;
var dsblog = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',

		method: 'post'
	}),
	baseParams: {xaction:'Listingblog', module:'blog'},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'date', mapping: 'date'},
	{name: 'title', mapping: 'title'},
	{name: 'text', mapping: 'text'},
	{name: 'anons', mapping: 'anons'},
	{name: 'link', mapping: 'link'},
	{name: 'full', mapping: 'full'},
	{name: 'comments', mapping: 'comments'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});

var pagingBarblog = new Ext.PagingToolbar({
	pageSize: 25,
	store: dsblog,
	displayInfo: true


});
function updateblog(oGrid_blogt){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "UpdateActiveblog",
			Id :  oGrid_blogt.record.data.Id,
			Active: oGrid_blogt.record.data.Active,
			module:'blog'


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				dsblog.commitChanges();
				dsblog.reload();
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
function confirmDeleteblog(id){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить это собрание', deleteblog);
};
function deleteblog(btn){
	if(btn=='yes'){
		var select = gridblog.getSelectionModel().getSelected().get('Id');
		Ext.Ajax.request({

			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				xaction: "Deleteblog",
				id:  select,
				module:'blog'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					dsblog.reload();
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



function EditComments(id)
{
	
	var items_blog = [{
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
				fieldLabel: 'Имя',
				name: 'name',
				dataIndex: 'name',
				allowBlank:false,
				anchor:'95%'
			}]
		}]
	},{xtype:'textarea', name:'text', anchor:'90%', fieldLabel:'Текст сообщения', height:150}];
	// Редактировать новости
	var editblogform2 = form({fileUpload:true, id:'FormComment'}, items_blog);
	// create the window on the first click and reuse on subsequent clicks
	var  win = new Ext.Window({
		// applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		modal: true,
		id:'EditComment',
		//manager: medialibwindowgroup,
		maximizable:true,
		width       :  550,
		height:350,
		autoScroll : true,
		closeAction :'hide',
		plain       : true,
		items       : editblogform2,
		buttons: [{
			text: 'Сохранить',
			handler:function(){
				tinyMCE.triggerSave();
				Ext.getCmp('FormComment').getForm().submit({
					url: 'admincp.php',
					waitTitle: 'Сохранение новости...',
					params: {xaction: "UpdateComment",module:'blog'},
					waitMsg: 'Пожалуйста подождите',
					ermsg: '',
					success: function(){
						//Ext.MessageBox.alert('Статус', 'сохранен.');
						Ext.getCmp('FormComment').getForm().reset();
						Ext.getCmp('EditComment').hide();
						dsblogcom.reload();
					},
					failure: function(editblogform2, ermsg)
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
			    Ext.getCmp('FormComment').getForm().reset();
				Ext.getCmp('EditComment').hide();
			}

		}]
	});

	var dsblogcom = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',

			method: 'post'
		}),
		baseParams: {xaction:'ListingComments', module:'blog', id:id},
		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'Id', mapping: 'id'},
		{name: 'date', mapping: 'date'},
		{name: 'name', mapping: 'name'},
		{name: 'text', mapping: 'text'},
		{name: 'email', mapping: 'email'},
		{name: 'full', mapping: 'full'}

		])

	});
	function deleteComm(btn){
		if(btn=='yes'){
			var select = gridblogcom.getSelectionModel().getSelected().get('Id');
			Ext.Ajax.request({

				waitMsg: 'Пожалуйста подождите',
				url: 'admincp.php',
				params: {
					xaction: "DeleteComment",
					id:  select,
					module:'blog'
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 55:  // Success : simply reload
						dsblogcom.reload();
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

	var blogact = new Ext.ux.grid.RowActions({

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
	blogact.on({
		action:function(grid, record, action, row, col) {
		
		
			if (action == 'delete')
			{
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот комментарий', deleteComm);
			}
			if (action == 'edit')
			{
				win.show();
				var id = grid.getSelectionModel().getSelected().get('Id');
				///var date = grid.getSelectionModel().getSelected().get('date');
				var name = grid.getSelectionModel().getSelected().get('name');
				var text = grid.getSelectionModel().getSelected().get('text');
				//var anons = grid.getSelectionModel().getSelected().get('anons');
				var email = grid.getSelectionModel().getSelected().get('email');
				//var full = grid.getSelectionModel().getSelected().get('full');
				var dmf = Ext.getCmp('FormComment').getForm();

				dmf.findField('id').setValue(id);
				//dmf.findField('date').setValue(date);
				dmf.findField('name').setValue(name);
				dmf.findField('text').setValue(text);
				//dmf.findField('anons').setValue(anons);
				//dmf.findField('full').setValue(full);
				Ext.ux.TinyMCE.initTinyMCE();

			}
		}
	});
	
	
	var pagingBarblog = new Ext.PagingToolbar({
		pageSize: 25,
		store: dsblogcom,
		displayInfo: true


	});
	dsblogcom.load({params:{limit:25, start:0}})
	var gridblogcom = new Ext.grid.EditorGridPanel({
		store: dsblogcom,
		frame:true,
		loadMask: true,
		enableColLock:false,
		clicksToEdit:1,
		columns: [
		{id: 'id', header: "#", width: 30, sortable: true, событийdataIndex: 'Id'},
		{id:'name', header: "Имя", width: 100, sortable: true, dataIndex: 'name'},
		{id:'date', header: "Дата", width: 100, sortable: true, dataIndex: 'date'},
		{id:'email', header: "Email", width: 100, sortable: false, dataIndex: 'email'},
		blogact
		],
		plugins: blogact,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		bbar: pagingBarblog,
		iconCls:'icon-grid',
		split: true
	});
	
	new Ext.Window({
		modal:true,
		layout:'fit',
		width:750,
		height:500,
		items:[gridblogcom],
		closeAction:'close'
	}).show();
	
}


/////


/// Action row
var blogact = new Ext.ux.grid.RowActions({

	actions:[{iconCls:'comment', qtip:'Редактировать комментарии'},' ',{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
blogact.on({
	action:function(grid, record, action, row, col) {
	
	if (action == "comment")
	{
		var id = grid.getSelectionModel().getSelected().get('Id');
		EditComments(id);
	}
		if (action == 'delete')
		{
			confirmDeleteblog();
		}
		if (action == 'edit')
		{
			win2blog.show();
			var id = grid.getSelectionModel().getSelected().get('Id');
			var date = grid.getSelectionModel().getSelected().get('date');
			var title = grid.getSelectionModel().getSelected().get('title');
			var text = grid.getSelectionModel().getSelected().get('text');
			var anons = grid.getSelectionModel().getSelected().get('anons');
			var full = grid.getSelectionModel().getSelected().get('full');
			var dmf = editblogform.getForm();

			dmf.findField('id').setValue(id);
			dmf.findField('date').setValue(date);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
			dmf.findField('anons').setValue(anons);
			dmf.findField('full').setValue(full);
			Ext.ux.TinyMCE.initTinyMCE();

		}
	}
});

///
var gridblog = new Ext.grid.EditorGridPanel({
	store: dsblog,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "#", width: 30, sortable: true, dataIndex: 'Id'},
	{id:'title', header: "Заголовок", width: 100, sortable: true, dataIndex: 'title'},
	{id:'date', header: "Дата", width: 100, sortable: true, dataIndex: 'date'},
	{id:'comments', header: "Комментариев", width: 100, sortable: true, dataIndex: 'comments'},
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
	blogact
	],
	plugins: blogact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: pagingBarblog,
	iconCls:'icon-grid',
	split: true,
	region: 'north'
});



gridblog.on('afteredit', updateblog);

gridblog.on('rowdblclick', function(grid, rowIndex, e) {
	var grid = gridblog;
	var idblog = grid.getSelectionModel().getSelected().get('Id');
	win2blog.show();
	var id = grid.getSelectionModel().getSelected().get('Id');
	var date =grid.getSelectionModel().getSelected().get('date');
	var title = grid.getSelectionModel().getSelected().get('title');
	var text = grid.getSelectionModel().getSelected().get('text');
	var full = grid.getSelectionModel().getSelected().get('full');
	var dmf = editblogform.getForm();

	dmf.findField('id').setValue(id);
	dmf.findField('date').setValue(date);
	dmf.findField('title').setValue(title);
	dmf.findField('text').setValue(text);
	dmf.findField('full').setValue(full);
});







var module_blog = {
	//title: 'Список',
	id: 'blog',
	layout: 'fit',
	autoScroll: true,
	items: {
		cls: 'email-form',
		layout: 'fit',
		autoScroll: true,
		frame: true,
		items: gridblog,
		tbar:[
		{
			text: 'Добавить',
			handler:function(){
				winblog.show();
			},
			iconCls: 'add'}]
	}};
	init_modules[init_modules.length] = module_blog;
	init_nav_modules[init_nav_modules.length] ={
		text:'Собрания', iconCls:'pages', handler:function(){
			
				dsblog.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('blog');


		}
	};

	Ext.apply(actions, {
	'blog': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'blog')
		{
			Ext.getCmp('Content').layout.setActiveItem('blog');
			if (dsblog.data.length  < 1)
			{
				dsblog.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/comments.png"/><a id="blog" href="#">Блог</a></li>';