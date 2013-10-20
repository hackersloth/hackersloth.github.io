var ENTER_KEY = 13;
var password_prompt = 'Enter the secret password to find out!'
// var hint = "(check out the source code for inspiration)"
var hint = "(hint: inspect me!)"
// var hint_html = "<!-- SUPER SECRET PASSWORD: hackersloth -->"
var first_password = false;
var party_sloths = {
    'images/sexy.gif': 0, 
    'images/swag.gif': 1, 
    'images/gangsta.gif': 2, 
    'images/yolo.gif': 3
}
var loaded_party_sloths = [];
// var num_party_sloths = 4;

$(function() {
    $('.button').mouseup(enter_password);
    $('#password input[type="password"]').keypress(function(e) {
        if (e.which == ENTER_KEY) {
            enter_password();
        }
    });
});

function enter_password() {
    if (!first_password) {
        if ($('#password input[type="password"]').val() == 'hell yeah') {
            first_transition();
        }
        else {
            $('#password input[type="password"]').flash('#FF3400', 400);
        }
    }
    else {
        if ($('#password input[type="password"]').val() == 'hackersloth') {
            birthday();
        }
        else {
            $('#password input[type="password"]').flash('#FF3400', 400);
        }
    }
}

function first_transition() {
    first_password = true;
    var head = $('<h1>').html('Hey, Anne!').attr('id', 'message').hide();
    $('body').prepend(head);
    $.get('time.html', function(data) {
        var time = $('<div>').attr('id', 'time').hide();
        var img = $('<img>').attr('src', 'images/time.jpg');
        img.load(function() {
            time.append($(this));
            head.after(time);
            head.fadeIn();
            time.slideDown();
            $('#password p').html(password_prompt);
            $('#password input[type="password"]').val('');
            $('#password').append(
                $('<p>').addClass('hint').html(hint).attr('data-password', 'hackersloth')
            );
        });
    });
}

function birthday() {
    // var sexy = $('<img>').attr('src', 'images/sexy.gif').load(img_load);
    // var swag = $('<img>').attr('src', 'images/swag.gif').load(img_load);
    // var gangsta = $('<img>').attr('src', 'images/gangsta.gif').load(img_load);
    // var yolo = $('<img>').attr('src', 'images/yolo.gif').load(img_load);
    for (var sloth in party_sloths) {
        if (party_sloths.hasOwnProperty(sloth)) {
            $('<img>').attr('src', sloth).load(img_load);
        }
    }
}

function img_load() {
    loaded_party_sloths.push($(this));
    if (Object.keys(party_sloths).length == loaded_party_sloths.length) {
        second_transition();
    }
}

function second_transition() {
    loaded_party_sloths = loaded_party_sloths.sort(function(a, b) {
        return party_sloths[a.attr('src')] - party_sloths[b.attr('src')];
    }); 
    var next_div = $('<div>').attr({
        'id': 'next',
        'class': 'clearfix' 
    }).hide();
    $('#time').before(next_div);
    var len = Object.keys(loaded_party_sloths).length;
    for (var i = 0; i < len; i++) {
        sloth = loaded_party_sloths[i];
        next_div.append(sloth);
    }
    $('#password').fadeOut();
    $('#time').fadeOut().promise().done(function() {
        $('#next').fadeIn();
    });
    $('#message').fadeOut().promise().done(function() {
        $(this).html('TIME TO PARTY!').fadeIn();
        $('#wish').fadeIn();
    });
}

$.fn.flash = function(highlightColor, duration) {
    var highlightBg = highlightColor || '#FFFF9C';
    var animateMs = duration || 1500;
    var originalBg = this.css('background-color');
    this.stop().css('background-color', highlightBg).animate({'background-color': originalBg}, animateMs);
};
