fml.define('page/pm', ['jquery'], function(require, exports) {
	var $form = $('.form_info')
		,$msg = $('.error')
		,data = {}

	$form.on('click', '.fm_sub', function(event) {
		$msg.html('');
		data.name = $form.find('#name').val()
		data.des = $form.find('#des').val()
		data.user = $form.find('#user').val()

		if(!data.name || !data.des || !data.user){
			$msg.html('请将信息录入完整后再提交');
			return;
		}

		// alert('提交'); return;
		$.post('/show/insertPm',data,function(){
			alert('提交成功')
		})
	});
});