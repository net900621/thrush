var _controller = function(){

}
_controller.prototype = {
	render : function(data){
		return libFs.readFileSync('./www/view/welcome.html', "utf8");
	}
}
exports.__creat = function(module, conf){
	var _path = '', _pathName = '';

	util.inherits(module, _controller);

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
		console.log(global.pathAccess);
		if (module.prototype[global.pathAccess[0]]) {
			module.prototype[global.pathAccess[0]](_value);
		}else if (!_value){
			console.log(module.prototype.index);
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