



if (typeof quickView === 'undefined') {

	var quickView;

	// This code will not run if jQuery is not loaded
	this.jQuery && (function ($) {

		// Add to the global scope!!
		quickView = {

			isScrollLocked : false,
			isCloseAllowed : true,

			initialize : function() {

				var $wrapper = $('body');

				// Create container
				$wrapper.append('<div id="QuickView"><div id="QuickViewCell"></div></div>');
				this.$container 	= $('#QuickView');
				this.$containerCell = $('#QuickViewCell');

				// Quick View FX
				$wrapper.delegate("a","click",function(e) {

					// Do not intercept meta key clicks
					if (e.metaKey) return true;

					//
					// Intercept image links
					var targetURL = $(e.currentTarget).attr('href');

					if (quickView.hasImageExtension(targetURL)) {
						quickView.show('<img src="'+targetURL+'" />');
						return false; // Prevent default
					}

					//
					// Intercept data-quickview-content
					var $quickviewHTML = $(e.currentTarget).attr('data-quickview-content');

					if ($quickviewHTML.length) {
						quickView.show($quickviewHTML);
						return false; // Prevent default
					}

					return true; // Allow default
				});

			},

			hasImageExtension : function(url) {
				if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
			},

			show : function(htmlContent, disable_close, absolute_mode) {

				quickView.$containerCell.html(htmlContent).css('height',$(window).height()+"px").css('width',$(window).width()+"px");

				quickView.$container.fadeIn(80);
				quickView.lockScroll();

				if (!disable_close) quickView.bindCloseActions();
				if (absolute_mode) {
					setTimeout(function() {
						quickView.addSpecialStyles();
					}, 70);
				}

			},

			hide : function() {
				quickView.removeCloseActions();

				quickView.$container.fadeOut(40);
				setTimeout(function(){
					quickView.$containerCell.empty();
					quickView.removeSpecialStyles();
				},40);

				quickView.unlockScroll();
			},

			addSpecialStyles : function() {
				var
				window_height   = $(window).height(),
				contents_height = quickView.$containerCell.contents().outerHeight(),
				top_padding     = Math.round((window_height / 2) - (contents_height / 2)),
				top_padding     = Math.max(top_padding, 30);

				if (contents_height == 0) return;

				quickView.$containerCell.css('paddingTop',top_padding+"px").css('verticalAlign','top');
			},

			removeSpecialStyles : function() {
				quickView.$containerCell.css('paddingTop', '').css('verticalAlign', '');
			},

			bindCloseActions : function() {
				// Close on click
				quickView.$container.on('click', quickView.hide);

				// Close on esc key
				$('body').on('keyup', quickView.processKeyUp);
			},

			removeCloseActions : function() {
				quickView.$container.off('click', quickView.hide);
				$('body').off('keyup', quickView.processKeyUp);
			},

			processKeyUp : function(e) {
				if (e.which === 27) quickView.hide();
			},

			lockScroll : function() {
				// lock scroll position, but retain settings for later
				var scrollPosition = [
				  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
				  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
				];
				var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
				html.data('scroll-position', scrollPosition);
				html.data('previous-overflow', html.css('overflow'));
				html.css('overflow', 'hidden');
				window.scrollTo(scrollPosition[0], scrollPosition[1]);
				this.isScrollLocked = true;
			}, // end lockScroll

			unlockScroll : function() {
				if (!this.isScrollLocked) return false;

				var html = jQuery('html');
				var scrollPosition = html.data('scroll-position');
				html.css('overflow', html.data('previous-overflow'));
				window.scrollTo(scrollPosition[0], scrollPosition[1]);
			}
		};

		$(document).ready( function() {
			quickView.initialize();
		});

	})(jQuery);

} else {
	console.log("Warning: quickView was already defined so we could not load chapmanU/web-components quickView!")
}
;
/***************************************************
* This script searches for links that have a data attribute and attaches Google Analtics Event Tracking to them.
*
* This script takes in to account modifier keys to open links in new tabs.
*
* To run this script, simply include it anywhere on the page.
***************************************************/

(function ($) {

	var linkAnalytics = {

		initialize : function() {
			$('body').on('click', 'a', linkAnalytics.trackAction);
		}, // end initialize

		trackAction : function(e) {

			/***************************************************
			* Event attributes:
			*
			* Category (required), Action (required), Label (optional), value (optional)
			*
			* More information: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
			***************************************************/
			var attr_string = $(e.currentTarget).attr('data-analytics-event');

			// Do nothing if undefined
			if (attr_string === undefined) return true;

			var attributes 	= attr_string.split(",");
			var href_url 	= $(e.currentTarget).attr('href') || false;
			var modifierKey = (e.metaKey || e.ctrlKey);

			var ga_category = attributes[0] || 'Call to Action Link';
			var ga_action 	= attributes[1] || $(e.currentTarget).html() ||'Click';
			var ga_label 	= attributes[2] || $(e.currentTarget).attr('href') || undefined;
			var ga_value 	= parseInt(attributes[3]) || undefined;

			// Check for Google Universal Analytics
			if (typeof(ga) !== 'undefined') {

				// Send event to Google Analytics
				ga('send', 'event', ga_category, ga_action, ga_label, ga_value);

			// Check for ga.js
			} else if (typeof(_gaq) !== 'undefined') {

				// Send event to Google Analytics
				_gaq.push(['_trackEvent', ga_category, ga_action, ga_label, ga_value]);

				// Navigate browser to the URL
				if (href_url && !modifierKey) {
					setTimeout(function() {
						window.location.href = href_url;
					}, 250);

					e.preventDefault();
					return false;
				}

			} else {
				console.log("Google Analytics is not running, so no Google Analytics tracking data could be sent.");
			}

		} // end trackAction()
	}; // end linkAnalytics

	$(document).ready( function() {
		linkAnalytics.initialize();
	});

})(jQuery);
(function ( $ ) {


  /***** ::: Static Configuration ::: *****/
  var base_url     = 'https://events.chapman.edu/'
  var api_endpoint = 'https://events.chapman.edu/events.json';


  /***** ::: HTML TEMPLATE ::: *****/
  var template = '\
    <div class="cu-event-card"> \
      <a href="'+base_url+'{{permalink}}"> \
        <div class="thumbnail" style="background-image:url({{cover_photo}})"></div> \
        <div class="content"> \
          <h3 class="title">{{title}}</h3> \
          <p class="date">{{formatted_date}}</p> \
          <p class="time">{{formatted_time}}</p> \
        </div> \
      </a> \
    </div>';
  // End of the lines must be escaped for correct javsacript syntax. 
 

  /***** ::: jQuery Object Instance ::: *****/
  $.fn.cuEventWidget = function( options ) {
    var $self = this;


    /* ::: Instance Variables ::: */
    var settings = $.extend({
      group_id: this.data('group-id'),
    }, options );

    var query_params = {
      group_id : settings.group_id,
    };


    /* ::: Instance Methods ::: */

    // Maps fields from 'data' to the template vars in 'template'
    var buildHTML = function( data ) {
      return template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
          return data[token];
      });
    };

    var renderEvents = function( data ) {
      var elems = '';

      for (i=0; i < data.events.length; i++) {
        elems += buildHTML(data.events[i]);
      }

      $self.html(elems);

      // Append an appropriate link
      if ( 0 === data.events.length ) {
        showNoResultMessage();
      } else {
        appendMoreInfoLink();
      }

    };

    var showNoResultMessage = function( ) {
      $self.append('<p>Sorry, there are no matching events to display. <a href="'+base_url+'">View all Chapman University events &raquo;</a></p>');
    };

    var appendMoreInfoLink = function( ) {
      var url = base_url + '?' + $.param(query_params);
      $self.append('<p class="more-cu-events"><a href="'+url+'">View more upcoming events &raquo;</a></p>');
    }

    var getData = function( self ) {

      // Remove empty parameters
      if (query_params['group_id'] === '' || query_params['group_id'] == 0) {
        delete query_params['group_id'];
      }

      return $.ajax({
        cache: true,
        dataType: 'json',
        url: api_endpoint,
        data: query_params
      });
    };


    /* ::: Main Method ::: */
    getData().success(renderEvents).fail(showNoResultMessage);


    // It's the jQuery way! (Allows further command chaining)
    return this;

  };
 
}( jQuery ));
$(document).ready(function() {

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	   	/***************
		* CONFIGURATION
	   	****************/

	    // How fast should the transiion be?
	    var transition_speed = 400; // milliseconds

	    // How far before we speed up the scroll FX?
	    var max_scroll_pixels = 2800; // pixels

       	/***************
    	* END CONFIGURATION
       	****************/
	 
	    var 
	    target = this.hash,
		target_offset = $(target).offset().top,
		window_offset = $(document).scrollTop(),
		delta = target_offset - window_offset;
	 
	    if (Math.abs(delta) > max_scroll_pixels) {
	    	transition_speed = 100;
	    }

	    $('html, body').stop().animate({
	        'scrollTop': target_offset
	    }, transition_speed, 'swing', function () {
	        window.location.hash = target;
	    });
	
	});

});
