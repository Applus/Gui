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

//memorizzo le variabili per le query
var instant_query_mir= "https://mirafiori.applus.polito.it/JeerpDa/measure/instants/";
var minute_query_mir="https://mirafiori.applus.polito.it/JeerpDa/measure/details/";
var week_query_mir="https://mirafiori.applus.polito.it/JeerpDa/measure/history/";
var confort_mir="https://mirafiori.applus.polito.it/JeerpDa/confort/indicators/";

var instant_query_ver= "https://verres.applus.polito.it/JeerpDa/measure/instants/";
var minute_query_ver="https://verres.applus.polito.it/JeerpDa/measure/details/";
var week_query_ver="https://verres.applus.polito.it/JeerpDa/measure/history/";
var confort_ver="https://verres.applus.polito.it/JeerpDa/confort/indicators/";

//cubo a cui fare le interrogazioni
//var cube ="[Energy]";
var cube ="[Electric]";

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
	var date_array = dateString.split('-');
	//console.log("DATEARRAY");
	//console.log(date_array);

	var day=date_array[2];
	day = day.split('T');
	var hour = day[1].split('+');
	console.log(day);
	
	if(date_array.length==3){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0]);
	}
	else if(date_array.length==4){		
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0],hour[0], 0);
	}
	else if (date_array.length==5){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0],hour[0],date_array[4]);
	}
	console.log(date_utc);
	return date_utc; 
}

function fromTimestampToUTC (timestamp){
	var date = new Date(timestamp);
	//alert(date);
	var timezone = date.getTimezoneOffset();
	var utc = date.getTime() - (timezone*60*1000);
	return utc;
}

function log10(val) {
	  return Math.log(val) / Math.LN10;
	}

//ordina sul primo elemento (cioè quello con indice zero) di un array di array
function compare(a,b){
	if (a[0] < b[0])
	     return -1;
	  if (a[0] > b[0])
	    return 1;
	  return 0;
}


//element where render the value 
function execute_instant_query(query, element){
	var value=0;
	$.ajax({
		url: query,
		type : "GET",
		dataType : 'jsonp',
		success: function(data){
			value = data.value;
		},
		error: function(xhr, ajaxOptions, thrownErrorxhr){
			console.log("error");
			console.log(xhr.status);
			console.log(thrownErrorxhr.message);
			element.text("ND");
		},
		complete: function(qXHR, textStatus){
			element.text(value.toFixed(1));
		}
	});
}


//funzione per il clima istantaneo di verres, riporta l'ultimo valore letto
function clim_instant_query(query, element){
	var val=0;
	var len;
	$.ajax({
		url: query,
		type : "GET",
		dataType : 'jsonp',
		success: function(data){
			val = data.measures;
			len = val.length;
			val = val[len-1].value;
		},
		error: function(xhr, ajaxOptions, thrownErrorxhr){
			console.log("error");
			console.log(xhr.status);
			console.log(thrownErrorxhr.message);
			element.text("ND");
		},
		complete: function(qXHR, textStatus){
			element.text(val.toFixed(1));
		}
	});
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

//funzione temporanea per mirafiori con le nuove API
function parse_simple_data_tmp(data, scale){
	var vector = new Array();
	var count = data.measures.length;
	for(var i = 0 ; i < count; i++){
		vector[i] = round(data.measures[i].value/scale);
		}
	return vector;
}

/* funzione per parsare i dati, mi restituisce con le value*/
/**
 * now -> per non caricare dati superiore alla data attuale
 * scale --> cambiare ordine di grandezza del dato
 * 
 * */
function parse_time_value_data(data, scale, factor){
	if(typeof factor==='undefined'){
		factor=1;
	}
	var time_value_array = new Array();
	//prendo name e position di data.axes
	//console.log("NUM AXES-->  ");
	
	var num_axes = data.measures.length;
	//get the current day
	var now = moment().valueOf();
	now = fromTimestampToUTC(now);
	for(var i=0; i<num_axes-1; i++){
		var obj = new Array();
		//salto l'ultimo valor eperchè è sempre null
		var time = convertFromStringToUTCDate(data.measures[i].time);
		//console.log("TIME");
		//console.log(time);
		if(time < now){
			var val = (round(data.measures[i].value/scale))*factor;
			var time = moment(data.measures[i].time);
			var tstamp = Date.UTC(time.year(), time.month(), time.date(), time.hour(), time.minute(), 0);
			obj[0] = tstamp;
			obj[1] = val;
			
			time_value_array.push(obj);
			//time_value_array.push(val);
		}

	}
	//faccio il sort
	time_value_array.sort(compare);
	//return time_value_array;
	return time_value_array;
}

//get a column from a matrix
function getCol(matrix, col){
    var column = [];
    for(var i=0; i<matrix.length; i++){
       column.push(matrix[i][col]);
    }
    return column;
 }
