
// 1) slider 관련
$(function(){
	var mainSwiper=new Swiper(".mainSwiper", {
		// deleted
		/*
		navigation: {
			nextEl: ".mainSwiper .swiper-button-next",
			prevEl: ".mainSwiper .swiper-button-prev"
		},
		*/

		loop: true, // added
		autoplay: { // added
			delay: 5000
		},

		pagination: {
			el: ".mainSwiper .swiper-pagination"
		},

		/*
		pagination: {
			el: ".mainSwiper .swiper-pagination",
			type: "fraction"
		}
		*/
	});

	$(".main_slider .prev").click(function(e){ // added
		e.preventDefault();
		mainSwiper.slidePrev();
	});
	$(".main_slider .next").click(function(e){ // added
		e.preventDefault();
		mainSwiper.slideNext();
	});
});