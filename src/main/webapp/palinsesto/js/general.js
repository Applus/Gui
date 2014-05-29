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

//memorizzo il percorso per le query per verres
var verres_query_dwh = "https://verres.applus.polito.it/JeerpDa/bi/mdx?q=";
var verres_query_db = "https://verres.applus.polito.it/JeerpDa/viewer/measure/";

//memorizzo il percorso per le query per mirafiori
var mirafiori_query_dwh = "https://mirafiori.applus.polito.it/JeerpDa/bi/mdx?q=";
var mirafiori_query_db = "https://mirafiori.applus.polito.it/JeerpDa/viewer/measure/";

var cube = "[Electric]";



// funzione arrotondamento a tre cifre
function round(value) {
	var round_value = (Math.round(value * 1000) / 1000);
	return round_value;
}
//arrotondamento a due cifre
function roundtwo(value) {
	var round_value = (Math.round(value * 100) / 100);
	return round_value;
}

// funzione per prendere i parametri dall'URL
function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for ( var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

//funzione per conversione da stringa a data utc
function convertFromStringToUTCDate (dateString){
	var date_array = dateString.split('|');
	
//	console.log(date_array);
	if(date_array.length==3){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,date_array[2]);
	}
	else if (date_array.length==5){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,date_array[2],date_array[3],date_array[4]);
	}
//	console.log(date_utc);
	return date_utc;
	 
}

function fromTimestampToUTC (timestamp){
	var date = new Date(timestamp);
	//alert(date);
	var timezone = date.getTimezoneOffset();
	var utc = date.getTime() - (timezone*60*1000);
	return utc;
}

/*funzione per parsare i dati, mi restituisce un vettore*/
function parse_simple_data(data, scale){
	var vector = new Array();
	var count = data.cells.length;
	for(var i = 0 ; i < count; i++){
		vector[i] = round(data.cells[i].value/scale);
	}
	return vector;
}

//passo una variabile booleana per capire se è  query "normale" o con intersect
function build_interval_query_energy(query_dwh, drain, year_b, month_b, day_b, hour_b, minute_b,
											year_e, month_e, day_e, hour_e, minute_e, intersect){
	
	var query='';
	if(intersect==false){
		query = query_dwh + "SELECT%20Measures%20ON%20COLUMNS,%20CrossJoin([Location].["+drain+"],";
		if(minute_b==null && minute_e==null && hour_b!=null && hour_e!=null){
			console.log('query oraria');
			query=  query + "%20([Time].["
			+ year_b + "].[" + month_b + "].[" + day_b + "].["+hour_b+"]:" + "[Time].[" + year_e
			+ "].[" + month_e + "].[" + day_e + "].["+hour_e+"]))";

		}
		else if(day_b==null && day_e==null && hour_b==null && hour_e==null && minute_b==null && minute_e==null){
			console.log('query mensile');
			query = query +"{[Time].[" + year_b + "].[" + month_b + "]:[Time].[" + year_e+ "]." 
			+ "[" + month_e + "]})";
		}
		else if(hour_b==null && hour_e==null && minute_b==null && minute_e==null){
			console.log('query giornaliera');
			query = query +"{[Time].[" + year_b + "].[" + month_b + "].[" + day_b+ "]:[Time].[" + year_e+ "]." 
			+ "[" + month_e + "].[" + day_e+ "]})";
		}
		else{
			console.log("query minute");
			query = query + "{[Time].[" + year_b + "].[" + month_b + "].[" + day_b+ "].["+hour_b+"].["+minute_b+"]:" + "[Time].[" + year_e+ "]." 
			+ "[" + month_e + "].[" + day_e+ "].["+hour_e+"].["+minute_e+"]})";
		}
	}
	else if(intersect==true){
		query = query_dwh + "SELECT%20Crossjoin([Measures].[Energy Consumption]";
		if(minute_b==null && minute_e==null && hour_b!=null && hour_e!=null){
			console.log('query oraria');
			query = query + ", [Location].["+drain+"])ON COLUMNS,%20Intersect([Time].[Hour].Members%20,%20([Time].["+year_b+"].["+month_b+"].["+day_b+"].["+hour_b+"]:"
			+"[Time].["+year_e+"].["+month_e+"].["+day_e+"].["+hour_e+"]))";

		}
		else if(day_b==null && day_e==null && hour_b==null && hour_e==null && minute_b==null && minute_e==null){
			console.log('query mensile');
		}
		else if(hour_b==null && hour_e==null && minute_b==null && minute_e==null){
			console.log('query giornaliera');
			query = query + ", [Location].["+drain+"])ON COLUMNS,%20Intersect([Time].[Day].Members%20,%20([Time].["+year_b+"].["+month_b+"].["+day_b+"]:"
			+"[Time].["+year_e+"].["+month_e+"].["+day_e+"]))";
		}
		else{
			console.log("query minute");
			query = query + ", [Location].["+drain+"])ON COLUMNS,%20Intersect([Time].[Minutes].Members%20,%20([Time].["+year_b+"].["+month_b+"].["+day_b+"].["+hour_b+"].["+minute_b+"]:"
			+"[Time].["+year_e+"].["+month_e+"].["+day_e+"].["+hour_e+"].["+minute_e+"]))";
		}
	}
	query = query + "%20ON%20ROWS%20FROM%20[Electric]";
	return query;
}

function build_interval_query_climatic(query_dwh, measure, drain, year_b, month_b, day_b, hour_b,
		year_e, month_e, day_e, hour_e){
var query=query_dwh + "SELECT [Measures].["+measure+"] ON COLUMNS,%20CrossJoin([Location].["+drain+"]," + "%20([Time].["
+ year_b + "].[" + month_b + "].[" + day_b + "].["+hour_b+"]:" + "[Time].[" + year_e
+ "].[" + month_e + "].[" + day_e + "].["+hour_e+"]))%20ON%20ROWS%20FROM%20[Climatic]";
return query;

}
