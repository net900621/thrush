var dbThis = function(cbk){
	var _self = this;
	this.stack = {};
	this.count = 0;
	
	db.dbFind(this, 'find', {
		'table' : 'MYTABLE',
		'list' : {
			id : {type: 'serial', key: true},
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