$(function () {

	/* Video overlay
    ------------------------------------------------------------------------------------------------*/

    $(".videoLink").live("click", function (event) {
        event.preventDefault();
        var src = $(this).attr("data-video");
        $("#videoContainer .video").attr('src', src);


        $(".overlay").show(0).animate({ top: 0 }, 1e3, function () { g_mySlider.manualPause = true; g_mySlider.pause(); });
    });
    
    // Link to flash download if not detected
    if (!swfobject.hasFlashPlayerVersion("9.0.115")) {
        $(".overlay").prepend('<p style="position:absolute;top:15px;text-align:center;width:100%;">This video requires at least version 9.0.115 of <a href="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank">Adobe Flash Player</a></p>');
    }

    $(".closeButton").live("click", function () {
        $(".overlay").animate({ top: "700px" }, 1e3, function () { }).hide(0);
        var videoClone = $('#videoContainer').html();
        $('#videoContainer div').remove();
        $("#videoContainer").html(videoClone);
        g_mySlider.resume();
    });

});