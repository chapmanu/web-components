/**
 * Cross browser Ellipsis
 */
(function(e){e.fn.ellipsis=function(){return this.each(function(){var t=e(this);if(t.css("overflow")=="hidden"){var n=t.html();var r=t.hasClass("multiline");var i=e(this.cloneNode(true)).hide().css("position","absolute").css("overflow","visible").width(r?t.width():"auto").height(r?"auto":t.height());t.after(i);function s(){return i.height()>t.height()}function o(){return i.width()>t.width()}var u=r?s:o;while(n.length>0&&u()){n=n.substr(0,n.length-1);i.html(n+"...")}t.html(i.html());i.remove()}})}})(jQuery);