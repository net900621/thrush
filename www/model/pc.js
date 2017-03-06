var dbThis = function(cbk){
	var _self = this;
	this.stack = {};
	this.count = 0;

	db.dbFind(this, 'find', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'findList' : {'name': 'yaoyao'}
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.find);
	});

}
exports.dbThis = dbThis;