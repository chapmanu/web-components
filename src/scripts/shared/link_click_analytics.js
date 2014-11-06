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
