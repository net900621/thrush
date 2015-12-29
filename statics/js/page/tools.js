fml.define('page/pc', ['jquery' , 'common/QRCode'], function(require, exports) {
	var QRCode = require('common/QRCode'),
		qr = $('.j-Qr');
	qr.on('blur', function(event) {
		var _this = $(this),
			parents = _this.parents('.toQr');

		$('.qr-show').html('');
		var qr = $('.qr-show');
		var qrcode = new QRCode(qr[0], {  
	        width : 200,  
	        height : 200
	    });
		qrcode.makeCode(_this.val());
		event.preventDefault();
	});

	$('#j-arr').on('blur', function(event) {

		var _this = $(this),
			_val = _this.val();

		_this.val(_val.replace(/\n|\v|\r/g, ','))

		event.preventDefault();
	});

	$('#j-arr2').on('blur', function(event) {

		var _this = $(this),
			_val = _this.val();

		var arr = _val.replace(/\n|\v|\r/g, ',').split(',');

		arr = arr.sort(function(){return Math.random()>0.5?-1:1;}); 

		_this.val(arr.join(','))

		event.preventDefault();
	});
});