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

$(document).on('click', 'li[class^=livello]>span', function(){
	if (this == event.target) {
		$(this).parent('li').children('ul').children('li').toggle('slow');
		$(this).parent('li').find('div.extrainfo').toggle('slow');
	}
});

$(document).ready(function(){
	
	
	
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
			$("#refresh").animate({
				left:"20px"
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
			
			$("#refresh").animate({
				left:"320px"
			}, 500);
			$("#panelbutton").button('option', 'label', '<<');
		}
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
