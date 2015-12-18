var etj = function (str, data) {
	var reg = /^<%.*?%>/,
	    reg2 = /[^<^%*]/,
	    str2 = 'var str = "";',
	    str = str.replace(/[\r\t\n]/g, " ");
	while (str.length) {
	    if (match = reg.exec(str)) {
	        if (/^<%=/.exec(str)) {
	            str = str.replace(match[0], '');
	            str2 += ('str +' + match[0].replace(/<%|%>/g, ''));
	            str2 += ';';
	        } else {
	            str = str.replace(match[0], '');
	            str2 += match[0].replace(/<%|%>/g, '');
	            str2 += ';';
	        }
	    } else {
	        match = reg2.exec(str);
	        str = str.replace(match[0], '');
	        str2 += 'str +=';
	        str2 += match[0];
	        str2 += ';';
	    }
	}
	str2 += 'return str;'
	var f = new Function(str2);
	return f.call(data);
}
etj('<%for(var i = 0; i < this.list.length; i++){console.log(1)%>123<%=this.list[i]%>321<%}%>', {'list': [1, 2, 3]});