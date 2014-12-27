var _controller = function(){

}
_controller.prototype = {
	render : function(){
		return 12345;
	}
}
exports.__creat = function(module, conf){
	var _path = '', _pathName = '';

	util.inherits(module, _controller);

	if (conf) { 
		for (var k in conf) 
		module.prototype[k] = conf[k];
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

	return function(){
		
	}
}