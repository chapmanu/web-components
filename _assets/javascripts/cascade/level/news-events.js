$(function () {

	/* Populate news from Wordpress RSS feed (converted to JSON with YQL)
	------------------------------------------------------------------------------------------------*/
	if ($(".news").length) {

	    var newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsHappenings",

	        newsYqlUrl = function () {
	            return ("//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss(3)%20where%20url%3D'" + newsFeedUrl + "'&format=json&diagnostics=true&callback=?")
	        },
	        newsFeedOptions = $(".newsFeed").text();

	    switch (newsFeedOptions) {
	        case "Admissions":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsAdmissions";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/cu-students");
	            break;
	        case "ASBE":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsBusiness";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/business");
	            break;
	        case "CES":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCES";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/ces");
	            break;
	        case "Commencement":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCommencement";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/commencement");
	            break;
	        case "COPA":

	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCOPA";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/copa");
	            break;
	        case "Crean":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsCrean";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/crean");
	            break;
	        case "Dodge":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsDodge";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/dodge");
	            break;
	        case "Happenings":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsHappenings";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/happenings");
	            break;
	        case "Law":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsLaw";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/law");
	            break;
	        case "Schmid":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsSCHMID";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/scst");
	            break;
	        case "Students":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsStudents";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/happenings");
	            break;
	        case "Wilkinson":
	            newsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=newsWilkinson";
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/wilkinson");
	            break;
	        default:
	            $(".allNews")
	                .attr("href", "http://blogs.chapman.edu/happenings");
	            break;
	    }

	    $(".news .loading").siblings(".story").css("visibility", "hidden");
	    $.getJSON(newsYqlUrl(), function (data) {
	        var newsData = data.query.results;

	        if (newsData) {
	            $(".newsEvents").each(function () {
	                $(this).find(".news .story").each(function (i) {
	                    var $this = $(this);

	                    if(newsData.item[i].pubDate){
	                    //Month
	                    $this.find(".date .month").html(newsData.item[i].pubDate.split(' ')[2].toUpperCase());
	                    //Day
	                    $this.find(".date .day").html(pad2(parseInt((newsData.item[i].pubDate.split(' ')[1]), 10)));
	                    //Year
	                    $this.find(".date .year").html(newsData.item[i].pubDate.split(' ')[3]);
	                    }
	                    //Title
	                    $this.find("h3>a").html(newsData.item[i].title);
	                    //Links

	                    $this.find("h3>a, .readMore").each(function () {
	                        $(this).attr('href', newsData.item[i].link);
	                    });
	                    //Copy
	                    //$this.find(".copy").html($(newsData.item[i].description).text().substring(0, 175)).ellipsis();
	                    //Show today/tomorrow label if appropriate
	                    //todayLabel();                        


	                    //Show News
	                    $(".news .loading").hide().siblings(".story").css("visibility", "visible");
	                });
	            });


	        } else {
	            $(".news").html("<p>Oops, <a href='" + newsFeedUrl + "'>" + newsFeedUrl + "</a> appears to be unresponsive or is not returning anything to display at the moment.</p>");
	        }

	    });
	}

	/* 
	 Populate events from 25 Live RSS feed (converted to JSON with YQL)
	------------------------------------------------------------------------------------------------ */
	if ($(".events")
	    .length) {
	    //var eventsFeedUrl = "https://25livepub.collegenet.com/calendars/calendar.7285.rss",


	    var eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=events",
	        eventsYqlUrl = function () {
	            return ("//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss(3)%20where%20url%3D'" + eventsFeedUrl + "'&format=json&diagnostics=true&callback=?")
	        },
	        eventsFeedOptions = $(".eventsFeed")
	            .text();
	    $(".allEvents")
	        .attr("href", "/events/calendar.aspx");

	    switch (eventsFeedOptions) {
	        case "ASBE":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventBusiness";
	            $(".allEvents")
	                .attr("href", "/events/business-calendar.aspx");
	            break;
	        case "CES":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventCES";
	            $(".allEvents")
	                .attr("href", "/events/ces-calendar.aspx");
	            break;
	        case "COPA":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventCOPA";
	            $(".allEvents")
	                .attr("href", "/events/copa-calendar.aspx");
	            break;
	        case "DANCE":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventDANCE";
	            $(".allEvents")
	                .attr("href", "http://www.chapman.edu/events/copa-calendar.aspx");
	            break;
	        case "DODGE":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventDODGE";
	            $(".allEvents")
	                .attr("href", "/events/dodge-calendar.aspx");
	            break;
	        case "LAW":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventLAW";
	            $(".allEvents")
	                .attr("href", "/events/law-calendar.aspx");
	            break;
	        case "MUSIC":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventMUSIC";
	            $(".allEvents")
	                .attr("href", "/events/copa-calendar.aspx");
	            break;
	        case "SCHMID":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventSCHMID";
	            $(".allEvents")
	                .attr("href", "/events/scst-calendar.aspx");
	            break;
	        case "STUDENTS":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventSTUDENTS";
	            $(".allEvents")
	                .attr("href", "/events/student-calendar.aspx");
	            break;
	        case "THEATRE":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventTHEATRE";
	            $(".allEvents")
	                .attr("href", "/events/copa-calendar.aspx");
	            break;
	        case "WILKINSON":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventWILKINSON";
	            $(".allEvents")
	                .attr("href", "/events/wilkinson-calendar.aspx");
	            break;
	        case "ESI":
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=eventESI";
	            $(".allEvents")
	                .attr("href", "/events/esi-calendar.aspx");
	            break;
	        default:
	            eventsFeedUrl = "http://www.chapman.edu/getFeed.ashx?name=events";
	            break;
	    }

	    $(".events .loading").siblings(".story").css("visibility", "hidden");
	    $.getJSON(eventsYqlUrl(), function (data) {

	        var eventsData = data.query.results;
	        if (eventsData) {
	            $(".newsEvents").each(function () {
	                $(this).find(".events .story").each(function (i) {
	                    var $this = $(this);


	                    var rssitem;
	                    var maxloop;
	                    if (typeof eventsData.item.length == 'undefined') {
	                        rssitem = eventsData.item;
	                        maxloop = 0;


	                    } else {
	                        rssitem = eventsData.item[i];
	                        maxloop = eventsData.item.length;
	                    }

	                    if(rssitem){

	                        //pubdate sometimes contained original but not current event date; use category field instead (has yyyy/mm/dd format):
	                        //Month
	                        //$this.find(".date .month").html(rssitem.pubDate.split(' ')[1].toUpperCase());
	                        $this.find(".date .month").html(toShortMonthName_fromstring(rssitem.category.split('/')[1].toUpperCase()));
	                        //Day
	                        //$this.find(".date .day").html(pad2(parseInt((rssitem.pubDate.split(' ')[0]), 10)));
	                        $this.find(".date .day").html(pad2(parseInt((rssitem.category.split('/')[2]), 10)));
	                        //Year
	                        //$this.find(".date .year").html(rssitem.pubDate.split(' ')[2]);
	                        $this.find(".date .year").html(rssitem.category.split('/')[0]);
	                        //Title
	                        $this.find("h3>a").html(rssitem.title);
	                        //Links

	                        $this.find("h3>a, .readMore").each(function () {
	                            $(this).attr('href', rssitem.link);
	                        });
	                    }
	                    else{
	                        $(this).hide();
	                    }

	                    //Copy
	                    //$this.find(".copy").html(rssitem.description.substring(0, 175)).ellipsis();
	                    //Show today/tomorrow label if appropritae
	                    //todayLabel();
	                    //Set href of all events link
	                    //move this into cases above and manually set for each school: $(".allEvents").attr("href", eventsFeedUrl.slice(0, -4));
	                    //Show Events
	                    $(".events .loading").hide().siblings(".story").css("visibility", "visible");

	                    if (maxloop == i) {
	                        return false;
	                    }
	                });
	            });


	        } else {
	            $(".events").html("<p>There are no events found (or <a href='" + eventsFeedUrl + "'>" + eventsFeedUrl + "</a> is temporarily down).</p>");
	            //$(".events").html("<p>No events found at this time.</p>");
	        }

	    });
	}

	/* Switch news events tabs
  ------------------------------------------------------------------------------------------------*/

  $(".newsEventsNav li").click(function () {
      var $this = $(this),
          i = $this.index();
      $this.addClass("active").siblings().removeClass("active");
      $this.parent(".newsEventsNav").siblings(".newsEventsContent").children("li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
      $(".ellipsis").ellipsis();
  });

  $(".tabNav li").click(function () {
      var $this = $(this),
          i = $this.index();
      $this.addClass("active").siblings().removeClass("active");
      $this.parent(".tabNav").siblings(".tabContent").children("li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
      $(".ellipsis").ellipsis();
  });

  // Apply user selected options
  (function () {
      var newsEventsOptions = [$(".newsEventsOptions").html(), $(".leftColumnNewsEventsOptions").html()],
          $featureTab = [$(".main .newsEventsNav li:first-child"), $(".leftNav .newsEventsNav li:first-child")],
          $newsTab = [$(".main .newsEventsNav li:nth-child(2)"), $(".leftNav .newsEventsNav li:nth-child(2)")],
          $eventsTab = [$(".main .newsEventsNav li:nth-child(3)"), $(".leftNav .newsEventsNav li:nth-child(3)")],
          $featureContent = [$(".main .featured"), $(".leftNav .featured")],
          $newsContent = [$(".main .news"), $(".leftNav .news")],
          $eventsContent = [$(".main .events"), $(".leftNav .events")],
          $newsEvents = [$(".main .newsEvents"), $(".leftNav .newsEvents")];

      for (var i = 0; i < newsEventsOptions.length; i++) {
          switch (newsEventsOptions[i]) {
              case "Featured - News - Events (Featured active)":
                  break;
              case "Featured - News - Events (News active)":
                  $featureTab[i].removeClass("active");
                  $newsTab[i].addClass("active");
                  $newsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Featured - News - Events (Events active)":
                  $featureTab[i].removeClass("active");
                  $eventsTab[i].addClass("active");
                  $eventsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Featured - News (Featured active)":
                  $eventsTab[i].hide();
                  break;
              case "Featured - News (News active)":
                  $featureTab[i].removeClass("active");
                  $newsTab[i].addClass("active");
                  $eventsTab[i].hide();
                  $newsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Featured - Events (Featured active)":
                  $newsTab[i].hide();
                  break;
              case "Featured - Events (Events active)":
                  $featureTab[i].removeClass("active");
                  $eventsTab[i].addClass("active");
                  $newsTab[i].hide();
                  $eventsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "News - Events (News active)":
                  $featureTab[i].hide();
                  $newsTab[i].addClass("active");
                  $newsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "News - Events (Events active)":
                  $featureTab[i].hide();
                  $eventsTab[i].addClass("active");
                  $eventsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Featured Only":
                  $newsTab[i].hide();
                  $eventsTab[i].hide();
                  break;
              case "News Only":
                  $featureTab[i].hide();
                  $eventsTab[i].hide();
                  $newsTab[i].addClass("active");
                  $newsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Events Only":
                  $featureTab[i].hide();
                  $newsTab[i].hide();
                  $eventsTab[i].addClass("active");
                  $eventsContent[i].parent("li").addClass("active");
                  $featureContent[i].parent("li").removeClass("active");
                  break;
              case "Do Not Show":
                  $newsEvents[i].hide();
                  break;
              default:
                  break;
          }
      }
  })();

  // Show today label if appropriate
  var todayLabel = function () {
      var today = new Date(),
          tomorrow = new Date(),
          month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "DEC"];

      tomorrow.setDate(tomorrow.getDate() + 1);

      // Today
      $(".newsEvents .date").each(function (index) {
          if (today.getFullYear() === parseInt($(this).children(".year").html(), 10)) {
              if (month[today.getMonth()].toUpperCase() === $(this).children(".month").html()) {
                  if (today.getDate() === parseInt($(this).children(".day").html(), 10)) {
                      $(this).siblings(".todayTomorrow").children(".today").css("visibility", "visible");
                  }
              }
          }
      });

      // Tomorrow
      $(".newsEvents .date").each(function (index) {
          if (tomorrow.getFullYear() === parseInt($(this).children(".year").html(), 10)) {
              if (month[tomorrow.getMonth()].toUpperCase() === $(this).children(".month").html()) {
                  if (tomorrow.getDate() === parseInt($(this).children(".day").html(), 10)) {
                      $(this).siblings(".todayTomorrow").children(".tomorrow").css("visibility", "visible");
                  }
              }
          }
      });
  };
  // todayLabel();

	$(".events .copy").each(function (index) {
	    $(this).html($(this).text());
	});

	$(".ellipsis").ellipsis();

	// Need to add this after the ellipsis takes effect
	$(".newsEventsContent>li, .tabContent>li").css("display", "none");

});