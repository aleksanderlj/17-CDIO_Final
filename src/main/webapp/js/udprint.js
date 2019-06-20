$(function () {

    var taraSum, nettoSum;

    insertData();

    var produktTableLength = sessionStorage.getItem("produktTableLength");

    for (var i = 1; i < produktTableLength; i++){
        addRavareBatch(i);
    }

    function addRavareBatch(nr) {
        var table = document.createElement("TABLE");
        table.setAttribute("class", "raavareInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table);


        var row1a = table.insertRow(0);
        row1a.insertCell(0).innerHTML = "Råvare nr. ";
        row1a.insertCell(1).innerHTML = sessionStorage.getItem("produktTableLength");

        var row1b = table.insertRow(1);
        row1b.insertCell(0).innerHTML = "Råvare navn: ";
        row1b.insertCell(1).innerHTML = sessionStorage.getItem("raavareNavn" + nr);

        var table2 = document.createElement("TABLE");
        table2.setAttribute("class", "produktBatchInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table2);

        var row2a = table2.insertRow(0);
        row2a.insertCell(0).innerHTML = "Mængde (kg)";
        row2a.insertCell(1).innerHTML = "Tolerane (%)";
        row2a.insertCell(2).innerHTML = "Tara (kg)";
        row2a.insertCell(3).innerHTML = "Netto (kg)" ;
        row2a.insertCell(4).innerHTML = "Batch id" ;
        row2a.insertCell(5).innerHTML = "Opr:" ;

        var row2b = table2.insertRow(1);
        row2b.insertCell(0).innerHTML = sessionStorage.getItem("meangde" + nr);
        row2b.insertCell(1).innerHTML = sessionStorage.getItem("tolerance" + nr);
        row2b.insertCell(2).innerHTML = sessionStorage.getItem("tara" + nr);
        taraSum = taraSum + sessionStorage.getItem("tara" + nr);
        row2b.insertCell(3).innerHTML = sessionStorage.getItem("netto" + nr);
        nettoSum = taraSum + sessionStorage.getItem("netto" + nr);
        row2b.insertCell(4).innerHTML = sessionStorage.getItem("batch" + nr);
        row2b.insertCell(5).innerHTML = sessionStorage.getItem("bruger" + nr);

        var br = document.createElement("BR");
        document.getElementById("råvarerBatchInfo").appendChild(br);
    }

    function insertData() {

        var d = new Date();
        var date_string = (d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate()) + "/" +
            ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1)) + "/" +
            d.getFullYear();

        var endTable = document.getElementById("udprintFod");
        endTable.rows[0].cells[1].innerHTML = taraSum;
        endTable.rows[1].cells[1].innerHTML = nettoSum;
        endTable.rows[2].cells[1].innerHTML = sessionStorage.getItem("status");
        endTable.rows[3].cells[1].innerHTML = sessionStorage.getItem("startdato");
        endTable.rows[4].cells[1].innerHTML = sessionStorage.getItem("slutdato");

        var headerTable = document.getElementById("udprintHeader");
        headerTable.rows[0].cells[1].innerHTML = date_string;
        headerTable.rows[1].cells[1].innerHTML = sessionStorage.getItem("produktID");
        headerTable.rows[2].cells[1].innerHTML = sessionStorage.getItem("receptNavn");
    }
});