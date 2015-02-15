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
		var data = {'pc_show' : '/pc_show'},
			self = this;
		this.setData(data);
		this.listen(function(data){
			console.log(data)
			self.cssLink = ['pc'];
			return self.render('pc', data);
		});
	},
	'insert' : function(){
		var data = {'date' : '/insert'};
		this.ajaxTo(data);
	}
};
exports.__create = controller.__create(show, conf);