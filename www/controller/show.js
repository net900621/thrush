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
	}
};
exports.__create = controller.__create(show, conf);