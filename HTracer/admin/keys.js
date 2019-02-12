	var all_keys_index=[];
	function ReloadKeyColor(t,id)
	{
		//try{
		if($(t).attr("checked"))
		{
			$('#In_'+id).css("color","black");
			$('#In_'+id).css("text-decoration","none");
		}
		else
		{
			$('#In_'+id).css("text-decoration","line-through");
			$('#In_'+id).css("color","gray");
		}
	}
	var was_keys_chahged=false;
	var addKeyIndex=0;
	
	function addKeyRow(arr,tr_class,offset)
	{
		$('.dataTables_empty').css('display','none');
		$('.dataTables_empty').parent().css('display','none');
		
		var auto_offset=$('#keys_table tbody tr').length%2;
		offset=offset|auto_offset;
		if(offset===false)
			offset=auto_offset;
		var odd='odd';
		var res=1;
		if(offset%2)
		{
			res=0;
			odd='even';
		}	
		var tr_html=
			'<tr class="'+odd+' '+tr_class+'">'+
				'<td class="sc_td">'+
					arr[0]+
				'</td>'+
				'<td class="key_td">'+
					arr[1]+
				'</td>'+
				'<td class="out_td">'+
					arr[2]+
				'</td>'+
				'<td class="eva_td">'+
					arr[3]+
				'</td>'+
				'<td class="cl_td">'+
					arr[4]+
				'</td>';
		if(!single_page_url)
		{
			tr_html+=		
				'<td class="url_td">'+
					arr[5]+
				'</td>';
		}
		tr_html+=	
			'</tr>';
		$('#keys_table tbody').append(tr_html);
		addKeyIndex++;
		return res;
	}
	window.isJSOptChanging=false;
	var isOutChanged=[];
	window.SanAjaxRequestID=0;
	window.UrlAjaxRequestID=0;

	function ht_DoUrlRequest(id)
	{
		window.UrlAjaxRequestID=id;
		var key=$("#new_In_"+id).val();
		key+=' site:'+ Domain;
		key=encodeURIComponent(key);
		$.getJSON("http://ajax.googleapis.com/ajax/services/search/web?v=1.0&callback=ht_load_url_parsed_google&q="+key+"&context=?",function(data){});
	}
	function str_replace(search, replace, subject){return subject.split(search).join(replace);}

	function ht_load_url_parsed_google(func,data)
	{	
		if(data && data.results && data.results.length && data.results[0])
		{
			var res=data.results[0].unescapedUrl
				.replace('http://'+Domain+'/','/')
				.replace('http://www.'+Domain+'/','/');
				
			window.isJSOptChanging=true;
			$("#new_URL_"+window.UrlAjaxRequestID).val(res);
			window.isJSOptChanging=false;
		}
	}
	function suggest_parse_type_changed()
	{
		update_all_keys_index();
		if($('#suggest_parse_type').val()!='input')
		{
			$('#suggest_parse_input').css('display','none');
			$('#suggest_parse_btn'  ).css('display','inline');
		}
		else
		{			
			$('#suggest_parse_input').css('display','inline');
			$('#suggest_parse_btn'  ).css('display','none');
		}
		$('#progressbar'  		).css('display','none');
		$('#progressbar_label'	).css('display','none');
		$('#suggest_void_div'  	).css('display','none');

		
		$('#suggest_td2 ul').html('');
		recalc_suggest_count();

		$('#add_sugested_keys_btn').css('display','none');
	}
	var parse_suggests_from_table_tasks_count=0;
	var parse_suggests_from_table_tasks_finished=0;

	function parse_suggests_from_table()
	{
		$('#suggest_td2').attr('valign','top');	
		if(!$('#keys_table .key_in').length)
		{
			alert('No keys in table!');
			return;
		}
		$('#suggest_td2 ul').html('');
		recalc_suggest_count();
		$('#progressbar').css('display','block');
		$('#suggest_void_div').css('display','none');		
		$('#progressbar_label').css('display','block');

		$("#progressbar").progressbar({value:0});
		
		parse_suggests_from_table_tasks_count=0;
		parse_suggests_from_table_tasks_finished=0;
		
		$('#add_sugested_keys_btn').css('display','none');
		$('#suggest_td2').attr('valign','middle');
		update_all_keys_index();
		$.each($('#keys_table .key_in'),function()
		{
			if($('#suggest_aparse_cb').attr('checked'))
				make_suggest_ajax_request_shutle($(this).val());
			else
			{
				make_suggest_ajax_request($(this).val(),suggest_parse_str_change_index);
				make_suggest_ajax_request($(this).val()+' ',suggest_parse_str_change_index);
			}
		});
	}
	
	function parse_suggests_from_table_end()
	{
		
		$('#suggest_td2').attr('valign','top');
		$('#add_sugested_keys_btn').css('display','block');
		$('#progressbar').css('display','none');
		$('#suggest_void_div').css('display','none');
		$('#progressbar_label').css('display','none');
	}
	function add_sugested_keys()
	{
		$.each($('#suggest_td2 .add_sugested_key'),function()
		{
			if($(this).attr('checked'))
			{
				addKey($(this).attr('value'));
			}
		});
		$('#suggest_td2 #suggest_void_div').html(suggest_add_msg); 
		$('#suggest_td2 #suggest_void_div').css('display','block');
		$('#suggest_td2 #progressbar').css('display','none');
		$('#suggest_td2 #progressbar').css('display','none');
		$('#suggest_td2 #progressbar_label').css('display','none');
		$('#add_sugested_keys_btn').css('display','none');
		$('#suggest_td2 ul').css('display','none');
		$('#suggest_td2').attr('valign','middle');	
	}
	function update_all_keys_index()
	{	
		all_keys_index=[];
		$.each($('.key_in'),function()
		{
			var t=$(this).val();
			all_keys_index.push(t.trim());
		});
		var t=0;
		t++;
	}
	var suggest_parse_str_change_index=0;
	var suggest_parse_str_change_last='';
	var suggest_parse_str_change_index0=0;

	
	function suggest_parse_str_change(is_cb)
	{
		suggest_parse_str_change_index0++;
		setTimeout(function() {suggest_parse_str_change_inner(suggest_parse_str_change_index0,is_cb)},100);	
	}
	var hide_next_ac=false;
	function make_suggest_ajax_request(key,ci)
	{
		parse_suggests_from_table_tasks_count++;
		var cdata={'term':key,'showfirstkey':1};
		if($('#suggest_aparse_stem').attr('checked'))
			cdata={'term':key,'showfirstkey':1,'stem':1};
		$.ajax({
			url: "ajax/google_suggest.php",
			data:cdata,
			dataType:'json',
			success: function(arr)
			{
				if(ci==suggest_parse_str_change_index)
				{
					//alert(arr);
					$.each(arr,function(){
						addKeyToSuggest(this.label);
					});
				}
				parse_suggests_from_table_tasks_finished++;
				if($('#suggest_parse_type').val()!='input')
				{
					$("#progressbar").progressbar("value",(parse_suggests_from_table_tasks_finished/parse_suggests_from_table_tasks_count * 100));
					$('#progressbar_label').html(parse_suggests_from_table_tasks_finished+"/"+parse_suggests_from_table_tasks_count);
					if(parse_suggests_from_table_tasks_finished==parse_suggests_from_table_tasks_count)
						parse_suggests_from_table_end();
				}
			}
		});
	}
	function make_suggest_ajax_request_shutle(key)
	{
		key=key.trim().replace('  ',' ').replace('  ',' ').replace('  ',' ').replace('  ',' ');
		var was_queries=[];
		//was_queries.push(key);
		var words=key.split(' ');
		for(var t=0;t<100;t++)
		{//Теперь генерируем комбинации
			if(t)
			{
				for(//Перемешиваем слова
					var j, x, i = words.length; i;
					j = parseInt(Math.random() * i),
					x = words[--i], words[i] = words[j], words[j] = x
				);
			}
			key=words.join(' ').trim().replace('  ',' ').replace('  ',' ').replace('  ',' ');
			if($.inArray(key,was_queries)==-1)
			{
				was_queries.push(key);
				make_suggest_ajax_request(key+' ',suggest_parse_str_change_index);
				make_suggest_ajax_request(key,suggest_parse_str_change_index);
				if(words.length==2 && was_queries.length==2)
					break;
			}
		}
	}
	function suggest_parse_str_change_inner(index0,is_cb)
	{
		if($("#suggest_aparse_cb").attr("checked"))
		{
			$("#suggest_aparse_stem").attr("disabled",false);
			$("#suggest_aparse_stem_hint").css("color",'black');
		}
		else
		{
			$("#suggest_aparse_stem").attr("disabled",true);
			$("#suggest_aparse_stem_hint").css("color",'gray');
		}
		if(index0!=suggest_parse_str_change_index0
		|| $('#suggest_parse_type').val()!='input')
			return;
		if(is_cb && !$('#suggest_aparse_cb').attr('checked'))
			$('#suggest_parse_str').autocomplete("search");
		//alert(1);
		var str = $('#suggest_parse_str').val() + $('#suggest_aparse_cb').attr('checked');
		if(suggest_parse_str_change_last==str)
			return;
		else
			suggest_parse_str_change_last=str;
		//alert(3);
	
		var val= $('#suggest_parse_str').val().trim().indexOf(' ')==-1;
		var color='black'; 	
		if(val)
			var color='gray'; 	
		//$('#suggest_aparse_hint').css('color',color);
		$('#suggest_td2 ul').html('');
		recalc_suggest_count();
		update_all_keys_index();
		suggest_parse_str_change_index++;
		var key =$('#suggest_parse_str').val();
		if($('#suggest_aparse_cb').attr('checked'))
			make_suggest_ajax_request_shutle(key);
	}
	$(function(){
		$('#suggest_parse_str').change(function(){suggest_parse_str_change();});
		$('#suggest_parse_str').keypress(function(){suggest_parse_str_change();});
		
		suggest_parse_type_changed();
		suggest_parse_str_change();
		
		$('#suggest_parse_str').autocomplete({
			source: 'ajax/google_suggest.php',
			open:function(event,ui){
				if(hide_next_ac)
					$('.ui-autocomplete').css('display','none');
				hide_next_ac=false;
				if(!$('#suggest_aparse_cb').attr('checked'))
				{
					var ul=$('#suggest_td2 ul');
					$.each($('.ui-autocomplete li a'),function()
					{
						addKeyToSuggest($(this).html().trim());
					});
				}
			},
			/*focus:function(event,ui){},*/
			select: function(event,ui){
				setTimeout(function() {
					$('#suggest_parse_str').autocomplete("search");
					//suggest_parse_str_change();
				},100);
			}
		});
	});
	function recalc_suggest_count()
	{
		$('#sugested_keys_count').html('('+$('.add_sugested_key[checked="checked"]').length+')');
	}
	function addKeyToSuggest(key)
	{
		if($.inArray(key,all_keys_index)==-1
		&& key.indexOf("\\")==-1)
		{
			var ul=$('#suggest_td2 ul');
			ul.html(ul.html() 
			+ '<li>'
				+'<input class="add_sugested_key" type="checkbox" checked="checked" value="'+key+'" onchange="recalc_suggest_count()" />'
				+key
			+'</li>');
			all_keys_index.push(key);	
			$('#add_sugested_keys_btn').css('display','block');
			ul.css('display','block');
			recalc_suggest_count();
		}
	}
	function addKey(key,eva)
	{
		if(!key)
			key='';
		if(!eva)
			eva='1';

		var i=addKeyIndex;
		isOutChanged[i]=false;
		var w='300px';
		var sc=' ';
	
		if(!single_page_url)
			w='250px';
		else
			sc=' spellcheck="false" ';
			
		addKeyRow([
			'<input name="new_Status_'+i+'" value="1" type="checkbox" checked="checked" />',
			'<input class="key_in" name="new_In_'+i+'"  id="new_In_'+i+'"  onchange="form_changed()" onkeypress="form_changed()" type="text" value="'+key+'" style="width:'+w+'" '+sc+' />',
			'<input name="new_Out_'+i+'" id="new_Out_'+i+'" type="text" value="" />',
			'<input name="new_Eva_'+i+'" type="text" value="'+eva+'" />',
			'<input name="new_ShowInCLinks_'+i+'" value="1" type="checkbox" checked="checked" />',
			'<input name="new_URL_'+i+'" id="new_URL_'+i+'" type="text" value="/" />'
		],'new_key_tr');
		if(key)
		{
			form_changed();
			was_keys_chahged=true;
		}
		setTimeout(function() {
			if(!key)
				try{document.getElementById("new_In_"+i).focus();}catch(e){}
			else
			{
				$.ajax({
					url: "ajax/sanitarize.php",
					type:'POST',
					data:{'str':key},
					success: function(text)
					{
						window.isJSOptChanging=true;
						$("#new_Out_"+i).val(text);
						window.isJSOptChanging=false;
					}
				});
			}
			
			$("#new_In_"+i).keypress(function()
			{
				was_keys_chahged=true;
				window.SanAjaxRequestID++;
				var ID=window.SanAjaxRequestID;
				if(!$("#new_Out_"+i).val())
					isOutChanged[i]=false;
				if(!isOutChanged[i] && $("#new_In_"+i).val())
				{
					setTimeout(function() 
					{
						if(ID!=window.SanAjaxRequestID)
							return;
						ht_DoUrlRequest(i);	
						$.ajax({
							url: "ajax/sanitarize.php",
							/*context: document.body,*/
							type:'POST',
							data:{'str':$("#new_In_"+i).val()},
							success: function(text)
							{
								if(ID!=window.SanAjaxRequestID)
									return;
								window.isJSOptChanging=true;
								$("#new_Out_"+i).val(text);
								window.isJSOptChanging=false;
							}
						});
					},300);
				}
			});
			$("#new_URL_"+i).autocomplete({source: 'ajax/pages_autocomplete.php'});
			$("#new_In_" +i).autocomplete({source: 'ajax/google_suggest.php'});
			
			$("#new_Out_"+i).change(function(){
				if(!window.isJSOptChanging)
					isOutChanged[i]=true;
			});
			$("#new_URL_"+i).change(function(){
				if(!window.isJSOptChanging)
					isOutChanged[i]=true;
			});
		},10);
	}
	
	function form_changed()
	{
		$("#submit_btn").attr('disabled',false);
		$("#submit_btn").attr('value',save_str_tr);
	}
	function table_drawn()
	{
		$('#active_keys input').keypress(function(){form_changed()});
		$('#active_keys input').change(function(){form_changed()});
		//alert(111);
		//key_in.val
		//ws_parse_str
		if($('#ws_parse_str').length && $('#ws_parse_str').val().trim()=='')
		{
			setTimeout(function() 
			{
				if(!$('.key_in').length)
				{	
					$('#suggest_parse_type').val('input');
					suggest_parse_type_changed();
					setTimeout(function(){suggest_parse_type_changed();},100);
				}
				$.each($('.key_in'),function()
				{
					if($('#ws_parse_str').val().trim()=='')
						$('#ws_parse_str').val($(this).val().trim());
				});
			},100);
		}
		if($('#keys_table_filter input').val())
			$('td.dataTables_empty').html($('#keys_table td.dataTables_empty').html()
				+', <span style="color:gray">filter= <i>'+$('#keys_table_filter input').val())+'</i></span>';

		
		//$('#active_keys select').change(function(){form_changed()});
	}
	$(function() {
		$("#submit_btn").attr('disabled',true);
		$('#active_keys').ajaxForm(
		{
			beforeSubmit:  function(arr)
			{
				$("#submit_btn").attr('disabled',true);
				$("#submit_btn").attr('value',saving_str);
				arr.push({'name': 'ajax', 'value': '1'});
			},   
			dataType:'json',
			success:function(responseText)
			{
				//alert(1);
				$("#keys_table tbody .new_key_tr").remove();
				var res=($('#keys_table tbody tr').length-$("#keys_table tbody .new_key_tr").length%2);
				for(var i=0;i<responseText.aaData.length;i++)
					res=addKeyRow(responseText.aaData[i],'patch_tr',res);
				was_keys_chahged=false;
				addKeyIndex=0;
				//$("#submit_btn").attr('disabled',false);
				$("#submit_btn").attr('value',saved_str);
				$("#keys_table tbody .new_key_tr").remove();
				table_drawn();
			}
		});
		$('#export_form').ajaxForm(
		{
			beforeSubmit:  function(arr)
			{
				$("#export_btn").attr('disabled',true);
				$("#export_btn").attr('value',loading_str);
				arr.push({'name': 'ajax', 'value': '1'});
			},   
			success:function(responseText)
			{
				$("#export_btn").attr('value',exportg_str_tr);
				$("#export_btn").attr('disabled',false);
				var data=responseText;
				data=data.split("<script").join("<"+"!--");
				data=data.split("<SCRIPT").join("<"+"!--");
				data=data.split("<Script").join("<"+"!--");
				data=data.split("</script>").join("-->");
				data=data.split("</SCRIPT>").join("-->");
				data=data.split("</Script>").join("-->");
				data=data.split("</script").join("-->");
				data=data.split("</SCRIPT").join("-->");
				data=data.split("</Script").join("-->");

				$("#logos_td").html(data);
				$("#logos_td").attr('align','left');
			}
		});
		var aoColumnDefs=
		[
				/*{ "asSorting": [ "asc" ], "aTargets": [ 1, 2, 5]},*/
				{ "bSortable": false, "aTargets": [4]},
				{ "sSortDataType": "dom-text", "aTargets": [2,3]},
				{ "sType": "numeric", "aTargets": [3]},
				
				
				{ "sWidth": "22px", "aTargets": [4]},
				{ "sWidth": "45px", "aTargets": [0]},
				{ "sWidth": "47px", "aTargets": [3]},
				
				{ "sClass": "sc_td", "aTargets": [ 0 ]},
				{ "sClass": "key_td", "aTargets": [ 1 ]},
				{ "sClass": "out_td", "aTargets": [ 2 ]},
				{ "sClass": "eva_td", "aTargets": [ 3 ]},
				{ "sClass": "cl_td", "aTargets": [ 4 ]}
		];
		
		if(!single_page_url)
		{	
			aoColumnDefs.push({ "sClass": "url_td", "aTargets": [ 5 ]});
			aoColumnDefs.push({ "sWidth": "200px",  "aTargets": [ 5 ]});
			aoColumnDefs.push({ "sWidth": "200px",  "aTargets": [ 2 ]});
			aoColumnDefs.push({ "sWidth": "300px",  "aTargets": [ 1 ]});
		}
		else
		{
			aoColumnDefs.push({ "sWidth": "300px",  "aTargets": [ 2 ]});
			aoColumnDefs.push({ "sWidth": "310px",  "aTargets": [ 1 ]});
		}
		var sAjaxSource='ajax/keys.php';
		if(single_page_url)
			sAjaxSource='ajax/keys.php?url='+encodeURIComponent(single_page_url);
		if(is_ru_lang)
		{
			$('#keys_table').dataTable({
				'bJQueryUI': true,
				"bStateSave": true,
				//'fnDrawCallback':function() {alert(22)}, 
				'sPaginationType': 'full_numbers',
				"aaSorting": [[ 3, "desc" ]],
			
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": sAjaxSource,

				'fnPreDrawCallback':function() {
					if(was_keys_chahged && !confirm(not_save_confirm))
						return false;
					was_keys_chahged=false;
				},
				'fnDrawCallback':function() {
					was_keys_chahged=false;
					table_drawn();
				},
				"aoColumnDefs": aoColumnDefs,
				
			
				"oLanguage":{
					"sProcessing":   "Подождите...",
					"sLengthMenu":   "Показать _MENU_ ключевиков",
					"sZeroRecords":  "Ключевиков нет",
					"sInfo":         "Ключевики с _START_ до _END_ из _TOTAL_",
					"sInfoEmpty":    "Ключевики с 0 до 0 из 0",
					"sInfoFiltered": "(отфильтровано из _MAX_ ключевиков)",
					"sInfoPostFix":  "",
					"sSearch":       "Поиск:",
					"sUrl":          "",
					"oPaginate": {
						"sFirst": "Первая",
						"sPrevious": "Пред.",
						"sNext": "След.",
						"sLast": "Последняя"
					}
				}
			});
		}
		else
		{
			$('#keys_table').dataTable({
				'bJQueryUI': true,
				"bStateSave": true,
				//'fnDrawCallback':function() {alert(22)}, 
				'sPaginationType': 'full_numbers',
				"aaSorting": [[ 3, "desc" ]],
			
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource": sAjaxSource,

				'fnPreDrawCallback':function() {
					if(was_keys_chahged && !confirm(not_save_confirm))
						return false;
					was_keys_chahged=false;
				},
				'fnDrawCallback':function() {
					was_keys_chahged=false;
					table_drawn();
				},
				"aoColumnDefs": aoColumnDefs
			});
		}
		$('#keys_table').css('width','100%');
	});
	$(function(){
		if($('#export_dest').val()=='sape')
		{
			$("#b_needtop").css('display','none');
			$("#b_budget").css('display','none');
			$("#needtop").css('display','none');
			$("#budget").css('display','none');
			$("#s_rub").css('display','none');
		}
		else
		{
			$("#b_needtop").css('display','inline');
			$("#b_budget").css('display','inline');
			$("#needtop").css('display','inline');
			$("#budget").css('display','inline');
			$("#s_rub").css('display','inline');
		}
		$('#export_dest').change(function (){
			$('#sape_img').removeClass('selected');
			$('#rookee_img').removeClass('selected');
			$('#webeffector_img').removeClass('selected');
			$('#seopult_img').removeClass('selected');
									
			$('#'+$('#export_dest').val()+'_img').addClass('selected');

			if($('#export_dest').val()=='sape')
			{
				$("#b_needtop").hide(333);
				$("#b_budget").hide(333);
				$("#needtop").hide(333);
				$("#budget").hide(333);
				$("#s_rub").hide(333);
			}
			else
			{
				$("#b_needtop").show(333);
				$("#b_budget").show(333);
				$("#needtop").show(333);
				$("#budget").show(333);
				$("#s_rub").show(333);
			}
		});
		$("#export_dest").trigger('change');
		$(function() {
			if(is_ru_lang)
			{
				$("#keys_table_filter label").click(function()
				{ 
					if(!single_page_url)
					{
						ShowHintDialog('',
							'Поиск производится по полям "Ключ", "Написание" и "Страница"<br /><br />'+
							'По умолчанию при поиске ищуться включения. Например, если вы наберете "<span style="color:gray">одесс</span>", то найдутся все ключи содержащие эту строку<br /><br />'+
							'Чтобы найти четкие соответствия перед запросом поставьте равно: "<span style="color:gray">=одесса</span>" или "<span style="color:gray">=/page.html</span>"<br /><br />'+
							'Чтобы найти строки начинающиеся с заданной поставьте перед запросом символ меньше: "<span style="color:gray">&lt;одесс</span>" или "<span style="color:gray">&lt;/dir/</span>"<br /><br />'+
							'Чтобы найти строки заканчивающися заданной поставьте перед запросом символ больше: "<span style="color:gray">>одесс</span>" или "<span style="color:gray">>/dir/</span>"<br /><br />'
						);
					}
					else
					{
						ShowHintDialog('',
							'Поиск производится по полям "Ключ" и "Написание"<br /><br />'+
							'По умолчанию при поиске ищуться включения. Например, если вы наберете "<span style="color:gray">одесс</span>", то найдутся все ключи содержащие эту строку<br /><br />'+
							'Чтобы найти четкие соответствия перед запросом поставьте равно: "<span style="color:gray">=одесса</span>"<br /><br />'+
							'Чтобы найти строки начинающиеся с заданной поставьте перед запросом символ меньше: "<span style="color:gray">&lt;одесс</span>"<br /><br />'+
							'Чтобы найти строки заканчивающися заданной поставьте перед запросом символ больше: "<span style="color:gray">>одесс</span>"<br /><br />'
						);				
					}
				});
			}
			$("#keys_table_filter label").css('cursor','help');
			$("#keys_table_filter input").css('cursor','edit');
			$("#keys_table_filter input").click( function(){ 
				return false;				
			});
			if(!single_page_url)
			{
				$("#keys_table_filter input").autocomplete(
				{
					source: 'ajax/pages_autocomplete.php',
					search: function(event, ui) 
					{
						return $("#keys_table_filter input").val().length>=2
							&& ($("#keys_table_filter input").val().substr(0,2)=='=/'
							|| $("#keys_table_filter input").val().substr(0,2)=='</');
					}
				});
			}
		});
	});

//=======================WS=============================
	function recalc_ws_count()
	{
		$('#ws_keys_count').html('('+$('.add_ws_key[checked="checked"]').length+')');
	}
	var parse_ws_tasks_count=0;
	var parse_ws_finished=0;
	function ws_k_change()
	{
		setTimeout(function() 
		{
			var val = $('#ws_k_input').val().trim().replace(',','.');
			var k=parseFloat(val);
			if(!k)
				k=parseFloat(val.replace('.',','));
			if(k)
			{
				$.each($('.add_ws_key_eva'), function()
				{
					$(this).val(Math.round(k * $(this).attr('eva')));
				});
			}
		},100);
	}
	$(function()
	{
		$("#ws_parse_str").bind("keypress",
			function(e)
			{
				if((window.event && window.event.keyCode == 13)
				||(e && e.keyCode == 13))
				{
					parse_ws();
					return false;
				}
			}
		);
	});
	
	function add_ws_keys()
	{
		$.each($('#ws_td2 tbody tr'),function()
		{
			//alert(1);
			var lst=$(this).children();
			var checked=false;
			var text='';
			var eva=0;
			for(var i=0;i<lst.length;i++)
			{
				var cur = $(lst[i]);
				if(cur.children('.add_ws_key') && cur.children('.add_ws_key').length)	
				{
					checked=cur.children('.add_ws_key').attr('checked');
					text=cur.children('.add_ws_key').attr('value');
				}
				if(cur.children('.add_ws_key_eva') && cur.children('.add_ws_key_eva').length)	
				{
					eva=cur.children('.add_ws_key_eva').attr('value');
				}
			}
			if(checked && text && eva)
				addKey(text,eva);
		});
		$('#ws_td2 #ws_void_div').html(suggest_add_msg);
		$('#ws_td2 #ws_void_div').css('display','block');
		$('#ws_td2 #ws_table_div').css('display','none');
		$('#ws_td2 #ws_wait_div').css('display','none');
		$('#ws_td2 #add_ws_keys_btn').css('display','none');
		$('#ws_td2').attr('valign','middle');
	}
	
	function parse_ws()
	{
		if(!$('#ws_parse_str').val())
		{
			alert('Введите запрос');
			return;
		}
		$('#ws_parse_btn').attr('disabled',true);
		
		$('#ws_td2 tbody').html('');
		parse_ws_tasks_count=0;
		parse_ws_finished=0;
		
		$('#ws_table_div').css('display','none');
		$('#add_ws_keys_btn').css('display','none');
		
		$('#ws_td2').attr('valign','middle');
		$('#ws_void_div').css('display','none');
		$('#ws_wait_div').css('display','block');
		
		
		update_all_keys_index();
		$.ajax({
			url: "ajax/ws.php",
			data:{'q':$('#ws_parse_str').val()},
			dataType:'json',
			success: function(arr)
			{	
				update_all_keys_index();
				$('#ws_parse_btn').attr('disabled',false);
				
				for(var i=0;i<arr.length;i++)
				{
					var cur=arr[i];
					if($.inArray(cur['key'],all_keys_index)==-1)
					{
						$('#ws_td2 tbody').append(
							'<tr>'+
								'<td><input type="checkbox" checked="checked" class="add_ws_key" value="'+cur['key']+'" onchange="recalc_ws_count()" /></td>'+
								'<td>'+cur['key']+'</td>'+
								'<td>'+cur['eva']+'</td>'+
								'<td><input type="text" class="add_ws_key_eva" eva="'+cur['eva']+'" size="3" value="'+cur['eva']+'" /></td>'+
							'</tr>'
						);
					}
				}
				$('#ws_k_input').val('1.0');
				$('#ws_td2').attr('valign', 'top');
				$('#ws_wait_div').css('display','none');
				$('#ws_table_div').css('display','block');
				$('#add_ws_keys_btn').css('display','block');
				recalc_ws_count();
			}
		});
	}
//=================================Экспорт: оптимизация проекта============================================================================
function GetAnchorFromLink(Link)
{
	var a=Link.split('>');
	if(a.length<3)
		return false;
	a=a[3];
	if(a.indexOf('<')!==-1)
		a=a.split('<');
	else
		a=a.split('&lt;');
	return a[0];
}
var project_optimization_count=0;
var project_optimization_cur=0;
var project_optimization_deleted=0;

var ya_cash=[];
var ya_cash_arr=[];
var project_optimization_need_top=3;
function project_optimization_apply_pos(position,canchor,carr)
{
	ya_cash[canchor]=position;
	project_optimization_cur++;
	$('#export_optimize_processbar').progressbar("value",100*(project_optimization_cur/project_optimization_count));
	$('#export_optimize_cur_str').html(project_optimization_cur);
	if(project_optimization_need_top<position)
	{
		if($('#export_data_textarea').val().trim())
		$('#export_data_textarea').val($('#export_data_textarea').val()+"\n");
		$('#export_data_textarea').val(
				$('#export_data_textarea').val()
				//+canchor
				+carr.join("\n")
				+"\n"
		);
	}
	else
	{
		project_optimization_deleted++;
		$('#export_optimize_deleted').html(project_optimization_deleted);
	}
}
$.ajax({
	dataType:'jsonp',
	url:"http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=PHP",
	success:function(data)
	{
		//alert(data);
	}
});
var cur_ajax_object_num=0;
var cur_ajax_object_arr=[];
var was_banned_time=false;

function start_project_optimization_inner()
{
	project_optimization_need_top=parseInt($('#ya_min_pos').val());
	cur_ajax_object_num=0;
	cur_ajax_object_arr=[];

	project_optimization_cur=0;
	project_optimization_deleted=0;
	$('#export_optimize_options').css('display','none');
	$('#export_optimize_results').css('display','block');
	$('#export_optimize_processbar').progressbar({value: 0});
	var data0=$('#export_data_textarea').val().split('\n');
	var data1=[];
	for (var i=0;i<data0.length;i++)
	{
		var cur=data0[i].trim();
		if(cur && cur!='')
			data1.push(cur);
	}
	var lastAnhor='';
	var count=0;
	var arr=[];
	$('#export_data_textarea').val('');
	for(var i=0;i<data1.length;i++)
	{
		var cur=data1[i];
		var anchor=GetAnchorFromLink(cur);
		if((anchor!=lastAnhor && i!=0)||i==data1.length-1) 
		{
			count++;
			arr.push(cur);
			ya_cash_arr[anchor]=arr.concat();
			if($('#export_optimize_se').val()=='yandex')
			{
				$.ajax(
				{
					url: '../keysyn/yaparse.php?query='+encodeURIComponent(anchor)+'&place='+Domain,
					dataType:'text',
					tanchor:anchor,
					tarr:arr.concat(),
					success: function(position) 
					{
						position=parseInt(position);
						var canchor=this.tanchor;
						var carr=this.tarr;
						project_optimization_apply_pos(position,canchor,carr);
					}	
				});
			}
			else
			{
				//cur_ajax_object_num=0;
				cur_ajax_object_arr.push(
				//$.ajax(
				{
					dataType:'jsonp',
					url:'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q='//&callback=tcb&context=hh'
						+encodeURIComponent(anchor),
					tanchor:anchor+'',
					tarr:arr.concat(),
					success: function(data) 
					{
						var position=102;
						var canchor=this.tanchor;
						var carr=this.tarr;
						var time = 0;
						if(data && !data.responseData)
							data.responseData=data;

						if(data && data.responseData && data.responseData.results)
							time=0;
						else if(/*data===null||*/
						(data && (data.responseStatus==='403' || data.responseStatus===403)))
							time=30000;	
						if(data && data.responseData && data.responseData.results 
						&& data.responseData.results.length && data.responseData.results[0])
						{
							for(var i=0;i<data.responseData.results.length;i++)
							{
								var turl=data.responseData.results[0].url.trim();
								if(turl.indexOf('http://'+Domain)===0||turl.indexOf('http://www.'+Domain)===0)
								{
									position=i+1;
									break;
								}
							}
						}		
						if(window.was_banned_time)
						{
							time=0;
							window.was_banned_time=false;
						}
						if(time)
						{
							$('#google_ban').css('display','inline');
							window.was_banned_time=true;
							$('#google_ban_sec').html(30);
							setTimeout(function(){inc_ban_sec()},1000);
						}	
						else
							$('#google_ban').css('display','none');

						project_optimization_apply_pos(position,canchor,carr);
						window.cur_ajax_object_num++;
						if(window.cur_ajax_object_num<window.cur_ajax_object_arr.length)
						{
							setTimeout(function()
								{$.ajax(window.cur_ajax_object_arr[window.cur_ajax_object_num]);},
								time + 300 + Math.random()%600);
						}
						else
							$('#google_ban').css('display','none');

					}
				});
				if(i==data1.length-1)
				{
					$.ajax(cur_ajax_object_arr[0]);
				}
			}
			arr=[];
		}
		else
			arr.push(cur);
		lastAnhor=anchor;
	}
	$('#export_optimize_count').html(count);
	project_optimization_count=count;
}	
function tcb(fun,data)
{
	window.cur_ajax_object_arr[window.cur_ajax_object_num].success(data);
	//window[fun](data);	
}
function inc_ban_sec()
{
	var sec=parseInt($('#google_ban_sec').html());
	if(sec>0)
	{
		sec--;
		$('#google_ban_sec').html(sec);
		setTimeout(function(){inc_ban_sec()},1000);
	}
}
function start_project_optimization()
{	
	if($('#export_optimize_se').val()=='yandex')
	{
		$.ajax({
			url: '../keysyn/yaparse.php?query='+encodeURIComponent('тест'),
			success: function(str) 
			{
				if(str.indexOf('@%#')!=-1)
				{
					alert(
						'You must enter Yandex.XML api key in keysyn/config.php\n'+
						'Yandex.XML error:\n '+str.replace(/(<([^>]+)>)/ig,"").trim()
					);
				}
				else
					start_project_optimization_inner();
			}
		});
	}
	else
		start_project_optimization_inner();
}

//
