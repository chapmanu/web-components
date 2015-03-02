$(function () {

	/* Funnel Toggle More Links
	------------------------------------------------------------------------------------------------*/
	$(".funnel .funnelBlock .moreLinks, .funnel .funnelBlock .more").toggle();
	$(".funnel .funnelBlock .more").click(function () {
	  $(this).prev(".moreLinks").slideToggle();
	  if ($(this).html() === "+ More") {
	    $(this).html("- Less");
	  } else {
	    $(this).html("+ More");
	  }
	});

});