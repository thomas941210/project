$(function(){
	$("#gnb > ul > li").hover(
		function(){
			$(this).addClass("active");
			$(".menu_bg").addClass("active");
		},
		function(){
			$(this).removeClass("active");
			$(".menu_bg").removeClass("active");
		}
	);
	$("#gnb > ul > li > a").focusin(function(){
		if($("#header").hasClass("scrolled") == false) $("#header").addClass("scrolled");
		$(this).parent().addClass("active");
		$(".menu_bg").addClass("active");
	});
	$("#gnb li li:last-child a").focusout(function(){
		if($("#header").hasClass("scrolled") == true) $("#header").removeClass("scrolled");
		$(this).parent().parent().parent().removeClass("active");
		$(".menu_bg").removeClass("active");
	});

	var winT;
	var firstTop=true;

	$("#header").hover(
		function(){
			if($(this).hasClass("scrolled") == false) $(this).addClass("scrolled");
		},
		function(){
			if($(this).hasClass("scrolled") == true && firstTop == true) $(this).removeClass("scrolled");
		}
	);
	$(window).scroll(function(){
		winT=$(window).scrollTop();

		if(winT > 100){
			if($("#header").hasClass("scrolled") == false) $("#header").addClass("scrolled");
			firstTop=false;
		}
		else{
			if($("#header").hasClass("scrolled") == true) $("#header").removeClass("scrolled");
			firstTop=true;
		}
	});

	$("#header .utils a.tabs").click(function(e){
		e.preventDefault();
		// $(".popup").fadeIn(300);
		$(".popup").addClass("view")
						.css({opacity: 0})
						.animate({opacity: 1}, 300);
		$(".dimmed").fadeIn(300);
		$("body").addClass("fixed");
		$(this).addClass("active");
	});
	$(".popup .content_box .close_btn").click(function(e){
		e.preventDefault();
		// $(".popup").fadeOut(300);
		$(".popup").animate({opacity: 0}, 300, function(){
			$(this).removeClass("view");
		});
		$(".dimmed").fadeOut(300);
		$("body").removeClass("fixed");
		$("#header .utils a.tabs").removeClass("active");
	});

	var mainTotal, mainCurrent;
	var mainStatus="play";

	var mainSwiper=new Swiper(".mainSwiper", {
		speed: 1200,
		effect: "fade",
		fadeEffect: {
			crossFade: true
		},
		loop: true,
		autoplay: {
			disableOnInteraction: false,
			delay: 5000
		},
		pagination: {
			el: ".mainSwiper .swiper-pagination",
			type: "progressbar"
		},
		on: {
			init: function(){
				mainTotal=this.slides.length-2;
				mainCurrent=this.activeIndex;
				$(".main_slider .account .current").text(mainCurrent);
				$(".main_slider .account .total").text(mainTotal);
			},
			slideChange: function(){
				if(this.activeIndex <= mainTotal){
					mainCurrent=this.activeIndex;

					if(this.activeIndex == 0){
						mainCurrent=mainTotal;
					}
				}
				else{
					mainCurrent=1;
				}
				$(".main_slider .account .current").text(mainCurrent);
			},
		}
	});

	$(".main_slider .prev").click(function(e){
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .next").click(function(e){
		e.preventDefault();
		mainSwiper.slideNext();
	});
	$("#pause_play").click(function(e){
		e.preventDefault();
		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			mainSwiper.autoplay.start();
			mainStatus="play";
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			mainSwiper.autoplay.stop();
			mainStatus="pause";
		}
	});

	var sub1Status="play";

	var sub1Swiper=new Swiper(".sub1Swiper", {
		centeredSlides: true,
		slidesPerView: 1.5,
		spaceBetween: 30,
		speed: 1000,
		pagination: {
			el: ".sub1Swiper .swiper-pagination",
			type: "progressbar"
		},
		navigation: {
		nextEl: ".sub_slider .swiper-button-next",
		prevEl: ".sub_slider .swiper-button-prev"
		},
		breakpoints: {
			640: {
				slidesPerView: 2.5,
				spaceBetween: 50
			},
			960: {
				slidesPerView: 4,
				spaceBetween: 50
			}
		},
		loop: true,
		autoplay: {
			disableOnInteraction: false,
			delay: 3000
		},
	});

	var scrollbar=$(".sub_slider1 .swiper-pagination-progressbar");

	$(".sub_slider1 .swiper-button-prev").click(function(e){
		e.preventDefault();
		sub1Swiper.slidePrev();
	});
	$(".sub_slider1 .swiper-button-next").click(function(e){
		e.preventDefault();
		sub1Swiper.slideNext();
	});
	$("#pause_play_sub").click(function(e){
		e.preventDefault();
		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			sub1Swiper.autoplay.start();
			sub1Status="play";
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			sub1Swiper.autoplay.stop();
			sub1Status="pause";
		}
	});

	var sub2Status="play";

	var sub2Swiper=new Swiper(".sub2Swiper", {
		centeredSlides: true,
		loop: true,
		slidesPerView: 1.3,
		spaceBetween: 30,
		speed: 1000,
		autoplay: {
			disableOnInteraction: false,
			delay: 4000
		},
	});

	$(".sub_slider2 .swiper-button-prev").click(function(e){
		e.preventDefault();
		sub2Swiper.slidePrev();
	});
	$(".sub_slider2 .swiper-button-next").click(function(e){
		e.preventDefault();
		sub2Swiper.slideNext();
	});

	var winW=$(window).width();
	var sub3Swiper=null;

	function initSwiper(){
		if(winW > 1280 && sub3Swiper == null){
			sub3Swiper=new Swiper(".sub3Swiper", {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				}
			});
		}
		else if(winW <= 1280 && sub3Swiper != null){
			sub3Swiper.destroy();
			sub3Swiper=null;
		}
	}

	initSwiper();

	$(window).resize(function(){
		winW=window.innerWidth;
		initSwiper();
	});

	$(".sub_slider3 .swiper-button-prev").click(function(e){
		e.preventDefault();
		sub3Swiper.slidePrev();
	});
	$(".sub_slider3 .swiper-button-next").click(function(e){
		e.preventDefault();
		sub3Swiper.slideNext();
	});
	$(".sub_slider3 .swiper-slide").hover(
		function(){
			$(this).find("a").fadeIn(300);
		},
		function(){
			$(this).find("a").fadeOut(200);
		}
	);
	$(".family_site").click(function(e){
		e.preventDefault();
		$(this).find(".content").slideToggle(300);
		$(this).find("img").toggleClass("active");
	});
});