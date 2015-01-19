fml.define('page/show', ['jquery'], function(require, exports) {
	$('.main').width($(window).width());
	$('.big-content').height($('.big-content').width());
	$('.small-content').height($('.small-content').width());
	$('.img-game').height($('.img-game').width());
	$('.point1').height($('.point1').width());
	$('.point2').height($('.point2').width());
	$('.point3').height($('.point3').width());
	var count = 0;
	setInterval(function(){
		$('.point1').css('visibility','visible');
		setTimeout(function(){
			$('.point2').css('visibility','visible');
			setTimeout(function(){
				$('.point3').css('visibility','visible');
			},500);
		},500);
		setTimeout(function(){
			for(var i=1;i<=3;i++){
				$('.point'+i).css('visibility','hidden');
			}
		},1250);
	},1500);
});