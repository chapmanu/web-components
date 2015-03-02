$(function () {

	/* Popluate featured item from xml generated from Cacade 
  ------------------------------------------------------------------------------------------------*/
  $.ajax({
    url: $(".featureFeed").text(),
    success: function (xml) {
      var image = $(xml).find("xml>system-data-structure>image>path").text(),
          date = $(xml).find("xml>system-data-structure>date").text(),
          month = date.split('-')[0],
          day = date.split('-')[1],
          year = date.split('-')[2],
          title = $(xml).find("xml>system-data-structure>title").text(),
          description = $(xml).find("xml>system-data-structure>description").text(),
          link = $(xml).find("xml>system-data-structure>link>link").text(),
          fileLink = $(xml).find("xml>system-data-structure>link>fileLink>path").text(),
          internalLink = $(xml).find("xml>system-data-structure>link>internalLink>path").text();

      if (internalLink !== '/') {
        link = internalLink+".aspx";
      }
      else if (fileLink !== '/') {
        link = fileLink;
      }

      // Image
      $(".newsEvents .featured .image").attr("src", image);
      $(".newsEvents .featured .image").attr("alt", title);

      // Date
      $(".newsEventsContent .featured .date .day").html(day);
      $(".newsEventsContent .featured .date .month").html(toShortMonthName(month));
      $(".newsEventsContent .featured .date .year").html(year);

      // Title
      $(".newsEventsContent .featured .title").html('<a href="' + link + '">' + title + '</a>');

      // Description
      $(".newsEventsContent .featured .description").html(description);

      // Read More Link
      if (link != '') {
        $(".newsEventsContent .featured .readMore").html('<a href="' + link + '">Read More<span class="bullet"> &raquo;</span></a>');
      }
    },
    dataType: 'xml'
  });

});