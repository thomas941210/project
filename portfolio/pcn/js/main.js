$(function(){
    let wint;
    let pageN = 0;
    let pos = 0;

    //페럴렉스 구현 이벤트 실행

    $(window).scroll(function(){
        wint = $(window).scrollTop();

        if(wint < $('#page1').offset().top){
            pageN = 0;
        }else if(wint < $('#page2').offset().top){
            pageN = 1;
        }else if(wint < $('#page3').offset().top){
            pageN = 2;
        }else if(wint < $('#page4').offset().top){
            pageN = 3;
        }else if(wint < $('#page5').offset().top){
            pageN = 4;

            if($(window).height()+wint == $(document).height()){
                pageN = 5;
            }
        }else{
            pageN = 5;
        }


        //스크롤시 top_btn 생성
        if(wint > 100){
            $('.top_btn').addClass('active');
        }else{
            $('.top_btn').removeClass('active');
        }
        //console.log(pageN);

        $("#gnb li").removeClass("action");
        $("#gnb li").eq(pageN).addClass("action");

        // pageN 1, 2, 3, 4, 5 메뉴글씨 색상변경
        if(pageN === 1 || pageN === 2 || pageN === 3 || pageN === 4 || pageN === 5){
            $('.top').addClass('color');
        }else{
            $('.top').removeClass('color');
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

    trigger.add("#main, div[id^=page]");
    const linkArray = [
    '#main', '#page1', '#page2', '#page3', '#page4', '#page5'
    ];


    //click 이벤트
    $('#gnb li').click(function(e){
        e.preventDefault();

        pageN = $(this).index();
        // console.log(linkArray[pageN]); // #start

        let target = $(linkArray[pageN]);
        //$('#start').offset().top

        pos = target.offset().top;
        $('html').animate({scrollTop: pos}, 600);
    });
    
    $('#total .tabs').click(function(e){
        e.preventDefault();

        if($(this).hasClass('action') === false){
            $('body').addClass('fixed'); //overflow-y : hidden;
            $(this).addClass('action'); // x
            $('#total .mobilemenu').fadeIn(300);
            $('#total').addClass('open');
            $('.dim').addClass('action');
        }else{
            $('body').removeClass('fixed');
            $(this).removeClass('action');
            $('#total .mobilemenu').fadeIn(300);
            $('#total').removeClass('open');
            $('.dim').removeClass('action');
        }
    });

    //메뉴 열리는 버튼
    /*
    $('.tabs').click(function(e){
        e.preventDefault();
        $('body').toggleClass('fixed');
        $('#total').toggleClass('open'); //오른쪽에서부터 옴
        $('.dim').toggleClass('action');
    });
    */

    //해상도가 720보다 커지면 모바일 메뉴 사라짐
    let winw;
    $(window).resize(function(){
        winw = $(window).width();

        //pc해상도
        if(winw > 720){
            if($('#total').hasClass('open')){
                $('body').removeAttr('class');
                $('#total').removeClass('open');
                $('.dim').removeClass('action');

            }
        }
    });
    
    //모바일 메뉴펼쳐져서 눌리면 이동
    $('#total .mobilemenu li').click(function(e){
        e.preventDefault();

        pageN = $(this).index();
        $('body').removeClass('fixed');
        $('#total').removeClass('open');
        $('.dim').removeClass('action');
        $('#total .mobilemenu').fadeOut(300);



        pageN = $(this).index();

        setTimeout(function(){
            let target = $(linkArray[pageN]);
            pos = target.offset().top;
            $('html').animate({scrollTop: pos}, 600);
        }, 500);
    });

    //dim부분 눌렸을때 닫힘
    $('.dim').click(function(){
        $('body').removeClass('fixed');
        $('#total').removeClass('open'); //오른쪽에서부터 옴
        $('.dim').removeClass('action');
    });

    //top_btn click시 부드러운 이펙트
    $('.top_btn').click(function(e){
        e.preventDefault();
        $('html').animate({scrollTop:0}, 400);
    });
});