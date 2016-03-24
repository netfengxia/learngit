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
	},
	getBox:fucntion(contentBox, local){
		var xy;
		if(!local){
			xy = this.getXY();
		}else{
			var left = parseInt(this.getStyle('left'), 10) || 0;
			var top = parseInt(this.getStyle('top'), 10) || 0;
			xy = [left, top];
		}

		if(!contentBox){
			bx = {x:xy[0], y:xy[1],
					0:xy[0], 1:xy[1],
					width: w, height: h
			};
		}else{
			var l = this.getBorderWidth('l')+this.getPadding('l');
			var r = this.getBorderWidth('r') + this.getPadding('r');
			var t = this.getBorderWidth('t') + this.getPadding('t');
			var b = this.getBorderWidth('b') + this.getPadding('b');
			bx = {
				x:xy[0] + l, y:xy[1]+t,
				0:xy[0] + l, 1:xy[1]+t,
				width: w-(r+l), height: h-(t+b)
			};
			bx.right = bx.x + bx.width;
			bx.bottom = bx.y + bx.height;
		}
		return bx;
	},
	start:function(e, t, o){
		e.stopEvent();
		this.startBox = this.el.getBox();
		this.scale = this.startBox.width / this.startBox.height;
		this.startPoint = e.getXY();
		this.curPos = o.pos;
		this.curBox = this.startBox;
		this.dragBegin = true;
		Ext.get(document).on('mouseove', this.onMouseMove, this);
		Ext.get(document).on('mouseup', this.onMouseUp, this);
	},
	onMouseMove:function(e,t,o){
		if(this.dragBegin == true){
			e.stopEvent();
			this.nowPoint = e.getXY();		// 这里的e是一个Ext JS的EventObject,其getXY()函数返回就是针对页面左上角的坐标值.
			var dXY = {
				x:this.nowPoint[0] - this.startPoint[0],
				y:this.nowPoint[1] - this.startPoint[1]
			};

			var resizeFn = this.dragPos[this.curPos].createDelegate(this);
			var nb = resizeFn(this.curBox, dXY);
			nb? this.resizeElement(nb) : '';
		}
	},
	resizeElement : function(nb){
		this.setPagePosition(nb.x, nb.y);
		this.setSize(nb.width, nb.height);
		this.onSize(nb, this);
	}
});