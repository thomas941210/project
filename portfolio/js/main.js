$(function(){
	//모바일 버튼 누르면 열리고 닫힘
	$("#header .tab span.open").addClass("active");

	$("#header .tab").click(function(e){
		e.preventDefault();

		if(!$(this).hasClass("close")){
			$(this).addClass("close");
			$("#gnb").addClass("open");
			$("#header .tab span").removeClass("active");
			$("#header .tab span.close").addClass("active");
		}
		else{
			$(this).removeClass("close");
			$("#gnb").removeClass("open");
			$("#header .tab span").removeClass("active");
			$("#header .tab span.open").addClass("active");
		}
	});

	let n=0;

	function backgroundAniamtion(n){
		$(".project_bg").removeClass("active");
		$(".project_bg").eq(n).addClass("active");
	}

	let mainCurrent, mainTotal;

	const swiper=new Swiper(".mainSwiper", {
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		loop: true,
		pagination: {
			el: ".swiper-pagination",
			clickable: true
		},
		breakpoints: {
			480: {
				slidesPerView: 1,
				spaceBetween: 10
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 30
			},
			1020: {
				slidesPerView: 3,
				spaceBetween: 30
			}
		},
		on: {
			init: function(){
				backgroundAniamtion(n);
				mainCurrent = this.realIndex; //API
				mainTotal = this.slides.length; //API
				$("#start .account .current").text(mainCurrent+1);
				$("#start .account .length").text(mainTotal);

				setTimeout(() => {
					$("#start .progressbar span").animate({width: "100%"}, 5000);
				}, 50);
			},
			slideChange: function(){
				n=this.realIndex;
				backgroundAniamtion(n);
				mainCurrent = this.realIndex; //API
				$("#start .account .current").text(mainCurrent+1);

				$("#start .progressbar span").stop().removeAttr("style");

				setTimeout(function(){
					if($("#pause_play").hasClass("pause")){
						$("#start .progressbar span").animate({width: "100%"}, 6000);
					}
					else{
						$("#start .progressbar span").removeAttr("style");
					}
					}, 50);
			}

			
		}
	});

	//pauseplay 버튼 변경
	$("#pause_play").click(function(e){
		e.preventDefault();
		console.log("clicked");

		if($(this).hasClass("play")){
			$(this).removeAttr("class");
			$(this).addClass("pause");
			$(this).text("pause");
			swiper.autoplay.start();
			$("#start .progressbar span").stop().removeAttr("style");

			setTimeout(function(){
				$("#start .progressbar span").animate({width: "100%"}, 6000);
			}, 50);
		}
		else{
			$(this).removeAttr("class");
			$(this).addClass("play");
			$(this).text("play");
			swiper.autoplay.stop();
			$("#start .progressbar span").stop();
		}
	});

	//글자모션
	let timerN=1;

	setTimeout(function(){
		$(".motion_text .text"+timerN).addClass("active");
	}, 50);

	let textTimer=setInterval(function(){
		if(timerN < 2){
			timerN++;
		}
		else{
			timerN=1;
		}

		$("#start .motion_text .text1").removeClass("active");
		$("#start .motion_text .text"+timerN).addClass("active");
	}, 5000);

	//pause play 갯수확인
	

	//tab 버튼 UI
	let tabWidth=[];
	let tabN=0;
	let tabClickN=0;
	let tabLeft;

	$(window).resize(function(){
		tabLeft=$("#page2 .category .list").offset().left;
	});

	$(window).trigger("resize");

	$("#page2 .category .list li").each(function(i){
		tabWidth.push($(this).find("a").width());
	});

	let tabInteraction=() => {
		$("#page2 .category .line").css({
			left: $("#page2 .category .list li").eq(tabN).offset().left-tabLeft,
			width: tabWidth[tabN]
		});
	};

	tabInteraction();

	$("#page2 .category .list li").hover(
		function(){
			tabN=$(this).index();
			tabInteraction();
		},
		function(){
			tabN=tabClickN;
			tabInteraction();
		}
	);
	$("#page2 .category .list li").click(function(e){
		e.preventDefault();
		tabClickN=$(this).index();

		let targety=$(".port_list_item").eq(tabClickN).offset().top;

		$("html").animate({scrollTop: targety}, 600);
	});

	// top 버튼 클릭시 부드러운 스크롤
	$('.top_btn').click(function(e){
		e.preventDefault();
		$('html').animate({scrollTop:0}, 400);
	});

	// 스크롤시 top 버튼 보임
	$(window).scroll(function(){
		wint = $(window).scrollTop();
	
		// 페럴렉스 구현 이벤트 실행
		if(wint < $('#start').offset().top){
			pageN = 0;
		}else if(wint < $('#page1').offset().top){
			pageN = 1;
		}else if(wint < $('#page2').offset().top){
			pageN = 2;

			if($(window).height()+wint == $(document).height()){
				pageN = 3;
			}
		}else{
			pageN = 3;
		}

		if(wint > 100){
			$('.top_btn').addClass('active');
		}else{
			$('.top_btn').removeClass('active');
		}

		if(wint > $('#page2').offset().top){
			$('#page2 .category').addClass('fixed');
		}else{
			$('#page2 .category').removeClass('fixed');
		}

		//글씨색상 변경
		if(pageN === 2 || pageN === 3){
            $('#header .header_inner .logo').addClass('color');
			$("#header .header_inner .tab a .open img").attr("src","images/tab_open_black.png");
        }else{
            $('#header .header_inner .logo').removeClass('color');
			$("#header .header_inner .tab a .open img").attr("src","images/tab_open.png");
        }
	});

	$(window).trigger('scroll');

	// scrollTrigger Library입니다.
    const trigger=new ScrollTrigger.default({
        trigger: {
            once: true,
            toggle: {
                class: {
                    in: "action",
                    out: "inaction"
                }
            },
            offset: {
                viewport: {
                    x: 0,
                    y: 0.25
                }
            }
        }
    });

    trigger.add("#start, div[id^=page]");
    const linkArray = [
    '#main', '#page1', '#page2', '#page3'
    ];

	//click 이벤트
    $('#gnb li').click(function(e){
        e.preventDefault();

        pageN = $(this).index();
		$("#header .tab").removeClass("close");
		$("#gnb").removeClass("open");
		$("#header .tab span").removeClass("active");
		$("#header .tab span.open").addClass("active");

		pageN = $(this).index();

        setTimeout(function(){
            let target = $(linkArray[pageN]);
            pos = target.offset().top;
            $('html').animate({scrollTop: pos}, 600);
        }, 500);
    });


});