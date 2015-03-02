$(function () {

	$('#big-sponsor ul').jcarousel({
	  buttonNextHTML: "<div>&raquo;</div>",
	  buttonPrevHTML: "<div>&laquo;</div>",
	  auto: 5,
	  wrap: "circular",
	  scroll: 1
	});

	$('#big-sponsor ul').touchwipe({
	  wipeLeft: function() {
	    $('#big-sponsor ul').jcarousel('next');
	  },
	  wipeRight: function() {
	    $('#big-sponsor ul').jcarousel('prev');
	  },
	  min_move_x: 20,
	  min_move_y: 20,
	  preventDefaultEvents: false
	});

	$('#small-sponsor ul').jcarousel({
	  buttonNextHTML: "<div>&raquo;</div>",
	  buttonPrevHTML: "<div>&laquo;</div>",
	  auto: 5,
	  wrap: "circular",
	  scroll: 1
	});

	$('#small-sponsor ul').touchwipe({
	  wipeLeft: function() {
	    $('#small-sponsor ul').jcarousel('next');
	  },
	  wipeRight: function() {
	    $('#small-sponsor ul').jcarousel('prev');
	  },
	  min_move_x: 20,
	  min_move_y: 20,
	  preventDefaultEvents: false
	});

});