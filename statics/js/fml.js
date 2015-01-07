/*
*faster javascript module package manager
*@author enoch
*@create 2012.1
*/

(function(global , undefined){
  if(!window.console){
    window.console = {log:function(){}};
  }
   var options = {'sversion' :1 ,'deferHost' : '/','localNS' : '' , 'modulebase' : '/' , 'enableShort' : true}; 
   var _moduleCache = {};
   var AP = Array.prototype;
   var _moduleOnLoad = {};
   var _sciptsLoad = {};
   var _defer = false;
   var _scriptStack = [];
   var _scriptStackHash = {};
   var _urlModArr = {};
   var anonymousRef;
   var currentlyAddingScript,interactiveScript;
   var head = document.head  || document.getElementsByTagName('head')[0] || document.documentElement;
   var UA = navigator.userAgent;
    /*
    get running script src ,reserv to moduleid
    fix fucking ie,thanks to yubo
    */
   function getAnonymousId() {
        var runscript = getCurrentScript();
        var src = runscript.src;
        return _urlModArr[src];
    }
    function getCurrentScript () {
        if (currentlyAddingScript)    return currentlyAddingScript;

   // For IE6-9 browsers, the script onload event may
   // not fire right
   // after the the script is evaluated. Kris Zyp
   // found that it
   // could query the script nodes and the
   // one that is in "interactive"
   // mode indicates the current script.
   // Ref: http://goo.gl/JHfFW
      if (interactiveScript &&
           interactiveScript.readyState === 'interactive') {
            return interactiveScript;
         }    

     var scripts = head.getElementsByTagName('script');
     for (var i = 0; i < scripts.length; i++) {
         var script = scripts[i];
         if (script.readyState === 'interactive') {
             interactiveScript = script;
             return script;
            }    
        }    
    };

   //function is_func(func) { return Object.prototype.toString.call(func) == "[object Function]"; }
   function is_array(arr) { return Object.prototype.toString.call(arr) == "[object Array]"; } 
 
  /*
  *@param object {'localNs': , 'modulebase' : , 'defer': ,'deferHost':,}
  */

   function setOptions(sets) {
       for (var name in sets){
           if ('defer' == name)
                _defer = sets[name];
            else
                options[name] = sets[name];
           }
       }
    
    /*
    *load module 
    *@param string path/a
    *@param function callback
    */
   function loadModule(moduleName , fn ){
        var scriptUrl;
        var moduleId = getIdFromId(moduleName);
        if (_moduleCache.hasOwnProperty(moduleId) ) {
			var mod = _moduleCache[moduleId];
            fn && fn.call(mod , mod);    
            return ;
            }

         var ns = '',i;
         var host = options.modulebase;
         if ( i = moduleName.indexOf(':')) {
             ns = moduleName.substr(0, i); 
             moduleName = moduleName.substr(i+1);
            if (options.nsmap && options.nsmap.hasOwnProperty(ns) ){
                host = 'http://' + options.nsmap[ns].host;
                }    
             }
         if (_defer) {
			if (!_scriptStackHash.hasOwnProperty(moduleName) ) {
                 _scriptStackHash[moduleName] = true;
                 _scriptStack.push(moduleName); 
			}       
         }else {
            scriptUrl = host + moduleName + '.js?' + options.sversion ;
            _urlModArr[scriptUrl] = moduleId;

            loadScript(scriptUrl , function(){
                if (!anonymousRef) return;
                anonymousRef.id = moduleId;
                anonymousRef = null;
               }  );
         }
        if (fn) {
            if (!_moduleOnLoad.hasOwnProperty(moduleId) ) _moduleOnLoad[moduleId] = [];
            _moduleOnLoad[moduleId].push( fn);
            }
       
        return ;
       } 
     /*
     * generate module id;
     * anan namespace
     */

    function getIdFromId(id){
        if (!id) return '';
        var localNS = options.localNS + ':';
        if (0 === id.indexOf(localNS) ){
            id = id.substr(localNS.length);
            }
        return id;
        }
     /*
     *run in module context
     *@param string /path/a
     *@param object 
     */   
         
    function require(moduleid) {
        return _moduleCache[moduleid];
        }
    /*
    * define module ,like below 
    *  moduleid , []|'a' , function
    *  moduleid , function //auto find depencies
    *  []|'',function
    *  function
    ＊ @param moduleid string 
    * @param depencies array ['path/a','~http://xxxx/y.js'] 
    * @Param factor    function
    */
    function defineModule(moduleid , depencies , factor){

        switch (arguments.length){
            case 3:
                if ( !is_array(depencies)) depencies = depencies ? [ depencies] : [];
                break;
            case 2:
                factor = depencies;
                if ( 'string' == typeof moduleid ) { 
                    depencies = anaDepency(factor);
                }else{
                   depencies = moduleid;
                   moduleid = '';
                 }
                break;
            case 1:    
                factor = moduleid;
                moduleid = '';
                depencies = anaDepency(factor);
                break;
             }

        moduleid = getIdFromId(moduleid);
        if (!moduleid && document.attachEvent && !~UA.indexOf('Opera') ) {
            var _idFromSrc = getAnonymousId();
            }

         var defineFn = function() {
			 if (!moduleid) moduleid = _idFromSrc||defineFn.id ;
			 if (moduleid && _moduleCache.hasOwnProperty(moduleid)) return;
             var exports = {};
             var _export = factor(require , exports);
             if (_export ) exports = _export;
             triggerOnload(moduleid,exports);
            }
        
        //gen reference link js onload 
        if (!moduleid && !_idFromSrc)  anonymousRef = defineFn; 
        function callDefineFn(){
             (moduleid ||_idFromSrc) ? defineFn() : window.setTimeout(defineFn , 0 );
            }

        
        if (depencies.length) {
            var _l = null;
            var cachedNum = 0;
            var depenciesLen = depencies.length;
            for (var i=0 ; i < depenciesLen ;i++ ){
               var depMod = depencies[i];
               if (_moduleCache.hasOwnProperty(depMod) ) {cachedNum++;continue;}
               if ('~' == depMod.substr(0,1)) {
                   //load nonemodule js
                   var toload = depMod.substr(1);
                   if ('/' != toload.substr(0,1) && 'http://' != toload.substr(0,7)) { toload = options.modulebase + toload;}
                   loadScript(toload , function(){
                       triggerOnload(depMod,true);
                      ////defineFn();
                       });
                   ////continue;
                }else{
                    loadModule(depMod ,null ); 
                       
                       }

               if (! _moduleOnLoad[depMod] )   _moduleOnLoad[depMod]  = [];
               _moduleOnLoad[depMod].push(function(){
                    for (var i=0,j = depencies.length ; i<j ;i++ ){
                        if (! _moduleCache.hasOwnProperty(depencies[i]) ) return; 
                        }
                    defineFn();
                   // callDefineFn();
                    });
            }
            //if all depend cached 
            if (cachedNum >= depenciesLen) {
                callDefineFn();
            }
              
         }else {
             callDefineFn();
         }       
          

    }

    function anaDepency(factor) {
        /*if depencies is not pass , match out from factor*/
        depencies = [];
        var dependReg =/require\((['"])([\w\:\.\/\_\-]+)\1\)/g;
        var factorCxt = factor.toString().replace(/\/\*.*\*\//m,'').replace(/\/\/.*\n/g,'');
            
        var requiremod;
        while (requiremod = dependReg.exec(factorCxt ) ) { 
              requiremod = requiremod[2];
              depencies.push(requiremod);
             }       
        return depencies;     
        
        }
    /*
    *@param string */
    function triggerOnload(moduleid , module){
        _moduleCache[moduleid] = module;
        if (options.hasOwnProperty('enableShort') ) _moduleCache[getShortName(moduleid)]  = module;

        var onload = _moduleOnLoad[moduleid]; 
        if ( onload  ){
            _moduleOnLoad[moduleid] = [];
            for (var i = 0 , j = onload.length ; i < j ;i++) {
                onload[i].call(module, module );
               }
           }
        
        }
    
    /*
    load script async
    @param string uri
    @param function callback
    */
    function loadScript(url , callBack){
        var state;

        var onload = function(err){
            _sciptsLoad[url].state = 'loaded';
            var f;
            while ( f = _sciptsLoad[url].onload.shift()) {
                f(require);
                }
            }
        if (!_sciptsLoad.hasOwnProperty(url) ) {
            _sciptsLoad[url] = {'state' : 'loading' ,'onload' : [] }
            callBack && _sciptsLoad[url].onload.push(callBack);
            doLoadScript(url ,  onload );
          }else if(callBack){
            state = _sciptsLoad[url] ;
            switch (state.state){
                case 'loading':
                     _sciptsLoad[url].onload.push(callBack);
                    break;
                case 'loaded':
                    callBack(require);
                    break;
                }
         }
      }

    function doLoadScript(url , callBack ,ieloading){    
        var l = document.createElement('script');
        l.defer = 'true'; 
        l.async = 'async';

        l.type = 'text/javascript';
        if (callBack) {
            l.onerror = l.onload = l.onreadystatechange = function() {
                var state = this.readyState;
                if (!state || 'loaded' == state || 'complete' == state) { 
                    callBack();
                    head.removeChild(l);
                } 

            };
        }
        l.src = url;
        currentlyAddingScript = l;
        head.appendChild(l);
        currentlyAddingScript = null;
        
      }

    function getShortName(name){
        var beShort = name.lastIndexOf('/');
        if (beShort)  name  = name.substr(beShort +1 );
        return name;
        }
      /*
      @param array ['path/a','path/b']
      @param function callback
      @return object {a: , b: }
      */
    function loadMuchModule(modules , onload){
        var mLen = modules.length;
        var loadedNum = 0;
        var loadedMod = {};
        for(var i=0; i < mLen; i++){
            var toLoadMod = modules[i];
            loadModule(toLoadMod ,(function(toLoadMod){
                   return function(loadModule){
                      loadedNum++;
                      loadedMod[getShortName(toLoadMod)] = loadModule;
                      if (loadedNum >= mLen) onload.call(loadedMod, loadedMod);
                 }
                })(toLoadMod)  );
            }
        }
	/*
	window.onerror = function(errormsg,url,linenumber){
		fml.debug(url +':'+ linenumber +':'+errormsg);
		}
	*/

	var _event_stacks = {}
	function eventProxy(proxyName , fn){
		if (! (proxyName in _event_stacks))_event_stacks[proxyName] = []
		if (fn && typeof fn == 'function') _event_stacks[proxyName].push(fn)
		}
	function fireProxy(proxyName , data , once){
		if (! (proxyName in _event_stacks)) return
		var statcks= _event_stacks[proxyName]
		if (!statcks || !statcks.length) return
		for (var i = 0 , j= statcks.length ; i <j ; i++){
			statcks[i](data)
			}
		if (once) delete _event_stacks[proxyName]
		return true
		}
	function loadCss(css,callBack){
        var l = document.createElement('link');
		l.setAttribute('rel','stylesheet');
		l.setAttribute('rev','stylesheet');
		l.setAttribute('href',css);
        head.appendChild(l);
		var img = document.createElement('img');
        img.onerror = function(){
            if(callBack) callBack();
        }
        img.src = css;
	}
    global.fml = {
        version : 0.8 ,
        vars : {},
		eventProxy : eventProxy,
		fireProxy : fireProxy,
		on : eventProxy,
		emit : fireProxy,
		debug :function(){
			window.console && window.console.log.apply &&window.console.log.apply(console, arguments);
			},
		getOption : function(key){
			return options[key];
			},
        setOptions : setOptions,
        use : function(m,f){
            if (is_array(m)) loadMuchModule(m,f);
            else loadModule(m,f);
            },
        define : defineModule ,
        iLoad : function(){ 
            if (!_defer) return;
            _defer = false;
			var sl = _scriptStack.length;
			for(var i =0; i< sl; i++){
				loadModule(_scriptStack[i] );
				}
			_scriptStack = []; 
			_scriptStack = {};
            
            },
        loadScript : loadScript,
		loadCss: loadCss,
        alias : function(){ return this}
       }
 })(this);
