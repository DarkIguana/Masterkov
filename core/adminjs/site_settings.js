
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
		fieldLabel:'�������� �����',
		name:'title',
		width:200
	},{
	fieldLabel:'�������� �����',
	name:'desc',
	width:500
	},
	{
		fieldLabel:'�������� �����',
		anchor:'90%',
		name:'keys'
	},
	
	{
		fieldLabel:'Email ��������������',
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
				waitMsg:'��������� ����������, ��� �������� ������',
				params:{module:'additional', task:'Load_Site_Settings'}
				,method:'post'
			});
		}
	},
	title:'��������� �����',
	items:form_setting,
	buttonAlign:'center',
	buttons:[{
		text:'���������',
		handler:function()
		{
			if (form_setting.getForm().isValid())
			{
				form_setting.getForm().submit({
					url:'admincp.php',
					waitMsg:'��������� ����������, ��� �������� ������',
				    params:{module:'additional', task:'Save_Site_Settings'}
				    ,method:'post'
				    ,success:function()
				    {
				    	Window_Setting.close();
				    	Ext.MessageBox.alert('', '��������� ������� ���������');
				    },
				    failure:function()
				    {
				    	Ext.MessageBox.alert('', '�� ����� ���������� ��������� ������');
				    }
				});
			}
		}
	}]
	,closeAction:'close'
}).show(An);
}

	init_nav_settings[init_nav_settings.length] ={
	text:'��������� �����', iconCls:'pages', handler:function(){
		site_settings();
	}
};
Ext.apply(actions, {
'site_settings': function()
{
site_settings();	
}
});
ModulesRightMenuS+='<li><img src="core/icons/bullet_wrench.png"/><a id="site_settings" href="#">��������� �����</a></li>';