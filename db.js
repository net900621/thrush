var orm = require("orm");

var opt = {
    host:     'localhost',
    database: 'lark',
    user:     'root',
    password: '',
    protocol: 'mysql'
}

var _cbk = function(data, self, key){
	self.count --;
	self.stack[key] = data;
	return false;
}

function doDb (self, key, callback, _opt) {

	orm.connect(opt, function (err, db) {
		if (err) 
			return _cbk(false, self, key);
		callback(db, self, key, _cbk, _opt);
	});

}

function dbOut (self, url, key){
	
	self.count ++;

	libHttp.get(url, function(res){
		var _data = '';
		res.on('data', function (data) {
			_data += data;
		});
		res.on('end', function (data) {
			_cbk(_data, self, key);
		});
	}).on('error', function(e) {
	  console.log("错误：" + e.message);
	});

}

function dbFind (self, key, _opt) {
	self.count ++;
	var callback = function(db, self, key, _cbk, _opt){
		var _self = self,
			_key = key;
		var MYTABLE = db.define(_opt.table, _opt.list);
		db.models[_opt.table].find(_opt.findList, function(err, rows) {
			if (err) {
    			return console.error('Connection error: ' + err);
    			_cbk([false], self, key);
    		}
			_cbk(rows, self, key);
	  	});
	}
	doDb(self, key, callback, _opt);
}

function dbUpdate (self, key, _opt) {
	self.count ++;
	var callback = function(db, self, key, _cbk, _opt){
		var _self = self,
			_key = key;
		var MYTABLE = db.define(_opt.table, _opt.list);
		db.models[_opt.table].find(_opt.findList).each(function(rows) {
			for(var i in _opt.updateList){
				rows[i] = _opt.updateList[i];
			}
	  	}).save(function (err) {
    		if (err) {
    			return console.error('Connection error: ' + err);
    			_cbk([false], self, key);
    		}
			_cbk([true], self, key);
		})
	}
	doDb(self, key, callback, _opt);
}

function dbRemove (self, key, _opt) {
	self.count ++;
	var callback = function(db, self, key, _cbk, _opt){
		var _self = self,
			_key = key;
		var MYTABLE = db.define(_opt.table, _opt.list);
		db.models[_opt.table].find(_opt.removeList).remove(function (err) {
    		if (err) {
    			return console.error('Connection error: ' + err);
    			_cbk([false], self, key);
    		}
			_cbk([true], self, key);
		})
	}
	doDb(self, key, callback, _opt);
}

function dbInsert (self, key, _opt) {
	self.count ++;
	var callback = function(db, self, key, _cbk, _opt){
		var _self = self,
			_key = key;
		var MYTABLE = db.define(_opt.table, _opt.list);
		db.models[_opt.table].create(_opt.insertList, function (err, items) {
    		if (err) {
    			return console.error('Connection error: ' + err);
    			_cbk([false], self, key);
    		}
			_cbk([true], self, key);
		})
	}
	doDb(self, key, callback, _opt);
}

function dbResult (_this, fun) {
	var _this = _this;
	var listenFun = function(fun, _this){
		if (!_this.count) {
			var data = fun(_this);
			return false;
		}else{
			setTimeout(function(){
				listenFun(fun, _this);
			},100)		
		}
	}
	listenFun(fun, _this);
}

exports.dbFind = dbFind;
exports.dbRemove = dbRemove;
exports.dbUpdate = dbUpdate;
exports.dbInsert = dbInsert;
exports.dbResult = dbResult;
exports.dbOut = dbOut;