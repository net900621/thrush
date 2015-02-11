var show = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {},
			self = this;
		this.setData(data);
		this.listen(function(data){
			self.cssLink = ['show'];
			return self.render('show', data);
		});
	},
	'pc' : function(){
		var data = {'list' : '/pc'},
			self = this;
		this.setData(data);
		this.listen(function(data){
			self.cssLink = ['pc'];
			return self.render('pc', data);
		});
	},
	'insert' : function(){
		var data = {'list' : '/insert'},
			self = this;
		this.setData(data);
		this.listen(function(data){
			console.log(data)
			data = JSON.stringify(data[1]);
			console.log(data);
			self.res.writeHead(200, {"Content-Type": "application/json" });
			self.res.end(data, "utf8");
		});
	},
};
exports.__create = controller.__create(show, conf);