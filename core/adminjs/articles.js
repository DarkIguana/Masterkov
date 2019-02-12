var articles = {};

articles.updateRecord = function(oGrid_event){
    Ext.Ajax.request({
        waitMsg: 'Пожалуйста подождите...',
        url: 'admincp.php',
        params: {
            xaction: "Update",
            id: oGrid_event.record.data.id,
            active: oGrid_event.record.data.active,
            module: 'articles',
            pos: oGrid_event.record.data.pos
        },
        success: function(response){
            var result = eval(response.responseText);
            switch (result) {
                case 33:
                    articles.base.commitChanges(); // changes successful, get rid of the red triangles
                    articles.base.reload(); // reload our datastore.
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



articles.addedit = function(id){


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
                        var idd = Ext.getCmp('articles.form').getForm().findField('id').getValue();
                        
                        fotoupload2.getForm().submit({
                            url: 'admincp.php',
                            method: 'POST',
                            params: {
                                id: idd,
                                module: 'articles',
                                task: 'UploadPhoto'
                            },
                            waitTitle: 'Загрузка фотографии',
                            waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
                            success: function(fotoupload, o){
                                //msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                //Ext.getCmp('articles.form.tabimages.grid').store.reload();
                                Ext.getCmp('articles.UploadWindow').close();
                                
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
            id: 'articles.UploadWindow',
            width: 400,
            height: 200,
            autoScroll: true,
            closeAction: 'close',
            plain: true,
            listeners: {
                'close': function(){
                    Ext.getCmp('articles.form.tabimages.grid').store.reload();
                }
            },
            items: [fotoupload2],
            buttons: [{
                text: 'Закрыть',
                handler: function(){
                    Ext.getCmp('articles.form.tabimages.grid').store.reload();
                    Ext.getCmp('articles.UploadWindow').close();
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
            module: 'articles'
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
                                module: 'articles',
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
                        module: 'articles',
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
        
        
        id: 'articles.form.tabimages.grid',
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
                        module: 'articles',
                        pos: oGrid_event.record.data.pos
                    },
                    success: function(response){
                        var result = eval(response.responseText);
                        switch (result) {
                            case 33:
                                Ext.getCmp('articles.form.tabimages.grid').store.commitChanges();
                                
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
                return "<center><img src='files/articles/" + value + "' width='80'></center>";
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
        }]
    
    
    });
    
    
    var form = new Ext.FormPanel({
        id: 'articles.form',
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
                title: 'Описание',
                layout: 'form',
                autoScroll: true,
                iconCls: 'viewlist',
                items: [{
                    layout: 'table',
                    layoutConfig: {
                        columns: 4,
                        tableAttrs: {
                            style: {
                                width: 880
                            }
                        }
                    },
                    defaults: {
                        width: 250
                    },
                    items: [{
                        layout: 'form',
                        width: 400,
                        colspan: 2,
                        items: [{
                        
                            xtype: 'textfield',
                            fieldLabel: 'Название',
                            name: 'name',
                            anchor: '95%'
                        }]
                    }]
                },{
                    
                    xtype: 'textfield',
                    fieldLabel: 'Артиклы товаров (через запятую)',
                    name: 'arts',
                    anchor: '95%'
                },new Ext.form.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    fieldLabel:'Раздел',
                    name:'cat_id',
                    hiddenName:'cat_id',
                    store: new Ext.data.SimpleStore({
                        fields: ['partyValue', 'partyName'],
                        data: [['1', 'В помощь'], ['0', 'Статьи']]
                    }),
                    mode: 'local',
                    displayField: 'partyName',
                    valueField: 'partyValue',
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                }), {
					xtype:'textarea',
					name:'notice',
					fieldLabel:'Анонс',
					height:100,
					anchor:'95%'
				}, htmled({
                    name: 'desc',
                    label: 'Описание',
                    height: 350
                }), {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }, {
                id: 'articles.form.tabimages',
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
            }, {
            
                title: 'Параметры SEO',
                layout: 'form',
                width: 1024,
                height: 550,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Заголовок страницы',
                    name: 'TitlePage',
                    
                    
                    anchor: '95%'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'Описание страницы',
                    name: 'DescPage',
                    
                    
                    anchor: '95%'
                }, {
                    xtype: 'textarea',
                    fieldLabel: 'KeyWords',
                    name: 'KeysPage',
                    
                    
                    anchor: '95%'
                },{
    				xtype:'textfield',
    				fieldLabel: 'Заголовок страницы',
    				name: 'url',
    				dataIndex: 'url',
    				anchor:'95%'
    			}]
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
        id: 'articles.WindowAddEdit',
        items: [form],
        listeners: {
            "show": function(){
                if (id == 0) {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        waitMsg: 'Подождите пожалуйста',
						method:'POST',
                        params: {
                            module: 'articles',
                            task: 'NewItem'
                        },
                        success: function(response){
                            Ext.getCmp('articles.form.tabimages').enable(true);
                            var o = eval(response.responseText);
                            Ext.getCmp('articles.form').getForm().findField('id').setValue(o);
                            base.baseParams = {
                                xaction: "Listing_Images",
                                module: 'articles',
                                dd: o
                            };
                        }
                    });
                }
                else {
                    base.baseParams = {
                        xaction: "Listing_Images",
                        module: 'articles',
                        dd: id
                    };
                    Ext.getCmp('articles.form.tabimages').enable(true);
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
                        module: 'articles',
                        task: 'save'
                    },
                    waitMsg: 'Пожалуйста подождите',
                    success: function(){
                        Ext.getCmp('articles.WindowAddEdit').close();
                        articles.base.reload();
                        
                    }
                });
            }
        }]
    }).show();
}


articles.base = new Ext.data.Store({

    proxy: new Ext.data.HttpProxy({
        url: 'admincp.php',
        method: 'POST'
    }),
    remoteSort:true,
    baseParams: {
        xaction: "Listing",
        module: 'articles'
    },
    
    reader: new Ext.data.JsonReader({
        root: 'results',
        totalProperty: 'total',
        id: 'id'
    }, [{
        name: 'id',
        mapping: 'id'
    },{
        name: 'cat_id',
        mapping: 'cat_id'
    }, {
        name: 'pos',
        mapping: 'pos'
    }, {
        name: 'name',
        mapping: 'name'
    },{
		name:'notice',
		mapping:'notice'
	}, {
        name: 'desc',
        mapping: 'desc'
    },{
    	name:'date',
    	mapping:'date'
    }, {
        name: 'link',
        mapping: 'link'
    }, {
        name: 'TitlePage',
        mapping: 'TitlePage'
    }, {
        name: 'DescPage',
        mapping: 'DescPage'
    }, {
        name: 'KeysPage',
        mapping: 'KeysPage'
    }, {
        name: 'active',
        type: 'int',
        mapping: 'active'
    },{
    	name:'url',
    	mapping:'url'
    },{
    	name:'arts',
    	mapping:'arts'
    }])

});





// PagingBar for articlegrid
articles.pagingBar = new Ext.PagingToolbar({
    pageSize: 25,
    store: articles.base,
    paramNames: {
        start: 'start',
        limit: 'limit'
    },
    displayInfo: true


});
// End
// ArtclisRowAction

articles.RowAction = new Ext.ux.grid.RowActions({

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
articles.RowAction.on({
    action: function(grid, record, action, row, col){
        if (action == 'delete') {
            Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
                if (btn == "yes") {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        params: {
                            module: 'articles',
                            task: 'deleteItem',
                            id: record.data.id
                        },
                        method: 'post',
                        success: function(){
                            articles.base.reload();
                        }
                    });
                }
            })
        }
        if (action == 'edit') {
        
            articles.addedit(record.data.id);
            Ext.getCmp('articles.form').getForm().loadRecord(record)
            
        }
    }
});
articles.grid = new Ext.grid.EditorGridPanel({
    store: articles.base,
    title: '',
    frame: true,
    loadMask: true,
    id: 'articles.grid',
    layout: 'fit',
    enableColLock: false,
    clicksToEdit: 1,
    autoWidth: true,
    columns: [{
        id: 'id',
        header: "#",
        width: 15,
        sortable: true,
        dataIndex: 'id'
    }, {
        id: 'pos',
        header: "Поз.",
        width: 20,
        sortable: true,
        dataIndex: 'pos',
        editor: new Ext.form.TextField
    }, {
        id: 'name',
        header: "Заголовок",
        width: 100,
        sortable: true,
        dataIndex: 'name'
    }
    , {
        id: 'cat_id',
        header: "Раздел",
        width: 100,
        sortable: true,
        dataIndex: 'cat_id',
        renderer:function(value){
        	if (value=='1'){
        		return 'В помощь';
        	}
        	return 'Статьи';
        }
    }, {
        id: 'Active',
        header: '',
		sortable:true,
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
        
    }, articles.RowAction],
    
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: true
    }),
    viewConfig: {
        forceFit: true
    },
    height: 150,
    bbar: articles.pagingBar,
    plugins: articles.RowAction,
    iconCls: 'icon-grid',
    split: true,

    tbar: [{
        text: 'Добавить новую запись',
        handler: function(){
        
            articles.addedit(0);
            
            
        },
        iconCls: 'add'
    }],
    region: 'center'

});

articles.grid.on('afteredit', articles.updateRecord);


// End articleGrid

articles.view = {
    id: 'articles',
    title: 'Статьи',
    layout: 'fit',
    
    items: [articles.grid]
}
init_modules[init_modules.length] = articles.view;
init_nav_modules[init_nav_modules.length] = {
    text: 'Спецпредложения',
    iconCls: 'pages',
    handler: function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'articles') {
            Ext.getCmp('Content').layout.setActiveItem('articles');
            if (articles.base.data.length < 1) {
                articles.base.load({
                    params: {
                        start: 0,
                        limit: 25
                    }
                });
                
                
            };
            
                    }
    }
};

Ext.apply(actions, {
    'articles': function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'articles') {
            Ext.getCmp('Content').layout.setActiveItem('articles');
            if (articles.base.data.length < 1) {
                articles.base.load({
                    params: {
                        start: 0,
                        limit: 25
                    }
                });
            };
            
                    }
    }
});
ModulesRightMenu += '<li><img src="core/icons/layout.png"/><a id="articles" href="#">Статьи</a></li>';
