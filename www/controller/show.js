var show = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {},
			self = this;
		this.setData(data);
		console.log(this.listenStack);
		this.listen(function(data){
			self.cssLink = ['show'];
			return self.render('show', data);
		});
	}
};
exports.__create = controller.__create(show, conf);