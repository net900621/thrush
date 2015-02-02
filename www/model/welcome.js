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

	db.dbFind(this, 'find2', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'updateList' : {'name': 'yaoyao2'}
	});

	db.dbUpdate(this, 'update', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
	    'findList' : {'name': 'yaoyao4'},
		'updateList' : {'name': 'yaoyao1212'}
	});

	db.dbInsert(this, 'update', {
		'table' : 'MYTABLE',
		'list' : {
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'insertList' : [{'name': 'yaoyaook','sex':'m'}]
	});
	
	db.dbResult(this, function(_self){
		console.log(_self.stack.update);
		return cbk(null ,[_self.stack.find,_self.stack.find2]);
	});

}
exports.dbThis = dbThis;