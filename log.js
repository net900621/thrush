var log400 = function(data, time){
	libFs.writeFileSync(self.req.logUrl , '404 ' + time + ' ' + self.listenDate[i] + '\n', {'encoding' : 'utf8'});
}