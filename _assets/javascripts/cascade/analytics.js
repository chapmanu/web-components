$(function () {

	// Begin Analytics Event Tracking
    var analytics_stage_interaction_counter = 0;
    $("#main").find(".flex-direction-nav a").click(function(e) {
        analytics_stage_interaction_counter++;
        var keyword = 'unknown';
        if ($(this).attr('class') == 'flex-prev') keyword = 'Left Arrow';
        if ($(this).attr('class') == 'flex-next') keyword = 'Right Arrow';

        _gaq.push(['_trackEvent', 'Home Page Stage Interaction', 'Navigation Click', keyword, analytics_stage_interaction_counter]);
    });
    // End Analytics Event Tracking

});