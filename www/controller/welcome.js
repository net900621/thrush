var welcome = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {'value' : '/welcome'},
			self = this;
		this.setData(data);
		console.log(this.listenStack);
		this.listen(function(data){
			self.cssLink = ['welcome'];
			return self.render('welcome', data);
		});
	}
};
exports.__create = controller.__create(welcome, conf);