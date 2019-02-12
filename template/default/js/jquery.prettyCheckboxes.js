/* ------------------------------------------------------------------------
	prettyCheckboxes
	
	Developped By: Stephane Caron (http://www.no-margin-for-errors.com)
	Inspired By: All the non user friendly custom checkboxes solutions ;)
	Version: 1.1
	
	Copyright: Feel free to redistribute the script/modify it, as
			   long as you leave my infos at the top.
------------------------------------------------------------------------- */
	
	jQuery.fn.prettyCheckboxes = function(settings) {
		settings = jQuery.extend({
					checkboxWidth: 15,
					checkboxHeight: 15,
					className : 'prettyCheckbox',
					display: 'list'
				}, settings);

		$(this).each(function(){
			// Find the label
			$label = $('label[for="'+$(this).attr('id')+'"]');
			
			// find tab-cat-item
			$boxItem = $('div[id="'+$(this).attr('id')+'_"]');

			// Add the checkbox holder to the label
			$label.prepend("<span class='holderWrap'><span class='holder'></span></span>");

			// If the checkbox is checked, display it as checked
			if($(this).is(':checked')) { $label.addClass('checked'); };
			
			// If the checkbox is checked, add class hover to tab-cat-item
			if($(this).is(':checked')) { $boxItem.addClass('hover'); };

			// Assign the class on the label
			$label.addClass(settings.className).addClass($(this).attr('type')).addClass(settings.display);

			// Assign the dimensions to the checkbox display
			$label.find('span.holderWrap').width(settings.checkboxWidth).height(settings.checkboxHeight);
			$label.find('span.holder').width(settings.checkboxWidth);

			// Hide the checkbox
			$(this).addClass('hiddenCheckbox');

			// Associate the click event
			$label.bind('click',function(){
				$('input#' + $(this).attr('for')).trigger('click');
				
				if($('input#' + $(this).attr('for')).is(':checkbox')){
					$(this).toggleClass('checked');
					$(this).parents('.tab-cat-item').toggleClass('hover');
					
					$(this).find('span.holder').css('top',0);
				}else{
					$toCheck = $('input#' + $(this).attr('for'));

					// Uncheck all radio
					$('input[name="'+$toCheck.attr('name')+'"]').each(function(){
						$('label[for="' + $(this).attr('id')+'"]').removeClass('checked');	
					});

					$(this).addClass('checked');
				};
				return false;
			});
			
			$('input#' + $label.attr('for')).bind('keypress',function(e){
				if(e.keyCode == 32){
					if($.browser.msie){
						$('label[for="'+$(this).attr('id')+'"]').toggleClass("checked");
						$('div[id="'+$(this).attr('id')+'_"]').toggleClass("hover");
					}else{
						$(this).trigger('click');
					}
					return false;
				};
			});
		});
	};
	
	checkAllPrettyCheckboxes = function(caller, container){
		if($(caller).is(':checked')){
			// Find the label corresponding to each checkbox and click it
			$(container).find('input[type=checkbox]:not(:checked)').each(function(){
				$('label[for="'+$(this).attr('id')+'"]').trigger('click');
				if($.browser.msie){
					$(this).attr('checked','checked');
				}else{
					$(this).trigger('click');
				};
			});
		}else{
			$(container).find('input[type=checkbox]:checked').each(function(){
				$('label[for="'+$(this).attr('id')+'"]').trigger('click');
				if($.browser.msie){
					$(this).attr('checked','');
				}else{
					$(this).trigger('click');
				};
			});
		};
	};