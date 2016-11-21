(function ($) {
    $.fn.mycarousel = function () {
        var $carousel = $(this);
        var $left = $carousel.find('.carousel__left');
        var $right = $carousel.find('.carousel__right');
        var $list = $carousel.find('.carousel__list');
        var $liCount = $list.find('.carousel__element').length;

        var pixelsOffset = 125;
        var currentLeftValue = 0;

        var minOffset = -(($liCount - 5) * pixelsOffset);
        var maxOffset = 0;

        $left.click(moveLeft);
        $right.click(moveRight);
        console.log("start: "+ currentLeftValue);

        function moveLeft() {
            if (currentLeftValue != maxOffset) {
                currentLeftValue += 125;
                $list.animate({ left: currentLeftValue + 'px' }, 500);
                console.log("left: " + currentLeftValue);
            }
        }

        function moveRight() {
            if (currentLeftValue != minOffset) {
                currentLeftValue -= 125;
                $list.animate({ left: currentLeftValue + 'px' }, 500);
                console.log("right: " + currentLeftValue);
            }
        }
        
        return this;
    }
})(jQuery);