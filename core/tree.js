function ShopImage(data, style, bg){
	//Ext.get('images').setStyle('height', bg+'px');
	Ext.DomHelper.overwrite('images', {
		tag: 'img', src: "/image.php?image="+data, style:'visibility:hidden;border:2px solid #FFFFFF; '+style+';'
	}, true).show(true).highlight();
};
/*
Ext.onReady(function(){
	var tree = Ext.select('.tree-x');

	tree.on({'click':function(e,d){
		if (d.id =="")
		{
			d.id = Ext.id();
		}
		var parent_li = d.id;
		parent_l = Ext.get(parent_li);
		if (parent_l.hasActiveFx() == null)
		{
			if (parent_l.hasClass('exp'))
			{
				parent_l.replaceClass('exp', 'op');
			}
			else
			{
				parent_l.replaceClass('op', 'exp');
			}
			var nodes = parent_l.select('.tree-x-ct');

			for(i=0; i<nodes.getCount(); i++)
			{

				if (nodes.item(i).dom.id == "")
				{
					nodes.item(i).dom.id = Ext.id();
				}
				var id = nodes.item(i).dom.id
				var node = Ext.get(id);
				var find = Ext.get(id).parent('li').id;
				if (parent.li != id)
				{
					if (parent_li == find)
					{
						if (nodes.item(i).hasClass('close'))
						{
							if (!nodes.item(i).isVisible())
							{

								nodes.item(i).replaceClass('close', 'open').setStyle('display', 'block');

							}

						}
						else if (nodes.item(i).hasClass('open'))
						{

							if (nodes.item(i).isVisible())
							{
								nodes.item(i).replaceClass('open', 'close').setStyle('display', 'none');
							}
						}
					}
				}

				parent_l.stopFx();
				parent_l.pause(0.5);
			}
		}
		else
		{

			parent_l.stopFx();
		}
	}});
});*/