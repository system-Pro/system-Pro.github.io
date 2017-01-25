$(function(){
	'use strict';
	// SLIDER
	$('.jcarousel').jcarousel({
        // Core configuration goes here
        wrap: 'circular'
    })
    .jcarouselAutoscroll({
        interval: 6000,
        target: '+=1',
        autostart: true
    });

	// ACCORDION
	var $allHead = $('.myAccordion__head');
	var $allPanels = $('.myAccordion__text');
	$allPanels.not(":eq(0)").hide();
	$allHead.click(function(){
	 	$allPanels.not(this).finish('').slideUp('ease-in-out').delay(400);
		$(this).next().slideDown('ease-in-out');
		$allHead.find('.fa-minus').removeClass('fa-minus');
		$allHead.find('.myAccordion__title--active').removeClass('myAccordion__title--active');
	 	$(this).find('i').addClass('fa-minus');
	 	$(this).find('.myAccordion__title').addClass('myAccordion__title--active');
	 	$allHead.removeClass('myAccordion__head--active');
	 	$(this).addClass('myAccordion__head--active');
	});
});
