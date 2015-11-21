var $ = require('jquery');

$('div.one-third.column').click(function(e) {
    console.log(menu[e.currentTarget.id]);
});