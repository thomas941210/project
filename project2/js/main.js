$(function(){
	// 1) navigation 관련
	var total=$("nav > ul > li").length;

	$("nav > ul > li").hover(
		function(){
			$(this).addClass("active");
			$("nav").stop().animate({height:300}, 300);
		},
		function(){
			$(this).removeClass("active");
			$("nav").stop().animate({height:67}, 300);
		}
	);
	$("nav > ul > li > a").focusin(function(){
		$(this).parent().addClass("active");

		if($(this).parent().index() == 0){
			$("nav").stop().animate({height:300}, 300);
		}
	});
	$("nav li li:last-child a").focusout(function(){
		var $depth1Li=$(this).parent().parent().parent();

		$depth1Li.removeClass("active");

		if($depth1Li.index() == (total-1)){
			$("nav").stop().animate({height : 67}, 300);
		}
	});

	// 2) slider 관련
	var sliderN=0;
	var sliderPos;
	var total=6;

	$(".controlls").find("li").eq(sliderN).find("a").addClass("active");

	$(".controlls").find("a").click(function(e){
		e.preventDefault();
		$(".controlls").find("li").removeClass("active");
		$(this).parent().addClass("active");

		sliderN=$(this).parent().index();
		sliderPos=sliderN*-1*100+"%";
		$(".keyvisual_inner").animate({left:sliderPos}, 500);
	});
	$(".direction .left").click(function(e){
		e.preventDefault();
		if(sliderN > 0){
			sliderN=sliderN-1;
			$(".controlls").find("li").removeClass("active");
			$(".controlls").find("li").eq(n).addClass("active");
			sliderPos=sliderN*-1*100+"%";
			$(".keyvisual_inner").animate({left:sliderPos}, 500);
		}
	});
	$(".direction .right").click(function(e){
		e.preventDefault();
		if(sliderN < (total-1)){
			sliderN=sliderN+1;
			$(".controlls").find("li").removeClass("active");
			$(".controlls").find("li").eq(n).addClass("active");
			sliderPos=sliderN*-1*100+"%";
			$(".keyvisual_inner").animate({left:sliderPos}, 500);
		}
	});

	// 3) 공지사항 탭
	var tabN=0;
	$(".main_tab li").eq(tabN).addClass("active");
	$(".main_panel div").eq(tabN).addClass("active");

	$(".main_tab li").click(function(e){
		e.preventDefault();
		tabN=$(this).index();
		$(".main_tab li").removeClass("active");
		$(this).addClass("active");
		$(".main_panel div").removeClass("active");
		$(".main_panel div").eq(tabN).addClass("active");
	});

	// 4) 캠퍼스 미디어 배너
	var listName="";

	$(".campus_find dt a").click(function(e){
		e.preventDefault();
		if($(this).parent().next("dd").is(":visible") == false) {
			$(".campus_find dd").slideUp(300);
			$(this).parent().next("dd").slideDown(300);
			$(this).addClass("active");
		}
		else {
			$(this).parent().next("dd").slideUp(300);
			$(this).removeClass("active");
		}
	});
	$(".campus_find dd a").click(function(e){
		e.preventDefault();
		$(".campus_find dd a").removeClass("active");
		$(".campus_find dd").slideUp(300);
		$(".campus_find dt a").removeClass("active");
		listName=$(this).text();
		$(this).parents("li").find("dt a").html(listName);
	});

	// 5) 캠퍼스 미디어 배너
	var bannerN=0;
	var bannerPos=0;
	$(".campus_pager li").eq(bannerN).addClass("active");

	$(".campus_pager li").click(function(e){
		e.preventDefault();
		$(".campus_pager li").removeClass("active");
		$(this).addClass("active");
		bannerN=$(this).index();
		bannerPos=-1*368*bannerN;
		$(".campus_wrap_moving").animate({left:bannerPos}, 300);
	});

	// 6) 패밀리사이트 배너
	var familyPos=0;
	var bannerWidth=164;

	$(".prev").click(function(e){
		e.preventDefault();
		leftMoving();
	});
	$(".next").click(function(e){
		e.preventDefault();
		rightMoving();
	});
	function leftMoving(){
		familyPos-=bannerWidth;
		$(".site_wrapper ul").animate({left:familyPos}, 500, function(){
			$(this).append($(".site_wrapper ul li:first-child"));
			familyPos+=bannerWidth;
			$(this).css({left:familyPos});
		});
	}
	function rightMoving(){
		$(".site_wrapper ul").prepend($(".site_wrapper ul li:last-child"));
		familyPos-=bannerWidth;
		$(".site_wrapper ul").css({left:familyPos});
		familyPos+=bannerWidth;
		$(".site_wrapper ul").animate({left:familyPos}, 500);
	}
});