$(function() {

	/* Get Query string for starting stage if exists, otherwise randomize starting stage
  pull in URL query string if available
  ------------------------------------------------------------------------------------------------*/
  var urlParams = {};
  (function () {
      var e,
          a = /\+/g,  // Regex for replacing addition symbol with a space
          r = /([^&=]+)=?([^&]*)/g,
          d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
          q = window.location.search.substring(1);

      while (e = r.exec(q))
      urlParams[d(e[1])] = d(e[2]);
  })();

  /* starting tab for level pages with newsEventsNav li */

  // Validate Data
  if ((urlParams["startingtab"] != undefined) && (urlParams["startingtab"] == parseInt(urlParams["startingtab"])) && (urlParams["startingtab"] - 1 < $(".main .newsEventsNav li").length)) {

      // Offset for zero based arrays
      if (urlParams["startingtab"] != 0)
          urlParams["startingtab"] = urlParams["startingtab"] - 1;
      
      var $activeElementRegion = $(".main .newsEventsNav li").eq(urlParams["startingtab"]);

      // Set active class
      $activeElementRegion.addClass("active").siblings().removeClass("active");
      // Update the content section - set active content to display
      $activeElementRegion.parent(".newsEventsNav").siblings(".newsEventsContent").children("li:eq(" + urlParams["startingtab"] + ")").addClass("active").siblings().removeClass("active");
      
      // Scroll to the active element
      setTimeout(function(){
          $('html, body').stop().animate({
              scrollTop:$activeElementRegion.offset().top
          },1000) ;
      },350);
  }

  /* starting tab for level pages with <div> Q/A style elements */

  // Validate Data
  if ((urlParams["openregion"] != undefined) && (urlParams["openregion"] == parseInt(urlParams["openregion"])) && urlParams["openregion"] - 1 < $(".main .accordion").length) {

      // Offset for zero based arrays
      if (urlParams["openregion"] != 0) 
          urlParams["openregion"] = urlParams["openregion"] - 1;
      
      var $activeElementRegion = $(".main .accordion").eq(urlParams["openregion"]);

      // Add the active class to nth accordion and remove all other active classes
      $activeElementRegion.addClass("active").siblings().removeClass("active");

      // Display the current region
      $activeElementRegion.find("div.content").show();

      // Hide the other regions
      $activeElementRegion.siblings().find("div.accordion div.content").hide();
      
      // Scroll to the active element
      setTimeout(function(){
          $('html, body').stop().animate({
              scrollTop:$activeElementRegion.offset().top
          },1000) ;
      },350);
  }

  /* End starting tab code */

});