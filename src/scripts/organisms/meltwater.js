// This code will not run if jQuery is not loaded
this.jQuery && (function ($) {

	var CU_Meltwater = {

		show : 5,
		url : '//socialdev.chapman.edu/callback/meltwater.json',

		initialize : function(num_to_show) {

			CU_Meltwater.$container = $('#meltwater');
			if (! CU_Meltwater.$container.length) return false;

			if (num_to_show) CU_Meltwater.show = num_to_show;

			CU_Meltwater.$moreButton = $('<button>Load more...</button>').hide();
			CU_Meltwater.$moreButton.on('click', CU_Meltwater.more);

			CU_Meltwater.$container.append('<ul></ul>');
			CU_Meltwater.$container.append(CU_Meltwater.$moreButton);

			CU_Meltwater.getData();

		},

		getData : function() {
			$.ajax({
				url: CU_Meltwater.url,
				data: {},
				success: function(data) {
					CU_Meltwater.current = 0;
					CU_Meltwater.data = data.feeds.feed.documents.document;
					CU_Meltwater.processData();

					console.log("There are "+ CU_Meltwater.data.length);
				},
				error: function(request, error) {
					CU_Meltwater.$container.append('<p>Sorry, news items could not be loaded.</p>');

					console.log("An error occured fetching Meltwater news stories.");
					console.log(error);
				},
				dataType: 'json'
			});
		},

		processData : function(transition) {

			while (this.current < this.show && this.current < this.data.length) {
				this.addItem(this.current, transition);
				this.current = this.current+1;
			}

			if (this.data.length > this.current) {
				CU_Meltwater.$moreButton.show();
			} else {
				CU_Meltwater.$moreButton.fadeOut();
			}

		},

		addItem : function(i, transition) {

			var
			data = CU_Meltwater.data[i],
			published_date = data.createDate_mon2+'/'+data.createDate_day+'/'+data.createDate_year,
			$link = $('<a href="'+data.url+'"></a>');


			$link.append('<span class="date">'+published_date+'</span>');
			$link.append('<span class="title">'+data.title+'</span>');

			if (data.sourcename) $link.append('<span class="sourcename">'+data.sourcename+'</span>');
			if (data.subregion)  $link.append('<span class="region">'+data.subregion+'</span>');

			var $elem = $('<li></li>').append($link);

			if (transition > 0) {
				$elem.hide(function() {
					$elem.fadeIn(transition);
				});
			}

			CU_Meltwater.$container.find('ul').append($elem);


		},

		more : function() {
			CU_Meltwater.show += 5;
			CU_Meltwater.processData(500);
		}
	}

	CU_Meltwater.initialize();

})(jQuery);
