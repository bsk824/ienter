var agent = navigator.userAgent.toLocaleLowerCase();
var html = document.getElementsByTagName('html')[0];
var htmlClass = html.getAttribute('class');
var device, deviceVer, osVer, ver = null;
if(agent.indexOf('mobile') > -1) { //모바일 체크
	ver = 'mobile';
	if(agent.indexOf('iphone') > -1 || agent.indexOf('ipad') > -1) { //ios 체크
		device = agent.substring(agent.indexOf('os') + 3);
		deviceVer = device.substring(0, device.indexOf('like mac os x'));
		osVer = 'ios' + deviceVer;
	}
	if(agent.indexOf('android') > -1) { //안드로이드 체크
		device = agent.substring(agent.indexOf('android') + 8);
		deviceVer = device.substring(0, device.indexOf(';'));
		andVer = deviceVer.replace(/[.]/gi,'_');
		osVer = 'android' + andVer;

		if(agent.indexOf('samsung') > -1) osVer += ' samsung'; //삼성 인터넷브라우져 체크
	}
} else {
	ver = 'pc';
	if(agent.indexOf('msie') > -1) { //ie10 이하 체크
		device = agent.substring(agent.indexOf('msie') + 4);
		deviceVer = Math.floor(device.substring(0, device.indexOf(';')));
		osVer = 'ie' + deviceVer;
	} else {
		osVer = '';
	};
}
if(agent.indexOf('naver') > -1) osVer += ' naver'; //네이버 앱 체크
if(ver !== null) {
	(htmlClass !== null) ? html.setAttribute('class', htmlClass + ' ' + ver + ' ' + osVer) : html.setAttribute('class', ver + ' ' + osVer); //html 클래스 부여
}

(function(){
	var winW = $(window).width();
	function fontSize(w) {
		if (w <= 560) {
			var fontSize = w / 5.76;
			$('html').css('font-size', Math.floor(fontSize*100)/100 + '%');
		} else {
			$('html').css('font-size','62.5%');
		}
	}
	fontSize(winW);
	$(window).resize(function(){
		var winW = $(window).width();
		fontSize(winW);
	});
	
})();

// 쿠키 설정
function setCookie(name, value, expiredays) {
	var today = new Date();		
	today.setDate( today.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";"
}

// 쿠키 가져오기
function getCookie(key) {
	var cook = document.cookie + ";";
	var idx = cook.indexOf(key, 0);
	var val = "";

	if(idx != -1) {
		cook = cook.substring(idx, cook.length);
		begin = cook.indexOf("=", 0) + 1;
		end = cook.indexOf(";", begin);
		val = unescape( cook.substring(begin, end) );
	}
	return val;
}
