var util = require('util');
var config = require('./config');
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
							var v = self.listenDate[i];
							var _type = typeof(v);
							if (_type != 'object') {
								libFs.writeFileSync(self.req.logUrl , '404 ' + url + '\n', {'encoding' : 'utf8'});
							}else{
								libFs.writeFileSync(self.req.logUrl , '200 ' + url + '\n', {'encoding' : 'utf8'});
							}
							cbk(self.listenDate);
						};
					},self);
				})(i, url);
			}
		}
	},
	listenToOther : function(cbk){
		var _num = 0;
		var data = {};
		var php = this.listenDate;
		var _php = php;
		var self = this;
		if (!self.listenCount ) {
			cbk(self.listenDate);
		};
		for (i in php){
			data[i] = config.path.host + php[i];
			var url = self.listenDate[i];
			(function(_index, url){
				var _self = self;
				libHttp.get(data[i], function(res){
					var _data = '';
					res.on('data', function (data) {
						_data += data;
					});
					res.on('end', function (data) {
						self.listenCount --;
						try{
							self.listenDate[_index] = JSON.parse(_data);
						}catch(e){
							self.listenDate[_index] = {};
							console.log(e.message);
							console.log(e.stack);
						}
						if (self.listenCount == 0) {
							cbk(self.listenDate);
						};
					});
				}).on('error', function(e) {
				  console.log("错误：" + e.message);
				});
			})(i, url);
		}
	},
	setData : function(data){
		_controller.call(this);
		for (i in data){
			this.listenStack.push(data[i]);
			this.listenCount ++;
		}
		this.listenDate = data;
	},
	ajaxTo : function(data){
		var self = this;
		this.setData(data);
		this.listen(function(data){
			data = JSON.stringify(data);
			self.res.writeHead(200, {"Content-Type": "application/json" });
			self.res.end(data, "utf8");
		});
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