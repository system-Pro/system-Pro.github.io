$(function () {

    var $label = $('.myform label');
    var labelPosition = 1;     //перемещение tab
    var $tooltip = $('.tooltip');
    var $button = $('input[type=button]');
    var buttonPosition = false;
    $label.mouseover(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        $(id).stop().fadeIn('fast');
    });
    $label.mouseout(function () {
        var id = '#' + ($(this).attr('data-tooltip'));
        $(id).stop().fadeOut('fast');
    });
    $button.on('click', function () {
        if (buttonPosition == false) {
            $tooltip.stop().fadeIn('fast');
            buttonPosition = true;
        }
        else {
            $tooltip.stop().fadeOut('fast');
            buttonPosition = false;
        }
    });

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 9) {
            e.preventDefault();
            if (labelPosition > $label.length) {
                labelPosition = 1;
            }
            $('.inp' + labelPosition).focus();
            if (labelPosition == 1) {
                $('#' + $label.length).stop().fadeOut('fast');
            }
            $('#' + (labelPosition-1)).stop().fadeOut('fast');
            $('#' + labelPosition).stop().fadeIn('fast');
            labelPosition++;
        }
    })
    
});