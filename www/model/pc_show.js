var dbThis = function(cbk){
	var _self = this;
	this.stack = {};
	this.count = 0;

	db.dbFind(this, 'find', {
		'table' : 'lark_show',
		'list' : {
	        name : {type: 'text'},
	        url : {type: 'text'},
	        er : {type: 'text'},
	        img : {type: 'text'}
	    },
		'findList' : {}
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.find);
	});

}
exports.dbThis = dbThis;