;
'use strict';

$(function () {
  // SWIPER
  var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical',
    loop: true,
    nextButton:       '.swiper-button-next',
    prevButton:       '.swiper-button-prev',
  });
  // MASONRY
  var $grid = $('.ideas_grid').masonry({
    columnWidth:      '.ideas_gridsizer',
    gutter:           '.ideas_gridgutter',
    itemSelector:     '.ideas_griditem',
    percentPosition:  true
  });
  // PIXABAY
  function getPhoto(word) {
    $.ajax({
      url: "https://pixabay.com/api/?key=4637864-fd9b41e5c30cd0d927fad72c1&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q="+ word,
      dataType: 'json',
      success: function (data, textStatus, xhr) {
       console.log(data, textStatus, xhr.status);
        var $item = $(".ideas_griditem");
        for(var i = 0; i < $item.length; i++){
          $item[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center";
          $item[i].style.backgroundSize = "cover";
          $item[i].innerHTML = "<p class='ideas_gridparagraph'>"+data.hits[i].tags+"</p>";
        }

      },
      error: function(xhr, textStatus, errorThrown){
        console.log(xhr, textStatus, errorThrown);
      }
    });
  };

  var firstKey = ["nature", "autumn", "forest", "lake", "village", "city", "ship", "travel", "winter"];
  var index = Math.floor(Math.random() * 9);
  getPhoto(firstKey[index]);

  $('.ideas_search').click(function(e){
    e.preventDefault();
    var word = $('.ideas_question').val();
    getPhoto(word);
  });
  window.addEventListener('keydown', function (e) {
      if(e.keyCode == 9){
        e.preventDefault();
        $('.ideas_question').focus();
      }
      if (e.keyCode == 13) {
      e.preventDefault();
      var word = $('.ideas_question').val();
      getPhoto(word);
    }
  });
});
