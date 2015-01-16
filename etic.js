exports.etic = function (str, data, css){
	var cssList = '',
		cssDel = '<link rel="stylesheet" href="/$.css">'
	css.map(function(v, i) {
		cssList += cssDel.replace(/\$/,v);
	});
	console.log(cssList);
	str = str.replace(/<%#([^<]*)#%>/g,function(){
		var strTmp = libFs.readFileSync('./www/view/' + arguments[1].trim(), "utf8");
		return strTmp;
	}).replace(/<\/head>/,cssList + '</head>');
	var i = 0,
		jsStack = [],
		jsLink = '<script>';
	str = str.replace(/<%[^<]*(fml.use\(\'[\s\S]*'\))[^<]*%>/g,function(){
		jsStack[i++] = arguments[1];
		return '';
	});
	jsStack.map(function(v, i){
		jsLink += v;
		jsLink += ';';
	});
	jsLink += '</script>';
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
			return fn.apply( data ).replace(/<\/body>/g,jsLink + '</body>')
		}catch(e){
			if (console){
				console.log(e)
				console.log(data)
				}
			}
	}else
	return fn().replace(/<\/body>/g,jsLink + '</body>')
};