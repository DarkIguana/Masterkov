
Ext.ux.TinyMCE.initTinyMCE();
var UserFormsstore = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{module:'usersform', task: "LISTING"}, 

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', type: 'int', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'xtype', mapping: 'xtype'},
	{name: 'allowBlank', mapping: 'allowBlank'},
	{name: 'fieldLabel', mapping: 'fieldLabel'},
	{name: 'blankText', mapping: 'blankText'},
	{name: 'vtype', mapping: 'vtype'}

	])

});

var Radiostore = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{module:'usersform', task: "LISTRadio"},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', type: 'int', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'boxLabel', mapping: 'boxLabel'}

	])

});


var UserFormsact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'Delete'
		,qtip:'Удалить'


	},
	{
		iconCls:'edit'
		,qtip:'Редактировать'


	}
	]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});

function DeleteConfirmUFC()
{
	Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту опцию', deleteUFC);
}
function deleteUFC(btn)
{
	if(btn=='yes'){
		var select = Ext.getCmp('CheckOptionGrid').getSelectionModel().getSelected().get('id');
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'usersform', task: "DELETECHECKOPTION",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					Radiostore.reload();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	}
}

function DeleteConfirmUFR()
{
	Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту опцию', deleteUFR);
}
function deleteUFR(btn)
{
	if(btn=='yes'){
		var select = Ext.getCmp('RadioOptionGrid').getSelectionModel().getSelected().get('id');
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'usersform', task: "DELETERADIOOPTION",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					Radiostore.reload();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	}
}
function DeleteConfirmUFCombo()
{
	Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту опцию', deleteUFCombo);
}
function deleteUFCombo(btn)
{
	if(btn=='yes'){
		var select = Ext.getCmp('ComboOptionGrid').getSelectionModel().getSelected().get('id');
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'usersform', task: "DELETECOMBOOPTION",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					Radiostore.reload();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	}
}

function DeleteConfirmUF()
{
	Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить это поле', deleteUF);
}
function deleteUF(btn)
{
	if(btn=='yes'){
		var select = UserFormsGrid.getSelectionModel().getSelected().get('id');
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите',
			url: 'admincp.php',
			params: {
				module:'usersform', task: "DELETE",
				id:  select
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					UserFormsstore.reload();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	}
}
UserFormsact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			var xtype = UserFormsGrid.getSelectionModel().getSelected().get('xtype');
			if (xtype == "radiogroup" || xtype == "checkboxgroup" || xtype== "combo" || xtype== "fileuploadfield")
			{
				hh = false;
			}
			else
			{
				hh = true;
			}
			winshUF('Edit', hh);
			var id = UserFormsGrid.getSelectionModel().getSelected().get('id');
			var name = UserFormsGrid.getSelectionModel().getSelected().get('name');
			
			var allowBlank = UserFormsGrid.getSelectionModel().getSelected().get('allowBlank');
			var fieldLabel = UserFormsGrid.getSelectionModel().getSelected().get('fieldLabel');
			var blankText = UserFormsGrid.getSelectionModel().getSelected().get('blankText');
			var dmf = Ext.getCmp('UserForm').getForm();

			if (allowBlank == false)
			{
				dmf.findField('allowBlank').setValue(true);
			}
			else
			{
				dmf.findField('allowBlank').setValue(false);
			}
			dmf.findField('id').setValue(id);
			dmf.findField('name').setValue(name);
			dmf.findField('fieldLabel').setValue(fieldLabel);
			dmf.findField('blankText').setValue(blankText);
			dmf.findField('xtype2').setValue(xtype);
			dmf.findField('xtype').setValue(xtype);
			//	UserFormsAddWin.setTitle(title);
		}
		if (action == 'Delete')
		{
			DeleteConfirmUF();
		}

	}
});

function dop_files(action, id)
{
	var UserForm= new Ext.FormPanel({
		frame:true,
		labelAlign: 'top',
		width: 1024,
		id: 'UserFormFiles',
		autoWidth: true,
		autoHeight: true,
		monitorValid:true,
		items: [{ xtype: 'hidden',
		name:'id'
		},{
			xtype: 'textfield',
			allowBlank: false,
			name: 'fileformat',
			fieldLabel: 'Форматы файлов (через запятую)'
		}]
	});
	
	var win = new Ext.Window({
		//applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		id: 'UFFW',
		modal: true,
		width       : 300,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items       : UserForm,
		monitorValid:true,
		buttons: [{
			formBind: true,
			text: 'Сохранить',
			id: 'save-Field',
			handler:function ()
			{
				Ext.getCmp('UserFormFiles').getForm().submit({
					url:'admincp.php',
					params: {module:'usersform', task: action, idFile: id},
					success: function(UserForm, o)
					{
						Ext.getCmp('UserFormFiles').getForm().reset();
						Ext.getCmp('UFFW').close();
					}
				});
				//addUserForms(action)
				//win.close();
			}
		}

		,{
			text: 'Закрыть',
			handler: function()
			{
				Ext.getCmp('UserFormFiles').getForm().reset();
				Ext.getCmp('UFFW').close();
			}
		}]
	}).show();
	
		Ext.getCmp('UserFormFiles').getForm().load({
			url:'admincp.php',
		    params: {module:'usersform', task: 'loadfileformat', idFile: id}
		});
}


function winshUFCombo(action, id)
{
	var UserForm= new Ext.FormPanel({
		frame:true,
		width: 1024,
		id: 'UserFormCombo',
		autoWidth: true,
		autoHeight: true,
		monitorValid:true,
		items: [{ xtype: 'hidden',
		name:'id'
		},{
			xtype: 'textfield',
			allowBlank: false,
			name: 'boxLabel',
			fieldLabel: 'boxLabel'
		}]
	});
	var win = new Ext.Window({
		//applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		id: 'UFComboW',
		modal: true,
		width       : 300,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items       : UserForm,
		monitorValid:true,
		buttons: [{
			formBind: true,
			text: 'Сохранить',
			id: 'save-Field',
			handler:function ()
			{
				Ext.getCmp('UserFormCombo').getForm().submit({
					url:'admincp.php',
					params: {module:'usersform', task: action, idCombo: id},
					success: function(UserForm, o)
					{
						Radiostore.reload();
						Ext.getCmp('UserFormCombo').getForm().reset();
						Ext.getCmp('UFComboW').close();
					}
				});
				//addUserForms(action)
				//win.close();
			}
		}

		,{
			text: 'Закрыть',
			handler: function()
			{
				Ext.getCmp('UserFormCombo').getForm().reset();
				Ext.getCmp('UFComboW').close();
			}
		}]
	}).show();

}
function dop_Combo(id)
{
	
Radiostore.load({params: {id: id}});
var Comboact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'Delete'
		,qtip:'Удалить'


	},
	{
		iconCls:'edit'
		,qtip:'Редактировать'
	}
	]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
Comboact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			winshUFCombo('EditComboOption', "");
			var id = Combo.getSelectionModel().getSelected().get('id');
			var name = Combo.getSelectionModel().getSelected().get('name');
			var boxLabel = Combo.getSelectionModel().getSelected().get('boxLabel');
			var dmf = Ext.getCmp('UserFormCombo').getForm();
			dmf.findField('id').setValue(id);
			dmf.findField('boxLabel').setValue(boxLabel);
			//dmf.findField('name').setValue(name);
			//	UserFormsAddWin.setTitle(title);
		}
		if (action == 'Delete')
		{
			DeleteConfirmUFCombo();
		}

	}
});

	var Combo = new Ext.grid.GridPanel({
		title: 'Combo Option',
		store: Radiostore,
		id: 'ComboOptionGrid',
		loadMask: true,
		frame:true,
		enableColLock:false,
		clicksToEdit:1,
		columns: [
		{id:'boxLabel', header: "Опция", width: 300, sortable: true, dataIndex: 'boxLabel'},
		Comboact
		],
		plugins: Comboact,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		iconCls:'icon-grid',
		split: true,
		tbar: [{
			text: 'Добавить опцию',
			handler: function()
			{
				winshUFCombo('AddComboOption', id);
			}
		}]

	});

	var Dop = new Ext.Window({
		layout      : 'fit',
		shim: false,
		modal: true,
		width       : 400,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items:Combo
	}).show();
}


function winshUFC(action, id)
{
	var UserForm= new Ext.FormPanel({
		frame:true,
		width: 1024,
		id: 'UserFormCheck',
		autoWidth: true,
		autoHeight: true,
		monitorValid:true,
		items: [{ xtype: 'hidden',
		name:'id'
		},{
			xtype: 'textfield',
			allowBlank: false,
			name: 'boxLabel',
			fieldLabel: 'boxLabel'
		},{
			xtype: 'textfield',
			allowBlank: false,
			name: 'name',
			fieldLabel: 'Имя (только латинские буквы)',
			vtype: 'name'
		}]
	});
	var win = new Ext.Window({
		//applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		id: 'UFCW',
		modal: true,
		width       : 300,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items       : UserForm,
		monitorValid:true,
		buttons: [{
			formBind: true,
			text: 'Сохранить',
			id: 'save-Field',
			handler:function ()
			{
				Ext.getCmp('UserFormCheck').getForm().submit({
					url:'admincp.php',
					params: {module:'usersform', task: action, idCheck: id},
					success: function(UserForm, o)
					{
						Radiostore.reload();
						Ext.getCmp('UserFormCheck').getForm().reset();
						Ext.getCmp('UFCW').close();
					}
				});
				//addUserForms(action)
				//win.close();
			}
		}

		,{
			text: 'Закрыть',
			handler: function()
			{
				Ext.getCmp('UserFormCheck').getForm().reset();
				Ext.getCmp('UFCW').close();
			}
		}]
	}).show();

}
function dop_Check(id)
{
	
Radiostore.load({params: {id: id}});
var Checkact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'Delete'
		,qtip:'Удалить'


	},
	{
		iconCls:'edit'
		,qtip:'Редактировать'
	}
	]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
Checkact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			winshUFC('EditCheckOption', "");
			var id = Check.getSelectionModel().getSelected().get('id');
			var name = Check.getSelectionModel().getSelected().get('name');
			var boxLabel = Check.getSelectionModel().getSelected().get('boxLabel');
			var dmf = Ext.getCmp('UserFormCheck').getForm();
			dmf.findField('id').setValue(id);
			dmf.findField('boxLabel').setValue(boxLabel);
			dmf.findField('name').setValue(name);
			//	UserFormsAddWin.setTitle(title);
		}
		if (action == 'Delete')
		{
			DeleteConfirmUFC();
		}

	}
});

	var Check = new Ext.grid.GridPanel({
		title: 'Check Option',
		store: Radiostore,
		id: 'CheckOptionGrid',
		loadMask: true,
		frame:true,
		enableColLock:false,
		clicksToEdit:1,
		columns: [
		{id:'boxLabel', header: "Опция", width: 300, sortable: true, dataIndex: 'boxLabel'},
		Checkact
		],
		plugins: Checkact,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		iconCls:'icon-grid',
		split: true,
		tbar: [{
			text: 'Добавить опцию',
			handler: function()
			{
				winshUFC('AddCheckOption', id);
			}
		}]

	});

	var Dop = new Ext.Window({
		layout      : 'fit',
		shim: false,
		modal: true,
		width       : 400,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items:Check
	}).show();
}





Ext.apply(Ext.form.VTypes, {
'name': function(){
	var re = /[a-zA-Z]/;
	return function(v){
		return re.test(v);
	}
}(),
'nameText' : 'В имени поле могут содержаться только латинские буквы'
});
function winshUFR(action, id)
{
	var UserForm= new Ext.FormPanel({
		frame:true,
		width: 1024,
		id: 'UserFormRadio',
		autoWidth: true,
		autoHeight: true,
		monitorValid:true,
		items: [{ xtype: 'hidden',
		name:'id'
		},{
			xtype: 'textfield',
			allowBlank: false,
			name: 'boxLabel',
			fieldLabel: 'boxLabel'
		}]
	});
	var win = new Ext.Window({
		//applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		id: 'UFRW',
		modal: true,
		width       : 300,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items       : UserForm,
		monitorValid:true,
		buttons: [{
			formBind: true,
			text: 'Сохранить',
			id: 'save-Field',
			handler:function ()
			{
				Ext.getCmp('UserFormRadio').getForm().submit({
					url:'admincp.php',
					params: {module:'usersform', task: action, idCheck: id},
					success: function(UserForm, o)
					{
						Radiostore.reload();
						Ext.getCmp('UserFormRadio').getForm().reset();
						Ext.getCmp('UFRW').close();
					}
				});
				//addUserForms(action)
				//win.close();
			}
		}

		,{
			text: 'Закрыть',
			handler: function()
			{
				Ext.getCmp('UserFormRadio').getForm().reset();
				Ext.getCmp('UFRW').close();
			}
		}]
	}).show();

}
function dop_radio(id)
{
	
Radiostore.load({params: {id: id}});
var Radioact = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'Delete'
		,qtip:'Удалить'


	},
	{
		iconCls:'edit'
		,qtip:'Редактировать'
	}
	]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
Radioact.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			winshUFR('EditRadioOption', "");
			var id = Radio.getSelectionModel().getSelected().get('id');
			var name = Radio.getSelectionModel().getSelected().get('name');
			var boxLabel = Radio.getSelectionModel().getSelected().get('boxLabel');
			var dmf = Ext.getCmp('UserFormRadio').getForm();
			dmf.findField('id').setValue(id);
			dmf.findField('boxLabel').setValue(boxLabel);
			//	UserFormsAddWin.setTitle(title);
		}
		if (action == 'Delete')
		{
			DeleteConfirmUFR();
		}

	}
});

	var Radio = new Ext.grid.GridPanel({
		title: 'Radio Option',
		store: Radiostore,
		id: 'RadioOptionGrid',
		loadMask: true,
		frame:true,
		enableColLock:false,
		clicksToEdit:1,
		columns: [
		{id:'boxLabel', header: "Опция", width: 300, sortable: true, dataIndex: 'boxLabel'},
		Radioact
		],
		plugins: Radioact,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		iconCls:'icon-grid',
		split: true,
		tbar: [{
			text: 'Добавить опцию',
			handler: function()
			{
				winshUFR('AddRadioOption', id);
			}
		}]

	});

	var Dop = new Ext.Window({
		layout      : 'fit',
		shim: false,
		modal: true,
		width       : 400,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items:Radio
	}).show();
}

function winshUF(action, j)
{
	if (j == null)
	{
		j = true;
	}
	Ext.form.Checkbox.override({
		setValue : function(v) {
			var checked = this.checked;
			this.checked = (v === true || v === 'true' || v == '1' || String(v).toLowerCase() == 'on');

			if(this.rendered){
				this.el.dom.checked = this.checked;
				this.el.dom.defaultChecked = this.checked;
				this.wrap[this.checked? 'addClass' : 'removeClass'](this.checkedCls);
			}

			if(checked != this.checked){
				this.fireEvent("check", this, this.checked);
				if(this.handler){
					this.handler.call(this.scope || this, this, this.checked);
				}
			}
		},

		afterRender : function(){
			Ext.form.Checkbox.superclass.afterRender.call(this);
			this.wrap[this.checked? 'addClass' : 'removeClass'](this.checkedCls);
		}
	});

	var UserForm= new Ext.FormPanel({
		frame:true,
		width: 1024,
		id: 'UserForm',
		autoWidth: true,
		autoHeight: true,
		monitorValid:true,
		items:[
		{ xtype: 'hidden',
		name:'id'
		},
		{
			xtype: 'hidden',
			name: 'xtype'
		},
		{
			xtype: 'combo',
			fieldLabel: 'XTYPE',
			typeAhead: true,
			selectOnFocus:true,
			id: 'xt',
			forceSelection: true,
			triggerAction: 'all',
			name: 'xtype2',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['textfield','Текстовое поле'],['textarea','TextArea'], ['htmleditor','HTML Редактор'], ['fileuploadfield','fileuploadfield'], ['combo', 'ComboBox'], ['checkboxgroup', 'checkboxgroup'], ['radiogroup', 'radiogroup']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			allowBlank: false,
			listClass: 'x-combo-list-small'

		},
		new Ext.form.TextField({
			name: 'name',
			fieldLabel:'Имя поля (только латинские буквы)',
			vtype: 'name',
			allowBlank: false
		})
		,
		{
			xtype: 'textfield',
			name: 'fieldLabel',
			fieldLabel:'Заголовок поля',
			allowBlank: false

		},
		{
			xtype: 'checkbox',
			fieldLabel: 'Обязательное поле',
			name: 'allowBlank',
			inputValue: 'true',
			value: 'true',
			handler: function(n)
			{
				if (n.checked == true)
				{
					Ext.getCmp('blankText').setVisible(true);

				}
				else
				{
					Ext.getCmp('blankText').setVisible(false);
				}

			}
		},
		{
			xtype: 'textfield',
			hidden: true,
			id: 'blankText',
			emptyText: 'Введите текст.. Если поле не будет заполнено ',
			name: 'blankText',
			anchor: '90%',
			hideLabel: true,
			fieldLabel: ''

		}
		]
	});
	Ext.getCmp('xt').on('select', function(m, n){
		var xtype = Ext.getCmp('xt').getValue();
		Ext.getCmp('UserForm').getForm().findField('xtype').setValue(xtype);
	})
	var win = new Ext.Window({
		//applyTo     : 'hello-win',
		layout      : 'fit',
		shim: false,
		modal: true,
		width       : 500,
		height:300,
		autoScroll : true,
		closeAction :'close',
		autoScroll: true,
		plain       : true,
		items       : UserForm,
		monitorValid:true,
		buttons: [{
			formBind: true,
			text: 'Сохранить',
			id: 'save-Field',
			handler:function ()
			{
				UserForm.getForm().submit({
					url:'admincp.php',
					params: {module:'usersform', task: action},
					success: function(UserForm, o)
					{
						var r = o.result.msg;
						switch(r)
						{
							case 66: Ext.MessageBox.alert('', 'Такое имя поля уже есть');
							break;
							default:
							var xtype = Ext.getCmp('xt').getValue();
							if (xtype == "radiogroup" & action=="Add")
							{
								
								dop_radio(o.result.id);
								UserFormsstore.reload();
								win.close();
							}
							else if (xtype == "checkboxgroup" & action == "Add")
							{
								dop_Check(o.result.id);
								UserFormsstore.reload();
								win.close();
							}
							else if (xtype == "combo" & action == "Add")
							{
								dop_Combo(o.result.id);
								UserFormsstore.reload();
								win.close();
							}
							else if (xtype == "fileuploadfield" & action == "Add")
							{
								dop_files("AdddopFiles", id)
								UserFormsstore.reload();
								win.close();
							}
							else
							{
								UserFormsstore.reload(); win.close();
							}
							break;
						}
					}
				});
				//addUserForms(action)
				//win.close();
			}
		},
		{
			text: "Доп. опции",
			disabled: j,
			handler: function()
			{
				var xtype = Ext.getCmp('UserForm').getForm().findField('xtype').getValue();
				var id = Ext.getCmp('UserForm').getForm().findField('id').getValue();
				if (xtype == "radiogroup")
				{
					dop_radio(id);
				}
				if (xtype == "checkboxgroup")
				{
					dop_Check(id);
				}
				if (xtype == "combo")
				{
					
					dop_Combo(id);
				}
				if (xtype == "fileuploadfield")
				{
					
					dop_files("EditdopFiles", id);
				}
				
			}
		}

		,{
			text: 'Закрыть',
			handler: function()
			{
				UserForm.getForm().reset();
				win.close();
			}
		}]
	});

	win.show();
	win.on('close', function() {
		UserForm.getForm().reset();
	});
	
}
var UserFormsGrid = new Ext.grid.GridPanel({
	id: 'usersform',
	title: 'Пользовательская форма',
	store: UserFormsstore,
	//loadMask: true,
	frame:true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id:'name', header: "Имя", width: 100, sortable: true, dataIndex: 'name'},
	{id:'fieldLabel', header: "Заголовок", width: 100, sortable: true, dataIndex: 'fieldLabel'},
	{id:'xtype', header: "Поле", width: 100, sortable: true, dataIndex: 'xtype'},
	UserFormsact
	],
	plugins: UserFormsact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	iconCls:'icon-grid',
	split: true,
	tbar: [{
		text: 'Добавить поле',
		handler: function()
		{
			winshUF('Add');
		}
	}]
});
init_modules[init_modules.length] = UserFormsGrid;
Ext.apply(actions, {
'usersform': function()
{
	if (Ext.getCmp('Content').layout.activeItem.id != 'usersform')
	{
		Ext.getCmp('Content').layout.setActiveItem('usersform');
		if (UserFormsstore.data.length  < 1)
		{
			UserFormsstore.load({params:{start:0, limit:25}});
		};

	}
}
});
ModulesRightMenuS+='<li><img src="core/icons/page_copy.png"/><a id="usersform" href="#">Пользовательская форма</a></li>';


