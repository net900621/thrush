var logShow = function(self, data, time){
	libFs.writeFileSync(self.req.logUrl , '404 ' + time + ' ' + data + '\n', {'encoding' : 'utf8'});
}

var error = function(self, data, time){
	libFs.writeFileSync(self.req.logUrl , 'error ' + time + ' ' + data + '\n', {'encoding' : 'utf8'});
}