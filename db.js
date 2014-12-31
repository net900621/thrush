function doDb (php) {
	var opt = {
	    host:     'localhost',
	    database: 'MYSQLDATA',
	    user:     'root',
	    password: '',
	    protocol: 'mysql'
	}
	orm.connect(opt, function (err, db) {
		if (err) return console.error('Connection error: ' + err);
		var MYTABLE = db.define("MYTABLE", {
			id : {type: 'serial', key: true},
	        name : {type: 'text'},
	        sex : {type: 'text'}
	    });
		console.log(db);
		db.models.MYTABLE.find({name: 'yaoyao'}, function(err, rows) {
			console.log(12345)
			if (err) return console.error('Connection error: ' + err);
			console.log(rows);
	  	});

	});

}

exports.doDb = doDb;