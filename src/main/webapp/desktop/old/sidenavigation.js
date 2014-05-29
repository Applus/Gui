/*******************************************************************************
* Copyright (c) 2014 Proxima Centauri srl <info@proxima-centauri.it>.
*  All rights reserved. This program and the accompanying materials
*  are made available under the terms of the GNU Public License v3.0
*  which accompanies this distribution, and is available at
*  http://www.gnu.org/licenses/gpl.html
*   
*  Contributors:
*      Proxima Centauri srl <info@proxima-centauri.it> - initial API and implementation
*******************************************************************************/

$(document).ready(
		function() {
			
			//get saved cookie
			getcookie();
			
			$("#panelbutton").button();

			$("#panelbutton").click(function() {
				console.log("clicked");
				if ($("#sidenavigation").hasClass("show")) {
					console.log("class is show");
					$("#sidenavigation").animate({
						marginLeft : "-300px"
					}, 500);
					$("#sidenavigation").removeClass("show").addClass("hide");
					$(".application").animate({
						marginLeft : "0px"
					}, 500);
					$("#panelbutton").button('option', 'label', '>>');
					
					
					
				} else if ($("#sidenavigation").hasClass("hide")) {
					$("#sidenavigation").animate({
						marginLeft : "0px"
					}, 500);
					$("#sidenavigation").removeClass("hide").addClass("show");

					
					$(".application").animate({
						marginLeft : "300px"
					}, 500);
					$("#panelbutton").button('option', 'label', '<<');
				}
			});
			
			
			//track current active item

			// gestione espansione/contrazione extra info
			$('.showinfo').each(
					function(index) {
						$(this).click(
								function(event) {
									console.log("cliccato info");
									if ($(this).text() == 'Mostra info') {
										console.log("testo uguale");
										$(this).text('Nascondi info');
										$(this).siblings('div.extrainfo')
												.removeClass('hidelist');
									} else {
										console.log("testi diverso");
										$(this).text('Mostra info');
										$(this).siblings('div.extrainfo').addClass('hidelist');
									}

								});
					});

			// gestione estensione/contrazione albero, primo livello
			$('.root>span').each(function(index) {
						$(this).click(function(event){
							console.log('cliccato ' + $(this));

							if (this == event.target) {
								
								$(this).parent('li').children('ul').children('li').toggle('slow');
								//$(this).children('ul').children('li').toggleClass('hidelist');
							
							}
							//save cookies
							setcookie();
						});
					});
			
			// gestione estensione/contrazione albero, secondo livello
			$('.area>span').each(function(index) {
						$(this).click(function(event){
							console.log('cliccato ' + $(this));

							if (this == event.target) {
								$(this).parent('li').children('ul').children('li').toggle('slow');
								//$(this).children('ul').children('li').toggleClass('hidelist');

							}
							//save cookies
							setcookie();
						});
					});
			// gestione estensione/contrazione albero, terzo livello
			$('.tipologia>span').each(function(index) {
						$(this).click(function(event){
							console.log('cliccato ' + $(this));

							if (this == event.target) {
								
								$(this).parent('li').children('ul').children('li').toggle('slow');
								//$(this).children('ul').children('li').toggleClass('hidelist');
							
							}
							//save cookies
							setcookie();
						});
					});
			

});

function setcookie(){
	//richiamo questa funzione quando clicco su un bottone
	
	//devo fare un ciclo su tuttli gli elementi di tipo li
	//prenderne le classi
	//salvare nei cookie
	
	$("li").each(function(index){
		console.log(index);
		console.log($(this).attr('class').toString());
		$.cookie('li'+index, $(this).attr('class'));
	});
}

function getcookie(){
	//recupero i cooki salvati
	
	$("li").each(function(index){
		var cl = $.cookie('li'+index);
		//alert(cl);
		
		if(cl!=null){
			console.log(index);
			console.log($(this).attr('class'));
			$(this).attr('class', cl);
		}
		
	});
}

