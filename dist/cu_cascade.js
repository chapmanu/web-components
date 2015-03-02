








//omni nav?












































$(function () {

	// Begin Analytics Event Tracking
    var analytics_stage_interaction_counter = 0;
    $("#main").find(".flex-direction-nav a").click(function(e) {
        analytics_stage_interaction_counter++;
        var keyword = 'unknown';
        if ($(this).attr('class') == 'flex-prev') keyword = 'Left Arrow';
        if ($(this).attr('class') == 'flex-next') keyword = 'Right Arrow';

        _gaq.push(['_trackEvent', 'Home Page Stage Interaction', 'Navigation Click', keyword, analytics_stage_interaction_counter]);
    });
    // End Analytics Event Tracking

});
//these 2 functions not present in IE9 so had to add:
function addClass(el, newClassName){
    el.className += ' ' + newClassName;   
}

function removeClass(el, removeClassName){
    var elClass = el.className;
    while(elClass.indexOf(removeClassName) != -1) {
        elClass = elClass.replace(removeClassName, '');
        elClass = elClass.trim();
    }
    el.className = elClass;
}

// go home old browsers
if (/MSIE [0-8]\b/.test(navigator.userAgent)) {
    if (location.pathname !== '/upgrade-browser.aspx') {
		var node;

		'article aside details figcaption figure footer header hgroup main nav section summary'.replace(/\w+/g, function (nodeName) {
			node = document.createElement(nodeName);
		});

		// document.location = '//www.chapman.edu/upgrade-browser.aspx';
	}
} else {
	
	

// you get an svg
(function (document, uses, requestAnimationFrame, CACHE) {
	function embed(svg, g) {
		if (g) {
			var
			viewBox = g.getAttribute('viewBox'),
			fragment = document.createDocumentFragment(),
			clone = g.cloneNode(true);

			if (viewBox) {
				svg.setAttribute('viewBox', viewBox);
			}

			while (clone.childNodes.length) {
				fragment.appendChild(clone.childNodes[0]);
			}

			svg.appendChild(fragment);
		}
	}

	function onload() {
		var xhr = this, x = document.createElement('x'), s = xhr.s;

		x.innerHTML = xhr.responseText;

		xhr.onload = function () {
			s.splice(0).map(function (array) {
				embed(array[0], x.querySelector('#' + array[1].replace(/(\W)/g, '\\$1')));
			});
		};

		xhr.onload();
	}

	function onframe() {
		var use;

		while ((use = uses[0])) {
			var
			svg = use.parentNode,
			url = use.getAttribute('xlink:href').split('#'),
			url_root = url[0],
			url_hash = url[1];

			svg.removeChild(use);

			if (url_root.length) {
				var xhr = CACHE[url_root] = CACHE[url_root] || new XMLHttpRequest();

				if (!xhr.s) {
					xhr.s = [];

					xhr.open('GET', url_root);

					xhr.onload = onload;

					xhr.send();
				}

				xhr.s.push([svg, url_hash]);

				if (xhr.readyState === 4) {
					xhr.onload();
				}

			} else {
				embed(svg, document.getElementById(url_hash));
			}
		}

		requestAnimationFrame(onframe);
	}

	onframe();
})(
	document,
	document.getElementsByTagName('use'),
	window.requestAnimationFrame || window.setTimeout,
	{}
);

// gimme some sugar
(function (ARRAY, ELEMENT, NODELIST, HTMLCOLLECTION, PREFIX) {
	// <Element>.matches
	ELEMENT.matches = ELEMENT.matches || ELEMENT[PREFIX + 'MatchesSelector'];

	// <Element>.closest
	ELEMENT.closest = ELEMENT.closest || function (selector) {
		var node = this;

		while (node) {
			if (node.matches(selector)) {
				return node;
			} else {
				node = node.parentElement;
			}
		}

		return null;
	};

	// <NodeList>.each
	NODELIST.each = HTMLCOLLECTION.each = NODELIST.each || ARRAY.forEach;

	// <NodeList>.filter
	NODELIST.filter = HTMLCOLLECTION.filter = NODELIST.filter || function (selector) {
		return ARRAY.filter.call(this, typeof selector === 'string' ? function (node) {
			return node.matches(selector);
		} : typeof selector === 'function' ? selector : function (node) {
			return node === selector;
		});
	};

	// <NodeList>.indexOf
	NODELIST.indexOf = HTMLCOLLECTION.indexOf = NODELIST.indexOf || function (selector) {
		return ARRAY.indexOf.call(this, this.filter(selector)[0]);
	};

	// <NodeList>.toArray
	NODELIST.toArray = HTMLCOLLECTION.toArray = NODELIST.toArray || function () {
		return ARRAY.slice.call(this);
	};
})(
	Array.prototype,
	Element.prototype,
	NodeList.prototype,
	HTMLCollection.prototype,
	([].slice.call(getComputedStyle(document.documentElement)).join().match(/-(moz|ms|webkit)-/) || [])[1] || ''
);

//
(function () {
	// <Window>.Carousel
	function Carousel() {
		this.init.apply(this, arguments);
	}

	Carousel.init = function (node) {
		return new Carousel(node);
	};

	Carousel.initAll = function () {
		document.querySelectorAll('[data-carousel]').each(Carousel.init);

		document.addEventListener('DOMContentLoaded', Carousel.initAll);
	};

	Carousel.prototype = {
		// constructor
		constructor: Carousel,

		// init
		init: function (node) {
			this.node = node;

			this.initNode();
			this.initItems();
			this.initPrevnext();
		},
		initNode: function () {
			// update carousel
			this.node.removeAttribute('data-carousel');
			//DOESNT WORK IN IE9: this.node.classList.add('carousel');
			this.node.className += ' carousel';
			
		},
		initItems: function () {
			// get items
			this.items = this.node.querySelectorAll('figure');

			// update active item
			this.move(Math.max(this.items.indexOf('.active'), 0));
		},
		initPrevnext: function () {
			// add prev and next links
			var
			self = this,
			prev = self.node.appendChild(document.createElement('a')),
			next = self.node.appendChild(document.createElement('a'));

			prev.className = 'carousel-prevnext carousel-prev';
			next.className = 'carousel-prevnext carousel-next';

			prev.href = '#prev';
			next.href = '#next';

			// add prev and next events
			prev.addEventListener('click', function (event) {
				event.preventDefault();

				self.prev();
			});
			next.addEventListener('click', function (event) {
				event.preventDefault();

				self.next();
			});
		},

		// action
		move: function (nextIndex) {
			var items = this.items, length = items.length, index = this.index;

			// get next index as modulus
			nextIndex = nextIndex % length;
			nextIndex = nextIndex < 0 ? length + nextIndex : nextIndex;

			// if index has changed
			if (index !== nextIndex && items[nextIndex]) {
				// update items
				if (items[index]) {
					//DOESNT WORK IN IE9: items[index].classList.remove('active');
					removeClass(items[index],'active'); 					
				}

				items[nextIndex].className += ' active';

				// add backgrounds
				updateDataImages();

				this.index = nextIndex;
			}
		},
		prev: function () {
			return this.move(this.index - 1);
		},
		next: function () {
			return this.move(this.index + 1);
		}
	};

	// <Window>.updateDataImages
	function updateDataImages() {
		var maxWidth = window.innerWidth, maxHeight = window.innerHeight, sway = updateDataImages.sway;

		document.querySelectorAll('[data-src][data-img]').each(function (element) {
			var rect = element.getBoundingClientRect();

			if (rect.bottom >= -sway && rect.top <= maxHeight+sway && rect.right >= -sway && rect.left <= maxWidth+sway) {
				element.style.backgroundImage = 'url(' + element.getAttribute('data-src') + ')';

				element.removeAttribute('data-src');
			}
		});
	}

	updateDataImages.initAll = function () {
		updateDataImages();

		document.addEventListener('DOMContentLoaded', updateDataImages);

		window.addEventListener('scroll', updateDataImages);
	};

	// typekit
	function typekit() {
		var
		link = document.head.appendChild(document.createElement('link'));

		link.rel = 'stylesheet';
		link.href = '//use.typekit.net/c/214b82/futura-pt:n4:n5:n7,proxima-nova:i4:i7:n4:n7,rooney-sans:i4:i7:n4:n7.Y5K:P:2,SH3:P:2,SH5:P:2,b5x:P:2,b61:P:2,b5w:P:2,bBh:P:2,YFH:P:2,YFM:P:2,YFG:P:2,YFL:P:2/d?3bb2a6e53c9684ffdc9a99f71f5b2a62d9e04e8a5ad770d51978fca0a52d2f0f844bab0a10eb8bfbcbb916ae72625b24fa8285330368239a5f78526bc3bebc1544c153d498e6e15f4a53cd1adde7f3fe1278117f267f746528945856e0abbc6beb24981e39e4a592f9bbe4084a10d877a400f53417cb6250bfd6328d03e1fee6ae2d4ab8b52a8faeb7d07153c9ba798a9df603f9a6df4b39ade76d59c584e5d8f92c8ed44b46c5644c7cbae264275e9cd8e51c70b42ed2763801073814808d810b1ecc51a737920cc658db958e0c220151c930946bc7ff64c4ef80598802983ceb5d8679a5315ddaf8ca73fc6cef484eb9113ee5bb0e8fdb88e441ffb3dca39fa20dea6da04738f157655a51c0ff1041ddae35edf11f384e5b28d6d197eeba246758e054a2d689ce8a30bcee28521a1c7cad71b319d1f87050962a';
	}

	typekit.initAll = function () {
		document.addEventListener('DOMContentLoaded', typekit);
	};

	updateDataImages.sway = 128;

	// init
	window.Carousel = Carousel;
	window.updateDataImages = updateDataImages;

	Carousel.initAll();
	updateDataImages.initAll();
	typekit.initAll();
})();

}
;
$(function () {

	/* Small view hide/show top menus
    ------------------------------------------------------------------------------------------------*/

    $(".collapsedInfoForHeading").click(function () {
        $(this).add(".infoFor").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".resources-subNav-login, .resources-subNav-search").removeClass("active");
    });

    $(".collapsedResourcesHeading").click(function () {
        $(this).add(".resources-subNav-login").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".infoFor, .resources-subNav-search").removeClass("active");
    });

    $(".collapsedSearchHeading").click(function () {
        $(this).add(".resources-subNav-search").toggleClass("active");
        $(this).siblings("h5, div").removeClass("active");
        $(".infoFor, .resources-subNav-login").removeClass("active");
        // autofocus search box
        $("#smallSearchBox").css({
            fontSize: '16px'
        }).focus();
    });

});
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments;
        var newarr;

        try {
            args.callee = f.caller;
        } catch(e) {

        }

        newarr = [].slice.call(args);

        if (typeof console.log === 'object') {
            log.apply.call(console.log, console, newarr);
        } else {
            console.log.apply(console, newarr);
        }
    }
};

// make it safe to use console.log always
(function(a) {
    function b() {}
    var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn";
    var d;
    for (c = c.split(","); !!(d = c.pop());) {
        a[d] = a[d] || b;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch(a) {
        return (window.console = {});
    }
}());
(function ($) {

    $(document).ready( function() {

		cu_window_manager.initialize();
		cu_hero_area.initialize();
		cu_stories_area.initialize();
		cu_admission_area.initialize();
		cu_news_events_nav_area.initialize();
		smc_cta_tracker.initialize();

	});

	// SMC CTA tracker
	var smc_cta_tracker = {
		callback_url : 'http://smc_cta_tracker.meteor.com/track',

		initialize : function() {
			// $('.smc-cta').on('click', smc_cta_tracker.trackAction);
			$('body').on('click', '.smc-cta', smc_cta_tracker.trackAction);
		}, // end initialize

		trackAction : function(e) {

			var cta_id = $(e.currentTarget).attr('data-cta-id') || 'Unknown Campaign';
			var cta_label = $(e.currentTarget).attr('data-cta-label') || $(e.currentTarget).html() || 'Clicks';
			var href_url = $(e.currentTarget).attr('href') || false;

			var modifierKey = (e.metaKey || e.ctrlKey);

			var ok_to_navigate_away = true;

			// If has quickview html
			if ($(e.currentTarget).attr('data-quickview-content') !== undefined && (!modifierKey) && (cu_window_manager.windowWidth > 640)) {
				ok_to_navigate_away = false;
			}

			// If play audio
			if ($(e.currentTarget).hasClass('toggleAudio') && (!modifierKey)) {
				ok_to_navigate_away = false;
			}

			// Figure out the category for Google Analytics
			if ($(e.currentTarget).parents('#hero').length > 0) {
				var category = 'Home Page Hero CTA';
			} else if ($(e.currentTarget).parents('#undergraduateAdmission').length > 0) {
				var category = 'Home Page Undergraduate CTA';
			} else if ($(e.currentTarget).parents('#graduateAdmission').length > 0) {
				var category = 'Home Page Graduate CTA';
			} else if ($(e.currentTarget).parents('#featured_stories').length > 0) {
				var category = 'Home Page Blog Stories';
			} else {
				var category = 'Home Page General Click';
			}

			// Track Google Analytics
			// _gaq.push(['_trackEvent', category, cta_id, cta_label]);
			if (typeof(ga) !== 'undefined') ga('send', 'event', category, cta_id, cta_label);

			// Track w/ SMC tracking
			$.ajax({
			  url 		: smc_cta_tracker.callback_url,
			  type 		: 'GET',
			  cache 	: false,
			  timeout 	: 350,
			  // jsonpCallback: "complete",
			  data: { 
				'campaign_id' : cta_id,
				'campaign_label' : cta_label
			  },
			  dataType  : 'jsonp',
			  complete	: function() {

				// Navigate to the URL
				if (ok_to_navigate_away && !modifierKey) window.location.href = href_url;
			  }
			});

			// If we have a URL to navigate to, prevent default
			if (href_url && !modifierKey) {
				e.preventDefault();
				return false;
			}
		}
	}

	// A class to manage window resizer and scroller functions
	var cu_window_manager = {

		// Manual Configs
		resizerLatency : 40, // in milliseconds. Higher = less CPU, lower = faster UI 

		// Automagic Configs (changed by the script)
		useTransitions		: true, 
		useParallax			: true,
		cannotAutoplayVideo : false, 

		// Vars to initialize
		resizeTimeout 	: null, 
		windowWidth		: null,
		windowHeight	: null,
		scrollTop		: null,
		scrollBot		: null,
		getVars			: null,

		initialize : function() {

			// Check device type
			var i = 0,
				is_iOS = false,
				iDevice = ['iPad', 'iPhone', 'iPod'];
			for ( ; i < iDevice.length ; i++ ) {
				if( navigator.platform === iDevice[i] ){ is_iOS = true; break; }
			}
			var ua = navigator.userAgent.toLowerCase();
			var is_Android = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

			// Determine if this device cannot autoplay HTML5 video
			if (is_Android || is_iOS) {
				cu_window_manager.cannotAutoplayVideo = true;
				cu_window_manager.useTransitions = true;
			}

			if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){ 
				cu_window_manager.useParallax = true;
				cu_parallax_fx.setupFX();

			} else {
				cu_window_manager.useParallax = false;
			}

			// Set up window change events
			if (window.addEventListener) {
				window.addEventListener('scroll', cu_window_manager.scroller, false);
				window.addEventListener('resize', cu_window_manager.resizer, false);
			} else if (window.attachEvent) {
				window.attachEvent('onscroll', cu_window_manager.scroller);
				window.attachEvent('onresize', cu_window_manager.resizer);
			}

			// Intial vars
			cu_window_manager.scrollTop 	= $(window).scrollTop();
			cu_window_manager.windowWidth 	= $(window).width();
			cu_window_manager.windowHeight 	= $(window).height();

			// Featured story image rotator
			$("#featured_stories").find(".imagerotator").cycle({
				'next'		:'.imagerotator', // selector to advance slide on click
				'delay'		: 0, // additional delay before starting slideshow
				'timeout'	: 2000, // time between transitions
				'speed'		: 1400, // speed of transition
				'pause'		: false, // pause on mouse hover?
				'slideExpr' : 'img' // only select child elements that match this
			});

			var speeds = [];

			speeds[0] = 0;
			speeds[1] = 4000;
			speeds[2] = 2000;

			$("#generalInformation").find(".imagerotator").each(function(i) {

				$(this).cycle({
					'delay'		: speeds[i], // additional delay before starting slideshow
					'timeout'	: 7000, // time between transitions
					'speed'		: 2000, // speed of transition
					'pause'		: false, // pause on mouse hover?
					'slideExpr' : 'img' // only select child elements that match this
				})
			}); 

			// Force the height of .imagerotator to be the correct aspect ratio 

			// $(".imagerotator").each(function() {
			// 	var ratio = Math.round(($(this).find("img").outerHeight() / $(this).find("img").outerWidth()) * 100);
			// 	$(this).find('.imagerotator_clearfix').css('padding-bottom', ratio + '%');
			// });

		}, // end initialize


		/***************************************************
		* The purpose of the resizer function is to act as a buffer to prevent rapid execution of the functions which must run on window resize. 
		* By using a timetout, we can reduce the number of times these functions are called to increase browser performance. 
		***************************************************/
		resizer : function() {

			if (cu_window_manager.resizeTimeout != null) {
				clearTimeout(cu_window_manager.resizeTimeout);
			}
			cu_window_manager.resizeTimeout = setTimeout(function() {
				cu_window_manager.resizeTimeout = null; 

				// Update vars
				cu_window_manager.windowWidth = $(window).width();
				cu_window_manager.windowHeight = $(window).height();

				// FUNCTIONS TO FIRE ON RESIZE HERE:
				cu_hero_area.adjustVideoSize();

			}, cu_window_manager.resizerLatency); 

		}, // end resizer

		scroller : function() {

			// Update vars
			cu_window_manager.scrollTop = $(window).scrollTop();
			cu_window_manager.scrollBot = cu_window_manager.scrollTop + cu_window_manager.windowHeight;
			
			// FUNCTIONS TO FIRE ON SCROLL HERE:
			if (cu_window_manager.useParallax) cu_parallax_fx.process();

		} // end scroller

	} // end cu_window_manager


	// Contains the animation FX 
	var cu_parallax_fx = {

		enabled	: false, // starts false
		skrollr : null,

		admissionStartPX 			: null,
		admissionAnimationReady		: false,
		$undergraduateAdmission 	: null,

		graduateAdmissionStartPX 		: null,
		graduateAdmissionAnimationReady	: false,
		$graduateAdmission 				: null,


		// Prep the elements by hiding them as needed. Run only once. 
		setupFX : function() {

			/*
			* Undergraduate Admission
			*************************/
			this.$undergraduateAdmission = $("#undergraduateAdmission");	
			this.admissionStartPX = this.$undergraduateAdmission.find('.statistics').offset().top;

			this.$undergraduateAdmission.find('.fade-elem').css('opacity', 0); // prep for fade in

			/*
			* Graduate Admission
			*************************/
			this.$graduateAdmission = $("#graduateAdmission");
			this.graduateAdmissionStartPX = this.$graduateAdmission.offset().top;

			this.process(); // in case we already scrolled
		},

		// Re-run as needed. 
		enable : function() {

			// DO ENABLE TASKS
			try {

				// Do not initialize Skrollr on mobile. 
				if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
					cu_parallax_fx.skrollr = skrollr.init();
				}

			} catch (e) {
				// No Skrollr support
			}

			this.graduateAdmissionAnimationReady = true;
			this.admissionAnimationReady = true;

			cu_parallax_fx.enabled = true;
		},

		// Re-run as needed. 
		disable : function() {
			// DO DISABLE TASKS
			cu_parallax_fx.skrollr.destroy();
			cu_parallax_fx.enabled = false;

			this.$graduateAdmission.css('background-size','');
		},

		// Fire on scroll to position elements
		process : function() {

			if (!cu_parallax_fx.enabled && cu_window_manager.windowWidth > 640) {
				cu_parallax_fx.enable();
			} else if (cu_parallax_fx.enabled && cu_window_manager.windowWidth < 640) {
				cu_parallax_fx.disable();
			}

			if (!cu_parallax_fx.enabled) return false;

			/*
			* Undergraduate Admission | number counter
			*************************/
			if (this.admissionAnimationReady && cu_window_manager.scrollBot > this.admissionStartPX ) {
				this.animateAdmissionNumbers();

				this.$undergraduateAdmission.find('.fade-elem').each(function(i) {
					var $elem = $(this);
					setTimeout(function() {
						$elem.animate({'opacity':'1'}, 1000, 'linear');
					}, 600 * i);
				});

				this.admissionAnimationReady = false;
			} 

			/*
			* Graduate Admission | ken burns
			*************************/
			// if (this.graduateAdmissionAnimationReady && cu_window_manager.scrollBot > this.graduateAdmissionStartPX ) {

			// 	// this.kenBurns(this.$graduateAdmission);
			// 	this.graduateAdmissionAnimationReady = false;
			// } 

			if (cu_window_manager.scrollTop < 100) {
				// Reset the animation if the user goes to the top. 
				this.graduateAdmissionAnimationReady = true;
				this.admissionAnimationReady = true;
			}

		},

		/***************************************************
		* Ken burns FX for BG image of element
		***************************************************/
		kenBurns : function($elem) {

			// Do not fire if frame is already visible
			if ($elem.css('background-size') == '100%' ) {
				$elem.animate({'background-size':'120%'}, 10000, "swing");
			} else {
				$elem.css('background-size', '120%');
				$elem.animate({'background-size':'100%'}, 10000, "swing");
			}

		},

		animateAdmissionNumbers : function() {

			this.$undergraduateAdmission.find(".statistics").find("li").each(function(i) {

				var $label = $(this).find('.label');
				var $bigstat = $(this).find('.bigstat');

				$bigstat.css('opacity', 0);
				$label.css('opacity', 0);

				setTimeout(function() {
					cu_parallax_fx.animateSingleNumber($bigstat);

					$bigstat.animate({opacity:1}, 600);
					$label.animate({opacity:1}, 400);

				}, 100 * Math.floor((Math.random()*10)+1));
				
			});

		},

		/***************************************************
		* Takes a jQuery element $elem and animates the inner HTML if it is a number. 
		* Counts up to 'final_num' from 'start_num' over 'duration' milliseconds. 
		***************************************************/
		animateSingleNumber : function($elem, final_num, start_num, duration) {

			var original_num = $elem.html();

			// If not set, take inner HTML of elem
			if (!final_num) final_num = parseFloat($elem.html().replace(/,/,''));

			// If not set, count up from zero
			if (!start_num) start_num = 0;

			// If no set, default duration
			if (!duration) duration = 1000;

			// Find number of decimal places
			var decimalPlaces = (Math.floor(final_num) !== final_num) ? final_num.toString().split(".")[1].length || 0 : 0;

			// Test for correct EN locale string conversion
			var goodLocaleStringSupport = (new Number(10).toLocaleString() == '10');

			//Parking count animation
			$({countNum: 0})
			   .animate({countNum: final_num},{
					duration: duration,
					easing: 'swing',
					step: function() {

						// Round to decimal places
						var stepNum = this.countNum.toFixed(decimalPlaces);

						// Add a comma if not a decimal
						if (decimalPlaces == 0 && goodLocaleStringSupport) stepNum = parseInt(stepNum).toLocaleString('en');

						$elem.html(stepNum);
					},
					complete:function() {
						$elem.html(original_num);
					}
			});
		}

	} // end cu_parallax_fx

	var cu_hero_area = {

		// Configurations
		volumeTransitionSpeed 	: 0, // Set dynamically in setupContent()
		contentTransitionSpeed	: 2000,
		hero_stories_html_dir	: '_hero_stories/',

		// Do not configure these
		videoPlayer 			: null,
		audioPlayer				: false,
		pastCampaigns 			: null, // array of campaigns with some data
		currentCampaign 		: null, // int - the position in the pastCampaigns array
		videoTransitionTimeout	: null,
		isChanging				: false,

		ga_sound_event			: false,


		initialize : function() {

			// Volume function 
			$("#changeVolume").on('click', this.toggleSound);

			var requested_story_slug = (location.hash.match(/story-([\w-]+)/) || [])[1]; // undefined, or a string with the story slug

			// Check if we want to start with an older story
			if (requested_story_slug) {
				console.log(requested_story_slug);
				// Mask the hero space while we load
				$("#mastheadNavigation").hide();
				$("#hero").css('visibility', 'hidden'); // we hide this so it does not fade in on the transition

			} else {
				// Set up the current content
				cu_hero_area.setupContent($("#hero"));
				cu_hero_area.queueExcerptEntrance(100);
			}

			// Fetch past content
			$.getJSON(cu_hero_area.hero_stories_html_dir+"listing_order.json.txt", function(data){

				cu_hero_area.currentCampaign = 0;

				cu_hero_area.pastCampaigns = [];
				var keys = Object.keys(data);
				keys.forEach(function(key){

					// set the slug for this stage
					data[key]['slug'] = data[key]['filename'].substr(0, data[key]['filename'].indexOf('.'));

					// Add to our array
					cu_hero_area.pastCampaigns.push(data[key]);

					// If an older story was requested
					if (requested_story_slug) {

						// Look for the slug filename
						if (data[key]['slug'] == requested_story_slug) {
							cu_hero_area.currentCampaign = cu_hero_area.pastCampaigns.length-1;
						}
					}

				});

				// If an older story is found and can be loaded
				if (cu_hero_area.currentCampaign != 0) {
					cu_hero_area.processNavigation(cu_hero_area.currentCampaign);
				} else {
					// The older story was requested, but we did not find it. Load default content.
					$("#mastheadNavigation").show();
					$("#hero").css('visibility', '');
					cu_hero_area.setupContent($("#hero"));
					cu_hero_area.queueExcerptEntrance(100);

				}

				if (cu_hero_area.pastCampaigns.length > 1)
					$("#showOlderContent").removeClass('disabled');

				$("#showOlderContent").hammer().on("tap", function(e) {
					cu_hero_area.processNavigation('older');
					// _gaq.push(['_trackEvent', "Homepage UI Interaction", "Switch hero story", "older"]);
					if (typeof(ga) !== 'undefined') ga('send', 'event', "Homepage UI Interaction", "Switch hero story", "older");
				});

				$("#showNewerContent").hammer().on("tap", function(e) {
					cu_hero_area.processNavigation('newer');
					// _gaq.push(['_trackEvent', "Homepage UI Interaction", "Switch hero story", "newer"]);
					if (typeof(ga) !== 'undefined') ga('send', 'event', "Homepage UI Interaction", "Switch hero story", "newer");
				});

				// $("#heroWrapper").hammer().on("swipeleft", function(e) {
				// 	cu_hero_area.processNavigation('older');
				// });

				// $("#heroWrapper").hammer().on("swiperight", function(e) {
				// 	cu_hero_area.processNavigation('newer');
				// });

			});

		},

		/***************************************************
		* This function resizes the HTML5 video so that it covers the entire #mastheadBackground element. 
		* This simulates the property background-size:cover;
		* This needs to be run every time the browser window is resized. 
		***************************************************/
		adjustVideoSize : function() {

			if (!cu_hero_area.videoPlayer) return false;

			// Get the current video area size
			var container_width  = $('#mastheadBackground').outerWidth();
			var container_height = $('#mastheadBackground').outerHeight();

			// use largest scale factor of horizontal/vertical
			var scale_h = container_height / cu_hero_area.videoPlayer.videoHeight;
			var scale_v = container_width / cu_hero_area.videoPlayer.videoWidth;

			var scale = scale_h > scale_v ? scale_h : scale_v;

			var new_video_width = scale * cu_hero_area.videoPlayer.videoWidth;
			var new_video_height = scale * cu_hero_area.videoPlayer.videoHeight;

			// now scale the video
			$('#mastheadVideo').width(new_video_width);
			$('#mastheadVideo').height(new_video_height);

			// and center it by scrolling the video viewport
			$('#mastheadBackground').scrollLeft((new_video_width - container_width) / 2);
			$('#mastheadBackground').scrollTop((new_video_height - container_height) / 2);

		},

		setupContent : function($content) {

			// This clears any remaining transitions from the previous content
			if (cu_hero_area.videoTransitionTimeout != null) {
				clearTimeout(cu_hero_area.videoTransitionTimeout);
			}

			cu_hero_area.videoPlayer = $content.find('#mastheadVideo')[0];
			cu_hero_area.audioPlayer = $content.find('#mastheadAudio')[0];

			// If audio available
			// if (cu_hero_area.audioPlayer || cu_hero_area.videoPlayer) { // DISABLE VIDEO AUDIO
			if (cu_hero_area.audioPlayer) {

				// Configure transition speed
				cu_hero_area.volumeTransitionSpeed = (cu_hero_area.audioPlayer) ? 250 : 1000;

				// Show audio controls
				$("#changeVolume").removeClass('disabled');

				// Turn on sound if already on from previous (needs to be fixed)
				if (! $("#changeVolume").hasClass("muted")) {
					cu_hero_area.toggleSound();
				}
			} else {
				// No audio content 
				setTimeout(function() {
					$("#changeVolume").addClass('disabled');
				}, 1000);
			}

			// If video content
			if (cu_hero_area.videoPlayer && !cu_window_manager.cannotAutoplayVideo && cu_hero_area.videoPlayer.addEventListener) {

				cu_hero_area.videoPlayer.muted = true; // REQUIRED TO MUTE FOR SAFARI 5.1.3!!!! Does not obey mute property without this line

				cu_hero_area.videoPlayer.addEventListener('canplay', function() {
				
					// Start the video player
					cu_hero_area.videoPlayer.play();

					// Show the video
					$content.find("#mastheadVideo").fadeIn(1000);

					cu_hero_area.videoTransitionTimeout = setTimeout(function() {
						$content.addClass('video-playing');
					}, 1000);
					
					cu_hero_area.adjustVideoSize();

				});

			} else {

				// No video content
				$content.removeClass('video-playing');

			}

		},

		queueExcerptEntrance: function(delay_ms) {
			if (!cu_window_manager.useTransitions) return false;

			var $hero = $("#hero");

			$hero.find(".excerpt").css({
				"position"	: "relative",
				"left" 		: "50px",
				"opacity"	: "0"
			// Apply animations to the old outgoing content
			});

			$hero.find(".actions").css({
				"position"	: "relative",
				"left" 		: "100px",
				"opacity"	: "0"
			// Apply animations to the old outgoing content
			})

			setTimeout(function() {
				$hero.find(".excerpt").addClass("fast_transition").css({
					"left"		: "0px",
					"opacity"	: "1"
				});

				$hero.find(".actions").addClass("fast_transition").css({
					"left"		: "0",
					"opacity"	: "1"
				});
			}, delay_ms);
		},

		queueTitleAndExcerptEntrance: function(delay_ms) {
			// Fancy text animations
			if (!cu_window_manager.useTransitions) return false;

			var $hero = $("#hero");

			$("#hero").find(".heading").css({
				"position"	: "relative",
				"left" 		: "50px",
				"opacity"	: "0"
			// Apply animations to the old outgoing content
			});

			$("#hero").find(".subheading").css({
				"position"	: "relative",
				"left" 		: "50px",
				"opacity"	: "0"
			// Apply animations to the old outgoing content
			});

			setTimeout(function() {
				$("#hero").find(".heading").addClass("fast_transition").css({
					"left"		: "0",
					"opacity"	: "1"
				});

				$("#hero").find(".subheading").addClass("fast_transition").css({
					"left"		: "0",
					"opacity"	: "1"
				});


			}, delay_ms);

			cu_hero_area.queueExcerptEntrance(delay_ms * 1.5);

		},

		toggleSound : function() {

			if (cu_hero_area.audioPlayer) {
				var player = cu_hero_area.audioPlayer;
			} else if(cu_hero_area.videoPlayer) {
				var player = cu_hero_area.videoPlayer;
			} else {
				return false;
			}

			if ($("#changeVolume").hasClass("muted")) {
				if (cu_hero_area.audioPlayer) player.play();

				$("#changeVolume").removeClass("muted");
				player.muted = false;
				player.volume = 0;
				$(player).animate({volume: 1}, cu_hero_area.volumeTransitionSpeed);
			} else {

				$("#changeVolume").addClass("muted");
				$(player).animate({volume: 0}, cu_hero_area.volumeTransitionSpeed / 4);
				setTimeout(function() {
					player.muted = true;
					if (cu_hero_area.audioPlayer) player.pause();
				}, cu_hero_area.volumeTransitionSpeed / 4);
			}

			if (!cu_hero_area.ga_sound_event) {
				cu_hero_area.ga_sound_event = true;
				var campaign_id = $("#hero").find('.smc-cta').attr('data-cta-id');
				// _gaq.push(['_trackEvent', "Homepage UI Interaction", "Toggle sound on hero video", campaign_id]);
				if (typeof(ga) !== 'undefined') ga('send', 'event', "Homepage UI Interaction", "Toggle sound on hero video", campaign_id);
			}

		},

		// Accepts an int ID of a slide, or the string 'older' or 'newer' then transitions to that slide. 
		processNavigation : function(input) {

			if (cu_hero_area.isChanging) return false;
			cu_hero_area.isChanging = true;

			var max 		= cu_hero_area.pastCampaigns.length -1; // zero based
			var min 		= 0;
			var direction 	= 'older'; // default transition
			var current_num = cu_hero_area.currentCampaign;

			if (input == 'newer') {
				direction = 'newer';
				current_num--;
				
			} else if (input == 'older') {
				direction = 'older';
				current_num++;
				
			} else if (typeof input === 'number' && input % 1 == 0) {
				current_num = input;

			}

			if (current_num < min) return false;
			if (current_num > max) return false;

			cu_hero_area.currentCampaign = current_num;

			if (cu_window_manager.useTransitions) {
				$("#mastheadNavigation").fadeOut();
			}

			// Check for a local cached copy of this HTML
			if (cu_hero_area.pastCampaigns[current_num]['html']) {
				cu_hero_area.transitionToStory(cu_hero_area.pastCampaigns[current_num]['html'], direction);
			} else {

				var newFile = cu_hero_area.pastCampaigns[current_num]['filename']; 

				$.get(cu_hero_area.hero_stories_html_dir+newFile,function(data){
					cu_hero_area.pastCampaigns[current_num]['html'] = data;
					cu_hero_area.transitionToStory(data, direction);
				});
			}

			// Update the URL
			location.hash = "#story-"+cu_hero_area.pastCampaigns[current_num]['slug'];

		}, // end processNavigation

		transitionToStory : function(raw_html, direction) {

			// Fade out audio if old slide had audio
			if (cu_hero_area.videoPlayer) {
				$(cu_hero_area.videoPlayer).animate({volume: 0}, cu_hero_area.volumeTransitionSpeed);
			}

			$new_content = $(raw_html);
			$old_content = $("#hero");

			// Check for extra HTML wrap
			if ($new_content.find("#hero").length > 0) {
				$new_content = $new_content.find("#hero");
			}


			if (cu_window_manager.useTransitions) {

				$new_content.css({
					'opacity' : 0
				}).addClass('fast_transition');

				$old_content.css({
					"opacity" : 1,
					"margin-top" 	: "-"+$("#hero").outerHeight()+"px"
				}).addClass('fast_transition');

				$old_content.before($new_content);

				// Need to wait until the transition class is in the DOM
				setTimeout(function() {
					$new_content.css({
						"opacity":1
					});

					$old_content.css({
						"opacity":0
					});
				},250, $new_content, $old_content);
				
				// Wait until the transition is complete
				setTimeout(function() {
					// Remove the old content from the DOM
					$old_content.remove();

				},cu_hero_area.contentTransitionSpeed, $old_content);


			} else {
				$("#hero").before(raw_html).remove();
			}

			cu_hero_area.setupContent($new_content);

			if (direction == 'newer') {
				cu_hero_area.queueTitleAndExcerptEntrance(cu_hero_area.contentTransitionSpeed / 2.5);
			} else {
				cu_hero_area.queueTitleAndExcerptEntrance(cu_hero_area.contentTransitionSpeed / 3.3);
			}


			var timeToHideNav = (cu_window_manager.useTransitions) ? cu_hero_area.contentTransitionSpeed : 10;

			// Tasks after the switch is complete
			setTimeout(function() {
				var current_num = cu_hero_area.currentCampaign;
				var max = cu_hero_area.pastCampaigns.length -1; // zero based
				var min = 0;

				$("#mastheadNavigation").fadeIn();
				if (current_num == min) $("#showNewerContent").addClass('disabled');
				if (current_num == max) $("#showOlderContent").addClass('disabled');

				// Show the buttons if we aren't at an end of the list
				if (current_num != min) $("#showNewerContent").removeClass('disabled');
				if (current_num != max) $("#showOlderContent").removeClass('disabled');

				cu_hero_area.isChanging = false;

			}, timeToHideNav);
			

		}

	} // end cu_hero_area


	var cu_stories_area = {

		initialize : function() {
			// Share expansion
			$(".stories").delegate('.meta .shares','click',function(e) {
				$(this).parent(".meta").addClass("share_action");
				e.preventDefault();
				return false;
			})

			$(".meta .shares").lazybind("mouseenter", function(e) {
				
				$(".stories .meta").removeClass("share_action"); // clean up open items

				$(e.currentTarget).parent(".meta").addClass("share_action");
			}, 400, "mouseleave");

			$(".meta").lazybind("mouseleave", function(e) {
				// $(e.currentTarget).removeClass("share_action");
				$(".stories .meta").removeClass("share_action");
			}, 600, "mouseenter");


			// Set up the social media sharing function
			$(".stories").delegate('.meta a','click', this.processShareClick);


		},

		processShareClick : function(e) {
			if (e.target.href !== undefined) {
				var url = e.target.href;
				var service = $(e.target).attr('service');
			} else {
				var url = $(e.target).parents("a").attr("href");
				var service = $(e.target).parents("a").attr('service');
			}

			// if (service == 'Comments') {

			// 	_gaq.push(['_trackEvent', 'Social Engagement', 'Comment Jump Button', service]);

			// 	setTimeout(function() {
			// 		document.location.href = url;
			// 	}, 200);

			// 	return false;
			// }

			if (service != 'Facebook' && service != 'Twitter') {
				return false;
			}

			var x = window.screen.width;
			var y = window.screen.height;
			
			newwindow=window.open(url,'name','height=450,width=600,top='+(y/2 - 200)+ ',left=' + (x/2 - 300));
			if (window.focus) {newwindow.focus()}

			e.preventDefault();
			
			// Google Analytics Event Tracking
			// _gaq.push(['_trackEvent', 'Social Engagement', 'Social Media Share Button', service]);
			if (typeof(ga) !== 'undefined') ga('send', 'event', 'Social Engagement', 'Social Media Share Button', service);
			
			return false;
		}
	} // end cu_stories_area

	var cu_admission_area = {

		formTransitionSpeed : 400,
		$admissionCTA : null,

		initialize : function() {

			this.$admissionCTA = $("#admissionCTA");
			this.switchToMode('hide');

			$(".admissionCTA_start").on("click", function(e) {

				cu_admission_area.setupFormHTML(e);

				// cu_admission_area.switchToMode('hide');
				$(this).slideUp(cu_admission_area.formTransitionSpeed).siblings("a").slideUp(cu_admission_area.formTransitionSpeed);
				cu_admission_area.switchToMode('student_type');

			});


			$('input[name="student_type"]').on('change', function(){
				cu_admission_area.switchToMode('student_details');
			});

			this.$admissionCTA.find("#admissionCTA_form").on('submit', function(e) {
				e.preventDefault();
				cu_admission_area.submitForm();
				return false;

			});


		},

		setupFormHTML : function(e) {

			if (! $(e.currentTarget).siblings("#admissionCTA").length) {
				// Move the form here
				$(e.currentTarget).parent().append(cu_admission_area.$admissionCTA.detach());

			}
		},

		switchToMode : function(mode) {

			if (mode == 'student_type') {
				// this.$admissionCTA.css('max-height', '0px');

				this.$admissionCTA.find("#admissionCTA_form").show();
				this.$admissionCTA.find(".student_type_section").slideDown(cu_admission_area.formTransitionSpeed);

				// Uncheck radio button
				this.$admissionCTA.find('input[type="radio"]').prop('checked', false);

			} else if (mode == 'student_details') {
				// this.$admissionCTA.css('max-height', '999px');

				this.$admissionCTA.find("#admissionCTA_form").show();
				this.$admissionCTA.find(".student_details_section").slideDown(cu_admission_area.formTransitionSpeed);
			} else if (mode == 'hide') {
				var $student_type_section 	= this.$admissionCTA.find(".student_type_section");
				var $student_details_section = this.$admissionCTA.find(".student_details_section");

				$student_type_section.css('height', $student_type_section.height()).hide();
				$student_details_section.css('height', $student_details_section.outerHeight()).hide();

				this.$admissionCTA.find("#admissionCTA_form").hide();
			}

			return;
		},

		submitForm : function() {

			var name = this.$admissionCTA.find("input:text[name=name]").val();
			var email = this.$admissionCTA.find("input:text[name=email]").val();

			var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var is_valid_email = email_regex.test(email);

			if (name == 'Full Name' || name.length < 2) {
				// alert("Please enter your name.");
				// return false;
			}

			if (email == 'Email Address' || email.length < 2 || !is_valid_email) {
				// alert("Please enter a valid email address.");
				// return false;
			}


			this.$admissionCTA.find(".student_type_section").slideUp(cu_admission_area.formTransitionSpeed);
			this.$admissionCTA.find(".student_details_section").slideUp(cu_admission_area.formTransitionSpeed);

			setTimeout(function() {
				cu_admission_area.$admissionCTA.find("#admissionCTA_form").hide();
			}, cu_admission_area.formTransitionSpeed);


			this.$admissionCTA.find(".status").hide().html("<b>Thanks, "+name+"! </b><br><small>The <a href=\"http://www.chapman.edu/admission/\">CU admissions</a> team will be in touch soon.</small>").fadeIn();


			$('.admissionCTA_start').hide();

			return false;
		}

	} // end cu_admission_area

	var cu_news_events_nav_area = {

		initialize : function() {

			$(".newsEventsNav li").on("click", function() {
	        var $this = $(this),
	            i = $this.index();
	            
	        // Begin Analytics Event Tracking
	        if (! $this.hasClass('active')) {
	            var keyword = 'unknown';
	            if (i == 0) keyword = 'Featured';
	            if (i == 1) keyword = 'News';
	            if (i == 2) keyword = 'Events';
	            _gaq.push(['_trackEvent', 'Home Page Tab Interaction', 'Select Tab', keyword]);
	        }
	        // End Analytics Event Tracking

	        $this.addClass("active").siblings().removeClass("active");
	        $(".newsEventsContent li:eq(" + i + ")").addClass("active").siblings().removeClass("active");
	    });

	    // Keep the slide arrows on the edge of the browser window
	    $(".flex-direction-nav li .flex-next").offset({ left: $("#container").outerWidth() - 43 });
	    $(".flex-direction-nav li .flex-prev").offset({ left: $("#container").offset().left });

	    $(window).bind("resize", function ()
	    {
	        $(".flex-direction-nav li a.flex-next").offset({ left: $("#container").outerWidth() - 43 });
	        $(".flex-direction-nav li a.flex-prev").offset({ left: $("#container").offset().left });
	    });

		}

	}


	/***************************************************
	* Enables the user to click an image to see a larger version in browser. 
	***************************************************/
	var heroQuickView = {
		$pageWrapper : jQuery("#heroWrapper"),
		$container : '',
		$containerCell : '',
		isScrollLocked : false,

		initialize : function() {

			// Create container
			this.$pageWrapper.after('<div id="heroQuickView"><div id="heroQuickViewCell"></div></div>');
			this.$container = jQuery('#heroQuickView');
			this.$containerCell = jQuery('#heroQuickViewCell');

			// Attach function to content
			this.$pageWrapper.delegate("a","click",function(e) {

				var modifierKey = (e.metaKey || e.ctrlKey);

				var $quickviewHTML = jQuery(e.currentTarget).attr('data-quickview-content');

				var toggleAudio = jQuery(e.currentTarget).hasClass('toggleAudio');

				if (!modifierKey && toggleAudio) {
					cu_hero_area.toggleSound();
				}

				//Do not intercept URLs that are alt clicked or in small windows
				if (!modifierKey && (cu_window_manager.windowWidth > 640)) {
					heroQuickView.showContent($quickviewHTML);
				}

			});

			// Close on click
			this.$container.click(heroQuickView.hide);

			// Close on esc key
			jQuery('body').keyup(function(e) {
				if (e.which == 27) heroQuickView.hide();
			});
		},

		showContent : function(content) {
			if (content.length > 0) {
				heroQuickView.$containerCell.append(content).css('height',jQuery(window).height()+"px").css('width',jQuery(window).width()+"px");

				heroQuickView.$container.fadeIn(500);

				// lock scroll position, but retain settings for later
				heroQuickView.lockScroll();

				$('body').addClass('heroQuickview');
			}
		}, 

		hide : function() {
			heroQuickView.$container.fadeOut(40);
			setTimeout(function(){
				heroQuickView.$containerCell.empty();
			},40);

			// un-lock scroll position
			heroQuickView.unlockScroll();

			$('body').removeClass('heroQuickview');
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
		},

		hasImageExtension : function(url) {
			return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
		}
	} // end heroQuickView
	heroQuickView.initialize();


})(jQuery);

// Define Lazybind
(function($){
	$.fn.lazybind = function(event, fn, timeout, abort){
		var timer = null;
		$(this).bind(event, function(e){
			var ev = e;
			timer = setTimeout(function(){
				fn(ev);
			}, timeout);
		});
		if(abort == undefined){
			return;
		}
		$(this).bind(abort, function(){
			if(timer != null){
				clearTimeout(timer);
			}
		});
	};
})(jQuery);

// Object.keys pollyfill for older IE
if (!Object.keys) {
  Object.keys = (function () {
	var hasOwnProperty = Object.prototype.hasOwnProperty,
		hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
		dontEnums = [
		  'toString',
		  'toLocaleString',
		  'valueOf',
		  'hasOwnProperty',
		  'isPrototypeOf',
		  'propertyIsEnumerable',
		  'constructor'
		],
		dontEnumsLength = dontEnums.length;

	return function (obj) {
	  if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

	  var result = [];

	  for (var prop in obj) {
		if (hasOwnProperty.call(obj, prop)) result.push(prop);
	  }

	  if (hasDontEnumBug) {
		for (var i=0; i < dontEnumsLength; i++) {
		  if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
		}
	  }
	  return result;
	}
  })()
};

// Array.forEach pollyfill for older IE
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(fun /*, thisp*/)
  {
	var len = this.length;
	if (typeof fun != "function")
	  throw new TypeError();
	var thisp = arguments[1];
	for (var i = 0; i < len; i++)
	{
	  if (i in this)
		fun.call(thisp, this[i], i, this);
	}
  };
};
$(function () {

    /* IE 7 dialog */
    var IE7Dialog = '<div style="position: relative; margin-top: -15px; top: 0; height: 45px; background: #f2e842;" id="ie7_dialog"><p style="color: #5d591c; line-height: 45px; text-align: center; font-weight: bold;">It would appear you are running an outdated version of Internet Explorer. Please <a style="color: #5d591c; text-decoration: underline;" href="/upgrade-browser.aspx">download a modern browser</a> to ensure a pleasant browsing experience.</p></div>';
    $('body.ie7').prepend(IE7Dialog);
    /* end IE 7 dialog */

    // JSON, because IE7 smells funny and is made fun of at school
	var JSON;if(!JSON){JSON={}}(function(){function f(a){return a<10?"0"+a:a}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b==="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];if(i&&typeof i==="object"&&typeof i.toJSON==="function"){i=i.toJSON(a)}if(typeof rep==="function"){i=rep.call(b,a,i)}switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i){return"null"}gap+=indent;h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1){h[c]=str(c,i)||"null"}e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]";gap=g;return e}if(rep&&typeof rep==="object"){f=rep.length;for(c=0;c<f;c+=1){if(typeof rep[c]==="string"){d=rep[c];e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}else{for(d in i){if(Object.prototype.hasOwnProperty.call(i,d)){e=str(d,i);if(e){h.push(quote(d)+(gap?": ":":")+e)}}}}e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}";gap=g;return e}}"use strict";if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","   ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(a,b,c){var d;gap="";indent="";if(typeof c==="number"){for(d=0;d<c;d+=1){indent+=" "}}else if(typeof c==="string"){indent=c}rep=b;if(b&&typeof b!=="function"&&(typeof b!=="object"||typeof b.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":a})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e==="object"){for(c in e){if(Object.prototype.hasOwnProperty.call(e,c)){d=walk(e,c);if(d!==undefined){e[c]=d}else{delete e[c]}}}}return reviver.call(a,b,e)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})();


});
'use strict';

/* global BREI, _gaq */

var chapman = chapman || {};
var main = chapman.main || {};

(function ($, Modernizr, window, document) {

	/** 
	 * Main
	 */
	main.mainInit = function()
	{
		main.ui();

		$('.footer-links-group > h3').click(function()
		{
			$(this).parent().toggleClass('is-visible');
		});
	};

	main.ui = function()
	{
		var $visibleUi;
		var $body = $('body');

        function documentTap(e)
	    {

	    	if(!$(e.target).hasClass('resources-nav-btn'))
	    	{
		    	var $target = $(e.target);
		    	var $parents = $target.parents('.resources-subNav');
		    	var $audienceNav = $target.parents('.infoFor-menu');

		    	if($visibleUi !== undefined) {
		    		if($audienceNav.length === 0 && $parents.length === 0 && $visibleUi && $visibleUi[0] !== $target[0])
		        		hideUi(e);
		        }
		    }
	    }

	    $body.on('click touchstart', function(e)
    	{
    		documentTap(e);
    	});

	    function hideUi(e)
	    {
	    	if($visibleUi)
	        	$visibleUi.removeClass('is-visible');

	        $('.resources-nav-btn').removeClass('is-active');

	        $visibleUi = null;
	    }

	    function isSame($el)
	    {
	    	var isSame = false;

	    	if($visibleUi)
	    	{
	    		if($el[0] === $visibleUi[0])
	    			isSame = true;
	    	}

	    	return isSame;
	    }

	    function toggleUi($el, e)
	    {
	    	var isVisible = $el.hasClass('is-visible') ? true : false;

	    	if($visibleUi)
	    	{
	    		if($el[0] !== $visibleUi[0])
	    			hideUi();
	    	}

	        $visibleUi = $el;

	        if(!isVisible)
	        {
	            $el.addClass('is-visible');

	            if(e != undefined)
	            {
	            	$(e.currentTarget).addClass('is-active');
	            }
	        }
	        else
	        {
	            $el.removeClass('is-visible');
	            if(e != undefined)
	            {
	            	$(e.currentTarget).removeClass('is-active');
	            }
	            $visibleUi = null;
	        }
	    }

	    // mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
		function t(s, d)
		{
		    for(var p in d)
		        s=s.replace(new RegExp('{'+p+'}','g'), d[p]);
		    return s;
		};

		/**
	     * Main Nav li:hover show/hide subNav
	     */
	    if(!Modernizr.csstransitions)
	    {
		    $('.mainNavLinks .has-dropdown').hoverIntent(
	            function() 
	            {
	                $(this).children('.subNavLinks').addClass('is-visible');
	            },
	            function() 
	            {
	                $(this).children('.subNavLinks').removeClass('is-visible');
	            }
	        );
		}

	    /**
	     * Resources nav li:hover show/hide subNav
	     */
	    $('.resources-nav .resources-nav-btn').click(function(e)
	    {
	    	var toggle = $(this).parent().children('div');
	        toggleUi(toggle, e);

	        return false;
	    });

	    /**
	     *
	     */
	    $('#infoFor-btn').click(function()
	    {
	    	var toggle = $(this).parent('div').children('.infoFor-menu');
	        
	        if(!isSame(toggle))
	        	toggleUi(toggle);

	        return false;
	    });

	    /**
		 * enables the fancy triangle rollover 
		 */
		$('#mainNavLinks li:first').hover(function() {
	        $('#mainNavLinks').addClass('active');
	    }, function () {
	        $('#mainNavLinks').removeClass('active');
	    });

	    /* Set copyright date to current year
	    ------------------------------------------------------------------------------------------------*/

	    (function () {
	        var today = new Date();
	        $(".copyrightYear").html(today.getFullYear());
	    })();

	    //$.getScript("/_files/level/js/welcome.js");    
	    
	    /* New Nav */
	    $('.mainNavExpand').bind('click', function() {
	        $('.mainNav').toggleClass('open');
	        if ($('.mainNav').hasClass('open')) {
	            $('.mainNavExpand .arrow').html('&#8963;');
	        } else {
	            $('.mainNavExpand .arrow').html('&#8964;');
	        }
	    });

	};

	$(function()
	{
		main.mainInit();
	});    

})(window.jQuery, window.Modernizr, window, window.document);
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
$(function () {

	if ($(".rotatorContainer").parent(".homepage").length > 0) 
    {
        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: 10000,
            slideToStart: startingPane,
            slideshow: autoplay,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide];

                if ($('html').hasClass("opacity")) {
                    $('.slide').not(currentSlide).fadeTo(0, 0.1,
                        function ()
                        {
                        }
                    );
                }
                else {
                    if ($(".ie7").length) {
                        $('.rotatorContainer').css('overflow', 'hidden');
                        $('.slide').not(currentSlide).css('margin-top', '-9999999px');
                    }
                    else {
                        $('.slide').not(currentSlide).css('visibility', 'hidden');
                    }
                }
            },
            before: function (slider) {
                var nextSlide = slider.slides[slider.animatingTo],
                    $nextSlide = $(nextSlide),
                    difference = (parseInt(slider.currentSlide) - parseInt(slider.animatingTo)),
                    offset = '100px',
                    currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                if (difference === 1 || difference === -2) {
                    offset = '-100px';
                }

                $nextSlide.children(".bg1, .bg2, .bg3").stop().animate({ marginLeft: offset }, 300, function () {
                    $nextSlide.children(".bg3").animate({ marginLeft: '0' }, 500, function () { });
                    $nextSlide.children(".bg2").animate({ marginLeft: '0' }, 900, function () { });
                    $nextSlide.children(".bg1").animate({ marginLeft: '0' }, 700, function () { });
                });

                if ($('html').hasClass("opacity")) {
                    $('.slide').not(nextSlide).stop().fadeTo(500, .1, function () { });
                    $nextSlide.stop().fadeTo(500, 1, function () { });
                }

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $currentSlide.css({'opacity': 1})
                if (!$('html').hasClass("opacity")) {
                    if ($('.ie7').length) {
                        $('.slide').not(currentSlide).css('margin-top', '-99999999px');
                        $currentSlide.css('margin-top', '0px');
                    }
                    else {
                        $('.slide').not(currentSlide).css('visibility', 'hidden');
                        $currentSlide.css('visibility', 'visible');
                    }
                }
            }
        });
    }

    // Remove :focus outline from rotator nav arrows
    $(".flex-direction-nav li a").each(function () {
        $(this).attr("hideFocus", "true").css("outline", "none");
    });

    // Pause the slider once the user interacts with the slider
    $(".flex-direction-nav li a").live("click", function (event) {
        g_mySlider.pause();
        g_mySlider.resume = function () { };
    });

    // Flex navigation hover 
    $('.flex-direction-nav li a').hover(
        function () {
            $(this).animate({ opacity: 1 }, 200);
        }, function () {
            $(this).animate({ opacity: .3 }, 100);
        }
    );

});
$(function () {

	/* Search
    ------------------------------------------------------------------------------------------------*/

    $(".searchButton").click(function () {
        var searchTerm = $(this).siblings(".searchBox").val();
        search(searchTerm);
    });

    $(".searchBox").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            var searchTerm = $(this).val();
            search(searchTerm);
        }
    });

    function search(searchTerm) {
        window.location = "/search_results.asp?cx=003348829706320756496%3Adbv13petw_8&cof=FORID%3A9&ie=UTF-8&q=" + searchTerm + "&sa=Search&siteurl=chapman.edu%252F";
    }

    /***************************************************
	* This code watches what the user types into our search field
	* and displays a helpful tooltip if they are looking for Blackboard
	* or Webadvisor
	***************************************************/

	// Run when the page is ready
	$(document).ready(function () {
		cu_search_helper.initialize();

		cu_search_autofocus.initialize();
	});

	var
	keyCodes = {
		'search': 191
	},
	focusableElements = /a|button|input|option|select|textarea/i,
	$elements = {
		btnSearch: $('a.resources-nav-btn-search'),
		navSearch: $('div.resources-subNav-search'),
		inpSearch: $('#smallSearchBox')
	},
	cu_search_autofocus = {
		initialize: function () {
			$(window).on('keydown', function (event) {
				if (!cu_search_autofocus.elementSupportsFocus(document.activeElement) && event.keyCode === keyCodes.search) {
					event.preventDefault();

					cu_search_autofocus.openSearch();
					cu_search_autofocus.focusSearch();
				}
			});

			$elements.btnSearch.on('click', cu_search_autofocus.focusSearch);
		},
		focusSearch: function () {
			$elements.inpSearch.focus();
		},
		openSearch: function () {
			$elements.btnSearch.addClass('is-active');
			$elements.navSearch.addClass('is-visible');
		},
		elementSupportsFocus: function (element) {
			return element.nodeName.match(focusableElements) || element.hasAttribute('tabindex');
		}
	},
	cu_search_helper = {
		tooltip_visible: false,

		initialize: function () {

			// Do not run this object on small viewports
			if ($(window).width() < 780) return false;

			// Run this each time they type a letter
			$('#smallSearchBox').on('keyup', function() {

				var query_substring = $(this).val().substring(0,3).toLowerCase();

				if (query_substring === 'bla') {
					cu_search_helper.showHelpfulTip('Blackboard');
				} else if (query_substring === 'web') {
					cu_search_helper.showHelpfulTip('WebAdvisor');
				} else {
					cu_search_helper.hideHelpfulTip();
				}

			});
		},

		// Show the tooltip
		showHelpfulTip : function(serviceName) {
			if (this.tooltip_visible) return false;

			this.tooltip_visible = true;
			// Add overlay
			$('<div id="cuNavBarMasks"><div class="mask_1"></div><div class="mask_2"></div></div>').prependTo($('.resources-subNav-search')).hide().fadeIn(600);

			// Add a tooltip
			$('<div id="cuSearchHelper"><span class="title">Looking for <b>'+serviceName+'</b>?</span><br /><span class="label">We added a faster way to find our web services. </span></div>').prependTo($('.resources-subNav-search')).hide().slideDown(300);

			$('.resources-subNav-search').addClass('show-helper');

			// Hide Google autocomplete
			$('.gssb_c').hide();
			setTimeout(function() {
				$('.gssb_c').hide();
			}, 300);

		},

		// Hide the tooltip
		hideHelpfulTip : function() {
			if (!this.tooltip_visible) return false;

			this.tooltip_visible = false;

			// Remove the tooltip
			$('.resources-subNav-search').removeClass('show-helper');

			$('#cuSearchHelper').slideUp(300,function() { 
				$('#cuSearchHelper').remove(); 
			});

			// Remove the overlay
			$('#cuNavBarMasks').fadeOut(300,function() { 
				$('#cuNavBarMasks').remove(); 
			});

		}
	};

	var $formClone = $('#cse-search-form form').clone(),
        $searchButtonClone = $('#cse-search-form form input.gsc-search-button').clone(true),
        $formCloneSmall = $('#cse-search-form-small form').clone(),
        $searchButtonCloneSmall = $('#cse-search-form-small form input.gsc-search-button').clone(true);

    $('#cse-search-form form').remove();
    $formClone.appendTo('#cse-search-form');  
    $('#cse-search-form form input.gsc-search-button').replaceWith($searchButtonClone);

    $('#cse-search-form-small form').remove();
    $formCloneSmall.appendTo('#cse-search-form-small');  
    $('#cse-search-form-small form input.gsc-search-button').replaceWith($searchButtonCloneSmall);

    $('#cse-search-form form input, #cse-search-form-small form input').removeAttr('disabled');

    $('#cse-search-form form input, #cse-search-form-small form input').live('keydown', function(e){
     
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            e.preventDefault();
        }
        $(this).css({background:'none'});

    }); 

    $('#cse-search-form-small form input').live('focus', function(){
        $('.rotatorContainer').css("visibility", "hidden");
    });

    $('#cse-search-form-small form input').live('blur', function(){
        $('.rotatorContainer').css("visibility", "visible");
    });

    $('#cse-search-form form input, #cse-search-form-small form input').live('keydown', function(e){
        
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            BREI.Personalization.pushToRecentSearches($(this).val());
            googleSearch($(this).val());
        }

    });

    $('#cse-search-form form input.gsc-search-button').click(function(){
        googleSearch($('#cse-search-form form input').val());
    });

    $('#cse-search-form-small form input.gsc-search-button').click(function(){
        googleSearch($('#cse-search-form-small form input').val());
    });

    function googleSearch(value){
        window.location = "/search-results/index.aspx?q=" + value;
    }
            
});
'use strict';

var shortcuts = chapman.shortcuts || {};

(function ($, Modernizr, window, document) {
	
	// template for a favorite item
	shortcuts.favoriteItem = '<li><a href="{url}" title="{title}" class="shortcut">{title}</a><a href="{url}" title="Remove {title} from favorites" class="hide-text btn-removeShortcut">Remove</a></li>';

	shortcuts.init = function()
	{
		// remove buttons
		$('.btn-removeShortcut').click(function()
		{
			var url = window.location.href;
            var favorites = BREI.Personalization.getFavorites();

            for(var i=0; i<favorites.length;i++)
            {
                if(favorites[i].url === url){
                    favorites.splice(i, 1);                   
                }
            }

            BREI.Personalization.setFavorites(favorites);
            

            $('#welcome .control-links .save-btn, #welcome .control-links .unsave-btn').toggleClass('showme');

            shortcuts.loadFavorites();
            shortcuts.rebuildPager();

			return false;
		});

		// save button
        $('#btn-addThisPage').click(function() 
        {
            var url = window.location.href;
            var isFavorite = BREI.Personalization.has(url);
            var sub = document.title;
            //var title = sub.substring(sub.indexOf('|') + 2, sub.length)
            var title = sub;

            if(isFavorite)
            	shortcuts.removeFavorite(url);
            else
            	BREI.Personalization.pushToFavorites(url, title);

            _gaq ? _gaq.push(['_trackEvent', 'welcomeback', 'save', 'page', url]) : '';

            shortcuts.buildFavoritesList();

            return false;
        });

		shortcuts.buildFavoritesList();
	};

	shortcuts.toggleAddButton = function()
	{
        var isFavorite = BREI.Personalization.has(window.location.href);

        if(isFavorite)
        	$('#btn-addThisPage').addClass('is-favorite').html('Remove this page');
        else
        	$('#btn-addThisPage').removeClass('is-favorite').html('Add this page');
	};

	/**
	 * Builds the list under the shortcuts menu
	 */
	shortcuts.buildFavoritesList = function()
	{
		var faves = BREI.Personalization.getFavorites();
		var $favoritesList = $('#favoritesList').html('');

		if (faves.length != 0 && faves[0] != null) 
		{
			for (var i in faves)
			{
				var title = faves[i].sub;
				var url = faves[i].url;
				var li = t(shortcuts.favoriteItem, {
					title: title,
					url: url
				});
            	$favoritesList.append(li);
            }
		}

		$('.btn-removeShortcut').click(function()
		{
			var url = $(this).attr('href');
			shortcuts.removeFavorite(url);
			return false;
		});

		shortcuts.toggleAddButton();
	};

	/**
	 * Removes the provided URL
	 */
	shortcuts.removeFavorite = function(url)
	{
		var favorites = BREI.Personalization.getFavorites();

		for(var i = 0; i < favorites.length; i++)
		{
            if(favorites[i].url === url)
            {
                favorites.splice(i, 1);
                BREI.Personalization.setFavorites(favorites);
            }
        }

        shortcuts.buildFavoritesList();
	};

	$(function()
	{
		shortcuts.init();
	});    

})(window.jQuery, window.Modernizr, window, window.document);
$(function () {

	/* Video overlay
    ------------------------------------------------------------------------------------------------*/

    $(".videoLink").live("click", function (event) {
        event.preventDefault();
        var src = $(this).attr("data-video");
        $("#videoContainer .video").attr('src', src);


        $(".overlay").show(0).animate({ top: 0 }, 1e3, function () { g_mySlider.manualPause = true; g_mySlider.pause(); });
    });
    
    // Link to flash download if not detected
    if (!swfobject.hasFlashPlayerVersion("9.0.115")) {
        $(".overlay").prepend('<p style="position:absolute;top:15px;text-align:center;width:100%;">This video requires at least version 9.0.115 of <a href="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank">Adobe Flash Player</a></p>');
    }

    $(".closeButton").live("click", function () {
        $(".overlay").animate({ top: "700px" }, 1e3, function () { }).hide(0);
        var videoClone = $('#videoContainer').html();
        $('#videoContainer div').remove();
        $("#videoContainer").html(videoClone);
        g_mySlider.resume();
    });

});
/*!
 * AmplifyJS 1.1.0 - Core, Store, Request
 * 
 * Copyright 2011 appendTo LLC. (http://appendto.com/team)
 * Dual licensed under the MIT or GPL licenses.
 * http://appendto.com/open-source-licenses
 * 
 * http://amplifyjs.com
 */

(function(a,b){var c=[].slice,d={},e=a.amplify={publish:function(a){var b=c.call(arguments,1),e,f,g,h=0,i;if(!d[a])return!0;e=d[a].slice();for(g=e.length;h<g;h++){f=e[h],i=f.callback.apply(f.context,b);if(i===!1)break}return i!==!1},subscribe:function(a,b,c,e){arguments.length===3&&typeof c=="number"&&(e=c,c=b,b=null),arguments.length===2&&(c=b,b=null),e=e||10;var f=0,g=a.split(/\s/),h=g.length,i;for(;f<h;f++){a=g[f],i=!1,d[a]||(d[a]=[]);var j=d[a].length-1,k={callback:c,context:b,priority:e};for(;j>=0;j--)if(d[a][j].priority<=e){d[a].splice(j+1,0,k),i=!0;break}i||d[a].unshift(k)}return c},unsubscribe:function(a,b){if(!!d[a]){var c=d[a].length,e=0;for(;e<c;e++)if(d[a][e].callback===b){d[a].splice(e,1);break}}}}})(this),function(a,b){function e(a,e){c.addType(a,function(f,g,h){var i,j,k,l,m=g,n=(new Date).getTime();if(!f){m={},l=[],k=0;try{f=e.length;while(f=e.key(k++))d.test(f)&&(j=JSON.parse(e.getItem(f)),j.expires&&j.expires<=n?l.push(f):m[f.replace(d,"")]=j.data);while(f=l.pop())e.removeItem(f)}catch(o){}return m}f="__amplify__"+f;if(g===b){i=e.getItem(f),j=i?JSON.parse(i):{expires:-1};if(j.expires&&j.expires<=n)e.removeItem(f);else return j.data}else if(g===null)e.removeItem(f);else{j=JSON.stringify({data:g,expires:h.expires?n+h.expires:null});try{e.setItem(f,j)}catch(o){c[a]();try{e.setItem(f,j)}catch(o){throw c.error()}}}return m})}var c=a.store=function(a,b,d,e){var e=c.type;d&&d.type&&d.type in c.types&&(e=d.type);return c.types[e](a,b,d||{})};c.types={},c.type=null,c.addType=function(a,b){c.type||(c.type=a),c.types[a]=b,c[a]=function(b,d,e){e=e||{},e.type=a;return c(b,d,e)}},c.error=function(){return"amplify.store quota exceeded"};var d=/^__amplify__/;for(var f in{localStorage:1,sessionStorage:1})try{window[f].getItem&&e(f,window[f])}catch(g){}if(window.globalStorage)try{e("globalStorage",window.globalStorage[window.location.hostname]),c.type==="sessionStorage"&&(c.type="globalStorage")}catch(g){}(function(){if(!c.types.localStorage){var a=document.createElement("div"),d="amplify";a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a);try{a.addBehavior("#default#userdata"),a.load(d)}catch(e){a.parentNode.removeChild(a);return}c.addType("userData",function(e,f,g){a.load(d);var h,i,j,k,l,m=f,n=(new Date).getTime();if(!e){m={},l=[],k=0;while(h=a.XMLDocument.documentElement.attributes[k++])i=JSON.parse(h.value),i.expires&&i.expires<=n?l.push(h.name):m[h.name]=i.data;while(e=l.pop())a.removeAttribute(e);a.save(d);return m}e=e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(f===b){h=a.getAttribute(e),i=h?JSON.parse(h):{expires:-1};if(i.expires&&i.expires<=n)a.removeAttribute(e);else return i.data}else f===null?a.removeAttribute(e):(j=a.getAttribute(e),i=JSON.stringify({data:f,expires:g.expires?n+g.expires:null}),a.setAttribute(e,i));try{a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j),c.userData();try{a.setAttribute(e,i),a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j);throw c.error()}}return m})}})(),function(){function e(a){return a===b?b:JSON.parse(JSON.stringify(a))}var a={},d={};c.addType("memory",function(c,f,g){if(!c)return e(a);if(f===b)return e(a[c]);d[c]&&(clearTimeout(d[c]),delete d[c]);if(f===null){delete a[c];return null}a[c]=f,g.expires&&(d[c]=setTimeout(function(){delete a[c],delete d[c]},g.expires));return f})}()}(this.amplify=this.amplify||{}),function(a,b){function e(a){var b=!1;setTimeout(function(){b=!0},1);return function(){var c=this,d=arguments;b?a.apply(c,d):setTimeout(function(){a.apply(c,d)},1)}}function d(a){return{}.toString.call(a)==="[object Function]"}function c(){}a.request=function(b,f,g){var h=b||{};typeof h=="string"&&(d(f)&&(g=f,f={}),h={resourceId:b,data:f||{},success:g});var i={abort:c},j=a.request.resources[h.resourceId],k=h.success||c,l=h.error||c;h.success=e(function(b,c){c=c||"success",a.publish("request.success",h,b,c),a.publish("request.complete",h,b,c),k(b,c)}),h.error=e(function(b,c){c=c||"error",a.publish("request.error",h,b,c),a.publish("request.complete",h,b,c),l(b,c)});if(!j){if(!h.resourceId)throw"amplify.request: no resourceId provided";throw"amplify.request: unknown resourceId: "+h.resourceId}if(!a.publish("request.before",h))h.error(null,"abort");else{a.request.resources[h.resourceId](h,i);return i}},a.request.types={},a.request.resources={},a.request.define=function(b,c,d){if(typeof c=="string"){if(!(c in a.request.types))throw"amplify.request.define: unknown type: "+c;d.resourceId=b,a.request.resources[b]=a.request.types[c](d)}else a.request.resources[b]=c}}(amplify),function(a,b,c){var d=["status","statusText","responseText","responseXML","readyState"],e=/\{([^\}]+)\}/g;a.request.types.ajax=function(e){e=b.extend({type:"GET"},e);return function(f,g){function n(a,e){b.each(d,function(a,b){try{m[b]=h[b]}catch(c){}}),/OK$/.test(m.statusText)&&(m.statusText="success"),a===c&&(a=null),l&&(e="abort"),/timeout|error|abort/.test(e)?m.error(a,e):m.success(a,e),n=b.noop}var h,i=e.url,j=g.abort,k=b.extend(!0,{},e,{data:f.data}),l=!1,m={readyState:0,setRequestHeader:function(a,b){return h.setRequestHeader(a,b)},getAllResponseHeaders:function(){return h.getAllResponseHeaders()},getResponseHeader:function(a){return h.getResponseHeader(a)},overrideMimeType:function(a){return h.overrideMideType(a)},abort:function(){l=!0;try{h.abort()}catch(a){}n(null,"abort")},success:function(a,b){f.success(a,b)},error:function(a,b){f.error(a,b)}};a.publish("request.ajax.preprocess",e,f,k,m),b.extend(k,{success:function(a,b){n(a,b)},error:function(a,b){n(null,b)},beforeSend:function(b,c){h=b,k=c;var d=e.beforeSend?e.beforeSend.call(this,m,k):!0;return d&&a.publish("request.before.ajax",e,f,k,m)}}),b.ajax(k),g.abort=function(){m.abort(),j.call(this)}}},a.subscribe("request.ajax.preprocess",function(a,c,d){var f=[],g=d.data;typeof g!="string"&&(g=b.extend(!0,{},a.data,g),d.url=d.url.replace(e,function(a,b){if(b in g){f.push(b);return g[b]}}),b.each(f,function(a,b){delete g[b]}),d.data=g)}),a.subscribe("request.ajax.preprocess",function(a,c,d){var e=d.data,f=a.dataMap;!!f&&typeof e!="string"&&(b.isFunction(f)?d.data=f(e):(b.each(a.dataMap,function(a,b){a in e&&(e[b]=e[a],delete e[a])}),d.data=e))});var f=a.request.cache={_key:function(a,b,c){function g(){return c.charCodeAt(e++)<<24|c.charCodeAt(e++)<<16|c.charCodeAt(e++)<<8|c.charCodeAt(e++)<<0}c=b+c;var d=c.length,e=0,f=g();while(e<d)f^=g();return"request-"+a+"-"+f},_default:function(){var a={};return function(b,c,d,e){var g=f._key(c.resourceId,d.url,d.data),h=b.cache;if(g in a){e.success(a[g]);return!1}var i=e.success;e.success=function(b){a[g]=b,typeof h=="number"&&setTimeout(function(){delete a[g]},h),i.apply(this,arguments)}}}()};a.store&&(b.each(a.store.types,function(b){f[b]=function(c,d,e,g){var h=f._key(d.resourceId,e.url,e.data),i=a.store[b](h);if(i){e.success(i);return!1}var j=g.success;g.success=function(d){a.store[b](h,d,{expires:c.cache.expires}),j.apply(this,arguments)}}}),f.persist=f[a.store.type]),a.subscribe("request.before.ajax",function(a){var b=a.cache;if(b){b=b.type||b;return f[b in f?b:"_default"].apply(this,arguments)}}),a.request.decoders={jsend:function(a,b,c,d,e){a.status==="success"?d(a.data):a.status==="fail"?e(a.data,"fail"):a.status==="error"&&(delete a.status,e(a,"error"))}},a.subscribe("request.before.ajax",function(c,d,e,f){function k(a,b){h(a,b)}function j(a,b){g(a,b)}var g=f.success,h=f.error,i=b.isFunction(c.decoder)?c.decoder:c.decoder in a.request.decoders?a.request.decoders[c.decoder]:a.request.decoders._default;!i||(f.success=function(a,b){i(a,b,f,j,k)},f.error=function(a,b){i(a,b,f,j,k)})})}(amplify,jQuery);
// Cookie
(function(a){a.cookie=function(b,c,d){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(c))||c===null||c===undefined)){d=a.extend({},d);if(c===null||c===undefined){d.expires=-1}if(typeof d.expires==="number"){var e=d.expires,f=d.expires=new Date;f.setDate(f.getDate()+e)}c=String(c);return document.cookie=[encodeURIComponent(b),"=",d.raw?c:encodeURIComponent(c),d.expires?"; expires="+d.expires.toUTCString():"",d.path?"; path="+d.path:"",d.domain?"; domain="+d.domain:"",d.secure?"; secure":""].join("")}d=c||{};var g=d.raw?function(a){return a}:decodeURIComponent;var h=document.cookie.split("; ");for(var i=0,j;j=h[i]&&h[i].split("=");i++){if(g(j[0])===b)return g(j[1]||"")}return null}})(jQuery)
;
/**
 * Cross browser Ellipsis
 */

(function(e){e.fn.ellipsis=function(){return this.each(function(){var t=e(this);if(t.css("overflow")=="hidden"){var n=t.html();var r=t.hasClass("multiline");var i=e(this.cloneNode(true)).hide().css("position","absolute").css("overflow","visible").width(r?t.width():"auto").height(r?"auto":t.height());t.after(i);function s(){return i.height()>t.height()}function o(){return i.width()>t.width()}var u=r?s:o;while(n.length>0&&u()){n=n.substr(0,n.length-1);i.html(n+"...")}t.html(i.html());i.remove()}})}})(jQuery);
/*
 * jQuery FlexSlider v2.2.0
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */

(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.click(function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){t.addEventListener("touchstart",g,!1);function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.slides.width(r.computedW);r.update(r.pagingCount);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"))}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide")};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);
/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/

(function ($) { $.fn.hoverIntent = function (f, g) { var cfg = { sensitivity: 7, interval: 100, timeout: 0 }; cfg = $.extend(cfg, g ? { over: f, out: g} : f); var cX, cY, pX, pY; var track = function (ev) { cX = ev.pageX; cY = ev.pageY }; var compare = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) { $(ob).unbind("mousemove", track); ob.hoverIntent_s = 1; return cfg.over.apply(ob, [ev]) } else { pX = cX; pY = cY; ob.hoverIntent_t = setTimeout(function () { compare(ev, ob) }, cfg.interval) } }; var delay = function (ev, ob) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); ob.hoverIntent_s = 0; return cfg.out.apply(ob, [ev]) }; var handleHover = function (e) { var ev = jQuery.extend({}, e); var ob = this; if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t) } if (e.type == "mouseenter") { pX = ev.pageX; pY = ev.pageY; $(ob).bind("mousemove", track); if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout(function () { compare(ev, ob) }, cfg.interval) } } else { $(ob).unbind("mousemove", track); if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout(function () { delay(ev, ob) }, cfg.timeout) } } }; return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover) } })(jQuery);
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(g){var q={vertical:!1,rtl:!1,start:1,offset:1,size:null,scroll:3,visible:null,animation:"normal",easing:"swing",auto:0,wrap:null,initCallback:null,setupCallback:null,reloadCallback:null,itemLoadCallback:null,itemFirstInCallback:null,itemFirstOutCallback:null,itemLastInCallback:null,itemLastOutCallback:null,itemVisibleInCallback:null,itemVisibleOutCallback:null,animationStepCallback:null,buttonNextHTML:"<div></div>",buttonPrevHTML:"<div></div>",buttonNextEvent:"click",buttonPrevEvent:"click", buttonNextCallback:null,buttonPrevCallback:null,itemFallbackDimension:null},m=!1;g(window).bind("load.jcarousel",function(){m=!0});g.jcarousel=function(a,c){this.options=g.extend({},q,c||{});this.autoStopped=this.locked=!1;this.buttonPrevState=this.buttonNextState=this.buttonPrev=this.buttonNext=this.list=this.clip=this.container=null;if(!c||c.rtl===void 0)this.options.rtl=(g(a).attr("dir")||g("html").attr("dir")||"").toLowerCase()=="rtl";this.wh=!this.options.vertical?"width":"height";this.lt=!this.options.vertical? this.options.rtl?"right":"left":"top";for(var b="",d=a.className.split(" "),f=0;f<d.length;f++)if(d[f].indexOf("jcarousel-skin")!=-1){g(a).removeClass(d[f]);b=d[f];break}a.nodeName.toUpperCase()=="UL"||a.nodeName.toUpperCase()=="OL"?(this.list=g(a),this.clip=this.list.parents(".jcarousel-clip"),this.container=this.list.parents(".jcarousel-container")):(this.container=g(a),this.list=this.container.find("ul,ol").eq(0),this.clip=this.container.find(".jcarousel-clip"));if(this.clip.size()===0)this.clip= this.list.wrap("<div></div>").parent();if(this.container.size()===0)this.container=this.clip.wrap("<div></div>").parent();b!==""&&this.container.parent()[0].className.indexOf("jcarousel-skin")==-1&&this.container.wrap('<div class=" '+b+'"></div>');this.buttonPrev=g(".jcarousel-prev",this.container);if(this.buttonPrev.size()===0&&this.options.buttonPrevHTML!==null)this.buttonPrev=g(this.options.buttonPrevHTML).appendTo(this.container);this.buttonPrev.addClass(this.className("jcarousel-prev"));this.buttonNext= g(".jcarousel-next",this.container);if(this.buttonNext.size()===0&&this.options.buttonNextHTML!==null)this.buttonNext=g(this.options.buttonNextHTML).appendTo(this.container);this.buttonNext.addClass(this.className("jcarousel-next"));this.clip.addClass(this.className("jcarousel-clip")).css({position:"relative"});this.list.addClass(this.className("jcarousel-list")).css({overflow:"hidden",position:"relative",top:0,margin:0,padding:0}).css(this.options.rtl?"right":"left",0);this.container.addClass(this.className("jcarousel-container")).css({position:"relative"}); !this.options.vertical&&this.options.rtl&&this.container.addClass("jcarousel-direction-rtl").attr("dir","rtl");var j=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible):null,b=this.list.children("li"),e=this;if(b.size()>0){var h=0,i=this.options.offset;b.each(function(){e.format(this,i++);h+=e.dimension(this,j)});this.list.css(this.wh,h+100+"px");if(!c||c.size===void 0)this.options.size=b.size()}this.container.css("display","block");this.buttonNext.css("display","block");this.buttonPrev.css("display", "block");this.funcNext=function(){e.next()};this.funcPrev=function(){e.prev()};this.funcResize=function(){e.resizeTimer&&clearTimeout(e.resizeTimer);e.resizeTimer=setTimeout(function(){e.reload()},100)};this.options.initCallback!==null&&this.options.initCallback(this,"init");!m&&g.browser.safari?(this.buttons(!1,!1),g(window).bind("load.jcarousel",function(){e.setup()})):this.setup()};var f=g.jcarousel;f.fn=f.prototype={jcarousel:"0.2.8"};f.fn.extend=f.extend=g.extend;f.fn.extend({setup:function(){this.prevLast= this.prevFirst=this.last=this.first=null;this.animating=!1;this.tail=this.resizeTimer=this.timer=null;this.inTail=!1;if(!this.locked){this.list.css(this.lt,this.pos(this.options.offset)+"px");var a=this.pos(this.options.start,!0);this.prevFirst=this.prevLast=null;this.animate(a,!1);g(window).unbind("resize.jcarousel",this.funcResize).bind("resize.jcarousel",this.funcResize);this.options.setupCallback!==null&&this.options.setupCallback(this)}},reset:function(){this.list.empty();this.list.css(this.lt, "0px");this.list.css(this.wh,"10px");this.options.initCallback!==null&&this.options.initCallback(this,"reset");this.setup()},reload:function(){this.tail!==null&&this.inTail&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+this.tail);this.tail=null;this.inTail=!1;this.options.reloadCallback!==null&&this.options.reloadCallback(this);if(this.options.visible!==null){var a=this,c=Math.ceil(this.clipping()/this.options.visible),b=0,d=0;this.list.children("li").each(function(f){b+=a.dimension(this, c);f+1<a.first&&(d=b)});this.list.css(this.wh,b+"px");this.list.css(this.lt,-d+"px")}this.scroll(this.first,!1)},lock:function(){this.locked=!0;this.buttons()},unlock:function(){this.locked=!1;this.buttons()},size:function(a){if(a!==void 0)this.options.size=a,this.locked||this.buttons();return this.options.size},has:function(a,c){if(c===void 0||!c)c=a;if(this.options.size!==null&&c>this.options.size)c=this.options.size;for(var b=a;b<=c;b++){var d=this.get(b);if(!d.length||d.hasClass("jcarousel-item-placeholder"))return!1}return!0}, get:function(a){return g(">.jcarousel-item-"+a,this.list)},add:function(a,c){var b=this.get(a),d=0,p=g(c);if(b.length===0)for(var j,e=f.intval(a),b=this.create(a);;){if(j=this.get(--e),e<=0||j.length){e<=0?this.list.prepend(b):j.after(b);break}}else d=this.dimension(b);p.get(0).nodeName.toUpperCase()=="LI"?(b.replaceWith(p),b=p):b.empty().append(c);this.format(b.removeClass(this.className("jcarousel-item-placeholder")),a);p=this.options.visible!==null?Math.ceil(this.clipping()/this.options.visible): null;d=this.dimension(b,p)-d;a>0&&a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))-d+"px");this.list.css(this.wh,f.intval(this.list.css(this.wh))+d+"px");return b},remove:function(a){var c=this.get(a);if(c.length&&!(a>=this.first&&a<=this.last)){var b=this.dimension(c);a<this.first&&this.list.css(this.lt,f.intval(this.list.css(this.lt))+b+"px");c.remove();this.list.css(this.wh,f.intval(this.list.css(this.wh))-b+"px")}},next:function(){this.tail!==null&&!this.inTail?this.scrollTail(!1): this.scroll((this.options.wrap=="both"||this.options.wrap=="last")&&this.options.size!==null&&this.last==this.options.size?1:this.first+this.options.scroll)},prev:function(){this.tail!==null&&this.inTail?this.scrollTail(!0):this.scroll((this.options.wrap=="both"||this.options.wrap=="first")&&this.options.size!==null&&this.first==1?this.options.size:this.first-this.options.scroll)},scrollTail:function(a){if(!this.locked&&!this.animating&&this.tail){this.pauseAuto();var c=f.intval(this.list.css(this.lt)), c=!a?c-this.tail:c+this.tail;this.inTail=!a;this.prevFirst=this.first;this.prevLast=this.last;this.animate(c)}},scroll:function(a,c){!this.locked&&!this.animating&&(this.pauseAuto(),this.animate(this.pos(a),c))},pos:function(a,c){var b=f.intval(this.list.css(this.lt));if(this.locked||this.animating)return b;this.options.wrap!="circular"&&(a=a<1?1:this.options.size&&a>this.options.size?this.options.size:a);for(var d=this.first>a,g=this.options.wrap!="circular"&&this.first<=1?1:this.first,j=d?this.get(g): this.get(this.last),e=d?g:g-1,h=null,i=0,k=!1,l=0;d?--e>=a:++e<a;){h=this.get(e);k=!h.length;if(h.length===0&&(h=this.create(e).addClass(this.className("jcarousel-item-placeholder")),j[d?"before":"after"](h),this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size)))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)));j=h;l=this.dimension(h);k&&(i+=l);if(this.first!==null&&(this.options.wrap=="circular"||e>=1&&(this.options.size===null||e<= this.options.size)))b=d?b+l:b-l}for(var g=this.clipping(),m=[],o=0,n=0,j=this.get(a-1),e=a;++o;){h=this.get(e);k=!h.length;if(h.length===0){h=this.create(e).addClass(this.className("jcarousel-item-placeholder"));if(j.length===0)this.list.prepend(h);else j[d?"before":"after"](h);if(this.first!==null&&this.options.wrap=="circular"&&this.options.size!==null&&(e<=0||e>this.options.size))j=this.get(this.index(e)),j.length&&(h=this.add(e,j.clone(!0)))}j=h;l=this.dimension(h);if(l===0)throw Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting..."); this.options.wrap!="circular"&&this.options.size!==null&&e>this.options.size?m.push(h):k&&(i+=l);n+=l;if(n>=g)break;e++}for(h=0;h<m.length;h++)m[h].remove();i>0&&(this.list.css(this.wh,this.dimension(this.list)+i+"px"),d&&(b-=i,this.list.css(this.lt,f.intval(this.list.css(this.lt))-i+"px")));i=a+o-1;if(this.options.wrap!="circular"&&this.options.size&&i>this.options.size)i=this.options.size;if(e>i){o=0;e=i;for(n=0;++o;){h=this.get(e--);if(!h.length)break;n+=this.dimension(h);if(n>=g)break}}e=i-o+ 1;this.options.wrap!="circular"&&e<1&&(e=1);if(this.inTail&&d)b+=this.tail,this.inTail=!1;this.tail=null;if(this.options.wrap!="circular"&&i==this.options.size&&i-o+1>=1&&(d=f.intval(this.get(i).css(!this.options.vertical?"marginRight":"marginBottom")),n-d>g))this.tail=n-g-d;if(c&&a===this.options.size&&this.tail)b-=this.tail,this.inTail=!0;for(;a-- >e;)b+=this.dimension(this.get(a));this.prevFirst=this.first;this.prevLast=this.last;this.first=e;this.last=i;return b},animate:function(a,c){if(!this.locked&& !this.animating){this.animating=!0;var b=this,d=function(){b.animating=!1;a===0&&b.list.css(b.lt,0);!b.autoStopped&&(b.options.wrap=="circular"||b.options.wrap=="both"||b.options.wrap=="last"||b.options.size===null||b.last<b.options.size||b.last==b.options.size&&b.tail!==null&&!b.inTail)&&b.startAuto();b.buttons();b.notify("onAfterAnimation");if(b.options.wrap=="circular"&&b.options.size!==null)for(var c=b.prevFirst;c<=b.prevLast;c++)c!==null&&!(c>=b.first&&c<=b.last)&&(c<1||c>b.options.size)&&b.remove(c)}; this.notify("onBeforeAnimation");if(!this.options.animation||c===!1)this.list.css(this.lt,a+"px"),d();else{var f=!this.options.vertical?this.options.rtl?{right:a}:{left:a}:{top:a},d={duration:this.options.animation,easing:this.options.easing,complete:d};if(g.isFunction(this.options.animationStepCallback))d.step=this.options.animationStepCallback;this.list.animate(f,d)}}},startAuto:function(a){if(a!==void 0)this.options.auto=a;if(this.options.auto===0)return this.stopAuto();if(this.timer===null){this.autoStopped= !1;var c=this;this.timer=window.setTimeout(function(){c.next()},this.options.auto*1E3)}},stopAuto:function(){this.pauseAuto();this.autoStopped=!0},pauseAuto:function(){if(this.timer!==null)window.clearTimeout(this.timer),this.timer=null},buttons:function(a,c){if(a==null&&(a=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="first"||this.options.size===null||this.last<this.options.size),!this.locked&&(!this.options.wrap||this.options.wrap=="first")&&this.options.size!==null&& this.last>=this.options.size))a=this.tail!==null&&!this.inTail;if(c==null&&(c=!this.locked&&this.options.size!==0&&(this.options.wrap&&this.options.wrap!="last"||this.first>1),!this.locked&&(!this.options.wrap||this.options.wrap=="last")&&this.options.size!==null&&this.first==1))c=this.tail!==null&&this.inTail;var b=this;this.buttonNext.size()>0?(this.buttonNext.unbind(this.options.buttonNextEvent+".jcarousel",this.funcNext),a&&this.buttonNext.bind(this.options.buttonNextEvent+".jcarousel",this.funcNext), this.buttonNext[a?"removeClass":"addClass"](this.className("jcarousel-next-disabled")).attr("disabled",a?!1:!0),this.options.buttonNextCallback!==null&&this.buttonNext.data("jcarouselstate")!=a&&this.buttonNext.each(function(){b.options.buttonNextCallback(b,this,a)}).data("jcarouselstate",a)):this.options.buttonNextCallback!==null&&this.buttonNextState!=a&&this.options.buttonNextCallback(b,null,a);this.buttonPrev.size()>0?(this.buttonPrev.unbind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev), c&&this.buttonPrev.bind(this.options.buttonPrevEvent+".jcarousel",this.funcPrev),this.buttonPrev[c?"removeClass":"addClass"](this.className("jcarousel-prev-disabled")).attr("disabled",c?!1:!0),this.options.buttonPrevCallback!==null&&this.buttonPrev.data("jcarouselstate")!=c&&this.buttonPrev.each(function(){b.options.buttonPrevCallback(b,this,c)}).data("jcarouselstate",c)):this.options.buttonPrevCallback!==null&&this.buttonPrevState!=c&&this.options.buttonPrevCallback(b,null,c);this.buttonNextState= a;this.buttonPrevState=c},notify:function(a){var c=this.prevFirst===null?"init":this.prevFirst<this.first?"next":"prev";this.callback("itemLoadCallback",a,c);this.prevFirst!==this.first&&(this.callback("itemFirstInCallback",a,c,this.first),this.callback("itemFirstOutCallback",a,c,this.prevFirst));this.prevLast!==this.last&&(this.callback("itemLastInCallback",a,c,this.last),this.callback("itemLastOutCallback",a,c,this.prevLast));this.callback("itemVisibleInCallback",a,c,this.first,this.last,this.prevFirst, this.prevLast);this.callback("itemVisibleOutCallback",a,c,this.prevFirst,this.prevLast,this.first,this.last)},callback:function(a,c,b,d,f,j,e){if(!(this.options[a]==null||typeof this.options[a]!="object"&&c!="onAfterAnimation")){var h=typeof this.options[a]=="object"?this.options[a][c]:this.options[a];if(g.isFunction(h)){var i=this;if(d===void 0)h(i,b,c);else if(f===void 0)this.get(d).each(function(){h(i,this,d,b,c)});else for(var a=function(a){i.get(a).each(function(){h(i,this,a,b,c)})},k=d;k<=f;k++)k!== null&&!(k>=j&&k<=e)&&a(k)}}},create:function(a){return this.format("<li></li>",a)},format:function(a,c){for(var a=g(a),b=a.get(0).className.split(" "),d=0;d<b.length;d++)b[d].indexOf("jcarousel-")!=-1&&a.removeClass(b[d]);a.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-"+c)).css({"float":this.options.rtl?"right":"left","list-style":"none"}).attr("jcarouselindex",c);return a},className:function(a){return a+" "+a+(!this.options.vertical?"-horizontal":"-vertical")}, dimension:function(a,c){var b=g(a);if(c==null)return!this.options.vertical?b.outerWidth(!0)||f.intval(this.options.itemFallbackDimension):b.outerHeight(!0)||f.intval(this.options.itemFallbackDimension);else{var d=!this.options.vertical?c-f.intval(b.css("marginLeft"))-f.intval(b.css("marginRight")):c-f.intval(b.css("marginTop"))-f.intval(b.css("marginBottom"));g(b).css(this.wh,d+"px");return this.dimension(b)}},clipping:function(){return!this.options.vertical?this.clip[0].offsetWidth-f.intval(this.clip.css("borderLeftWidth"))- f.intval(this.clip.css("borderRightWidth")):this.clip[0].offsetHeight-f.intval(this.clip.css("borderTopWidth"))-f.intval(this.clip.css("borderBottomWidth"))},index:function(a,c){if(c==null)c=this.options.size;return Math.round(((a-1)/c-Math.floor((a-1)/c))*c)+1}});f.extend({defaults:function(a){return g.extend(q,a||{})},intval:function(a){a=parseInt(a,10);return isNaN(a)?0:a},windowLoaded:function(){m=!0}});g.fn.jcarousel=function(a){if(typeof a=="string"){var c=g(this).data("jcarousel"),b=Array.prototype.slice.call(arguments, 1);return c[a].apply(c,b)}else return this.each(function(){var b=g(this).data("jcarousel");b?(a&&g.extend(b.options,a),b.reload()):g(this).data("jcarousel",new f(this,a))})}})(jQuery);
// Personalize 
var BREI=BREI||{};BREI.Personalization={config:{recentPagesLength:20,recentSearchesLength:20,favoritesLength:-1,trackCurrentPage:true,pagesKey:"BREI.RECENTP",searchesKey:"BREI.RECENTS",favoritesKey:"BREI.FAV",subjRem:""},init:function(a){var b=this.pushToRecentPages,c=window.location.href,d=document.title;if(typeof a!="undefined"){this.config=$.extend(this.config,a)}if(this.config.subjRem!=""){var e=new RegExp(this.config.subjRem);d=d.replace(e,"")}if(this.config.trackCurrentPage){b.call(this,c,d)}},gp:function(a,b,c,d){var e=b,f=e.length,g=0,h=false;if(e[0]!=null){for(;g<f;g+=1){if(e[g].url===a.url){h=true;break}}}if(!h){e.push(a)}if(c!=-1&&f+1>c){e.shift(1)}d.call(this,e)},gps:function(a,b,c,d){var e=b,f=e.length,g=0,h=false;if(e[0]==""){f=0}for(;g<f;g+=1){if(e[g]===a){h=true;break}}if(!h){e.push(a)}if(c!=-1&&f+1>c){e.shift(1)}d.call(this,e)},has:function(a){var b=this.getFavorites(),c=b.length,d=0,e=false;if(b[0]!=null){for(;d<c;d+=1){if(b[d].url===a){e=true}}}return e},pushToRecentPages:function(a,b){if(this.config.subjRem!=""){var c=new RegExp(this.config.subjRem);b=b.replace(c,"")}pitem={url:a,sub:b};this.gp(pitem,this.getRecentPages(),this.config.recentPagesLength,this.setRecentPages)},getRecentPages:function(){return amplify.store(this.config.pagesKey)||[]},setRecentPages:function(a){amplify.store(this.config.pagesKey,a)},pushToRecentSearches:function(a){this.gps(a,this.getRecentSearches(),this.config.recentSearchesLength,this.setRecentSearches)},getRecentSearches:function(){return amplify.store(this.config.searchesKey)||[]},setRecentSearches:function(a){amplify.store(this.config.searchesKey,a)},pushToFavorites:function(a,b){if(this.config.subjRem!=""){var c=new RegExp(this.config.subjRem);b=b.replace(c,"")}pitem={url:a,sub:b};this.gp(pitem,this.getFavorites(),this.config.favoritesLength,this.setFavorites)},removeFavorite:function(a){var b=this.getFavorites(),c=-1,d=b.length,e=0;for(;e<d;e+=1){if(a===b[e].url){c=e;break}}if(c!=-1){b.splice(e,e+1);this.setFavorites(b)}},getFavorites:function(){return amplify.store(this.config.favoritesKey)||[]},setFavorites:function(a){amplify.store(this.config.favoritesKey,a)}};
/*! Respond.js: min/max-width media query polyfill. (c) Scott Jehl. MIT Lic. j.mp/respondjs  */

(function (win, mqSupported) {
  //exposed namespace
  win.respond = {};

  //define update even in native-mq-supporting browsers, to avoid errors
  respond.update = function () { };

  //expose media query support flag for external use
  respond.mediaQueriesSupported = mqSupported;

  //if media queries are supported, exit here
  if (mqSupported) { return; }

  //define vars
  var doc = win.document,
        docElem = doc.documentElement,
        mediastyles = [],
        rules = [],
        currentIds = "",
        appendedEls = [],
        parsedSheets = {},
        resizeThrottle = 30,
        head = doc.getElementsByTagName("head")[0] || docElem,
        links = head.getElementsByTagName("link"),
        requestQueue = [],

  //loop stylesheets, send text content to translate
        ripCSS = function () {
            var sheets = links,
                sl = sheets.length,
                i = 0,
            //vars for loop:
                sheet, href, media, isCSS;

            for (; i < sl; i++) {
                sheet = sheets[i],
                href = sheet.href,
                media = sheet.media,
                isCSS = sheet.rel && sheet.rel.toLowerCase() === "stylesheet";

                //only links plz and prevent re-parsing
                if (!!href && isCSS && !parsedSheets[href]) {
                    if (!/^([a-zA-Z]+?:(\/\/)?)/.test(href)
                        || href.replace(RegExp.$1, "").split("/")[0] === win.location.host) {
                        requestQueue.push({
                            href: href,
                            media: media
                        });
                    }
                    else {
                        parsedSheets[href] = true;
                    }
                }
            }
            makeRequests();

        },

  //recurse through request queue, get css text
        makeRequests = function () {
            if (requestQueue.length) {
                var thisRequest = requestQueue.shift();

                ajax(thisRequest.href, function (styles) {
                    translate(styles, thisRequest.href, thisRequest.media);
                    parsedSheets[thisRequest.href] = true;
                    makeRequests();
                });
            }
        },

  //find media blocks in css text, convert to style blocks
        translate = function (styles, href, media) {
            var qs = styles.match(/@media[^\{]+\{([^\{\}]+\{[^\}\{]+\})+/gi),
                ql = qs && qs.length || 0,
            //try to get CSS path
                href = href.substring(0, href.lastIndexOf("/")),
                repUrls = function (css) {
                    return css.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g, "$1" + href + "$2$3");
                },
                useMedia = !ql && media,
            //vars used in loop
                i = 0,
                j, fullq, thisq, eachq, eql;

            //if path exists, tack on trailing slash
            if (href.length) { href += "/"; }

            //if no internal queries exist, but media attr does, use that   
            //note: this currently lacks support for situations where a media attr is specified on a link AND
            //its associated stylesheet has internal CSS media queries.
            //In those cases, the media attribute will currently be ignored.
            if (useMedia) {
                ql = 1;
            }


            for (; i < ql; i++) {
                j = 0;

                //media attr
                if (useMedia) {
                    fullq = media;
                    rules.push(repUrls(styles));
                }
                //parse for styles
                else {
                    fullq = qs[i].match(/@media ([^\{]+)\{([\S\s]+?)$/) && RegExp.$1;
                    rules.push(RegExp.$2 && repUrls(RegExp.$2));
                }

                eachq = fullq.split(",");
                eql = eachq.length;


                for (; j < eql; j++) {
                    thisq = eachq[j];
                    mediastyles.push({
                        media: thisq.match(/(only\s+)?([a-zA-Z]+)(\sand)?/) && RegExp.$2,
                        rules: rules.length - 1,
                        minw: thisq.match(/\(min\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) && parseFloat(RegExp.$1),
                        maxw: thisq.match(/\(max\-width:[\s]*([\s]*[0-9]+)px[\s]*\)/) && parseFloat(RegExp.$1)
                    });
                }
            }

            applyMedia();
        },

        lastCall,

        resizeDefer,

  //enable/disable styles
        applyMedia = function (fromResize) {
            var name = "clientWidth",
                docElemProp = docElem[name],
                currWidth = doc.compatMode === "CSS1Compat" && docElemProp || doc.body[name] || docElemProp,
                styleBlocks = {},
                lastLink = links[links.length - 1],
                now = (new Date()).getTime(),
                newIds = [];

            //throttle resize calls 
            if (fromResize && lastCall && now - lastCall < resizeThrottle) {
                clearTimeout(resizeDefer);
                resizeDefer = setTimeout(applyMedia, resizeThrottle);
                return;
            }
            else {
                lastCall = now;
            }

            for (var i = 0; i < mediastyles.length; i++) {
                var thisstyle = mediastyles[i];
                if (!thisstyle.minw && !thisstyle.maxw ||
                    (!thisstyle.minw || thisstyle.minw && currWidth >= thisstyle.minw) &&
                    (!thisstyle.maxw || thisstyle.maxw && currWidth <= thisstyle.maxw)) {
                    if (!styleBlocks[thisstyle.media]) {
                        styleBlocks[thisstyle.media] = [];
                    }
                    newIds.push(i);
                    styleBlocks[thisstyle.media].push(rules[thisstyle.rules]);
                }
            }

            //skip if nothing has changed
            newIds = newIds.join("-");
            if (newIds === currentIds) {
                return;
            }
            else {
                currentIds = newIds;
            }

            //remove any existing respond style element(s)
            for (var i in appendedEls) {
                if (appendedEls[i] && appendedEls[i].parentNode === head) {
                    head.removeChild(appendedEls[i]);
                }
            }

            //inject active styles, grouped by media type
            for (var i in styleBlocks) {
                var ss = doc.createElement("style"),
                    css = styleBlocks[i].join("\n");

                ss.type = "text/css";
                ss.media = i;

                //append to DOM first for IE7
                head.insertBefore(ss, lastLink.nextSibling);

                if (ss.styleSheet) {
                    ss.styleSheet.cssText = css;
                }
                else {
                    ss.appendChild(doc.createTextNode(css));
                }
                appendedEls.push(ss);
            }
        },
  //tweaked Ajax functions from Quirksmode
        ajax = function (url, callback) {
            var req = xmlHttp();
            if (!req) {
                return;
            }
            req.open("GET", url, true);
            req.onreadystatechange = function () {
                if (req.readyState != 4 || req.status != 200 && req.status != 304) {
                    return;
                }
                callback(req.responseText);
            }
            if (req.readyState == 4) {
                return;
            }
            req.send(null);
        },
  //define ajax obj 
        xmlHttp = (function () {
            var xmlhttpmethod = false,
                attempts = [
                    function () { return new XMLHttpRequest() },
                    function () { return new ActiveXObject("Microsoft.XMLHTTP") }
                ],
                al = attempts.length;

            while (al--) {
                try {
                    xmlhttpmethod = attempts[al]();
                }
                catch (e) {
                    continue;
                }
                break;
            }
            return function () {
                return xmlhttpmethod;
            };
        })();

  //translate CSS
  ripCSS();

  //expose update for re-running respond later on
  respond.update = ripCSS;

  //adjust on resize
  function callMedia() {
      applyMedia(true);
  }
  if (win.addEventListener) {
      win.addEventListener("resize", callMedia, false);
  }
  else if (win.attachEvent) {
      win.attachEvent("onresize", callMedia);
  }
})(
    this,
    (function (win) {

        //for speed, flag browsers with window.matchMedia support and IE 9 as supported
        if (win.matchMedia) { return true; }

        var bool,
            doc = document,
            docElem = doc.documentElement,
            refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
            fakeUsed = !doc.body,
            fakeBody = doc.body || doc.createElement("body"),
            div = doc.createElement("div"),
            q = "only all";

        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-99em";
        fakeBody.appendChild(div);

        div.innerHTML = '_<style media="' + q + '"> #mq-test-1 { width: 9px; }</style>';
        if (fakeUsed) {
            docElem.insertBefore(fakeBody, refNode);
        }
        div.removeChild(div.firstChild);
        bool = div.offsetWidth == 9;
        if (fakeUsed) {
            docElem.removeChild(fakeBody);
        }
        else {
            fakeBody.removeChild(div);
        }
        return bool;
    })(this)
); 
// Super pager
(function(a){a.fn.superPager=function(b){b=a.extend({},a.fn.superPager.defaults,b);pageSize=b.pageSize;topPaging=b.topPaging;bottomPaging=b.bottomPaging;nextText=b.nextText;prevText=b.prevText;pageStatus=b.pageStatus;statusLocation=b.statusLocation;showAll=b.showAll;truncate=b.truncate;if(f<=5){truncate=false}var c=a(this);var d=c.selector;c.data("pager",c);var e=a(this).children("ul").children("li").length;var f=Math.ceil(e/pageSize);var g=1;var h=[];if(e>pageSize){a(this).children("ul").addClass("result-holder");a(this).children("ul").children("li").removeClass("even odd");for(var i=1;i<=e;i++){if(i==1){a(this).children("ul").children("li:first").addClass("result").addClass("page1").attr("id","result1")}else{pageChecker=Math.ceil(i/pageSize);a(this).children("ul").children("li:eq("+(i-1)+")").addClass("result").addClass("page"+pageChecker).attr("id","result"+i)}}for(var i=1;i<=f;i++){a(".page"+i,c).wrapAll('<li id="page'+i+'" class="pagingListItem"><ul id="page'+i+'List" class="pageList"></ul></li>');var j=a("#page"+i+"List li",c).length;for(var k=1;k<=j;k++){if(k==1){a("#page"+i+"List li:first",c).addClass("odd")}else{if(k%2==0){a("#page"+i+"List li:eq("+(k-1)+")",c).addClass("even")}else{a("#page"+i+"List li:eq("+(k-1)+")",c).addClass("odd")}}}}var l='<div class="leftSide"><span id="resultStart">'+1+'</span> - <span id="resultEnd">'+pageSize+"</span> of "+e+".</div>";var m='<div class="rightSide"><a href="#" class="prev">'+prevText+"</a></div>";var n=a('<div id="topPaging" class="paging"></div>');var o=a('<div id="bottomPaging" class="paging"></div>');if(topPaging){var p=m;if(pageStatus&&statusLocation=="top"){p+=l}n.append(p);a(this).prepend(n)}if(bottomPaging){var p=m;if(pageStatus&&statusLocation=="bottom"){p+=l}o.append(p);a(this).append(o)}if(showAll){a("#topPaging .leftSide, #bottomPaging .leftSide",c).append('<span><a href="javascript:;" class="showAllItems">Show All</a></span>')}for(var i=1;i<=f;i++){h[i]=i}a("#tPager1, #bPager1, #top_fEllip, #bot_fEllip",c).css("display","none");a(".prev",c).css("visibility","hidden");a("#tInd1, #bInd1",c).css("display","inline");a('#bottomPaging span[id^="bInd"]',c).each(function(b){if(b!=0){a(this).hide()}});a('#topPaging span[id^="tInd"]',c).each(function(b){if(b!=0){a(this).hide()}});a(".paging .rightSide",c).append('<a href="#" class="next">'+nextText+"</a>");a(".pagingListItem",c).css("display","none");a("#page"+g,c).css("display","block");if(truncate){for(key in h){if(key>2&&key<f-1){a("#tPager"+key+",#tInd"+key+",#bPager"+key+",#bInd",c).css("display","none")}}}}a(".prev, .next",a(c.selector)).bind("click",function(b){b.stopPropagation();if(a(this).attr("class").indexOf("prev")!=-1){g=g-1}else if(a(this).attr("class").indexOf("next")!=-1){g=g+1}else{g=parseInt(a(this).text())}a(".pagingListItem",a(c)).css("display","none");a("#page"+g,a(c)).css("display","block");a("#currentPage",a(c)).text(g);a("#resultStart",a(c)).text(g*pageSize-(pageSize-1));if(g==f){a("#resultEnd",a(c)).text(e)}else{a("#resultEnd",a(c)).text(g*pageSize)}if(g==f){a(".next",a(c)).css("visibility","hidden");a(".prev",a(c)).css("visibility","visible")}else if(g==1){a(".next",a(c)).css("visibility","visible");a(".prev",a(c)).css("visibility","hidden")}else{a(".next",a(c)).css("visibility","visible");a(".prev",a(c)).css("visibility","visible")}if(!truncate){a(".tInd, .bInd",a(c)).hide();a(".pager",a(c)).css("display","inline");a("#tPager"+g+", #bPager"+g,a(c)).css("display","none");a("#tInd"+g+", #bInd"+g,a(c)).css("display","inline")}else{a("#top_fEllip, #bot_fEllip, #top_lEllip, #bot_lEllip, .pager, .tInd, .bInd",a(c)).css("display","none");if(g>3){a("#top_fEllip, #bot_fEllip",a(c)).css("display","inline")}if(g<f-2){a("#top_lEllip, #bot_lEllip",a(c)).css("display","inline")}for(var d=1;d<=f;d+=1){if(d==g||d==g-1||d==g+1||d<=1||d>=f-1){a("#bPager"+d+", #tPager"+d+"",a(c)).css("display","inline")}}a("#tPager"+g+", #bPager"+g,a(c)).css("display","none");a("#tInd"+g+", #bInd"+g,a(c)).css("display","inline")}return false});a(".showAllItems",c).bind("click",function(){a(".result",c).each(function(b){a(this).appendTo(a(".result-holder"))});a("#bottomPaging, #topPaging, .pagingListItem",c).remove()})};a.fn.superPager.defaults={pageSize:25,topPaging:true,bottomPaging:true,nextText:"next",prevText:"previous",pageStatus:true,statusLocation:"bottom",showAll:false,truncate:false}})(jQuery)
;
/*  SWFObject v2.2 <http://code.google.com/p/swfobject/> 
    is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 * 
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */

(function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);
(function(d){function l(e,b,c,f){function a(a){a.timeout&&(g.cycleTimeout=setTimeout(function(){l(e,a,0,!a.rev)},a.timeout))}if(!b.busy){var g=e[0].parentNode,h=e[b.currSlide],k=e[b.nextSlide];if(0!==g.cycleTimeout||c)c||!g.cyclePause?(b.before.length&&d.each(b.before,function(a,c){c.apply(k,[h,k,b,f])}),b.nextSlide!=b.currSlide&&(b.busy=1,d.fn.cycle.custom(h,k,b,function(){m&&this.style.removeAttribute("filter");d.each(b.after,function(a,c){c.apply(k,[h,k,b,f])});a(b)})),c=b.nextSlide+1==e.length,
b.nextSlide=c?0:b.nextSlide+1,b.currSlide=c?e.length-1:b.nextSlide-1):a(b)}}function n(d,b,c){var f=d[0].parentNode,a=f.cycleTimeout;a&&(clearTimeout(a),f.cycleTimeout=0);b.nextSlide=b.currSlide+c;0>b.nextSlide?b.nextSlide=d.length-1:b.nextSlide>=d.length&&(b.nextSlide=0);l(d,b,1,0<=c);return!1}var m=/MSIE/.test(navigator.userAgent);d.fn.cycle=function(e){return this.each(function(){e=e||{};this.cycleTimeout&&clearTimeout(this.cycleTimeout);this.cyclePause=this.cycleTimeout=0;var b=d(this),c=e.slideExpr?
d(e.slideExpr,this):b.children(),f=c.get();if(2>f.length)window.console&&console.log("terminating; too few slides: "+f.length);else{var a=d.extend({},d.fn.cycle.defaults,e||{},d.metadata?b.metadata():d.meta?b.data():{}),g=d.isFunction(b.data)?b.data(a.metaAttr):null;g&&(a=d.extend(a,g));a.before=a.before?[a.before]:[];a.after=a.after?[a.after]:[];a.after.unshift(function(){a.busy=0});g=this.className;a.width=parseInt((g.match(/w:(\d+)/)||[])[1],10)||a.width;a.height=parseInt((g.match(/h:(\d+)/)||
[])[1],10)||a.height;a.timeout=parseInt((g.match(/t:(\d+)/)||[])[1],10)||a.timeout;"static"==b.css("position")&&b.css("position","relative");a.width&&b.width(a.width);a.height&&"auto"!=a.height&&b.height(a.height);c.css({position:"absolute",top:0}).each(function(a){d(this).css("z-index",f.length-a)});d(f[0]).css("opacity",1).show();m&&f[0].style.removeAttribute("filter");a.fit&&a.width&&c.width(a.width);a.fit&&a.height&&"auto"!=a.height&&c.height(a.height);a.pause&&b.hover(function(){this.cyclePause=
1},function(){this.cyclePause=0});(g=d.fn.cycle.transitions[a.fx])&&g(b,c,a);c.each(function(){var b=d(this);this.cycleH=a.fit&&a.height?a.height:b.height();this.cycleW=a.fit&&a.width?a.width:b.width()});a.cssFirst&&d(c[0]).css(a.cssFirst);if(a.timeout)for(a.speed.constructor==String&&(a.speed={slow:600,fast:200}[a.speed]||400),a.sync||(a.speed/=2);250>a.timeout-a.speed;)a.timeout+=a.speed;a.speedIn=a.speed;a.speedOut=a.speed;a.slideCount=f.length;a.currSlide=0;a.nextSlide=1;b=c[0];a.before.length&&
a.before[0].apply(b,[b,b,a,!0]);1<a.after.length&&a.after[1].apply(b,[b,b,a,!0]);a.click&&!a.next&&(a.next=a.click);a.next&&d(a.next).unbind("click.cycle").bind("click.cycle",function(){return n(f,a,a.rev?-1:1)});a.prev&&d(a.prev).unbind("click.cycle").bind("click.cycle",function(){return n(f,a,a.rev?1:-1)});a.timeout&&(this.cycleTimeout=setTimeout(function(){l(f,a,0,!a.rev)},a.timeout+(a.delay||0)))}})};d.fn.cycle.custom=function(e,b,c,f){var a=d(e),g=d(b);g.css(c.cssBefore);var h=function(){g.animate(c.animIn,
c.speedIn,c.easeIn,f)};a.animate(c.animOut,c.speedOut,c.easeOut,function(){a.css(c.cssAfter);c.sync||h()});c.sync&&h()};d.fn.cycle.transitions={fade:function(d,b,c){b.not(":eq(0)").hide();c.cssBefore={opacity:0,display:"block"};c.cssAfter={display:"none"};c.animOut={opacity:0};c.animIn={opacity:1}},fadeout:function(e,b,c){c.before.push(function(b,a,c,e){d(b).css("zIndex",c.slideCount+(!0===e?1:0));d(a).css("zIndex",c.slideCount+(!0===e?0:1))});b.not(":eq(0)").hide();c.cssBefore={opacity:1,display:"block",
zIndex:1};c.cssAfter={display:"none",zIndex:0};c.animOut={opacity:0};c.animIn={opacity:1}}};d.fn.cycle.ver=function(){return"Lite-1.7"};d.fn.cycle.defaults={animIn:{},animOut:{},fx:"fade",after:null,before:null,cssBefore:{},cssAfter:{},delay:0,fit:0,height:"auto",metaAttr:"cycle",next:null,pause:!1,prev:null,speed:1E3,slideExpr:null,sync:!0,timeout:4E3}})(jQuery);
/*! Hammer.JS - v1.0.5 - 2013-04-07
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2013 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */


(function(t,e){"use strict";function n(){if(!i.READY){i.event.determineEventTypes();for(var t in i.gestures)i.gestures.hasOwnProperty(t)&&i.detection.register(i.gestures[t]);i.event.onTouch(i.DOCUMENT,i.EVENT_MOVE,i.detection.detect),i.event.onTouch(i.DOCUMENT,i.EVENT_END,i.detection.detect),i.READY=!0}}var i=function(t,e){return new i.Instance(t,e||{})};i.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},i.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,i.HAS_TOUCHEVENTS="ontouchstart"in t,i.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,i.NO_MOUSEEVENTS=i.HAS_TOUCHEVENTS&&navigator.userAgent.match(i.MOBILE_REGEX),i.EVENT_TYPES={},i.DIRECTION_DOWN="down",i.DIRECTION_LEFT="left",i.DIRECTION_UP="up",i.DIRECTION_RIGHT="right",i.POINTER_MOUSE="mouse",i.POINTER_TOUCH="touch",i.POINTER_PEN="pen",i.EVENT_START="start",i.EVENT_MOVE="move",i.EVENT_END="end",i.DOCUMENT=document,i.plugins={},i.READY=!1,i.Instance=function(t,e){var r=this;return n(),this.element=t,this.enabled=!0,this.options=i.utils.extend(i.utils.extend({},i.defaults),e||{}),this.options.stop_browser_behavior&&i.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),i.event.onTouch(t,i.EVENT_START,function(t){r.enabled&&i.detection.startDetect(r,t)}),this},i.Instance.prototype={on:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.addEventListener(n[i],e,!1);return this},off:function(t,e){for(var n=t.split(" "),i=0;n.length>i;i++)this.element.removeEventListener(n[i],e,!1);return this},trigger:function(t,e){var n=i.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var r=this.element;return i.utils.hasParent(e.target,r)&&(r=e.target),r.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var r=null,o=!1,s=!1;i.event={bindDom:function(t,e,n){for(var i=e.split(" "),r=0;i.length>r;r++)t.addEventListener(i[r],n,!1)},onTouch:function(t,e,n){var a=this;this.bindDom(t,i.EVENT_TYPES[e],function(c){var u=c.type.toLowerCase();if(!u.match(/mouse/)||!s){(u.match(/touch/)||u.match(/pointerdown/)||u.match(/mouse/)&&1===c.which)&&(o=!0),u.match(/touch|pointer/)&&(s=!0);var h=0;o&&(i.HAS_POINTEREVENTS&&e!=i.EVENT_END?h=i.PointerEvent.updatePointer(e,c):u.match(/touch/)?h=c.touches.length:s||(h=u.match(/up/)?0:1),h>0&&e==i.EVENT_END?e=i.EVENT_MOVE:h||(e=i.EVENT_END),h||null===r?r=c:c=r,n.call(i.detection,a.collectEventData(t,e,c)),i.HAS_POINTEREVENTS&&e==i.EVENT_END&&(h=i.PointerEvent.updatePointer(e,c))),h||(r=null,o=!1,s=!1,i.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=i.HAS_POINTEREVENTS?i.PointerEvent.getEvents():i.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],i.EVENT_TYPES[i.EVENT_START]=t[0],i.EVENT_TYPES[i.EVENT_MOVE]=t[1],i.EVENT_TYPES[i.EVENT_END]=t[2]},getTouchList:function(t){return i.HAS_POINTEREVENTS?i.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var r=this.getTouchList(n,e),o=i.POINTER_TOUCH;return(n.type.match(/mouse/)||i.PointerEvent.matchType(i.POINTER_MOUSE,n))&&(o=i.POINTER_MOUSE),{center:i.utils.getCenter(r),timeStamp:(new Date).getTime(),target:n.target,touches:r,eventType:e,pointerType:o,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return i.detection.stopDetect()}}}},i.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==i.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[i.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==i.POINTER_MOUSE,n[i.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==i.POINTER_TOUCH,n[i.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==i.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},i.utils={extend:function(t,n,i){for(var r in n)t[r]!==e&&i||(t[r]=n[r]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],i=0,r=t.length;r>i;i++)e.push(t[i].pageX),n.push(t[i].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,i=e.pageX-t.pageX;return 180*Math.atan2(n,i)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),r=Math.abs(t.pageY-e.pageY);return n>=r?t.pageX-e.pageX>0?i.DIRECTION_LEFT:i.DIRECTION_RIGHT:t.pageY-e.pageY>0?i.DIRECTION_UP:i.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,i=e.pageY-t.pageY;return Math.sqrt(n*n+i*i)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==i.DIRECTION_UP||t==i.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,i=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var r=0;i.length>r;r++)for(var o in e)e.hasOwnProperty(o)&&(n=o,i[r]&&(n=i[r]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[o]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},i.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:i.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,r=this.gestures.length;r>n;n++){var o=this.gestures[n];if(!this.stopped&&e[o.name]!==!1&&o.handler.call(o,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==i.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=i.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,r=t.touches.length;r>n;n++)e.touches.push(i.utils.extend({},t.touches[n]))}var o=t.timeStamp-e.timeStamp,s=t.center.pageX-e.center.pageX,a=t.center.pageY-e.center.pageY,c=i.utils.getVelocity(o,s,a);return i.utils.extend(t,{deltaTime:o,deltaX:s,deltaY:a,velocityX:c.x,velocityY:c.y,distance:i.utils.getDistance(e.center,t.center),angle:i.utils.getAngle(e.center,t.center),direction:i.utils.getDirection(e.center,t.center),scale:i.utils.getScale(e.touches,t.touches),rotation:i.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),i.utils.extend(i.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},i.gestures=i.gestures||{},i.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case i.EVENT_START:clearTimeout(this.timer),i.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==i.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case i.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case i.EVENT_END:clearTimeout(this.timer)}}},i.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==i.EVENT_END){var n=i.detection.previous,r=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),r=!0),(!r||e.options.tap_always)&&(i.detection.current.name="tap",e.trigger(i.detection.current.name,t))}}},i.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==i.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},i.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&i.detection.current.name!=this.name)return;i.detection.current.name=this.name,(i.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var r=i.detection.current.lastEvent.direction;t.drag_locked_to_axis&&r!==t.direction&&(t.direction=i.utils.isVertical(r)?0>t.deltaY?i.DIRECTION_UP:i.DIRECTION_DOWN:0>t.deltaX?i.DIRECTION_LEFT:i.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&i.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!i.utils.isVertical(t.direction))&&t.preventDefault();break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(i.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case i.EVENT_START:this.triggered=!1;break;case i.EVENT_MOVE:var r=Math.abs(1-t.scale),o=Math.abs(t.rotation);if(n.options.transform_min_scale>r&&n.options.transform_min_rotation>o)return;i.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),o>n.options.transform_min_rotation&&n.trigger("rotate",t),r>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case i.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},i.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==i.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==i.EVENT_START&&n.trigger(this.name,t),e)}},i.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==i.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=i:(t.Hammer=i,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return i}))})(this),function(t,e){"use strict";t!==e&&(Hammer.event.bindDom=function(n,i,r){t(n).on(i,function(t){var n=t.originalEvent||t;n.pageX===e&&(n.pageX=t.pageX,n.pageY=t.pageY),n.target||(n.target=t.target),n.which===e&&(n.which=n.button),n.preventDefault||(n.preventDefault=t.preventDefault),n.stopPropagation||(n.stopPropagation=t.stopPropagation),r.call(this,n)})},Hammer.Instance.prototype.on=function(e,n){return t(this.element).on(e,n)},Hammer.Instance.prototype.off=function(e,n){return t(this.element).off(e,n)},Hammer.Instance.prototype.trigger=function(e,n){var i=t(this.element);return i.has(n.target).length&&(i=t(n.target)),i.trigger({type:e,gesture:n})},t.fn.hammer=function(e){return this.each(function(){var n=t(this),i=n.data("hammer");i?i&&e&&Hammer.utils.extend(i.options,e):n.data("hammer",new Hammer(this,e||{}))})})}(window.jQuery||window.Zepto);
/* Modernizr 2.0.6 (Custom Build) | MIT & BSD
* Build: http://www.modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-iepp-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-load
*/

; window.Modernizr = function (a, b, c) { function G() { e.input = function (a) { for (var b = 0, c = a.length; b < c; b++) s[a[b]] = a[b] in l; return s } ("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), e.inputtypes = function (a) { for (var d = 0, e, f, h, i = a.length; d < i; d++) l.setAttribute("type", f = a[d]), e = l.type !== "text", e && (l.value = m, l.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(f) && l.style.WebkitAppearance !== c ? (g.appendChild(l), h = b.defaultView, e = h.getComputedStyle && h.getComputedStyle(l, null).WebkitAppearance !== "textfield" && l.offsetHeight !== 0, g.removeChild(l)) : /^(search|tel)$/.test(f) || (/^(url|email)$/.test(f) ? e = l.checkValidity && l.checkValidity() === !1 : /^color$/.test(f) ? (g.appendChild(l), g.offsetWidth, e = l.value != m, g.removeChild(l)) : e = l.value != m)), r[a[d]] = !!e; return r } ("search tel url email datetime date month week time datetime-local number range color".split(" ")) } function E(a, b) { var c = a.charAt(0).toUpperCase() + a.substr(1), d = (a + " " + p.join(c + " ") + c).split(" "); return D(d, b) } function D(a, b) { for (var d in a) if (k[a[d]] !== c) return b == "pfx" ? a[d] : !0; return !1 } function C(a, b) { return !! ~("" + a).indexOf(b) } function B(a, b) { return typeof a === b } function A(a, b) { return z(o.join(a + ";") + (b || "")) } function z(a) { k.cssText = a } var d = "2.0.6", e = {}, f = !0, g = b.documentElement, h = b.head || b.getElementsByTagName("head")[0], i = "modernizr", j = b.createElement(i), k = j.style, l = b.createElement("input"), m = ":)", n = Object.prototype.toString, o = " -webkit- -moz- -o- -ms- -khtml- ".split(" "), p = "Webkit Moz O ms Khtml".split(" "), q = {}, r = {}, s = {}, t = [], u = function (a, c, d, e) { var f, h, j, k = b.createElement("div"); if (parseInt(d, 10)) while (d--) j = b.createElement("div"), j.id = e ? e[d] : i + (d + 1), k.appendChild(j); f = ["&shy;", "<style>", a, "</style>"].join(""), k.id = i, k.innerHTML += f, g.appendChild(k), h = c(k, a), k.parentNode.removeChild(k); return !!h }, v = function () { function d(d, e) { e = e || b.createElement(a[d] || "div"), d = "on" + d; var f = d in e; f || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(d, ""), f = B(e[d], "function"), B(e[d], c) || (e[d] = c), e.removeAttribute(d))), e = null; return f } var a = { select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img" }; return d } (), w, x = {}.hasOwnProperty, y; !B(x, c) && !B(x.call, c) ? y = function (a, b) { return x.call(a, b) } : y = function (a, b) { return b in a && B(a.constructor.prototype[b], c) }; var F = function (a, c) { var d = a.join(""), f = c.length; u(d, function (a, c) { var d = b.styleSheets[b.styleSheets.length - 1], g = d.cssRules && d.cssRules[0] ? d.cssRules[0].cssText : d.cssText || "", h = a.childNodes, i = {}; while (f--) i[h[f].id] = h[f]; e.csstransforms3d = i.csstransforms3d.offsetLeft === 9, e.generatedcontent = i.generatedcontent.offsetHeight >= 1, e.fontface = /src/i.test(g) && g.indexOf(c.split(" ")[0]) === 0 }, f, c) } (['@font-face {font-family:"font";src:url("https://")}', ["@media (", o.join("transform-3d),("), i, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', m, '";visibility:hidden}'].join("")], ["fontface", "csstransforms3d", "generatedcontent"]); q.flexbox = function () { function c(a, b, c, d) { a.style.cssText = o.join(b + ":" + c + ";") + (d || "") } function a(a, b, c, d) { b += ":", a.style.cssText = (b + o.join(c + ";" + b)).slice(0, -b.length) + (d || "") } var d = b.createElement("div"), e = b.createElement("div"); a(d, "display", "box", "width:42px;padding:0;"), c(e, "box-flex", "1", "width:10px;"), d.appendChild(e), g.appendChild(d); var f = e.offsetWidth === 42; d.removeChild(e), g.removeChild(d); return f }, q.canvas = function () { var a = b.createElement("canvas"); return !!a.getContext && !!a.getContext("2d") }, q.canvastext = function () { return !!e.canvas && !!B(b.createElement("canvas").getContext("2d").fillText, "function") }, q.postmessage = function () { return !!a.postMessage }, q.websqldatabase = function () { var b = !!a.openDatabase; return b }, q.indexedDB = function () { for (var b = -1, c = p.length; ++b < c; ) if (a[p[b].toLowerCase() + "IndexedDB"]) return !0; return !!a.indexedDB }, q.hashchange = function () { return v("hashchange", a) && (b.documentMode === c || b.documentMode > 7) }, q.history = function () { return !!a.history && !!history.pushState }, q.draganddrop = function () { return v("dragstart") && v("drop") }, q.websockets = function () { for (var b = -1, c = p.length; ++b < c; ) if (a[p[b] + "WebSocket"]) return !0; return "WebSocket" in a }, q.rgba = function () { z("background-color:rgba(150,255,150,.5)"); return C(k.backgroundColor, "rgba") }, q.hsla = function () { z("background-color:hsla(120,40%,100%,.5)"); return C(k.backgroundColor, "rgba") || C(k.backgroundColor, "hsla") }, q.multiplebgs = function () { z("background:url(https://),url(https://),red url(https://)"); return /(url\s*\(.*?){3}/.test(k.background) }, q.backgroundsize = function () { return E("backgroundSize") }, q.borderimage = function () { return E("borderImage") }, q.borderradius = function () { return E("borderRadius") }, q.boxshadow = function () { return E("boxShadow") }, q.textshadow = function () { return b.createElement("div").style.textShadow === "" }, q.opacity = function () { A("opacity:.55"); return /^0.55$/.test(k.opacity) }, q.cssanimations = function () { return E("animationName") }, q.csscolumns = function () { return E("columnCount") }, q.cssgradients = function () { var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);"; z((a + o.join(b + a) + o.join(c + a)).slice(0, -a.length)); return C(k.backgroundImage, "gradient") }, q.cssreflections = function () { return E("boxReflect") }, q.csstransforms = function () { return !!D(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]) }, q.csstransforms3d = function () { var a = !!D(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]); a && "webkitPerspective" in g.style && (a = e.csstransforms3d); return a }, q.csstransitions = function () { return E("transitionProperty") }, q.fontface = function () { return e.fontface }, q.generatedcontent = function () { return e.generatedcontent }, q.video = function () { var a = b.createElement("video"), c = !1; try { if (c = !!a.canPlayType) { c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"'); var d = 'video/mp4; codecs="avc1.42E01E'; c.h264 = a.canPlayType(d + '"') || a.canPlayType(d + ', mp4a.40.2"'), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"') } } catch (e) { } return c }, q.audio = function () { var a = b.createElement("audio"), c = !1; try { if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"'), c.mp3 = a.canPlayType("audio/mpeg;"), c.wav = a.canPlayType('audio/wav; codecs="1"'), c.m4a = a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;") } catch (d) { } return c }, q.localstorage = function () { try { return !!localStorage.getItem } catch (a) { return !1 } }, q.sessionstorage = function () { try { return !!sessionStorage.getItem } catch (a) { return !1 } }, q.webworkers = function () { return !!a.Worker }, q.applicationcache = function () { return !!a.applicationCache }; for (var H in q) y(q, H) && (w = H.toLowerCase(), e[w] = q[H](), t.push((e[w] ? "" : "no-") + w)); e.input || G(), z(""), j = l = null, a.attachEvent && function () { var a = b.createElement("div"); a.innerHTML = "<elem></elem>"; return a.childNodes.length !== 1 } () && function (a, b) { function s(a) { var b = -1; while (++b < g) a.createElement(f[b]) } a.iepp = a.iepp || {}; var d = a.iepp, e = d.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", f = e.split("|"), g = f.length, h = new RegExp("(^|\\s)(" + e + ")", "gi"), i = new RegExp("<(/*)(" + e + ")", "gi"), j = /^\s*[\{\}]\s*$/, k = new RegExp("(^|[^\\n]*?\\s)(" + e + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"), l = b.createDocumentFragment(), m = b.documentElement, n = m.firstChild, o = b.createElement("body"), p = b.createElement("style"), q = /print|all/, r; d.getCSS = function (a, b) { if (a + "" === c) return ""; var e = -1, f = a.length, g, h = []; while (++e < f) { g = a[e]; if (g.disabled) continue; b = g.media || b, q.test(b) && h.push(d.getCSS(g.imports, b), g.cssText), b = "all" } return h.join("") }, d.parseCSS = function (a) { var b = [], c; while ((c = k.exec(a)) != null) b.push(((j.exec(c[1]) ? "\n" : c[1]) + c[2] + c[3]).replace(h, "$1.iepp_$2") + c[4]); return b.join("\n") }, d.writeHTML = function () { var a = -1; r = r || b.body; while (++a < g) { var c = b.getElementsByTagName(f[a]), d = c.length, e = -1; while (++e < d) c[e].className.indexOf("iepp_") < 0 && (c[e].className += " iepp_" + f[a]) } l.appendChild(r), m.appendChild(o), o.className = r.className, o.id = r.id, o.innerHTML = r.innerHTML.replace(i, "<$1font") }, d._beforePrint = function () { p.styleSheet.cssText = d.parseCSS(d.getCSS(b.styleSheets, "all")), d.writeHTML() }, d.restoreHTML = function () { o.innerHTML = "", m.removeChild(o), m.appendChild(r) }, d._afterPrint = function () { d.restoreHTML(), p.styleSheet.cssText = "" }, s(b), s(l); d.disablePP || (n.insertBefore(p, n.firstChild), p.media = "print", p.className = "iepp-printshim", a.attachEvent("onbeforeprint", d._beforePrint), a.attachEvent("onafterprint", d._afterPrint)) } (a, b), e._version = d, e._prefixes = o, e._domPrefixes = p, e.hasEvent = v, e.testProp = function (a) { return D([a]) }, e.testAllProps = E, e.testStyles = u, g.className = g.className.replace(/\bno-js\b/, "") + (f ? " js " + t.join(" ") : ""); return e } (this, this.document), function (a, b, c) { function k(a) { return !a || a == "loaded" || a == "complete" } function j() { var a = 1, b = -1; while (p.length - ++b) if (p[b].s && !(a = p[b].r)) break; a && g() } function i(a) { var c = b.createElement("script"), d; c.src = a.s, c.onreadystatechange = c.onload = function () { !d && k(c.readyState) && (d = 1, j(), c.onload = c.onreadystatechange = null) }, m(function () { d || (d = 1, j()) }, H.errorTimeout), a.e ? c.onload() : n.parentNode.insertBefore(c, n) } function h(a) { var c = b.createElement("link"), d; c.href = a.s, c.rel = "stylesheet", c.type = "text/css"; if (!a.e && (w || r)) { var e = function (a) { m(function () { if (!d) try { a.sheet.cssRules.length ? (d = 1, j()) : e(a) } catch (b) { b.code == 1e3 || b.message == "security" || b.message == "denied" ? (d = 1, m(function () { j() }, 0)) : e(a) } }, 0) }; e(c) } else c.onload = function () { d || (d = 1, m(function () { j() }, 0)) }, a.e && c.onload(); m(function () { d || (d = 1, j()) }, H.errorTimeout), !a.e && n.parentNode.insertBefore(c, n) } function g() { var a = p.shift(); q = 1, a ? a.t ? m(function () { a.t == "c" ? h(a) : i(a) }, 0) : (a(), j()) : q = 0 } function f(a, c, d, e, f, h) { function i() { !o && k(l.readyState) && (r.r = o = 1, !q && j(), l.onload = l.onreadystatechange = null, m(function () { u.removeChild(l) }, 0)) } var l = b.createElement(a), o = 0, r = { t: d, s: c, e: h }; l.src = l.data = c, !s && (l.style.display = "none"), l.width = l.height = "0", a != "object" && (l.type = d), l.onload = l.onreadystatechange = i, a == "img" ? l.onerror = i : a == "script" && (l.onerror = function () { r.e = r.r = 1, g() }), p.splice(e, 0, r), u.insertBefore(l, s ? null : n), m(function () { o || (u.removeChild(l), r.r = r.e = o = 1, j()) }, H.errorTimeout) } function e(a, b, c) { var d = b == "c" ? z : y; q = 0, b = b || "j", C(a) ? f(d, a, b, this.i++, l, c) : (p.splice(this.i++, 0, a), p.length == 1 && g()); return this } function d() { var a = H; a.loader = { load: e, i: 0 }; return a } var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance" in l.style, s = r && !!b.createRange().compareNode, t = r && !s, u = s ? l : n.parentNode, v = a.opera && o.call(a.opera) == "[object Opera]", w = "webkitAppearance" in l.style, x = w && "async" in b.createElement("script"), y = r ? "object" : v || x ? "img" : "script", z = w ? "img" : y, A = Array.isArray || function (a) { return o.call(a) == "[object Array]" }, B = function (a) { return Object(a) === a }, C = function (a) { return typeof a == "string" }, D = function (a) { return o.call(a) == "[object Function]" }, E = [], F = {}, G, H; H = function (a) { function f(a) { var b = a.split("!"), c = E.length, d = b.pop(), e = b.length, f = { url: d, origUrl: d, prefixes: b }, g, h; for (h = 0; h < e; h++) g = F[b[h]], g && (f = g(f)); for (h = 0; h < c; h++) f = E[h](f); return f } function e(a, b, e, g, h) { var i = f(a), j = i.autoCallback; if (!i.bypass) { b && (b = D(b) ? b : b[a] || b[g] || b[a.split("/").pop().split("?")[0]]); if (i.instead) return i.instead(a, b, e, g, h); e.load(i.url, i.forceCSS || !i.forceJS && /css$/.test(i.url) ? "c" : c, i.noexec), (D(b) || D(j)) && e.load(function () { d(), b && b(i.origUrl, h, g), j && j(i.origUrl, h, g) }) } } function b(a, b) { function c(a) { if (C(a)) e(a, h, b, 0, d); else if (B(a)) for (i in a) a.hasOwnProperty(i) && e(a[i], h, b, i, d) } var d = !!a.test, f = d ? a.yep : a.nope, g = a.load || a.both, h = a.callback, i; c(f), c(g), a.complete && b.load(a.complete) } var g, h, i = this.yepnope.loader; if (C(a)) e(a, 0, i, 0); else if (A(a)) for (g = 0; g < a.length; g++) h = a[g], C(h) ? e(h, 0, i, 0) : A(h) ? H(h) : B(h) && b(h, i); else B(a) && b(a, i) }, H.addPrefix = function (a, b) { F[a] = b }, H.addFilter = function (a) { E.push(a) }, H.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", G = function () { b.removeEventListener("DOMContentLoaded", G, 0), b.readyState = "complete" }, 0)), a.yepnope = d() } (this, this.document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };
/*! skrollr 0.6.19 (2014-01-02) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */

(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render},ft=r.forceHeight!==!1,ft&&(zt=r.scale||1),pt=r.mobileDeceleration||E,gt=r.smoothScrolling!==!1,vt=r.smoothScrollingDuration||x,dt={targetTop:it.getScrollTop()},_t=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),_t?(st=t.getElementById("skrollr-body"),st&&at(),X(),Ct(o,[y,S],[T])):Ct(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==$t||e!==Lt)&&($t=t,Lt=e,Mt=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i=e.skrollr={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.19"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",p="touchcancel",m="touchend",g="skrollable",v=g+"-before",d=g+"-between",h=g+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",w="linear",k=1e3,E=.004,x=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",P=/^(?:input|textarea|button|select)$/i,N=/^\s+|\s+$/g,V=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,z=/\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,O=/^([a-z\-]+)\[(\w+)\]$/,q=/-([a-z])/g,I=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,$=/\{\?\}/g,M=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,B=/[a-z\-]+-gradient/g,_="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(_=n.match(e)||+n==n&&t[n].match(e))break;if(!_)return _=G="",r;_=_[0],"-"===_.slice(0,1)?(G=_,_={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[_]):G="-"+_.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[_.toLowerCase()+"RequestAnimationFrame"],r=Pt();return(_t||!t)&&(t=function(t){var n=Pt()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Pt(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[_.toLowerCase()+"CancelAnimationFrame"];return(_t||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],Bt=0,e=t.getElementsByTagName("*")):e=[].concat(e),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=gt,f=yt;if(i.attributes){for(var u=0,p=i.attributes.length;p>u;u++){var m=i.attributes[u];if("data-anchor-target"!==m.name)if("data-smooth-scrolling"!==m.name)if("data-edge-strategy"!==m.name){var v=m.name.match(V);if(null!==v){var d={props:m.value,element:i};s.push(d);var h=v[1];h&&(d.constant=h.substr(1));var y=v[2];/p$/.test(y)?(d.isPercentage=!0,d.offset=(0|y.slice(0,-1))/100):d.offset=0|y;var T=v[3],b=v[4]||T;T&&T!==A&&T!==F?(d.mode="relative",d.anchors=[T,b]):(d.mode="absolute",T===F?d.isEnd=!0:d.isPercentage||(d.offset=d.offset*zt))}}else f=m.value;else c="off"!==m.value;else if(l=t.querySelector(m.value),null===l)throw'Unable to find anchor target "'+m.value+'"'}if(s.length){var S,w,k;!a&&H in i?(k=i[H],S=lt[k].styleAttr,w=lt[k].classAttr):(k=i[H]=Bt++,S=i.style.cssText,w=Ft(i)),lt[k]={element:i,styleAttr:S,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f},Ct(i,[g],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Pt(),o=it.getScrollTop();return mt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||k,startTime:n,endTime:n+(t.duration||k),easing:U[t.easing||w],done:t.done},mt.topDiff||(mt.done&&mt.done.call(it,!1),mt=r),it},n.prototype.stopAnimateTo=function(){mt&&mt.done&&mt.done.call(it,!0),mt=r},n.prototype.isAnimatingTo=function(){return!!mt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,_t?Gt=s.min(s.max(t,0),Vt):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return _t?Gt:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Vt},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),kt(),Ct(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="auto",o.style.height=a.style.height="auto",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Vt=0,zt=1,ut=r,pt=r,Ot="down",qt=-1,Lt=0,$t=0,Mt=!1,mt=r,gt=r,vt=r,dt=r,ht=r,Bt=0,yt=r,_t=!1,Gt=0,Tt=r};var X=function(){var n,i,l,c,g,v,d,h,y,T,b,S;St(o,[f,u,p,m].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(g=o.clientY,v=o.clientX,T=e.timeStamp,P.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=d=g,l=v,y=T;break;case u:P.test(c.tagName)&&t.activeElement!==c&&e.preventDefault(),h=g-d,S=T-b,it.setScrollTop(Gt-h,!0),d=g,b=T;break;default:case p:case m:var a=i-g,w=l-v,k=w*w+a*a;if(49>k){if(!P.test(n.tagName)){n.focus();var E=t.createEvent("MouseEvents");E.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(E)}return}n=r;var x=h/S;x=s.max(s.min(x,3),-3);var A=s.abs(x/pt),F=x*A+.5*pt*A*A,C=it.getScrollTop()-F,D=0;C>Vt?(D=(Vt-C)/F,C=Vt):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f,u,p,m=o.clientHeight,g=xt();for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],u=l.offset,p=g[l.constant]||0,l.frame=u,l.isPercentage&&(u*=m,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),l.frame+=p,ft&&!l.isEnd&&l.frame>Vt&&(Vt=l.frame);for(Vt=s.max(Vt,At()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],p=g[l.constant]||0,l.isEnd&&(l.frame=Vt-l.offset+p);e.keyFrames.sort(Nt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,p=u[0].frame,m=u[u.length-1].frame,y=p>f,T=f>m,b=u[y?0:u.length-1];if(y||T){if(y&&-1===s.edge||T&&1===s.edge)continue;switch(Ct(c,[y?v:h],[v,d,h]),s.edge=y?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=b.frame;break;default:case"set":var S=b.props;for(o in S)l.call(S,o)&&(a=nt(S[o].value),i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Ct(c,[g,d],[v,h]),s.edge=0);for(var w=0,k=u.length-1;k>w;w++)if(f>=u[w].frame&&u[w+1].frame>=f){var E=u[w],x=u[w+1];for(o in E.props)if(l.call(E.props,o)){var A=(f-E.frame)/(x.frame-E.frame);A=E.props[o].easing(A),a=rt(E.props[o].value,x.props[o].value,A),a=nt(a),i.setStyle(c,o,a)}break}}},Z=function(){Mt&&(Mt=!1,Et());var e,t,n=it.getScrollTop(),o=Pt();if(mt)o>=mt.endTime?(n=mt.targetTop,e=mt.done,mt=r):(t=mt.easing((o-mt.startTime)/mt.duration),n=0|mt.startTop+t*mt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=dt.targetTop-n;a&&(dt={startTop:qt,topDiff:n-qt,targetTop:n,startTime:It,endTime:It+vt}),dt.endTime>=o&&(t=U.sqrt((o-dt.startTime)/vt),n=0|dt.startTop+t*dt.topDiff)}if(_t&&st&&i.setStyle(st,"transform","translate(0, "+-Gt+"px) "+Tt),ht||qt!==n){Ot=n>qt?"down":qt>n?"up":Ot,ht=!1;var l={curTop:n,lastTop:qt,maxTop:Vt,direction:Ot},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),qt=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}It=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=z.exec(l.props));)a=i[1],o=i[2],n=a.match(O),null!==n?(a=n[1],n=n[2]):n=w,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return M.lastIndex=0,e=e.replace(M,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(B.lastIndex=0,e=e.replace(B,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return $.lastIndex=0,e[0].replace($,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Ct(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=Ft(n),n.style.cssText=r.styleAttr,Ct(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(q,I).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{_&&(n[_+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,pt,mt,gt,vt,dt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Kt.push({element:t,name:a,listener:n})},wt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},kt=function(){for(var e,t=0,r=Kt.length;r>t;t++)e=Kt[t],wt(e.element,e.name,e.listener);Kt=[]},Et=function(){var e=it.getScrollTop();Vt=0,ft&&!_t&&(a.style.height="auto"),j(),ft&&!_t&&(a.style.height=Vt+o.clientHeight+"px"),_t?it.setScrollTop(s.min(it.getScrollTop(),Vt)):it.setScrollTop(e,!0),ht=!0},xt=function(){var e,t,r=o.clientHeight,n={};for(e in ut)t=ut[e],"function"==typeof t?t=t.call(it):/p$/.test(t)&&(t=t.substr(0,-1)/100*r),n[e]=t;return n},At=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},Ft=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Ct=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=Ht(i).replace(Ht(o[l])," ");i=Dt(i);for(var c=0,f=n.length;f>c;c++)-1===Ht(i).indexOf(Ht(n[c]))&&(i+=" "+n[c]);t[a]=Dt(i)},Dt=function(e){return e.replace(N,"")},Ht=function(e){return" "+e+" "},Pt=Date.now||function(){return+new Date},Nt=function(e,t){return e.frame-t.frame},Vt=0,zt=1,Ot="down",qt=-1,It=Pt(),Lt=0,$t=0,Mt=!1,Bt=0,_t=!1,Gt=0,Kt=[]})(window,document);
$(function () {

	$(".accordion .content").not(".accordion.active .content").css("display", "none");

	$(".accordion .header").click(function () {
		$(this).parent(".accordion").toggleClass("active").children(".content").slideToggle('fast');
	});

});
$(function () {

	/* Degrees Program Nav Conditional Styling
	------------------------------------------------------------------------------------------------*/
	$(".anchorLinks a").each(function (index) {
	  if ($('.letter[name=' + $(this).text() + ']').length) {
	    $(this).css("text-decoration", "underline");
	  }
	});

});
$(function () {

	/* Faculty List Old IE styling 
    ------------------------------------------------------------------------------------------------*/
    if ($(".facultyList .facultyMember").length && $("html").hasClass("oldie")) {
        $(".facultyList .facultyMember:nth-child(odd)").css("margin-right", "45px");
        $(".facultyList .facultyMember:nth-child(even)").css("margin-right", "0");
    }


    /* Faculty Video Fancybox
    ------------------------------------------------------------------------------------------------*/
    if ($(".facultySpotlight>.video[href]").length) {
        if ($("html").outerWidth() >= 780) {
            $(".facultySpotlight>.video").fancybox({
                type: 'iframe'
            });

            $(window).resize(function () {
                if ($("html").outerWidth() < 780) {
                    $.fancybox.close();
                    $(".facultySpotlight>.video").unbind();


                } else {
                    $(".facultySpotlight>.video").fancybox({
                        type: 'iframe'
                    });
                }
            });
        }

    } else {
        $(".facultySpotlight>.video").click(function (event) {
            event.preventDefault();
        });
    }

});
$(function () {

	/* Popluate featured item from xml generated from Cacade 
  ------------------------------------------------------------------------------------------------*/
  $.ajax({
    url: $(".featureFeed").text(),
    success: function (xml) {
      var image = $(xml).find("xml>system-data-structure>image>path").text(),
          date = $(xml).find("xml>system-data-structure>date").text(),
          month = date.split('-')[0],
          day = date.split('-')[1],
          year = date.split('-')[2],
          title = $(xml).find("xml>system-data-structure>title").text(),
          description = $(xml).find("xml>system-data-structure>description").text(),
          link = $(xml).find("xml>system-data-structure>link>link").text(),
          fileLink = $(xml).find("xml>system-data-structure>link>fileLink>path").text(),
          internalLink = $(xml).find("xml>system-data-structure>link>internalLink>path").text();

      if (internalLink !== '/') {
        link = internalLink+".aspx";
      }
      else if (fileLink !== '/') {
        link = fileLink;
      }

      // Image
      $(".newsEvents .featured .image").attr("src", image);
      $(".newsEvents .featured .image").attr("alt", title);

      // Date
      $(".newsEventsContent .featured .date .day").html(day);
      $(".newsEventsContent .featured .date .month").html(toShortMonthName(month));
      $(".newsEventsContent .featured .date .year").html(year);

      // Title
      $(".newsEventsContent .featured .title").html('<a href="' + link + '">' + title + '</a>');

      // Description
      $(".newsEventsContent .featured .description").html(description);

      // Read More Link
      if (link != '') {
        $(".newsEventsContent .featured .readMore").html('<a href="' + link + '">Read More<span class="bullet"> &raquo;</span></a>');
      }
    },
    dataType: 'xml'
  });

});
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
$(function () {

	/* Funnel Toggle More Links
	------------------------------------------------------------------------------------------------*/
	$(".funnel .funnelBlock .moreLinks, .funnel .funnelBlock .more").toggle();
	$(".funnel .funnelBlock .more").click(function () {
	  $(this).prev(".moreLinks").slideToggle();
	  if ($(this).html() === "+ More") {
	    $(this).html("- Less");
	  } else {
	    $(this).html("+ More");
	  }
	});

});
$(function () {

	/* Left Nav 
  ------------------------------------------------------------------------------------------------*/

  $(".leftNav>ul>li:not(.active)>ul")
    .prev("a")
    .children(".plus")
    .css("visibility", "visible");

  $(".leftNav .plus").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("open").parent("a").toggleClass("is-open").siblings("ul").slideToggle().toggleClass("is-open");
  });

  $(".leftNav ul li .show, .leftNav ul li .hide").click(function () {
    $(this).parent("li").toggleClass("active");
  });

  $(".leftNav").on("click", ".newbutton a", function () {
    recordOutboundLink($(this)[0], "Outbound-link_" + document.title.replace(" | Chapman University", ''), $(this).attr("href"), $(this).text());     
  });

});
$(function () {

	// Apply video class to iframes in editableContent regions (BCole altered to not apply to div with id=novideo) 
  //old:$(".editableContent iframe").wrap('<div class="video"/>');
  $(".editableContent iframe").not('#no-video').wrap('<div class="video"/>');

  /* added for links (really calls to action) in right col callouts: */
  $(".rightColumn").on("click", ".newbutton a", function () {
    recordOutboundLink($(this)[0], "Outbound-link_" + document.title.replace(" | Chapman University", ''), $(this).attr("href"), $(this).text());     
  });

});
$(function () {

	/* Masthead Class
  ------------------------------------------------------------------------------------------------*/
  if ($(".masthead").length && $(".masthead img").length) {
    $("#container").addClass("bigMasthead").removeClass("smallMasthead");
  }

});
$(function () {

	/* Mosaic border fix if only one slide
	------------------------------------------------------------------------------------------------*/
	if ($(".mosaic .slide").length < 2) {
	  $(".mosaic .block1 .border").css("border-width", "5px 5px 5px 5px");
	  $(".mosaic .block2 .border").css("border-width", "0 5px 5px 5px");
	}

});
$(function () {

	// Sync height of name bar buttons (only on desktop)

	$(window).resize(function () {
		sizeNameLinks();
	});
	$(function () {
		sizeNameLinks();
	})

	function sizeNameLinks() {

    nameLinks = $('.nameBarButtons li a');
    hasLong = false;

    nameLinks.each(function (index) {
      if ($(this).hasClass('long')) {
        hasLong = true;
      }
    });

    if (hasLong) {
      nameLinks.addClass('long');
    }

    if (nameLinks.length) {

      var nLheight = 0,
	        tmp = 0;

      nameLinks.each(function (index) {

        if (!$(this).hasClass('stuck')) {
          tmp = 0;
          // console.log($(this), $(this).height());
          tmp = $(this).height() // + parseInt($(this).css('paddingTop')) + parseInt($(this).css('paddingBottom'));
          // console.log(tmp);
          if (tmp > nLheight) {
            nLheight = tmp;
          }
        } else {
          nLheight = $(this).css('height');
        }
      });

      nameLinks.addClass('stuck').css('height', nLheight);

    }

	}

	/* Name Bar
  ------------------------------------------------------------------------------------------------*/
  if ($(".nameBar").length) {
    $(".nameBar").removeClass("active");
    $(".toggleExpanded .button").click(function () {
      $(".expandedNameBar").slideToggle().parent(".nameBar").toggleClass("active");
    });

    verticallyAlignNamebarText = (function () {
      $(".nameBarButtons li a .text").each(function () {
        var maxCharacters = $(".oldie").length ? 28 : 29;
        if ($(this).text().length > maxCharacters) {
          $(this).parent('a').addClass("long");
        }
      });
    })();

  }

  if ($(".scrollGallery").length) {
    $(".nameBar .slideDescription").remove();
  }

});
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
$(function() {

	// This adds placeholder support to browsers that wouldn't otherwise support it.
	jQuery.support.placeholder = false;
	test = document.createElement('input');
	if('placeholder' in test) jQuery.support.placeholder = true;

	// This adds 'placeholder' to the items listed in the jQuery .support object. 
	if(!$.support.placeholder) { 
	  var active = document.activeElement;
	  $(':text').focus(function () {
			if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
			  $(this).val('').removeClass('hasPlaceholder');
			}
	  }).blur(function () {
			if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
			  $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
			}
	  });
	  $(':text').blur();
	  $(active).focus();
	  $('form:eq(0)').submit(function () {
	     $(':text.hasPlaceholder').val('');
	  });
	}

	// Placeholder text
  if (!Modernizr.input.placeholder) { ph(); }

  function ph() {
    $("input[placeholder]:not(.ph)").each(function () {
      var place = $(this).attr('placeholder');

      $(this).attr('value', place);

      $(this).bind('focus', function () {
          if ($.trim($(this).attr('value')) == place) {
              $(this).attr('value', "");
          }
      });
      $(this).bind('blur', function () {
          if ($.trim($(this).attr('value')) == '') {
              $(this).attr('value', place);
          }
      });

      $(this).addClass('ph');
    })
    $("textarea[placeholder]:not(.ph)").each(function () {
      var place = $(this).attr('placeholder');

      $(this).val(place);

      $(this).bind('focus', function () {
          if ($.trim($(this).val()) == place) {
              $(this).val("");
          }
      });
      $(this).bind('blur', function () {
          if ($.trim($(this).val()) == '') {
              $(this).val(place);
          }
      });

      $(this).addClass('ph');
    })
  }

});
$(function() {

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

  /* starting tab for level pages with newsEventsNav li */

  // Validate Data
  if ((urlParams["startingtab"] != undefined) && (urlParams["startingtab"] == parseInt(urlParams["startingtab"])) && (urlParams["startingtab"] - 1 < $(".main .newsEventsNav li").length)) {

      // Offset for zero based arrays
      if (urlParams["startingtab"] != 0)
          urlParams["startingtab"] = urlParams["startingtab"] - 1;
      
      var $activeElementRegion = $(".main .newsEventsNav li").eq(urlParams["startingtab"]);

      // Set active class
      $activeElementRegion.addClass("active").siblings().removeClass("active");
      // Update the content section - set active content to display
      $activeElementRegion.parent(".newsEventsNav").siblings(".newsEventsContent").children("li:eq(" + urlParams["startingtab"] + ")").addClass("active").siblings().removeClass("active");
      
      // Scroll to the active element
      setTimeout(function(){
          $('html, body').stop().animate({
              scrollTop:$activeElementRegion.offset().top
          },1000) ;
      },350);
  }

  /* starting tab for level pages with <div> Q/A style elements */

  // Validate Data
  if ((urlParams["openregion"] != undefined) && (urlParams["openregion"] == parseInt(urlParams["openregion"])) && urlParams["openregion"] - 1 < $(".main .accordion").length) {

      // Offset for zero based arrays
      if (urlParams["openregion"] != 0) 
          urlParams["openregion"] = urlParams["openregion"] - 1;
      
      var $activeElementRegion = $(".main .accordion").eq(urlParams["openregion"]);

      // Add the active class to nth accordion and remove all other active classes
      $activeElementRegion.addClass("active").siblings().removeClass("active");

      // Display the current region
      $activeElementRegion.find("div.content").show();

      // Hide the other regions
      $activeElementRegion.siblings().find("div.accordion div.content").hide();
      
      // Scroll to the active element
      setTimeout(function(){
          $('html, body').stop().animate({
              scrollTop:$activeElementRegion.offset().top
          },1000) ;
      },350);
  }

  /* End starting tab code */

});
$(function () {

    /* Rotator
    ------------------------------------------------------------------------------------------------*/

    if ($(".rotatorContainer").parent(".mosaic").length > 0) {
        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {


                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

            },
            before: function (slider) {

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);
            }
        });

        // Initialize tipsy for info rollovers
        $(".mosaic .info").each(function (index) {
            if (!$(this).attr("title")) {
                $(this).remove();
            }
        });

        $(".info").tipsy({
            fade: true,
            gravity: $.fn.tipsy.autoWE
        });

        $(".nameBar .slideDescription").remove();
    }
    else if ($(".rotatorContainer").parent(".rounded-slider").length > 0) {

        $('.rounded-slider').find('.red').html('<p>' + $(".rounded-slider .slide:first-child").attr('data-red') + '</p>');        
        
        if($(".rounded-slider .slide:first-child").attr('data-link')){
           $('.rounded-slider').find('.red').append(
                $("<a>").attr({
                    'href': $(".rounded-slider .slide:first-child").attr('data-link'),
                    'title': 'Learn More'
                }).html("Learn More &raquo;")

            );
        }
        else{
            $('.rounded-slider').find('.red').addClass("no-link");
        }
        
        if (!$(".rounded-slider .info-container .red p").text()) {
            $(".rounded-slider .info-container .red").hide();
        }

        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            directionNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {

                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide),
                    red = $('.rounded-slider').find('.red');
                //blue = $('.rounded-slider').find('.blue');

                var caption = $currentSlide.attr('data-red');
                //var title = $currentSlide.attr('data-blue');
                var link = $currentSlide.attr('data-link');

                red.removeClass('no-link');
                
                if (caption) {
                    red.html("<p>" + caption + "</p>");
                }
                else {
                    red.hide();
                }
                //blue.html("<p>"+title+"</p>");

                if (link) {
                    red.append(
                        $("<a>").attr({
                            'href': link,
                            'title': 'Learn More'
                        }).html("Learn More &raquo;")
                    )
                } else {
                    red.addClass('no-link');
                }

            },
            before: function (slider) {

                var red = $('.rounded-slider').find('.red');
                //    blue = $('.rounded-slider').find('.blue');

                red.find('a').remove();
                red.find('p').animate({
                    opacity: 0
                }, 500);
                //    blue.find('p').animate({
                //        opacity: 0
                //    }, 500);

            },
            after: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide),
                    red = $('.rounded-slider').find('.red');
                //blue = $('.rounded-slider').find('.blue');

                var caption = $currentSlide.attr('data-red');
                //var title = $currentSlide.attr('data-blue');
                var link = $currentSlide.attr('data-link');

                red.removeClass('no-link');

                if (caption) {
                    red.find('p').html(caption);
                    red.show('');
                }
                else {
                    red.hide('');
                }
                //blue.find('p').html(title);

                if (link) {
                    red.append(
                        $("<a>").attr({
                            'href': link,
                            'title': 'Learn More'
                        }).css('opacity', 0).html("Learn More &raquo;")
                    )
                } else {
                    red.addClass('no-link');
                }

                red.find('p, a').animate({
                    opacity: 1
                }, 500);
                //blue.find('p').animate({
                //    opacity: 1
                //}, 500);
            }
        });

        // Keep the slide arrows on the edge of the browser window

        // $(".flex-direction-nav li .next").offset({ left: $("#container").outerWidth() - 43 });
        // $(".flex-direction-nav li .prev").offset({ left: $("#container").offset().left });

        // $(window).bind("resize", function () {

        //     $(".flex-direction-nav li a.next").offset({ left: $("#container").outerWidth() - 43 });
        //     $(".flex-direction-nav li a.prev").offset({ left: $("#container").offset().left });

        // });

    }
    else {

        $('.flexslider').flexslider({
            animation: "slide",
            touchSwipe: true,
            controlNav: false,
            pauseOnHover: true,
            pauseOnAction: true,
            pausePlay: true,
            randomize: false,
            slideshowSpeed: (function () {

                var setting = $(".slideOptions .speed").text(),
                    speed = 10000;

                if (setting > 0) {
                    speed = 1000 * setting;
                }

                return speed;
            })(),
            slideToStart: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                if (number > 0) {
                    return (number - 1);
                }
                else {
                    return 0;
                }

            })(),
            slideshow: (function () {
                var isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                return isAuto;

            })(),
            animationLoop: true,
            start: function (slider) {
                g_mySlider = slider;
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $(".flexslider .slides .slide").removeClass("active");
                $currentSlide.addClass("active");

                $(".blockOut").fadeOut();

                $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
                if (!$(".slideDescription .centeredContent").html()) {
                    $(".slideDescription").addClass("visuallyhidden");
                }
                else {
                    $(".slideDescription").removeClass("visuallyhidden");
                }
            },
            before: function (slider) {

                $(".blockOut").stop().fadeIn();
                $(".slide").stop().fadeTo(250, .2, function () { });

            },
            after: function (slider) {
                var currentSlide = slider.slides[slider.currentSlide],
                    $currentSlide = $(currentSlide);

                $(".blockOut").stop().fadeOut("slow");
                $(".slide").stop().fadeTo(500, 1, function () { });


                $(".flexslider .slides .slide").removeClass("active");
                $currentSlide.addClass("active");

                $(".slideDescription .centeredContent").html($currentSlide.children(".dataDescription").html());
                if (!$(".slideDescription .centeredContent").html()) {
                    $(".slideDescription").addClass("visuallyhidden");
                }
                else {
                    $(".slideDescription").removeClass("visuallyhidden");
                }
            }
        });

        // Keep the slide arrows on the edge of the browser window

        $(".flex-direction-nav li .next").offset({ left: $("#container").outerWidth() - 43 });
        $(".flex-direction-nav li .prev").offset({ left: $("#container").offset().left });

        $(window).bind("resize", function () {

            $(".flex-direction-nav li a.next").offset({ left: $("#container").outerWidth() - 43 });
            $(".flex-direction-nav li a.prev").offset({ left: $("#container").offset().left });

        });

    }

    // Remove :focus outline from rotator nav arrows
    $(".flex-direction-nav li a").each(function () {
        $(this).attr("hideFocus", "true").css("outline", "none");
    });

    // Pause the slider once the user interacts with the slider
    $(".flex-direction-nav li a").live("click", function (event) {
        g_mySlider.pause();
        g_mySlider.resume = function () {};
    });

    /* Mini-Rotator Code
    ------------------------------------------------------------------------------------------------*/
    if ($(".miniRotator").length) {

        $(".miniRotatorContainer").jcarousel({
            start: (function () {
                var number = $(".slideOptions .startingSlideNumber").text();

                return (number * 1);

            })(),
            auto: (function () {
                var speed = 10,
                    speedSetting = $(".slideOptions .speed").text(),
                    isAuto = $(".slideOptions .autoRotate").text() ? true : false;

                if (isAuto) {
                    if (speedSetting > 0) {
                        speed = speedSetting;
                    }
                }
                else {
                    speed = 0;
                }

                return speed;

            })(),
            scroll: 1,
            wrap: "circular",
            buttonNextHTML: null,
            buttonPrevHTML: null,
            initCallback: function (carousel) {
                carousel.clip.hover(function () {
                    carousel.stopAuto();
                }, function () {
                    carousel.startAuto();
                });

                $('.miniRotatorNav .next').bind('click', function () {
                    carousel.next();
                    return false;
                });

                $('.miniRotatorNav .prev').bind('click', function () {
                    carousel.prev();
                    return false;
                });
            }
        });
    }

});
$(function () {

	/* Custom Scroll Bar
	------------------------------------------------------------------------------------------------*/

	$('.scrollGallery').each(function () {

		$(this).jScrollPane({

			showArrows: $(this).is('.arrow'),
			horizontalDragMinWidth: 65,
			horizontalDragMaxWidth: 65

		});

		var api = $(this).data('jsp');
		var throttleTimeout;
		$(window).bind('resize',

		function () {

			if ($.browser.msie) {
			  // IE fires multiple resize events while you are dragging the browser window which
			  // causes it to crash if you try to update the scrollpane on every one. So we need
			  // to throttle it to fire a maximum of once every 50 milliseconds...
			  if (!throttleTimeout) {
			    throttleTimeout = setTimeout(

			    function () {
			      api.reinitialise();
			      throttleTimeout = null;
			    },


			    50);
			  }
			} else {
			  api.reinitialise();
			}

		});

	});

});
$(function () {

	/* social icon hover styles */
	$('#social_follow_us li').hover(function () {

	  $(this).find('span.inactive_state').stop().animate({
	    opacity: 0
	  }, 75);
	}, function () {

	  $(this).find('span.inactive_state').stop().animate({
	    opacity: 1
	  }, 75);
	});
	/* end social icon hover styles */

});
$(function () {

	$('#big-sponsor ul').jcarousel({
	  buttonNextHTML: "<div>&raquo;</div>",
	  buttonPrevHTML: "<div>&laquo;</div>",
	  auto: 5,
	  wrap: "circular",
	  scroll: 1
	});

	$('#big-sponsor ul').touchwipe({
	  wipeLeft: function() {
	    $('#big-sponsor ul').jcarousel('next');
	  },
	  wipeRight: function() {
	    $('#big-sponsor ul').jcarousel('prev');
	  },
	  min_move_x: 20,
	  min_move_y: 20,
	  preventDefaultEvents: false
	});

	$('#small-sponsor ul').jcarousel({
	  buttonNextHTML: "<div>&raquo;</div>",
	  buttonPrevHTML: "<div>&laquo;</div>",
	  auto: 5,
	  wrap: "circular",
	  scroll: 1
	});

	$('#small-sponsor ul').touchwipe({
	  wipeLeft: function() {
	    $('#small-sponsor ul').jcarousel('next');
	  },
	  wipeRight: function() {
	    $('#small-sponsor ul').jcarousel('prev');
	  },
	  min_move_x: 20,
	  min_move_y: 20,
	  preventDefaultEvents: false
	});

});
$(function () {

    //NOTE: this script is used only for the main listing page /our-faculty/index.aspx NOT for the school/dept specific listing pages. They use faculty.js.
    var devUrl = "//chapmanfaculty.dev.breilabs.com",
        prodUrl = "//" + window.location.hostname,
        page = 0,
        resultsPerPage = 20,
        totalPages = 0,
        scope = "_faculty/all",
        schoolFilter = "",
        departmentFilter = "",
        keywords = "",
        facultyFeedUrl = function () {
            return prodUrl + "/" +
                   scope + "/" +
                   (keywords ? keywords + "/" : "") +
                   page + "/" +
                   resultsPerPage + "?" +
                   (schoolFilter ? ("school=" + schoolFilter + "&") : '') +
                   (departmentFilter ? ("dept=" + departmentFilter + "&") : '') +
                   "callback=?";
        },
        applyUserInput = function () {

            // A little bit of session storage to rememeber form state
            if (window.sessionStorage) {
                var directorySearchBox = document.getElementById("directorySearchBox"),
                    collegeFilterSelect = document.getElementById("collegeFilter"),
                    departmentFilterSelect = document.getElementById("departmentFilter");

                // Search Box
                if (sessionStorage.keywords) {
                    directorySearchBox.value = sessionStorage.keywords;
                }
                directorySearchBox.onkeyup = function (e) {
                    sessionStorage.keywords = this.value;
                }

                // All faculty checkbox session storage handled in onclick function

                // College Filter

                if (sessionStorage.collegeFilter && !$("#allFaculty:checked").length) {
                    collegeFilterSelect.value = sessionStorage.collegeFilter;
                }
                $(collegeFilterSelect).bind("change", function () {
                    sessionStorage.collegeFilter = collegeFilterSelect.value;
                });

                // Department Filter
                if (sessionStorage.departmentFilter && !$("#allFaculty:checked").length) {
                    departmentFilterSelect.value = sessionStorage.departmentFilter;
                }
                $(departmentFilterSelect).bind("change", function () {
                    sessionStorage.departmentFilter = departmentFilterSelect.value;
                });
            }

            var allFaculty = $("#allFaculty:checked").length,
                searchString = $("#directorySearchBox").val();

            schoolFilter = $("#collegeFilter option:selected").val();
            departmentFilter = $("#departmentFilter option:selected").val();

            if ($("#allFaculty:checked").length) {
                schoolFilter = '';
                departmentFilter = '';
            }

            if (!(searchString)) {
                allFaculty = true;
            }

            if (allFaculty) {
                scope = "_faculty/all";
                keywords = '';
            }
            else {
                scope = "_search";
                keywords = $.trim(searchString);
            }
        },
        populateResults = function () {
            $.getJSON(facultyFeedUrl(), function (data) {
                globalData = data;
                for (var i = 0; i < data.length; i++) {
                    var v_photo;
    				if (!data[i].ThumbnailPhoto) {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '/') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else {
						v_photo = data[i].ThumbnailPhoto;
					}
                    var result = {
                        link: data[i].CascadePath ? '/our-faculty/' + data[i].CascadePath : '',
                        image: v_photo,
                        name: $.trim(data[i].FacFullName),
                        title: data[i].Rank,
                        additionalTitles: data[i].AdditionalTitles,
                        affiliation: (function () {
                            var affiliation = [];
                            for (var j = 0; j < (data[i].Depts.length); j++) {
                                //affiliation.push(data[i].Depts[j].SchoolName);
                                var schl;
                                if (data[i].DeanFlag == 'Y') {
                                    schl = data[i].Depts[j].SchoolName + ', Dean';
                                }
                                else {
                                    schl = data[i].Depts[j].SchoolName;
                                }
                                affiliation.push(schl) ;
                                var dept;
                                if (data[i].Depts[j].DisplayDeptName != 'Conservatory of Music') {
                                    dept = data[i].Depts[j].DisplayDeptName ? (data[i].Depts[j].DisplayDeptName) : '';
                                }
                                else {
                                    dept = '';
                                }
                                var deptFacGrp;
                                if (dept != '') {
                                    deptFacGrp = data[i].Depts[j].FacGroupName ? (dept + ', ' + data[i].Depts[j].FacGroupName) : dept;
                                }
                                else {
                                    deptFacGrp = deptFacGrp = data[i].Depts[j].FacGroupName ? (data[i].Depts[j].FacGroupName) : '';;
                                }
                                affiliation.push(deptFacGrp);
                                //affiliation.push((data[i].Depts[j].DisplayDeptName ? (data[i].Depts[j].DisplayDeptName) : '') +
                                //                ((data[i].Depts[j].DisplayDeptName && data[i].Depts[j].FacGroupName) ? (', ' + data[i].Depts[j].FacGroupName) : ''));
                            }
                            return affiliation.join("<br>");
                        })(),
                        phone: data[i].OfficePhone,
                        email: data[i].ChapEmail
                    }

                    $(".searchResults .pagingInfo").before(formatResult(result));
                }
                var rangeLower = data[data.length - 1] ? ((data[data.length - 1].CurrentPage * resultsPerPage) + 1) : 0,
                    rangeUpper = data[data.length - 1] ? ((data[data.length - 1].CurrentPage + 1) * data[data.length - 1].ResultsPerPage) : 0,
                    totalResults = data[data.length - 1] ? (data[data.length - 1].TotalResults) : 0;

                if (rangeUpper > totalResults) {
                    rangeUpper = totalResults;
                }

                $(".rangeLower").html(rangeLower);
                $(".rangeUpper").html(rangeUpper);
                $(".totalResults").html(totalResults);
                totalPages = data[data.length - 1] ? (data[data.length - 1].TotalPages) : 0;

                $(".searchResults .result.old").remove();
            });
        };

    applyUserInput();
    populateResults();

    $(".directorySearchButton").click(function (event) {
        applyUserInput();

        $(".searchResults .result").addClass("old");
        page = 0;
        populateResults();
    });

    $('#directorySearchBox').keypress(function (event) {

        if (event.which == 13) {
            jQuery(this).blur();
            jQuery('.directorySearchButton').focus().click();
        }
    });

    $("#allFaculty").click(function () {
        if ($("#allFaculty:checked").length) {
            //$("select").val($('options:first').val());
            $("#directorySearchBox, #collegeFilter, #departmentFilter").attr("disabled", "disabled");
        }
        else{            
            $("#directorySearchBox, #collegeFilter, #departmentFilter").removeAttr("disabled");
        }

        if (window.sessionStorage) {
            sessionStorage.allFaculty = $("#allFaculty:checked").length;
        }
    });


    $(".first").click(function () {
        page = 0;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".previous").click(function () {
        (page === 0) ? page = 0 : page -= 1;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".next").click(function () {
        (page === totalPages) ? page = totalPages : page += 1;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".last").click(function () {
        page = totalPages;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    function formatResult(result) {

        var formattedResult =
            '<div class="result" itemscope itemtype="http://schema.org/Person">' +
                (result.link ? '<a class="link" href="' + result.link + '" itemprop="url">VIEW PROFILE</a>' : '') +
                (result.image ? '<div class="profilePicture"><img class="image" width="80px" src="' + result.image + '" itemprop="image"></div>' : '') +
                (result.name ? '<div class="name" itemprop="name">' + result.name + '</div>' : '') +
                (result.title ? '<div class="title" itemprop="jobTitle">' + result.title + '</div>' : '') +
                (result.additionalTitles ? '<div class="additionalTitles" itemprop="jobTitle">' + result.additionalTitles + '</div>' : '') +
                (result.affiliation ? '<div class="affiliation" itemprop="affiliation">' + result.affiliation + '</div>' : '') +
        //(result.phone ? '<div class="phone" itemprop="telephone">' + result.phone + '</div>' : '') +
                (result.email ? '<a class="email" href="mailto:' + result.email + '" itemprop="email">' + result.email + '</a>' : '') +
            '</div>';

        return formattedResult;
    }

});
