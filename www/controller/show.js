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
		console.log(this.req.__post)
		var data = {'date' : '/insert'};
		this.ajaxTo(data);
	}
};
exports.__create = controller.__create(show, conf);