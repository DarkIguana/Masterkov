var faq = {};

faq.url = 'admincp.php'; // Path to Post Data
faq.perPage = 25; // Listing per page

// Function For Edit Or Add Record to Base
faq.red = function (){
	var form = new Ext.FormPanel({
		labelAlign:'top',
		frame:true,
		id:'faq.red',
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
		                  },
		                  {
		                	  layout:'form',
		                	  items:[ {
		           			   xtype:'textfield',
		        			   name:'city',
		        			   fieldLabel:'Город'
		        		   }]
		                  },
		                  {
		                	  layout:'form',
		                	  items:[ {
		           			   xtype:'textfield',
		        			   name:'homepage',
		        			   fieldLabel:'Домашняя страничка'
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
			   fieldLabel:'Вопрос'
		   },
		   {
					xtype:'textarea',
					anchor:'90%',
					name:'answer',
					height:150,
					fieldLabel:'Ответ'
					
				}
		   
		]
		
	});
	new Ext.Window({
		modal:true,
		layout:'fit',
		frame:true,
		width:750,
		closeAction:'close',
		id:'faq.redwindow',
		height:560,
		items:form,
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			handler:function(){
			Ext.getCmp('faq.red').getForm().submit({
				url:faq.url,
				method:'post',
				params:{task:'SaveRecord',module:'faq'},
				success:function(){
					
					Ext.getCmp('faq.redwindow').close();
					faq.ds.reload();
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
faq.LoadForm = function (rec){
	if (Ext.getCmp('faq.red'))
	{
		Ext.getCmp('faq.red').getForm().loadRecord(rec);
	}
	else
	{
		Ext.MessageBox.alert('', 'Во время загрузки данных произошла ошибка!');
	}
}

// Function Update Record (Active|Not Active)
faq.updateRecord = function (oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: faq.url,
		params: {
			task: "UpdateRecord",
			module:'faq',
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				faq.ds.commitChanges(); // Commit Changes
				faq.ds.reload();        // Reload DataStore
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


// faq Data Store
faq.ds = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: faq.url,
		method: 'post'
	}),
	
	baseParams: {task:'Listing',module:'faq'},
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
//faq.ds.on("beforeload", collapseAllRows)
// faq PaggingBar
faq.pagingBar = new Ext.PagingToolbar({
	pageSize: faq.perPage,
	store: faq.ds,
	displayInfo: true
});

// Row Actions
faq.RowActions = new Ext.ux.grid.RowActions({
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
faq.RowActions.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот Вопрос?', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: faq.url,
						params: {
						    module:'faq',
							task: "DeleteRecord",
							id:  record.data.id
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								faq.ds.remove(record);
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
			faq.red();
			faq.LoadForm(record);
		}
	}
});
var expander = new Ext.ux.grid.RowExpander({
	enableCaching:false,
    tpl : new Ext.Template(
        '<div style="padding:10px;"><p><b>Вопрос:</b> {textHtml}</p><br>'
    	+'<p><b>Ответ:</b> {answerHtml}</p></div>'
    )
});
function expandAllRows()
{
    nRows=faq.ds.getCount();
    for(i=0;i< nRows;i++)
        myExpander.expandRow(grid.view.getRow(i));
}

function collapseAllRows()
{
    nRows=faq.ds.getCount();
    for(i=0;i<nRows;i++)
        expander.collapseRow(faq.grid.view.getRow(i));
}
faq.grid = new Ext.grid.EditorGridPanel({
	store: faq.ds,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	
	columns: [
	expander,
	{header: "<center><b>#</b></center>", width: 30, sortable: true, dataIndex: 'id'},
	{header: "<center><b>Имя</b></center>", width: 100, sortable: true, dataIndex: 'name'},
	{header: "<center><b>Email</b></center>", width: 100, sortable: true, dataIndex: 'email'},
	{header: "<center><b>Город</b></center>", width: 100, sortable: true, dataIndex: 'city'},
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

	},faq.RowActions
	],
	plugins: [faq.RowActions,expander],
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: faq.pagingBar,
	split: true
});
faq.grid.on('afteredit',faq.updateRecord);
faq.init = {
		title: 'Вопрос-Ответ',
			id: 'faq',
			layout: 'fit',
			autoScroll: true,
			items: {
				layout: 'fit',
				autoScroll: true,
				frame: true,
				items: faq.grid,
				tbar:[
				{
					text: 'Добавить',
					handler:function(){
						faq.red();
					},
					iconCls: 'add'}]
}};
init_modules[init_modules.length] = faq.init;
faq.loadData=function(){
	faq.ds.load({params:{start:0, limit:faq.perPage}});
};
Ext.apply(actions, {
	'faq': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'faq')
		{
			Ext.getCmp('Content').layout.setActiveItem('faq');
			if (faq.ds.data.length  < 1)
			{
				
				faq.loadData();
			};

		}
	}
	});
ModulesRightMenu+='<li><img src="core/icons/faq.png"/><a id="faq" href="#">Вопрос-Ответ</a></li>';