var welcome = function() {

};
var conf = {
	'index' : function(){
		console.log(123);
		return this.render();
	}
};
exports.__create = controller.__creat(welcome, conf);