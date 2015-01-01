var welcome = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {'value' : 3},
			self = this;
		this.listen(function(){
			return self.render('welcome', data);
		});
	}
};
exports.__create = controller.__create(welcome, conf);