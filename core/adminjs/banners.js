var banners = {};

banners.url = 'admincp.php'; // Path to Post Data
banners.perPage = 25; // Listing per page

// Function For Edit Or Add Record to Base
banners.red = function (){
	var form = new Ext.FormPanel({
		labelAlign:'top',
		frame:true,
		fileUpload:true,
		id:'banners.red',
		items:[
		       
		    	 
		                  {
		                	 
		           			   xtype:'textfield',
		        			   name:'title',
		        			   anchor:'99%',
		        			   fieldLabel:'Название'
		        		   
		                  },
		                  {
		                	 
		           			   xtype:'textfield',
		        			   name:'link',
		        			   anchor:'99%',
		        			   fieldLabel:'Ссылка'
		        		  
		                  },
		                  {
		                		xtype: 'fileuploadfield',
		                		emptyText: 'Выберите файл для загрузки',
		                		fieldLabel: 'Изображение<br/>(JPG,PNG,GIF,SWF)',
		                		anchor:'70%',
		                		name: 'photo-path',
		                		buttonCfg: {
		                			text: ' ',
		                			iconCls: 'upload-icon'
		                	}
		                  },{
		                	  xtype:'numberfield',
		                	  fieldLabel:'Ширина',
		                	  name:'width'
		                  },{
		                	  xtype:'numberfield',
		                	  fieldLabel:'Высота',
		                	  name:'height'
		                  },
		                 
		       
		       
		       
		       
		   {
			   xtype:'hidden', 
			   name:'id',
			   value:0
		   },
		   
		   
		  
	
		   
		]
		
	});
	new Ext.Window({
		modal:true,
		layout:'fit',
		frame:true,
		width:450,
		actionClose:'close',
		id:'banners.redwindow',
		height:350,
		items:form,
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			handler:function(){
			Ext.getCmp('banners.red').getForm().submit({
				url:banners.url,
				method:'post',
				params:{task:'SaveRecord',module:'banners'},
				success:function(){
					banners.ds.reload();
					Ext.getCmp('banners.redwindow').close();
				},
				failure:function(){
					Ext.MessageBox.alert('', 'Во время сохранения произошла ошибка, повторите попытку чуть позднее');
				}
			});
		}
		}]
	}).show();
};
// Function return Form from Function "red"
banners.LoadForm = function (rec){
	if (Ext.getCmp('banners.red'))
	{
		Ext.getCmp('banners.red').getForm().loadRecord(rec);
	}
	else
	{
		Ext.MessageBox.alert('', 'Во время загрузки данных произошла ошибка!');
	}
};

// Function Update Record (Active|Not Active)
banners.updateRecord = function (oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: banners.url,
		params: {
			task: "UpdateRecord",
			module:'banners',
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			type: oGrid_event.record.data.type


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				banners.ds.commitChanges(); // Commit Changes
				banners.ds.reload();        // Reload DataStore
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...'); // If
																						// Error
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');  // If
																								// Error
		}
	});
};


// banners Data Store
banners.ds = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: banners.url,
		method: 'post'
	}),
	
	baseParams: {task:'Listing',module:'banners'},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'link', mapping: 'link'},
	{name: 'image', mapping: 'image'},
	{name: 'title', mapping: 'title'},
	{name: 'width', mapping: 'width'},
	{name: 'height', mapping: 'height'},
	{name: 'html', mapping: 'html'},
	{name: 'bannerType', mapping: 'bannerType'},
	{name: 'type', type: 'int', mapping: 'type'},
	{name: 'active', type: 'int', mapping: 'active'}
	])

});


var Types = [['0',  'Шапка сайта'],['3',  'Главная (малый)'],['4',  'Главная (большой)'], ['1', 'Баннер справа №1'],['2', 'Баннер справа №2']];
function getTypeBanner(num){
    for (var i=0; i<Types.length; i++){
    	if (Types[i][0]==num){
    	
    		return Types[i][1];
    	}
    }
    return 'Тип не определён';
}

//banners.ds.on("load", banners.collapseAllRows);
// banners PaggingBar
banners.pagingBar = new Ext.PagingToolbar({
	pageSize: banners.perPage,
	store: banners.ds,
	displayInfo: true
});

// Row Actions
banners.RowActions = new Ext.ux.grid.RowActions({
	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,header:"<center><b>Операции</b></center>"
	,widthIntercept:70
	,id:'actions'
});
// On Row Action
banners.RowActions.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот Вопрос?', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: banners.url,
						params: {
						    module:'banners',
							task: "DeleteRecord",
							id:  record.id
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								banners.ds.reload();
								break;
							}
						},
						failure: function(response){
							
							Ext.MessageBox.alert('error','could not connect to the database. retry later');
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			banners.red();
			banners.LoadForm(record);
		}
	}
});
banners.expander = new Ext.ux.grid.RowExpander({
	enableCaching:false,
    tpl : new Ext.Template(
        '<div style="padding:10px;">{html}'
    	+'</div>'
    )
});
banners.expandAllRows=function()
{
    nRows=banners.ds.getCount();
    for(i=0;i< nRows;i++)
    	banners.expander.expandRow(banners.grid.view.getRow(i));
};

banners.collapseAllRows = function ()
{
	if (banners.ds.getCount()==0){
		return true;
	}
    nRows=banners.ds.getCount();
    
    for(i=0;i<nRows;i++){
        banners.expander.collapseRow(banners.grid.view.getRow(i));
    }
};
banners.grid = new Ext.grid.EditorGridPanel({
	store: banners.ds,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	
	columns: [
	banners.expander,
	//{header: "<center><b>#</b></center>", width: 30, sortable: true, dataIndex: 'id'},
	{header: "<center><b>Название</b></center>", width: 100, sortable: true, dataIndex: 'title'},
	
	{header: "<center><b>Ссылка</b></center>", width: 100, sortable: true, dataIndex: 'link'},
	{id: 'Active', header: '<center><b>Свойство<b></center>', dataIndex:'active',
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
	{id: 'Type', header: '<center><b>Место<b></center>', dataIndex:'type',
		// width: 150,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: Types
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			return getTypeBanner(value);
		}

		},
	
	banners.RowActions
	],
	plugins: [banners.RowActions,banners.expander],
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: banners.pagingBar,
	split: true
});
banners.grid.on('afteredit',banners.updateRecord);
banners.init = {
		title: 'Баннеры',
			id: 'banners',
			layout: 'fit',
			autoScroll: true,
			items: {
				layout: 'fit',
				autoScroll: true,
				frame: true,
				items: banners.grid,
				tbar:[
				{
					text: 'Добавить',
					handler:function(){
						banners.red();
					},
					iconCls: 'add'}]
}};
init_modules[init_modules.length] = banners.init;
banners.loadData=function(){
	banners.ds.load({params:{start:0, limit:banners.perPage}});
};
Ext.apply(actions, {
	'banners': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'banners')
		{
			Ext.getCmp('Content').layout.setActiveItem('banners');
			if (banners.ds.data.length  < 1)
			{
				banners.loadData();
			};

		}
	}
	});
ModulesRightMenu+='<li><img src="core/icons/banners.png"/><a id="banners" href="#">Баннеры</a></li>';