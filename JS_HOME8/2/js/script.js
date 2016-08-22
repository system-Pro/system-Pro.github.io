$(function () {
    var $label = $('input[type=text]');
    var $tooltip = $('.tooltip');
    var $button = $('input[type=button]');
    $label.mouseover(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        console.log(id);
        $(id).fadeIn('fast');
    });
    $label.mouseout(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        $(id).fadeOut('fast');
    });
    $button.on('click', function () {
        $tooltip.toggle('slow');
    });
});