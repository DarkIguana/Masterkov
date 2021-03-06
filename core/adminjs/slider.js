var slider = {};

slider.updateRecord = function(oGrid_event){
    Ext.Ajax.request({
        waitMsg: '���������� ���������...',
        url: 'admincp.php',
        params: {
            xaction: "Update",
            id: oGrid_event.record.data.id,
            active: oGrid_event.record.data.active,
            module: 'slider',
            pos: oGrid_event.record.data.pos
        },
        success: function(response){
            var result = eval(response.responseText);
            switch (result) {
                case 33:
                    slider.base.commitChanges(); // changes successful, get rid of the red triangles
                    slider.base.reload(); // reload our datastore.
                    break;
                default:
                    Ext.MessageBox.alert('������', '�� �������� ��������� ���������...');
                    break;
            }
        },
        failure: function(response){
            var result = response.responseText;
            Ext.MessageBox.alert('error', 'could not connect to the database. retry later');
        }
    });
};



slider.addedit = function(id){


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
                emptyText: '�������� ���� ��� ��������',
                fieldLabel: '����',
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
                text: '���������',
                handler: function(){
                    if (fotoupload2.getForm().isValid()) {
                        var idd = Ext.getCmp('slider.form').getForm().findField('id').getValue();
                        
                        fotoupload2.getForm().submit({
                            url: 'admincp.php',
                            method: 'POST',
                            params: {
                                id: idd,
                                module: 'slider',
                                task: 'UploadPhoto'
                            },
                            waitTitle: '�������� ����������',
                            waitMsg: '���������� ���������, ��� �������� ����������...',
                            success: function(fotoupload, o){
                                //msg('Success', 'Processed file "'+o.result.file+'" on the server');
                                //Ext.getCmp('slider.form.tabimages.grid').store.reload();
                                Ext.getCmp('slider.UploadWindow').close();
                                
                            },
                            failure: function(fotoupload2, o){
                                Ext.MessageBox.alert('������', '�� ������� ��������� ����������');
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
            title: '�������� ����������',
            id: 'slider.UploadWindow',
            width: 400,
            height: 200,
            autoScroll: true,
            closeAction: 'close',
            plain: true,
            listeners: {
                'close': function(){
                    Ext.getCmp('slider.form.tabimages.grid').store.reload();
                }
            },
            items: [fotoupload2],
            buttons: [{
                text: '�������',
                handler: function(){
                    Ext.getCmp('slider.form.tabimages.grid').store.reload();
                    Ext.getCmp('slider.UploadWindow').close();
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
            module: 'slider'
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
            qtip: '������� ��������'
        }, {
            iconCls: 'delete',
            qtip: '�������'
        }],
        widthIntercept: Ext.isSafari ? 4 : 2,
        id: 'actions'
    });
    RowAction.on({
        action: function(grid, record, action, row, col){
            if (action == 'delete') {
                Ext.MessageBox.confirm('', '�� ������� ��� ������ ������� ��� ����������', function(btn){
                    if (btn == "yes") {
                        Ext.Ajax.request({
                            url: 'admincp.php',
                            params: {
                                module: 'slider',
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
                        module: 'slider',
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
        
        
        id: 'slider.form.tabimages.grid',
        enableColLock: false,
        clicksToEdit: 1,
        height: 290,
        frame: true,
        loadMask: true,
        autoWidth: true,
        listeners: {
            "afteredit": function(oGrid_event){
                Ext.Ajax.request({
                    waitMsg: '���������� ���������...',
                    url: 'admincp.php',
                    params: {
                        xaction: "UpdateImagePos",
                        id: oGrid_event.record.data.id,
                        module: 'slider',
                        pos: oGrid_event.record.data.pos
                    },
                    success: function(response){
                        var result = eval(response.responseText);
                        switch (result) {
                            case 33:
                                Ext.getCmp('slider.form.tabimages.grid').store.commitChanges();
                                
                                break;
                            default:
                                Ext.MessageBox.alert('������', '�� �������� ��������� ���������...');
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
                return "<center><img src='files/slider/" + value + "' width='80'></center>";
            }
        }, {
            id: 'file',
            header: "����",
            width: 150,
            sortable: true,
            dataIndex: 'file'
        }, {
            header: "���.",
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
                    return "<b>��������</b>";
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
            text: '��������� ����� ����������',
            handler: function(){
                UploadPhoto();
                
            },
            iconCls: 'add'
        }]
    
    
    });
    
    
    var form = new Ext.FormPanel({
        id: 'slider.form',
        width: 890,
        height:290,
        frame: true,
        labelAlign: 'top',
        items: [{
            xtype: 'tabpanel',
            activeItem: 0,
            defaults: {
                frame: true,
                width: 800,
                height: 290,
                bodyStyle: 'padding:10px;'
            },
            items: [{
                title: '��������',
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
                            fieldLabel: '��������',
                            name: 'name',
                            anchor: '95%'
                        }]
                    }]
                }, {
					xtype:'textfield',
					name:'pageLink',
					fieldLabel:'������ �� ������',
					anchor:'95%'
				}, {
                    xtype: 'hidden',
                    name: 'id'
                }]
            }, {
                id: 'slider.form.tabimages',
                disabled: true,
                height: 290,
                layout: 'fit',
                title: '����������',
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
        height: 400,
        frame: true,
        layout:'fit',
        constrainHeader: true,
        closeAction: 'close',
        modal: true,
        id: 'slider.WindowAddEdit',
        items: [form],
        listeners: {
            "show": function(){
                if (id == 0) {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        waitMsg: '��������� ����������',
						method:'POST',
                        params: {
                            module: 'slider',
                            task: 'NewItem'
                        },
                        success: function(response){
                            Ext.getCmp('slider.form.tabimages').enable(true);
                            var o = eval(response.responseText);
                            Ext.getCmp('slider.form').getForm().findField('id').setValue(o);
                            base.baseParams = {
                                xaction: "Listing_Images",
                                module: 'slider',
                                dd: o
                            };
                        }
                    });
                }
                else {
                    base.baseParams = {
                        xaction: "Listing_Images",
                        module: 'slider',
                        dd: id
                    };
                    Ext.getCmp('slider.form.tabimages').enable(true);
                }
            }
        },
        buttonAlign: 'right',
        buttons: [{
            text: '���������',
            iconCls: 'accept',
            handler: function(){
                Ext.ux.TinyMCE.initTinyMCE();
                tinyMCE.triggerSave();
                form.getForm().submit({
                    url: 'admincp.php',
					method:'POST',
                    params: {
                        module: 'slider',
                        task: 'save'
                    },
                    waitMsg: '���������� ���������',
                    success: function(){
                        Ext.getCmp('slider.WindowAddEdit').close();
                        slider.base.reload();
                        
                    }
                });
            }
        }]
    }).show();
}


slider.base = new Ext.data.Store({

    proxy: new Ext.data.HttpProxy({
        url: 'admincp.php',
        method: 'POST'
    }),
    baseParams: {
        xaction: "Listing",
        module: 'slider'
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
        name: 'name',
        mapping: 'name'
    }, {
        name: 'pageLink',
        mapping: 'pageLink'
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
    }])

});





// PagingBar for articlegrid
slider.pagingBar = new Ext.PagingToolbar({
    pageSize: 25,
    store: slider.base,
    paramNames: {
        start: 'start',
        limit: 'limit'
    },
    displayInfo: true


});
// End
// ArtclisRowAction

slider.RowAction = new Ext.ux.grid.RowActions({

    actions: [{
        iconCls: 'delete',
        qtip: '�������'
    }, {
        iconCls: 'edit',
        qtip: '�������������'
    }],
    widthIntercept: Ext.isSafari ? 4 : 2,
    id: 'actions'
});
slider.RowAction.on({
    action: function(grid, record, action, row, col){
        if (action == 'delete') {
            Ext.MessageBox.confirm('', '�� ������� ��� ������ ������� ��� ������', function(btn){
                if (btn == "yes") {
                    Ext.Ajax.request({
                        url: 'admincp.php',
                        params: {
                            module: 'slider',
                            task: 'deleteItem',
                            id: record.data.id
                        },
                        method: 'post',
                        success: function(){
                            slider.base.reload();
                        }
                    });
                }
            })
        }
        if (action == 'edit') {
        
            slider.addedit(record.data.id);
            Ext.getCmp('slider.form').getForm().loadRecord(record)
            
        }
    }
});
slider.grid = new Ext.grid.EditorGridPanel({
    store: slider.base,
    title: '',
    frame: true,
    loadMask: true,
    id: 'slider.grid',
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
        header: "���.",
        width: 20,
        sortable: false,
        dataIndex: 'pos',
        editor: new Ext.form.TextField
    }, {
        id: 'name',
        header: "���������",
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
                data: [['1', '��������'], ['0', '�� ��������']]
            }),
            mode: 'local',
            displayField: 'partyName',
            valueField: 'partyValue',
            lazyRender: true,
            listClass: 'x-combo-list-small'
        }),
        renderer: function(value){
            if (value == 1) {
                return "��������";
            }
            return "�� ��������";
        }
        
    }, slider.RowAction],
    
    sm: new Ext.grid.RowSelectionModel({
        singleSelect: true
    }),
    viewConfig: {
        forceFit: true
    },
    height: 150,
    bbar: slider.pagingBar,
    plugins: slider.RowAction,
    iconCls: 'icon-grid',
    split: true,
    tbar: [{
        text: '�������� ����� ������',
        handler: function(){
        
            slider.addedit(0);
            
            
        },
        iconCls: 'add'
    }],
    region: 'center'

});

slider.grid.on('afteredit', slider.updateRecord);


// End articleGrid

slider.view = {
    id: 'slider',
    title: '�������',
    layout: 'fit',
    
    items: [slider.grid]
}
init_modules[init_modules.length] = slider.view;
init_nav_modules[init_nav_modules.length] = {
    text: '�������',
    iconCls: 'pages',
    handler: function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'slider') {
            Ext.getCmp('Content').layout.setActiveItem('slider');
            if (slider.base.data.length < 1) {
                slider.base.load({
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
    'slider': function(){
        if (Ext.getCmp('Content').layout.activeItem.id != 'slider') {
            Ext.getCmp('Content').layout.setActiveItem('slider');
            if (slider.base.data.length < 1) {
                slider.base.load({
                    params: {
                        start: 0,
                        limit: 25
                    }
                });
            };
            
                    }
    }
});
ModulesRightMenu += '<li><img src="core/icons/osn.png"/><a id="slider" href="#">�������</a></li>';
