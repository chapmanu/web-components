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