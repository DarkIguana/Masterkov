var install = {};
install.window = function(dd) {
	var store2 = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : 'admincp.php',
			method : 'POST'
		}),
		baseParams : {
			module : 'admin',
			xaction : "AllModules"
		},

		reader : new Ext.data.JsonReader( {
			root : 'results',
			totalProperty : 'total',
			id : 'id'
		}, [ {
			name : 'id',
			
			mapping : 'id'
		}, {
			name : 'Name',
			mapping : 'Name'
		}, {
			name : 'Global',
			mapping : 'Global'
		}, {
			name : 'ModuleID',
			mapping : 'ModuleID'
		},
		 {
			name : 'file',
			mapping : 'file'
		},
		 {
			name : 'cls',
			mapping : 'cls'
		},
		{
			name : 'installed',
			mapping : 'installed'
		} ])
	});
	var grid2 = new Ext.grid.EditorGridPanel( {
		store : store2,
		frame : true,
		layout : 'fit',
		tbar : [ {
			text : 'Установить модуль',
			iconCls : 'add',
			
			handler : function() {
			
			if (grid2.getSelectionModel().getSelected())
			{
				var installed =grid2.getSelectionModel().getSelected().get('installed');
				var glb =grid2.getSelectionModel().getSelected().get('Global');
				var file =grid2.getSelectionModel().getSelected().get('file');
				var cls =grid2.getSelectionModel().getSelected().get('cls');
				if (installed == 1)
				{
					 Ext.MessageBox.show({
				           title: 'Ошибка',
				           msg: 'Модуль уже установлен',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       });
				}
				
				else
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'admin', task:'installModuleAdmin', file:file, cls:cls},
						success:function(){
							 Ext.MessageBox.show({
						           title: '',
						           msg: 'Перезагрузите панель управления для вступления изменений',
						           buttons: Ext.MessageBox.OK,
						           icon: Ext.MessageBox.INFO
						       });
							 store2.reload();
						},
						failure:function(){
							 Ext.MessageBox.show({
						           title: 'Ошибка',
						           msg: 'Не удалось установить модуль',
						           buttons: Ext.MessageBox.OK,
						           icon: Ext.MessageBox.ERROR
						       });
						}
					});
				}
				
			}
			else
			{
				 Ext.MessageBox.show({
			           title: 'Ошибка',
			           msg: 'Не выбран модуль',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.WARNING
			       });
			}
			
			}
		},

		{
			text : 'Удалить модуль',
			iconCls : 'delete',
			handler : function() {
			if (grid2.getSelectionModel().getSelected())
			{
				var installed =grid2.getSelectionModel().getSelected().get('installed');
				var glb =grid2.getSelectionModel().getSelected().get('Global');
				var file =grid2.getSelectionModel().getSelected().get('file');
				var cls =grid2.getSelectionModel().getSelected().get('cls');
				if (installed == 0)
				{
					 Ext.MessageBox.show({
				           title: 'Ошибка',
				           msg: 'Модуль не установлен',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       });
				}
				else if (glb == 1)
				{
					  Ext.MessageBox.show({
				           title: 'Ошибка',
				           msg: 'Этот модуль нельзя удалить',
				           buttons: Ext.MessageBox.OK,
				           icon: Ext.MessageBox.WARNING
				       });
				}
				else
				{
					Ext.MessageBox.show({
				           title: '',
				           msg: 'Вы уверены что хотите удалить этот модуль?',
				           buttons: Ext.MessageBox.YESNO,
				           icon:Ext.MessageBox.QUESTION,
				           fn:function(btn)
				           {
						         if (btn == "yes")
						         {
						        	 Ext.Ajax.request({
											url:'admincp.php',
											params:{module:'admin', task:'deleteModuleAdmin', file:file, cls:cls},
											success:function(){
												 Ext.MessageBox.show({
											           title: '',
											           msg: 'Перезагрузите панель управления для вступления изменений',
											           buttons: Ext.MessageBox.OK,
											           icon: Ext.MessageBox.INFO
											       });
												 store2.reload();
											},
											failure:function(){
												 Ext.MessageBox.show({
											           title: 'Ошибка',
											           msg: 'Не удалось удалить модуль',
											           buttons: Ext.MessageBox.OK,
											           icon: Ext.MessageBox.ERROR
											       });
											}
										});
						         }
				           }
				       });
				}
				
			}
			else
			{
				 Ext.MessageBox.show({
			           title: 'Ошибка',
			           msg: 'Не выбран модуль',
			           buttons: Ext.MessageBox.OK,
			           icon: Ext.MessageBox.WARNING
			       });
			}
			
			}
		} ],
		enableColLock : false,
		clicksToEdit : 1,
		loadMask : true,
		autoWidth : true,
		columns : [ {
			id : 'Name',
			header : "Название",
			width : 100,
			sortable : true,
			dataIndex : 'Name'
		},{
			id : 'installed',
			header : "",
			width : 100,
			sortable : true,
			dataIndex : 'installed',
			renderer:function(value)
			{
			   if (value == 1)
			   {
				   return "<b>Установлен</b>";
			   }
			   else
			   {
				   return "Не установлен";
			   }
			}
		} ],

		sm : new Ext.grid.RowSelectionModel( {
			singleSelect : true
		}),
		viewConfig : {
			forceFit : true
		},
		height : 150,

		iconCls : 'icon-grid',
		split : true
	});

	new Ext.Window( {
		width : 650,
		onEsc : true,
		height : 450,
		modal : true,
		closeAction : 'close',
		layout : 'fit',
		frame : true,
		title : 'Управление модулями',
		items : [ {
			xtype : 'tabpanel',
			activeItem : 0,
			items : [{
				title : 'Все модули',
				layout : 'fit',
				items : [ grid2 ]
			} ]
		} ]
	}).show(dd);
	store2.load();
};
Ext.apply(actions, {
	'install' : function() {
		install.window(this);
	}
});
ModulesRightMenuS+='<li><img src="core/icons/layout.png"/><a id="install" href="#">Управление модулями</a></li>';