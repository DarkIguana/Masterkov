Ext.util.Format.usMoney = function(v) { // override Ext.util.usMoney
	v = Ext.num(v, 0); // ensure v is a valid numeric value, otherwise use 0 as a base (fixes $NaN.00 appearing in summaryRow when no records exist)
	v = (Math.round((v - 0) * 100)) / 100;
	v = (v == Math.floor(v)) ? v + ".00" : ((v * 10 == Math.floor(v * 10)) ? v + "0" : v);
	v = String(v);

	var ps = v.split('.');
	var whole = ps[0];
	var sub = ps[1] ? '.'+ ps[1] : '.00';
	var r = /(\d+)(\d{3})/;

	while (r.test(whole)) {
		whole = whole.replace(r, '$1' + ',' + '$2');
	}

	v = whole + sub;

	if (v.charAt(0) == '-') {
		return '-$' + v.substr(1);
	}

	return  v + "р.";
}
var MarksStore = new Ext.data.Store( {
	proxy : new Ext.data.HttpProxy( {
		url : 'admincp.php',
		method : 'POST'
	}),
	// autoLoad:true,
	baseParams : {
		module : "shop",
		task : 'getMarks'
	},
	reader : new Ext.data.JsonReader( {
		id : 'id',
		root : 'cats'
	}, [ {
		name : 'name'
	}, {
		name : 'id'
	}

	])
});
var comboMark = new Ext.form.ComboBox( {
	store : MarksStore,
	displayField : 'name',
	valueField : 'id',
	mode : 'local',
	triggerAction : 'all',
	editable : false,
	
	hiddenName : 'mark',
	allowBlank : true,
	name : 'mark',
	width:300,
	fieldLabel : 'Брэнд',
	selectOnFocus : true
});



// Add the additional 'advanced' VTypes
Ext.apply(Ext.form.VTypes, {
	daterange : function(val, field) {
		var date = field.parseDate(val);

		if(!date){
			return;
		}
		if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
			var start = Ext.getCmp(field.startDateField);
			start.setMaxValue(date);
			start.validate();
			this.dateRangeMax = date;
		}
		else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
			var end = Ext.getCmp(field.endDateField);
			end.setMinValue(date);
			end.validate();
			this.dateRangeMin = date;
		}
		/*
		* Always return true since we're only using this vtype to set the
		* min/max allowed values (these are tested for after the vtype test)
		*/
		return true;
	},

	password : function(val, field) {
		if (field.initialPassField) {
			var pwd = Ext.getCmp(field.initialPassField);
			return (val == pwd.getValue());
		}
		return true;
	},

	passwordText : 'Passwords do not match'
});


Ext.ux.grid.GridSummary.Calculations['suma'] = function(v, record, field){
	return v;
}


var xg = Ext.grid;

var date1 = new Ext.form.DateField({

	fieldLabel: 'С ',
	name: 'startdt',
	value: new Date(),
	id: 'startdt',
	format:'Y-m-d',
	vtype: 'daterange',
	allowBlank: false,
	endDateField: 'enddt'
});

var date2 = new Ext.form.DateField({
	fieldLabel: 'По',
	name: 'enddt',
	id: 'enddt',
	vtype: 'daterange',
	format:'Y-m-d',
	allowBlank: false,
	startDateField: 'startdt'
});

var tt = {

		xtype : 'combo',
		fieldLabel : 'Показывать только',
		typeAhead : true,
		name : 'status',
		id:'ordersValue',
		hiddenName : 'status',
		editable : false,
		triggerAction : 'all',
		store : new Ext.data.SimpleStore( {
			fields : [ 'partyValue', "Index" ],
			data : [ [ 5, 'Все' ], [ 0, 'Ожидает проверки' ], [ 1, 'Проверен' ],
					[ 2, "Отказ" ] ]
		}),
		mode : 'local',
		displayField : 'Index',
		valueField : 'partyValue',
		lazyRender : true,
		listeners : {
			"render" : function() {
				this.setValue(5);
			},
			"change" : function(field, value, oldvalue) {
				
				switch (value){
				case 0:
				 ordersbase.baseParams.st0 = "0";
				 ordersbase.baseParams.st1 = "";
				 ordersbase.baseParams.st2 = "";
				 break;
				case 1:
					 ordersbase.baseParams.st1 = "1";
					 ordersbase.baseParams.st2 = "";
					 ordersbase.baseParams.st0 = "";
						
					 break;
				case 2:
					 ordersbase.baseParams.st2 = "2";
					 ordersbase.baseParams.st0 = "";
						ordersbase.baseParams.st1 = "";
					 break;
				default:
				ordersbase.baseParams.st0 = "";
				ordersbase.baseParams.st1 = "";
				ordersbase.baseParams.st2 = "";
					 break;
				}
				
		}
		}

	};



var tbarorders = new Ext.FormPanel({
	//labelAlign: 'top',
	bodyStyle: 'border:0px',
	border: false,
	monitorValid:true,
	region:'north',
	frame:true,
	labelWidth: 15,
	height: 150,
	title: 'Заказы',
	items: [

	date1,date2,tt]
});
var OrdersRowAction = new Ext.ux.grid.RowActions({

	actions:[
	{
		iconCls:'edit'
		,qtip:'Просмотр'
	},{
		iconCls:'delete',
		qtip:'Удалить заказ'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
var prt =  new Ext.Window({
	title: 'Номер заказа ',
	layout      : 'fit',
	shim: false,
	modal: true,
	width       : 600,
	height      : 450,
	autoScroll : true,
	closeAction :'hide',
	plain       : true,
	print : function(){


	},
	buttonAlign: 'center',
	buttons: [{
		text: 'Закрыть',
		handler: function(e)
		{
			prt.hide()
			//Ext.get('printer').getBody.print();
		}
	}]
});
//alert(grid);
function PrintOrder(orderId)
{
	var store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{task: "LISTORDERITEMS",  orderId:orderId, module:'shop'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', type: 'int', mapping: 'id'},
		{name:'id_order'},
		{name: 'name', mapping: 'name'},
		
		{name:'art'},
		{name:'sk'},
		
		{name:'kol'},
		{name:'all'},
		{name:'all_sk'},
		{name:'price'},
		{name:'colors'}
		])
	});

	store.load();
	
	
	
	var grid = new xg.EditorGridPanel({
		id:'GridItemsOrders',
		store: store,
		columns: [
		
        {header:'Арт.', dataIndex:'art', width:70, sortable: false},          
		{header:'Наименование', dataIndex:'name', width:250, sortable: false},
		{header:'Цена', dataIndex:'price', width:70, sortable: false},
		{header:'Скидка', dataIndex:'sk', width:80, sortable: false},
		{header:'Кол.', dataIndex:'kol', width:50, sortable: false},
		{header:'Всего', dataIndex:'all', width:130, sortable: false}
		
		
		],
		
		frame:true,
		loadMask: true,
		width: 800,
		clicksToEdit:1,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		
		region: 'center',
		animCollapse: false,
		trackMouseOver: false,
		iconCls: 'icon-grid'
	});
	
	new Ext.Window({
		modal:true,
		layout:'fit',
		listeners:{
		"close":function(){
		//ordersbase.reload();
	}
	},
		plain:true,
		closeAction:'close',
		constrainHeader:true,
		width:750,
		height:550,
		items:[grid]
	}).show();
}


OrdersRowAction.on({
	action:function(grid, record, action, row, col) {
		//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);

		if (action == 'edit')
		{
			PrintOrder(record.data.Id);
		

		}
		if (action=="delete"){
			Ext.MessageBox.confirm('','Вы уверены что хотите удалить этот заказ?', function(btn){
				if (btn=="yes"){
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'DeleteOrder', id:record.data.Id},
						method:'post',
						success:function(o){
							var res = Ext.decode(o.responseText);
							if (res){
								if (res.success){
									return ordersbase.remove(record);
								}
							}
							Ext.MessageBox.alert('','Во время передачи данных произошла ошибка, попробуйте чуть позднее');
						},
						failure:function(){
							Ext.MessageBox.alert('','Во время передачи данных произошла ошибка, попробуйте чуть позднее');
						}
					});
				}
			});
		}
	}});
	var ordersbase =

	new Ext.data.Store({

		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{module:'shop', module:'shop',task: "ListOrdersShop", st0: '', st1:'', st2:'', datestart:'', dateend:''},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'Id', mapping: 'id'},
		{name: 'fio', mapping: 'fio'},
		{name: 'date', mapping: 'date'},
		{name: 'tel', mapping: 'tel'},
		{name: 'email', mapping: 'email'},
		{name: 'user', mapping: 'user'},
		{name: 'uid', mapping: 'uid'},
		{name: 'sk', mapping: 'sk'},
		{name: 'ob', mapping: 'ob'},
		{name: 'delivery', mapping: 'delivery'},
		{name: 'delivery_price', mapping: 'delivery_price'},
		{name: 'time', mapping: 'time'},
		{name: 'company', mapping: 'company'},
		{name: 'coment', mapping: 'coment'},
		{name: 'status', mapping: 'status'},
		{name: 'adres', mapping: 'adres'},
		{name: 'suma', mapping: 'suma', type: 'float'}
		//{name: 'Active', type: 'int', mapping: 'active'}

		])

	});


	// Start Orders Pagging Bar
	var OrdersPB = new Ext.PagingToolbar({
		pageSize: 25,
		store: ordersbase,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	// End Orders Pagging Bar
	function updateorder(oGrid_event){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			params: {
				module:'shop', module:'shop',task: "UpdateOrdersShop",module:'shop',
				id :  oGrid_event.record.data.Id,
				status: oGrid_event.record.data.status,
				adres:oGrid_event.record.data.adres,
				suma:oGrid_event.record.data.suma,
				sk:oGrid_event.record.data.sk,
				tel:oGrid_event.record.data.tel,
				time:oGrid_event.record.data.time
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					ordersbase.commitChanges();   // changes successful, get rid of the red triangles
					ordersbase.reload();          // reload our datastore.
					break;
					default:
					Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
			}
		});
	};




	var summary = new Ext.ux.grid.GridSummary();
	var ordersgrid = new xg.EditorGridPanel({
		tbar:[
		      {
		    	  xtype:'buttongroup',
		    	  items:[{xtype:'panel',baseCls:'x-plain', html:'<b>Показать с:<b>&nbsp;'},date1,{xtype:'panel', baseCls:'x-plain', html:'&nbsp;&nbsp;&nbsp;<b>по:</b>&nbsp;'}, date2,{xtype:'panel', baseCls:'x-plain', html:'&nbsp;&nbsp;|&nbsp;&nbsp; '}, tt
		    	         ,{
		    		  
		    		  text:'Показать',
		    		  iconCls:'apply',
		    		  handler:function(){
		    		  var value  =Ext.getCmp('ordersValue').getValue();
		    		  switch (value){
		  			case 0:
		  			 ordersbase.baseParams.st0 = "0";
		  			 ordersbase.baseParams.st1 = "";
		  			 ordersbase.baseParams.st2 = "";
		  			 break;
		  			case 1:
		  				 ordersbase.baseParams.st1 = "1";
		  				 ordersbase.baseParams.st2 = "";
		  				 ordersbase.baseParams.st0 = "";
		  					
		  				 break;
		  			case 2:
		  				 ordersbase.baseParams.st2 = "2";
		  				 ordersbase.baseParams.st0 = "";
		  					ordersbase.baseParams.st1 = "";
		  				 break;
		  			default:
		  			ordersbase.baseParams.st0 = "";
		  			ordersbase.baseParams.st1 = "";
		  			ordersbase.baseParams.st2 = "";
		  				 break;
		  			}
		    		  ordersbase.baseParams.datestart = Ext.getCmp('startdt').getRawValue();
		    		  ordersbase.baseParams.dateend = Ext.getCmp('enddt').getRawValue();
		    		  ordersbase.load();
		    	  }
		    	  }
		     ]
		      }
		      ],
		store: ordersbase,
		columns: [
		{id:'id', header: '#', width:30, dataIndex:'Id'},{id:'date', header:'Дата', dataIndex:'date', sortable: true},
		{
			id: 'fio',
			header: "Ф.И.О",
			width: 150,
			sortable: true,
			dataIndex: 'fio',
			summaryType: 'count',
			hideable: false,
			summaryRenderer: function(v, params, data){
				return ((v === 0 || v > 1) ? 'Всего:  (' + v +' Заказов)' : ' Всего:   (1 Заказ)');
			}
		},{id:'email', header:'Email', dataIndex:'email', sortable: true},
		{id:'tel', header:'Тел.', dataIndex:'tel', sortable: true, editor:new Ext.form.TextField()},
		{header:'Время', dataIndex:'time', sortable: true, editor:new Ext.form.TextField()},
		{header:'Адрес', dataIndex:'adres', width:250, sortable: true, editor:new Ext.form.TextArea()},
		{header:'Обхваты', dataIndex:'ob', width:100, sortable: true},
		{header:'Доставка', dataIndex:'delivery', width:100, sortable: true},
		{header:'Цена доставки', dataIndex:'delivery_price', width:100, sortable: true},
		{header:'Комментарий', dataIndex:'coment', width:250, sortable: true},
		//{id:'sk', header:"Скидка %", width:100, dataIndex:'sk', editor:new Ext.form.NumberField()},
		{
			id: 'suma',
			header: "Сумма заказа",
			width: 100,
			// renderer: Ext.util.Format.ruMoney,
			//  sortable: false,
			// groupable: false,
			dataIndex: 'suma',
			renderer: Ext.util.Format.usMoney,
			summaryType:'sum',
			editor:new Ext.form.TextField()
		},{id: 'Active', header: 'Статус', dataIndex:'status',
		width: 120,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['0','Ожидает проверки'],['1','Проверен'],['2','Отказ']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 0) {
				return "Ожидает проверки";
			}
			if (value == 1)
			{
				return "Проверен";
			}
			return "Отказ";
		}
		}, OrdersRowAction
		],
		plugins: [summary, OrdersRowAction],
		frame:true,
		loadMask: true,
		width: 800,
		clicksToEdit:1,
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		bbar: OrdersPB,
		region: 'center',
		animCollapse: false,
		trackMouseOver: false,
		iconCls: 'icon-grid'
	});
	ordersgrid.on('afteredit', updateorder);



	var val =  new Ext.form.ComboBox({
		store:new Ext.data.SimpleStore({
			fields:['value', 'partyName'],
			data: [['0','Руб'],['1','Доллары'],['2','Евро']]
		}),
		mode: 'local',
		//typeAhead: true,
		//selectByValue: true,

		autoWidth: true,
		fieldLabel: 'Отображать валюту',
		displayField: 'partyName',
		dataIndex: 'valute',
		valueField: 'value',
		name: 'valute',

		triggerAction: 'all',
		//listClass: 'x-combo-list-small',
		validationEvent: false

	});

	var formval = new Ext.FormPanel({
		layout:'form',
		items: [val,{
			xtype: 'hidden',
			name:'valute_id'
		},{
			xtype: 'textfield',
			vtype: 'email',
			fieldLabel: 'Уведомлять о заказе на email:',
			name: 'order_email',
			//id: 'order_email',
			dataIndex: 'order_email'
		}],
		buttons: [{
			text:'Сохранить',
			handler: function()
			{
				if(formval.getForm().isValid()){
					formval.getForm().submit({
						url: 'admincp.php',
						method:'POST',
						params: {module:'shop',task:'SaveShopConfig',module:'shop'},
						waitTitle:'Обновление настроек',
						waitMsg: 'Подождите пожалуйста...',
						success: function()
						{
						}
						,
						failure: function()
						{
							Ext.MessageBox.alert('', 'неизвестная ошибка');
						}
					});
				}

			}}]
	});

	val.on('select', function(e){ formval.getForm().findField('valute_id').setValue(e.value); });
	formval.on('afterlayout', function(){
		formval.form.load({
			url:'admincp.php',
			params:{module:'shop', module:'shop',task: 'LoadShopConfig',module:'shop'},
			method: 'POST'

		});
	});


var shop = {};

shop.suite=function(id){
	var idItemShop = id;
	var loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', 
		baseParams:{xaction:'Load_Tree_Shop', module:'shop'},
		preloadChildren: true});
	
	var tree = new Ext.tree.TreePanel({
		autoScroll:true,
		animate:true,
		enableDD:false,
		//title: 'Категории',
		aling: 'top',
		width: 230,
		floatable: false,
		margins: '5 0 0 0',
		cmargins: '5 5 0 0',
		split: true,
		frame:false,
		stripeRows: true,
		expanded: true,
		borders:false,
		region:'west',
		containerScroll: true,
		lines: false,
		singleExpand: true,
		useArrows: true,
		loader: loader_tree ,
		root:new Ext.tree.AsyncTreeNode({
			text: 'Корень',
			expanded:true,
			draggable:false,
			id:'0'
		})
	});
	tree.on('click', function(n){
		//Ext.getCmp('shopgrid').setTitle('Товары в '+n.text);
		base.baseParams= {id:n.id, module:'shop', module:'shop',task: "ListingShopItems", orderby:true};
		base.load({params:{start:0, limit:25}});
	});

	var base = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{module:'shop', module:'shop',task: "ListingShopItems", id:0},
		autoLoad:false,
		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'Id', mapping: 'id'},
		{name: 'title', mapping: 'name'},
		{name: 'shortdesc', mapping: 'shortdesc'},
		{name: 'art', mapping: 'art'},
		{name: 'fulldesc', mapping: 'fulldesc'},
		{name: 'kol', mapping: 'kol'},
		{name: 'valute', mapping: 'valute'},
		{name: 'ed', mapping: 'ed'},
		{name: 'ot150', mapping: 'ot150'},
		{name: 'ot100', mapping: 'ot100'},
		{name: 'ot50', mapping: 'ot50'},
		{name: 'mark', mapping: 'mark'},
		{name: 'post', mapping: 'post'},
		{name: 'onindex', mapping: 'onindex'},
		{name: 'onlider', mapping: 'onlider'},
		{name: 'link', mapping: 'link'},
		{name: 'onsells', mapping: 'onsells'},
		{name: 'onecs', mapping: 'onecs'},
		{name: 'price_rozn', mapping: 'price_rozn'},
		{name: 'price_opt', mapping: 'price_opt'},
		{name: 'title_page', mapping: 'title_page'},
		{name: 'desc', mapping: 'desc'},
{name: 'koll', mapping: 'koll'},
		{name: 'keys', mapping: 'keys'}

		])

	});
	
	 var RowAction = new Ext.ux.grid.RowActions({

			actions:[{
				iconCls: 'apply'
				,qtip:'Добавить'
				}]
			,header:"<center><b>Операции</b></center>"
			,widthIntercept:70
			,id:'actions'
		});
	RowAction.on({
			action:function(grid, record, action, row, col) {
			   if (action=='apply'){
				   if (record.data.Id!=idItemShop){
				   Ext.Ajax.request({
					   url:'admincp.php',
					   method:'post',
					   params:{module:'shop', task:'AddAttach', iditem:id, idattach:record.data.Id},
					   success:function(o){
						   var res = Ext.decode(o.responseText);
						   if (res.success){
							   base2.add(record);
						   }
						   else{
							   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
						   }
					   },
					   failure:function(){
						   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
					   }
				   });
				   }
				   
			   }
		}});
	
	var pagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: base,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	var sm2 = new Ext.grid.CheckboxSelectionModel();
	var grid = new Ext.grid.EditorGridPanel({
		store: base,
		//title: 'Товары',
		loadMask: true,
		frame:true,
		stripeRows: true,
		id:'price.attachGrid',
		layout: 'fit',
		listeners:{
			"afterrender":function(){
			   base.load({params:{start:0, limit:25}});
		    }
		},
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		sm2,
		{id: 'id', header: "<center><b>#</b></center>", width: 40, sortable: true, dataIndex: 'Id'},
		{id: 'art', header: "<center><b>Арт.</b></center>", width: 80, sortable: true, dataIndex: 'art'},
		{id:'title', header: "<center><b>Наименование</b></center>", width: 500, sortable: true, dataIndex: 'title'},
		RowAction
		],

		sm: sm2,
		viewConfig: {
			forceFit: false
		},
		height:150,
		bbar: pagingBar,
		plugins:RowAction,
		iconCls:'icon-grid',
		split: true,
		tbar:[{
			text: 'Добавить выбранные',
			disabled:true,
			iconCls:'apply',
			id:'price.AttachShopButtonMass',
			handler: function()
			{
			var records = grid.getSelectionModel().getSelections();
			var results = {};
			if (records.length==0){
				return Ext.MessageBox.alert('', 'Вы не выбрали товар');
			}
			for(var i=0; i<records.length; i++){
				var r = records[i];
				var id2 = r.get('Id');
				
				if (idItemShop!=id2){
				    results[id2] = "";
				}
			}
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					module:'shop',task: "AddMassAttache",
					ids: Ext.encode(results), iditem:id
				},
				success:function(o){
					   var res = Ext.decode(o.responseText);
					   if (res.success){
						   for(var i=0; i<records.length; i++){
								var r = records[i];
								var id2 = r.get('Id');
								
								if (idItemShop!=id2){
								 base2.add(r);
								}
							}
						  
					   }
					   else{
						   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
					   }
				   },
				   failure:function(){
					   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
				   }
				
			});

			}
		}],
		region: 'center'

		// renderTo: document.body

	});
	grid.on('cellclick', function(){
		Ext.getCmp('price.AttachShopButtonMass').enable(true);
		//Ext.getCmp('massdeleteitems').enable(true);
	});
	
	base.on('load', function(){
		Ext.getCmp('price.AttachShopButtonMass').disable(true);
		//Ext.getCmp('massdeleteitems').disable(true);
	});
	
	
	var base2 = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{module:'shop',task: "ListingAttachItems", iditem:id},
		autoLoad:false,
		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'title', mapping: 'name'},
		{name: 'idAttach', mapping: 'idAttach'},
		{name: 'art', mapping: 'art'},


		])

	});
	
	 var RowAction2 = new Ext.ux.grid.RowActions({

			actions:[{
				iconCls: 'delete'
				,qtip:'Удалить'
				}]
			,header:"<center><b>Операции</b></center>"
			,widthIntercept:70
			,id:'actions'
		});
	  RowAction2.on({
			action:function(grid, record, action, row, col) {
			 if (action=="delete"){
				 Ext.Ajax.request({
					 url:'admincp.php',
					 method:'post',
					 params:{module:'shop', task:'deleteAttach', id:record.data.idAttach},
					 success:function(o){
						   var res = Ext.decode(o.responseText);
						   if (res.success){
							 base2.remove(record); 
						   }
						   else{
							   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
						   }
					   },
					   failure:function(){
						   Ext.MessageBox.alert('', 'Во время отправки данных произошла ошибка');
					   }
				 });
			 }
		}});
	var pagingBar2 = new Ext.PagingToolbar({
		pageSize: 25,
		store: base2,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	var grid2 = new Ext.grid.EditorGridPanel({
		store: base2,
		title: 'Привязанные товары',
		loadMask: true,
		frame:true,
		stripeRows: true,
		listeners:{
			"afterrender":function(){
			   base2.load({params:{start:0, limit:25}});
		    }
		},
		id:'price.attachGrid2',
		layout: 'fit',
		border:false,
		
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{id: 'art', header: "<center><b>Артикул</b></center>", width: 80, sortable: true, dataIndex: 'art'},
		{id:'title', header: "<center><b>Наименование</b></center>", width: 500, sortable: true, dataIndex: 'title'},
		RowAction2
		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: false
		},
		height:250,
		bbar: pagingBar2,
		plugins:RowAction2,
		iconCls:'icon-grid',
		split: true,
		region: 'south'
	});
	
	new Ext.Window({
		width:1024,
		height:750,
		layout:'border',
		//frame:false,
		closeAction:'close',
		border:false,
		items:[tree, grid, grid2],
		modal:true,
		constrainHeader:true
	}).show();
	
	
}

// Комментарии

function openComments(ItemID){

shop.comments = {};

shop.comments.updateRecord = function(oGrid_event){
    Ext.Ajax.request({
        waitMsg: 'Пожалуйста подождите...',
        url: 'admincp.php',
        params: {
            xaction: "Update",
            id: oGrid_event.record.data.id,
            active: oGrid_event.record.data.active,
            module: 'shop_comments',
            pos: oGrid_event.record.data.pos
        },
        success: function(response){
            var result = eval(response.responseText);
            switch (result) {
                case 33:
                    shop.comments.base.commitChanges(); // changes successful, get rid of the red triangles
                    shop.comments.base.reload(); // reload our datastore.
                    break;
                default:
                    Ext.MessageBox.alert('Ошибка', 'Не возможно сохранить изменения...');
                    break;
            }
        },
        failure: function(response){
            var result = response.responseText;
            Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
        }
    });
};



shop.comments.addedit = function(id){


    function UploadPhoto(){
        var fotoupload2 = new Ext.FormPanel({
        
            fileUpload: true,
            width: '100%',
            frame: true,
            //border:false,
            
            shim: true,
            bodyStyle: 'padding: 10px 10px 0 10px;',
            labelWidth: 50,
            items: [{
                xtype: 'fileuploadfield',
                emptyText: 'Выберите файл для загрузки',
                fieldLabel: 'Файл',
                name: 'photo-path',
                width: '500',
                anchor: '95%',
                allowBlank: false,
                buttonCfg: {
                    text: ' ',
                    iconCls: 'upload-icon'
                }
            }],
            buttonAlign: 'center',
            buttons: [{
                text: 'Загрузить',
                handler: function(){
                    if (fotoupload2.getForm().isValid()) {
                        var idd = Ext.getCmp('shop.comments.form').getForm().findField('id').getValue();
                        
                        fotoupload2.getForm().submit({
                            url: 'admincp.php',
                            method: 'POST',
                            params: {
                                id: idd,
                                module: 'shop_comments',
                                task: 'UploadPhoto'
                            },
                            waitTitle: 'Загрузка фотографии',
                            waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
                            success: function(fotoupload, o){
                                //msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                //Ext.getCmp('shop.comments.form.tabimages.grid').store.reload();
                                Ext.getCmp('shop.comments.UploadWindow').close();
                                
                            },
                            failure: function(fotoupload2, o){
                                Ext.MessageBox.alert('Ошибка', 'Не удалось загрузить фотографию');
                            }
                        });
                    }
                }
            }]
        });
        var shopupfileswin2 = new Ext.Window({
            //applyTo     : 'hello-win',
            layout: 'fit',
            shim: false,
            modal: true,
            title: 'Загрузка фотографий',
            id: 'shop.comments.UploadWindow',
            width: 400,
            height: 200,
            autoScroll: true,
            closeAction: 'close',
            plain: true,
            listeners: {
                'close': function(){
                    Ext.getCmp('shop.comments.form.tabimages.grid').store.reload();
                }
            },
            items: [fotoupload2],
            buttons: [{
                text: 'Закрыть',
                handler: function(){
                    Ext.getCmp('shop.comments.form.tabimages.grid').store.reload();
                    Ext.getCmp('shop.comments.UploadWindow').close();
                }
            }]
        }).show();
    }
    
    var base = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'admincp.php',
            method: 'POST'
        }),
        baseParams: {
            xaction: "Listing_Images",
            module: 'shop_comments'
        },
        
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [{
            name: 'id',
            mapping: 'id'
        }, {
            name: 'image',
            mapping: 'image'
        }, {
            name: 'file',
            mapping: 'file'
        }, {
            name: 'osn',
            mapping: 'osn'
        }, {
            name: 'pos',
            mapping: 'pos'
        }])
    
    });
    // End Base for ArticleGrid
    
    // PagingBar for articlegrid
    var pagingBar = new Ext.PagingToolbar({
        pageSize: 25,
        store: base,
        paramNames: {
            start: 'start',
            limit: 'limit'
        },
        displayInfo: true
    
    
    });
    // End
    // ArtclisRowAction
    
    var RowAction = new Ext.ux.grid.RowActions({
    
        actions: [ {
            iconCls: 'delete',
            qtip: 'Удалить'
        }],
        widthIntercept: Ext.isSafari ? 4 : 2,
        id: 'actions'
    });
    RowAction.on({
        action: function(grid, record, action, row, col){
            if (action == 'delete') {
                Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту фотографию', function(btn){
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            url: 'admincp.php',
                            params: {
                                module: 'shop_comments',
                                task: 'deleteImage',
                                id: record.data.id
                            },
                            method: 'post',
                            success: function(){
                                base.reload();
                            }
                        });
                    }
                })
            }
            if (action == "apply") {
                Ext.Ajax.request({
                    url: 'admincp.php',
                    params: {
                        module: 'shop_comments',
                        task: 'setOsnImage',
                        id: record.data.id
                    },
                    method: 'post',
                    success: function(){
                        base.reload();
                    }
                });
            }
        }
    });
    
    var grid = new Ext.grid.EditorGridPanel({
        store: base,
        
        
        id: 'shop.comments.form.tabimages.grid',
        enableColLock: false,
        clicksToEdit: 1,
        height: '80%',
        frame: true,
        loadMask: true,
        autoWidth: true,
        listeners: {
            "afteredit": function(oGrid_event){
                Ext.Ajax.request({
                    waitMsg: 'Пожалуйста подождите...',
                    url: 'admincp.php',
                    params: {
                        xaction: "UpdateImagePos",
                        id: oGrid_event.record.data.id,
                        module: 'shop_comments',
                        pos: oGrid_event.record.data.pos
                    },
                    success: function(response){
                        var result = eval(response.responseText);
                        switch (result) {
                            case 33:
                                Ext.getCmp('shop.comments.form.tabimages.grid').store.commitChanges();
                                
                                break;
                            default:
                                Ext.MessageBox.alert('Ошибка', 'Не возможно сохранить изменения...');
                                break;
                        }
                    },
                    failure: function(response){
                        var result = response.responseText;
                        Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
                    }
                });
            }
        },
        columns: [{
            id: 'image',
            header: "",
            width: 200,
            sortable: true,
            dataIndex: 'image',
            renderer: function(value){
                return "<center><img src='files/shop_comments/" + value + "' width='80'></center>";
            }
        }, {
            id: 'file',
            header: "Файл",
            width: 150,
            sortable: true,
            dataIndex: 'file'
        }, RowAction],
        
        sm: new Ext.grid.RowSelectionModel({
            singleSelect: true
        }),
        viewConfig: {
            forceFit: false
        },
        height: 150,
        bbar: pagingBar,
        plugins: RowAction,
        iconCls: 'icon-grid',
        split: true,
        tbar: [{
            text: 'Загрузить новую фотографию',
            handler: function(){
                UploadPhoto();
                
            },
            iconCls: 'add'
        }]
    
    
    });
    
    
    var form = new Ext.FormPanel({
        id: 'shop.comments.form',
        width: 890,
        
        frame: true,
        labelAlign: 'top',
        items: [{
            xtype: 'tabpanel',
            activeItem: 0,
            defaults: {
                frame: true,
                width: 800,
                height: 550,
                bodyStyle: 'padding:10px;'
            },
            items: [{
            	xtype:'textfield',
            	name:'name',
            	fieldLabel:'Имя',
            	anchor:'95%'
            },{
                title: 'Описание',
                layout: 'form',
                autoScroll: true,
                iconCls: 'viewlist',
                items: [htmled({
                    name: 'desc',
                    label: 'Текст комментария',
                    height: 350
                }), {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }, {
                id: 'shop.comments.form.tabimages',
                disabled: true,
                height: 460,
                layout: 'fit',
                title: 'Фотографии',
                bodyStyle: 'padding:0px;',
                iconCls: 'imagesIcon',
                items: [grid],
                listeners: {
                    activate: function(){
                        base.load({
                            params: {
                                start: 0,
                                limit: 25
                            }
                        });
                    }
                }
            }]
        }]
    });
    new Ext.Window({
        width: 900,
        height: 640,
        frame: true,
        constrainHeader: true,
        closeAction: 'close',
        modal: true,
        id: 'shop.comments.WindowAddEdit',
        items: [form],
        listeners: {
            "show": function(){
                if (id == 0) {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        waitMsg: 'Подождите пожалуйста',
						method:'POST',
                        params: {
                            module: 'shop_comments',
                            task: 'NewItem'
                        },
                        success: function(response){
                            Ext.getCmp('shop.comments.form.tabimages').enable(true);
                            var o = eval(response.responseText);
                            Ext.getCmp('shop.comments.form').getForm().findField('id').setValue(o);
                            base.baseParams = {
                                xaction: "Listing_Images",
                                module: 'shop_comments',
                                dd: o
                            };
                        }
                    });
                }
                else {
                    base.baseParams = {
                        xaction: "Listing_Images",
                        module: 'shop_comments',
                        dd: id
                    };
                    Ext.getCmp('shop.comments.form.tabimages').enable(true);
                }
            }
        },
        buttonAlign: 'right',
        buttons: [{
            text: 'Сохранить',
            iconCls: 'accept',
            handler: function(){
                Ext.ux.TinyMCE.initTinyMCE();
                tinyMCE.triggerSave();
                form.getForm().submit({
                    url: 'admincp.php',
					method:'POST',
                    params: {
                        module: 'shop_comments',
                        task: 'save'
                    },
                    waitMsg: 'Пожалуйста подождите',
                    success: function(){
                        Ext.getCmp('shop.comments.WindowAddEdit').close();
                        shop.comments.base.reload();
                        
                    }
                });
            }
        }]
    }).show();
}


shop.comments.base = new Ext.data.Store({

    proxy: new Ext.data.HttpProxy({
        url: 'admincp.php',
        method: 'POST'
    }),
    baseParams: {
        xaction: "Listing",
        module: 'shop_comments',
        id:ItemID
    },
    
    reader: new Ext.data.JsonReader({
        root: 'results',
        totalProperty: 'total',
        id: 'id'
    }, [{
        name: 'id',
        mapping: 'id'
    }, {
        name: 'pos',
        mapping: 'pos'
    }, {
        name: 'userName',
        mapping: 'userName'
    }, {
        name: 'name',
        mapping: 'name'
    }, {
        name: 'desc',
        mapping: 'desc'
    },{
    	name:'date',
    	mapping:'date'
    }, {
        name: 'active',
        type: 'int',
        mapping: 'active'
    }])

});





// PagingBar for articlegrid
shop.comments.pagingBar = new Ext.PagingToolbar({
    pageSize: 25,
    store: shop.comments.base,
    paramNames: {
        start: 'start',
        limit: 'limit'
    },
    displayInfo: true


});
// End
// ArtclisRowAction

shop.comments.RowAction = new Ext.ux.grid.RowActions({

    actions: [{
        iconCls: 'delete',
        qtip: 'Удалить'
    }, {
        iconCls: 'edit',
        qtip: 'Редактировать'
    }],
    widthIntercept: Ext.isSafari ? 4 : 2,
    id: 'actions'
});
shop.comments.RowAction.on({
    action: function(grid, record, action, row, col){
        if (action == 'delete') {
            Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
                if (btn == "yes") {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        params: {
                            module: 'shop_comments',
                            task: 'deleteItem',
                            id: record.data.id
                        },
                        method: 'post',
                        success: function(){
                            shop.comments.base.reload();
                        }
                    });
                }
            })
        }
        if (action == 'edit') {
        
            shop.comments.addedit(record.data.id);
            Ext.getCmp('shop.comments.form').getForm().loadRecord(record)
            
        }
    }
});
shop.comments.grid = new Ext.grid.EditorGridPanel({
    store: shop.comments.base,
    title: '',
    frame: true,
    loadMask: true,
    id: 'shop.comments.grid',
    layout: 'fit',
    enableColLock: false,
    clicksToEdit: 1,
    autoWidth: true,
    columns: [{
        id: 'id',
        header: "#",
        width: 15,
        sortable: false,
        dataIndex: 'id'
    }, {
       
        header: "Пользователь",
        width: 100,
        sortable: false,
        dataIndex: 'userName'
    }, {
      
        header: "Дата",
        width: 100,
        sortable: false,
        dataIndex: 'date'
    }, {
        id: 'Active',
        header: '',
		sortable:false,
        dataIndex: 'active',
        width: 50,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            store: new Ext.data.SimpleStore({
                fields: ['partyValue', 'partyName'],
                data: [['1', 'Активная'], ['0', 'Не активная']]
            }),
            mode: 'local',
            displayField: 'partyName',
            valueField: 'partyValue',
            lazyRender: true,
            listClass: 'x-combo-list-small'
        }),
        renderer: function(value){
            if (value == 1) {
                return "Активная";
            }
            return "Не активная";
        }
        
    }, shop.comments.RowAction],
    
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: true
    }),
    viewConfig: {
        forceFit: true
    },
    height: 150,
    bbar: shop.comments.pagingBar,
    plugins: shop.comments.RowAction,
    iconCls: 'icon-grid',
    split: true,
   
    region: 'center'

});

shop.comments.grid.on('afteredit', shop.comments.updateRecord);

new Ext.Window({
    //applyTo     : 'hello-win',
    layout: 'fit',
    shim: false,
    modal: true,
    title: 'Комментарии',
    id: 'shop.comments.UploadWindow',
    width: 900,
    height: 550,
    autoScroll: false,
    closeAction: 'close',
    plain: true,
    listeners: {
        'show': function(){
        	shop.comments.base.load();
        }
    },
    items: [shop.comments.grid]
}).show();


}






shop.colors = {};

// Цвета
shop.colors.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "colors_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			pos: oGrid_event.record.data.pos,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.colors.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.colors.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.colors.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:250,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.colors.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.colors.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.colors.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'colors_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.colors.WindowAddEdit').close();
					shop.colors.store.reload();

				}
			});
		}}]
	}).show();
};


shop.colors.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "colors_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'pos', mapping: 'pos'},
	{name: 'active', type: 'int', mapping: 'active'}
	,{name:'null'}
	])

});

// PagingBar for articlegrid
shop.colors.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.colors.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction

shop.colors.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
shop.colors.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'colors_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.colors.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.colors.addedit(record.data.id);
			Ext.getCmp('shop.colors.form').getForm().loadRecord(record);
			
		}
	}
});
shop.colors.grid = new Ext.grid.EditorGridPanel({
	store: shop.colors.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.colors.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{header: "Поз.", width: 50, sortable: true, dataIndex: 'pos', editable:true, editor:new Ext.form.NumberField()},
	{header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	shop.colors.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.colors.pagingBar,
	plugins:shop.colors.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.colors.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.colors.grid.on('afteredit', shop.colors.updateRecord);



shop.fullness = {};

//Цвета
shop.fullness.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "fullness_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.fullness.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.fullness.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.fullness.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:250,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.fullness.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.fullness.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.fullness.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'fullness_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.fullness.WindowAddEdit').close();
					shop.fullness.store.reload();

				}
			});
		}}]
	}).show();
};


shop.fullness.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "fullness_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'active', type: 'int', mapping: 'active'}
	,{name:'null'}
	])

});

//PagingBar for articlegrid
shop.fullness.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.fullness.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
//End
//ArtclisRowAction

shop.fullness.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
shop.fullness.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'fullness_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.fullness.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.fullness.addedit(record.data.id);
			Ext.getCmp('shop.fullness.form').getForm().loadRecord(record);
			
		}
	}
});
shop.fullness.grid = new Ext.grid.EditorGridPanel({
	store: shop.fullness.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.fullness.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	shop.fullness.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.fullness.pagingBar,
	plugins:shop.fullness.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.fullness.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.fullness.grid.on('afteredit', shop.fullness.updateRecord);


shop.style = {};

//Цвета
shop.style.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "style_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.style.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.style.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.style.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:250,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.style.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.style.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.style.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'style_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.style.WindowAddEdit').close();
					shop.style.store.reload();

				}
			});
		}}]
	}).show();
};


shop.style.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "style_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'active', type: 'int', mapping: 'active'}
	,{name:'null'}
	])

});

//PagingBar for articlegrid
shop.style.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.style.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
//End
//ArtclisRowAction

shop.style.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
shop.style.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'style_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.style.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.style.addedit(record.data.id);
			Ext.getCmp('shop.style.form').getForm().loadRecord(record);
			
		}
	}
});
shop.style.grid = new Ext.grid.EditorGridPanel({
	store: shop.style.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.style.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	shop.style.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.style.pagingBar,
	plugins:shop.style.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.style.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.style.grid.on('afteredit', shop.style.updateRecord);



// Размеры 
shop.sizes = {};
shop.sizes.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "sizes_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.sizes.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.sizes.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.sizes.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:250,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.sizes.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.sizes.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.sizes.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'sizes_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.sizes.WindowAddEdit').close();
					shop.sizes.store.reload();

				}
			});
		}}]
	}).show();
};


shop.sizes.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "sizes_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
		
	}, [
	{name: 'id'},
	{name: 'name'},
	{name: 'active'},
	{name:'null'}

	])

});

// PagingBar for articlegrid
shop.sizes.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.sizes.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
// End
// ArtclisRowAction

shop.sizes.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
});
shop.sizes.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'sizes_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.sizes.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.sizes.addedit(record.data.id);
			Ext.getCmp('shop.sizes.form').getForm().loadRecord(record);
			
		}
	}
});
shop.sizes.grid = new Ext.grid.EditorGridPanel({
	store: shop.sizes.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.sizes.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{id:'sizes_id', header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{id:'sizes_name', header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},shop.sizes.RowAction
	



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.sizes.pagingBar,
	plugins:shop.sizes.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.sizes.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.sizes.grid.on('afteredit', shop.sizes.updateRecord);




// Брэнды
shop.brands = {};
shop.brands.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "brands_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.brands.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.brands.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.brands.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:250,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.brands.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.brands.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.brands.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'brands_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.brands.WindowAddEdit').close();
					shop.brands.store.reload();

				}
			});
		}}]
	}).show();
};


shop.brands.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "brands_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'active', type: 'int', mapping: 'active'}
	,{name:'null'}

	])

});

//PagingBar for articlegrid
shop.brands.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.brands.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
//End
//ArtclisRowAction

shop.brands.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
shop.brands.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'brands_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.brands.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.brands.addedit(record.data.id);
			Ext.getCmp('shop.brands.form').getForm().loadRecord(record);
			
		}
	}
});
shop.brands.grid = new Ext.grid.EditorGridPanel({
	store: shop.brands.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.brands.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	shop.brands.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.brands.pagingBar,
	plugins:shop.brands.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.brands.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.brands.grid.on('afteredit', shop.brands.updateRecord);




shop.delivery = {};
shop.delivery.updateRecord=  function (oGrid_event){
	
	Ext.Ajax.request({
		waitMsg: 'Пожалуйста подождите...',
		url: 'admincp.php',
		params: {
			xaction: "delivery_Update",
			id :  oGrid_event.record.data.id,
			active: oGrid_event.record.data.active,
			module:'shop'
		},
		success: function(response){
			var result=eval(response.responseText);
			switch(result){
				case 33:
				shop.delivery.store.commitChanges();   // changes successful, get rid of the red triangles
				break;
				default:
				Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
				break;
			}
		},
		failure: function(response){
			var result=response.responseText;
			Ext.MessageBox.alert('error','could not connect to the database. retry later');
		}
	});
};


shop.delivery.addedit = function (id){
	var form = new Ext.FormPanel({
		id:'shop.delivery.form',
		width:890,
		fileUpload:true,
		frame:true,
		layout:'fit',
		labelAlign:'top',
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			defaults:{frame:true, width:800, height:550, bodyStyle:'padding:10px;'},
			items:[{
				title:'Описание',
				layout:'form',
				autoScroll:true,
				iconCls:'viewlist',
				items:[{
					layout:'table',
					layoutConfig:{columns:2,
					tableAttrs: {
	                style: {
	                    width: 700
	                }
	            }
					},
					defaults:{width:250},
					items:[{xtype:'hidden', name:'id'},{
						layout:'form',
						width:850,
						//colspan:2,
						items:[{
							
							xtype:'textfield',
							fieldLabel:'Наименование',
							name:'name',
							anchor:'99%'
						},{
							
							xtype:'textfield',
							fieldLabel:'Цена',
							name:'price',
							anchor:'99%'
						},{
							
							xtype:'textfield',
							fieldLabel:'Бесплатно если сумма заказа',
							name:'price2',
							anchor:'99%'
						}]
					}]
				}]
			}]
		}]
	});
	new Ext.Window({
		width:450,
		height:340,
		frame:true,
		constrainHeader:true,
		closeAction:'close',
		modal:true,
		layout:'fit',
		id:'shop.delivery.WindowAddEdit',
		items:[form],
		listeners:{
		"show":function(){
			if (id==0)
			{
				Ext.getCmp('shop.delivery.form').getForm().findField('id').setValue(0);
			}
			else
			{
				Ext.getCmp('shop.delivery.form').getForm().findField('id').setValue(id);
				
			}
		}
		},
		buttonAlign:'right',
		buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
			Ext.ux.TinyMCE.initTinyMCE();
			tinyMCE.triggerSave();
			form.getForm().submit({
				url:'admincp.php',
				params:{module:'shop', task:'delivery_save'},
				waitMsg:'Пожалуйста подождите',
				success:function(){
					Ext.getCmp('shop.delivery.WindowAddEdit').close();
					shop.delivery.store.reload();

				}
			});
		}}]
	}).show();
};


shop.delivery.store = new Ext.data.Store({

	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "delivery_Listing", module:'shop'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'name', mapping: 'name'},
	{name: 'price', mapping: 'price'},
	{name: 'price2', mapping: 'price2'},
	{name: 'active', type: 'int', mapping: 'active'}
	,{name:'null'}

	])

});

//PagingBar for articlegrid
shop.delivery.pagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: shop.delivery.store,
	paramNames: {start: 'start', limit: 'limit'},
	displayInfo: true


});
//End
//ArtclisRowAction

shop.delivery.RowAction = new Ext.ux.grid.RowActions({

	actions:[{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'
	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,id:'actions'
});
shop.delivery.RowAction.on({
	action:function(grid, record, action, row, col) {
		if (action == 'delete')
		{
			Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
				if (btn == "yes")
				{
					Ext.Ajax.request({
						url:'admincp.php',
						params:{module:'shop', task:'delivery_deleteItem', id:record.data.id},
						method:'post',
						success:function(){
							shop.delivery.store.reload();
						}
					});
				}
			});
		}
		if (action == 'edit')
		{
			
		
			shop.delivery.addedit(record.data.id);
			Ext.getCmp('shop.delivery.form').getForm().loadRecord(record);
			
		}
	}
});
shop.delivery.grid = new Ext.grid.EditorGridPanel({
	store: shop.delivery.store,
	title: '',
	frame:true,
	 loadMask:true,
	id:'shop.delivery.grid',
	layout: 'fit',
	enableColLock:false,
	clicksToEdit:1,
	autoWidth:true,
	columns: [
	{header: "#", width: 15, sortable: true, dataIndex: 'id'},
	{header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
	{header: "Цена", width: 100, sortable: true, dataIndex: 'price'},
	{header: '', dataIndex:'active',
		width: 50,
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [['1','Активная'],['0','Не активная']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			editable:false,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == 1) {
				return "Активная";
			}
			return "Не активная";
		}

		},
	shop.delivery.RowAction



	],

	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: true
	},
	height:150,
	bbar: shop.delivery.pagingBar,
	plugins:shop.delivery.RowAction,
	iconCls:'icon-grid',
	split: true,
	tbar:[
	{
		text: 'Добавить новую запись',
		handler:function(){
		
		shop.delivery.addedit(0);
		
		
		},
		iconCls: 'add'}],
		region: 'center'

});

shop.delivery.grid.on('afteredit', shop.delivery.updateRecord);







	// Магазин

	var shopaddform;
	var HiddenField;
	var cat_name;
	Ext.form.Checkbox.override({
		setValue : function(v) {
			var checked = this.checked;
			this.checked = (v === true || v === 'true' || v == '1' || String(v).toLowerCase() == 'on');

			if(this.rendered){
				this.el.dom.checked = this.checked;
				this.el.dom.defaultChecked = this.checked;
				this.wrap[this.checked? 'addClass' : 'removeClass'](this.checkedCls);
			}

			if(checked != this.checked){
				this.fireEvent("check", this, this.checked);
				if(this.handler){
					this.handler.call(this.scope || this, this, this.checked);
				}
			}
		},

		afterRender : function(){
			Ext.form.Checkbox.superclass.afterRender.call(this);
			this.wrap[this.checked? 'addClass' : 'removeClass'](this.checkedCls);
		}
	});
	function confirmDeleteCat(id){
		Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту категорию', deleteCatShop);
	};
	function deleteCatShop(btn){
		if(btn=='yes'){
			var select = shopCatTree.selModel.selNode;

			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите',
				url: 'admincp.php',
				params: {
					module:'shop', module:'shop',task: "DeleteCatShop",
					id:  select.id
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 55:  // Success : simply reload
						shopCatTree.getLoader().load(shopCatTree.root);
						shopCatTree.root.expand();
						break;
					}
				},
				failure: function(response){
					var result=response.responseText;
					Ext.MessageBox.alert('error','could not connect to the database. retry later');
				}
			});
		}
	};

	// function UpdateCat on nodeDrop
	function updateCatShop(id, parent, name){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			params: {
				module:'shop', module:'shop',task: "UpdateCatShop",
				Id :  id,
				parent: parent,
				name: name

			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					//shopCatTree.getLoader().load(shopCatTree.root);
					//ds.commitChanges();   // changes successful, get rid of the red triangles
					//ds.reload();          // reload our datastore.
					break;
					default:
					Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later '+id+' '+parentId);
			}
		});
	};
	// End;

	// Закачка файлов

	//var panel = new Ext.Panel();
	//var fotoupload = new Ext.FormPanel();


	// Function Add Cat on Tree
	function addCatShop(name, parentId){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			method: 'POST',
			params: {
				module:'shop', module:'shop',task: "AddShopCat",
				name: name,
				parentId: parentId
			},
			success: function(response){
				var result=eval(response.responseText);
				switch(result){
					case 33:
					shopCatTree.getLoader().load(shopCatTree.root);
					shopCatTree.root.expand();
					//ds.commitChanges();   // changes successful, get rid of the red triangles
					//ds.reload();          // reload our datastore.
					break;
					default:
					Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
					break;
				}
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later '+id+' '+parentId);
			}
		});
	};
	// END:

	var TextFieldShopAdd = htmled({width:'100%', name:'newtext', label:'Краткое описание товара'});
	var AddShopFull= htmled({width:'100%', name:'newfull', label:'Полное описание товара'});

	// shopaddform
	var DoShop1 = function(id)
	{

		return new Ext.ux.Plugin.RemoteComponent({
			url : "admincp.php",
			loadOn: 'show',
			breakOn: 'show',
			method: 'post',
			params: {module:'shop', module:'shop',task: 'ShowDopsItemShop', id: id}
		});
	}
	var shopaddform = function (id){
		var comboMark = new Ext.form.ComboBox( {
			store : MarksStore,
			displayField : 'name',
			valueField : 'id',
			mode : 'local',
			triggerAction : 'all',
			editable : false,
			
			hiddenName : 'mark',
			allowBlank : true,
			name : 'mark',
			width:300,
			fieldLabel : 'Брэнд',
			selectOnFocus : true
		});

		var xd = Ext.data;
		var lookup = {};

		var store = new Ext.data.JsonStore({
			url: 'admincp.php',
			method:'post',
			params: {module:'shop',task: 'GetListPhotosItemShop'},
			root: 'images',
			fields: ['name', 'osn', 'url', 'idim' ,{name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
		});
		// store.load();

		var tpl = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap" id="{name}">',
		'<div class="thumb"><img src="{url}" title="{name}"></div>',
		'<span>{osn}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
		);
		var ima = new Ext.DataView({
			store: store,
			tpl: tpl,
			id:'Ima',
			singleSelect: true,
			autoHeight:true,
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'Нет фотографий',
			prepareData: function(data){
				data.shortName = Ext.util.Format.ellipsis(data.name, 15);
				return data;
			}
		});
		var fotoupload = new Ext.FormPanel({

			fileUpload: true,
			width: '100%',
			frame: true,
			//border:false,
			title: 'Загрузка фотографий',
			shim: true,
			bodyStyle: 'padding: 10px 10px 0 10px;',
			labelWidth: 100,
			items: [{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Фотография (155x205)',
				name: 'min',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			},{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Фотография (800x800)',
				name: 'big',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			}],
			buttonAlign:'center',
			buttons: [{
				text: 'Загрузить',
				handler: function(){
					if(fotoupload.getForm().isValid()){

						if (Ext.getCmp('edititemshop'))
						{
							var iditem2 =  Ext.getCmp('edititemshop').getForm().findField('id').getValue();
						}

						if (Ext.getCmp('additemshop'))
						{
							var   iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
						}

						fotoupload.getForm().submit({
							url: 'admincp.php',
							method:'POST',
							params:{id:iditem2, module:'shop',task:'UploadPhotoShopItem'},
							waitTitle: 'Загрузка фотографии',
							waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
							success: function(fotoupload, o){
								//msg('Success', 'Processed file "'+o.result.file+'" on the server');
								if (o.result.ez == 5)
								{
									//Ext.MessageBox.alert('Ошибка', 'Размер Миниатюры не совпадает с 155x205');
								}
								Ext.MessageBox.alert('','Фотография успешно загружена');
								store.reload();

							},
							failure: function(fotoupload, o){
								if (o.result.error == 1)
								{
									Ext.MessageBox.alert('Ошибка', 'Расширения файлов не совпадает');
								}
								if (o.result.msg == 55)
								{
									Ext.MessageBox.alert('Ошибка', 'Неверный формат файла.<br>Файл для загрузки может быть только с форматами: JPG, GIF, PNG');
								}if (o.result.msg == 66)
								{
									Ext.MessageBox.alert('Ошибка', 'Мистика');
								}
							}
						});
					}
				}
			}]
		});
			var editImage = function(desc, id)
		{
			var form = new Ext.FormPanel({
				width:500,
				frame:true,
				items:[{xtype:'hidden', name:'id', value:id},{
					xtype:'textfield',
					fieldLabel:'Описание',
					name:'desc',
					anchor:'90%',
					value:desc
				}]
			});
			var win = new Ext.Window({width:500, hieght:200, frame:true, modal:true, items:[form], buttons:[{text:'Сохранить', handler:function(){
				var ff = form.getForm();
				if (ff.isValid())
				{
					ff.submit({
						url:'admincp.php',
						params:{module:'shop', task:'EditShopImageDesc'},
						waitMsg:'Подождите пожалуйста',
						success:function(){
							store2.reload();
							win.close();
						}
					});
				}
			}}]});
			win.show();
		}
		var  shopupfileswin =
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			shim: false,
			modal: true,
			width       : 600,
			height      : 245,
			autoScroll : true,
			closeAction :'hide',
			plain       : true,
			listeners: {'hide':function(){store.reload();}},
			items       : [fotoupload],
			buttons: [
			{
				text: 'Закрыть',
				handler: function()
				{
					store.removeAll();
					shopupfileswin.hide();
				}
			}]
		});var store2 = new Ext.data.JsonStore({
			url: 'admincp.php',
			method:'post',
			params: {module:'shop',task: 'GetListPhotosItemShop2'},
			root: 'images',
			fields: ['name', 'osn', 'url','ext','id', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
		});
		// store.load();

		var tpl2 = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap" id="{name}">',
		'<div class="thumb"><img src="{url}" title="{name}"></div>',
		'<span>{osn}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
		);
		var ima2 = new Ext.DataView({
			store: store2,
			tpl: tpl2,

			singleSelect: true,
			autoHeight:true,
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'Нет фотографий',
			prepareData: function(data){
				data.shortName = Ext.util.Format.ellipsis(data.name, 15);
				return data;
			}
		});
		var fotoupload2 = new Ext.FormPanel({

			fileUpload: true,
			width: '100%',
			frame: true,
			//border:false,
			title: 'Загрузка фотографий',
			shim: true,
			bodyStyle: 'padding: 10px 10px 0 10px;',
			labelWidth: 50,
			items: [{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Файл',
				name: 'photo-path',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			},{
				fieldLabel:'Описание',
				xtype:'textfield',
				anchor:'95%',
				name:'desc'
			}],
			buttonAlign:'center',
			buttons: [{
				text: 'Загрузить',
				handler: function(){
					if(fotoupload.getForm().isValid()){

						if (Ext.getCmp('edititemshop'))
						{
							var iditem2 =  Ext.getCmp('edititemshop').getForm().findField('id').getValue();
						}

						if (Ext.getCmp('additemshop'))
						{
							var   iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
						}

						fotoupload2.getForm().submit({
							url: 'admincp.php',
							method:'POST',
							params:{id:iditem2, module:'shop',task:'UploadPhotoShopItem2'},
							waitTitle: 'Загрузка фотографии',
							waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
							success: function(fotoupload, o){
								//msg('Success', 'Processed file "'+o.result.file+'" on the server');
								Ext.MessageBox.alert('','Фотография успешно загружена');
								store.reload();

							},
							failure: function(fotoupload, o){
								if (o.result.msg == 55)
								{
									Ext.MessageBox.alert('Ошибка', 'Неверный формат файла.<br>Файл для загрузки может быть только с форматами: JPG, GIF, PNG');
								}if (o.result.msg == 66)
								{
									Ext.MessageBox.alert('Ошибка', 'Мистика');
								}
							}
						});
					}
				}
			}]
		});
		var  shopupfileswin2 =
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			shim: false,
			modal: true,
			width       : 600,
			height      : 200,
			autoScroll : true,
			closeAction :'hide',
			plain       : true,
			listeners: {'hide':function(){store2.reload();}},
			items       : [fotoupload2],
			buttons: [
			{
				text: 'Закрыть',
				handler: function()
				{
					store2.removeAll();
					shopupfileswin2.hide();
				}
			}]
		});


		return new Ext.FormPanel({
			labelAlign: 'top',
			id:'additemshop',
			frame:true,
			bodyStyle:'padding:5px 5px 0',
			width: 1024,
			height: 550,
			autoWidth: true,
			autoHeight: true,
			items: {
				xtype:'tabpanel',
				activeTab: 0,
				defaults:{autoHeight:true, bodyStyle:'padding:10px'},
				items:[{
					title:'Карточка товара',
					layout:'form',
					items: [
					{
						layout:'column',
						border:false,
						items:[{
							columnWidth:.3,
							layout: 'form',
							border:false,
							items: [ {
								xtype:'textfield',
								fieldLabel: 'Категория',
								disabled:true,
								name: 'cat_name',
								width: '150'
							}, {

								layout:'form',
								style: 'margin-left:155px; margin-top:-30px;',
								items: [{
									xtype:'button',

									text: 'Выбрать...',
									handler: function()
									{
										CatOfShopItem(2);
									}}]


							},{
								layout:'form',
								style:'margin-top:9px;',
								items:[{
									xtype:'textfield',
							
									fieldLabel: 'Новая цена',
									name: 'price_rozn',
									
									width:150
								}]}
								]
						},{
							columnWidth:.7,
							layout: 'form',
							//style:'margin-right:100px;',
							border:false,
							items: [{
								xtype:'textfield',
								fieldLabel: 'Наименование',
								name: 'title',

								allowBlank: false,
								anchor:'80%'
							},{
								layout: 'form',
								style:'margin-left:570; margin-top:-48px;',
								border:false,
								items: [{
									xtype:'textfield',
									fieldLabel: 'Цена',
									name: 'rozn',
									
					
									qtip: 'Розничная цена',
									emptyText: '0',
									width:'80'
								}
								]
							}
							
							,{
								layout:'form',
								width:150,
								//style:'margin-top:-47px;',
								items:[{
									xtype:'textfield',
									fieldLabel: 'Артикул',
									name: 'art',
									width:'150'
								}]
							},
							{
								layout:'form',
								width:300,
								style:'margin-top:-49px;margin-left:170px;',
								items:[comboMark]
							},
							{layout:'form',
								width:50,
								style:'margin-top:-49px;margin-left:500px;',
								items:[
							{
								
									xtype:'numberfield',
									allowBlank: true,
									allowNegative: false,
									maxValue: 1000000000,
									minValue: 0,
									fieldLabel: 'Кол-во',
									name: 'kol',
									tooltip: 'Оптовая цена',
value:'1',
									emptyText: '1',
									width:'50'
								}]}
							]
						}
						]



					},{
						xtype:'hidden',
						name: 'cat_id',
						hidden:true
					}, {
						xtype:'hidden',
						name: 'id',
						hidden:true
					},
					{
						xtype:'textfield',
						grow: false,
						maxLength: '255',
						maxLengthText: 'Максимум 255 символов',
						allowBlank: true,
						name:'prim',
						fieldLabel:'Состав',
						anchor:'98%'
					},
					 {
						xtype:'textfield',
						grow: false,
						
						name: 'recom',
						fieldLabel:'Рекомендуемые товары <span style="font-size:10px">(Артиклы через запятую)</span>',
						anchor:'98%'
					},htmled({width:'100%', name:'description', label:'Дополнительное описание'}),TextFieldShopAdd
					,AddShopFull
					]},
					{
						title:'Фотографии товара',
						listeners: {
						'afterlayout': function(){

							if (Ext.getCmp('additemshop'))
							{
								iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
								store.load({params:{module:'shop',task:'GetListPhotosItemShop', id: iditem2}});
								store2.load({params:{module:'shop',task:'GetListPhotosItemShop2', id: iditem2}});

							}
							if(Ext.getCmp('edititemshop'))
							{
								iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
								store.load({params:{module:'shop',task:'GetListPhotosItemShop', id: iditem2}});
								store2.load({params:{module:'shop',task:'GetListPhotosItemShop2', id: iditem2}});
							}
						}
						},
						items:[{
							id:'images-view',
							frame:true,
							width:'100%',
							autoHeight:true,
							collapsible:true,
							layout:'fit',
							tbar:[{text:'Загрузить фотографию', handler:function(){shopupfileswin.show();}}],
							title:'Фотографии',
							bbar: [
							{ text:'Удалить выбраную',
							handler: function()
							{
								var selNode = ima.getSelectedRecords();
								var records = ima.getSelectedRecords();
								if (!Ext.getCmp('additemshop'))
								{
									var iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
								}
								else
								{
									iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
								}
								for(i=0,len = records.length;i < len; i++){
									Ext.Ajax.request({
										waitMsg: 'Пожалуйста подождите...',
										url: 'admincp.php',
										params: {
											module:'shop', module:'shop',task: "DeletePhotoItemShop",module:'shop',
											id:iditem2,
											idim:records[i].data.idim,
											image:records[i].data.name

										},
										success:function(){
											store.reload();
										},
										failure: function()
										{
											Ext.MessageBox.alert('', 'неизвестная ошибка');
										}
									});

								}
								//this.fireEvent("selectionchange", this, this.selected.elements);

							}},
							{
								text: 'Сделать основной',
								handler: function()
								{

									var selNode = ima.getSelectedRecords();

									var records = ima.getSelectedRecords();

									if (!Ext.getCmp('additemshop'))
									{
										var iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
									}
									else
									{
										iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
									}
									for(i=0,len = records.length;i < len; i++){
										Ext.Ajax.request({
											waitMsg: 'Пожалуйста подождите...',
											url: 'admincp.php',
											params: {
												module:'shop', module:'shop',task: "ShopIndexImage",module:'shop',
												id:iditem2,
												image:records[i].data.name

											},
											success:function(){
												store.reload();
											},
											failure: function()
											{
												Ext.MessageBox.alert('', 'неизвестная ошибка');
											}
										});
									}
								}
							}],
							items: ima
						}

						],
						layout:'form'
					}
					,
					{
						title:'Cвойства товара',
						layout:'form',
						width:1024,
						height:550,
						id: 'DopAddShop',
						plugins: DoShop1(id),
						items: [{
							xtype: 'checkboxgroup',
							fieldLabel: 'Отображать',
							items: [{boxLabel: 'На главной', name: 'onindex', id:'onindex', inputValue: 1, value:1},
								{boxLabel: 'Хит', name: 'onecs', id:'onecs', inputValue: 1, value:1},
							{boxLabel: 'Новинка', name: 'new', id:'new', inputValue: 1},
							{boxLabel: 'Скидка', name: 'bestsell', id:'bestsell', inputValue: 1},
							{boxLabel: 'Выбор редакции', hidden:true, name: 'editorChoice', id:'editorChoice', inputValue: 1},
							{name: 'DopSV', id:'DopSV', inputValue: 1, hidden:true, checked:true},	{boxLabel: 'Лидеры продаж',hidden:true, name: 'onlider', id:'onlider', inputValue: 1, value:1},
							{boxLabel: 'Лучшая цена', hidden:true,name: 'onsells', id:'onsells', inputValue: 1, value:1},
							
							]
						}
						]
					},{

						title:'Параметры SEO',
						layout:'form',
						width:1024,
						height:550,
						items: [{xtype:'hidden', name:'metas', value:1},{
							xtype:'textfield',
							fieldLabel: 'Заголовок страницы',
							name: 'title_page',
							dataIndex: 'title',

							anchor:'95%'
						},
						{
							xtype:'textarea',
							fieldLabel: 'Описание страницы',
							name: 'desc',
							dataIndex: 'desc',

							anchor:'95%'
						},
						{
							xtype:'textarea',
							fieldLabel: 'KeyWords',
							name: 'keys',
							dataIndex: 'keys',

							anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: 'URL страницы',
							name: 'url',
							dataIndex: 'url',

							anchor:'95%'
						}
						]}]},
						width: '550'


		}
		).show();
	}

	//end;
	// Window shopadd

	var  shopaddwin =
	function (id)
	{
		new Ext.Window({
			//applyTo     : 'hello-win',
			id: 'shopaddwin',
			layout      : 'fit',
			shim: false,
			modal: true,
			width       : 1024,
			height:550,
			autoScroll : true,
			
			plain       : true,
			items       : shopaddform(id),
			buttons: [{
				text: 'Сохранить',
				id: 'saveitem',
				handler:
				function()
				{
					tinyMCE.triggerSave();
					if (Ext.getCmp('additemshop').getForm().isValid())
					{
						Ext.getCmp('additemshop').getForm().submit({
							waitMsg: 'Пожалуйста подождите...',
							url: 'admincp.php',
							params: {module:'shop', module:'shop',task: "AddShopItem"},
							success: function(){
								Ext.getCmp('shopaddwin').close();
								shopbase.reload();

							},
							failure: function()
							{
								Ext.MessageBox.alert('', 'Ошибка');
							}
						});
					}
					else
					{
						Ext.MessageBox.alert('','Вы не заполнили обязательные поля');
					}
				}
			}
			,{
				text: 'Закрыть',
				id: 'clos',
				handler: function()
				{

					Ext.getCmp('shopaddwin').close();

				}
			}]
		}).show();

	}
	function closethewindow()
	{
		shopaddform.getForm().reset();
		shopaddwin.hide();
	}

	var runner = new Ext.util.TaskRunner();
	var task = {
		run: function(i){
			if (i == 1)
			{
				var Form = Ext.getCmp('additemshop');
				var cat_name = shopCatTree.getSelectionModel().getSelectedNode();
				Ext.Ajax.request({
					waitMsg: 'Подождите пожалуйста...',
					url: 'admincp.php',
					params: {
						module:'shop', module:'shop',task: "CreateItemTmpShop"
					},
					success: function(response){
						var result=eval(response.responseText);
						//alert(result);
						Form.getForm().findField('id').setValue(result);
					},
					failure: function()
					{
						Ext.MessageBox.alert('', 'неизвестная ошибка');
					}
				});

				if (cat_name == null)
				{
					var cat_name = "Корень";
					Form.getForm().findField('cat_id').setValue(0);
					Form.getForm().findField('cat_name').setValue(cat_name);
					//	alert(Form.getForm().findField('cat_id').getValue());
				}
				else
				{
					var catname = cat_name.text || "Корень";
					var catid = cat_name.id;
					Form.getForm().findField('cat_name').setValue(catname);
					Form.getForm().findField('cat_id').setValue(catid);

				}
			}
			else
			{
				var Form = Ext.getCmp('additemshop');
				var id = Form.getForm().findField('id').getValue();
				var name =  Form.getForm().findField('title').getValue();
				var cat_id =  Form.getForm().findField('cat_id').getValue();
				var art =  Form.getForm().findField('art').getValue();
				var text =  Form.getForm().findField('newtext').getValue();
				var rozn =  Form.getForm().findField('rozn').getValue();

				var full =  Form.getForm().findField('newfull').getValue();
				var kol =  Form.getForm().findField('kol').getValue();
				var mark =  Form.getForm().findField('mark').getValue();


				Ext.Ajax.request({
					waitMsg: 'Пожалуйста подождите...',
					url: 'admincp.php',
					params: {
						module:'shop', module:'shop',task: "UpdateTMPShop",
						id: id,
						cat_id: cat_id,
						name: name,
						art: art,
						rozn: rozn,
						text: text,
						full: full,
						kol: kol,
						mark: mark

					}

				});
			}},
			interval: 30000 //10 second
	};


	var shop_loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{module:'shop',task:'Load_Tree_Shop'}, preloadChildren: true});



	//end;
	// EDIT WINDOW AND FORM
	function CatOfShopItem(params)
	{
		var Tree4CCOS = new Ext.tree.TreePanel({
			autoScroll:true,
			animate:true,
			enableDD:false,
			width: 200,
			floatable: false,
			margins: '5 0 0 0',
			cmargins: '5 5 0 0',
			split: true,
			expanded: true,
			containerScroll: true,
			lines: false,
			singleExpand: true,
			useArrows: true,

			loader: shop_loader_tree,

			root:{
				nodeType: 'async',
				text: 'Корень',
				expanded:true,
				draggable:false,
				id:'0'
			}
		});
		var ChangeCatOfShopItem = new Ext.Window({
			layout      : 'fit',
			id: 'ChangeCatOfShopItem',
			title: 'Выберите категорию',
			shim: false,
			modal: true,
			width       : 200,
			height      : 250,
			autoScroll : true,
			closeAction :'close',
			plain       : true,
			items       : Tree4CCOS,
			buttons: [{
				text: 'Выбрать',

				handler: function(){
					var tr = Tree4CCOS.getSelectionModel().getSelectedNode();
					var id = tr.id;
					var name = tr.text;



					if (params == 1)
					{
						var shopaddfieldcatname = Ext.getCmp('additemshop').getForm().findField('cat_name')
						var shopaddfieldcatid = Ext.getCmp('additemshop').getForm().findField('cat_id')

						shopaddfieldcatname.setValue(name);
						shopaddfieldcatid.setValue(id);
						Ext.getCmp('ChangeCatOfShopItem').close();
					}

					else if (params == 2)
					{
						var shopeditfieldcatname = Ext.getCmp('edititemshop').getForm().findField('cat_name');
						var  shopeditfieldcatid = Ext.getCmp('edititemshop').getForm().findField('cat_id');
						shopeditfieldcatname.setValue(name);
						shopeditfieldcatid.setValue(id);
						Ext.getCmp('ChangeCatOfShopItem').close();
					}
					//ChangeCatOfShopItem.hide();


				}
			}]
		}).show();
	}

	if (Ext.getCmp('edititemshop'))
	{
		var IDI = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
	}
	var Txt = new Ext.form.TextField({
		hidden:true,
		id: 'IDI'
	});
	// shopaddform
	var shopeditform =
	function(IDI3)
	{
		var comboMark = new Ext.form.ComboBox( {
			store : MarksStore,
			displayField : 'name',
			valueField : 'id',
			mode : 'local',
			triggerAction : 'all',
			editable : false,
			
			hiddenName : 'mark',
			allowBlank : true,
			name : 'mark',
			width:300,
			fieldLabel : 'Брэнд',
			selectOnFocus : true
		});

		var xd = Ext.data;
		var lookup = {};

		var store = new Ext.data.JsonStore({
			url: 'admincp.php',
			method:'post',
			params: {module:'shop',task: 'GetListPhotosItemShop'},
			root: 'images',
			fields: ['name', 'osn', 'url', 'idim', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
		});
		store.load();

		var tpl = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap" id="{name}">',
		'<div class="thumb"><img src="{url}" title="{name}"></div>',
		'<span>{osn}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
		);
		var ima = new Ext.DataView({
			store: store,
			tpl: tpl,
			id:'Ima',
			singleSelect: true,
			autoHeight:true,
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'Нет фотографий',
			prepareData: function(data){
				data.shortName = Ext.util.Format.ellipsis(data.name, 15);
				return data;
			}
		});
		var fotoupload = new Ext.FormPanel({

			fileUpload: true,
			width: '100%',
			frame: true,
			//border:false,
			title: 'Загрузка фотографий',
			shim: true,
			bodyStyle: 'padding: 10px 10px 0 10px;',
			labelWidth: 100,
			items: [{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Фотография (248x173)',
				name: 'min',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			},{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Фотография (800x800)',
				name: 'big',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			}],
			buttonAlign:'center',
			buttons: [{
				text: 'Загрузить',
				handler: function(){
					if(fotoupload.getForm().isValid()){

						if (Ext.getCmp('edititemshop'))
						{
							var iditem2 =  Ext.getCmp('edititemshop').getForm().findField('id').getValue();
						}

						if (Ext.getCmp('additemshop'))
						{
							var   iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
						}

						fotoupload.getForm().submit({
							url: 'admincp.php',
							method:'POST',
							params:{id:iditem2, module:'shop',task:'UploadPhotoShopItem'},
							waitTitle: 'Загрузка фотографии',
							waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
							success: function(fotoupload, o){
								//msg('Success', 'Processed file "'+o.result.file+'" on the server');
								switch (o.result.ez)
								{
								case 5: //Ext.MessageBox.alert('', 'Фотография успешно загружена<br><b>Размер Миниатюры не совпадает с 248x173</b>');
								break;
								case 0:	Ext.MessageBox.alert('','Фотография успешно загружена');
								break;
								default:	Ext.MessageBox.alert('','Фотография успешно загружена');
								break;
								}
								
							
								store.reload();

							},
							failure: function(fotoupload, o){
								if (o.result.error == 1)
								{
									Ext.MessageBox.alert('Ошибка', 'Расширения файлов не совпадает');
								}
								if (o.result.msg == 55)
								{
									Ext.MessageBox.alert('Ошибка', 'Неверный формат файла.<br>Файл для загрузки может быть только с форматами: JPG, GIF, PNG');
								}if (o.result.msg == 66)
								{
									Ext.MessageBox.alert('Ошибка', 'Мистика');
								}
							}
						});
					}
				}
			}]
		});
		var  shopupfileswin =
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			shim: false,
			modal: true,
			width       : 600,
			height      : 245,
			autoScroll : true,
			closeAction :'hide',
			plain       : true,
			listeners: {'hide':function(){store.reload();}},
			items       : [fotoupload],
			buttons: [
			{
				text: 'Закрыть',
				handler: function()
				{
					store.removeAll();
					shopupfileswin.hide();
				}
			}]
		});var store2 = new Ext.data.JsonStore({
			url: 'admincp.php',
			method:'post',
			params: {module:'shop',task: 'GetListPhotosItemShop2'},
			root: 'images',
			fields: ['name', 'osn', 'url', 'id', 'ext', {name:'size', type: 'float'}, {name:'lastmod', type:'date', dateFormat:'timestamp'}]
		});
		store2.load();

		var tpl2 = new Ext.XTemplate(
		'<tpl for=".">',
		'<div class="thumb-wrap" id="{name}">',
		'<div class="thumb"><img src="{url}" title="{name}"></div>',
		'<span>{osn}</span></div>',
		'</tpl>',
		'<div class="x-clear"></div>'
		);
		var ima2 = new Ext.DataView({
			store: store2,
			tpl: tpl2,

			singleSelect: true,
			autoHeight:true,
			overClass:'x-view-over',
			itemSelector:'div.thumb-wrap',
			emptyText: 'Нет фотографий',
			prepareData: function(data){
				data.shortName = Ext.util.Format.ellipsis(data.name, 15);
				return data;
			}
		});
		var fotoupload2 = new Ext.FormPanel({

			fileUpload: true,
			width: '100%',
			frame: true,
			//border:false,
			title: 'Загрузка фотографий',
			shim: true,
			bodyStyle: 'padding: 10px 10px 0 10px;',
			labelWidth: 50,
			items: [{
				xtype: 'fileuploadfield',
				emptyText: 'Выберите файл для загрузки',
				fieldLabel: 'Файл',
				name: 'photo-path',
				width:'500',
				anchor: '95%',
				allowBlank: false,
				buttonCfg: {
					text: ' ',
					iconCls: 'upload-icon'
				}
			},{
				fieldLabel:'Описание',
				xtype:'textfield',
				anchor:'95%',
				name:'desc'
			}],
			buttonAlign:'center',
			buttons: [{
				text: 'Загрузить',
				handler: function(){
					if(fotoupload.getForm().isValid()){

						if (Ext.getCmp('edititemshop'))
						{
							var iditem2 =  Ext.getCmp('edititemshop').getForm().findField('id').getValue();
						}

						if (Ext.getCmp('additemshop'))
						{
							var   iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
						}

						fotoupload2.getForm().submit({
							url: 'admincp.php',
							method:'POST',
							params:{id:iditem2, module:'shop',task:'UploadPhotoShopItem2'},
							waitTitle: 'Загрузка фотографии',
							waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
							success: function(fotoupload, o){
								//msg('Success', 'Processed file "'+o.result.file+'" on the server');
								Ext.MessageBox.alert('','Фотография успешно загружена');
								store.reload();

							},
							failure: function(fotoupload2, o){
								if (o.result.msg == 55)
								{
									Ext.MessageBox.alert('Ошибка', 'Неверный формат файла.<br>Файл для загрузки может быть только с форматами: JPG, GIF, PNG');
								}if (o.result.msg == 66)
								{
									Ext.MessageBox.alert('Ошибка', 'Мистика');
								}
							}
						});
					}
				}
			}]
		});
		var  shopupfileswin2 =
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			shim: false,
			modal: true,
			width       : 600,
			height      : 200,
			autoScroll : true,
			closeAction :'hide',
			plain       : true,
			listeners: {'hide':function(){store2.reload();}},
			items       : [fotoupload2],
			buttons: [
			{
				text: 'Закрыть',
				handler: function()
				{
					store2.removeAll();
					shopupfileswin2.hide();
				}
			}]
		});

		var editImage = function(desc, id)
		{
			var form = new Ext.FormPanel({
				width:500,
				frame:true,
				items:[{xtype:'hidden', name:'id', value:id},{
					xtype:'textfield',
					fieldLabel:'Описание',
					name:'desc',
					anchor:'90%',
					value:desc
				}]
			});
			var win = new Ext.Window({width:500, hieght:200, frame:true, modal:true, items:[form], buttons:[{text:'Сохранить', handler:function(){
				var ff = form.getForm();
				if (ff.isValid())
				{
					ff.submit({
						url:'admincp.php',
						params:{module:'shop', task:'EditShopImageDesc'},
						waitMsg:'Подождите пожалуйста',
						success:function(){
							store2.reload();
							win.close();
						}
					});
				}
			}}]});
			win.show();
		}
		var TextField2 = htmled({width:'100%', name:'shortdesc', label:'Краткое  описание товара'});
		var FullField2 =htmled({width:'100%', name:'fulldesc', label:'Полное описание товара'});


		var shedfrm =new Ext.FormPanel({
			labelAlign: 'top',
			id:'edititemshop',
			frame:true,
			hideMode: 'offsets',
			bodyStyle:'padding:5px 5px 0',
			width: 1024,
			height: 550,
			autoWidth: true,
			autoHeight: true,
			items: {
				xtype:'tabpanel',
				activeTab: 0,
				defaults:{autoHeight:true, bodyStyle:'padding:10px'},
				items:[{
					title:'Карточка товара',
					layout:'form',
					items: [
					{
						layout:'column',
						border:false,
						items:[{
							columnWidth:.3,
							layout: 'form',
							border:false,
							items: [ {
								xtype:'textfield',
								fieldLabel: 'Категория',
								disabled:true,
								name: 'cat_name',
								width: '150'
							}, {

								layout:'form',
								style: 'margin-left:155px; margin-top:-30px;',
								items: [{
									xtype:'button',

									text: 'Выбрать...',
									handler: function()
									{
										CatOfShopItem(2);
									}}]


							},{
								layout:'form',
								style:'margin-top:9px;',
								items:[{
									xtype:'textfield',
									
									fieldLabel: 'Новая цена',
									name: 'price_rozn',
									width:150
								}]}
								]
						},{
							columnWidth:.7,
							layout: 'form',
							//style:'margin-right:100px;',
							border:false,
							items: [{
								xtype:'textfield',
								fieldLabel: 'Наименование',
								name: 'title',

								allowBlank: false,
								anchor:'80%'
							},{
								layout: 'form',
								style:'margin-left:570; margin-top:-48px;',
								border:false,
								items: [{
									xtype:'textfield',
									fieldLabel: 'Цена',
									name: 'rozn',
									
									qtip: 'Розничная цена',
									emptyText: '0',
									width:'80'
								},
								
								]
							},{
								layout:'form',
								//style:'margin-top:-47px;',
								width:150,
								items:[{
									xtype:'textfield',
									fieldLabel: 'Артикул',
									name: 'art',
									width:'150'
								}]
							},
							{
								layout:'form',
								style:'margin-top:-49px;margin-left:170px;',
								width:300,
								items:[comboMark]
							},{layout:'form',
								width:50,
								style:'margin-top:-49px;margin-left:500px;',
								items:[
							{
								
									xtype:'numberfield',
									allowBlank: true,
									allowNegative: false,
									maxValue: 1000000000,
									minValue: 0,
									fieldLabel: 'Кол-во',
									name: 'kol',
									tooltip: 'Оптовая цена',
value:'1',
									emptyText: '1',
									width:'50'
								}]}
							]
						},
						]



					}
					
					
					,{
						xtype:'hidden',
						name: 'cat_id',
						hidden:true
					}, {
						xtype:'hidden',
						name: 'id',
						hidden:true
					},
						 {
								xtype:'textfield',
								grow: false,
								maxLength: '255',
								maxLengthText: 'Максимум 255 символов',
								name: 'prim',
								fieldLabel:'Состав',
								anchor:'98%'
							},
							 {
								xtype:'textfield',
								grow: true,
								
								name: 'recom',
								fieldLabel:'Рекомендуемые товары <span style="font-size:10px">(Артиклы через запятую)</span>',
								anchor:'98%'
							},htmled({width:'100%', name:'description', label:'Дополнительное описание'})
					
					,TextField2,FullField2]},
					{
						title:'Фотографии товара',
						listeners: {
						'afterlayout': function(){

							if (Ext.getCmp('additemshop'))
							{
								iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
								store.load({params:{module:'shop',task:'GetListPhotosItemShop', id: iditem2}});
								store2.load({params:{module:'shop',task:'GetListPhotosItemShop2', id: iditem2}});

							}
							if(Ext.getCmp('edititemshop'))
							{
								iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
								store.load({params:{module:'shop',task:'GetListPhotosItemShop', id: iditem2}});
								store2.load({params:{module:'shop',task:'GetListPhotosItemShop2', id: iditem2}});
							}
						}
						},
						items:[{
							id:'images-view',
							frame:true,
							width:'100%',
							autoHeight:true,
							collapsible:true,
							layout:'fit',
							tbar:[{text:'Загрузить фотографию', handler:function(){shopupfileswin.show();}}],
							title:'Фотографии',
							bbar: [
							{ text:'Удалить выбраную',
							handler: function()
							{
								var selNode = ima.getSelectedRecords();
								var records = ima.getSelectedRecords();
								if (!Ext.getCmp('additemshop'))
								{
									var iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
								}
								else
								{
									iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
								}
								for(i=0,len = records.length;i < len; i++){
									Ext.Ajax.request({
										waitMsg: 'Пожалуйста подождите...',
										url: 'admincp.php',
										params: {
											module:'shop', module:'shop',task: "DeletePhotoItemShop",module:'shop',
											id:iditem2,
											idim:records[i].data.idim,
											image:records[i].data.name

										},
										success:function(){
											store.reload();
										},
										failure: function()
										{
											Ext.MessageBox.alert('', 'неизвестная ошибка');
										}
									});

								}
								//this.fireEvent("selectionchange", this, this.selected.elements);

							}},
							{
								text: 'Сделать основной',
								handler: function()
								{

									var selNode = ima.getSelectedRecords();

									var records = ima.getSelectedRecords();

									if (!Ext.getCmp('additemshop'))
									{
										var iditem2 = Ext.getCmp('edititemshop').getForm().findField('id').getValue();
									}
									else
									{
										iditem2 = Ext.getCmp('additemshop').getForm().findField('id').getValue();
									}
									for(i=0,len = records.length;i < len; i++){
										Ext.Ajax.request({
											waitMsg: 'Пожалуйста подождите...',
											url: 'admincp.php',
											params: {
												module:'shop', module:'shop',task: "ShopIndexImage",module:'shop',
												id:iditem2,
												image:records[i].data.name

											},
											success:function(){
												store.reload();
											},
											failure: function()
											{
												Ext.MessageBox.alert('', 'неизвестная ошибка');
											}
										});
									}
								}
							}],
							items: ima
						}],
						layout:'form'
					}
					,
					{
						title:'Свойства товара',
						layout:'form',

						height: 550,
						width: 1024,
						plugins: new Ext.ux.Plugin.RemoteComponent({
							url : "admincp.php",
							loadOn: 'render',
							breakOn: 'render',
							method: 'post',
							params: {module:'shop', module:'shop',task: 'ShowDopsItemShop', id: IDI3}
						}),
						id: 'onShow',
						items: [{
							xtype: 'checkboxgroup',
							fieldLabel: 'Отображать',
							items: [{boxLabel: 'На главной', name: 'onindex', id:'onindex', inputValue: 1, value:1},
									{boxLabel: 'Хит', name: 'onecs', id:'onecs', inputValue: 1, value:1},
							{boxLabel: 'Новинка', name: 'new', id:'new', inputValue: 1},
							{boxLabel: 'Скидка', name: 'bestsell', id:'bestsell', inputValue: 1},
							{boxLabel: 'Выбор редакции', hidden:true, name: 'editorChoice', id:'editorChoice', inputValue: 1},
							{name: 'DopSV', id:'DopSV', inputValue: 1, hidden:true, checked:true},	{boxLabel: 'Лидеры продаж',hidden:true, name: 'onlider', id:'onlider', inputValue: 1, value:1},
							{boxLabel: 'Лучшая цена',hidden:true, name: 'onsells', id:'onsells', inputValue: 1},
							
							]
						}]
					},{

						title:'Параметры SEO',
						layout:'form',
						items: [{xtype:'hidden', name:'metas', value:1},{
							xtype:'textfield',
							fieldLabel: 'Заголовок страницы',
							name: 'title_page',
							dataIndex: 'title_page',

							anchor:'95%'
						},
						{
							xtype:'textarea',
							fieldLabel: 'Описание страницы',
							name: 'desc',
							dataIndex: 'desc',

							anchor:'95%'
						},
						{
							xtype:'textarea',
							fieldLabel: 'KeyWords',
							name: 'keys',
							dataIndex: 'keys',

							anchor:'95%'
						},{
							xtype:'textfield',
							fieldLabel: 'URL страницы',
							name: 'url',
							dataIndex: 'url',

							anchor:'95%'
						}
						]}]},
						width: '550'


		}



		);
		return shedfrm;
	};


	//end;


	function shop_upload(id)
	{
		return new Ext.ux.UploadDialog.Dialog({
			url: 'admincp.php',
			id: 'UploadDialog',
			shim: false,
			modal: true,
			closeAction: 'close',
			post_var_name: 'photo-path',
			base_params: {module:'shop',task:'UploadPhotoShopItem', id: id},
			reset_on_hide: true,
			allow_close_on_upload: true,
			upload_autostart: false
		});
	}
	/**/
	// Window shopadd
	var  shopeditwin =
	function(IDI2)
	{
		new Ext.Window({
			//applyTo     : 'hello-win',
			layout      : 'fit',
			id: 'ShopEditWin',
			shim: false,
			modal: true,
			width       : 1024,
			height: 550,
			autoScroll : true,
			closeAction :'close',
			plain       : true,
			items       : [shopeditform(IDI2)],
			buttons: [{
				text: 'Сохранить',
				handler: function()
				{
					tinyMCE.triggerSave();
					if (Ext.getCmp('edititemshop').getForm().isValid())
					{
						Ext.getCmp('edititemshop').getForm().submit({
							waitMsg: 'Пожалуйста подождите...',
							url: 'admincp.php',
							params: {
								module:'shop', module:'shop',task: "EditShopItem"
							},
							success: function()
							{
								Ext.getCmp('ShopEditWin').close();
								shopbase.reload();
							},
							failure: function()
							{
								Ext.MessageBox.alert('', 'неизвестная ошибка');
							}
						});
					}
					else
					{
						Ext.MessageBox.alert('', 'Вы не заполнели обязательные поля');
					}
				}



			}
			,{
				text: 'Закрыть',
				handler: function()
				{
					Ext.getCmp('ShopEditWin').close();
				}
			}]
		}).show();
	}

function editTree()
{
	var form = new Ext.FormPanel({
		labelAlign:'top',
		id:'EditFormTreeCat',
		frame:true,
		autoScroll:true,
		fileUpload:true,
		monitorValid:true,
		items:[{xtype:'hidden', name:'id'},{
			xtype:'textfield',
			name:'name',
			anchor:'90%',
			fieldLabel:'Название',
			allowBlank:false
		},{
			xtype:'textfield',
			fieldLabel: 'Заголовок страницы',
			name: 'TitlePage',
			dataIndex: 'TitlePage',

			anchor:'95%'
		},{
			xtype:'textfield',
			fieldLabel: 'Описание страницы',
			name: 'DescPage',
			dataIndex: 'DescPage',

			anchor:'95%'
		},{
			xtype:'textfield',
			fieldLabel: 'Ключевые слова страницы',
			name: 'KeysPage',
			dataIndex: 'KeysPage',

			anchor:'95%'
		},{
			xtype:'textfield',
			fieldLabel: 'URL страницы',
			name: 'url',
			dataIndex: 'url',

			anchor:'95%'
		},
		{
			xtype: 'fileuploadfield',
			emptyText: 'Выберите файл для загрузки',
			fieldLabel: 'Иконка',
			name: 'photo-path',
			width:'500',
			anchor: '95%',
			//allowBlank: false,
			buttonCfg: {
				text: ' ',
				iconCls: 'upload-icon'
			}
		},
		htmled({width:'100%', name:'desc', label:'Описание'})]
		
	});
	return new Ext.Window({
		width:800,
		height:420,
		layout:'fit',
		frame:true,
		constrainHeader:true,
		modal:true,
		id:'EditWindowTree',
		actionClose:'close',
		items:form,
		buttonAlign:'right',
		buttons:[{
			text:'Сохранить',
			iconCls:'accept',
			handler:function(){
			tinyMCE.triggerSave();
			var ff = Ext.getCmp('EditFormTreeCat').getForm();
			ff.submit({
				url:'admincp.php',
				params:{module:'shop', task:'AddShopCat'},
				method:'post',
				success:function(){
					Ext.getCmp('EditWindowTree').close();
					shopCatTree.root.reload();
				},
				failure:function(){
					Ext.MessageBox.alert('', 'Во время сохранения произошла ошибка! попробуйте чуть позднее');
				}
			});
		}
		}]
	}).show();
}


	//end;
	//END;

var shop_loader_treeForShopTree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{module:'shop',task:'Load_Tree_Shop'}, preloadChildren: true});

	// Categoree of shop
	var shopCatTree = new Ext.tree.TreePanel({
		//useArrows:true,
		autoScroll:true,
		animate:true,
		enableDD:true,
		title: 'Категории',
		aling: 'top',
		id:'shopCatTree',
		width: 200,
		floatable: false,
		margins: '5 0 0 0',
		cmargins: '5 5 0 0',
		split: true,
		expanded: true,
		region:'west',
		containerScroll: true,
		lines: false,
		singleExpand: true,
		useArrows: true,
		loader:shop_loader_treeForShopTree,
		root:{
			nodeType: 'async',
			text: 'Корень',
			expanded:false,
			draggable:false,
			id:'0'
		},
		tbar: [ {
			text: 'Создать',
			handler: function(){
			   editTree();
			
		}
		},{
			text: 'Редактировать',
			handler: function(){
				var sel = shopCatTree.selModel.selNode;
				 editTree();
				var form = Ext.getCmp('EditFormTreeCat').getForm();
			     form.loadRecord(sel.attributes);

				//shopCatTree.getSelectionModel().select;
				
			}

		},{
			text: 'Удалить',
			handler: confirmDeleteCat
		}]
	});

	// End;
	// Function edit atricle
	// shop Editor
	
	//
	// Action on nodeDrop Cat
	shopCatTree.on('nodeDrop',
	function(n, dd, e, data)
	{
		var id = n.dropNode.id;
		var parentId = n.dropNode.parentNode.id;
		updateCatShop(id, parentId);
	}
	);
	shopCatTree.on("enddrag", function(tree) {

		function simplifyNodes(node) {
			var resultNode = {};
			var kids = node.childNodes;
			var len = kids.length;
			for (var i = 0; i < len; i++) {
				resultNode[kids[i].id] = simplifyNodes(kids[i]);
			}
			return resultNode;
		}


		var encNodes = Ext.encode(simplifyNodes(tree.root));
		
		Ext.Ajax.request({
			method:'POST',
			url:'admincp.php',
			params:{module:'shop',task:'SortOrderShop', nodes: encNodes}
			
		});
		

	});
	//End;
	// aFterEdit Save
	
	//end;

	// Action on Cat Click
	shopCatTree.on('click', function(n){
		Ext.getCmp('shopgrid').setTitle('Товары в '+n.text);
		shopbase.baseParams= {id:n.id, module:'shop', module:'shop',task: "ListingShopItems"};
		shopbase.load({params:{start:0, limit:25}});
	});
	//End;

	var ShopItemTplMarkup = [
	'Заголовок: <a href="{DetailPageURL}" target="_blank">{title}</a><br/>',
	'Краткое описание: {text}<br/>'
	];
	var ShopTpl = new Ext.Template(ShopItemTplMarkup);

	// Просмотр и редактирование статей

	// Base for shopGrid

	var shopbase = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		listeners:{load:function(){
			//MarksStore.load();
		}},
		baseParams:{module:'shop', module:'shop',task: "ListingShopItems"},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'Id', mapping: 'id'},
		{name: 'pos', mapping: 'pos'},
		{name: 'url', mapping: 'url'},
		{name: 'title', mapping: 'name'},
		{name: 'youtube', mapping: 'youtube'},
		{name: 'shortdesc', mapping: 'shortdesc'},
		{name: 'art', mapping: 'art'},
		{name: 'fulldesc', mapping: 'fulldesc'},
		{name: 'kol', mapping: 'kol'},
		{name: 'total_comments', mapping: 'total_comments'},
		{name: 'prim', mapping: 'prim'},
		{name: 'mark', mapping: 'mark'},
		{name: 'post', mapping: 'post'},
		{name: 'onindex', mapping: 'onindex'},
		{name: 'onlider', mapping: 'onlider'},
		{name: 'link', mapping: 'link'},
		{name: 'onsells', mapping: 'onsells'},
		{name: 'onecs', mapping: 'onecs'},
		{name: 'price_rozn', mapping: 'price_rozn'},
		{name: 'price_opt', mapping: 'price_opt'},
		{name: 'title_page', mapping: 'title_page'},
		{name: 'desc', mapping: 'desc'},
		{name: 'stock', mapping: 'stock'},
		{name: 'dateTo', mapping: 'dateTo'},
		{name: 'timeTo', mapping: 'timeTo'},
{name: 'koll', mapping: 'koll'},
{name: 'delivery', mapping: 'delivery'},
{name: 'recom', mapping: 'recom'},
{name: 'description', mapping: 'description'},
{name: 'length', mapping: 'length'},
{name: 'rating', mapping: 'rating'},
{name: 'sleeve_length', mapping: 'sleeve_length'},
{name: 'caring', mapping: 'caring'},
{name: 'deliveryDesc', mapping: 'deliveryDesc'},
{name: 'sizesDesc', mapping: 'sizesDesc'},
		{name: 'keys', mapping: 'keys'},
		{name: 'new', mapping: 'new'},
		{name: 'bestsell', mapping: 'bestsell'},
		{name: 'editorChoice', mapping: 'editorChoice'}

		])

	});
	// End Base for shopGrid

	// PagingBar for shopgrid
	var shoppagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: shopbase,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	// End
	// ArtclisRowAction

	var shopRowAction = new Ext.ux.grid.RowActions({

		actions:[{
			iconCls: 'suite'
				,qtip:'Набор'

			},
		{
			iconCls: 'viewlist'
			,qtip:'Выбрать дополнительные свойства'

		},{
			iconCls:'nullRating',
			qtip:'Обнулить рейтинг'
		},{
			iconCls:'comment',
			qtip:'Комментарии'
		},'-',
		{
			iconCls: 'delete'
			,qtip:'Удалить'

		},{
			iconCls:'edit'
			,qtip:'Редактировать'
		}]
		,widthIntercept:Ext.isSafari ? 4 : 2
		,id:'actions'
	});
	shopRowAction.on({
		action:function(grid, record, action, row, col) {
			var ar = new Array();
			ar.push(record);
			grid.getSelectionModel().selectRecords(ar);
			//Ext.ux.Toast.msg('Event: action', 'You have clicked row: <b>{0}</b>, action: <b>{1}</b>', row, action);
			if (action == 'delete')
			{
				confirmDeleteShopItem();
			}
			if (action=='comment'){
				openComments(record.data.Id);
			}
			if (action=="suite"){
				shop.suite(record.data.Id);
			}
			if (action == 'nullRating'){
				 Ext.MessageBox.confirm('', 'Вы уверены что хотите обнулить рейтинг товара', function(btn){
		                if (btn == "yes") {
		                    Ext.Ajax.request({
		                        url: 'admincp.php',
		                        params: {
		                            module: 'shop',
		                            task: 'nullRating',
		                            id: record.data.Id
		                        },
		                        method: 'post',
		                        success: function(){
		                            shopbase.reload();
		                        }
		                    });
		                }
		            })
			}
			if (action == 'edit')
			{
				var idnews = shopgrid.getSelectionModel().getSelected().get('Id');

				var cat_name = shopCatTree.getSelectionModel().getSelectedNode();
				if (cat_name == null)
				{
					var cat_name = "Корень";
				}
				var catname = cat_name.text || "Корень";

				var id = grid.getSelectionModel().getSelected().get('Id');
				//alert(cat_name);
				shopeditwin(id);
				var EDF = Ext.getCmp('edititemshop');
				EDF.getForm().loadRecord(record);
				EDF.getForm().findField('cat_name').setValue(catname);
				EDF.getForm().findField('cat_id').setValue(cat_name.id);


				var keys =grid.getSelectionModel().getSelected().get('keys');
				var art =grid.getSelectionModel().getSelected().get('art');
				var desc =grid.getSelectionModel().getSelected().get('desc');
				var title_page =grid.getSelectionModel().getSelected().get('title_page');
				var title = grid.getSelectionModel().getSelected().get('title');
				var text = grid.getSelectionModel().getSelected().get('shortdesc');
				var prim = grid.getSelectionModel().getSelected().get('prim');
				var full = grid.getSelectionModel().getSelected().get('fulldesc');
				var mark = grid.getSelectionModel().getSelected().get('mark');
				var post = grid.getSelectionModel().getSelected().get('post');
				var rozn = grid.getSelectionModel().getSelected().get('price_rozn');
				var opt = grid.getSelectionModel().getSelected().get('price_opt');
				var kol = grid.getSelectionModel().getSelected().get('kol');
				var onindex = grid.getSelectionModel().getSelected().get('onindex');
				var onsells = grid.getSelectionModel().getSelected().get('onsells');
				var onlider = grid.getSelectionModel().getSelected().get('onlider');
				var onecs = grid.getSelectionModel().getSelected().get('onecs');
				var onindex = grid.getSelectionModel().getSelected().get('onindex');
				var onsells = grid.getSelectionModel().getSelected().get('onsells');
				var onlider = grid.getSelectionModel().getSelected().get('onlider');
				var onecs = grid.getSelectionModel().getSelected().get('onecs');
				var bnew = grid.getSelectionModel().getSelected().get('new');
				var editorChoice = grid.getSelectionModel().getSelected().get('editorChoice');
				var bestsell = grid.getSelectionModel().getSelected().get('bestsell');

				
				var dmf = EDF.getForm();


				Ext.getCmp('onShow').on('afterlayout', function(){
					//alert(1);
					if (onindex != 0)
					{
						Ext.getCmp('onindex').setValue(true);
					}
					if (onlider != 0)
					{
						Ext.getCmp('onlider').setValue(true);
					}
					if (onsells != 0)
					{
						Ext.getCmp('onsells').setValue(true);
					}
					if (onecs != "0")
					{
						Ext.getCmp('onecs').setValue(true);
					}
					if (bnew != "0")
					{
						Ext.getCmp('new').setValue(true);
					}
					if (bestsell != "0")
					{
						Ext.getCmp('bestsell').setValue(true);
					}
					if (editorChoice != "0")
					{
						Ext.getCmp('editorChoice').setValue(true);
					}
				});


				dmf.findField('id').setValue(id);
				dmf.findField('keys').setValue(keys);
				dmf.findField('art').setValue(art);
				dmf.findField('desc').setValue(desc);
				dmf.findField('prim').setValue(prim);
				dmf.findField('title_page').setValue(title_page);
				dmf.findField('title').setValue(title);
				dmf.findField('shortdesc').setValue(text);
				dmf.findField('fulldesc').setValue(full);
				dmf.findField('mark').setValue(mark);
				//dmf.findField('post').setValue(post);
				dmf.findField('kol').setValue(kol);
				dmf.findField('rozn').setValue(rozn);
				dmf.findField('price_rozn').setValue(opt);



			}
			if (action == 'viewlist')
			{
				var idnews = shopgrid.getSelectionModel().getSelected().get('Id');
				window_dopsv(idnews).show();


				var onindex = grid.getSelectionModel().getSelected().get('onindex');
				var onsells = grid.getSelectionModel().getSelected().get('onsells');
				var onlider = grid.getSelectionModel().getSelected().get('onlider');
				var onecs = grid.getSelectionModel().getSelected().get('onecs');
				var bnew = grid.getSelectionModel().getSelected().get('new');
				var editorChoice = grid.getSelectionModel().getSelected().get('editorChoice');
				var bestsell = grid.getSelectionModel().getSelected().get('bestsell');

				if (onindex != 0)
				{
					Ext.getCmp('onindex').setValue(true);
				}
				if (onlider != 0)
				{
					Ext.getCmp('onlider').setValue(true);
				}
				if (onsells != 0)
				{
					Ext.getCmp('onsells').setValue(true);
				}
				if (onecs != "0")
				{
					Ext.getCmp('onecs').setValue(true);
				}
				if (bnew != "0")
				{
					Ext.getCmp('new').setValue(true);
				}
				if (bestsell != "0")
				{
					Ext.getCmp('bestsell').setValue(true);
				}
				if (editorChoice != "0")
				{
					Ext.getCmp('editorChoice').setValue(true);
				}
			}
			if (action == 'copy')
			{
				
				var idnews = shopgrid.getSelectionModel().getSelected().get('Id');

				var cat_name = shopCatTree.getSelectionModel().getSelectedNode();
				if (cat_name == null)
				{
					var cat_name = "Корень";
				}
				var catname = cat_name.text || "Корень";

				var id = grid.getSelectionModel().getSelected().get('Id');
				//alert(cat_name);
				shopaddwin(id);
				runner.start(task);

				var EDF = Ext.getCmp('additemshop');
				EDF.getForm().findField('cat_name').setValue(catname);
				EDF.getForm().findField('cat_id').setValue(cat_name.id);


				var keys =grid.getSelectionModel().getSelected().get('keys');
				var art =grid.getSelectionModel().getSelected().get('art');
				var desc =grid.getSelectionModel().getSelected().get('desc');
				var title_page =grid.getSelectionModel().getSelected().get('title_page');
				var title = grid.getSelectionModel().getSelected().get('title');
				var text = grid.getSelectionModel().getSelected().get('prim');
				var prim = grid.getSelectionModel().getSelected().get('shortdesc');
				var full = grid.getSelectionModel().getSelected().get('fulldesc');
				var mark = grid.getSelectionModel().getSelected().get('mark');
				var post= grid.getSelectionModel().getSelected().get('post');
				var rozn = grid.getSelectionModel().getSelected().get('price_rozn');
				var opt = grid.getSelectionModel().getSelected().get('price_opt');
				var kol = grid.getSelectionModel().getSelected().get('kol');
				var onindex = grid.getSelectionModel().getSelected().get('onindex');
				var onsells = grid.getSelectionModel().getSelected().get('onsells');
				var onlider = grid.getSelectionModel().getSelected().get('onlider');
				var dmf = EDF.getForm();

				Ext.getCmp('DopAddShop').on('afterlayout', function(){

					if (onindex != 0)
					{

						Ext.getCmp('onindex').setValue(true);
					}
					if (onlider != 0)
					{
						Ext.getCmp('onlider').setValue(true);
					}
					if (onsells != 0)
					{
						Ext.getCmp('onsells').setValue(true);
					}
					if (onecs != 0)
					{
						Ext.getCmp('onecs').setValue(true);
					}
				});
				//dmf.findField('id').setValue(id);
				//dmf.findField('keys').setValue(keys);
				dmf.findField('art').setValue(art);
				dmf.findField('prim').setValue(prim);

				dmf.findField('title').setValue(title);
				dmf.findField('newtext').setValue(text);
				dmf.findField('newfull').setValue(full);
				dmf.findField('mark').setValue(mark);
				//dmf.findField('post').setValue(post);
				dmf.findField('kol').setValue(kol);
				dmf.findField('rozn').setValue(rozn);
	dmf.findField('price_rozn').setValue(opt);

				Ext.getCmp('shopaddwin').on('beforeclose', function() {

					var Form = Ext.getCmp('additemshop');
					Ext.getCmp('clos').on('click',  function() {
						var id = Form.getForm().findField('id').getValue();

						Ext.Ajax.request({


							waitMsg: 'Пожалуйста подождите...',
							url: 'admincp.php',
							params: {
								module:'shop', module:'shop',task: "DeleteTmpShopItem",
								id: id


							}});
					});
					runner.stop(task);
				});

			}

		}
	});

	//
	//shopGrid
	//
	function confirmDeleteShopItem(id){
		Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить этот товар', deleteShopItem);
	};
	function deleteShopItem(btn){
		if(btn=='yes'){
			var select = shopgrid.getSelectionModel().getSelected().get('Id');

			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите',
				url: 'admincp.php',
				params: {
					module:'shop', module:'shop',task: "DeleteShopItem",
					id:  select
				},
				success: function(response){
					var result=eval(response.responseText);
					switch(result){
						case 55:  // Success : simply reload
						shopbase.reload();
						break;
					}
				},
				failure: function(response){
					var result=response.responseText;
					Ext.MessageBox.alert('error','could not connect to the database. retry later');
				}
			});
		}
	};

	function masschangecat()
	{
		var Tree4CCOS = new Ext.tree.TreePanel({
			autoScroll:true,
			animate:true,
			enableDD:false,
			width: 200,
			floatable: false,
			margins: '5 0 0 0',
			cmargins: '5 5 0 0',
			split: true,
			expanded: true,
			containerScroll: true,
			lines: false,
			singleExpand: true,
			useArrows: true,

			loader: shop_loader_tree,

			root:{
				nodeType: 'async',
				text: 'Корень',
				expanded:true,
				draggable:false,
				id:'0'
			}
		});
		var ChangeCatOfShopItem = new Ext.Window({
			layout      : 'fit',
			id: 'MassChangeCatOfShopItem',
			title: 'Выберите категорию',
			shim: false,
			modal: true,
			width       : 200,
			height      : 250,
			autoScroll : true,
			closeAction :'close',
			plain       : true,
			items       : Tree4CCOS,
			buttons: [{
				text: 'Выбрать',

				handler: function(){
					var tr = Tree4CCOS.getSelectionModel().getSelectedNode();
					var idcat = tr.id;
					var name = tr.text;
					var records = shopgrid.getSelectionModel().getSelections();
					var results = {};
					for(var i=0; i<records.length; i++){
						var r = records[i];
						var id = r.get('Id');
						results[id] = "";
						//console.log(id) ;
					}
					Ext.Ajax.request({
						waitMsg: 'Пожалуйста подождите...',
						url: 'admincp.php',
						params: {
							module:'shop', module:'shop',task: "ShopMassChangeCat",
							id: Ext.encode(results),
							catid: idcat
						},success: function()
						{
							Ext.getCmp('MassChangeCatOfShopItem').close();
							shopbase.reload();
						},
						failure: function()
						{
							Ext.MessageBox.alert('', 'неизвестная ошибка');
						}
					});
				}
			}]
		}).show();
	}
	function confirmmassdelete(btn)
	{
		if (btn == "yes")
		{
			var records = shopgrid.getSelectionModel().getSelections();
			var results = {};
			for(var i=0; i<records.length; i++){
				var r = records[i];
				var id = r.get('Id');
				results[id] = "";
				//console.log(id) ;
			}
			Ext.Ajax.request({
				waitMsg: 'Пожалуйста подождите...',
				url: 'admincp.php',
				params: {
					module:'shop', module:'shop',task: "ShopMassDelete",
					id: Ext.encode(results)
				},success: function()
				{
					shopbase.reload();
				},
				failure: function()
				{
					Ext.MessageBox.alert('', 'неизвестная ошибка');
				}});
		}
	}
	var sm2 = new Ext.grid.CheckboxSelectionModel();
	var shopgrid = new Ext.grid.EditorGridPanel({
		store: shopbase,
		title: 'Товары',
		loadMask: true,
		frame:true,
		stripeRows: true,
		id:'shopgrid',
		listeners:{
			'afteredit':function (oGrid_event){
				
				Ext.Ajax.request({
					waitMsg: 'Пожалуйста подождите...',
					url: 'admincp.php',
					params: {
						xaction: "RecordUpdate",
						id :  oGrid_event.record.data.Id,
						pos: oGrid_event.record.data.pos,
						module:'shop'
					},
					success: function(response){
						var result=eval(response.responseText);
						switch(result){
							case 33:
							shopbase.commitChanges();   // changes successful, get rid of the red triangles
							break;
							default:
							Ext.MessageBox.alert('Ошибка','Не возможно сохранить изменения...');
							break;
						}
					},
					failure: function(response){
						var result=response.responseText;
						Ext.MessageBox.alert('error','could not connect to the database. retry later');
					}
				});
			}
		},
		layout: 'fit',
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		sm2,
		{id: 'id', header: "#", width: 40, sortable: true, dataIndex: 'Id'},
		{id: 'art', header: "Арт.", width: 80, sortable: true, dataIndex: 'art'},
		{id: 'pos', header: "Поз.", width: 80, sortable: true, dataIndex: 'pos', editable:true, editor:new Ext.form.NumberField()},
		{id:'title', header: "Наименование", width: 500, sortable: true, dataIndex: 'title'},
		{id:'price', header: "Цена", width: 60, sortable: true, dataIndex: 'price_rozn'},
		{header: "Рейтинг", width: 70, sortable: true, dataIndex: 'rating'},
		{header: "Комментариев", width: 70, sortable: true, dataIndex: 'total_comments'},
		{id:'link', header: "Ссылка", width: 60, sortable: true, dataIndex: 'link'},
		shopRowAction



		],

		sm: sm2,
		viewConfig: {
			forceFit: false
		},
		height:150,
		bbar: shoppagingBar,
		plugins:shopRowAction,
		iconCls:'icon-grid',
		split: true,
		tbar:[
		{
			text: 'Добавить товар',
			iconCls:'add',
			handler:function(){
				MarksStore.load();
				shopaddwin();
				runner.start(task);
				Ext.getCmp('shopaddwin').on('beforeclose', function() {

					var Form = Ext.getCmp('additemshop');
					Ext.getCmp('clos').on('click',  function() {
						var id = Form.getForm().findField('id').getValue();

						Ext.Ajax.request({


							waitMsg: 'Пожалуйста подождите...',
							url: 'admincp.php',
							params: {
								module:'shop', module:'shop',task: "DeleteTmpShopItem",
								id: id
							}});
					});
					runner.stop(task);
				});

				var cat_name = shopCatTree.getSelectionModel().getSelectedNode();
				if (cat_name == null)
				{
					var cat_name = "Корень";
				}
				var catname = cat_name.text || "Корень";
				Ext.getCmp('additemshop').getForm().findField('cat_name').setValue(catname);
				Ext.getCmp('additemshop').getForm().findField('cat_id').setValue(cat_name.id);
			}
		},'-',{
			text: 'Удалить выбранные',
			disabled:true,
			iconCls:'delete',
			id:'massdeleteitems',
			handler: function()
			{
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить выбранные товары', confirmmassdelete);

			}
		},'-',{
			text: 'Изменить категорию выбранных товаров',
			disabled:true,
			id: 'masschcat',
			handler: masschangecat
		}],
		region: 'center'

		//renderTo: document.body

	});
	shopgrid.on('cellclick', function(){
		Ext.getCmp('masschcat').enable(true);
		Ext.getCmp('massdeleteitems').enable(true);
	});
	shopbase.on('load', function(){
		Ext.getCmp('masschcat').disable(true);
		Ext.getCmp('massdeleteitems').disable(true);
	});


var catalog = {};
catalog.users = {};
	
	catalog.users.addEdit = function (){
		
		
		var form = new Ext.FormPanel({
			id:'catalog.users.form',
			width:'100%',
			height:570,
			frame:true,
			labelAlign:'top',
			items:[{
			
								xtype:'textfield',
								fieldLabel:'Email',
								name:'user',
								anchor:'90%'
				
						},{
							
							xtype:'textfield',
							fieldLabel:'Пароль (Оставьте пустым, чтобы не изменять пароль)',
							name:'pass',
							anchor:'90%'
			
					},{
						
						xtype:'textfield',
						fieldLabel:'Ф.И.О',
						name:'fio',
						anchor:'90%'
		
				},{
						xtype:'textfield',
						fieldLabel: "Телефон",
						name: 'tel',
						anchor:'90%'
				},{
					xtype:'textarea',
					fieldLabel: "Адрес доставки",
					height:70,
					name: 'adres',
					anchor:'90%'
			},{
				xtype:'numberfield',
				fieldLabel: "Скидка",
				name: 'sk',
				maxValue:100,
				minValue:0,
				anchor:'40%'
		},{
								xtype:'hidden',
								name:'id'
							}
						
				
				]
		});
		new Ext.Window({
			width:550,
			height:470,
			frame:true,
			closeAction:'close',
			modal:true,
			id:'catalog.users.WindowAddEdit',
			items:[form],
			buttonAlign:'right',
			buttons:[{text:'Сохранить', iconCls:'accept', handler:function(){
				if (form.getForm().isValid())
				{
				Ext.ux.TinyMCE.initTinyMCE();
				tinyMCE.triggerSave();
				form.getForm().submit({
					url:'admincp.php',
					params:{task:'saveUser', module:'shop'},
					waitMsg:'Пожалуйста подождите',
					success:function(form, o){
						var res = o.result.msg;
						if (res == "33")
						{	
						Ext.getCmp('catalog.users.WindowAddEdit').close();
						catalog.users.base.reload();
						}
						else
						{
							Ext.MessageBox.alert('', 'Пароль не может быть пустым');
						}

					}
				});
				}
				else
				{
					Ext.MessageBox.alert('', 'Заполните все обязательные поля');
				}
			}}]
		}).show();
	};


	catalog.users.base = new Ext.data.Store({

		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{task: "ListingUsers", module:'shop'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		{name: 'user', mapping: 'user'},
		{name: 'fio', mapping: 'fio'},
		{name: 'sk', mapping: 'sk'},
		{name: 'orders', mapping: 'orders'},
		{name: 'sum', mapping: 'sum'},
		{name: 'adres', mapping: 'adres'},
		{name: 'tel', mapping: 'tel'}
		])
	});
	catalog.users.pagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: catalog.users.base,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	catalog.users.RowAction = new Ext.ux.grid.RowActions({

		actions:[{
			iconCls: 'delete'
			,qtip:'Удалить'
		},{
			iconCls:'edit'
			,qtip:'Редактировать'
		
		}]
		,widthIntercept:Ext.isSafari ? 4 : 2
		,id:'actions'
	});
	catalog.users.RowAction.on({
		action:function(grid, record, action, row, col) {
			if (action == 'delete') // Если action равен 
			{
				Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить этого пользователя "'+record.data.user+'"?', function(btn){
					if (btn == "yes")
					{
						Ext.Ajax.request({
							url:'admincp.php',
							params:{task:'deleteUser', id:record.data.id, module:'shop'},
							success:function(){
								catalog.users.base.reload();
							},
							failure:function(){
								
							}
						});
					}
				});
			}
			if (action == 'edit')
			{
				catalog.users.addEdit();
				Ext.getCmp('catalog.users.form').getForm().loadRecord(record);
			}
		}
	});
	catalog.users.grid = new Ext.grid.GridPanel({
		store: catalog.users.base,
		title: 'Пользователи',
		loadMask: true,
		frame:true,
		layout: 'fit',
		enableColLock:false,
		autoWidth:true,
		columns: [
	     {header: "Ф.И.О", width: 150, sortable: true, dataIndex: 'fio'},
		{header: "E-mail", width: 150, sortable: true, dataIndex: 'user'},
		{header: "Скидка", width: 150, sortable: true, dataIndex: 'sk'},
		{header: "Заказов", width: 150, sortable: true, dataIndex: 'orders'},
		{header: "Сумма заказов", width: 150, sortable: true, dataIndex: 'sum'},
		catalog.users.RowAction



		],
		
		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		bbar: catalog.users.pagingBar,
		plugins:catalog.users.RowAction,
		iconCls:'icon-grid',
		split: true,
			tbar:[
			{
				text: 'Добавить Пользователя',
				handler:function(){
				catalog.users.addEdit();
				},
				iconCls: 'add'}]

	});
	
	
	
	
	
	// End shopGrid

	var shopview = {
		id:'shop',
		xtype:'tabpanel',
		title: 'Магазин',
		activeTab:0,
		bodyBorder: false,
		defaults: {
			collapsible: true,
			split: true,
			animFloat: false,
			autoHide: false,
			useSplitTips: true
			//bodyStyle: 'padding:15px'
		},
		items: [
		{
			title:'Товары',
			layout:'border',
			items:[shopCatTree,shopgrid]
		},
		
		{
			title: 'Размеры',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.sizes.store.load()}},
			items: [shop.sizes.grid]
		},
		{
			title: 'Цвета',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.colors.store.load()}},
			items: [shop.colors.grid]
		},
		{
			title: 'Полнота',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.fullness.store.load()}},
			items: [shop.fullness.grid]
		},
		{
			title: 'Фасоны',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.style.store.load()}},
			items: [shop.style.grid]
		},
		{
			title: 'Бренды',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.brands.store.load()}},
			items: [shop.brands.grid]
		},
		{
			title: 'Доставка',
			layout:'fit',
			autoHeight: false,
			listeners:{show:function(){shop.delivery.store.load()}},
			items: [shop.delivery.grid]
		},
		
		
		{
			title: 'Настройки',
			layout:'fit',
			id:'shopcon',
			bodyStyle: 'padding:15px',
			items: [formval]
		},{
			title: 'Заказы',
			layout:'fit',
			bodyBorder: false,
			
			items: [ordersgrid]

		}
		]
	}
	init_modules[init_modules.length] = shopview;
	init_nav_modules[init_nav_modules.length] ={
		text:'Магазин', iconCls:'pages', handler:function(){
			MarksStore.load();
		catalog.users.base.load();
			shopbase.load({params:{id: 0, start:0, limit:25}});
			ShopDopstore.load();
			ordersbase.load({params:{start:0, limit:25}});
			shopCatTree.root.expand();
			ShopPoststore.load();


			Ext.getCmp('Content').layout.setActiveItem('shop');


		}
	};

	Ext.apply(actions, {
	'shop': function()
	{
		MarksStore.load();
		if (Ext.getCmp('Content').layout.activeItem.id != 'shop')
		{
			Ext.getCmp('Content').layout.setActiveItem('shop');
			catalog.users.base.load();
			shopbase.load({params:{id: 0, start:0, limit:25}});
			
			ordersbase.load({params:{start:0, limit:25}});
			shopCatTree.root.expand();
			
		}
	}
	});
	ModulesRightMenu+='<li><img src="core/icons/cart.png"/><a id="shop" href="#">Магазин</a></li>';
	function window_dopsv(id)
	{
		//alert(id);
		var form = new Ext.FormPanel({
			labelAlign: 'top',
			bodyStyle:'padding:5px 5px 0',
			width: 1024,
			autoScroll:true,
			id: 'FormDopSV',
			autoHeight: true,
			plugins: new Ext.ux.Plugin.RemoteComponent({
				url : "admincp.php",
				//loadOn: 'render',
				//breakOn: 'render',
				method: 'post',
				params: {module:'shop', module:'shop',task: 'ShowDopsItemShop', id: id}}),
				items:[{
					xtype: 'checkboxgroup',
					fieldLabel: 'Отображать',
					items: [{boxLabel: 'На главной', name: 'onindex', id:'onindex', inputValue: 1, value:1},
					{boxLabel: 'Хит', name: 'onecs', id:'onecs', inputValue: 1, value:1},
					{boxLabel: 'Новинка', name: 'new', id:'new', inputValue: 1},
					{boxLabel: 'Скидка', name: 'bestsell', id:'bestsell', inputValue: 1},
					{boxLabel: 'Выбор редакции',hidden:true, name: 'editorChoice', id:'editorChoice', inputValue: 1},
					{name: 'DopSV', id:'DopSV', inputValue: 1, hidden:true, checked:true},	{boxLabel: 'Лидеры продаж',hidden:true, name: 'onlider', id:'onlider', inputValue: 1, value:1},
					{boxLabel: 'Лучшая цена', hidden:true,name: 'onsells', id:'onsells', inputValue: 1},
					]
				}]

		});

		var window = new Ext.Window({
			layout:'form',
			width: 1024,
			height: 550,
			modal: true,
			autoScroll:true,
			id: 'WindowDopSV',
			closeAction: 'close',
			items: form,
			buttonAlign: 'center',
			buttons: [{
				text: 'Сохранить',
				handler: function()
				{
					form.getForm().submit({
						url: 'admincp.php',
						method: 'post',
						params: {module:'shop',task:'SaveDopSVItem', id: id},
						success: function()
						{
							Ext.getCmp('WindowDopSV').close();
							shopbase.reload();
						},
						failure: function()
						{
							Ext.MessageBox.alert('', 'неизвестная ошибка');
						}
					});
				}
			}]
		});
		return window;
	}
	function shop_upload_mass()
	{
		return new Ext.ux.UploadDialog.Dialog({
			url: 'admincp.php',
			shim: false,
			modal: true,
			closeAction: 'close',
			post_var_name: 'photo-path',
			base_params: {module:'shop',task:'UploadPhotoMassPhoto'},
			reset_on_hide: true,
			allow_close_on_upload: false,
			upload_autostart: false
		});
	}

	
	
	
	
	