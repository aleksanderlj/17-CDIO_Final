$(function(){

insertdata();

for (var i = 1; i < sessionStorage.getItem("antalRaavareBatch") + 1; i++){
    addRavareBatch(i);
}

    function addRavareBatch(data){
        var table = document.createElement("TABLE");
        table.setAttribute("class","raavareInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table);
        
        var row1a = table.insertRow(0);
        row1a.insertCell(0).innerHTML = "Råvare nr.";
        row1a.insertCell(1).innerHTML = "Råvare navn:";

        var row1b = table.insertRow(1);
        row1b.insertCell(0).innerHTML = sessionStorage.getItem("raavareID");
        row1b.insertCell(1).innerHTML = sessionStorage.getItem("raavareNavn");

        var table2 = document.createElement("TABLE");
        table2.setAttribute("class","produktBatchInfo");
        document.getElementById("råvarerBatchInfo").appendChild(table2);

        row2a = table2.insertRow(0);
        row2a.insertCell(0).innerHTML = "Mængde";
        row2a.insertCell(1).innerHTML = "Tolerane";
        row2a.insertCell(2).innerHTML = "Tara";
        row2a.insertCell(3).innerHTML = "Netto (kg)";
        row2a.insertCell(4).innerHTML = "Batch";
        row2a.insertCell(5).innerHTML = "Opr:";

        row2b = table2.insertRow(1);
        row2b.insertCell(0).innerHTML = data.meangde;
        row2b.insertCell(1).innerHTML = data.tolerance;
        row2b.insertCell(2).innerHTML = data.tara;
        row2b.insertCell(3).innerHTML = data.nonNetto;
        row2b.insertCell(4).innerHTML = data.batchID;
        row2b.insertCell(5).innerHTML = data.brugerID;
    }

    function insertdata() {
        var headerTable = document.getElementById("udprintHeader");

        headerTable.rows(0).cells(1).innerHTML = "Udskrevet ";
        headerTable.rows(1).cells(1).innerHTML = sessionStorage.getItem("produktID");
        headerTable.rows(2).cells(1).innerHTML = "Recept nr";

        var endTable = document.getElementById("taraSum");

        endTable.rows(0).cells(1).innerHTML = "";
        endTable.rows(1).cells(1).innerHTML = "test2";

        if (data.batchStatus == 0){
            endTable.rows(2).cells(1).innerHTML = "Oprettet";
        } else if(data.batchStatus == 1){
            endTable.rows(2).cells(1).innerHTML = "Under Produktion";
        } else {
            endTable.rows(2).cells(1).innerHTML = "Afsluttet";
        }


        endTable.rows(3).cells(1).innerHTML = "test4";
        endTable.rows(4).cells(1).innerHTML = "test5";
    }
});