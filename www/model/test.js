var dbThis = function(cbk, self){
	var _self = this;
	this.stack = {};
	this.count = 0;
	db.dbOut(this, 'http://snake.com/url/Package_get?channel=30902', 'test');
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.update);
	});

};
exports.dbThis = dbThis;