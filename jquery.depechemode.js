/*
 * jQuery depechemode (Shortcut keys plugin)
 *
 * Pagination code from: http://github.com/augustl/sample-rails-apps/tree/master/jquery_and_ajax/
*/
(function($){
    var select_keys = {s: "show", e: "edit", d: "destroy", t: "tag", m: "move"};

    $.fn.depechemode = function(options){
	$(this).ready(function(event){

	    // Add shortcut keys to Next & Previous
	    $(document).keydown(function(e){
		key = String.fromCharCode(e.which).toLowerCase();

		if (e.ctrlKey && e.keyCode == 39){
			$('.next_page').click();
			return false;
		};
		if (e.ctrlKey && e.keyCode == 37){
			$('.prev_page').click();
			return false;
		};
	    });

	    // Allow selecting with mouse hover
	    $('tr.listing').livequery(function(){
		$(this).hover(function() {   // Hover bind
		    $('tr.listing').removeClass('highlight');
		    $(this).addClass('highlight'); 
		});
	    },  
	      function (){ $(this).removeClass('highlight'); }  // Hover unbind
	     );
	    
	    // Allow selecting through keyboard
	    $(this).keydown(function(e) {

		// Check if a modifier key has been pushed eg: alt, ctrl or shift
		if (e.altKey || e.ctrlKey || e.shiftKey)
		    key = -1;
		else{
		    // Check numlock keys (96 -> 105)
		    code = (e.which >= 96 && e.which <= 105) ? e.which - 48 : e.which

		    if ((code >= 48 && code <= 57) || (code >= 97 && code <=122) || (code >= 65 && code <= 90))
			key = String.fromCharCode(code).toLowerCase();
		    else
			key = -1;
		}

		// Check if a number was entered between 0 and 9
		if (key >= 0 && key <= 9){
		    no = (key == 0) ? 10 : key;
		    $('tr').removeClass('highlight');
		    $('tr').eq(no).addClass('highlight');
		}else{
		    if (select_keys[key])
			$('.highlight').children('td').children('#'+select_keys[key]).click();
		};
	    }); // keydown

	    // Pagination AJAX
	    // 
	    // Adds the .js mime to URLs, so that Rails fires the correct respond_to response.
	    var mimeifyUrl = function(url){
		if (/\.js/.test(url)){
		    return url
		} else if (/\?/.test(url)) {
		    return url.replace('?', '.js?')
		} else {
		    return url + '.js'
		}
	    }

	    // Similar to the built in 'load' function in jQuery, extended so that it adds the .js mime
	    // to the url.
	    $.fn.railsLoad = function(location){
		var self = this;
		$.ajax({
		    url: mimeifyUrl(location),
		    success: function(response, status){
			$(self).html(response);
		    }
		});
	    }
	    
	    // A function passed to the jQuery function - $(function()) - shorthand for 
	    // $(document).ready(). Runs it on window.onload 
	    // (which is the same as <body onload="foo()">)
	    $(function(){

		// All will_paginate entities in the DOM gets ajaxified with 
		// livequery (http://ozmm.org/posts/ajax_will_paginate_jq_style.html)
		$('div.pagination a').livequery('click', function() {
		    $('#content').railsLoad(this.href);
		    return false;
		});
	    });
	}); // ready
    }; // depechemode
})(jQuery);
