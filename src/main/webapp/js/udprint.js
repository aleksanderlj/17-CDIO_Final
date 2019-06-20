$(function () {

    var taraSum, nettoSum;
    for (var i = 1; i < sessionStorage.getItem("raavareBatchLenght"); i++){
        addRavareBatch();
    }

    insertdata();

    var antalRaavareBatch = sessionStorage.getItem("antalRaavareBatch");
    for (var i = 1; i < antalRaavareBatch + 1; i++) {
    }

    function insertdata() {

        var d = new Date();
        var date_string = (d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate()) + "/" +
            ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1)) + "/" +
            d.getFullYear();

        var headerTable = document.getElementById("udprintHeader");
        headerTable.rows[0].cells[1].innerHTML = date_string;
        headerTable.rows[1].cells[1].innerHTML = sessionStorage.getItem("produktID");
        headerTable.rows[2].cells[1].innerHTML = sessionStorage.getItem("receptNavn");

        var endTable = document.getElementById("udprintFod");
        endTable.rows[0].cells[1].innerHTML = "tarasum";
        endTable.rows[1].cells[1].innerHTML = "nettoSum";
        endTable.rows[2].cells[1].innerHTML = sessionStorage.getItem("status");
        endTable.rows[3].cells[1].innerHTML = sessionStorage.getItem("startdato");
        endTable.rows[4].cells[1].innerHTML = sessionStorage.getItem("slutdato");
    }

    function addRavareBatch(nr) {
        var table = document.createElement("TABLE");
        table.setAttribute("class", "raavareInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table);

        var row1a = table.insertRow(0);
        row1a.insertCell(0).innerHTML = "Råvare nr. ";
        //row1a.insertCell(1).innerHTML = sessionStorage.getItem("raavareID");

        var row1b = table.insertRow(1);
        row1b.insertCell(0).innerHTML = "Råvare navn: ";
        row1b.insertCell(1).innerHTML = sessionStorage.getItem("raavareNavn" + 1);

        var table2 = document.createElement("TABLE");
        table2.setAttribute("class", "produktBatchInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table2);

        var row2a = table2.insertRow(0);
        row2a.insertCell(0).innerHTML = "Mængde";
        row2a.insertCell(1).innerHTML = "Tolerane";
        row2a.insertCell(2).innerHTML = "Tara";
        row2a.insertCell(3).innerHTML = "Netto (kg)";
        row2a.insertCell(4).innerHTML = "Batch";
        row2a.insertCell(5).innerHTML = "Opr:";

        var row2b = table2.insertRow(1);
        //row2b.insertCell(0).innerHTML = data.meangde;
        //row2b.insertCell(1).innerHTML = data.tolerance;
        //row2b.insertCell(2).innerHTML = data.tara;
        //row2b.insertCell(3).innerHTML = data.nonNetto;
        //row2b.insertCell(4).innerHTML = data.batchID;
        //row2b.insertCell(5).innerHTML = data.brugerID;
    }
});