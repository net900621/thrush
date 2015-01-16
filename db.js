var orm = require("orm");

var opt = {
    host:     'localhost',
    database: 'MYSQLDATA',
    user:     'root',
    password: '',
    protocol: 'mysql'
}

var cbk = function(data, _cbk, self, key){
	self.listenCount --;
	self.listenDate[key] = data[0];
	_cbk();
	return false;
}

function doDb (self, key, callback, _opt) {

	orm.connect(opt, function (err, db) {
		if (err) 
			return cbk(false, function(){
				console.error('Connection error: ' + err);
			});
		callback(db, self, key, cbk, _opt);
	});

}

function dbFind (self, key, _opt) {

	var callback = function(db, self, key, cbk, _opt){
		var _self = self,
			_key = key;
		var MYTABLE = db.define(_opt.table, _opt.list);
		db.models[_opt.table].find(_opt.findList, function(err, rows) {
			if (err) return console.error('Connection error: ' + err);
			cbk(rows, function(){
				console.log('success!!!');
			},self, key);
	  	});
	}
	doDb(self, key, callback, _opt);
}

exports.dbFind = dbFind;