Ext.apply(Ext.form.VTypes, {
	
    password : function(val, field) {
        if (field.initialPassField) {
            var passform = Ext.getCmp(field.initialPassField);
            return (val == passform.getValue());
        }
        return true;
    },

    passwordText : 'Пароли не совпадают'
});
var passform = new Ext.FormPanel({
	    labelWidth:80,
        url:'admin/login.php', 
        frame:true, 
         autoHeight:true,
        title:'Смена пароля', 
        defaultType:'textfield',
	    monitorValid:true,
	    items: [{ 
                fieldLabel:'Старый пароль', 
                name:'oldpass', 
                inputType:'password', 
                allowBlank:false 
            },{ 
                fieldLabel:'Новый пароль', 
                name:'newpass', 
                id: 'newpass',
                inputType:'password', 
                allowBlank:false 
            },{ 
                fieldLabel:'Подтвердите', 
                name:'confnewpass', 
                inputType:'password', 
                vtype: 'password',
                initialPassField: 'newpass',
                allowBlank:false 
            }],
            buttons:[{ 
                text:'Сменить пароль',
                formBind: true,	 
                // Function that fires when user clicks the button 
                handler:function(){
                if(passform.getForm().isValid()){
	               passform.getForm().submit({
	                    url: 'admincp.php',
	                    params:{xaction:'PassChange', module:'admin_passchange'},
	                    waitMsg: 'Пожалуйста подождите, идёт отправка данных...',
	                    success: function(passform, o){
	                    	 passchange.hide();
	                    	 passform.reset();
	                    	 Ext.MessageBox.alert('', 'Пароль был успешно изменён');
		                        location.replace("/admincp.php?passchanged");
	                    	
	                       
	                       
	                        
	                    },
	                    failure: function(passform, o)
	                    {
	                    	if (o.result.msg = '1')
	                    	{
	                    		passform.reset();
	                    		Ext.MessageBox.alert('Ошибка', 'Неверно задан Старый пароль');
	                    	}
	                    }
	                    
	                });
                }
            }
        },{
            text: 'Закрыть',
            handler: function(){
                passform.getForm().reset();
                passchange.hide();
            }
        }
]
});
 var passchange = new Ext.Window({
        layout:'fit',
        width:300,
  
        modal: true,
        shadow:true,
        closable: false,
        resizable: false,
        closeAction: 'hide',
        plain: true,
        border: false,
        items: [passform]
	});
	init_nav_settings[init_nav_settings.length] ={
	text:'Изменить пароль', iconCls:'pages', handler:function(){
		passchange.show();
	}
};

Ext.apply(actions, {
'pass': function()
{
passchange.show();
	
}
});
ModulesRightMenuS+='<li><img src="core/icons/key.png"/><a id="pass" href="#">Изменить пароль</a></li>';