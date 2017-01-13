$(function(){
	 $('.jcarousel').jcarousel({
         // Core configuration goes here
         wrap: 'circular'
     })
     .jcarouselAutoscroll({
         interval: 7000,
         target: '+=1',
         autostart: true
     });
});
