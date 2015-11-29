var $ = require('jquery');
var _ = require('underscore');

require('../image_switcher');

var orderItems = [];
var itemTemplate = _.template('<div class="row">' +
                                   '<div class="nine columns">' +
                                       '<input class="u-full-width" id="item_<%- id %>" type="text" name="item_<%- id %>" placeholder="Item<%- id === 0 ? " *" : "" %>" value="<%- name %>">' +
                                   '</div>' +
                                   '<div class="three columns">' +
                                       '<input class="u-full-width" id="item_<%- id %>_quantity" type="text" name="item_<%- id %>_quantity" placeholder="Quantity" value="<%- quantity %>">' +
                                   '</div>' +
                              '</div>');

$(function() {
    renderOrderItems();
    
    $(document).on('change', 'input[id^=item_]', handleItemKeyDown);
    
    $('div.item').click(function(e) {
        addItemToOrder(e.currentTarget.id);
        $(e.currentTarget).find('.item-description').hide();
        $(e.currentTarget).find('.item-added').show();
        $(e.currentTarget).find('.item-filter').css({ opacity: 1 });
        
        window.setTimeout(function() {
            $(e.currentTarget).find('.item-filter').removeAttr('style');
        }, 1800);
        
        window.setTimeout(function() {
            $(e.currentTarget).find('.item-description').show();
            $(e.currentTarget).find('.item-added').hide();
        }, 2000);
    });
});

function addItemToOrder(itemId) {
    var i = 0;
    while (true) {
        var input = $('#item_' + i);
        if (!input.val()) {
            input.val(menu[itemId].title);
            input.change();
            break;
        }
        i++;
    }
}

function handleItemKeyDown(e) {
    var itemIndex = e.target.id.split('_')[1];
    var item = $('#item_' + itemIndex);
    var itemQuantity = $('#item_' + itemIndex + '_quantity');
    var isItemRowEmpty = !item.val() && !itemQuantity.val();
    if (isItemRowEmpty) {
        orderItems.splice(itemIndex, 1);
    } else {
        orderItems[itemIndex] = {
            name: item.val(),
            quantity: itemQuantity.val(),
        };
    }
    renderOrderItems();
}

function renderOrderItems() {
    $('#order_items').empty();
    orderItems.forEach(function(item, i) {
        $('#order_items').append(itemTemplate({
            id: i,
            name: item.name,
            quantity: item.quantity,
        }));
    });
    $('#order_items').append(itemTemplate({
        id: orderItems.length,
        name: '',
        quantity: '',
    }));
}