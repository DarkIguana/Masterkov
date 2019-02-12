function confirmDeletePoll(){
	Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить этот опрос?', deletePoll);
};
function deletePoll(btn){
	if(btn=='yes'){
		var select = PollGrid.getSelectionModel().getSelected().get('Id')

		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'poll', task: "DELETE",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					Pollds.reload();
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

function UpdatePoll(oGrid_event){
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			module:'poll', task: "UPDATE",
			Id :  oGrid_event.record.data.Id,
			Active: oGrid_event.record.data.Active
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				Pollds.commitChanges();   // changes successful, get rid of the red triangles
				Pollds.reload();          // reload our datastore.
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
var PollAddForm = new Ext.FormPanel({
	frame:true,
	bodyStyle:'padding:5px 5px 0',
	autoWidth: true,
	autoHeight: true,
	defaults:{
		anchor: '100%',
		xtype:'textfield'
	},
	items: [{

		fieldLabel:'Вопрос',
		name:'quest',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 1',
		name: 'ans_1',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 2',
		name: 'ans_2',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 3',
		name: 'ans_3'
	},{

		fieldLabel:'Ответ # 4',
		name: 'ans_4'
	},{

		fieldLabel:'Ответ # 5',
		name: 'ans_5'
	},{

		fieldLabel:'Ответ # 6',
		name: 'ans_6'
	},{

		fieldLabel:'Ответ # 7',
		name: 'ans_7'
	},{

		fieldLabel:'Ответ # 8',
		name: 'ans_8'
	},{

		fieldLabel:'Ответ # 9',
		name: 'ans_9'
	},{

		fieldLabel:'Ответ # 10',
		name: 'ans_10'
	}
	]


});
// create the window on the first click and reuse on subsequent clicks

var  PollAddWin = new Ext.Window({
	//applyTo     : 'hello-win',
	shim: false,
	modal: true,
	width       : 600,
	height      : 450,
	autoScroll : true,
	closeAction :'hide',
	plain       : true,
	items       : PollAddForm,
	buttons: [{
		text: 'Сохранить',

		handler:function(){
			PollAddForm.getForm().submit({
				url: 'admincp.php',
				method:'POST',
				params:{task:'save', module:'poll'},
				waitMsg: 'Сохранение опроса...',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Опрос сохранен.');
					PollAddForm.getForm().reset();
					PollAddWin.hide();
					Pollds.reload();
				},
				failure: function(top, ermsg)
				{


				}


			});
		}
	},{
		text: 'Закрыть',
		handler: function()
		{
			PollAddForm.getForm().reset();
			PollAddWin.hide();
		}
	}]
});

// Добавить новость
var PollEditForm = new Ext.FormPanel({
	frame:true,

	//
	region: 'center',
	autoWidth:true,
	autoHeight:true,
	items: [{
		layout:'column',
		items:[{
			columnWidth:.8,
			//defaultType: 'textfield',
			
			layout: 'form',
			items: [
			{
			    xtype:'fieldset',
				autoWidth:true,
				autoHeight:true,
				//defaultType: 'textfield',
				defaults:{
				xtype:'textfield',
				
				anchor:'100%'
			},
				title: 'Info',
				items: [{
				
		fieldLabel:'Вопрос',
		name:'quest',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 1',
		name: 'ans_1',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 2',
		name: 'ans_2',
		allowBlank:false
	},{

		fieldLabel:'Ответ # 3',
		name: 'ans_3'
	},{

		fieldLabel:'Ответ # 4',
		name: 'ans_4'
	},{

		fieldLabel:'Ответ # 5',
		name: 'ans_5'
	},{

		fieldLabel:'Ответ # 6',
		name: 'ans_6'
	},{

		fieldLabel:'Ответ # 7',
		name: 'ans_7'
	},{

		fieldLabel:'Ответ # 8',
		name: 'ans_8'
	},{

		fieldLabel:'Ответ # 9',
		name: 'ans_9'
	},{

		fieldLabel:'Ответ # 10',
		name: 'ans_10'
	}
				]
			}]},
			{
				columnWidth:.2,
				//defaultType: 'textfield',
				layout: 'form',
				
				items: [
				{
					xtype:'fieldset',
					autoWidth:true,
					autoHeight:true,
					//height:321,
					
					title: 'Акт',
					defaults: {
						 xtype:'checkbox',
						
						 height: 25
						 
					},
					items: [
					{
               hideLabel: true,
               fieldClass: '',
               name: 'ansact_1',
               inputValue: '1',
               //style
               value: 1   },
                    {
               hideLabel: true,
               
               name: 'ansact_2',
               inputValue: '1',
               //style
               value: 1
                    },
                    {
               hideLabel: true,
               name: 'ansact_3',
               inputValue: '1',
               //style
               value: 1
                    },
                    {
               hideLabel: true,
               name: 'ansact_4',
               bodyStyle:'margin-top:50px;',
               inputValue: '1',
               //style
               value: 1
                    },
                    {
               hideLabel: true,
               name: 'ansact_5',
               inputValue: '1',
               //style
               value: 1
                    },
                    {
               hideLabel: true,
               name: 'ansact_6',
               inputValue: '1',
               //style
               value: 1
              
                    },
                    {
               hideLabel: true,
               name: 'ansact_7',
               inputValue: '1',
               //style
               value: 1
              },
                    {
               hideLabel: true,
               name: 'ansact_8',
               inputValue: '1',
               //style
               value: 1
              
                    },
                    {
               hideLabel: true,
               name: 'ansact_9',
               inputValue: '1',
               //style
               value: 1
                    },
                    {
               hideLabel: true,
               name: 'ansact_10',
               inputValue: '1',
               //style
               value: 1
               	
               }
                    

					]
				}]},
				{xtype: 'hidden', name:'ansid_1'},{xtype: 'hidden', name:'ansid_2'},{xtype: 'hidden', name:'ansid_3'},{xtype: 'hidden', name:'ansid_4'}
	,{xtype: 'hidden', name:'ansid_5'},{xtype: 'hidden', name:'ansid_6'},{xtype: 'hidden', name:'ansid_7'},{xtype: 'hidden', name:'ansid_8'},
	{xtype: 'hidden', name:'ansid_9'},{xtype: 'hidden', name:'ansid_10'},{xtype: 'hidden', name:'id'}
				]}
				]


});
// create the window on the first click and reuse on subsequent clicks

var  PollEditWin = new Ext.Window({
	//applyTo     : 'hello-win',
	shim: false,
	modal: true,
	width       : 600,
	height      : 450,
	autoScroll : true,
	closeAction :'hide',
	plain       : true,
	items       : [PollEditForm],
	buttons: [{
		text: 'Сохранить',

		handler:function(){
			PollEditForm.getForm().submit({
				url: 'admincp.php?action=editsave',
				waitMsg: 'Сохранение Опроса...',
				method:'post',
				params:{task:'editsave', module:'poll'},
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('Статус', 'Опрос сохранен.');
					PollEditForm.getForm().reset();
					PollEditWin.hide();
					Pollds.reload();

				},
				failure: function(top, ermsg)
				{

				}


			});
		}
	},{
		text: 'Закрыть',
		handler: function()
		{
			PollEditForm.getForm().reset();
			PollEditWin.hide();
		}
	}]
});


var Pollds = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method:'POST'
	}),
	baseParams: {task:'loadds', module:'poll'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'date', mapping: 'date'},
	{name: 'quest', mapping: 'quest'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});

var PollpagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: Pollds,
	displayInfo: true
});
var Pollact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'PollResult',
		qtip:'Результаты опроса'
	},'-',
	{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
		
	}]
	,widthIntercept:Ext.isSafari ? 4 : 4
	,id:'actions'
});
Pollact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);
		if (action == 'delete')
		{
			confirmDeletePoll();
			//win.show();
		}
		if (action == 'PollResult')
		{
			new Ext.Window({
				
	modal: true,
	width: 320,
	height:500,
	
	shim: false,
	plain:true,
//	autoScroll : true,
	listeners: {
		"show": function()
		{
			Ext.Ajax.request({
				url:'admincp.php',
				waitMsg:'Пожалуйста подождите идёт загрузка данных',
				params:{id:record.id, module:'poll', task:'poll_results'},
				success:function(o)
				{
					var result = Ext.decode(o.responseText);
					Ext.getCmp('PollResults').setTitle('<center>'+result['quest']+'</center>')
					var num_ans = result.t_ans-1;
					for (i=0;i<=num_ans;i++)
					{
					
						Ext.DomHelper.append('PollRes', {
							tag:'div',
							style:'padding:5px;',
							html:'<b>'+result['answers'][i]['ans']+"<b> : <div id='ans_"+i+"' style='background-color:RED; color:#000; width:40px;'>"+result['answers'][i]['proc']+" %</div>"
						});
						
					}
					for (i=0;i<=num_ans;i++)
					{
						var pp = result['answers'][i]['proc'];
						if (pp == 0)
						{
							pp = 40;
						}
						else
						{
							pp = pp*3;
						}
						Ext.get('ans_'+i).setWidth(pp, true);
					}
				}
				});
		}
	},
	closeAction :'close',
	id:'PollResults',
	html:'<div id="PollRes" style="width:200px; padding:15px;"></div>'
			}).show();
		
		}
		if (action == 'edit')
		{
			PollEditWin.show();
			PollEditForm.form.load({
				url:'admincp.php',
				params:{
					id:record.id,
					task:'load2form', module:'poll'},
				method:'POST',
				waitMsg:'Пожалуйста подождите, идёт загрузка...',
				success:function(form, action) {
					// Ext.MessageBox.alert('Message', 'Loaded OK');
				}
				,failure:function()
				{
					Ext.MessageBox.alert('','во время загрузки данных произошла ошибка попробуйте позднее');
				}

			});
			
		}
	}
});

var PollGrid = new Ext.grid.EditorGridPanel({
	id: 'poll',
	title: 'Опросы',
	store: Pollds,
	loadMask: true,
	frame:true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "#", width: 30, sortable: true, dataIndex: 'Id'},
	{id:'quest', header: "Вопрос", width: 300, sortable: true, dataIndex: 'quest'},
	{id: 'Active', header: '', dataIndex:'Active',
	 width: 150,
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
			return "Активный";
		}
		return "Не активный";
	}

	},Pollact




	],
	plugins: Pollact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: false
	},
	tbar: [{
		text: 'Добавить опрос',
		iconCls: 'add',
		handler: function()
		{
			PollAddWin.show();
		}

	}],
	height:150,
	bbar: PollpagingBar,
	iconCls:'icon-grid',
	split: true
	//region: 'north',
	//renderTo: document.body

});
/// Добавление в меню модуля )
PollGrid.on('afteredit', UpdatePoll);
	init_modules[init_modules.length] = PollGrid;
	init_nav_modules[init_nav_modules.length] ={
		text:'Опросы', iconCls:'pages', handler:function(){
			
				Pollds.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('poll');


		}
	};

	Ext.apply(actions, {
	'poll': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'poll')
		{
			Ext.getCmp('Content').layout.setActiveItem('poll');
			if (ds.data.length  < 1)
			{
				Pollds.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/date.png"/><a id="poll" href="#">Опросы</a></li>';