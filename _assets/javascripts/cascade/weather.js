$(function () {

	/* Populate weather from jsonp feed
    ------------------------------------------------------------------------------------------------*/

    $.getJSON("//forecast.chapman.edu/chapman/banner-json.php?callback=?", function (data) {


        var iconPath = data.weather.icon_path,
            tempF = data.weather.temp_f,
            tempC = data.weather.temp_c,
            url = "//www.chapman.edu",
            $weather = $(".weather");

        $weather.find("img").attr("src", url + iconPath);
        $weather.find(".temp .f").html(tempF + "&deg; F");
        $weather.find(".temp .c").html(tempC + "&deg; C");
    });

});