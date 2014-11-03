if (typeof quickView === 'undefined') {

	// Add to the global scope!!
	var quickView = {

		isScrollLocked : false,

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

		show : function(htmlContent) {

			quickView.$containerCell.html(htmlContent).css('height',$(window).height()+"px").css('width',$(window).width()+"px");

			console.log('the window height is ' + $(window).height());

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

	$(document).ready( function() {
		quickView.initialize();
	});

} else {
	console.log("Warning: quickView was already defined so we could not load chapmanU/web-components quickView!")
}
