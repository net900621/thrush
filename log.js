var logShow = function(logUrl, data, time, type){
	libFs.writeFileSync(logUrl , type + ' ' + time + ' ' + data + '\n', {'encoding' : 'utf8'});
}

var error = function(logUrl, data){
	libFs.writeFileSync(logUrl ,data + '\n', {'encoding' : 'utf8'});
}

exports.error = error;
exports.logShow = logShow;