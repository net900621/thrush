var a = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {'value' : '/welcome'},
			self = this;
		this.setData(data);
		this.listen(function(data){
			return self.render('welcome', data);
		});
	}
};
exports.__create = controller.__create(a, conf);