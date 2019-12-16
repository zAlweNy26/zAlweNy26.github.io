$(document).ready(function () {
    let burger = false;

    $('.hamburger').click(function() {
        $('.hamburger').toggleClass('is-active');
        if (burger) {
            $('header').css({
                'animation': 'closeBurger 0.5s ease-in-out forwards'
            });
        } else {
            $('header').css({
                'animation': 'openBurger 0.5s ease-in-out forwards'
            });
        }
        burger = !burger;
    });

    let links = ["#intro", "#about", "#skills", "#projects"]

    for (let index = 0; index < links.length; index++) {
        $('a[href^="' + links[index] + '"]').click(function() {
            var offsetTop = $(links[index]).offset().top;
            if (offsetTop && Math.floor(offsetTop) != $(document).scrollTop()) {
                $('html,body').animate({
                    scrollTop: offsetTop - 64
                }, 1000, function() {
                    if ($("#burger").is(":visible") && index > 0) {
                        $('header').css({
                            'animation': 'closeBurger 0.5s ease-in-out forwards'
                        });
                        $('.hamburger').removeClass('is-active');
                        burger = false;
                    }
                    if (index == 2) {
                        $(".bar").each(function() {
                            $(this)[0].style.strokeDasharray = 410;
                            $(this)[0].style.strokeDashoffset = 410;
                            var progress = $(this).parents(".skillcircle").attr("data-pct") / 100;
                            var dashoffset = CIRCUMFERENCE * (1 - progress);
                            $(this).animate({
                                'stroke-dashoffset': dashoffset,
                            }, 1000);
                        });
                    }
                });
                return false;
            }
        });
    }

    $('#discord div').hover(function () {
        $("#discord div").animate({
           width: '135px'
        }, { duration: 0, queue: false });
        $("#discord div i").animate({
           opacity: 1
        }, { duration: 750, queue: false });
        $('#discord div i, #discord div a').css({
            'text-shadow': '0 0 15px #202020, 0 0 20px #202020'
        });
    }, function () {
        $("#discord div").animate({
           width: '100px'
        }, { duration: 0, queue: false });
        $("#discord div i").animate({
           opacity: 0
        }, { duration: 500, queue: false });
        $('#discord div i, #discord div a').css({
            'text-shadow': 'none'
        });
    });

    if ($(window).scrollTop() == 0) {
        $('#clipFill circle').css({
            'animation': 'fillIntro 1.75s ease-in-out'
        });
        $('#intro p').css({
            'animation': 'showIntroText 2s ease-in-out'
        });
    }

    $('#info').hover(function() {
        $('#iconsby').css({
            'animation': 'fromTopRightCorner 0.5s ease-in-out forwards'
        });
        }, function() {
            $('#iconsby').css({
                'animation': 'toTopRightCorner 0.5s ease-in-out forwards'
            });
        }
    );

    var RADIUS = 65;
    var CIRCUMFERENCE = 2 * Math.PI * RADIUS;

    $(".skillcircle").each(function() {
        $(this).find(".bar")[0].style.strokeDasharray = CIRCUMFERENCE;
        var progress = $(this).attr("data-pct") / 100;
        var dashoffset = CIRCUMFERENCE * (1 - progress);        
        $(this).find(".bar")[0].style.strokeDashoffset = dashoffset;
        $(this).find(".perc").text($(this).attr("data-pct") + " %");
    });
});