fml.define('page/pc', ['jquery'], function(require, exports) {
	$('#commit').on('click', function(){
		var data = {};
			data.id = $('#id').val();
			data.password = $('#password').val();
			data.to = $('#to').val();
			data.host = $('#host').val();
			data.title = $('#title').val();
			data.text = $('#text').val();
		if (!data.id) {
			alert('请输入用户名');
		}else if (!data.password) {
			alert('请输入密码');
		}else{
			$.post('/mail/sendMail',data,function(){
				alert('提交成功');
			});
		}
	});
});