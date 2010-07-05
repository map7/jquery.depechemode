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

    var select_keys = {s: "show", e: "edit", d: "destroy", t: "tag", m: "move"};

    $.fn.depechemode = function(options){
	$(this).ready(function(event){
	    // Allow selecting with mouse hover
	    $('tr.listing').hover(
		function (){ $(this).addClass('highlight'); },    // Hover over
		function (){ $(this).removeClass('highlight'); }  // Leave hover
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
		    no = (key === 0) ? 10 : key - 1;
		    $('tr.listing').removeClass('highlight');
		    $('tr.listing').eq(no).addClass('highlight');
		}else{
		    if (select_keys[key])
			$('.highlight').children('td').children('#'+select_keys[key]).click();
		};
	    });
	});
    };
})(jQuery);
