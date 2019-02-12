var shortdocs = htmled({name:'text', height:'150', label:'�������� �����'});
var fulldocs = htmled({name:'full', height:250, label:'������ �����'});
var items_docs = [{
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
			fieldLabel: '���������',
			name: 'title',
			dataIndex: 'title',
			allowBlank:false,
			anchor:'95%'
		},{
	xtype: 'fileuploadfield',
	emptyText: '�������� ���� ��� ��������',
	fieldLabel: '��������',
	anchor:'70%',
	name: 'photo-path',
	buttonCfg: {
		text: ' ',
		iconCls: 'upload-icon'
	}
}]
	},{columnWidth:.5,
	layout: 'form',
	items: [{
		xtype:'datefield',
		fieldLabel: '����',
		value: new Date(),
		name: 'date',
		format: 'd-m-Y',
		anchor:'40%'
	}]}]
},shortdocs,fulldocs];
// ������������� �������
var editdocsform = form({fileUpload:true}, items_docs);
// create the window on the first click and reuse on subsequent clicks
var  win2docs = new Ext.Window({
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
	items       : editdocsform,
	buttons: [{
		text: '���������',
		handler:function(){
			tinyMCE.triggerSave();
			editdocsform.getForm().submit({
				url: 'admincp.php',
				waitTitle: '���������� ���������...',
				params: {xaction: "Updatedocs",module:'docs'},
				waitMsg: '���������� ���������',
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('������', '�������� ��������.');
					editdocsform.getForm().reset();
					win2docs.hide();
					dsdocs.reload();
				},
				failure: function(editdocsform, ermsg)
				{
					if(ermsg.result.mm = 1)
					{
						Ext.MessageBox.alert('������', '�� ��������� ���� �����');
					}

				}
			});
		}
	},{
		text: '�������',
		handler: function()
		{
			editdocsform.getForm().reset();
			win2docs.hide();
		}

	}]
});



// �������� �������
var topdocs = form({fileUpload:true}, items_docs);

var  windocs = new Ext.Window({
	layout      : 'fit',
	shim: false,
	modal: true,
	//manager: medialibwindowgroup,
	width       : 1024,
	autoScroll : true,
	height:550,
	closeAction :'hide',
	plain       : true,
	items       : topdocs,
	buttons: [{
		text: '���������',
		handler:function(){
			tinyMCE.triggerSave();
			topdocs.getForm().submit({
				url: 'admincp.php',
				waitTitle: '���������� ������...',
				waitMsg: '���������� ���������',
				params: {xaction:'Adddocs',module:'docs'},
				ermsg: '',
				success: function(){
					Ext.MessageBox.alert('������', '�������� ��������.');
					topdocs.getForm().reset();
					windocs.hide();
					dsdocs.reload();
				},
				failure: function(todocsp, ermsg)
				{
					if(ermsg.result.mm = 1)
					{
						Ext.MessageBox.alert('������', '�� ��������� ���� �����');
					}

				}


			});
		}
	},{
		text: '�������',
		handler: function()
		{
			topdocs.getForm().reset();
			windocs.hide();
		}
	}]
});

var xgdocs = Ext.grid;
var dsdocs = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',

		method: 'post'
	}),
	baseParams: {xaction:'Listingdocs', module:'docs'},
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'Id', mapping: 'id'},
	{name: 'date', mapping: 'date'},
	{name: 'title', mapping: 'title'},
	{name: 'text', mapping: 'text'},
	{name: 'link', mapping: 'link'},
	{name: 'full', mapping: 'full'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])

});

var pagingBardocs = new Ext.PagingToolbar({
	pageSize: 25,
	store: dsdocs,
	displayInfo: true


});
function updatedocs(oGrid_docst){
	Ext.Ajax.request({
		waitMsg: '���������� ���������...',
		url: 'admincp.php',
		params: {
			xaction: "UpdateActivedocs",
			Id :  oGrid_docst.record.data.Id,
			Active: oGrid_docst.record.data.Active,
			module:'docs'


		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				dsdocs.commitChanges();
				dsdocs.reload();
				break;
				default:
				Ext.MessageBox.alert('������','�� �������� ��������� ���������...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};
function confirmDeletedocs(id){
	Ext.MessageBox.confirm('�������������','�� ������� ��� ������ ������� ���� ��������?', deletedocs);
};
function deletedocs(btn){
	if(btn=='yes'){
		var select = grid.getSelectionModel().getSelected().get('Id');
		Ext.Ajax.request({

			waitMsg: '���������� ���������',
			url: 'admincp.php',
			params: {
				xaction: "Deletedocs",
				id:  select,
				module:'docs'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 55:  // Success : simply reload
					ds.reload();
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



/////




////


/// Action row
var docsact = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'�������'
	},{
		iconCls:'edit'
		,qtip:'�������������'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
docsact.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			confirmDeletedocs();
		}
		if (action == 'edit')
		{
			win2docs.show();
			var id = grid.getSelectionModel().getSelected().get('Id');
			var date = grid.getSelectionModel().getSelected().get('date');
			var title = grid.getSelectionModel().getSelected().get('title');
			var text = grid.getSelectionModel().getSelected().get('text');
			var full = grid.getSelectionModel().getSelected().get('full');
			var dmf = editdocsform.getForm();

			dmf.findField('id').setValue(id);
			dmf.findField('date').setValue(date);
			dmf.findField('title').setValue(title);
			dmf.findField('text').setValue(text);
			dmf.findField('full').setValue(full);
			Ext.ux.TinyMCE.initTinyMCE();

		}
	}
});

///
var griddocs = new Ext.grid.EditorGridPanel({
	store: dsdocs,
	frame:true,
	loadMask: true,
	enableColLock:false,
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "#", width: 30, sortable: true, �������dataIndex: 'Id'},
	{id:'title', header: "���������", width: 100, sortable: true, dataIndex: 'title'},
	{id:'date', header: "����", width: 100, sortable: true, dataIndex: 'date'},
	{id: 'Active', header: '', dataIndex:'Active',
	// width: 150,
	editor: new Ext.form.ComboBox({
		typeAhead: true,
		triggerAction: 'all',
		store:new Ext.data.SimpleStore({
			fields:['partyValue', 'partyName'],
			data: [['1','��������'],['2','�� ��������']]
		}),
		mode: 'local',
		displayField: 'partyName',
		valueField: 'partyValue',
		lazyRender:true,
		listClass: 'x-combo-list-small'
	}),  renderer: function(value) {
		if (value == 1) {
			return "��������";
		}
		return "�� ��������";
	}

	},
	{id:'link', header: "������", width: 100, sortable: false, dataIndex: 'link'},
	docsact
	],
	plugins: docsact,
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	bbar: pagingBardocs,
	iconCls:'icon-grid',
	split: true,
	region: 'north'
});



griddocs.on('afteredit', updatedocs);

griddocs.on('rowdblclick', function(grid, rowIndex, e) {
	var grid = griddocs;
	var iddocs = grid.getSelectionModel().getSelected().get('Id');
	win2docs.show();
	var id = grid.getSelectionModel().getSelected().get('Id');
	var date =grid.getSelectionModel().getSelected().get('date');
	var title = grid.getSelectionModel().getSelected().get('title');
	var text = grid.getSelectionModel().getSelected().get('text');
	var full = grid.getSelectionModel().getSelected().get('full');
	var dmf = editdocsform.getForm();

	dmf.findField('id').setValue(id);
	dmf.findField('date').setValue(date);
	dmf.findField('title').setValue(title);
	dmf.findField('text').setValue(text);
	dmf.findField('full').setValue(full);
});







var module_docs = {
	title: '������ ��������',
	id: 'docs',
	layout: 'fit',
	autoScroll: true,
	items: {
		cls: 'email-form',
		layout: 'fit',
		autoScroll: true,
		frame: true,
		items: griddocs,
		tbar:[
		{
			text: '�������� ����� ��������',
			handler:function(){
				windocs.show();
			},
			iconCls: 'add'}]
	}};
	init_modules[init_modules.length] = module_docs;
	init_nav_modules[init_nav_modules.length] ={
		text:'���������', iconCls:'pages', handler:function(){
			
				dsdocs.load({params:{start:0, limit:25}});

			
			Ext.getCmp('Content').layout.setActiveItem('docs');


		}
	};

	Ext.apply(actions, {
	'docs': function()
	{
		if (Ext.getCmp('Content').layout.activeItem.id != 'docs')
		{
			Ext.getCmp('Content').layout.setActiveItem('docs');
			if (dsdocs.data.length  < 1)
			{
				dsdocs.load({params:{start:0, limit:25}});
			};

		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/date.png"/><a id="docs" href="#">��������</a></li>';