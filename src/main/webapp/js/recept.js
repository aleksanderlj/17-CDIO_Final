$(function () {

    var raavarelist;

    $('#recept_form').submit(function (e) {
        e.preventDefault();
        //TODO Tag alle indholdsstoffer, receptID og navn og send til database;
    });


    $('#addrowbtn').click(function (e) {
        addIndholdRow();
        document.getElementById('comp_raavare').value = '';
        document.getElementById('comp_amount').value = '';
        document.getElementById('comp_tolerance').value = '';
    });

    /*Tilføj række af indholdsstoffer*/
    function addIndholdRow() {
        var table = document.getElementById("opretRecept2");
        var row = table.insertRow(2);
        var ravare = $('#comp_raavare').val();
        var amount = $('#comp_amount').val() + " kg";
        var tole = $('#comp_tolerance').val() + " %";

        row.insertCell(0).innerHTML = ravare;
        row.insertCell(1).innerHTML = amount;
        row.insertCell(2).innerHTML = tole;
        row.insertCell(3).appendChild(makeRemoveRowBtn());
    }
    function makeRemoveRowBtn() {
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "fjernKomp";
        btn.value = "Fjern";
        btn.onclick = (function() {removeRow(this)});
        return btn;
    }

    function removeRow(obj) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("opretRecept2");
        table.deleteRow(index);
    }

    function seRecept(data) {
        var table = document.getElementById("seReceptTableID");
        var x = document.getElementById("seReceptTableID").rows.length;
        for (var i = 0; i < x; i++){
            table.deleteRow(0);
        }
        var div = document.getElementById("seReceptdiv");
        if (div.style.display === "none") {
            div.style.display = "block";
        }
        var tableheader = document.getElementById("seReceptTableHeaderID");
        row = tableheader.rows[0];
        row.cells[0].innerHTML = "";
        row.cells[1].innerHTML = "Rigtig ID";
        row.cells[2].innerHTML = "Rigtig navn";
        row.cells[3].innerHTML = "";

        var data2 = data.indholdsListe;
        addSeReceptRow(data2);
    }

    function addSeReceptRow(data) {
        var table = document.getElementById("seReceptTableID");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        var raavare = $.grep(raavarelist, function(e){ return e.id === data.raavareId; })[0];

        row.insertCell(0).innerHTML = data.raavareId;
        row.insertCell(1).innerHTML = raavare.navn;
        row.insertCell(2).innerHTML = data.nonNetto;
        row.insertCell(3).innerHTML = data.tolerance;
    }

    function fjernRecept() {
        var div = document.getElementById("seReceptdiv");
        div.style.display = "none";
    }

    $('#lukRecept').click(function (e) {
        fjernRecept();
    });

    $('#seReceptBTN').click(function (e) {
        seRecept();
    });

    // trash nedenfor

    function makeCloseSeReceptBTN() {
        var removeBtn = document.createElement('input');
        removeBtn.type = "button";
        removeBtn.name = "closeSeRecept";
        removeBtn.value = "Luk";
        removeBtn.onclick = (function () {
            fjernRecept(this)
        });
        return removeBtn;
    }


});