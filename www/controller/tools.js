var tools = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {
			'test': '/test'
		},
			self = this;
		this.setData(data);
		this.listen(function(data){
			
			self.cssLink = ['tools'];
			return self.render('tools', data);
		});
	}
};
exports.__create = controller.__create(tools, conf);
