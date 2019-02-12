
function site_settings()
{
var form_setting = new Ext.FormPanel({
	frame:true,
	width:640,
	height:200,
	bodyStyle:'padding:10px',
	//labelAlign:'top',
	defaults:{xtype:'textfield'},
	items:[{
		fieldLabel:'Название сайта',
		name:'title',
		width:200
	},{
	fieldLabel:'Описание сайта',
	name:'desc',
	width:500
	},
	{
		fieldLabel:'Ключевые слова',
		anchor:'90%',
		name:'keys'
	},
	
	{
		fieldLabel:'Email администратора',
		anchor:'90%',
		name:'email_admin'
	}
	]
});
var An = Ext.get('site_settings');
var Window_Setting = new Ext.Window({
	width:650,
	height:230,
	listeners:{
		"show":function(){
			form_setting.load({
				url:'admincp.php',
				waitMsg:'Подождите пожалуйста, идёт загрузка данных',
				params:{module:'additional', task:'Load_Site_Settings'}
				,method:'post'
			});
		}
	},
	title:'Настройки сайта',
	items:form_setting,
	buttonAlign:'center',
	buttons:[{
		text:'Сохранить',
		handler:function()
		{
			if (form_setting.getForm().isValid())
			{
				form_setting.getForm().submit({
					url:'admincp.php',
					waitMsg:'Подождите пожалуйста, идёт загрузка данных',
				    params:{module:'additional', task:'Save_Site_Settings'}
				    ,method:'post'
				    ,success:function()
				    {
				    	Window_Setting.close();
				    	Ext.MessageBox.alert('', 'Настройки успешно сохранены');
				    },
				    failure:function()
				    {
				    	Ext.MessageBox.alert('', 'Во время сохранения произошла ошибка');
				    }
				});
			}
		}
	}]
	,closeAction:'close'
}).show(An);
}

	init_nav_settings[init_nav_settings.length] ={
	text:'Настройки сайта', iconCls:'pages', handler:function(){
		site_settings();
	}
};
Ext.apply(actions, {
'site_settings': function()
{
site_settings();	
}
});
ModulesRightMenuS+='<li><img src="core/icons/bullet_wrench.png"/><a id="site_settings" href="#">Настройки сайта</a></li>';