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
			this.node.classList.add('carousel');
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
					items[index].classList.remove('active');
				}

				items[nextIndex].classList.add('active');

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
