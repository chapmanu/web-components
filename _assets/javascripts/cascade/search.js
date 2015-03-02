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