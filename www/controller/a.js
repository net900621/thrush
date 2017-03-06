var a = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {},
			self = this;
		this.setData(data);
		this.listen(function(data){
			return self.render('a', data);
		});
	}
};
exports.__create = controller.__create(a, conf);