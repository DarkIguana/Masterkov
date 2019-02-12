var specialists = {};

specialists.updateRecord = function(oGrid_event){
    Ext.Ajax.request({
        waitMsg: 'Пожалуйста подождите...',
        url: 'admincp.php',
        params: {
            xaction: "Update",
            id: oGrid_event.record.data.id,
            active: oGrid_event.record.data.active,
            module: 'specialists',
            pos: oGrid_event.record.data.pos
        },
        success: function(response){
            var result = eval(response.responseText);
            switch (result) {
                case 33:
                    specialists.base.commitChanges(); // changes successful, get rid of the red triangles
                    specialists.base.reload(); // reload our datastore.
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



specialists.addedit = function(id){


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
                        var idd = Ext.getCmp('specialists.form').getForm().findField('id').getValue();
                        
                        fotoupload2.getForm().submit({
                            url: 'admincp.php',
                            method: 'POST',
                            params: {
                                id: idd,
                                module: 'specialists',
                                task: 'UploadPhoto'
                            },
                            waitTitle: 'Загрузка фотографии',
                            waitMsg: 'Пожалуйста подождите, идёт загрузка фотографии...',
                            success: function(fotoupload, o){
                                //msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                //Ext.getCmp('specialists.form.tabimages.grid').store.reload();
                                Ext.getCmp('specialists.UploadWindow').close();
                                
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
            id: 'specialists.UploadWindow',
            width: 400,
            height: 200,
            autoScroll: true,
            closeAction: 'close',
            plain: true,
            listeners: {
                'close': function(){
                    Ext.getCmp('specialists.form.tabimages.grid').store.reload();
                }
            },
            items: [fotoupload2],
            buttons: [{
                text: 'Закрыть',
                handler: function(){
                    Ext.getCmp('specialists.form.tabimages.grid').store.reload();
                    Ext.getCmp('specialists.UploadWindow').close();
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
            module: 'specialists'
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
                                module: 'specialists',
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
                        module: 'specialists',
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
        
        
        id: 'specialists.form.tabimages.grid',
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
                        module: 'specialists',
                        pos: oGrid_event.record.data.pos
                    },
                    success: function(response){
                        var result = eval(response.responseText);
                        switch (result) {
                            case 33:
                                Ext.getCmp('specialists.form.tabimages.grid').store.commitChanges();
                                
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
                return "<center><img src='files/specialists/" + value + "' width='80'></center>";
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
        id: 'specialists.form',
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
                            fieldLabel: 'Ф.И.О',
                            name: 'name',
                            anchor: '95%'
                        }]
                    }]
                }, {
					xtype:'textfield',
					name:'prof',
					fieldLabel:'Професия',
					
					anchor:'95%'
				}, {
					xtype:'numberfield',
					name:'age',
					fieldLabel:'Стаж'
					
					
				}, htmled({
                    name: 'desc',
                    label: 'Описание',
                    height: 350
                }), {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }, {
                id: 'specialists.form.tabimages',
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
        id: 'specialists.WindowAddEdit',
        items: [form],
        listeners: {
            "show": function(){
                if (id == 0) {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        waitMsg: 'Подождите пожалуйста',
						method:'POST',
                        params: {
                            module: 'specialists',
                            task: 'NewItem'
                        },
                        success: function(response){
                            Ext.getCmp('specialists.form.tabimages').enable(true);
                            var o = eval(response.responseText);
                            Ext.getCmp('specialists.form').getForm().findField('id').setValue(o);
                            base.baseParams = {
                                xaction: "Listing_Images",
                                module: 'specialists',
                                dd: o
                            };
                        }
                    });
                }
                else {
                    base.baseParams = {
                        xaction: "Listing_Images",
                        module: 'specialists',
                        dd: id
                    };
                    Ext.getCmp('specialists.form.tabimages').enable(true);
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
                        module: 'specialists',
                        task: 'save'
                    },
                    waitMsg: 'Пожалуйста подождите',
                    success: function(){
                        Ext.getCmp('specialists.WindowAddEdit').close();
                        specialists.base.reload();
                        
                    }
                });
            }
        }]
    }).show();
}


specialists.base = new Ext.data.Store({

    proxy: new Ext.data.HttpProxy({
        url: 'admincp.php',
        method: 'POST'
    }),
    baseParams: {
        xaction: "Listing",
        module: 'specialists'
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
    },{
    	name:'age',
    	mapping:'age'
    }, {
        name: 'name',
        mapping: 'name'
    },{
		name:'notice',
		mapping:'notice'
	},{
		name:'prof',
		mapping:'prof'
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
    }])

});





// PagingBar for articlegrid
specialists.pagingBar = new Ext.PagingToolbar({
    pageSize: 25,
    store: specialists.base,
    paramNames: {
        start: 'start',
        limit: 'limit'
    },
    displayInfo: true


});
// End
// ArtclisRowAction

specialists.RowAction = new Ext.ux.grid.RowActions({

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
specialists.RowAction.on({
    action: function(grid, record, action, row, col){
        if (action == 'delete') {
            Ext.MessageBox.confirm('', 'Вы уверены что хотите удалить эту запись', function(btn){
                if (btn == "yes") {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        params: {
                            module: 'specialists',
                            task: 'deleteItem',
                            id: record.data.id
                        },
                        method: 'post',
                        success: function(){
                            specialists.base.reload();
                        }
                    });
                }
            })
        }
        if (action == 'edit') {
        
            specialists.addedit(record.data.id);
            Ext.getCmp('specialists.form').getForm().loadRecord(record)
            
        }
    }
});
specialists.grid = new Ext.grid.EditorGridPanel({
    store: specialists.base,
    title: '',
    frame: true,
    loadMask: true,
    id: 'specialists.grid',
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
        id: 'pos',
        header: "Поз.",
        width: 20,
        sortable: false,
        dataIndex: 'pos',
        editor: new Ext.form.TextField
    }, {
        id: 'name',
        header: "Заголовок",
        width: 100,
        sortable: false,
        dataIndex: 'name'
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
        
    }, specialists.RowAction],
    
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: true
    }),
    viewConfig: {
        forceFit: true
    },
    height: 150,
    bbar: specialists.pagingBar,
    plugins: specialists.RowAction,
    iconCls: 'icon-grid',
    split: true,
    tbar: [{
        text: 'Добавить новую запись',
        handler: function(){
        
            specialists.addedit(0);
            
            
        },
        iconCls: 'add'
    }],
    region: 'center'

});

specialists.grid.on('afteredit', specialists.updateRecord);


// End articleGrid

specialists.view = {
    id: 'specialists',
    title: 'Специалисты',
    layout: 'fit',
    
    items: [specialists.grid]
}
init_modules[init_modules.length] = specialists.view;
init_nav_modules[init_nav_modules.length] = {
    text: 'Специалисты',
    iconCls: 'pages',
    handler: function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'specialists') {
            Ext.getCmp('Content').layout.setActiveItem('specialists');
            if (specialists.base.data.length < 1) {
                specialists.base.load({
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
    'specialists': function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'specialists') {
            Ext.getCmp('Content').layout.setActiveItem('specialists');
            if (specialists.base.data.length < 1) {
                specialists.base.load({
                    params: {
                        start: 0,
                        limit: 25
                    }
                });
            };
            
                    }
    }
});
ModulesRightMenu += '<li><img src="core/icons/page_copy.png"/><a id="specialists" href="#">Специалисты</a></li>';
