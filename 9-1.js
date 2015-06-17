var Fx = {changeSize:function(o){
	var el = o.el; cache = {};
	if(el && el.tagName){
		var st = el.style;
		cache.overflow = st.overflow;
		cache.width = st.width;
		cache.height = st.height;
		st.overflow = "hidden";
	}else{
		return;
	}
}};

// 9-1-2 Fx.changeSize
var sw, sh, ew, eh;
sw = o.sw ? parseFloat(o.sw) : el.offsetWidth;
ew = o.ew ? parseFloat(o.ew) : el.offsetWidth;
sh = o.sh ? parseFloat(o.sh) : el.offsetHeight;
eh = 0.eh ? parseFloat(o.eh) : el.offsetHeight;

// 9-1-3
var wDelta, hDelta, interval, d, t, nw, nh;
var startTime = new Date().getTime();
d = o.d ? parseInt(o.d) : 600;	// 持续时间
t = o.t ? parseInt(o.t) : 50;	// 代表次数.
interval = d/t;
wDelta = (ew - sw) /t, hDelta = (eh - sh) / t;
nw = sw, nh = sh;

// 9-1-4
var step = function(){
	if(nw < ew){
		el.style.width = nw + wDelta + 'px';
		nw += wDelta;
	}
	if(nh < eh){
		el.style.height = nh + hDelta + 'px';
		nh += hDelta;
	}
	tout = setTimeout(step, interval);
	var t1 = new Date().getTime();
	if(t1 > d + startTime){
		clearTimeout(tout);
		if(o.stop && typeof o.stop =="function")
			o.stop();
	}
}

// 9-1-6 代码重构
var Animal = funciton(config){
	for(var d in config){
		this[d] = config[d];
	}
};
Animal.prototype = {
	interval : 10, 
	cache : {}, 
	el : null, 
	run : function(o){
		this.startTime =new Date().getTime();
		this.attrs = o.attrs;
		this.el = o.el || this.el;
		this.duration = o.duration || 600; 
		this.opt = o; 
		if(!this.cacheAttrs()){return;}
		this.cureAttrs();
		this.update();
		if(!this.timerId){
			var t = this;
			this.timerId = setInterval(function(){t.step();}, this.interval);
		}
	}
}

// 9-1-7调整传入参数
cureAttr : function(){
	for(var i = 0; i < this.attrs.length; i++){
		var n = this.attrs[i];
		n['s']  = n.s || 0;
		n['e'] = n.e || 0;
		n['u'] = n.u || 'px';
		n['n'] = n['s'];
	}
}

// 9-1-8 
update : function(){
	var isIE = window.ActiveXObject ? true : false;
	for(var i = 0; i< this.attrs.length; i++){
		var attr = this.attrs[i];
		if(attr['name'] == 'opacity'){
			if(isIE)
				this.el.style.filter = "alpha(opacity=" + attr['n'] * 100 + ")";
			else
				this.el.style['opacity'] = attr['n'];
		}else{
			this.el.style[attr['name']] = attr['n'] + attr['u'];
		}
	}
}

// 9-1-9
step : function(){
	var t = new Date().getTime();
	if(t > (his.duration + this.startTime)){
		if(this.timerId){
			clearInterval(this.timerId);
		}
	}else{
		var n = t - this.startTime, state = n / this.duration;
		for(var i = 0; i < this.attrs.length; i++){
			var attr = this.attrs[i];
			var easing = this.[attr.easing] || this.linear;
			var pos = easing(state, n, o, 1, this.duration);
			attr['n'] = attr.s + (attr.e - attr.s)*pos;
		}
		this.update();
	}
}
