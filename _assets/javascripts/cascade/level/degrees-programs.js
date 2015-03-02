$(function () {

	/* Degrees Program Nav Conditional Styling
	------------------------------------------------------------------------------------------------*/
	$(".anchorLinks a").each(function (index) {
	  if ($('.letter[name=' + $(this).text() + ']').length) {
	    $(this).css("text-decoration", "underline");
	  }
	});

});