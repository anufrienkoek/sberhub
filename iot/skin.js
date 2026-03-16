// Garden Gnome Software - Skin
// Pano2VR 5.2.4/15996
// Filename: silhouette_cardboard.ggsk
// Generated Чт ноя 6 10:52:56 2025

function pano2vrSkin(player,base) {
	var ggSkinVars = [];
	ggSkinVars['ht_ani'] = false;
	var me=this;
	var flag=false;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=me.player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this._crosshair=document.createElement('div');
		this._crosshair__img=document.createElement('img');
		this._crosshair__img.className='ggskin ggskin_image';
		this._crosshair__img.setAttribute('src',basePath + 'images/crosshair.png');
		this._crosshair__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._crosshair__img.className='ggskin ggskin_image';
		this._crosshair__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._crosshair__img);
		this._crosshair.appendChild(this._crosshair__img);
		this._crosshair.ggId="crosshair";
		this._crosshair.ggLeft=-2;
		this._crosshair.ggTop=-2;
		this._crosshair.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._crosshair.ggVisible=true;
		this._crosshair.className='ggskin ggskin_image ';
		this._crosshair.ggType='image';
		hs ='';
		hs+='height : 5px;';
		hs+='left : -2px;';
		hs+='position : absolute;';
		hs+='top : -2px;';
		hs+='visibility : inherit;';
		hs+='width : 5px;';
		hs+='pointer-events:auto;';
		this._crosshair.setAttribute('style',hs);
		this._crosshair.style[domTransform + 'Origin']='50% 50%';
		me._crosshair.ggIsActive=function() {
			return false;
		}
		me._crosshair.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._crosshair.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this.divSkin.appendChild(this._crosshair);
		this._ht_node_timer=document.createElement('div');
		this._ht_node_timer.ggTimestamp=this.ggCurrentTime;
		this._ht_node_timer.ggLastIsActive=true;
		this._ht_node_timer.ggTimeout=500;
		this._ht_node_timer.ggId="ht_node_timer";
		this._ht_node_timer.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._ht_node_timer.ggVisible=true;
		this._ht_node_timer.className='ggskin ggskin_timer ';
		this._ht_node_timer.ggType='timer';
		hs ='';
		hs+='height : 32px;';
		hs+='left : 62px;';
		hs+='position : absolute;';
		hs+='top : 23px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		this._ht_node_timer.setAttribute('style',hs);
		this._ht_node_timer.style[domTransform + 'Origin']='50% 50%';
		me._ht_node_timer.ggIsActive=function() {
			return (me._ht_node_timer.ggTimestamp==0 ? false : (Math.floor((me.ggCurrentTime - me._ht_node_timer.ggTimestamp) / me._ht_node_timer.ggTimeout) % 2 == 0));
		}
		me._ht_node_timer.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._ht_node_timer.ggActivate=function () {
			ggSkinVars['ht_ani'] = true;
		}
		this._ht_node_timer.ggDeactivate=function () {
			ggSkinVars['ht_ani'] = false;
		}
		this._ht_node_timer.ggUpdatePosition=function (useTransition) {
		}
		this.divSkin.appendChild(this._ht_node_timer);
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.ggHotspotCallChildFunctions=function(functionname) {
		var stack = me.player.getCurrentPointHotspots();
		while (stack.length > 0) {
			var e = stack.pop();
			if (typeof e[functionname] == 'function') {
				e[functionname]();
			}
			if(e.hasChildNodes()) {
				for(var i=0; i<e.childNodes.length; i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	this.changeActiveNode=function(id) {
		me.ggUserdata=me.player.userdata;
		me.ggHotspotCallChildFunctions('ggNodeChange');
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		me.ggCurrentTime=new Date().getTime();
		if (me._ht_node_timer.ggLastIsActive!=me._ht_node_timer.ggIsActive()) {
			me._ht_node_timer.ggLastIsActive=me._ht_node_timer.ggIsActive();
			if (me._ht_node_timer.ggLastIsActive) {
				ggSkinVars['ht_ani'] = true;
			} else {
				ggSkinVars['ht_ani'] = false;
			}
		}
		me.ggHotspotCallChildFunctions('ggUpdateConditionTimer');
	};
	function SkinHotspotClass(skinObj,hotspot) {
		var me=this;
		var flag=false;
		this.player=skinObj.player;
		this.skin=skinObj;
		this.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		this.ggUserdata=this.skin.player.getNodeUserdata(nodeId);
		this.elementMouseDown=[];
		this.elementMouseOver=[];
		
		this.findElements=function(id,regex) {
			return me.skin.findElements(id,regex);
		}
		
		{
			this.__div=document.createElement('div');
			this.__div.ggId="ht_node";
			this.__div.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this.__div.ggVisible=true;
			this.__div.className='ggskin ggskin_hotspot ';
			this.__div.ggType='hotspot';
			hs ='';
			hs+='height : 5px;';
			hs+='left : 78px;';
			hs+='position : absolute;';
			hs+='top : 39px;';
			hs+='visibility : inherit;';
			hs+='width : 5px;';
			hs+='pointer-events:auto;';
			this.__div.setAttribute('style',hs);
			this.__div.style[domTransform + 'Origin']='50% 50%';
			me.__div.ggIsActive=function() {
				return me.player.getCurrentNode()==this.ggElementNodeId();
			}
			me.__div.ggElementNodeId=function() {
				return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
			}
			this.__div.onclick=function (e) {
				me.player.openUrl(me.hotspot.url,me.hotspot.target);
				me.skin.hotspotProxyClick(me.hotspot.id);
			}
			this.__div.onmouseover=function (e) {
				me.player.setActiveHotspot(me.hotspot);
				me._tt_ht_node.style[domTransition]='none';
				me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
				me._tt_ht_node.ggVisible=true;
				me.elementMouseOver['_div']=true;
				me.skin.hotspotProxyOver(me.hotspot.id);
			}
			this.__div.onmouseout=function (e) {
				me.player.setActiveHotspot(null);
				me._tt_ht_node.style[domTransition]='none';
				me._tt_ht_node.style.visibility='hidden';
				me._tt_ht_node.ggVisible=false;
				me.elementMouseOver['_div']=false;
				me.skin.hotspotProxyOut(me.hotspot.id);
			}
			this.__div.ontouchend=function (e) {
				me.elementMouseOver['_div']=false;
			}
			this.__div.ggUpdatePosition=function (useTransition) {
			}
			this._tt_ht_node=document.createElement('div');
			this._tt_ht_node__text=document.createElement('div');
			this._tt_ht_node.className='ggskin ggskin_textdiv';
			this._tt_ht_node.ggTextDiv=this._tt_ht_node__text;
			this._tt_ht_node.ggId="tt_ht_node";
			this._tt_ht_node.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._tt_ht_node.ggVisible=false;
			this._tt_ht_node.className='ggskin ggskin_text ';
			this._tt_ht_node.ggType='text';
			hs ='';
			hs+='z-index: 100;';
			hs+='height : 20px;';
			hs+='left : -50px;';
			hs+='position : absolute;';
			hs+='top : 21px;';
			hs+='visibility : hidden;';
			hs+='width : 98px;';
			hs+='pointer-events:auto;';
			this._tt_ht_node.setAttribute('style',hs);
			this._tt_ht_node.style[domTransform + 'Origin']='50% 50%';
			hs ='position:absolute;';
			hs+='cursor: default;';
			hs+='left: 0px;';
			hs+='top:  0px;';
			hs+='width: auto;';
			hs+='height: auto;';
			hs+='background: #000000;';
			hs+='background: rgba(0,0,0,0.666667);';
			hs+='border: 0px solid #000000;';
			hs+='color: rgba(255,255,255,1);';
			hs+='text-align: center;';
			hs+='white-space: nowrap;';
			hs+='padding: 2px 5px 2px 5px;';
			hs+='overflow: hidden;';
			this._tt_ht_node__text.setAttribute('style',hs);
			this._tt_ht_node__text.innerHTML=me.hotspot.title;
			this._tt_ht_node.appendChild(this._tt_ht_node__text);
			me._tt_ht_node.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._tt_ht_node.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._tt_ht_node.ggCurrentLogicStateVisible = -1;
			this._tt_ht_node.ggUpdateConditionTimer=function () {
				var newLogicStateVisible;
				if (
					(me.elementMouseOver['_div'] == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._tt_ht_node.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._tt_ht_node.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._tt_ht_node.style[domTransition]='';
					if (me._tt_ht_node.ggCurrentLogicStateVisible == 0) {
						me._tt_ht_node.style.visibility=(Number(me._tt_ht_node.style.opacity)>0||!me._tt_ht_node.style.opacity)?'inherit':'hidden';
						me._tt_ht_node.ggVisible=true;
					}
					else {
						me._tt_ht_node.style.visibility="hidden";
						me._tt_ht_node.ggVisible=false;
					}
				}
			}
			this._tt_ht_node.ggUpdatePosition=function (useTransition) {
				this.style[domTransition]='none';
				this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
			}
			this.__div.appendChild(this._tt_ht_node);
			this._ht_node_image=document.createElement('div');
			this._ht_node_image__img=document.createElement('img');
			this._ht_node_image__img.className='ggskin ggskin_svg';
			this._ht_node_image__img.setAttribute('src',basePath + 'images/ht_node_image.svg');
			this._ht_node_image__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._ht_node_image__img['ondragstart']=function() { return false; };
			this._ht_node_image.appendChild(this._ht_node_image__img);
			this._ht_node_image.ggId="ht_node_image";
			this._ht_node_image.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._ht_node_image.ggVisible=true;
			this._ht_node_image.className='ggskin ggskin_svg ';
			this._ht_node_image.ggType='svg';
			hs ='';
			hs+='cursor : pointer;';
			hs+='height : 32px;';
			hs+='left : -16px;';
			hs+='position : absolute;';
			hs+='top : -16px;';
			hs+='visibility : inherit;';
			hs+='width : 32px;';
			hs+='pointer-events:auto;';
			this._ht_node_image.setAttribute('style',hs);
			this._ht_node_image.style[domTransform + 'Origin']='50% 50%';
			me._ht_node_image.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._ht_node_image.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._ht_node_image.ggCurrentLogicStateScaling = -1;
			me._ht_node_image.ggCurrentLogicStateVisible = -1;
			this._ht_node_image.ggUpdateConditionTimer=function () {
				var newLogicStateScaling;
				if (
					(ggSkinVars['ht_ani'] == true)
				)
				{
					newLogicStateScaling = 0;
				}
				else {
					newLogicStateScaling = -1;
				}
				if (me._ht_node_image.ggCurrentLogicStateScaling != newLogicStateScaling) {
					me._ht_node_image.ggCurrentLogicStateScaling = newLogicStateScaling;
					me._ht_node_image.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms';
					if (me._ht_node_image.ggCurrentLogicStateScaling == 0) {
						me._ht_node_image.ggParameter.sx = 1.1;
						me._ht_node_image.ggParameter.sy = 1.1;
						me._ht_node_image.style[domTransform]=parameterToTransform(me._ht_node_image.ggParameter);
					}
					else {
						me._ht_node_image.ggParameter.sx = 1;
						me._ht_node_image.ggParameter.sy = 1;
						me._ht_node_image.style[domTransform]=parameterToTransform(me._ht_node_image.ggParameter);
					}
				}
			}
			this._ht_node_image.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.nodeVisited(me._ht_node_image.ggElementNodeId()) == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._ht_node_image.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._ht_node_image.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._ht_node_image.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms';
					if (me._ht_node_image.ggCurrentLogicStateVisible == 0) {
						me._ht_node_image.style.visibility="hidden";
						me._ht_node_image.ggVisible=false;
					}
					else {
						me._ht_node_image.style.visibility=(Number(me._ht_node_image.style.opacity)>0||!me._ht_node_image.style.opacity)?'inherit':'hidden';
						me._ht_node_image.ggVisible=true;
					}
				}
			}
			this._ht_node_image.ggUpdatePosition=function (useTransition) {
			}
			this._ht_node_image.ggNodeChange=function () {
				me._ht_node_image.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._ht_node_image);
			this._ht_node_image_visited=document.createElement('div');
			this._ht_node_image_visited__img=document.createElement('img');
			this._ht_node_image_visited__img.className='ggskin ggskin_svg';
			this._ht_node_image_visited__img.setAttribute('src',basePath + 'images/ht_node_image_visited.svg');
			this._ht_node_image_visited__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
			this._ht_node_image_visited__img['ondragstart']=function() { return false; };
			this._ht_node_image_visited.appendChild(this._ht_node_image_visited__img);
			this._ht_node_image_visited.ggId="ht_node_image_visited";
			this._ht_node_image_visited.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
			this._ht_node_image_visited.ggVisible=false;
			this._ht_node_image_visited.className='ggskin ggskin_svg ';
			this._ht_node_image_visited.ggType='svg';
			hs ='';
			hs+='height : 32px;';
			hs+='left : -16px;';
			hs+='position : absolute;';
			hs+='top : -16px;';
			hs+='visibility : hidden;';
			hs+='width : 32px;';
			hs+='pointer-events:auto;';
			this._ht_node_image_visited.setAttribute('style',hs);
			this._ht_node_image_visited.style[domTransform + 'Origin']='50% 50%';
			me._ht_node_image_visited.ggIsActive=function() {
				if ((this.parentNode) && (this.parentNode.ggIsActive)) {
					return this.parentNode.ggIsActive();
				}
				return false;
			}
			me._ht_node_image_visited.ggElementNodeId=function() {
				if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
					return this.parentNode.ggElementNodeId();
				}
				return me.ggNodeId;
			}
			me._ht_node_image_visited.ggCurrentLogicStateScaling = -1;
			me._ht_node_image_visited.ggCurrentLogicStateVisible = -1;
			this._ht_node_image_visited.ggUpdateConditionTimer=function () {
				var newLogicStateScaling;
				if (
					(ggSkinVars['ht_ani'] == true)
				)
				{
					newLogicStateScaling = 0;
				}
				else {
					newLogicStateScaling = -1;
				}
				if (me._ht_node_image_visited.ggCurrentLogicStateScaling != newLogicStateScaling) {
					me._ht_node_image_visited.ggCurrentLogicStateScaling = newLogicStateScaling;
					me._ht_node_image_visited.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms';
					if (me._ht_node_image_visited.ggCurrentLogicStateScaling == 0) {
						me._ht_node_image_visited.ggParameter.sx = 1.1;
						me._ht_node_image_visited.ggParameter.sy = 1.1;
						me._ht_node_image_visited.style[domTransform]=parameterToTransform(me._ht_node_image_visited.ggParameter);
					}
					else {
						me._ht_node_image_visited.ggParameter.sx = 1;
						me._ht_node_image_visited.ggParameter.sy = 1;
						me._ht_node_image_visited.style[domTransform]=parameterToTransform(me._ht_node_image_visited.ggParameter);
					}
				}
			}
			this._ht_node_image_visited.ggUpdateConditionNodeChange=function () {
				var newLogicStateVisible;
				if (
					(me.player.nodeVisited(me._ht_node_image_visited.ggElementNodeId()) == true)
				)
				{
					newLogicStateVisible = 0;
				}
				else {
					newLogicStateVisible = -1;
				}
				if (me._ht_node_image_visited.ggCurrentLogicStateVisible != newLogicStateVisible) {
					me._ht_node_image_visited.ggCurrentLogicStateVisible = newLogicStateVisible;
					me._ht_node_image_visited.style[domTransition]='' + cssPrefix + 'transform 500ms ease 0ms';
					if (me._ht_node_image_visited.ggCurrentLogicStateVisible == 0) {
						me._ht_node_image_visited.style.visibility=(Number(me._ht_node_image_visited.style.opacity)>0||!me._ht_node_image_visited.style.opacity)?'inherit':'hidden';
						me._ht_node_image_visited.ggVisible=true;
					}
					else {
						me._ht_node_image_visited.style.visibility="hidden";
						me._ht_node_image_visited.ggVisible=false;
					}
				}
			}
			this._ht_node_image_visited.ggUpdatePosition=function (useTransition) {
			}
			this._ht_node_image_visited.ggNodeChange=function () {
				me._ht_node_image_visited.ggUpdateConditionNodeChange();
			}
			this.__div.appendChild(this._ht_node_image_visited);
			this.hotspotTimerEvent=function() {
				setTimeout(function() { me.hotspotTimerEvent(); }, 10);
				if (me.elementMouseOver['_div']) {
				}
				me._tt_ht_node.ggUpdateConditionTimer();
				me._ht_node_image.ggUpdateConditionTimer();
				me._ht_node_image_visited.ggUpdateConditionTimer();
			}
			this.hotspotTimerEvent();
		}
	};
	this.addSkinHotspot=function(hotspot) {
		return new SkinHotspotClass(me,hotspot);
	}
	this.addSkin();
};