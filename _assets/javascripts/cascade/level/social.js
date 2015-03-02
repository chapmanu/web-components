$(function () {

	/* social icon hover styles */
	$('#social_follow_us li').hover(function () {

	  $(this).find('span.inactive_state').stop().animate({
	    opacity: 0
	  }, 75);
	}, function () {

	  $(this).find('span.inactive_state').stop().animate({
	    opacity: 1
	  }, 75);
	});
	/* end social icon hover styles */

});