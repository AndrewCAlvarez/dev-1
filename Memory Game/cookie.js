//Jake Proctor
//04/13/2020
//CGS2829.OM1
//Walker
"use strict"; 
var getCookieByName = function( name ) {
    var cookies = document.cookie;
    //Starting index
    var start = cookies.indexOf(name + "=");
    
    if (start === -1) {return "";} //No cookie by name given
    else{
        //Remove name and equals are not included in result.
        start = start + (name.length + 1);
        //Get index of semicolon at the end of cookie value or the length of the string in the case of the last cookie
        var end = cookies.indexOf(";", start);
        if (end === -1) {end = cookies.length;}
        //Use start and end indexes to get cookie value
        var cookieValue = cookies.substring(start,end);
        //Return decoded cookie value
        return decodeURIComponent(cookieValue);
    }
    return "";
};

var setCookie = function( name, score, value, days ) {
    //Concatenate cookie name and encoded value
    var cookie = name + "=" + encodeURIComponent(value);
    //If there is a value for days, add max-age to cookie. Persistent cookie
    if (days !== undefined) {
        cookie += "; max-age=" + days * 24 * 60 * 60;
    }
    //Add path and store cookie
    cookie += "; path=/";
    document.cookie = cookie;
};

var deleteCookie = function( name ) {
    document.cookie = name + "=''; max-age=0; path=/";
};