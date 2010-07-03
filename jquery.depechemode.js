/*
 * jQuery depechemode (Shortcut keys plugin)
 *
 * Based upon plugin
 * http://github.com/jeresig/jquery.hotkeys
 *
 * Special thanks to Andrew France.
 *
*/
(function($){
    var select_keys = ['s', 'e', 'd', 't'];

    $.fn.depechemode = function(options){
	$(this).ready(function(event){
	    // Allow selecting with mouse hover
	    $('tr.listing').hover(
		function (){
		    $(this).addClass('highlight');
		},
		function (){
		    $(this).removeClass('highlight');
		}
	    );
	    
	    // Allow selecting through keyboard
	    $(this).keydown(function(e) {

		key = String.fromCharCode(e.which);

		// Check if a number was entered between 0 and 9
		if (key >= 0 && key <= 9){
		    if (key === 0)
			key = 10
		    else
			no = key - 1;

		    $('tr.listing').removeClass('highlight');
		    $('tr.listing:eq('+no+')').addClass('highlight');
		}else{
		    key = key.toLowerCase();
		    
		    // else initiate the show/edit/destroy/tag link for that selection
		    if (select_keys.indexOf(key) >= 0){
			switch (key){
			case 's':
			    $('.highlight').children('td').children('a:contains(Show)').click();
			    break;
			case 'e':
			    $('.highlight').children('td').children('a:contains(Edit)').click();
			    break;
			case 'd':
			    $('.highlight').children('td').children('a:contains(Destroy)').click();
			    break;
			};
		    };
		};
	    });
	});
    };
})(jQuery);