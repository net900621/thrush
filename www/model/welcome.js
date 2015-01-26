var dbThis = function(self, key){
	this.stack = [];
	this.count = 0;

	db.dbFind(self, key, {
		'table' : 'MYTABLE',
		'list' : {
			id : {type: 'serial', key: true},
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'findList' : {'name': 'yaoyao'}
	});
}
exports.dbThis = dbThis;