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
    // Hold special keys
    var special = {8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 
		   18: "alt", 19: "pause", 20: "capslock", 27: "esc", 32: "space", 
		   33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left", 
		   38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 96: "0", 
		   97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 
		   104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
		   112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 
		   118: "f7", 119: "f8", 120: "f9", 121: "f10", 122: "f11", 123: "f12", 
		   144: "numlock", 145: "scroll", 191: "/", 224: "meta"};

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

		if (special[e.which])
		    key = 0;
		else{
		    key = String.fromCharCode(e.which);
		    key = key.toLowerCase();
		};
		
		// Check if a number was entered between 0 and 9
		if (key >= 0 && key <= 9){
		    if (key === 0)
			no = 10
		    else
			no = key - 1;

		    $('tr.listing').removeClass('highlight');
		    $('tr.listing').eq(no).addClass('highlight');
		}else{
		    // else initiate the show/edit/destroy/tag link for that selection
		    if (select_keys.indexOf(key) >= 0){
			switch (key){
			case 's':
			    $('.highlight').children('td').children('#show').click();
			    break;
			case 'e':
			    $('.highlight').children('td').children('#edit').click();
			    break;
			case 'd':
			    $('.highlight').children('td').children('#destroy').click();
			    break;
			case 't':
			    $('.highlight').children('td').children('#tag').click();
			    break;
			case 'm':
			    $('.highlight').children('td').children('#move').click();
			    break;
			};
		    };
		};
	    });
	});
    };
})(jQuery);
