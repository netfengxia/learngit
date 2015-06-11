Ext.ux.resizeSpot = Ext.extend(Ext.BoxComponent,{
	spots:'tl,tr, tc, rc,lc, bl, br, bc', 
	transparent: false, 
	width : 100, 
	height: 60,
	onRender : function(ct, position){
		Ext.ux.resizeSpot.superClass.onRender.call(this, ct, position);
		this.createEl(ct);
		this.el.position();
		this.createSpots();
		this.el.unselectable();
	},
	createSpots:function(){
		var spotEls = this.getSpots();
		this.spotEls = {};
		for(var i = 0, len = spotEls.length; i < len; i++){
			var pos = spotEls[i];
			if(pos && this.dragPos[pos]){
				this.spotEls[pos] = this.createSpot(pos);
			}
		}
	},
	createSpot : function(pos){
		var el = Ext.DomHelper.append(this.el, {tag:'div'}, true);
		el.addClass(['dragEl', 'dragEl-'+pos]);
		this.transparent ? el.setOpacity(0) : '';
		el.on('mousedown', this.start, this, {pos:pos});
		return Ext.get(el);
	},
	getSpots : function(){
		return this.spots.split(/\s*?[,;]\s*?| /);
	},
	createEl:function(ct){	//ct, container, 这里指的是可拖曳改变大小的选择框元素
		if(!this.el){
			this.el = ct.createChild({style:'border:1px solid;background:#fff;'});
		}
		this.el.setSize(this.width, this.height);
		this.el = ext.get(this.el);
	}
});