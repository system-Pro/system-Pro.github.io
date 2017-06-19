$(function () {
    var $links = $('.nav__item');
    var $tabs = $('.tab__panel');
    $links.on('click', function () {
        if (!$(this).hasClass('nav__item--active')) {
            $links.removeClass('nav__item--active');
            //$tabs.css('display', 'none').removeClass('tab__panel--active');
            $tabs.hide();
            $(this).addClass('nav__item--active');
            var id = "#" + ($(this).attr('data-item'));
            //$(id).fadeIn('slow').addClass('tab__panel--active');
            $(id).fadeIn('slow');
        }
    });
});