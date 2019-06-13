$(function(){

    $('#recept_form').submit(function(e) {
        e.preventDefault();
        addIndholdRow();
    });


    $('#tilføjknap').onclick(function () {
        addIndholdRow();
    })

    /*Tilføj række af indholdsstoffer*/
    function addIndholdRow(){
        var table = document.getElementById("opretRecept2");

        var rowCount = table.rows.length;

        var row = table.insertRow(rowCount);

        row.insertCell(0).innerHTML = $('#comp_raavare').val();
        row.insertCell(1).innerHTML = $('#comp_amount').val();
        row.insertCell(2).innerHTML = $('#comp_tolerance').val();
        row.insertCell(3).innerHTML = $('#comp_tolerance').val();
    }

    function makeRemoveRowBtn(id) {
        var removeBtn = document.createElement('remove');

        removeBtn.type = "button";
        removeBtn.name = "removeRowBtn"
        removeBtn.onclick = (function() {removeRow})
    }
});