function uploadImages2Pages(idPage){


    function UploadPhoto(action){
    	if (!action){
    		action = 'UploadPhotoGallery';
    	}
    	else {
    		action = 'UploadZip';
    	}
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
                        
                        
                        fotoupload2.getForm().submit({
                            url: 'admincp.php',
                            method: 'POST',
                            params: {
                                id: idPage,
                                module: 'pages',
                                task: action
                            },
                            waitTitle: 'Загрузка фотографии',
                            waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
                            success: function(fotoupload, o){
                                //msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                //Ext.getCmp('gallery.form.tabimages.grid').store.reload();
                                Ext.getCmp('pages.UploadWindow').close();
                                
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
            id: 'pages.UploadWindow',
            width: 400,
            height: 200,
            autoScroll: true,
            closeAction: 'close',
            plain: true,
            listeners: {
                'close': function(){
                    Ext.getCmp('pages.form.tabimages.grid').store.reload();
                }
            },
            items: [fotoupload2],
            buttons: [{
                text: 'Закрыть',
                handler: function(){
                    Ext.getCmp('pages.form.tabimages.grid').store.reload();
                    Ext.getCmp('pages.UploadWindow').close();
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
            module: 'pages'
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
        },{
        	name:'itog'
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
    
        actions: [{
            iconCls: 'apply',
            qtip: 'Сделать основной'
        }, {
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
                                module: 'pages',
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
                        module: 'pages',
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
        
        
        id: 'pages.form.tabimages.grid',
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
                        module: 'pages',
                        itog: oGrid_event.record.data.itog,
                        pos: oGrid_event.record.data.pos
                    },
                    success: function(response){
                        var result = eval(response.responseText);
                        switch (result) {
                            case 33:
                                Ext.getCmp('pages.form.tabimages.grid').store.commitChanges();
                                
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
                return "<center><img src='/thumbs/80x80/files/pages/" + value + "' width='80'></center>";
            }
        }, {
            id: 'file',
            header: "Файл",
            width: 150,
            sortable: true,
            dataIndex: 'file'
        }, {
            header: "Поз.",
            width: 150,
            sortable: true,
            dataIndex: 'pos',
            editor: new Ext.form.NumberField()
        }, {
            id: 'osn',
            header: "",
            width: 150,
            sortable: true,
            dataIndex: 'osn',
            renderer: function(value){
                if (value == 1) {
                    return "<b>Основная</b>";
                }
                return "";
            }
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
        },{
            text: 'Загрузить ZIP архив с фотографиями',
            handler: function(){
                UploadPhoto(true);
                
            },
            iconCls: 'add'
        }]
    
    
    });
    
    
    var form = new Ext.FormPanel({
        id: 'gallery.form',
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
                id: 'pages.form.tabimages',
                
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
        id: 'pages.ImagesPages',
        items: [form],
        listeners: {
            "show": function(){
               
                    base.baseParams = {
                        xaction: "Listing_Images",
                        module: 'pages',
                        dd: idPage
                    };
                    Ext.getCmp('pages.form.tabimages').enable(true);
                    Ext.getCmp('pages.form.tabimages.grid').store.reload();
                
            }
        }
       
    }).show();
}



function addtoAdv(id){
	if (!id){
		return true;
	}
	if (id==0){
		return true;
	}
	
	var RowAction = new Ext.ux.grid.RowActions({

		actions:[{
			iconCls: 'add'
			,qtip:'Добавить'
		}]
		,widthIntercept:Ext.isSafari ? 4 : 2
		,id:'actions'
	});
	RowAction.on({
		action:function(grid, record, action, row, col) {
			if (action == 'add')
			{
				
						Ext.Ajax.request({
							url:'admincp.php',
							params:{module:'pages', task:'addAdv', id:record.data.id, page:id},
							method:'post',
							success:function(){
								if (Ext.getCmp('adv_pages_grid')){
									Ext.getCmp('adv_pages_grid').store.reload();
								}
							}
						});
				
			}
			
		}
	});
	
	var base = new Ext.data.Store({

		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "ListingAdvAll", module:'pages'},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		
		
		
		{name: 'name', mapping: 'name'},
		{name: 'photo', mapping: 'photo'}

		])

	});
	base.load();
	var grid = new Ext.grid.EditorGridPanel({
		store: base,
		title: '',
		frame:true,
		 loadMask:true,
		
		layout: 'fit',
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{id:'name', header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
		
	
		RowAction



		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		
		plugins:RowAction,
		iconCls:'icon-grid',
		split: true,
		region: 'center'

	});
	
 return new Ext.Window({
	 width:640,
	 height:480,
	 layout:'fit',
	 title:'Выберите производителя',
	 modal:true,
	 items:[grid]
 }).show();
}
function addAdv(id){
	if (!id){
		return true;
	}
	if (id==0){
		return true;
	}
	
	var RowAction = new Ext.ux.grid.RowActions({

		actions:[{
			iconCls: 'delete'
			,qtip:'Удалить'
		}]
		,widthIntercept:Ext.isSafari ? 4 : 2
		,id:'actions'
	});
	RowAction.on({
		action:function(grid, record, action, row, col) {
			if (action == 'delete')
			{
				
						Ext.Ajax.request({
							url:'admincp.php',
							params:{module:'pages', task:'deleteAdv', id:record.data.id},
							method:'post',
							success:function(){
								base.reload();
							}
						});
				
			}
			
		}
	});
	
	var base = new Ext.data.Store({

		proxy: new Ext.data.HttpProxy({
			url: 'admincp.php',
			method: 'POST'
		}),
		baseParams:{xaction: "ListingAdv", module:'pages', id:id},

		reader: new Ext.data.JsonReader({
			root: 'results',
			totalProperty: 'total',
			id: 'id'
		}, [
		{name: 'id', mapping: 'id'},
		
		
		
		{name: 'name', mapping: 'name'},
		{name: 'photo', mapping: 'photo'}

		])

	});
	base.load();
	var grid = new Ext.grid.EditorGridPanel({
		store: base,
		title: '',
		frame:true,
		 loadMask:true,
		id:'adv_pages_grid',
		layout: 'fit',
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{id:'name', header: "Наименование", width: 100, sortable: true, dataIndex: 'name'},
		
	
		RowAction



		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		height:150,
		
		plugins:RowAction,
		iconCls:'icon-grid',
		split: true,
		tbar:[
		{
			text: 'Добавить',
			handler:function(){
			
			
			   addtoAdv(id);
			
			},
			iconCls: 'add'}],
			region: 'center'

	});
	
 return new Ext.Window({
	 width:640,
	 height:480,
	 title:'Производители',
	 layout:'fit',
	 modal:true,
	 items:[grid]
 }).show();
	
}
function parentAux(param)
{
	var aux_loader_tree = new Ext.tree.TreeLoader({url:'admincp.php', baseParams:{xaction:'Load_Tree_Pages', module:'pages'}, preloadChildren: true});
	var Tree4CCOS = new Ext.tree.TreePanel({
		autoScroll:true,
		animate:true,
		enableDD:false,
		width: 500,
		floatable: false,
		margins: '5 0 0 0',
		cmargins: '5 5 0 0',
		split: true,
		expanded: true,
		containerScroll: true,
		lines: false,
		singleExpand: true,
		useArrows: true,

		loader: aux_loader_tree,

		root:{
			nodeType: 'async',
			text: 'Основной раздел',
			expanded:true,
			draggable:false,
			id:'0'
		}
	});
	
	var ChangeCatOfShopItem = new Ext.Window({
		layout      : 'fit',
		id: 'ChangeParentOfAux',
		title: 'Выберите раздел',
		shim: false,
		modal: true,
		width       : 500,
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
				
					Ext.getCmp('AddPages').getForm().findField('parentName').setValue(name);
					Ext.getCmp('AddPages').getForm().findField('parentId').setValue(id);
					Ext.getCmp('ChangeParentOfAux').close();
			}
		}]
	}).show();
}

function q_add_pages(btn)
{
	if (btn == "yes")
	{
		Ext.getCmp('AddPages').getForm().reset();
		if (Ext.getCmp('pages').layout.activeItem.id != 'PagesIndex')

		{
			Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
			if (PagesStore.data.length  < 1)
			{
				PagesStore.load({method: 'post', params:{start:0, limit:25}});
			};
		};
	};
};

function save_pages(btn)
{
	var form = Ext.getCmp('AddPages').getForm();
	var id = form.findField('id').getValue();
	var title = form.findField('title').getValue();
	tinyMCE.triggerSave();
	if (form.isValid() & form.findField('text').getValue() != "")
	{
		form.submit({
			url:'admincp.php',
			method:'post',
			params:{task:'update', module:'pages'},
			success:function(){
				
				form.reset();
				PagesStore.reload();
				Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
				App.setAlert('', 'Страница успешно Добавлена');
			},
			failure:function(){
				PagesStore.reload();
				App.setAlert('', 'Не удалось обновить страницу');
			}
		});
		/*
		if (id == "")
		{
			var u = new PagesGrid.store.recordType(form.getValues());
			PagesGrid.store.insert(0,u);
			PagesGrid.store.reload();
			Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
			form.reset();
			PagesStore.reload();
			App.setAlert('', 'Страница успешно Добавлена');
		}
		else
		{     
			var text = form.findField('text').getValue();
			 text = text.replace("\n", "");
			 form.findField('text').setValue(text);
			var rec = PagesGrid.getSelectionModel().getSelected();
			form.updateRecord(rec);
			form.reset();
			PagesStore.reload();
			Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
			App.setAlert('', 'Страница успешно Обновлена');
		};
		*/
	}
	else
	{
		var textmsg = "";
		if (form.findField('title').getValue() == ""){textmsg += "Не заполнено поле '<b>Заголовок</b>'<br>";};
		if (form.findField('text').getValue() == ""){textmsg += "Не заполнено поле '<b>Текст страницы</b>'<br>";};

		Ext.MessageBox.show({
			msg:'<center><b>Не заполнены обязательные поля:</b></center><br><br>'+textmsg,
			width:300,
			buttons: Ext.MessageBox.OK,
			animEl: btn
		});
	};
}
var PagesFormBar = function(){ return [{text:'<b>ВЕРНУТЬСЯ</b>', iconCls:'back', handler: function(){
	var form = Ext.getCmp('AddPages').getForm();
	if (form.findField('title').getValue() != "" || form.findField('text').getValue() != "")
	{
		Ext.MessageBox.confirm('', 'Вы уверены что хотите выйти без сохранения?', q_add_pages);
	}
	else {
		Ext.getCmp('AddPages').getForm().reset();
		if (Ext.getCmp('pages').layout.activeItem.id != 'PagesIndex')
		{
			Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
			if (PagesStore.data.length  < 1)
			{
				PagesStore.load({method: 'post', params:{start:0, limit:25}});
			};
		};

	}

}}, '-', {text:'<b>СОХРАНИТЬ</b>', iconCls:'apply',id:Ext.id(), handler: function(){save_pages(this.id);}}];
};

function deletePage(btn){
	if(btn=='yes'){
		var rec =PagesGrid.getSelectionModel().getSelected();
		Ext.Ajax.request({
			url:'admincp.php',
			method:'post',
			params:{id:rec.id, module:'pages', task:'destroy'}
		});
		PagesGrid.store.remove(rec);
	};
};
function housePage(btn){
	if(btn=='yes'){
		var rec =PagesGrid.getSelectionModel().getSelected();
		Ext.Ajax.request({
			url:'admincp.php',
			params:{xaction:'homepage', module:'pages', id: rec.id},
			method:'post',
			success:function()
			{
				App.setAlert('', 'Страница успешно обновлена');
				PagesStore.reload();
			}
		});
		
	};
};
function selectGallery(){
	  var base = new Ext.data.Store({
	        proxy: new Ext.data.HttpProxy({
	            url: 'admincp.php',
	            method: 'POST'
	        }),
	        baseParams: {
	            xaction: "getRecords",
	            module: 'gallery'
	        },
	        
	        reader: new Ext.data.JsonReader({
	            root: 'results',
	            totalProperty: 'total',
	            id: 'id'
	        }, [{
	            name: 'id',
	            mapping: 'id'
	        },{
	        	name:'name',
	        	mapping:'name'
	        }])
	    
	    });
	  base.load({params:{start:0, limit:25}});
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
	    
	  
	    
	    var grid = new Ext.grid.EditorGridPanel({
	        store: base,
	        id: 'selectGallery.grid',
	        enableColLock: false,
	        clicksToEdit: 1,
	        height: '80%',
	        frame: true,
	        loadMask: true,
	        autoWidth: true,
	        
	        columns: [ {
	            id: 'name',
	            header: "Название",
	            width: 150,
	            sortable: false,
	            dataIndex: 'name'
	        }],
	        
	        sm: new Ext.grid.RowSelectionModel({
	            singleSelect: true
	        }),
	        viewConfig: {
	            forceFit: true
	        },
	        height: 150,
	        bbar: pagingBar,
	    
	        iconCls: 'icon-grid',
	        split: true
	    });
	    new Ext.Window({
	    	width:550,
	    	height:350,
	    	layout:'fit',
	    	items:grid,
	    	id:'selectGallery.Window',
	    	buttons:[{
	    		text:'Выбрать',
	    		iconCls:'apply',
	    		handler:function(){
	    		    var sel = Ext.getCmp('selectGallery.grid').getSelectionModel().getSelected();
	    		    if (sel){
	    		    	
	    		    	Ext.getCmp('AddPages').getForm().findField('gallery').setValue(sel.get('id'));
	    		    	Ext.getCmp('AddPages').getForm().findField('gallery_name').setValue(sel.get('name'));
	    		    	Ext.getCmp('selectGallery.Window').close();
	    		    }
	    		    else {
	    		    	App.setAlert('', 'Выберите галерею');
	    		    }
	    	    }
	    	}],
	    	modal:true
	    }).show();
}
var PagesWriter = new Ext.data.JsonWriter({listful:true});
var PagesStore = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php'
	}),
	baseParams: {module:'pages', task:'read'},
	remoteSort:true,
	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'id', mapping: 'id'},
	{name: 'title', mapping: 'title'},
	{name: 'title2', mapping: 'title2'},
	{name:'galleryTitle'},
	{name: 'parentId', mapping: 'parentId'},
	{name: 'parentName', mapping: 'parentName'},
	{name: 'text', mapping: 'text'},
	{name: 'textblock', mapping: 'textblock'},
	{name: 'keys', mapping: 'keys'},
	{name: 'desc', mapping: 'desc'},
	{name: 'url', mapping: 'url'},
	{name: 'galleryTitle', mapping: 'galleryTitle'},
	{name: 'copy', mapping: 'copy'},
	{name:'secondTitle', mapping:'secondTitle'},
	{name: 'link', mapping: 'link'},
	{name: 'pos', mapping: 'pos'},
	{name: 'gallery', mapping: 'gallery'},
	{name: 'gallery_name', mapping: 'gallery_name'},
	{name:'h1', mapping:'h1'},
	{name: 'index', mapping: 'index'},
	{name: 'title_page', mapping: 'title_page'},
	{name: 'inMenu',  mapping: 'inMenu'},
	{name: 'isService',  mapping: 'isService'},
	{name:'arts', mapping:'arts'},
	{name: 'active', type: 'int', mapping: 'active'}
	])
});
PagesStore.on({
	beforeload: function(){
		Ext.MessageBox.wait('Пожалуйста подождите...', 'Загрузка');
	},
	load: function(){
		Ext.MessageBox.updateProgress(1);
		Ext.MessageBox.hide();
	},
	loadexception: function(){
		Ext.MessageBox.updateProgress(1);
		Ext.MessageBox.hide();
	}
});
var PagesPagingBar = new Ext.PagingToolbar({
	pageSize: 25,
	store: PagesStore,
	displayInfo: true
});
var PagesRowActions = new Ext.ux.grid.RowActions({
	actions:[{
		iconCls:'house'
		,qtip: 'Сделать основной страницей'
	},{
		'iconCls': 'camera',
		'qtip': 'Фотогалерея'
	},'-',{
		iconCls: 'delete'
		,qtip:'Удалить'
	},{
		iconCls:'edit'
		,qtip:'Редактировать'

	}]
	,widthIntercept:Ext.isSafari ? 4 : 2
	,header:'<center><b>Операции</b></center>'
	,id:'actions'
});
PagesRowActions.on({
	action:function(grid, record, action, row, col) {
		switch (action)
		{
		case "camera":
			uploadImages2Pages(record.data.id);
			break;
			case "delete":
			Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите удалить эту страницу', deletePage);
			break;
			case 'house':Ext.MessageBox.confirm('Подтверждение','Вы уверены что хотите сделать основной эту страницу', housePage);
			break;
			case "edit":
			Ext.getCmp('pages').layout.setActiveItem('AddPages');
			Ext.getCmp('AddPages').getForm().loadRecord(record);
			break;
			case "apply":
				addAdv(record.data.id);
			break;
			
		};
	}
});
function EditSettingModule_Page()
{
	
	var form = new Ext.FormPanel({
		width:600,
		height:400,
		frame:true,
		labelAlign:'top',
		items:[{
			xtype:'textarea',
			fieldLabel:'Настройка дизайна',
			width:550,
			height:300,
			name:'design'
		}]
	});
	var win = new Ext.Window({
		shim:true,
		frame:true,
		width:600,
		tools:[{id:'help', qtip:'Справка',handler:function(){new Ext.Window({
		width:300,
		height:300,
		frame:true,
		title:'Справка',
		closeAction:'close',
		autoLoad:{url:'admincp.php?help=pages'}
	}).show();}}],
		height:400,
		iconCls:'setting',
		title:'Настройки модуля',
		buttons:[{
			text:'Сохранить',
			handler:function(){
				form.getForm().submit({
					url:'admincp.php',
					params:{task:'SaveSetting', module:'pages'},
					success:function(){
						win.close();
						Ext.MessageBox.alert('','Настройки успешно изменены');
					},
					failure:function(){
						Ext.MessageBox.alert('','Во время сохранения произошла ошибка, попробуйте чуть позднее');
					}
				});
			}
		}],
		listeners:{
			"show": function(){
				form.load({
					url:'admincp.php',
					method:'post',
					waitMsg:'Подождите идёт загрузка данных',
					params:{module:'pages', task:'LoadSetting'}
				});
			}
		},
		items:form
	}).show();
}

var PagesGrid = new Ext.grid.EditorGridPanel({
	store: PagesStore,
	frame:true,
	bbar: PagesPagingBar,
	id: 'PagesGrid',
	region:'center',
	enableColLock:false,
	plugins: [PagesRowActions],
	tbar:[{text:'Создать новую страницу',iconCls: 'add', handler: function(){
		Ext.getCmp('pages').layout.setActiveItem('AddPages');
	}},'->',{xtype:'buttongroup',
	items:[{
text:'<b>Настройки модуля</b>', iconCls:'setting', handler: EditSettingModule_Page}]}],
	clicksToEdit:1,
	columns: [
	{id: 'id', header: "<b>#</b>", width: 30, sortable: true, dataIndex: 'id'},
	{id:'title', header: "<center><b>Заголовок</b></center>", width: 400, sortable: true, dataIndex: 'title2'},
	{id:'module', header: "<center><b>Сорт.</b></center>", width: 55, sortable: true, dataIndex: 'pos', editor:new Ext.form.NumberField()},
	{id: 'Active',header: "<center><b>Свойство</b></center>",sortable: true,dataIndex:'active',
	editor: new Ext.form.ComboBox({
		typeAhead: true,
		triggerAction: 'all',
		store:new Ext.data.SimpleStore({
			fields:['partyValue', 'partyName'],
			data: [['1','Активная'],['2','Не активная']]
		}),
		mode: 'local',
		displayField: 'partyName',
		valueField: 'partyValue',
		lazyRender:true,
		listClass: 'x-combo-list-small'
	}),  renderer: function(value) {
		if (value == 1) {
			return "Активная";
		}
		return "Не активная";
	}
	},
	{id: 'inMenu',header: "<center><b>Меню</b></center>",sortable: true,dataIndex:'inMenu',
		editor: new Ext.form.ComboBox({
			typeAhead: true,
			triggerAction: 'all',
			store:new Ext.data.SimpleStore({
				fields:['partyValue', 'partyName'],
				data: [[1,'Отображать'],[0,'Не отображать']]
			}),
			mode: 'local',
			displayField: 'partyName',
			valueField: 'partyValue',
			lazyRender:true,
			listClass: 'x-combo-list-small'
		}),  renderer: function(value) {
			if (value == "1") {
				return "Отображать";
			}
			return "Не отображать";
		}
		},
		{id: 'isService',header: "<center><b>Тип</b></center>",sortable: false,dataIndex:'isService',
			editor: new Ext.form.ComboBox({
				typeAhead: true,
				triggerAction: 'all',
				store:new Ext.data.SimpleStore({
					fields:['partyValue', 'partyName'],
					data: [[1,'Услуга'],[0,'Раздел']]
				}),
				mode: 'local',
				displayField: 'partyName',
				valueField: 'partyValue',
				lazyRender:true,
				listClass: 'x-combo-list-small'
			}),  renderer: function(value) {
				if (value == "1") {
					return "Услуга";
				}
				return "Раздел";
			}
			},
	{id:'index',header: "<center><b>Главная</b></center>", width: 120, sortable: true, dataIndex: 'index'},
	{id:'link', header: "<center><b>Ссылка</b></center>", width: 120, sortable: true, dataIndex: 'link'},
	PagesRowActions
	],
	listeners:{
	'afteredit':function (oGrid_event){
		Ext.Ajax.request({
			waitMsg: 'Пожалуйста подождите...',
			url: 'admincp.php',
			params: {
				xaction: "update",
				id :  oGrid_event.record.data.id,
				inMenu: oGrid_event.record.data.inMenu,
				isService: oGrid_event.record.data.isService,
				active: oGrid_event.record.data.active,
				module:'pages',
				pos:oGrid_event.record.data.pos
			},
			success: function(response){
				var result=eval(response.responseText);
		
					PagesStore.commitChanges();   // changes successful, get rid of the red triangles
					//advant.base.reload();          // reload our datastore.
					
				
			},
			failure: function(response){
				var result=response.responseText;
				Ext.MessageBox.alert('error','could not connect to the database. retry later');
			}
		});
}},
	sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
	viewConfig: {
		forceFit: false,
		border:false
	}
});
var PagesIndex = {
	layout: 'fit',
	id:'PagesIndex',
	border:false,
	items:[PagesGrid]
};

var Add_Edit_Pages=new Ext.FormPanel({
	id:'AddPages',
	iconCls: 'add',
	border:false,
	labelAlign:'top',
	bbar:PagesFormBar(),
	monitorValid:true,
	layout:'fit',
	fileUpload:true,
	autoScroll:true,
	frame: true,
	listeners: {"show":function(){Ext.getCmp('TabPanelPagesAddForm').activate(0);}},
	items:  [{
		xtype:'tabpanel',
		activeTab: 0,
		autoScroll:true,
		id: 'TabPanelPagesAddForm',
		border:false,
		
		frame: true,
		defaults:{autoHeight: false, height:700, bodyStyle:'padding:10px;', autoScroll:true, frame: true,layout:'form',border:false},
		items:[{
			title:'ОПИСАНИЕ',
			items: [{
				xtype:'hidden',
				name: 'id',
				hidden: true
			},{
				xtype:'hidden',
				name: 'gallery',
				hidden: true
			},{
				xtype:'hidden',
				name: 'parentId',
				hidden: true
			},{
				xtype:'textfield',
				fieldLabel: 'Заголовок',
				name: 'title',
				dataIndex: 'title',
				allowBlank:false,
				anchor:'95%'
			},{
				xtype:'textfield',
				fieldLabel: 'Основной раздел',
				disabled:true,
				name:'parentName',
				width: '150'
			}, {

				layout:'form',
				style: 'margin-left:180px; margin-top:-30px; padding-bottom:10px;',
				items: [{
					xtype:'button',

					text: 'Выбрать...',
					handler: function()
					{
						parentAux(1);
					}}]


			},{xtype:'hidden', 
      		  fieldLabel: 'Галерея',
    		  triggerClass:'x-form-search-trigger', 
    		  onTriggerClick:selectGallery,
    		  editable:false,
    		  allowBlank:true,
    		  width:350,
    		  name: 'gallery_name'
    		  
    	  },{
              
              xtype: 'textfield',
              fieldLabel: 'Артиклы товаров (через запятую)',
              name: 'arts',
              anchor: '95%'
          },htmled({name:'text', label:'Текст страницы', height: 300})]
		}	
		,{
			title:'ПАРАМЕТРЫ SEO',
			items:[
			{
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
			},
			{
				xtype:'textfield',
				fieldLabel: 'H1 страницы',
				name: 'secondTitle',
				dataIndex: 'secondTitle',
				anchor:'95%'
			},{
				xtype:'textfield',
				fieldLabel: 'URL страницы',
				name: 'url',
				dataIndex: 'url',
				anchor:'95%'
			},{
				xtype:'textfield',
				fieldLabel: 'Заголовок галереи',
				name: 'galleryTitle',
				dataIndex: 'galleryTitle',
				anchor:'95%'
			}
			
			]
		}]
	}]
});
var module_pages = {
	id:'pages',
	layout: 'card',
	activeItem: 0,
	iconCls:'pages',
	title:'Основные разделы',
	items: [PagesIndex, Add_Edit_Pages]
};
init_modules[init_modules.length] = module_pages;
init_nav_modules[init_nav_modules.length] ={
	text:'Основные разделы', iconCls:'pages', handler:function(){
		Ext.getCmp('Content').layout.setActiveItem('pages');
		if (Ext.getCmp('pages').layout.activeItem.id == 'AddPages')
		{
			if(Ext.getCmp('AddPages'))
			{
				Ext.getCmp('AddPages').getForm().reset();
			};
			Ext.getCmp('pages').layout.setActiveItem('PagesGrid');
			if (PagesStore.data.length  < 1)
			{
				PagesStore.load({method: 'post', params:{start:0, limit:25}});
			};
		}
		else
		{
			if (PagesStore.data.length  < 1)
			{
				PagesStore.load({method: 'post', params:{start:0, limit:25}});
			};
		};
	}, menu: [{text:'Создать новую страницу', iconCls:'add', handler: function(){
		if (Ext.getCmp('Content').layout.activeItem.id != 'pages')
		{
			Ext.getCmp('Content').layout.setActiveItem('pages');
			Ext.getCmp('pages').layout.setActiveItem('AddPages');
		}
		else
		{
			if (Ext.getCmp('pages').layout.activeItem.id != 'AddPages')
			{
				Ext.getCmp('pages').layout.setActiveItem('AddPages');
			};
		};
	}}]

};

Ext.apply(actions, {
'pages': function()
{

	if (Ext.getCmp('Content').layout.activeItem.id != 'pages')
	{
		Ext.getCmp('Content').layout.setActiveItem('pages');
		if (PagesStore.data.length  < 1)
		{
			PagesStore.load({method: 'post', params:{start:0, limit:25}});
		};

	}
	else
	{
		if (Ext.getCmp('pages').layout.activeItem.id == 'AddPages')
		{
			if(Ext.getCmp('AddPages'))
			{
				Ext.getCmp('AddPages').getForm().reset();
				Ext.getCmp('TabPanelPagesAddForm').activate(0);
			};
			Ext.getCmp('pages').layout.setActiveItem('PagesIndex');
			if (PagesStore.data.length  < 1)
			{
				PagesStore.load({method: 'post', params:{start:0, limit:25}});
			};
		}
	};
}
});
ModulesRightMenu+='<li><img src="core/icons/layout.png"/><a id="pages" href="#">Основные разделы</a></li>';