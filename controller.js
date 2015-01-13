var util = require('util');
var _controller = function(){
	this.listenStack = [];
	this.listenDate = {};
	this.listenCount = 0;
}
_controller.prototype = {
	render : function(url, data){
		var _tmp = './www/tmp/' + Date.now().toString()
			,_data = libFs.readFileSync('./www/view/' + url + '.html', "utf8");
		libFs.writeFileSync(_tmp, tmp.etic(_data, data), {'encoding' : 'utf8'});
		this.res.writeHead(200, {"Content-Type": "text/html" });
		this.res.end(libFs.readFileSync(_tmp, "utf8"), "utf8");
	},
	listen : function(cbk){
		var _num = 0;
		var data = {};
		var php = this.listenDate;
		var self = this;
		for (i in php){
			data[i] = './www/model' + php[i] + '.js';
			require(data[i]).dbThis(this, i);
		}
		var listenFun = function(){
			if (!self.listenCount) {
				cbk(self.listenDate);
			}else{
				setTimeout(function(){
					listenFun();
				},100)		
			}
		}
		listenFun();
	},
	setData : function(data){
		_controller.call(this);
		for (i in data){
			this.listenStack.push(data[i]);
			this.listenCount ++;
		}
		this.listenDate = data;
	}
}
exports.__create = function(module, conf){
	// var _path = '', _pathName = '';

	util.inherits(module, _controller);

	if (conf) { 
		for (var k in conf) 
		module.prototype[k] = conf[k];
	}
	
	return function(modName, appPath){
		var modObj = new module;
		return modObj;
	}
	

	//貌似这里是为了干点啥的
	//好像index里面能跳转别的controller的思路一出来，这里就没用了
	//那还是放着吧，以防万一
	/*
	if (global.pathAccess) {
		_path = conf.global.pathAccess;
		_pathName = global.pathAccess;
		global.pathAccess = '';
	}else{
		_pathName = 'index';
		_path = conf.index;
	}
	*/
	// module.prototype[ _pathName ] = _path;
	// module.prototype[ _pathName ]();

	// return function(module, conf){

	// }
}