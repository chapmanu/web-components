$(function () {

	/* Mosaic border fix if only one slide
	------------------------------------------------------------------------------------------------*/
	if ($(".mosaic .slide").length < 2) {
	  $(".mosaic .block1 .border").css("border-width", "5px 5px 5px 5px");
	  $(".mosaic .block2 .border").css("border-width", "0 5px 5px 5px");
	}

});