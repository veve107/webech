/* Path-based breadcrumbs */
/* Roman Nociar */

/* Nastavenie cookies */
function setCookies(name, value, expiration){
	var date = new Date();
	date.setTime(date.getTime() + (expiration * 24 * 60 * 60 * 1000));
	var expires = 'expires=' + date.toGMTString();
	document.cookie = name + '=' + value + ';path="/";' + expires;
}
/* Vyber cookies */
function getCookies(name){
	var cookie = name + "=";
	var decoded = document.cookie.split(';');
	for(var i = 0; i < decoded.length; i++){
		var ch = decoded[i].trim();
		if(ch.indexOf(cookie) == 0){
			return ch.substring(cookie.length, ch.length);
		}
	}
	return "";
}
/* Funkcia na rozdelenie a vypisanie historie z cookies */
function showBreadcrumbs(){
	var history = getCookies("history");
	var array = [];
	var k = 0;
	
	if(history != ""){
		var crumbs = history.toString().split(",");
		for(var i = crumbs.length - 1; i >= 0; i--){
			array[k] = crumbs[i].substring(crumbs[i].lastIndexOf('/') + 1);
			k++;
		}		
		print_crumbs(array);
		crumbs.unshift(document.title);
		setCookies("history", crumbs.toString(), 30);
	}else{
		var stack = new Array();
        stack.unshift(document.title);
        setCookies("history", stack.toString(), 30);
	}
	
}
/* Pomocna funkcia na vypis historie */
function print_crumbs(array){
	var len = array.length-1;
	var from = len-5;
	if(len < 5){
		for(var i = 0; i < len+1; i++){
			document.getElementById("bread").innerHTML += ' > ' + array[i];
		}
	}else if(len >= 5){
		for(var i = from+1; i < len+1; i++){
			document.getElementById("bread").innerHTML += ' > ' + array[i];
		}
	}
}
