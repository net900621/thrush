var dbThis = function(cbk, self){
	var _self = this;
	this.stack = {};
	this.count = 0;
	var name = self.req;
	db.dbInsert(this, 'update', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'insertList' : [{'name': 'I','sex':'m'}]
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.update);
	});

}
exports.dbThis = dbThis;