var dbThis = function(self, key){
	var opt = {
		'table' : 'MYTABLE',
		'list' : {
			id : {type: 'serial', key: true},
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    },
		'findList' : {'name': 'yaoyao'}
	}
	db.dbFind(self, key, opt);
}
exports.dbThis = dbThis;