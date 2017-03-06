fml.define('page/pc_add', ['jquery' , 'common/QRCode'], function(require, exports) {
	var $form = $('.form_info')
		,$msg = $('.error')
		,data = {}
		,url_reg = /http:\/\/[\w-]*(\.[\w-]*)+/ig
		,QRCode = require('common/QRCode');

	$form.on('click', '.fm_sub', function(event) {
		$msg.hide();
		data.name = $form.find('#name').val()
		data.url = $form.find('#url').val()
		data.img = $form.find('#img').val()

		if(!data.name || !data.url || !data.img){
			$msg.html('请将信息录入完整后再提交').show();
			return;
		}
		if (data.url.match(url_reg) === false || data.img.match(url_reg) === false) {
			$msg.html('URL格式错误').show();
			return;
		}
		$('#qrcode_c').html('')
		var qrcode = new QRCode(qrcode_c, {  
	        width : 100,  
	        height : 100  
	    });
	    qrcode.makeCode(data.url);
		data.er = $('#qrcode_c').find('img').attr('src');
		// alert('提交'); return;
		$.post('/show/insert',data,function(){
			alert('提交成功')
		})
	});
});