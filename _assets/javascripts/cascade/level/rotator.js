$(function () {

    /* Rotator
    ------------------------------------------------------------------------------------------------*/

    if ($(".rotatorContainer").parent(".mosaic").length > 0) {
        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {


                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

            },
            before: function (slider) {

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);
            }
        });

        // Initialize tipsy for info rollovers
        $(".mosaic .info").each(function (index) {
            if (!$(this).attr("title")) {
                $(this).remove();
            }
        });

        $(".info").tipsy({
            fade: true,
            gravity: $.fn.tipsy.autoWE
        });

        $(".nameBar .slideDescription").remove();
    }
    else if ($(".rotatorContainer").parent(".rounded-slider").length > 0) {

        $('.rounded-slider').find('.red').html('<p>' + $(".rounded-slider .slide:first-child").attr('data-red') + '</p>');        
        
        if($(".rounded-slider .slide:first-child").attr('data-link')){
           $('.rounded-slider').find('.red').append(
                $("<a>").attr({
                    'href': $(".rounded-slider .slide:first-child").attr('data-link'),
                    'title': 'Learn More'
                }).html("Learn More &raquo;")

            );
        }
        else{
            $('.rounded-slider').find('.red').addClass("no-link");
        }
        
        if (!$(".rounded-slider .info-container .red p").text()) {
            $(".rounded-slider .info-container .red").hide();
        }

        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            directionNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {

                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide),
                    red = $('.rounded-slider').find('.red');
                //blue = $('.rounded-slider').find('.blue');

                var caption = $currentSlide.attr('data-red');
                //var title = $currentSlide.attr('data-blue');
                var link = $currentSlide.attr('data-link');

                red.removeClass('no-link');
                
                if (caption) {
                    red.html("<p>" + caption + "</p>");
                }
                else {
                    red.hide();
                }
                //blue.html("<p>"+title+"</p>");

                if (link) {
                    red.append(
                        $("<a>").attr({
                            'href': link,
                            'title': 'Learn More'
                        }).html("Learn More &raquo;")
                    )
                } else {
                    red.addClass('no-link');
                }

            },
            before: function (slider) {

                var red = $('.rounded-slider').find('.red');
                //    blue = $('.rounded-slider').find('.blue');

                red.find('a').remove();
                red.find('p').animate({
                    opacity: 0
                }, 500);
                //    blue.find('p').animate({
                //        opacity: 0
                //    }, 500);

            },
            after: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide),
                    red = $('.rounded-slider').find('.red');
                //blue = $('.rounded-slider').find('.blue');

                var caption = $currentSlide.attr('data-red');
                //var title = $currentSlide.attr('data-blue');
                var link = $currentSlide.attr('data-link');

                red.removeClass('no-link');

                if (caption) {
                    red.find('p').html(caption);
                    red.show('');
                }
                else {
                    red.hide('');
                }
                //blue.find('p').html(title);

                if (link) {
                    red.append(
                        $("<a>").attr({
                            'href': link,
                            'title': 'Learn More'
                        }).css('opacity', 0).html("Learn More &raquo;")
                    )
                } else {
                    red.addClass('no-link');
                }

                red.find('p, a').animate({
                    opacity: 1
                }, 500);
                //blue.find('p').animate({
                //    opacity: 1
                //}, 500);
            }
        });

        // Keep the slide arrows on the edge of the browser window

        // $(".flex-direction-nav li .next").offset({ left: $("#container").outerWidth() - 43 });
        // $(".flex-direction-nav li .prev").offset({ left: $("#container").offset().left });

        // $(window).bind("resize", function () {

        //     $(".flex-direction-nav li a.next").offset({ left: $("#container").outerWidth() - 43 });
        //     $(".flex-direction-nav li a.prev").offset({ left: $("#container").offset().left });

        // });

    }
    else {

        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {

                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $(".flexslider .slides .slide").removeClass("active");
                $currentSlide.addClass("active");

                $(".blockOut").fadeOut();

                $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
                if (!$(".slideDescription .centeredContent").html()) {
                    $(".slideDescription").addClass("visuallyhidden");
                }
                else {
                    $(".slideDescription").removeClass("visuallyhidden");
                }
            },
            before: function (slider) {

                $(".blockOut").stop().fadeIn();
                $(".slide").stop().fadeTo(250, .2, function () { });

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $(".blockOut").stop().fadeOut("slow");
                $(".slide").stop().fadeTo(500, 1, function () { });


                $(".flexslider .slides .slide").removeClass("active");
                $currentSlide.addClass("active");

                $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
                if (!$(".slideDescription .centeredContent").html()) {
                    $(".slideDescription").addClass("visuallyhidden");
                }
                else {
                    $(".slideDescription").removeClass("visuallyhidden");
                }
            }
        });

        // Keep the slide arrows on the edge of the browser window

        $(".flex-direction-nav li .next").offset({ left: $("#container").outerWidth() - 43 });
        $(".flex-direction-nav li .prev").offset({ left: $("#container").offset().left });

        $(window).bind("resize", function () {

            $(".flex-direction-nav li a.next").offset({ left: $("#container").outerWidth() - 43 });
            $(".flex-direction-nav li a.prev").offset({ left: $("#container").offset().left });

        });

    }

    // Remove :focus outline from rotator nav arrows
    $(".flex-direction-nav li a").each(function () {
        $(this).attr("hideFocus", "true").css("outline", "none");
    });

    // Pause the slider once the user interacts with the slider
    $(".flex-direction-nav li a").live("click", function (event) {
        g_mySlider.pause();
        g_mySlider.resume = function () {};
    });

    /* Mini-Rotator Code
    ------------------------------------------------------------------------------------------------*/
    if ($(".miniRotator").length) {

        $(".miniRotatorContainer").jcarousel({
            start: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                return (number * 1);

            })(),
            auto: (function () {
                var speed = 10,
                    speedSetting = $(".slideOptions .speed").text(),
                    isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                if (isAuto) {
                    if (speedSetting > 0) {
                        speed = speedSetting;
                    }
                }
                else {
                    speed = 0;
                }

                return speed;

            })(),
            scroll: 1,
            wrap: "circular",
            buttonNextHTML: null,
            buttonPrevHTML: null,
            initCallback: function (carousel) {
                carousel.clip.hover(function () {
                    carousel.stopAuto();
                }, function () {
                    carousel.startAuto();
                });

                $('.miniRotatorNav .next').bind('click', function () {
                    carousel.next();
                    return false;
                });

                $('.miniRotatorNav .prev').bind('click', function () {
                    carousel.prev();
                    return false;
                });
            }
        });
    }

});