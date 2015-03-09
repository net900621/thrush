var dbThis = function(cbk, self){
	var _self = this;
	this.stack = {};
	this.count = 0;
	var name = self.req.__post.name || '',
		des = self.req.__post.des || '',
		user = self.req.__post.user || '';
	db.dbInsert(this, 'update', {
		'table' : 'lark_show_pm',
		'list' : {
	        name : {type: 'text'},
	        des : {type: 'text'},
	        pm : {type: 'text'}
	    },
		'insertList' : [{'name': name,'des':des,'pm':user}]
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.update);
	});

}
exports.dbThis = dbThis;