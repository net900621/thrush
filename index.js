//开始服务启动计时器
console.time('[WebSvr][Start]');

//请求模块
var libHttp = require('http');    //HTTP协议模块
var libUrl=require('url');    //URL解析模块
global.libFs = require("fs");    //文件系统模块
var libPath = require("path");    //路径解析模块
global.controller = require("./controller.js"); 
var querystring = require("querystring");
global.util = require('util');
global.buffer = require('buffer');
global.pathAccess = '';


//Web服务器主函数,解析请求,返回Web内容
var funWebSvr = function (req, res){ 
	global.res = res;
	//获取请求的url
	var reqUrl = req.url; 
	//使用url解析模块获取url中的路径名
	var pathName = libUrl.parse(reqUrl).pathname;
	var pathClear = pathName.replace(/^\/|\/$/g,'');
	if (pathClear == '') {
		pathClear = 'welcome';
	};
	var pathArr = ['www/controller/' + pathClear + '.js', 'www/controller/' + pathClear.replace(/\/[^\/]+$/,'') + '.js', 'www/controller/' + pathClear.replace(/\/[^\/]+\/[^\/]+$/,'') + '.js'];
	var pathReal = '';
	if (libFs.existsSync(pathArr[0])) {
		pathReal = pathArr[0];
		require('./' + pathReal);
		// res.writeHead(200);
		// res.end(JSON.stringify(obj));
	}else if (libFs.existsSync(pathArr[1])){
		pathReal = pathArr[1];
		global.pathAccess = [pathClear.match(/\/[^\/]+$/)[0].replace(/\//g, '')];
		require('./' + pathReal);
	}else if (libFs.existsSync(pathArr[2])){
		pathReal = pathArr[2];
		global.pathAccess = pathClear.match(/\/[^\/]+\/[^\/]+$/)[0].replace(/^\/|\/$/g, '').split(/\//);
		require('./' + pathReal);
	}
	else{
		err404(res);
	}

}

//创建一个http服务器
var webSvr = libHttp.createServer(funWebSvr);

//指定服务器错误事件响应
webSvr.on("error", function(error) { 
	console.log(error);  //在控制台中输出错误信息
}); 


//开始侦听8124端口
webSvr.listen(8124,function(){

	//向控制台输出服务启动的信息
	console.log('[WebSvr][Start] running at http://127.0.0.1:8124/'); 

	//结束服务启动计时器并输出
	console.timeEnd('[WebSvr][Start]');
});


global.err404 = function(res){
	res.writeHead(404, {"Content-Type": "text/html"});
	res.end("<h1>404 Not Found !</h1>");
}