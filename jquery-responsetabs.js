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
			easing     : 'linear'

        };		
		var settings = $.extend({}, defaults, args);

		var $this = this;

		var slider = $('>div', this);

		var tabCount = $('>div >div', this).size();

		// Apply CSS to container and child elements
		this.css({
			width    : '100%',
			overflow : 'hidden',
			position : 'relative',
			height   : $('>div >div:first-child', this).height()
		});

		$(slider).css({
			width    : (100*tabCount) + '%',
			position : 'absolute'
		});

		$('>div >div', this).css({
			width : (100/tabCount) + '%',
			clear : 'none',
			float : 'left' 
		});

		if(settings.navigation)
			$(settings.navigation).show().find('li:first-child a').addClass('current');

		// Add click event to navigation
		$(settings.navigation + ' a').click(function(){
			
			$(this).addClass('current').parent().siblings().find('a').removeClass('current');

			var index = $(this).parent().index();

			$this.animate({
				height : $('>div:nth-child('+ (index+1) +')', slider).height()
			}, settings.speed);

			slider.stop().animate({

				'left' : index*-100 + '%'

			}, settings.speed, settings.easing);

			return false;
		});


	};

})(jQuery);