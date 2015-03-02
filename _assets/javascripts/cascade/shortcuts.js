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