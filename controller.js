var _controller = function(){

}
_controller.prototype = {
	render : function(url, data){
		var _tmp = './www/tmp/' + Date.now().toString();
		if(libFs.writeFileSync(_tmp, libFs.readFileSync('./www/view/' + url + '.html', "utf8"), {'encoding' : 'utf8'})){
			console.log(123)
			res.writeHead(200, {"Content-Type": funGetContentType(_tmp) });
		};
		// return libFs.readFileSync('./www/view/welcome.html', "utf8");
	},
	listen : function(cbk){
		//TODO
		if (true) {
			cbk();
		};
	}
}
exports.__create = function(module, conf){
	var _path = '', _pathName = '';

	util.inherits(module, _controller);
	console.log(module.prototype.toString())
	if (conf) { 
		for (var k in conf) 
		module.prototype[k] = conf[k];
	}
	
	// var mod = new module;

	if (global.pathAccess.length) {
		var _value = '';
		if (global.pathAccess.length > 1) {
			_value = global.pathAccess[1];
		};
		if (module.prototype[global.pathAccess[0]]) {
			module.prototype[global.pathAccess[0]](_value);
		}else if (!_value){
			// console.dir(module.prototype['index'].toString());
			module.prototype['index'](global.pathAccess[0]);
		}else{
			err404(res);
		}
	}else{
		module.prototype['index']();
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