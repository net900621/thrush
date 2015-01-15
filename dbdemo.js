//添加
function dbAdd (self, key, opt) {
	var tableName = opt.tableName;
	var keyName = opt.keyName;
	var valueName = opt.valueName;
	var content = {};
	content[keyName] = valueName;

	var callback = function(err, db, self, key){
		var _self = self,
			_key = key;
		if (err) return console.error('Connection error: ' + err);
		var MYTABLE = db.define(tableName, {
			id : {type: 'serial', key: true},
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    });
		MYTABLE.create([
		    {
		        name: "John"
		    }
		], function (err, items) {
		    // err - description of the error or null
		    // items - array of inserted items
		});
	}
	doDb(self, key, callback);
}
//更新
Person.get(1, function (err, John) {
    John.save({ name: "Joe", surname: "Doe" }, function (err) {
        console.log("saved!");
    });
});
//删除
Person.get(1, function (err, John) {
    John.remove(function (err) {
        console.log("removed!");
    });
});