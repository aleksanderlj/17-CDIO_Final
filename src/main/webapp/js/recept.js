$(function(){



    /*Tilføj række*/
    function addrow(data){

        var rowCount = table.rows.length;
        var row = table.insertRow(1);

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;
        row.insertCell(2).innerHTML = data.ini;
        row.insertCell(3).innerHTML = data.cpr;
        row.insertCell(4).innerHTML = aktiv;

    }
});