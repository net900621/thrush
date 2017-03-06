var mail = function() {
	return this;
};
var conf = {
	'index' : function(){
		var data = {
		},
			self = this;
		this.setData(data);
		this.listen(function(data){
			self.cssLink = ['mail'];
			return self.render('mail', data);
		});
	},
	'sendMail' : function(){
		var data = {'date' : '/sendMail'};
		this.ajaxTo(data);
	}
};
exports.__create = controller.__create(mail, conf);