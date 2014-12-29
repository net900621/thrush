var welcome = function() {

};
var conf = {
	'index' : function(){
		console.log(123);
		var data = {'value' : 3};
		console.log(this.render('welcome', data));
	}
};
// exports.__create = controller.__creat(welcome, conf);
exports.__create(welcome, conf);