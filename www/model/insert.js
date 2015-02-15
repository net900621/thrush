var dbThis = function(cbk, self){
	var _self = this;
	this.stack = {};
	this.count = 0;
	var name = self.req.__post.name || '',
		url = self.req.__post.url || '',
		er = self.req.__post.er || '',
		img = self.req.__post.img || '';
	db.dbInsert(this, 'update', {
		'table' : 'lark_show',
		'list' : {
	        name : {type: 'text'},
	        url : {type: 'text'},
	        er : {type: 'text'},
	        img : {type: 'text'}
	    },
		'insertList' : [{'name': name,'url':url,'er':er,'img':img}]
	});
	
	db.dbResult(this, function(_self){
		return cbk(null ,_self.stack.update);
	});

}
exports.dbThis = dbThis;