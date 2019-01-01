////////////////Meniny date check + tooltip
//////////Dnesne meniny
$(document).ready(function () {
    var dateObj = new Date();
    var monthI = dateObj.getUTCMonth() + 1; //months from 1-12
    var dayI = dateObj.getUTCDate();
    var month = monthI.toString();
    var day = dayI.toString();
    if (day.length < 2) {
        day = "0" + day;
    }
    if (month.length < 2) {
        month = "0" + month;
    }
    var datum = month + day;
    vyhladajXML(datum, 0);
});
///////////////Vypnutie zobrazenia tooltipu pre datum
function changeVisibD() {
    $("#datum_tooltip").css('visibility', 'hidden');
}
/////////////Vyhladanie podla datumu
function datum() {
    var timestamp = $("#date").val().split(".");
    if (timestamp[0].length < 2) {
        timestamp[0] = "0" + timestamp[0];
    }
    if (timestamp[1].length < 2) {
        timestamp[1] = "0" + timestamp[1];
    }
    var d = new Date(timestamp[2] + "-" + timestamp[1] + "-" + timestamp[0]);
    if (d == "Invalid Date") {
        $(".tooltiptext").css('visibility', 'visible');
    } else {
        var datum = timestamp[1] + timestamp[0];
        vyhladajXML(datum, 1);
    }
}
//////////////Vyhladanie podla mena
function vyhladajMeno() {
    var meno = $("#meno").val();
    var meno2 = meno.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    vyhladajXML(meno2, 2);
}
/////////////////Samotna funkcia hladania v XML
function vyhladajXML(string, mod) {
    $("#sk").text("Slovensko: Nenaslo sa.");
    $("#cz").text("Cesko: Nenaslo sa.");
    $("#hu").text("Madarsko: Nenaslo sa.");
    $("#pl").text("Polsko: Nenaslo sa.");
    $("#at").text("Rakusko: Nenaslo sa.");
    $.ajax({
        type: "GET",
        url: "meniny.xml",
        dataType: "xml",
        success: function (xml) {
            var $meniny = $(xml).find('meniny');
            $meniny.find("zaznam").each(function () {
                var $this = $(this);
                ////////////////MOD 0 = dnesny datum
                if (mod == 0) {
                    if (string == $this.children("den").text()) {
                        $("#sk").text("Slovensko: " + $this.children("SKd").text());
                        $("#cz").text("Cesko: " + $this.children("CZ").text());
                        $("#hu").text("Madarsko: " + $this.children("HU").text());
                        $("#pl").text("Polsko: " + $this.children("PL").text());
                        $("#at").text("Rakusko: " + $this.children("AT").text());
                    }
                }
                /////////////////////Mod 1 = vyhladanie podla datumu
                else if (mod == 1) {
                    if (string == $this.children("den").text()) {
                        $("#sk").text("Slovensko: " + $this.children("SKd").text());
                        $("#cz").text("Cesko: " + $this.children("CZ").text());
                        $("#hu").text("Madarsko: " + $this.children("HU").text());
                        $("#pl").text("Polsko: " + $this.children("PL").text());
                        $("#at").text("Rakusko: " + $this.children("AT").text());
                    }
                }
                //////////////////Mod 2 = vyhladanie podla mena
                else if (mod == 2) {
                    //Vyhladanie v SK kalendari
                    var mena = $this.children("SKd").text().split(", ");
                    console.log(mena);
                    mena.forEach(function (item, index) {
                        mena[index] = mena[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    });
                    if (jQuery.inArray(string, mena) != -1) {
                        var result = $this.children("den").text().match(/\d{2}/g);
                        $("#sk").text("Slovensko: " + result[1] + "." + result[0]);
                    }
                    //Vyhladanie v CZ kalendari
                    var mena = $this.children("CZ").text().split(",");
                    mena.forEach(function (item, index) {
                        mena[index] = mena[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    });
                    if (jQuery.inArray(string, mena) != -1) {
                        var result = $this.children("den").text().match(/\d{2}/g);
                        $("#cz").text("Cesko: " + result[1] + "." + result[0]);
                    }
                    //Vyhladanie v HU kalendari
                    var mena = $this.children("HU").text().split(",");
                    mena.forEach(function (item, index) {
                        mena[index] = mena[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    });
                    if (jQuery.inArray(string, mena) != -1) {
                        var result = $this.children("den").text().match(/\d{2}/g);
                        $("#hu").text("Madarsko: " + result[1] + "." + result[0]);
                    }
                    //Vyhladanie v PL kalendari
                    var mena = $this.children("PL").text().split(",");
                    mena.forEach(function (item, index) {
                        mena[index] = mena[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    });
                    if (jQuery.inArray(string, mena) != -1) {
                        var result = $this.children("den").text().match(/\d{2}/g);
                        $("#pl").text("Polsko: " + result[1] + "." + result[0]);
                    }
                    //Vyhladanie v AT kalendari
                    var mena = $this.children("AT").text().split(",");
                    mena.forEach(function (item, index) {
                        mena[index] = mena[index].normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    });
                    if (jQuery.inArray(string, mena) != -1) {
                        var result = $this.children("den").text().match(/\d{2}/g);
                        $("#at").text("Rakusko: " + result[1] + "." + result[0]);
                    }
                }
            })
        }
    });
}
