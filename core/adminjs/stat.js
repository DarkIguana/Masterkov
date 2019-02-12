function stat()
{


	
	var admin_loginsbase = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_admin_login", module:'stat'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'ip', mapping: 'ip'},
	{name: 'time', mapping: 'time'},

	{name: 'city', mapping: 'city'},
	{name: 'region', mapping: 'region'},
	{name: 'stat', mapping: 'stat'},
	{name: 'comment', mapping: 'comment'},
	

	])
});
	var admin_loginpagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: admin_loginsbase,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	admin_loginsbase.load({params:{start:0, limit:25}});
	var admin_logingrid = new Ext.grid.EditorGridPanel({
		store: admin_loginsbase,
		//title: '�������',
		frame:true,
		
		height:480,
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{header: "IP �����", width: 50, sortable: true, dataIndex: 'ip'},
		{header: "����", width: 50, sortable: true, dataIndex: 'time'},
		{ header: "�����", width: 50, sortable: true, dataIndex: 'city'},
		{ header: "������", width: 50, sortable: true, dataIndex: 'region'},
		{ header: "����������", width: 50, sortable: true, dataIndex: 'comment'},

	
		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		iconCls:'icon-grid',
		split: true,
		bbar: admin_loginpagingBar
		

	});
	
	
	// ** �������
	var projectsbase = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_projects", module:'stat'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	{name: 'ip', mapping: 'ip'},
	{name: 'time', mapping: 'time'},
	{name: 'num_project', mapping: 'num_project'},
	{name: 'city', mapping: 'city'},
	{name: 'region', mapping: 'region'},
	{name: 'stat', mapping: 'stat'},
	{name: 'link', mapping: 'link'},
	{name: 'Active', type: 'int', mapping: 'active'}

	])
});

	var projectpagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: projectsbase,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	projectsbase.load({params:{start:0, limit:25}});
	var projectgrid = new Ext.grid.EditorGridPanel({
		store: projectsbase,
		//title: '�������',
		frame:true,
		
		height:480,
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{header: "IP �����", width: 50, sortable: true, dataIndex: 'ip'},
		{header: "����", width: 50, sortable: true, dataIndex: 'time'},
		{header: "����� �������", width: 50, sortable: true, dataIndex: 'num_project'},
		{ header: "�����", width: 50, sortable: true, dataIndex: 'city'},
		{ header: "������", width: 50, sortable: true, dataIndex: 'region'},
		{ header: "������ �� ������", width: 50, sortable: true, dataIndex: 'link'},

	
		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		iconCls:'icon-grid',
		split: true,
		bbar: projectpagingBar
		

	});
	
	
	
	/// ������ 2
	
	var project2sbase = new Ext.data.Store({
	proxy: new Ext.data.HttpProxy({
		url: 'admincp.php',
		method: 'POST'
	}),
	baseParams:{xaction: "Listing_project2s", module:'stat'},

	reader: new Ext.data.JsonReader({
		root: 'results',
		totalProperty: 'total',
		id: 'id'
	}, [
	
	{name: 'num_project', mapping: 'num_project'},
	{name: 'hosts', mapping: 'hosts'},
	{name: 'stat', mapping: 'stat'},
	{name: 'dbl', mapping: 'dbl'},
	{name: 'price', mapping: 'price'},
	{name: 'ob_pl', mapping: 'ob_pl'},
	{name: 'img', mapping: 'img'},
	{name: 'link', mapping: 'link'}
	

	])
});

	var project2pagingBar = new Ext.PagingToolbar({
		pageSize: 25,
		store: project2sbase,
		paramNames: {start: 'start', limit: 'limit'},
		displayInfo: true
	});
	project2sbase.load({params:{start:0, limit:25}});
	var project2grid = new Ext.grid.EditorGridPanel({
		store: project2sbase,
		//title: '�������',
		frame:true,
		
		height:480,
		enableColLock:false,
		clicksToEdit:1,
		autoWidth:true,
		columns: [
		{header: "", width: 80, sortable: true, dataIndex: 'img'},
		{header: "����� �������", width: 50, sortable: true, dataIndex: 'num_project'},
		{ header: "���. ��.", width: 50, sortable: true, dataIndex: 'ob_pl'},
		{ header: "����", width: 50, sortable: true, dataIndex: 'price'},
		{ header: "���-�� ������", width: 50, sortable: true, dataIndex: 'hosts'},
		{ header: "���-�� ����������", width: 50, sortable: true, dataIndex: 'stat'},
		{ header: "���-�� 2 ������", width: 50, sortable: true, dataIndex: 'dbl'},
		{ header: "������ �� ������", width: 50, sortable: true, dataIndex: 'link'},

	
		],

		sm: new Ext.grid.RowSelectionModel({singleSelect: true}),
		viewConfig: {
			forceFit: true
		},
		iconCls:'icon-grid',
		split: true,
		bbar: project2pagingBar
		

	});
	new Ext.Window({
		width: 1024,
		height:560,
		modal:true,
		items:[{
			xtype:'tabpanel',
			activeItem:0,
			items:[{
				title:'�� ��������',
				layout:'fit',
				items:[projectgrid]
			},{
				title:'������ ����������',
				layout:'fit',
				items:[admin_logingrid]
			},{
				title:'���������� ��������',
				layout:'fit',
				items:[project2grid]
			}]
		}]
	}).show();
}
Ext.apply(actions, {
'stat': function()
{
	stat();
}
});
ModulesRightMenuS+='<li><img src="core/icons/page_copy.png"/><a id="stat" href="#">����������</a></li>';