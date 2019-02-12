var tips = {};

tips.url = 'admincp.php'; // Path to Post Data
tips.perPage = 25; // Listing per page

// Function For Edit Or Add Record to Base
tips.red = function (){
	var form = new Ext.FormPanel({
		labelAlign:'top',
		frame:true,
		id:'tips.red',
		items:[
		       {
		    	   layout:'table',
		    	   border:false,
		    	   bodyBorder:false,
		    	   frame:false,
		    	   defaults:{
		    	     width:250,
		    	     border:false,
		    	     bodyBorder:false
		           },
		           layoutConfig:{
		        	   columns:3
		           },
		           items:[
		                  {
		                	  layout:'form',
		                	  items:[{
		           			   xtype:'textfield',
		        			   name:'name',
		        			   fieldLabel:'Имя'
		        		   }]
		                  },
		                  {
		                	  layout:'form',
		                	  items:[{
		           			   xtype:'textfield',
		        			   name:'email',
		        			   fieldLabel:'Email'
		        		   }]
		                  },{
		                	  layout:'form',
		                	  items:[ {
		                			xtype:'datefield',
		                			fieldLabel: 'Дата',
		                			value: new Date(),
		                			name: 'date',
		                			format: 'd-m-Y',
		                			anchor:'40%'
		                		}]
		                  }
		                 ]
		       },
		       
		       
		       
		   {
			   xtype:'hidden', 
			   name:'id',
			   value:0
		   },
		   
		   
		  
		  
		   {
			   xtype:'textarea',
			   anchor:'90%',
			   name:'text',
			   height:150,
			   fieldLabel:'Текст отзыва'
		   }
		   
		]
		
	});
	new Ext.Window({
		modal:true,
		layout:'fit',
		frame:true,
		width:750,
		closeAction:'close',
		id:'tips.redwindow',
		height:560,
		items:form,
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			handler:function(){
			Ext.getCmp('tips.red').getForm().submit({
				url:tips.url,
				method:'post',
				params:{task:'SaveRecord',module:'comments'},
				success:function(){
					
					Ext.getCmp('tips.redwindow').close();
					tips.ds.reload();
				},
				failure:function(){
					Ext.MessageBox.alert('', 'Во время сохранения произошла ошибка, повторите попытку чуть позднее');
				}
			});
		}
		}]
	}).show();
}
// Function return Form from Function "red"
tips.LoadForm = function (rec){
	if (Ext.getCmp('tips.red'))
	{
		Ext.getCmp('tips.red').getForm().loadRecord(rec);
	}
	else
	{
		Ext.MessageBox.alert('', 'Во время загрузки данных произошла ошибка!');
	}
}

// Function Update Record (Active|Not Active)
tips.updateRecord = function (oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: tips.url,
		params: {
			task: "UpdateRecord",
			module:'comments',
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				tips.ds.commitChanges(); // Commit Changes
				tips.ds.reload();        // Reload DataStore
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


// tips Data Store
tips.ds = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: tips.url,
		method: 'post'
	}),
	
	baseParams: {task:'Listing',module:'comments'},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'date', mapping: 'date'},
	{name: 'email', mapping: 'email'},
	{name: 'city', mapping: 'city'},
	{name: 'homepage', mapping: 'homepage'},
	{name: 'answer', mapping: 'answer'},
	{name: 'text', mapping: 'text'},
	{name: 'answerHtml', mapping: 'answerHtml'},
	{name: 'textHtml', mapping: 'textHtml'},
	{name: 'active', type: 'int', mapping: 'active'}
	])

});
//tips.ds.on("beforeload", collapseAllRows)
// tips PaggingBar
tips.pagingBar = new Ext.PagingToolbar({
	pageSize: tips.perPage,
	store: tips.ds,
	displayInfo: true
});

// Row Actions
tips.RowActions = new Ext.ux.grid.RowActions({
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
tips.RowActions.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот Вопрос?', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: tips.url,
						params: {
						    module:'comments',
							task: "DeleteRecord",
							id:  record.data.id
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								tips.ds.remove(record);
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
			tips.red();
			tips.LoadForm(record);
		}
	}
});
var expander = new Ext.ux.grid.RowExpander({
	enableCaching:false,
    tpl : new Ext.Template(
        '<div style="padding:10px;"><p> {textHtml}</p></div>'
    	
    )
});
function expandAllRows()
{
    nRows=tips.ds.getCount();
    for(i=0;i< nRows;i++)
        myExpander.expandRow(grid.view.getRow(i));
}

function collapseAllRows()
{
    nRows=tips.ds.getCount();
    for(i=0;i<nRows;i++)
        expander.collapseRow(tips.grid.view.getRow(i));
}
tips.grid = new Ext.grid.EditorGridPanel({
	store: tips.ds,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	
	columns: [
	expander,
	{header: "<center><b>#</b></center>", width: 30, sortable: true, dataIndex: 'id'},
	{header: "<center><b>Имя</b></center>", width: 100, sortable: true, dataIndex: 'name'},
	{header: "<center><b>Email</b></center>", width: 100, sortable: true, dataIndex: 'email'},
	
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

	},tips.RowActions
	],
	plugins: [tips.RowActions,expander],
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: tips.pagingBar,
	split: true
});
tips.grid.on('afteredit',tips.updateRecord);
tips.init = {
		title: 'Отзывы',
			id: 'tips',
			layout: 'fit',
			autoScroll: true,
			items: {
				layout: 'fit',
				autoScroll: true,
				frame: true,
				items: tips.grid,
				tbar:[
				{
					text: 'Добавить отызвы',
					handler:function(){
						tips.red();
					},
					iconCls: 'add'}]
}};
init_modules[init_modules.length] = tips.init;
tips.loadData=function(){
	tips.ds.load({params:{start:0, limit:tips.perPage}});
};
Ext.apply(actions, {
	'tips': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'tips')
		{
			Ext.getCmp('Content').layout.setActiveItem('tips');
			
				
			tips.loadData();
			

		}
	}
	});
ModulesRightMenu+='<li><img src="core/icons/comment.png"/><a id="tips" href="#">Советы</a></li>';