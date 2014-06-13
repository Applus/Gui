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

//var query_dwh = "/JeerpDa/bi/mdx?q=";
//var query_db = "/JeerpDa/viewer/measure/";

var query_dwh = "http://10.10.10.196:8080/JeerpDa/bi/mdx?q=";
var query_db = "http://10.10.10.196:8080/JeerpDa/viewer/measure/";

//var query_dwh = "http://10.10.10.55:8080/JeerpDa/bi/mdx?q=";
//var query_db = "http://10.10.10.55:8080/JeerpDa/viewer/measure/";

//memorizzo il percorso per le query per verres
var verres_query_dwh = "https://verres.applus.polito.it/JeerpDa/bi/mdx?q=";
var verres_query_db = "https://verres.applus.polito.it/JeerpDa/viewer/measure/";

//memorizzo il percorso per le query per mirafiori
var mirafiori_query_dwh = "https://mirafiori.applus.polito.it/JeerpDa/bi/mdx?q=";
var mirafiori_query_db = "https://mirafiori.applus.polito.it/JeerpDa/viewer/measure/";


//var cube = "[Energy]";
var cube = "[Electric]";

//funzione arrotondamento a tre cifre
function round(value){
	var round_value = (Math.round(value*1000)/1000);
	return round_value;
} 
//arrotondamento a due cifre
function roundtwo(value) {
	var round_value = (Math.round(value * 100) / 100);
	return round_value;
}
//funzione per prendere i parametri dall'URL
function GetURLParameter(sParam, url)
{
	var sPageURL = url;
    if(sPageURL==''){
    	sPageURL = window.location.search.substring(1);
    }
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
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
	//day = day.split('T');
	var hour = day[1].split('+');
	//console.log(day);
	
	//if(date_array.length==3){
		//date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0]);
	//}
	//else if(date_array.length==4){		
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0],hour[0], 0);
	//}
	//else if (date_array.length==5){
		//date_utc =Date.UTC(date_array[0],date_array[1] - 1,day[0],hour[0],date_array[4]);
	//}
	//console.log(date_utc);
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

function compare(a,b){
	if (a[0] < b[0])
	     return -1;
	  if (a[0] > [0])
	    return 1;
	  return 0;
}

/*ottimizzazione richieste ajax*/
function build_instant_query(drain, now){
	var query = query_db+drain+"?end="+now+"&limit=1&reversed=true";
	return query;
}

//passo una variabile booleana per capire se è  query "normale" o con intersect
function build_interval_query_energy(drain, year_b, month_b, day_b, hour_b, minute_b,
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

function build_interval_query_climatic(measure, drain, year_b, month_b, day_b, hour_b,
		year_e, month_e, day_e, hour_e){
var query=query_dwh + "SELECT [Measures].["+measure+"] ON COLUMNS,%20CrossJoin([Location].["+drain+"]," + "%20([Time].["
+ year_b + "].[" + month_b + "].[" + day_b + "].["+hour_b+"]:" + "[Time].[" + year_e
+ "].[" + month_e + "].[" + day_e + "].["+hour_e+"]))%20ON%20ROWS%20FROM%20[Climatic]";
return query;

}

//element where render the value 
function execute_instant_query(query, element){
	var value=0;
	$.ajax({
		url: query,
		type : "GET",
		dataType : 'jsonp',
		success: function(data){
			console.log("success query");
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
	var count = data.measures.length;
	for(var i = 0 ; i < count; i++){
		vector[i] = round(data.measures[i].value/scale);
	}
	return vector;
}


/* funzione per parsare i dati, mi restituisc eun vettore con associazioni time-value*/
/**
 * now -> per non caricare dati superiore alla data attuale
 * scale --> cambiare ordine di grandezza del dato
 * 
 * */
function parse_time_value_data(data, scale){
	var time_value_array = new Array();
	//prendo name e position di data.axes
	var num_axes =data.measures.length;
	//get the current day
	var now = moment().valueOf();
	now = fromTimestampToUTC(now);
	for(var i=0; i<num_axes; i++){
		var obj = new Array();
		//salto l'ultimo valor eperchè è sempre null
		var time = convertFromStringToUTCDate(data.measures[i].time);
		if(time < now){
			var val = (round(data.measures[i].value/scale));
			var time = moment(data.measures[i].time);
			var tstamp = Date.UTC(time.year(), time.month(), time.date(), time.hour(), time.minute(), 0);
			obj[0] = tstamp;
			obj[1] = val;
			
			time_value_array.push(obj);
		}

	}
	//faccio il sort
	//time_value_array.sort(compare);
	return time_value_array;
}
