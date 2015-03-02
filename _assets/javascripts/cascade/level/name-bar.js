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
