;
$(function () {
    function getPhoto() {
        var word = $('.text-field').val();
        var counter = counter ? counter : 4;
        var loader = $('.loader');
        $.ajax({
            url: 'https://api.riffsy.com/v1/search?key=LIVDSRZULELA&tag=' + word + '&limit=' + counter,
            dataType: 'json',
            beforeSend: function () {
                loader.show(0);
            },
            complete: function () {
                loader.delay(2000).hide(400);
            },
            success: function (data, textStatus, xhr) {
                console.log(data, textStatus, xhr.status);
                var $img = $('.image');
                $img.children().remove();
                if (data.results.length == 0) {
                    $img.append('<p>Nothing found</p>');
                }
                for (var i = 0; i < data.results.length; i++) {
                    var imgSrc = data.results[i].url;
                    $img.append('<img src="' + imgSrc + '" alt="img' + [i + 1] + '" />');
                }
            },
        });
    };

    $('.mbtn').click(getPhoto);
    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            getPhoto();
        }
    })
});