$(function () {

	if ($(".rotatorContainer").parent(".homepage").length > 0) 
    {
        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: 10000,
            slideToStart: startingPane,
            slideshow: autoplay,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide];

                if ($('html').hasClass("opacity")) {
                    $('.slide').not(currentSlide).fadeTo(0, 0.1,
                        function ()
                        {
                        }
                    );
                }
                else {
                    if ($(".ie7").length) {
                        $('.rotatorContainer').css('overflow', 'hidden');
                        $('.slide').not(currentSlide).css('margin-top', '-9999999px');
                    }
                    else {
                        $('.slide').not(currentSlide).css('visibility', 'hidden');
                    }
                }
            },
            before: function (slider) {
                var nextSlide = slider.slides[slider.animatingTo],
                    $nextSlide = $(nextSlide),
                    difference = (parseInt(slider.currentSlide) - parseInt(slider.animatingTo)),
                    offset = '100px',
                    currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                if (difference === 1 || difference === -2) {
                    offset = '-100px';
                }

                $nextSlide.children(".bg1, .bg2, .bg3").stop().animate({ marginLeft: offset }, 300, function () {
                    $nextSlide.children(".bg3").animate({ marginLeft: '0' }, 500, function () { });
                    $nextSlide.children(".bg2").animate({ marginLeft: '0' }, 900, function () { });
                    $nextSlide.children(".bg1").animate({ marginLeft: '0' }, 700, function () { });
                });

                if ($('html').hasClass("opacity")) {
                    $('.slide').not(nextSlide).stop().fadeTo(500, .1, function () { });
                    $nextSlide.stop().fadeTo(500, 1, function () { });
                }

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $currentSlide.css({'opacity': 1})
                if (!$('html').hasClass("opacity")) {
                    if ($('.ie7').length) {
                        $('.slide').not(currentSlide).css('margin-top', '-99999999px');
                        $currentSlide.css('margin-top', '0px');
                    }
                    else {
                        $('.slide').not(currentSlide).css('visibility', 'hidden');
                        $currentSlide.css('visibility', 'visible');
                    }
                }
            }
        });
    }

    // Remove :focus outline from rotator nav arrows
    $(".flex-direction-nav li a").each(function () {
        $(this).attr("hideFocus", "true").css("outline", "none");
    });

    // Pause the slider once the user interacts with the slider
    $(".flex-direction-nav li a").live("click", function (event) {
        g_mySlider.pause();
        g_mySlider.resume = function () { };
    });

    // Flex navigation hover 
    $('.flex-direction-nav li a').hover(
        function () {
            $(this).animate({ opacity: 1 }, 200);
        }, function () {
            $(this).animate({ opacity: .3 }, 100);
        }
    );

});