var welcome = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {'value' : '/model/controller/welcome'},
			self = this;
		this.setData(data);
		this.listen(function(){
			return self.render('welcome', data);
		});
	}
};
exports.__create = controller.__create(welcome, conf);