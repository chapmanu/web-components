$(function () {

	// Apply video class to iframes in editableContent regions (BCole altered to not apply to div with id=novideo) 
  //old:$(".editableContent iframe").wrap('<div class="video"/>');
  $(".editableContent iframe").not('#no-video').wrap('<div class="video"/>');

  /* added for links (really calls to action) in right col callouts: */
  $(".rightColumn").on("click", ".newbutton a", function () {
    recordOutboundLink($(this)[0], "Outbound-link_" + document.title.replace(" | Chapman University", ''), $(this).attr("href"), $(this).text());     
  });

});