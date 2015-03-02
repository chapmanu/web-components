$(function () {

	$(".accordion .content").not(".accordion.active .content").css("display", "none");

	$(".accordion .header").click(function () {
		$(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
	});

});