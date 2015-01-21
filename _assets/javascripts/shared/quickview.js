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
