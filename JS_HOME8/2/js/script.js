$(function () {
    var $label = $('.myform label');
    var $tooltip = $('.tooltip');
    var $button = $('input[type=button]');
    $label.mouseover(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        console.log(id);
        $(id).stop().fadeIn('fast');
    });
    $label.mouseout(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        $(id).stop().fadeOut('fast');
    });
    $button.on('click', function () {
        $tooltip.toggle('fast');
    });
});