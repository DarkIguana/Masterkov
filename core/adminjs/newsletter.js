var NewsLetterstore =new Ext.data.Store({
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

var NewsLetter = new Ext.Panel({

	title: '��������',
	layout:'fit',
	id:'NewsLetterMenu',
	autoHeight: false,
	frame:true,
	
	
	items: [new Ext.Panel({
		
		autoHeight:false,
		autoWidth:false,
		width:640,
		layout:'fit',

		frame:true,
		//frame:false,
		//border:false,
		items:[new Ext.FormPanel({
			id:'Newsletter',
			labelAlign:'top',
			autoScroll:true,
			listeners: {
				'afterrender': function() {

				}
			},
			items:[{
				xtype:'textfield',
				name:'name',
				width:350,
				fieldLabel:'��� �����������'
			},{
				xtype:'textfield',
				name:'subject',
				width:350,
				fieldLabel:'���� ������'
			},htmled({
				width:'100%',
				name:'message',
				height:350,
				label:'����� ������'
			}),{
				xtype:'combo',
				editable:false,
				name:'to',
				width:150,
				allowBlank:false,
				fieldLabel:'���������',

				hiddenName:'to',
				typeAhead : true,
				triggerAction : 'all',
				store : NewsLetterstore,
				mode : 'local',
				listWidth:150,
				displayField : 'state',
				valueField : 'id'

			}

			]
			,
			bbar:[{
				text:'���������',
				iconCls:'apply',
				handler: function() {
					tinyMCE.triggerSave();
					Ext.getCmp('Newsletter').getForm().submit({
						url:'admincp.php',
						method:'post',
						waitMsg:'���������� ������',
						params: {
							module:'shop',
							task:'saveNewsletter'
						},
						success: function() {
							App.setAlert('','��������� ������� ����������');
						}
					});
				}
			},{
				text:'<strong>�������� �������� �����</strong>',
				iconCls:'mail_test',
				handler: function() {
					var Group = Ext.getCmp('Newsletter').getForm().findField('to').getValue();
					Ext.Ajax.request({
						url:'admincp.php',
						method:'post',
						params: {
							module:'shop',
							to:Group,
							task:'totalEmails'
						},
						success: function(o) {
							if (!Ext.getCmp('Newsletter').getForm().isValid()) {
								return false;
							}
							var res = Ext.decode(o.responseText);
							if (res) {
								var def1 = Ext.MessageBox.buttonText.yes;
								var def2 = Ext.MessageBox.buttonText.no;
								Ext.MessageBox.buttonText.yes = '���������';
								Ext.MessageBox.buttonText.no = '����������';
								Ext.Msg.show({
									title:'��������',
									buttonText: {
										yes:'���������',
										no:'����������'
									},
									msg: '����� ���-�� ����������� � ��������: 1',
									buttons: Ext.Msg.YESNO,
									fn: function(btn) {
										if (btn=='yes') {
											tinyMCE.triggerSave();
											Ext.getCmp('Newsletter').getForm().submit({
												url:'admincp.php',
												method:'post',
												waitMsg:'���������� ������',
												params: {
													module:'shop',
													task:'saveNewsletter'
												},
												success: function() {
													App.setAlert('','��������� ������� ����������');
													tinyMCE.triggerSave();
													Ext.getCmp('Newsletter').getForm().submit({
														url:'admincp.php',
														method:'post',
														waitMsg:'�������� �����',
														params: {
															module:'shop',
															task:'sendNewsletterTest'
														},
														success: function() {
															App.setAlert('','������ ������� ����������');
														}
													});
												}
											});
										}
									},
									icon: Ext.MessageBox.WARNING
								});
								Ext.MessageBox.buttonText.yes = def1;
								Ext.MessageBox.buttonText.no = def2;

							}
						}
					});

				}
			},'->',{
				text:'<strong>��������� ������</strong>',
				iconCls:'mailed',
				handler: function() {
					if (!Ext.getCmp('Newsletter').getForm().isValid()) {
						return false;
					}
					var Group = Ext.getCmp('Newsletter').getForm().findField('to').getValue();
					tinyMCE.triggerSave();
					Ext.getCmp('Newsletter').getForm().submit({
						url:'admincp.php',
						method:'post',
						waitMsg:'���������� ������',
						params: {
							module:'shop',
							
							task:'saveNewsletter'
						},
						success: function() {

							Ext.Ajax.request({
								url:'admincp.php',
								method:'post',
								params: {
									module:'shop',
									to:Group, 
									task:'totalEmails'
								},
								success: function(o) {
									var res = Ext.decode(o.responseText);
									if (res) {
										var def1 = Ext.MessageBox.buttonText.yes;
										var def2 = Ext.MessageBox.buttonText.no;
										Ext.MessageBox.buttonText.yes = '���������';
										Ext.MessageBox.buttonText.no = '����������';
										Ext.Msg.show({
											title:'��������',
											buttonText: {
												yes:'���������',
												no:'����������'
											},
											msg: '����� ���-�� ����������� � ��������: '+res.total,
											buttons: Ext.Msg.YESNO,
											fn: function(btn) {
												if (btn=='yes') {
													App.setAlert('','��������� ������� ����������');
													tinyMCE.triggerSave();
													Ext.getCmp('Newsletter').getForm().submit({
														url:'admincp.php',
														method:'post',
														waitMsg:'�������� �����',
														params: {
															module:'shop',
															task:'sendNewsletter'
														},
														success: function() {
															App.setAlert('','������ ������� ����������');
														}
													});
												}
											},
											icon: Ext.MessageBox.WARNING
										});
										Ext.MessageBox.buttonText.yes = def1;
										Ext.MessageBox.buttonText.no = def2;
									}
								}
							});

						}
					});

				}
			}]
		})]
	})]
});
init_modules[init_modules.length] = NewsLetter;
Ext.apply(actions, {
	'NewsLetterMenu': function() {
		if (Ext.getCmp('Content').layout.activeItem.id != 'NewsLetterMenu') {
			Ext.getCmp('Content').layout.setActiveItem('NewsLetterMenu');
			NewsLetterstore.load();
			NewsLetterstore.on('load', function() {
				Ext.getCmp('Newsletter').getForm().load({
					url:'admincp.php',
					method:'post',
					waitMsg:'�������� ������',
					params: {
						module:'shop',
						task:'loadNewsletter'
					}

				});
			});
		}
	}
});
ModulesRightMenu+='<li><img src="core/icons/newsletter.png"/><a id="NewsLetterMenu" href="#">��������</a></li>';