var catalog = {};
catalog.users = {};
catalog.users.combostore =new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: '/admincp.php',
		method: 'POST'
	}),
	baseParams: {
		task: "getUsersGroups",
		module:'shop'
	},
	reader: new Ext.data.JsonReader({
		id:'id',
		root: 'cats'
	}, [{
		name: 'state'
	},{
		name: 'id'
	}])
});



catalog.users.addEdit = function() {

	var form = new Ext.FormPanel({
		id : 'catalog.users.form',
		width : '100%',
		height : 570,
		frame : true,
		labelAlign : 'top',
		items : [{
			xtype : 'textfield',
			fieldLabel : 'Email',
			name : 'email',
			anchor : '90%'
		},{

			xtype : 'textfield',
			fieldLabel : '������ (�������� ������, ����� �� �������� ������)',
			name : 'pass',
			anchor : '90%'

		},{
			layout : 'table',
			layoutConfig : {
				columns : 3
			},
			items : [{
				layout : 'form',
				width : 260,
				items : [{
					xtype : 'textfield',
					name : 'lname',
					fieldLabel : '�������� �����������',
					anchor : '90%'
				} ]
			},{
				layout : 'form',
				width : 260,
				items : [{
					xtype : 'textfield',
					name : 'name',
					fieldLabel : '���������� ����',
					anchor : '90%'
				} ]
			},{
				layout : 'form',
				width : 260,
				items : [{
					xtype : 'textfield',
					name : 'TypeText',
					fieldLabel : '������',
					anchor : '90%'
				} ]
			}

			]
		},{
			layout : 'table',
			layoutConfig : {
				columns : 4
			},
			items : [{

				layout : 'fit',
				items : [{
					html : '<span style="font:12px tahoma,arial,helvetica,sans-serif; margin-bottom:3px;">�����:</span>'
				} ]
			},{
				colspan : 3,
				layout : 'fit',
				items : [{
					html : '<span style="font:12px tahoma,arial,helvetica,sans-serif; margin-bottom:3px;">�������:</span>'
				} ]
			},{
				layout : 'fit',
				width : 15,
				items : [{
					html : '<span style="font:10px tahoma,arial,helvetica,sans-serif; margin-bottom:3px;">+7</span>'
				} ]
			},{
				layout : 'form',
				width : 35,
				items : [{
					width : 30,
					xtype : 'numberfield',
					hideLabel : true,
					name : 'phone_code',
					maxLength : 3
				} ]
			},{
				layout : 'form',
				width : 70,
				items : [{
					width : 70,
					xtype : 'numberfield',
					hideLabel : true,
					name : 'phone',
					maxLength : 7
				} ]
			} ]
		},{
			xtype : 'numberfield',
			fieldLabel : "������",
			name : 'sk',
			maxValue : 100,
			minValue : 0,
			anchor : '40%'
		},{
			xtype : 'hidden',
			name : 'id'
		}

		]
	});
	new Ext.Window({
		width : 800,
		height : 400,
		frame : true,
		closeAction : 'close',
		modal : true,
		id : 'catalog.users.WindowAddEdit',
		items : [ form ],
		buttonAlign : 'right',
		buttons : [{
			text : '���������',
			iconCls : 'accept',
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.ux.TinyMCE.initTinyMCE();
					tinyMCE.triggerSave();
					form
					.getForm()
					.submit({
						url : 'admincp.php',
						params : {
							task : 'saveUser',
							module : 'shop'
						},
						waitMsg : '���������� ���������',
						success : function(form, o) {
							var res = o.result.msg;
							if (res == "33") {
								Ext
								.getCmp(
								'catalog.users.WindowAddEdit')
								.close();
								catalog.users.base
								.reload();
							} else if (res == "77") {
								Ext.MessageBox
								.alert('',
								'����� ������������ ��� ����������');
							} else if (res == "55") {
								Ext.MessageBox
								.alert('',
								'������ �� ����� ���� ������');
							} else if (res == "66") {
								Ext.MessageBox
								.alert('',
								'Email �� ����� ���� ������');
							}

						}
					});
				} else {
					Ext.MessageBox.alert('',
					'��������� ��� ������������ ����');
				}
			}
		} ]
	}).show();
};
catalog.users.base = new Ext.data.Store({

	proxy : new Ext.data.HttpProxy({
		url : 'admincp.php',
		method : 'POST'
	}),
	baseParams : {
		task : "ListingUsers",
		module : 'shop'
	},

	reader : new Ext.data.JsonReader({
		root : 'results',
		totalProperty : 'total',
		id : 'id'
	}, [{
		name : 'id',
		mapping : 'id'
	},{
		name : 'email',
		mapping : 'email'
	},{
		name:'Type',
		mapping:'Type'
	},{
		name : 'name',
		mapping : 'name'
	},{
		name : 'mname',
		mapping : 'mname'
	},{
		name : 'lname',
		mapping : 'lname'
	},{
		name : 'phone',
		mapping : 'phone'
	},{
		name : 'phone_code',
		mapping : 'phone_code'
	},{
		name : 'fax',
		mapping : 'fax'
	},{
		name : 'org',
		mapping : 'org'
	},{
		name : 'address',
		mapping : 'address'
	},{
		name : 'city',
		mapping : 'city'
	},{
		name : 'raion',
		mapping : 'raion'
	},{
		name : 'oblast',
		mapping : 'oblast'
	},{
		name : 'country',
		mapping : 'country'
	},{
		name : 'zip',
		mapping : 'zip'
	},{
		name : 'street',
		mapping : 'street'
	},{
		name : 'Mailed',
		mapping : 'Mailed'
	},{
		name : 'korp',
		mapping : 'korp'
	},{
		name : 'flat',
		mapping : 'flat'
	},{
		name : 'sk',
		mapping : 'sk'
	},{
		name : 'banned',
		mapping : 'banned'
	},{
		name : 'IPReg',
		mapping : 'IPReg'
	},{
		name : 'IPLast',
		mapping : 'IPLast'
	},{
		name : 'orders',
		mapping : 'orders'
	},{
		name : 'sum',
		mapping : 'sum'
	},{
		name:'TypeText',
		mapping:'TypeText'
	} ])
});
catalog.users.pagingBar = new Ext.PagingToolbar({
	pageSize : 25,
	store : catalog.users.base,
	paramNames : {
		start : 'start',
		limit : 'limit'
	},
	displayInfo : true
});
catalog.users.RowAction = new Ext.ux.grid.RowActions({

	actions : [{
		iconCls : 'delete',
		qtip : '�������'
	},{
		iconCls : 'edit',
		qtip : '�������������'

	} ],
	widthIntercept : Ext.isSafari ? 4 : 2,
	id : 'actions'
});
catalog.users.RowAction.on({
	action : function(grid, record, action, row, col) {
		if (action == 'delete') // ���� action �����
		{
			Ext.MessageBox
			.confirm(
			'',
			'�� ������� ��� ������ ������� ����� ������������ "' + record.data.user + '"?', function(btn) {
				if (btn == "yes") {
					Ext.Ajax.request({
						url : 'admincp.php',
						params : {
							task : 'deleteUser',
							id : record.data.id,
							module : 'shop'
						},
						success : function() {
							catalog.users.base.reload();
						},
						failure : function() {

						}
					});
				}
			});
		}
		if (action == 'edit') {
			catalog.users.addEdit();
			Ext.getCmp('catalog.users.form').getForm().loadRecord(record);
		}
	}
});
catalog.users.base.on('load', function(){
	catalog.users.combostore.reload();
});
catalog.users.grid = new Ext.grid.EditorGridPanel({
	store : catalog.users.base,
	title : '������������',
	loadMask : true,
	frame : true,
	id:'catalog.users.grid',
	layout : 'fit',
	enableColLock : false,
	autoWidth : true,
	listeners : {
		'afteredit' : function(oGrid_event) {
			Ext.Ajax.request({
				waitMsg : '���������� ���������...',
				url : 'admincp.php',
				params : {
					xaction : "BanUser",
					id : oGrid_event.record.data.id,
					Type : oGrid_event.record.data.Type,
					Mailed : oGrid_event.record.data.Mailed,
					module : 'shop',
					banned : oGrid_event.record.data.banned
				},
				success : function(response) {
					var result = eval(response.responseText);
					switch (result) {
						case 33:
							catalog.users.base.commitChanges(); // changes
							// successful, get
							// rid of the red
							// triangles

							break;
						default:
							Ext.MessageBox.alert('������',
							'�� �������� ��������� ���������...');
							break;
					}
				},
				failure : function(response) {
					var result = response.responseText;
					Ext.MessageBox.alert('error',
					'could not connect to the database. retry later');
				}
			});
		}
	},
	columns : [{
		header : "���������� ����",
		width : 150,
		sortable : true,
		dataIndex : 'name'

	},{
		header : "������",
		width : 150,
		sortable : true,
		dataIndex : 'TypeText'

	},{
		header : "E-mail",
		width : 120,
		sortable : true,
		dataIndex : 'email'
	},{
		id : 'Active2',
		header : '<center><b>�������� �����</b></center>',
		dataIndex : 'Mailed',
		width : 80,
		editor : new Ext.form.ComboBox({
			typeAhead : true,
			triggerAction : 'all',
			store : new Ext.data.SimpleStore({
				fields : [ 'partyValue', 'partyName' ],
				data : [ [ '0', '�� ��������' ], [ '1', '��������' ] ]
			}),
			mode : 'local',
			displayField : 'partyName',
			valueField : 'partyValue',
			lazyRender : true,
			listClass : 'x-combo-list-small'
		}),
		renderer : function(value) {
			if (value == 0) {
				return "�� ��������";
			}
			return "��������";
		}
	},{
		id : 'Active',
		header : '<center><b>������</b></center>',
		dataIndex : 'banned',
		width : 80,
		editor : new Ext.form.ComboBox({
			typeAhead : true,
			triggerAction : 'all',
			store : new Ext.data.SimpleStore({
				fields : [ 'partyValue', 'partyName' ],
				data : [ [ '0', '��������' ], [ '1', '������������' ] ]
			}),
			mode : 'local',
			displayField : 'partyName',
			valueField : 'partyValue',
			lazyRender : true,
			listClass : 'x-combo-list-small'
		}),
		renderer : function(value) {
			if (value == 0) {
				return "��������";
			}
			return "������������";
		}
	},{
		id : 'Type',
		header : '<center><b>���</b></center>',
		dataIndex : 'Type',
		width : 80,
		editor : new Ext.form.ComboBox({
			typeAhead : true,
			triggerAction : 'all',
			store : new Ext.data.SimpleStore({
				fields : [ 'partyValue', 'partyName' ],
				data : [ [ '0', '�� ��������' ], [ '1', '���������' ],
				[ '2', '�������' ] ]
			}),
			mode : 'local',
			displayField : 'partyName',
			valueField : 'partyValue',
			lazyRender : true,
			listClass : 'x-combo-list-small'
		}),
		renderer : function(value) {
			if (value == '0') {
				return "�� ��������";
			}
			if (value == '1') {
				return "���������";
			}
			return "�������";
		}
	},{
		header : "IP ��� �����������",
		width : 80,
		sortable : true,
		dataIndex : 'IPReg'
	},{
		header : "��������� IP",
		width : 80,
		sortable : true,
		dataIndex : 'IPLast'
	}, catalog.users.RowAction

	],

	sm : new Ext.grid.RowSelectionModel({
		singleSelect : true
	}),
	viewConfig : {
		forceFit : true
	},
	height : 150,
	bbar : catalog.users.pagingBar,
	plugins : catalog.users.RowAction,
	iconCls : 'icon-grid',
	split : true,
	tbar : [{
		text : '�������� ������������',
		handler : function() {
			catalog.users.addEdit();
		},
		iconCls : 'add'
	},'-',{
		text:'�������� ���������� �������',
		iconCls:'update',
		handler: function() {

			var Form = new Ext.FormPanel({
				frame:true,
				id:'FormUpdateBase',
				fileUpload: true,
				labelAlign : 'top',
				items:[{
					xtype: 'fileuploadfield',
					id: 'import-file',
					emptyText: '�������� ����',
					fieldLabel: '����',

					allowBlank: false,
					name: 'photo-path',
					width: 400,
					hieght: 100,
					buttonCfg: {
						text: ' ',
						iconCls: 'upload-icon'
					}
				}]
			});
			new Ext.Window({
				width:450,
				height:190,
				title:'��� 1',
				modal:true,
				id:'WindowUpdateBase',
				frame:true,
				layout:'fit',
				items:[Form],
				buttons:[{
					text:'��������',
					iconCls:'apply',
					handler: function() {
						if (Ext.getCmp('FormUpdateBase').getForm().isValid()) {
							Ext.getCmp('FormUpdateBase').getForm().submit({
								url:'/admincp.php',
								method:'post',
								params: {
									module:'shop',
									etap:1,
									task:'updateBase'
								},
								success: function(ff, response) {

									catalog.users.etap2(response);

								},
								failure: function() {
									App.setAlert('', '�� ������� ��������� ����');
								}
							});
						}
					}
				}]
			}).show();
		}
	},'-','����������:',{

		xtype:'combo',
		editable:false,
		name:'to',
		width:150,
		emptyText:'�������� ������',
		fieldLabel:'���������',
		listeners:{
			'select':function(t, oldVal, val){
				var v = this.getValue();
				catalog.users.base.baseParams.to = v;
				catalog.users.base.reload();
			}
		},
			
		
		hiddenName:'to',
		typeAhead : true,
		triggerAction : 'all',
		store : catalog.users.combostore,
		mode : 'local',
		listWidth:150,
		displayField : 'state',
		valueField : 'id'

	} ]

});
catalog.users.etap2 = function (response) {
	var store =new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: '/admincp.php',
			method: 'POST'
		}),
		baseParams: {
			task: "updateBase",
			module:'shop',
			'loadGroups[]':response.result.Groups,
		},
		reader: new Ext.data.JsonReader({
			id:'id',
			root: 'cats'
		}, [{
			name: 'state'
		},{
			name: 'id'
		}])
	});
	store.load();
	store.on('load', function() {
		Ext.getCmp('WindowUpdateBase').close();
		var Form2 = new Ext.FormPanel({
			frame:true,
			autoScroll:false,
			id:'FormUpdateBase2',
			fileUpload: true,
			height:450,
			labelAlign : 'top',
			items:[{

				xtype: 'multiselect',
				msgTarget: 'side',
				fieldLabel:'������',

				bodyStyle:'width:280px; height:280px',
				style:'width:280px; height:280px',
				width:280,
				height:250,
				store : this,

				allowBlank:false,
				hiddenName:'TypeText',
				name:'TypeText',
				displayField : 'state',
				valueField : 'id',

			},{
				html:'<spam style="font-size:11px;">����� ������� �� ������� ����� ����������� ������ CTRL � ����� ������� ���� �������� ������ ������</span>',
			}]
		});
		return new Ext.Window({
			width:450,
			height:450,
			modal:true,
			id:'WindowUpdateBase2',
			frame:true,
			//layout:'fit',
			items:[Form2],
			buttons:[{
				text:'��������',
				iconCls:'apply',
				handler: function() {
					if (Ext.getCmp('FormUpdateBase2').getForm().isValid()) {
						Ext.getCmp('FormUpdateBase2').getForm().submit({
							url:'/admincp.php',
							method:'post',
							params: {
								module:'shop',
								etap:2,
								'result':Ext.encode(response.result.result),
								task:'updateBase'
							},
							success: function(ff, response) {

								Ext.getCmp('WindowUpdateBase2').close();
catalog.users.combostore.reload();
								catalog.users.base.reload();
								App.setAlert('', '���� ������� ���������');
								if (response.result) {
									if (response.result.inserted) {
										App.setAlert('', '��������� '+response.result.inserted+' email �������');
									}
								}
							},
							failure: function() {
								App.setAlert('', '�� ������� �������� ����');
							}
						});
					}
				}
			}]
		}).show();

	});
}
catalog.users.view = {
	id : 'users11',
	title : '������������',
	layout : 'border',
	bodyBorder : false,
	defaults : {
		collapsible : true,
		split : true,
		animFloat : false,
		autoHide : false,
		useSplitTips : true,
		bodyStyle : 'padding:15px'
	},
	items : [ catalog.users.grid ]
};

init_modules[init_modules.length] = catalog.users.grid;

Ext.apply(actions, {
	'catalog.users.grid' : function() {
		if (Ext.getCmp('Content').layout.activeItem.id != 'catalog.users.grid') {
			Ext.getCmp('Content').layout.setActiveItem('catalog.users.grid');
			catalog.users.combostore.load();
			
			if (catalog.users.base.data.length < 1) {
				catalog.users.base.load({
					params : {
						start : 0,
						limit : 25
					}
				});
			}
			;

		}
	}
});
ModulesRightMenu += '<li><img src="core/icons/user_green.png"/><a id="catalog.users.grid" href="#">������������</a></li>';