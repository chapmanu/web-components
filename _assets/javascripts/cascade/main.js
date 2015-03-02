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
