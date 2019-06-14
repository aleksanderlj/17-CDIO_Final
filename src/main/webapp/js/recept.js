$(function () {

    $('#recept_form').submit(function (e) {
        e.preventDefault();
    });


    $('#addrowbtn').click(function (e) {
        addIndholdRow();
        document.getElementById('comp_raavare').value = '';
        document.getElementById('comp_amount').value = '';
        document.getElementById('comp_tolerance').value = '';
    })

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

    function removeRow(obj) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("opretRecept2");
        table.deleteRow(index);
    }

    function seRecept(data) {
        var table = document.getElementById("seReceptTableID");

        var row = table.insertRow(0);
        row.insertCell(0).innerHTML = "";
        row.insertCell(1).innerHTML = data.id;
        row.insertCell(2).innerHTML = data.navn;
        row.insertCell(3).innerHTML = "";

        var row2 = table.insertRow(1);
        row2.insertCell(0).innerHTML = "Råvare ID";
        row2.insertCell(1).innerHTML = "Råvare navn";
        row2.insertCell(2).innerHTML = "Mængde";
        row2.insertCell(3).innerHTML = "Tolerance";

        var lul = data.raavare;
        addSeReceptRow(lul);
    }
    function addSeReceptRow(data) {
        var table = document.getElementById("seReceptTableID");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;
        row.insertCell(2).innerHTML = data.meangde;
        row.insertCell(3).innerHTML = data.tolerance;
    }
    function fjernRevept() {
        
    }

    function makeCloseSeReceptBTN() {
        var removeBtn = document.createElement('input');
        removeBtn.type = "button";
        removeBtn.name = "closeSeRecept";
        removeBtn.value = "Luk";
        removeBtn.onclick = (function() {fjernRevept(this)});
        return removeBtn;
    }
});