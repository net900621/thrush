var _controller = function(){

}
_controller.prototype = {
	render : function(url, data){
		var _tmp = './www/tmp/' + Date.now().toString()
			,_data = libFs.readFileSync('./www/view/' + url + '.html', "utf8");

		libFs.writeFileSync(_tmp, tmp.etic(_data, data), {'encoding' : 'utf8'});
		res.writeHead(200, {"Content-Type": "text/html" });
		res.end(libFs.readFileSync(_tmp, "utf8"), "utf8");
	},
	listen : function(php, cbk){
		//TODO
		//data没拿到
		//应该需要别的东西搞一搞
		var _num = 0;
		var data = {};
		for (i in php){
			data[i] = './www/model' + php[i] + '.html';
			require(data[i])
		}
		if (true) {
			cbk();
		};
	}
}
exports.__create = function(module, conf){

	var _path = '', _pathName = '';

	util.inherits(module, _controller);

	if (conf) { 
		for (var k in conf) 
		module.prototype[k] = conf[k];
	}
	
	var modObj = new module;

	if (global.pathAccess.length) {
		var _value = '';
		if (global.pathAccess.length > 1) {
			_value = global.pathAccess[1];
		};
		if (modObj[global.pathAccess[0]]) {
			modObj[global.pathAccess[0]](_value);
		}else if (!_value){
			// console.dir(module.prototype['index'].toString());
			modObj['index'](global.pathAccess[0]);
		}else{
			err404(res);
		}
	}else{
		modObj['index']();
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