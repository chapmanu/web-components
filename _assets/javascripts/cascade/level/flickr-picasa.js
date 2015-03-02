$(function () {

    // Flickr

    var $flickr = $('.flickr-gallery'),
        $flul = $flickr.find('ul');

    if ($flickr.length > 0) {

        var feed = "http://www.chapman.edu/getFeed.ashx?name=" + $flickr.attr('data-feed'),
            yqlFeed = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + feed + "'&format=json&diagnostics=true&callback=?";

        $.getJSON(yqlFeed, function (data) {

            var items = data.query.results.feed.entry;

            if (items.length > 0) {

                for (var i = 0; i < 4; i += 1) {
                    var $item = $("<li>").append(
                        $("<a>").attr({
                            "href": items[i].link[0].href,
                            "title": items[i].title,
                            "target": "_blank"
                        }).append(
                            $("<img>").attr({
                                'src': items[i].link[items[i].link.length - 1].href
                            })
                        )
                    ).appendTo($flul);

                    if ($item.find('img').width() >= 77) {
                        $item.find('img').css({
                            'width': '100%'
                        })
                    } else {
                        $item.find('img').css({
                            'height': '100%'
                        })
                    }
                }
                var apiLink = data.query.results.feed.link[0].href,
                    userId = apiLink.split('userid=')[1].split('&')[0];
                $flickr.find(".more-link").attr("href", 'http://www.flickr.com/groups/' + userId);
            }
        });

    }

    // Picasa

    $picasa = $('.picasa-gallery');
    $pcul = $picasa.find('ul');

    if ($picasa.length > 0) {

        var feed = "http://www.chapman.edu/getFeed.ashx?name=" + $picasa.attr('data-feed'),
        yqlFeed = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%3D'" + feed + "'&format=json&diagnostics=true&callback=?";

        $.getJSON(yqlFeed, function (data) {

            var items = data.query.results.feed.entry;

            if (items.length > 0) {

                for (var i = 0; i < 4; i += 1) {
                    var $item = $("<li>").append(
                        $("<a>").attr({
                            "href": items[i].link[1].href,
                            "title": items[i].title.content,
                            "target": "_blank"
                        }).append(
                            $("<img>").attr({
                                'src': items[i].content.src
                            })
                        )
                    ).appendTo($pcul);

                    if ($item.find('img').width() >= 77) {
                        $item.find('img').css({
                            'width': '100%'
                        })
                    } else {
                        $item.find('img').css({
                            'height': '100%'
                        })
                    }
                }

                $picasa.find(".more-link").attr("href", data.query.results.feed.author.uri);
            }
        });
    }

});