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

        row.insertCell(0).innerHTML = $('#comp_raavare').val();
        row.insertCell(1).innerHTML = $('#comp_amount').val();
        row.insertCell(2).innerHTML = $('#comp_tolerance').val();
        row.insertCell(3).appendChild(makeRemoveRowBtn());
    }

    function makeRemoveRowBtn() {
        var removeBtn = document.createElement('input');
        removeBtn.type = "button";
        removeBtn.name = "removeRowBtn";
        removeBtn.value = "Fjern";
        removeBtn.onclick = (function() {removeRow(this)});
        return removeBtn;
    }

    function removeRow(obj) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("opretRecept2");
        table.deleteRow(index);
    }

});