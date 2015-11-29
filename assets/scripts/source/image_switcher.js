var $ = require('jquery');

$(function() {
    preloadItemImages();
    window.setInterval(loopImages, 5000);
});

function loopImages() {
    $('div.item').each(function(i, item) {
        var $imgEle = $(item).find('img');
        var itemImages = menu[item.id].images;
        itemImages.every(function(image, i) {
            if ($imgEle.attr('src') === image) {
                $imgEle.attr('src', itemImages[(i+1) % itemImages.length]);
                return false;
            }
            return true;
        });
    });
}

function preloadItemImages() {
    $('div.item').each(function(i, item) {
        menu[item.id].images.forEach(function(image, j) {
            var tempImage = new Image();
            tempImage.src = image;
        });
    });
}