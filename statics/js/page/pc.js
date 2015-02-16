fml.define('page/pc', ['jquery' , 'common/QRCode','page/banner'], function(require, exports) {
	var QRCode = require('common/QRCode'),
		list = $('.listInfo');

	// alert(1212)
	// console.log(list)

	list.each(function(i , v){
		$('#qrcode_c').html('')
		var qr = $(v).find('.er');
		var qrcode = new QRCode(qr[0], {  
	        width : 200,  
	        height : 200
	    });
	    qrcode.makeCode($(v).find('a').attr('href'));
	});
});	