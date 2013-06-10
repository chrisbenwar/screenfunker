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
			$error = $container.find('.error');
			$content = $container.find('.content');
			$output = $container.find('.output');
			
			$overlay.show();
      $error.hide();
			$content.show();
			$output.hide();
			
			var content = $content.get(0);
			
			html2canvas([content], {
				onrendered: function(canvas) {
					
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
				
          if(!canvasReadable)
          {
            $output.hide();
            $error.show();
            $content.hide();
            $overlay.hide();
          }  
          else
          {
            var context = canvas.getContext('2d');
            var height = $content.height(); 

            var gradient = context.createLinearGradient(0,0,200,20);
            gradient.addColorStop("0","#569");
            gradient.addColorStop("0.5","#999");
            gradient.addColorStop("1.0","#569");
            context.fillStyle = gradient;

            context.font = "15px sans-serif";
            context.fillText("I just got screenfunked!", 20, height - 20);
            
            var dataURL = canvas.toDataURL();
            
            $output.html('<img src="' + dataURL + '" />');
              
            $output.show();
            $content.hide();
            $overlay.hide();
          } 
				}
			});
		}
	}
	
})(jQuery);

$(document).ready(function() {
	$('.demofunker').screenfunker();
});
