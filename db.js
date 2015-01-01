function doDb (module, php) {
	var opt = {
	    host:     'localhost',
	    database: 'MYSQLDATA',
	    user:     'root',
	    password: '',
	    protocol: 'mysql'
	}
	var cbk = function(){
		console.log('I love U');
		return 123;
	}
	orm.connect(opt, function (err, db) {
		if (err) return console.error('Connection error: ' + err);
		var MYTABLE = db.define("MYTABLE", {
			id : {type: 'serial', key: true},
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    });
		db.models.MYTABLE.find({name: 'yaoyao'}, function(err, rows) {
			if (err) return console.error('Connection error: ' + err);
			cbk();
			console.log(rows);
	  	});

	});

}

exports.doDb = doDb;