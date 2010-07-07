/*
 * jQuery depechemode (Shortcut keys plugin)
*/
(function($){
    var select_keys = {s: "show", e: "edit", d: "destroy", t: "tag", m: "move"};

    $.fn.depechemode = function(options){
	$(this).ready(function(event){
	    // Allow selecting with mouse hover
	    $('tr.listing').hover(
		function (){ $('tr.listing').removeClass('highlight');
			     $(this).addClass('highlight'); },    // Hover over
		function (){ $(this).removeClass('highlight'); }  // Leave hover
	    );
	    
	    // Allow selecting through keyboard
	    $(this).keydown(function(e) {

		// Check if a modifier key has been pushed eg: alt, ctrl or shift
		if (e.altKey || e.ctrlKey || e.shiftKey)
		    key = -1;
		else{
		    // Check numlock keys (96 -> 105)
		    code = (e.which >= 96 && e.which <= 105) ? e.which - 48 : e.which

		    if (code >= 48 && code <= 57)
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
	    });
	});
    };
})(jQuery);
