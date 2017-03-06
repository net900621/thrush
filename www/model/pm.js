var dbThis = function(cbk){
	var _self = this;
	this.stack = {};
	this.count = 0;

	db.dbFind(this, 'find', {
		'table' : 'lark_show_pm',
		'list' : {
	        name : {type: 'text'},
	        des : {type: 'text'},
	        pm : {type: 'text'}
	    },
		'findList' : {}
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.find);
	});

}
exports.dbThis = dbThis;