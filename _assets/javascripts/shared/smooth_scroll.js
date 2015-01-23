$(document).ready(function() {

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	   	/***************
		* CONFIGURATION
	   	****************/

	    // How fast should the transiion be?
	    var transition_speed = 400; // milliseconds

	    // How far before we speed up the scroll FX?
	    var max_scroll_pixels = 2800; // pixels

       	/***************
    	* END CONFIGURATION
       	****************/
	 
	    var 
	    target = this.hash,
		target_offset = $(target).offset().top,
		window_offset = $(document).scrollTop(),
		delta = target_offset - window_offset;
	 
	    if (Math.abs(delta) > max_scroll_pixels) {
	    	transition_speed = 100;
	    }

	    $('html, body').stop().animate({
	        'scrollTop': target_offset
	    }, transition_speed, 'swing', function () {
	        window.location.hash = target;
	    });
	
	});

});
