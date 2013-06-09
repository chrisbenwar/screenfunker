(function($) {
		
	/**
	 * Create a screenfunker plugin to convert part of 
	 * the screen to an image using html2image.
	 * 
	 * @param {Object} options {
	 * 	
	 * }
	 */
	$.fn.screenfunker = function(options) { 
		options = options || {};
		
		var canvasReadable = true;
		var currentElem = null;
		
		var defaults = {
			
		};
		
		$.extend(defaults, options);

		if(canvasReadable)
		{
			$container = this;
			
			$overlay = $container.find('.overlay');
			$content = $container.find('.content');
			$output = $container.find('.output');
			
			$overlay.show();
			$content.show();
			$output.hide();
			
			var content = document.getElementById('myContent');//$content.get(0);
			
			html2canvas([content], {
				onrendered: function(canvas) {
					console.log('onrendered');
					
			        try
			        {
			            canvas.toDataURL();
			        } 
			        catch(e)
			        {
			            if (canvas.nodeName.toLowerCase() === "canvas") 
			            {
							canvasReadable = false;
			            }
			        }
					
					var context = canvas.getContext('2d');
					context.lineWidth=1;
					context.fillStyle="#833";
					context.lineStyle="#ffff00";
					context.font="18px sans-serif";
					context.fillText("Check out my screeny!", 0, 20);
					
					var dataURL = canvas.toDataURL();
					canvas
					$output.html('<img src="' + dataURL + '" />');
					
					$output.show();
					$content.hide();
					$overlay.hide();
				}
			});
		}
	}
	
})(jQuery);

$(document).ready(function() {
	$('.screenfunk1').screenfunker();
});
