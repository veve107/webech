var mena = ["Nociar", "Patková", "Parai"];
var hry=["hra1.html", "hra2.html", "hra3.html"];

$( document ).ready(function(){
    $("#menu").append('<li class="nav-item" id="hry"><a class="nav-link" href="#">Hry</a>');
    $("#hry").append('<ul id=menu0>');
    jQuery.each(mena, function(i, val){
        $("#menu0").append('<li class="nav-item" id='+val+'><a class="nav-link" href="#">'+val+'</a>');
        var str = "menu"+val;
        $("#"+val).append('<ul id='+str+'>');
        $("#"+str).append('<li class="nav-item"><a class="nav-link" href='+hry[i]+'>Hraj</a></li>');
        $("#"+val).append('</ul>');
        $("#menu0").append('</li>');
    });
    $("#hry").append("</ul>");
    $("#menu").append('</li>');
});