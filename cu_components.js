(function ($) {

	$(document).ready( function() {
		quickView.initialize();
	});

	var quickView = {

		isScrollLocked : false,

		initialize : function() {

			var $wrapper = $('body');

			// Create container
			$wrapper.append('<div id="imageQuickView"><div id="imageQuickViewCell"></div></div>');
			this.$container 	= $('#imageQuickView');
			this.$containerCell = $('#imageQuickViewCell');

			// Quick View FX
			$wrapper.delegate("a","click",function(e) {


				var targetURL = $(e.currentTarget).attr('href');

				// Do not intercept URLs that are not images or alt-clicked
				if (!quickView.hasImageExtension(targetURL) || e.metaKey) return true;

				quickView.show(targetURL);

				return false;
			});

			// Close on click
			this.$container.click(quickView.hide);

			// Close on esc key
			$('body').keyup(function(e) {
				if (e.which === 27) quickView.hide();
			});
		},

		hasImageExtension : function(url) {
			if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
		},

		show : function(targetURL) {

			var elem = '<img src="'+targetURL+'" />';

			quickView.$containerCell.html(elem).css('height',$(window).height()+"px").css('width',$(window).width()+"px");

			quickView.$container.fadeIn(80);

			quickView.lockScroll();
		},

		hide : function() {
			quickView.$container.fadeOut(40);
			setTimeout(function(){
				quickView.$containerCell.empty();
			},40);

			quickView.unlockScroll();
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

})(jQuery);

/***************************************************
* This script searches for links that have a data attribute and attaches Google Analtics Event Tracking to them.
*
* This script takes in to account modifier keys to open links in new tabs.
*
* To run this script, simply include it anywhere on the page.
***************************************************/
(function ($) {

	$(document).ready( function() {
		linkAnalytics.initialize();
	});

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

})(jQuery);

(function ($) {

	$(document).ready( function() {
		quickView.initialize();
	});

	var quickView = {

		isScrollLocked : false,

		initialize : function() {

			var $wrapper = $('body');

			// Create container
			$wrapper.append('<div id="imageQuickView"><div id="imageQuickViewCell"></div></div>');
			this.$container 	= $('#imageQuickView');
			this.$containerCell = $('#imageQuickViewCell');

			// Quick View FX
			$wrapper.delegate("a","click",function(e) {


				var targetURL = $(e.currentTarget).attr('href');

				// Do not intercept URLs that are not images or alt-clicked
				if (!quickView.hasImageExtension(targetURL) || e.metaKey) return true;

				quickView.show(targetURL);

				return false;
			});

			// Close on click
			this.$container.click(quickView.hide);

			// Close on esc key
			$('body').keyup(function(e) {
				if (e.which === 27) quickView.hide();
			});
		},

		hasImageExtension : function(url) {
			if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
		},

		show : function(targetURL) {

			var elem = '<img src="'+targetURL+'" />';

			quickView.$containerCell.html(elem).css('height',$(window).height()+"px").css('width',$(window).width()+"px");

			quickView.$container.fadeIn(80);

			quickView.lockScroll();
		},

		hide : function() {
			quickView.$container.fadeOut(40);
			setTimeout(function(){
				quickView.$containerCell.empty();
			},40);

			quickView.unlockScroll();
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

})(jQuery);

/***************************************************
* This script searches for links that have a data attribute and attaches Google Analtics Event Tracking to them.
*
* This script takes in to account modifier keys to open links in new tabs.
*
* To run this script, simply include it anywhere on the page.
***************************************************/
(function ($) {

	$(document).ready( function() {
		linkAnalytics.initialize();
	});

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

})(jQuery);

(function ($) {

	$(document).ready( function() {
		quickView.initialize();
	});

	var quickView = {

		isScrollLocked : false,

		initialize : function() {

			var $wrapper = $('body');

			// Create container
			$wrapper.append('<div id="imageQuickView"><div id="imageQuickViewCell"></div></div>');
			this.$container 	= $('#imageQuickView');
			this.$containerCell = $('#imageQuickViewCell');

			// Quick View FX
			$wrapper.delegate("a","click",function(e) {


				var targetURL = $(e.currentTarget).attr('href');

				// Do not intercept URLs that are not images or alt-clicked
				if (!quickView.hasImageExtension(targetURL) || e.metaKey) return true;

				quickView.show(targetURL);

				return false;
			});

			// Close on click
			this.$container.click(quickView.hide);

			// Close on esc key
			$('body').keyup(function(e) {
				if (e.which === 27) quickView.hide();
			});
		},

		hasImageExtension : function(url) {
			if (url) return(url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
		},

		show : function(targetURL) {

			var elem = '<img src="'+targetURL+'" />';

			quickView.$containerCell.html(elem).css('height',$(window).height()+"px").css('width',$(window).width()+"px");

			quickView.$container.fadeIn(80);

			quickView.lockScroll();
		},

		hide : function() {
			quickView.$container.fadeOut(40);
			setTimeout(function(){
				quickView.$containerCell.empty();
			},40);

			quickView.unlockScroll();
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

})(jQuery);

/***************************************************
* This script searches for links that have a data attribute and attaches Google Analtics Event Tracking to them.
*
* This script takes in to account modifier keys to open links in new tabs.
*
* To run this script, simply include it anywhere on the page.
***************************************************/
(function ($) {

	$(document).ready( function() {
		linkAnalytics.initialize();
	});

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

})(jQuery);
