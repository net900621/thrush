exports.etic = function (str, data){
	str = str.replace(/<%#([^<]*)#%>/g,function(){
		var strTmp = libFs.readFileSync('./www/view/' + arguments[1].trim(), "utf8");
		return strTmp;
	});
	var cache = {};
	if (!cache[str] ){
		var tpl = str
		tpl = tpl 
		.replace(/[\r\t\n]/g, " ")
		.split("<\%").join("\t")
		.replace(/((^|\%>)[^\t]*)'/g, "$1\r")
		.replace(/\t=(.*?)\%>/g, "',$1,'")
		.split("\t").join("');")
		.split("\%>").join("p.push('")
		.split("\r").join("\\'")
		try{
		cache[str] = new Function("",
			"var p=[];p.push('" + tpl + "');return p.join('');");
		}catch(e){
			if (console){
				console.log(e)
				console.log(tpl)
			}
		}
			
	}
	var fn = cache[str]
	if (data){
		try{
			return fn.apply( data )
		}catch(e){
			if (console){
				console.log(e)
				console.log(data)
				}
			}
	}else
	return fn
};