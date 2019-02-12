var reviews = {};

reviews.url = 'admincp.php'; // Path to Post Data
reviews.perPage = 25; // Listing per page

// Function For Edit Or Add Record to Base
reviews.red = function (){
	var form = new Ext.FormPanel({
		labelAlign:'top',
		frame:true,
		id:'reviews.red',
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
		id:'reviews.redwindow',
		height:560,
		items:form,
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			handler:function(){
			Ext.getCmp('reviews.red').getForm().submit({
				url:reviews.url,
				method:'post',
				params:{task:'SaveRecord',module:'comments'},
				success:function(){
					
					Ext.getCmp('reviews.redwindow').close();
					reviews.ds.reload();
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
reviews.LoadForm = function (rec){
	if (Ext.getCmp('reviews.red'))
	{
		Ext.getCmp('reviews.red').getForm().loadRecord(rec);
	}
	else
	{
		Ext.MessageBox.alert('', 'Во время загрузки данных произошла ошибка!');
	}
}

// Function Update Record (Active|Not Active)
reviews.updateRecord = function (oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: reviews.url,
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
				reviews.ds.commitChanges(); // Commit Changes
				reviews.ds.reload();        // Reload DataStore
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


// Reviews Data Store
reviews.ds = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: reviews.url,
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
//reviews.ds.on("beforeload", collapseAllRows)
// Reviews PaggingBar
reviews.pagingBar = new Ext.PagingToolbar({
	pageSize: reviews.perPage,
	store: reviews.ds,
	displayInfo: true
});

// Row Actions
reviews.RowActions = new Ext.ux.grid.RowActions({
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
reviews.RowActions.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этот Вопрос?', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите',
						url: reviews.url,
						params: {
						    module:'comments',
							task: "DeleteRecord",
							id:  record.data.id
						},
						success: function(response){
							var result=eval(response.responseText);
							switch(result){
								case 55:  // Success : simply reload
								reviews.ds.remove(record);
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
			reviews.red();
			reviews.LoadForm(record);
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
    nRows=reviews.ds.getCount();
    for(i=0;i< nRows;i++)
        myExpander.expandRow(grid.view.getRow(i));
}

function collapseAllRows()
{
    nRows=reviews.ds.getCount();
    for(i=0;i<nRows;i++)
        expander.collapseRow(reviews.grid.view.getRow(i));
}
reviews.grid = new Ext.grid.EditorGridPanel({
	store: reviews.ds,
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

	},reviews.RowActions
	],
	plugins: [reviews.RowActions,expander],
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: reviews.pagingBar,
	split: true
});
reviews.grid.on('afteredit',reviews.updateRecord);
reviews.init = {
		title: 'Отзывы',
			id: 'reviews',
			layout: 'fit',
			autoScroll: true,
			items: {
				layout: 'fit',
				autoScroll: true,
				frame: true,
				items: reviews.grid,
				tbar:[
				{
					text: 'Добавить отызвы',
					handler:function(){
						reviews.red();
					},
					iconCls: 'add'}]
}};
init_modules[init_modules.length] = reviews.init;
reviews.loadData=function(){
	reviews.ds.load({params:{start:0, limit:reviews.perPage}});
};
Ext.apply(actions, {
	'reviews': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'reviews')
		{
			Ext.getCmp('Content').layout.setActiveItem('reviews');
			
				
			reviews.loadData();
			

		}
	}
	});
ModulesRightMenu+='<li><img src="core/icons/comment.png"/><a id="reviews" href="#">Отзывы</a></li>';