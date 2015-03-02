$(function () {

	var eventsFeedUrl = "//www.chapman.edu/getFeed.ashx?name=majorEvents",
    eventsYqlUrl = function () { return ("//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss(3)%20where%20url%3D'" + eventsFeedUrl + "'&format=json&diagnostics=true&callback=?") },
    eventsFeedOptions = $(".eventsFeed").text();
    $(".allEvents").attr("href", "/events/calendar.aspx");
    
    
    $.getJSON(eventsYqlUrl(), function (data) {

        var i,
            eventsData = data.query.results,
            events = [
                        {
                            $month: $(".events .story2 .date .month"),
                            $day: $(".events .story2 .date .day"),
                            $year: $(".events .story2 .date .year"),
                            $heading: $(".events .story2 h4 .description"),
                            $link: $(".events .story2 h4>a")
                        },
                        {
                            $month: $(".events .story3 .date .month"),
                            $day: $(".events .story3 .date .day"),
                            $year: $(".events .story3 .date .year"),
                            $heading: $(".events .story3 h4 .description"),
                            $link: $(".events .story3 h4>a")
                        },
                        {
                            $month: $(".events .story4 .date .month"),
                            $day: $(".events .story4 .date .day"),
                            $year: $(".events .story4 .date .year"),
                            $heading: $(".events .story4 h4 .description"),
                            $link: $(".events .story4 h4>a")
                        }
                    ];


        for (i = 0; i < events.length; i++) {
            try {
                //pubdate sometimes contained original but not current event date; use category field instead (has yyyy/mm/dd format)
                //events[i].$month.html(toShortMonthName(eventsData.item[i].pubDate.split('/')[0]));
                //events[i].$day.html(pad2(parseInt(eventsData.item[i].pubDate.split('/')[1], 10)));
                //events[i].$year.html(eventsData.item[i].pubDate.split('/')[2].split(' ')[0]);   
                events[i].$month.html(toShortMonthName_fromstring(eventsData.item[i].category.split('/')[1]));  
                events[i].$day.html(pad2(parseInt(eventsData.item[i].category.split('/')[2], 10)));
                events[i].$year.html(eventsData.item[i].category.split('/')[0]);
                events[i].$heading.html(eventsData.item[i].title);
                events[i].$link.attr('href', eventsData.item[i].link);
            }
            catch (err) {
                // something is wrong with the data source
                break;
            }
        }
    });
   
     /* Populate news from Wordpress RSS feed (converted to JSON with YQL)
    ------------------------------------------------------------------------------------------------*/
    var newsFeedUrl ='//www.chapman.edu/getFeed.ashx?name=happenings',
        yqlNewsUrl = "//query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss(3)%20where%20url%20%3D%20'" + newsFeedUrl + "'&format=json&diagnostics=true&callback=?";

    $.getJSON(yqlNewsUrl, function(data){
       
        var i;
        var newsData = data.query.results;

        for (i = 0; newsData&&i<3; i++) {
            var month = newsData.item[i].pubDate.split(' ')[2].toUpperCase();
            var day = pad2(parseInt((newsData.item[i].pubDate.split(' ')[1]),10));
            var year = newsData.item[i].pubDate.split(' ')[3];
            var link = newsData.item[i].link;
            var heading = newsData.item[i].title;
            var subheading = newsData.item[i].description;
            var story = '<div class="story' + (i+2) + ' rss-story" itemscope itemtype="http://schema.org/Article"><h4><a href="' + link +'" target="_blank"><div class="date" itemprop="datePublished"><div class="day">' + day + '</div><div class="month">' + month + '</div><div class="year">' + year + '</div></div><span class="description">' + heading + '</span></a></h4>' + subheading + '</div>';
            $('.news span.insert').append(story);
        }
        
    });

    /* Convert month format from numbers to abbreviation
	------------------------------------------------------------------------------------------------*/
	function toShortMonthName(month) {
	    switch (parseInt(month)) {
	        case 1:
	            return 'JAN';
	        case 2:
	            return 'FEB';
	        case 3:
	            return 'MAR';
	        case 4:
	            return 'APR';
	        case 5:
	            return 'MAY';
	        case 6:
	            return 'JUN';
	        case 7:
	            return 'JULY';
	        case 8:
	            return 'AUG';
	        case 9:
	            return 'SEPT';
	        case 10:
	            return 'OCT';
	        case 11:
	            return 'NOV';
	        case 12:
	            return 'DEC';
	        default:
	            return '';
	    }
	}
	/* Convert month format from 2-digit (leading zero) string to abbreviation
	------------------------------------------------------------------------------------------------*/
	function toShortMonthName_fromstring(month) {
	    switch (month) {
	        case '01':
	            return 'JAN';
	        case '02':
	            return 'FEB';
	        case '03':
	            return 'MAR';
	        case '04':
	            return 'APR';
	        case '05':
	            return 'MAY';
	        case '06':
	            return 'JUN';
	        case '07':
	            return 'JULY';
	        case '08':
	            return 'AUG';
	        case '09':
	            return 'SEPT';
	        case '10':
	            return 'OCT';
	        case '11':
	            return 'NOV';
	        case '12':
	            return 'DEC';       
	        default:
	            return '';
	    }
	}
	/* Pad day with leading zero
	------------------------------------------------------------------------------------------------*/

	function pad2(number) {

	    return (number < 10 ? '0' : '') + number;

	}

});