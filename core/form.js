function dialogError(text) {

	alert(text);
}
function showForm() {
	$("#call").dialog('open');
}
function callbackpostForm() {

	Ext.Ajax.request({
		url : '/form.php',
		form : 'callback',
		method : 'post',
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#fade, #container2').css('display', 'none');
				$('html,body').removeClass('hd');
				$('#callback').trigger('reset');
				dialogError('Спасибо. Ждите звонка в указанное время');
				yaCounter26072727.reachGoal('obratnii_zvonok');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm2() {

	Ext.Ajax.request({
		url : '/form.php',
		form : 'callback2',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#fade, #container2, #container3').css('display', 'none');
				$('html,body').removeClass('hd');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
				yaCounter26072727.reachGoal('zayavka_na_remont');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm3() {

	Ext.Ajax.request({
		url : '/form2.php',
		form : 'zayvka1',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {

				$('#mask, .window').hide();
				dialogError('Спасибо. Ваша заявка успешно отправлена');

			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}
function next_reviews() {

	Ext.Ajax.request({
		url : '/',
		form : 'reviews',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {

			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

		}
	});

}
function send_rem() {

	Ext.Ajax.request({
		url : '/form3.php',
		form : 'order_rem',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {

			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#order_rem').trigger('reset');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
				yaCounter26072727.reachGoal('zayavka_is_gallerii');
			} else {
				if (res.msg) {
					dialogError(res.msg);
					// alert(res.msg);
				} else {
					alert(o.responseText);
				}
			}

		},
		failure : function() {

			dialogError('Во время отправки данных произошла ошибка.');
		}
	});

}

function callbackpostForm123() {
	Ext.Ajax.request({
		url : '/sform.php',
		form : 'sform',
		method : 'post',
		params : {
			order : true
		},
		success : function(o) {
			var res = Ext.decode(o.responseText);
			if (res.success) {
				$('#sform').trigger('reset');
				dialogError('Спасибо. Ваша заявка успешно отправлена');
			} else {
				if (res.msg) {
					dialogError(res.msg);
				} else {
					alert(o.responseText);
				}
			}
		},
		failure : function() {
			dialogError('Во время отправки данных произошла ошибка.');
		}
	});
}