var logShow = function(logUrl, data, time, type){
	libFs.appendFileSync(logUrl , type + ' ' + time + ' ' + data + '\n', {'encoding' : 'utf8'});
}

var error = function(logUrl, data){
	libFs.appendFileSync(logUrl ,data + '\n', {'encoding' : 'utf8'});
}

exports.error = error;
exports.logShow = logShow;