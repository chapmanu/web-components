$(function () {

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
    
    //alert(urlParams["stage"]);
    var stage = urlParams["stage"];
    var queryAutoplay = urlParams["autoplay"];
    var autoplay = true;
    
    //console.log(stage);
    var queryStartingPane = 0;
    var startingPane = 0;
    
    if (stage != undefined) { 
        queryStartingPane = stage;
        switch(queryStartingPane) {
            case "0": 
            case "imagine":
                startingPane = 0;
                break;
            //case "1":
            //case "explore":
           //     startingPane = 1;
           //     break;  
            case "1":
            case "create":
                startingPane = 1;
                break;
            //case "3":
            //case "global":
            //    startingPane = 3;
           //     break;  
            case "3": 
            case "leaders":
                startingPane = 3;
                break;
            default:
                startingPane = 0;
        }
    } else { 
        startingPane = (Math.floor(Math.random()*3)) 
    }
    if ( queryAutoplay == 'false') {
        autoplay = false;
    }

});