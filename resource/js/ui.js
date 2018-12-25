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
$(function(){

	if(getCookie('topBannerState') != 'topBannerChk') {
		$('#wrap').addClass('bannerOn');
	}
	$('.tabMenu').each(function(){
		var $this = $(this);
		var txt = $(this).find('li.active').text();
		$this.find('.tabBtn').text(txt);
	});

});

$(window).on('scroll', function(){
	var scrollTop = $(this).scrollTop();

	gnbFixed(scrollTop);
});


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

function topBannerClose(name) {
	$('.topBanner').slideUp(200);
	if( $('input[name='+name+']').is(':checked') ) {
		setCookie('topBannerState', name, 1);
	}
}
function menuOpen() {
	$('html').addClass('menuOn');
}
function menuClose() {
	$('html').removeClass('menuOn');
}
function subOpen(obj) {
	var $this = $(obj);
	if($this.attr('href') == '#') {
		event.preventDefault();	
	}
	if(ver !== 'mobile') {
		$('html').addClass('submenuOn');
		if(!$this.parent().hasClass('open')) {
			$this.parent().addClass('open').siblings().removeClass('open');
		}
	} else {
		if(event.type === 'mouseover') {
			return false;
		} else {
			if(!$this.parent().hasClass('open')) {
				$this.parent().addClass('open').siblings().removeClass('open');
				$('#gnb .subDepth').slideUp(200);
				$this.next('.subDepth').slideDown(200);
			} else {
				$this.parent().removeClass('open');
				$this.next('.subDepth').slideUp(200);
			}
		}
	}
}
function subClose() {
	if(ver !== 'mobile') {
		$('html').removeClass('submenuOn');
		$('#gnb .open').removeClass('open');
	}
}

function gnbFixed(scroll) {
	if(ver !== 'mobile') {
		var gnbTop = $('#gnb .inner').offset().top;
	} else {
		var gnbTop = $('#header').offset().top;
	}
	if(scroll > gnbTop) {
		if(!$('body').hasClass('fixedMenu')) {
			$('body').addClass('fixedMenu');
		}
	} else {
		$('body').removeClass('fixedMenu');
	}
}

var slideObj = {};
function mainSlide() {
	var obj = 'mainSlide';
	if(osVer !== 'ie8') {
		var slide = new Swiper('.' + obj + ' .slide', {
			loop: true,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: '.' + obj + ' .slideNext',
				prevEl: '.' + obj + ' .slidePrev',
			},
			pagination: {
				el: '.' + obj + ' .slidePage',
				clickable: true,
				renderBullet: function (index, className) {
					return '<a href="#" class="' + className + '">' + (index + 1) + '</a>';
				},
			}
		});
	} else {
		var slide = $('.' + obj + ' .slide ul').bxSlider({
			auto: true,
			speed: 500,
			pause: 3000,
			controls: false,
			pager: true,
			pagerSelector: '.' + obj + ' .slidePage'
		});
	}
	slideObj.mainSlide = slide;
}

function mainSlide2() {
	var obj = 'mainSlide2';
	if(osVer !== 'ie8') {
		var slide = new Swiper('.' + obj + ' .slide', {
			loop: true,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.' + obj + ' .slidePage',
				clickable: true,
				renderBullet: function (index, className) {
					return '<a href="#" class="' + className + '">' + (index + 1) + '</a>';
				},
			}
		});
	} else {
		var slide = $('.' + obj + ' .slide ul').bxSlider({
			auto: true,
			speed: 500,
			pause: 3000,
			controls: false,
			pager: true,
			pagerSelector: '.' + obj + ' .slidePage'
		});
	}
	slideObj.mainSlide2 = slide;
}

function mainSlide3() {
	var obj = 'mainSlide3';
	if(osVer !== 'ie8') {
		var slide = new Swiper('.' + obj + ' .slide', {
			loop: true,
			speed: 500,
			autoplay: {
				delay: 3000,
			},
			pagination: {
				el: '.' + obj + ' .slidePage',
				clickable: true,
				renderBullet: function (index, className) {
					return '<a href="#" class="' + className + '">' + (index + 1) + '</a>';
				},
			}
		});
	} else {
		var slide = $('.' + obj + ' .slide ul').bxSlider({
			auto: true,
			speed: 500,
			pause: 3000,
			prevText: '이전',
			prevSelector : '.' + obj + ' .slidePrev',
			nextText: '다음',
			nextSelector : '.' + obj + ' .slideNext',
			pager: true,
			pagerSelector: '.' + obj + ' .slidePage'
		});
	}
	slideObj.mainSlide3 = slide;
}

function mainSlide4() {
	var obj = 'mainSlide4';
	if(osVer !== 'ie8') {
		var slide = new Swiper('.' + obj + ' .slide', {
			loop: true,
			speed: 500,
			navigation: {
				nextEl: '.' + obj + ' .slideNext',
				prevEl: '.' + obj + ' .slidePrev',
			},
			pagination: {
				el: '.' + obj + ' .slidePage',
				clickable: true,
				renderBullet: function (index, className) {
					return '<a href="#" class="' + className + '">' + (index + 1) + '</a>';
				},
			}
		});
	} else {
		var slide = $('.' + obj + ' .slide ul').bxSlider({
			auto: false,
			speed: 500,
			pause: 3000,
			prevText: '이전',
			prevSelector : '.' + obj + ' .slidePrev',
			nextText: '다음',
			nextSelector : '.' + obj + ' .slideNext',
			pager: true,
			pagerSelector: '.' + obj + ' .slidePage'
		});
	}
	slideObj.mainSlide4 = slide;
}

function rollingSlide(obj) {
	var slideWrap = $(obj);
	var slideCont = slideWrap.find('.slideList');
	var slideItem = slideCont.find('li');
	var leftBtn = slideWrap.find('.btnPrev');
	var rightBtn = slideWrap.find('.btnNext');
	var direction = 'left';
	var position = 0;
	var slideContWidth;

	setTimeout(function(){
		slideCont.append(slideCont.html());
		slideContWidth = slideItem.outerWidth() * slideItem.length;
		slideWrap.action();
	},300);
	
	leftBtn.click(function(){
		clearInterval(timer);
		direction = 'left';
		slideWrap.action();
	})
	rightBtn.click(function(){
		clearInterval(timer);
		direction = 'right';
		slideWrap.action();
	})

	var timer;
	slideWrap.action = function(){
		timer = setInterval(function(){
			if (direction == 'left') {
				position--;
				if (position == '-' + slideContWidth) {
					position = 0;
				}
			}
			if (direction == 'right') {
				position++;
				if (position == 0) {
					position = '-' + slideContWidth;
				}
			}
			slideCont.css('left', position);
		},20);
	}
	slideCont.on('mouseenter focus', 'a', function(){
		clearInterval(timer);
	});
	slideCont.on('mouseleave focusout', 'a', function(){
		slideWrap.action();
	});
}

function layerOpen(ele) {
	var layer = $('#'+ele);
	layer.show();
}
function layerClose(ele) {
	var layer = $('#'+ele);
	layer.hide();
}
function layerFind(ele) {
	layerClose('loginLayer');
	layerOpen(ele);
}

function tabActive(obj, idx, type) {
	if(typeof obj !== 'string') {
		var $this = $(obj);
		var idx = $this.parent().index();
		var txt = $this.text();
		var tabContents = $this.closest('.tabMenu').next('.tabContents');

		if(type === true && !$this.parent().hasClass('active')) event.preventDefault();

		$this.parent().addClass('active').siblings().removeClass('active');
		
		if($this.closest('.tabMenu').prev('.tabBtn').is(':visible')) {
			$this.parent().parent().slideUp(200).prev('.tabBtn').text(txt);
		}
	} else {
		var tab = $('#' + obj);
		var menu = tab.find('li');
		var tabContents = tab.next('.tabContents');
		
		menu.eq(idx - 1).addClass('active').siblings().removeClass('active');
	}
	tabContents.find('.tabCont').eq(idx).addClass('active').siblings().removeClass('active');
}

function fileUpload(obj) {
	var $this = $(obj);
	var thisFile = $this[0].files;
	var thisVal = $this.val();
	var txtVal = $this.parent().prev('.inputTxt');
	
	(thisVal.length > 0 || thisFile.length > 0) ? txtVal.removeClass('error').addClass('active').val(thisVal) : txtVal.removeClass('active').val(thisVal);
}

function historyShow(obj) {
	var $this = $(obj);
	$this.toggleClass('active');
	$this.next('.cont').slideToggle(300);
}

function docTop() {
	$('html, body').animate({scrollTop: 0},300);
}

function layerAgree(obj) {
	$.ajax({
		url: '/member/' + obj + '.html',
		dataType: 'html',
		success: function(data){
			$('body').append(data);
			$('.layerPop').focus();
		}
	});
	event.preventDefault();
}
function agreeClose(obj) {
	var $this = $(obj);
	$this.closest('.layerPop').remove();
}

function rollingList(obj) {
	var list = $(obj);
	if (list.length) {
		var rollingList = list.find('ul'),
			listLength = rollingList.find('li').length,
			rollHeight = list.height(),
			idx = 0,num = 0;
		rollingList.find('li:first-child').clone().appendTo(rollingList);
		function rolling(idx) {
			rollHeight = list.height();
			num = idx * rollHeight;
			rollingList.animate({'margin-top':'-' + num + 'px'},500);
		}
		function rollTimer() {
			rollTime = setInterval(function(){
				if(idx === listLength) {
					idx = 1;
					rollingList.css({'margin-top':0});
					clearInterval(rollTime);
					rollTimer();
					rolling(idx);
				} else {
					idx++;
					rolling(idx);
				}
			}, 5000);
		}
		rollTimer();
	}
}

var floor = '';
function floorSlide() {
	var obj = 'floorSlide';
	if(ver !== 'ie8') {
		floor = new Swiper('.' + obj + '.active', {
			loop: true,
			speed: 500,
			pagination: {
				el: '.' + obj + '.active .slidePage',
				clickable: true,
				renderBullet: function (index, className) {
					return '<a href="#" class="' + className + '">' + (index + 1) + '</a>';
				},
			}
		});
	} else {
		floor = $('.' + obj + '.active ul').bxSlider({
			auto: false,
			speed: 500,
			pause: 3000,
			controls: false,
			pager: true,
			pagerSelector: '.' + obj + '.active .slidePage'
		});
	}
}

function floorShow(idx) {
	var floorTab = $('.floorTab span');
	var floorShow = $('.floorShowWrap .floorSlide');
	var floorInfo = $('.flootInfoSection li');

	if(ver !== 'ie8') {
		floor.destroy(true, true);
	} else {
		floor.destroySlider();
	}
	floorTab.eq(idx).addClass('active').siblings().removeClass('active');
	floorShow.eq(idx).addClass('active').siblings().removeClass('active');
	floorInfo.each(function(){
		if ($(this).data('idx') === idx) {
			$(this).addClass('active').siblings().removeClass('active');
		}
	});

	floorSlide();
	$('html, body').animate({scrollTop: $('.pageTitle').offset().top},300);
}

function tabOpen(obj) {
	var $this = $(obj);
	$this.toggleClass('open').next().slideToggle(200);
}

function accordionAct() {
	var target = event.target;
	var targetParent = target.parentNode;
	var relateTarget = targetParent.querySelector('.answer');
	if($(targetParent).hasClass('active')) {
		$(relateTarget).slideToggle();
		$(targetParent).removeClass('active');
		
	} else {
		$(targetParent).addClass('active');
		$(relateTarget).slideToggle();
	}
}



