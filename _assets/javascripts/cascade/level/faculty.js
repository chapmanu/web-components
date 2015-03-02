$(function () {

	/* Faculty List Old IE styling 
    ------------------------------------------------------------------------------------------------*/
    if ($(".facultyList .facultyMember").length && $("html").hasClass("oldie")) {
        $(".facultyList .facultyMember:nth-child(odd)").css("margin-right", "45px");
        $(".facultyList .facultyMember:nth-child(even)").css("margin-right", "0");
    }


    /* Faculty Video Fancybox
    ------------------------------------------------------------------------------------------------*/
    if ($(".facultySpotlight>.video[href]").length) {
        if ($("html").outerWidth() >= 780) {
            $(".facultySpotlight>.video").fancybox({
                type: 'iframe'
            });

            $(window).resize(function () {
                if ($("html").outerWidth() < 780) {
                    $.fancybox.close();
                    $(".facultySpotlight>.video").unbind();


                } else {
                    $(".facultySpotlight>.video").fancybox({
                        type: 'iframe'
                    });
                }
            });
        }

    } else {
        $(".facultySpotlight>.video").click(function (event) {
            event.preventDefault();
        });
    }

});