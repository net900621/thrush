fml.define('page/banner', ['jquery'], function(require, exports) {
	// JavaScript Document
	function startMove(obj,json,endFn){
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in json){
				var iCur = 0;
				if(attr == 'opacity'){
					if(Math.round(parseFloat(getStyle(obj,attr))*100)==0){
					iCur = Math.round(parseFloat(getStyle(obj,attr))*100);
					
					}
					else{
						iCur = Math.round(parseFloat(getStyle(obj,attr))*100) || 100;
					}	
				}
				else{
					iCur = parseInt(getStyle(obj,attr)) || 0;
				}
				var iSpeed = (json[attr] - iCur)/8;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=json[attr]){
					bBtn = false;
				}
				if(attr == 'opacity'){
					obj.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					obj.style.opacity = (iCur + iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur + iSpeed + 'px';
				}
			}
			
			if(bBtn){
				clearInterval(obj.timer);
				
				if(endFn){
					endFn.call(obj);
				}
			}
			
		},30);
	}
	
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return getComputedStyle(obj,false)[attr];
		}
	}

	var DOC = document
	window.onload = function(){
		var oUl = DOC.querySelector('.banner-slider-wrap')
			,li_Ul = oUl.querySelectorAll('li')
			,oOl = DOC.querySelector('.banner-slider-point')
			,li_Ol = oOl.querySelectorAll('li')
			,oBox = DOC.querySelector('#banner')
		/**
		 * 在IE6，IE7，IE8， IE9以及最新的的FF, 
		 * Chrome中，对于一般元素
		 * 都是offsetHeight = padding + height + border = clientHeight + 滚动条 + 边框。
		 */
		var oneHeight = li_Ul[0].offsetHeight
			,len = len = li_Ol.length
			,iNow = 0
			,iNow2 = 0
			,timer = null
		

		for (var i = 0; i < len; i++) {
			li_Ol[i].index = i;
			// console.log()
			li_Ol[i].onmouseover = function(){
				for (var i = 0; i < len; i++) {
					li_Ol[i].className = ''
				};
				this.className = 'active'
				iNow = this.index
				iNow2 = this.index

				startMove(oUl,{'top' : - iNow * oneHeight})
			}

		};

		timer = setInterval(toRun,2000)

		oBox.onmouseover = function(){
			clearInterval(timer)
		}
		oBox.onmouseout = function(){
			timer = setInterval(toRun,2000)
		}
		

		function toRun(){
			/**
			 * 无缝滚动思路：
			 * 当滚动到最后一个元素，将第一个元素relative定位
			 * 到最后一个元素的后面
			 * 当到第一个元素的时候，将定位还原，top=0
			 */
			
			if(iNow == 0){
				li_Ul[0].style.cssText = "position:static;";
				oUl.style.top = 0;
				iNow2 = 0;	
			}
			
			//滚到最后一张图
			if(iNow == len - 1){
				iNow = 0
				li_Ul[0].style.cssText = "position:relative; top:" + len * oneHeight + "px;"
			}else{
				iNow++
			}

			iNow2++;


			for (var i = 0; i < len; i++) {
				li_Ol[i].className = ''
			};
			li_Ol[iNow].className = 'active'

			startMove(oUl,{'top' : - iNow2 * oneHeight})

		}
	}


});