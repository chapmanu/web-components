$(function () {

	/* Small view hide/show top menus
    ------------------------------------------------------------------------------------------------*/

    $(".collapsedInfoForHeading").click(function () {
        $(this).add(".infoFor").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".resources-subNav-login, .resources-subNav-search").removeClass("active");
    });

    $(".collapsedResourcesHeading").click(function () {
        $(this).add(".resources-subNav-login").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".infoFor, .resources-subNav-search").removeClass("active");
    });

    $(".collapsedSearchHeading").click(function () {
        $(this).add(".resources-subNav-search").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".infoFor, .resources-subNav-login").removeClass("active");
        // autofocus search box
        $("#smallSearchBox").css({
            fontSize: '16px'
        }).focus();
    });

});