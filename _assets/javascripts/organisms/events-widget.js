(function ( $ ) {


  /***** ::: Static Configuration ::: *****/
  var base_url     = 'https://events.chapman.edu/'
  var api_endpoint = 'https://events.chapman.edu/events.json';


  /***** ::: HTML TEMPLATE ::: *****/
  var template = '\
    <div class="cu-event-card"> \
      <a href="'+base_url+'{{permalink}}"> \
        <div class="thumbnail" style="background-image:url({{cover_photo}})"></div> \
        <div class="content"> \
          <h3 class="title">{{title}}</h3> \
          <p class="date">{{formatted_date}}</p> \
          <p class="time">{{formatted_time}}</p> \
        </div> \
      </a> \
    </div>';
  // End of the lines must be escaped for correct javsacript syntax. 
 

  /***** ::: jQuery Object Instance ::: *****/
  $.fn.cuEventWidget = function( options ) {
    var $self = this;


    /* ::: Instance Variables ::: */
    var settings = $.extend({
      group_id: this.data('group-id'),
    }, options );

    var query_params = {
      group_id : settings.group_id,
    };


    /* ::: Instance Methods ::: */

    // Maps fields from 'data' to the template vars in 'template'
    var buildHTML = function( data ) {
      return template.replace(/\{\{(.*?)\}\}/g, function(match, token) {
          return data[token];
      });
    };

    var renderEvents = function( data ) {
      var elems = '';

      for (i=0; i < data.events.length; i++) {
        elems += buildHTML(data.events[i]);
      }

      $self.html(elems);

      // Append an appropriate link
      if ( 0 === data.events.length ) {
        showNoResultMessage();
      } else {
        appendMoreInfoLink();
      }

    };

    var showNoResultMessage = function( ) {
      $self.append('<p>Sorry, there are no matching events to display. <a href="'+base_url+'">View all Chapman University events &raquo;</a></p>');
    };

    var appendMoreInfoLink = function( ) {
      var url = base_url + '?' + $.param(query_params);
      $self.append('<p class="more-cu-events"><a href="'+url+'">View more upcoming events &raquo;</a></p>');
    }

    var getData = function( self ) {
      return $.ajax({
        cache: true,
        dataType: 'json',
        url: api_endpoint,
        data: query_params
      });
    };


    /* ::: Main Method ::: */
    getData().success(renderEvents).fail(showNoResultMessage);


    // It's the jQuery way! (Allows further command chaining)
    return this;

  };
 
}( jQuery ));