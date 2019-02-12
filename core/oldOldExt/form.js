
$(function() { 
	$('#butt').button();
	$("#call").dialog({
		autoOpen: false,
		autoHeight:true,
		width: 435,
		resizable: false,
		zIndex: 29000,
		modal:true
	});
	$("#dialog-wait").dialog({
		autoOpen: false,
		
		resizable: false,
		modal:true,
		zIndex: 29001
	});
	$("#dialog-error").dialog({
		autoOpen: false,
		
		resizable: false,
		modal:true,
		zIndex: 29002
	});
});
function dialogError(text){
	$("#dialog-error").dialog('open');
	Ext.get('results_form').update(text);
}
function showForm(){
	$("#call").dialog('open');
}
function callbackpostForm(){
	
	Ext.Ajax.request({
		url:'/form.php',
		form:'form_r',
		method:'post',
		success:function(o){
		 $('#dialog-wait').dialog('close');
		var res = Ext.decode(o.responseText);
		if (res.success){
			$('#call').dialog("destroy");
			dialogError('Спасибо. Ждите звонка в указанное время');
			
		}
		else {
			if (res.msg){
				dialogError(res.msg);
				//alert(res.msg);
			}
			else {
				alert(o.responseText);
			}
		}
		
	},
	failure:function(){
		 $('#dialog-wait').dialog('close');
		 dialogError('Во время отправки данных произошла ошибка.');
	}
	});
	
}