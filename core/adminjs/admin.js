Ext.onReady(function(){
	Ext.QuickTips.init();

	var UploadFilesForm = new Ext.FormPanel({
		frame:true
		,fileUpload:true

		,width:400
		,height:130
		,items:[{
			xtype: 'fileuploadfield',
			emptyText: 'Выберите файл для загрузки',
			fieldLabel: 'Файл',
			anchor:'90%',
			width:380,
			name: 'photo-path',
			buttonCfg: {
				text: ' ',
				iconCls: 'upload-icon'
			}}]
	});

	var  UploadFilesWindow = new Ext.Window({
		width:400
		,title:'Загрузка файлов на сервер'
		,height:130
		,modal:true
		,closeAction:'hide'
		,listeners:{
		"hide": function(){
			UploadFilesForm.getForm().reset();
		}
		}
	//	,frame:true
		,items:[UploadFilesForm]
		,buttonAlign:'center'
		,buttons:[{
			text:'Загрузить'
			,handler:function()
			{

				if (UploadFilesForm.getForm().isValid())
				{
					UploadFilesForm.getForm().submit({
						url:'admincp.php'
						,waitMsg:'Пожалуйста подождите идёт сохранение дизайна'
						,params:{xaction:'UploadFile', module:'additional'}
						,method:'post'
						,success:function(o, response){

							UploadFilesWindow.hide();
							//	alert(Ext.encode(o));
							var result =response.result;
							Ext.MessageBox.alert('','файл успешно загружен '+result.msg);
						}
						,failure:function(response)
						{
							Ext.MessageBox.alert('Ошибка!', 'Во время загрузки файла произошла неизвестная ошибка, попробуйте чуть позднее');
						}
					});
				}
				else
				{
					Ext.MessageBox.alert('', 'Выберите файл для загрузки на сервер');
				}
			}
		}]
	});

	Ext.apply(actions, {
	'UploadFiles': function()
	{
		UploadFilesWindow.show();

	}
	});
	//ModulesRightMenuS+='<li><img src="core/icons/package.png"/><a id="UploadFiles" href="#">Загрузка файлов</a></li>';

	Ext.BLANK_IMAGE_URL = "core/images/default/s.gif";
	// Управление дизайном
	var EditDesignForm = new Ext.FormPanel({
		frame:true
		,labelAlign:'top'
		//,layout:'fit'
		,border:false
		,width:1005
		,height:540
		,items:[{hideLabel:true,xtype:'textarea', name:'design', width:'1000', height:500, anchor:'90%'}]
		//htmled({height:'500', width:'900', name:'design'})
	});

	var DesignWindow = new Ext.Window({
		width:1024
		,title:'Управление дизайном'
		,height:600
		,modal:true
		,closeAction:'hide'
		,listeners:{
		"hide": function(){
			EditDesignForm.getForm().reset();
		}
		}
		,frame:true
		,items:EditDesignForm
		,buttonAlign:'center'
		,buttons:[{
			text:'Сохранить'
			,handler:function()
			{
				tinyMCE.triggerSave();
				EditDesignForm.getForm().submit({
					url:'admincp.php'
					,waitMsg:'Пожалуйста подождите идёт сохранение дизайна'
					,params:{xaction:'SaveDesign', module:'additional'}
					,method:'post'
					,success:function(o){
						DesignWindow.hide();
						Ext.MessageBox.alert('','Дизайн успешно сохранен');
					}
					,failure:function(response)
					{
						Ext.MessageBox.alert('Ошибка!', 'Во время сохранения дизайна произашла неизвестная ошибка, попробуйте чуть позднее');
					}
				});
			}
		}]
	});

	Ext.apply(actions, {
	'editDesign': function()
	{
		DesignWindow.show();
		EditDesignForm.getForm().load({
			url:'admincp.php'
			,waitMsg:'Пожалуйста подождите, идёт загрузка данных'
			,params:{xaction:'LoadDesign', module:'additional'}
			,method:'post'
			,success:function(o){

			}
			,failure:function(response)
			{
				Ext.MessageBox.alert('Ошибка!', 'Во время загрузки дизайна произашла неизвестная ошибка, попробуйте чуть позднее');
				DesignWindow.hide();
			}
		});
	}
	});
	//ModulesRightMenuS+='<li><img src="core/icons/package.png"/><a id="editDesign" href="#">Управление дизайном</a></li>';

	// ---------------------------
	// Кнопка Выйти
	Ext.apply(actions, {
	'exit': function()
	{
		location.replace('?xaction=exit');
	}
	});
	ModulesRightMenuS+='<li><img src="core/icons/door_out.png"/><a id="exit" href="#">Выйти</a></li>';
	// --------------------------



	var menu = new Ext.menu.Menu({
		id: 'nav-modules',
		items:init_nav_modules
	});

	var menu2 = new Ext.menu.Menu({
		id: 'nav2-modules',
		items:init_nav_settings
	});

	var menu5 = new Ext.Toolbar({
		region:'north',
		height:30,
		style : 'textalign :center',
		items: [{xtype:'tbspacer', width:200},
		{text:'<b>Навигация</b>', menu:menu}, {text:'<b>Настройки</b>', menu:menu2}
		]
	});
	var Content = {
		id:'Content',
		region: 'center',
		xtype:'panel',
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: false,
		layoutConfig: {
			animate: true
		},
		buttonsAling:'right',
		items:init_modules
	}
	var modules = new Ext.Panel({
		frame:true,
		id:'action1-panel',
		title: 'Модули',
		collapsible:false,
		html:'<ul id="modules">'+ModulesRightMenu+'</ul>',
		titleCollapse: true
	});
	var settings = new Ext.Panel({
		frame:true,
		id:'action2-panel',
		title: 'Настройки',
		collapsible:false,
		html:'<ul id="settings">'+ModulesRightMenuS+'</ul>',
		titleCollapse: true
	});


	var actionPanel = new Ext.Panel({
		id:'action-panel',
		region:'west',
		split:true,
		border:true,
		collapsible: true,
	//	collapseMode: 'mini',
		width:165,
		minWidth: 150,
		border: false,
		//baseCls:'x-plain',
		items:[modules, settings]
	});

	function doAction(e, t){
		//e.stopEvent();
		if (actions[t.id])
		{
			actions[t.id]();
		}
	}
	Ext.getBody().on('mousedown', doAction, null, {delegate:'a'});
	Ext.getBody().on('click', Ext.emptyFn, null, {delegate:'a', preventDefault:true});
	new Ext.Viewport({
		layout:'border',
		items:[menu5,actionPanel,Content]
	});
	

var loginDialog = new Ext.ux.form.LoginDialog({
		modal : true,
	    forceVirtualKeyboard:false,
	    method:'post',
	    title:'Вход в панель управления',
	    usernameField:'loginadmin',
	    loginButton:'Войти',
	    message:'<img src="core/re.png" width="220">',
	    failMessage:'Логин или пароль неправильны',
	    usernameLabel:'Логин',
	    passwordLabel:'Пароль',
	    url:'admincp.php',
	    enableVirtualKeyboard:true,
	    params:{module:'CheckLogin', xaction:'AdminLogin'},
	    passwordField:'loginpass',
	    waitMessage:'Пожалуйста подождите',
		basePath: 'core/images/icons',
		success:function(){
			loginDialog.hide();
		},
		failure:function(){
			Ext.MessageBox.alert('', 'Введённые вами логин или пароль неправильны');
		}
	});
	

	


	function checkLogin()
	{
		Ext.Ajax.request({
			waitMsg: 'Подождите пожалуйста...',
			url: 'admincp.php',
			params: {
				xaction: "CheckLogin",
				module:'CheckLogin'
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					loginDialog.show();
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
	};
	
	var hideMask = function () {
		Ext.get('loading').remove();
		Ext.get('loading-mask').fadeOut({
			remove:true
		});

	}

	hideMask.defer(250);

	
});