fml.define('page/pc', ['jquery' , 'common/QRCode'], function(require, exports) {
	var QRCode = require('common/QRCode'),
		list = $('.listInfo');
	list.forEach(function(v, i){
		$('#qrcode_c').html('')
		var qr = v.find('.er');
		var qrcode = new QRCode(qr, {  
	        width : qr.width(),  
	        height : qr.height()  
	    });
	    qrcode.makeCode(v.find('a').attr('href'));
	});
});