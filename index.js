//开始服务启动计时器
console.time('[WebSvr][Start]');

//请求模块
var libHttp = require('http');    //HTTP协议模块
var libUrl=require('url');    //URL解析模块
global.libFs = require("fs");    //文件系统模块
var libPath = require("path");    //路径解析模块
global.controller = require("./controller.js"); 
var querystring = require("querystring");
// global.util = require('util');
// global.buffer = require('buffer');
global.tmp = require('./etic.js');
global.db = require('./db.js');
var contentType = require("./contentType");
global.logWrite = require("./log");

libFs.writeFileSync('./config/pid',process.pid);

//Web服务器主函数,解析请求,返回Web内容
var funWebSvr = function (req, res){

	var date = new Date(),
		dataUrl = '';

	try{

		if (!libFs.existsSync('/tmp/log/thrush/')) {

			libFs.mkdirSync('/tmp/log/thrush/');

		}
		if (!libFs.existsSync('/tmp/log/thrush/' + date.getUTCFullYear())) {

			libFs.mkdirSync('/tmp/log/thrush/' + date.getUTCFullYear());

		}

		var monthValue = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : '' + (date.getMonth() + 1);
		
		if (!libFs.existsSync('/tmp/log/thrush/' + date.getUTCFullYear() + '/' + monthValue)) {

			libFs.mkdirSync('/tmp/log/thrush/' + date.getUTCFullYear() + '/' + monthValue);

		}

		var dayValue = date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate();

		dataUrl = '/tmp/log/thrush/' + date.getUTCFullYear() + '/' + monthValue + '/' + dayValue;

	}catch(e){
		console.log(e.message);
		console.log(e.stack);
	}

	req.logUrl = dataUrl;

	//获取请求的url
	var reqUrl = req.url; 

	//使用url解析模块获取url中的路径名
	var pathName = libUrl.parse(reqUrl).pathname;
	var suffix = pathName.match(/\.([^\/]*$)/);
	if (suffix) {
		var suffixType = '';
		if (suffix[1] == 'css') {
			suffixType = 'css';
		}else if (suffix[1] == 'js') {
			suffixType = 'js';
		}else if (suffix[1] == 'jpg' || suffix[1] == 'png' || suffix[1] == 'gif') {
			suffixType = 'img';
		}else{
			suffixType = suffix[1];
		}
		var _statics = './statics/' + suffixType + pathName;
		if (libFs.existsSync(_statics)) {
			logWrite.logShow(req.logUrl, _statics, (new Date()).toLocaleTimeString(), 200);
			res.writeHead(200, {"Content-Type": contentType.funGetContentType(libPath.extname(_statics).replace(/\./,'')) });
			res.end(libFs.readFileSync(_statics),'utf-8');
		}else{
			logWrite.logShow(req.logUrl, _statics, (new Date()).toLocaleTimeString(), 404);
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end("<h1>404 Not Found !</h1>");
		}
		return false;
	};
	var pathClear = pathName.replace(/^\/|\/$/g,'');
	if (pathClear == '') {
		pathClear = 'welcome';
	};
	var pathArr = ['www/controller/' + pathClear + '.js', 'www/controller/' + pathClear.replace(/\/[^\/]+$/,'') + '.js', 'www/controller/' + pathClear.replace(/\/[^\/]+\/[^\/]+$/,'') + '.js'];
	var pathReal = '';
	var pathAccess = [];
	if (libFs.existsSync(pathArr[0])) {
		pathReal = pathArr[0];
		render200(require('./' + pathReal), req, res, pathAccess, pathName);
	}else if (libFs.existsSync(pathArr[1])){
		pathReal = pathArr[1];
		pathAccess = [pathClear.match(/\/[^\/]+$/)[0].replace(/\//g, '')];
		render200(require('./' + pathReal), req, res, pathAccess, pathName);
	}else if (libFs.existsSync(pathArr[2])){
		pathReal = pathArr[2];
		pathAccess = pathClear.match(/\/[^\/]+\/[^\/]+$/)[0].replace(/^\/|\/$/g, '').split(/\//);
		render200(require('./' + pathReal), req, res, pathAccess, pathName);
	}
	else{
		logWrite.logShow(req.logUrl, pathName, (new Date()).toLocaleTimeString(), 404);
		res.writeHead(404, {"Content-Type": "text/html"});
		res.end("<h1>404 Not Found !</h1>");
	}

}

var render200 = function(model, req, res, pathAccess, pathName){
	var modObj = new model.__create();
	modObj.res = res;
	modObj.req = req;
	try{

		var exeMod = function(){
			if (pathAccess.length) {
				var _value = '';
				if (pathAccess.length > 1) {
					_value = pathAccess[1];
				};
				if (modObj[pathAccess[0]]) {
					logWrite.logShow(req.logUrl, pathName, (new Date()).toLocaleTimeString(), 200);
					modObj[pathAccess[0]](_value);
				}else if (!_value){
					logWrite.logShow(req.logUrl, pathName, (new Date()).toLocaleTimeString(), 200);
					modObj['index'](pathAccess[0]);
				}else{
					logWrite.logShow(req.logUrl, pathName, (new Date()).toLocaleTimeString(), 404);
					res.writeHead(404, {"Content-Type": "text/html"});
					res.end("<h1>404 Not Found !</h1>");
				}
			}else{
				modObj['index']();
			}
		}

		modObj.req.__get = {};
		modObj.req.__post = {};
	
		if(req.method == "GET"){
	        var params = [];
	        params = libUrl.parse(req.url,true).query;
	        modObj.req.__get = params;
	        exeMod();
	    }else if(req.method == "POST"){
	        var postdata = "";
	        req.addListener("data",function(postchunk){
	            postdata += postchunk;
	        })

	        //POST结束输出结果
	        req.addListener("end",function(){
	            var params = querystring.parse(postdata);
	            modObj.req.__post = params;
	            exeMod();
	        })
	    }else{
	    	exeMod();
	    }

	}catch(ex){
		logWrite.error(req.logUrl, ex.stack);
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

var watcher = require("./watchFile.js");
var absDir = __dirname.replace(/\\/g,'/');
watcher.takeCare([absDir] );