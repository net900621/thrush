var dbThis = function(cbk, self){
	var _self = this;
	this.stack = {};
	this.count = 0;
	var name = self.req.client._httpMessage.__post.name || '',
		sex = self.req.client._httpMessage.__post.sex || '';
	db.dbInsert(this, 'update', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'insertList' : [{'name': name,'sex':sex}]
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.update);
	});

}
exports.dbThis = dbThis;