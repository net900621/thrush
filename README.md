thrush
======

[![npm version](https://badge.fury.io/js/thrushs.svg)](https://badge.fury.io/js/thrushs)

#基于node的简单mvc框架

##轻量

thrush部署方便，架构轻量，适合简单的前端架构者使用。

##快捷

只需要解压项目，就拥有所有的东西，不需安装其它服务。

##扩展性强

代码简单，可扩展性强。

##前端

nodejs语法，前后端协同。

##用法

###首先

	npm install

	在www下创建tmp文件夹，不过其实可以直接通过cmd文件夹下的restart脚本自动创建

###controller写法

	在www/controller目录下，建立相对应路由
	路由规则如下：
	host:8124/a/b/c
	a文件夹/b文件夹/c.js/index规则
	or a文件夹/b.js/c规则
	or a.js/b规则/参数为c

	以a.js为例
		var a = function() {
			return this;
		};
		var conf = {
			'index' : function(){
				var data = {
					'value' : '/welcome',
					'ddd' : '/fuck'
				},
					self = this;
				this.setData(data);
				this.listen(function(data){
					self.cssLink = ['welcome'];
					data.value = data.value[0];
					return self.render('welcome', data);
				});
			}
		};
		exports.__create = controller.__create(a, conf);
	data的键为别名，值为相对应的model接口
	cssLink里面是对应的statics/css/路径
	render里是www/view/路径
	this.listen的回调会在所有model响应结束后，进行数据渲染
	如果是ajax请求，那么controller的写法为：
	'insert' : function(){
		var data = {'list' : '/insert'};
		this.ajaxTo(data);
	}	
	如果model层独立，使用this.listenToOther方法取代listen方法，data数组里放具体路径，在config/path.json里修改请求域名。

###model写法

	以a.js（model）为例：
	var dbThis = function(cbk){
		var _self = this;
		this.stack = {};
		this.count = 0;

		db.dbFind(this, 'find', {
			'table' : 'MYTABLE',
			'list' : {
		        name : {type: 'text'},
		        sex : {type: 'text'}
		    },
			'findList' : {'name': 'yaoyao'}
		});
		
		db.dbResult(this, function(_self){
			return cbk(null ,_self.stack.find);
		});

	}
	exports.dbThis = dbThis;
	分别封装了dbFind、dbUpdate、dbInsert、dbRemove等方法。方法使用具体看www/model/welcome.js
	dbResult的回调会统一获得所有的操作返回值，a.js里的'find'就是此时的别名，都会以键值对的方式存在_self.stack中

###view写法
	
	以a.html为例：
	<%# header.html #%>
		<div><label>姓名：</label><span><%= this.value.name%></span></div>
		<div><label>id：</label><span><%= this.value.id%></span></div>
		<div><label>性别：</label><span><%= this.value.sex%></span></div>
	<%
		fml.use('page/welcome');
	%>
	<%# footer.html #%>
		
	<%# header.html #%>为模板引入写法
	<%= this.value.name%>进行模板渲染
	<%  %>内可以以node语法写相应处理，比如：
	<%
		fml.use('page/welcome');
	%>
	就会执行fml.use('page/welcome')
	
###js加载方式
	
	fml.use('page/welcome',function(require, exports){
	//do sth
	});
	fml.define('page/pc', ['jquery'], function(require, exports) {
	//do sth
	});
	具体使用方式，类似sea.js，懒得写详细文档，想具体了解请call me
	
###启动方式
	
	在cmd文件夹下，./restart start
	在最后会输出一行类似/tmp/log/thrush/2015/02/12的路径
	这个路径就是日志输出地点
	
###参数

	get => this.req.__get
	post => this.req.__post

##感谢

感谢以下的支持：

	荣威威（js模块加载、模板引擎等）

##修改点
	支持了承接其它model层的接口方法

##TODO
	none
