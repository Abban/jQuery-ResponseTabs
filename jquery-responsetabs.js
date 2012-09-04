/**
 * jQuery ResponseTabs
 * http://github.com/Abban/jQuery-ResponseTabs
 * 
 * August 2012
 * 
 * @version 0.1
 * @author Abban Dunne http://abandon.ie
 * @license MIT
 *
 * Adds a 100% width content slider to allow iOS style horizontal sliding transitions.
 * 
 */
(function($){

	$.fn.responseTabs = function(args){

		var defaults = {

			navigation : false,
			speed      : 500,
			easing     : 'linear',
			startTab   : 0

        };		
		var settings = $.extend({}, defaults, args);

		// Set up variables
		var $this = this;
		var $slider = $('>div', this);
		var tabCount = $('>div >div', this).size();

		// Apply CSS to container and child elements
		$this.css({
			width    : '100%',
			overflow : 'hidden',
			position : 'relative',
			height   : $('>div >div:nth-child('+ (settings.startTab+1) +')', $this).height()
		});

		$slider.css({
			width    : (100*tabCount) + '%',
			position : 'absolute',
			left : settings.startTab*-100 + '%'
		});

		$('>div >div', this).css({
			width : (100/tabCount) + '%',
			clear : 'none',
			float : 'left' 
		});

		// Add the current class to the navigation
		$(settings.navigation).show().find('li:nth-child('+ (settings.startTab+1) +') a').addClass('current');

		// Add click event to navigation
		$(settings.navigation + ' a').click(function(){
			
			$(this).addClass('current').parent().siblings().find('a').removeClass('current');

			var index = $(this).parent().index();

			changeTab(index);

			return false;
		});

		/**
		 * Takes in an index and changes to the appropriate tab
		 * @param {int} index
		 */
		function changeTab(index){

			$(settings.navigation).find('li a').removeClass('current');
			$(settings.navigation).find('li:nth-child('+ (index+1) +') a').addClass('current')

			$this.animate({
				height : $('>div:nth-child('+ (index+1) +')', $slider).height()
			}, settings.speed);

			$slider.stop().animate({

				left : index*-100 + '%'

			}, settings.speed, settings.easing);

		}

	};

})(jQuery);