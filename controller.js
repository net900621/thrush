var util = require('util');
var _controller = function(){
	this.listenStack = [];
	this.listenDate = {};
	this.listenCount = 0;
	this.cssLink = [];
}
_controller.prototype = {
	render : function(url, data){
		var _tmp = './www/tmp/' + Date.now().toString()
			,_data = libFs.readFileSync('./www/view/' + url + '.html', "utf8");
		libFs.writeFileSync(_tmp, tmp.etic(_data, data, this.cssLink), {'encoding' : 'utf8'});
		this.res.writeHead(200, {"Content-Type": "text/html" });
		this.res.end(libFs.readFileSync(_tmp, "utf8"), "utf8");
	},
	listen : function(cbk){
		var _num = 0;
		var data = {};
		var php = this.listenDate;
		var _php = php;
		var self = this;
		if (!self.listenCount ) {
			cbk(self.listenDate);
		};
		for (i in php){
			data[i] = './www/model' + php[i] + '.js';
			var url = self.listenDate[i];
			if (!libFs.existsSync(data[i])) {
				libFs.writeFileSync(self.req.logUrl , '404 ' + self.listenDate[i] + '\n', {'encoding' : 'utf8'});
				self.listenDate[i] = 'false';
				self.listenCount --;
			}else{
				(function(i, url){
					require(data[i]).dbThis(function(err,dd){
						self.listenDate[i] = dd;
						self.listenCount --;
						if (!self.listenCount ) {
							for(index in self.listenDate){
								var v = self.listenDate[index];
								var _type = typeof(v);
								if (_type != 'object') {
									libFs.writeFileSync(self.req.logUrl , '404 ' + url + '\n', {'encoding' : 'utf8'});
								}else{
									libFs.writeFileSync(self.req.logUrl , '200 ' + url + '\n', {'encoding' : 'utf8'});
								}
							}
							cbk(self.listenDate);
						};
					});
				})(i, url);
			}
		}
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
	
}