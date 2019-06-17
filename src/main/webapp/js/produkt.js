$(function(){
    var receptlist;
    ajaxGetReceptList();

    $('#produkt_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
    });

    function ajaxCreate() {
        var jsondata = makeJSON(
            null,
            $('#pRecept_id').val(),
            0,
            null,
            null
        );

        $.ajax({
            url : 'rest/produktbatch/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                if (data === -1) {
                    //$('#user_id').closest("th").append(" ");
                    alert("ID er ikke korrekt!");
                } else {
                    var jsonParsed = JSON.parse(jsondata);
                    jsonParsed.id = data;
                    addRow(jsonParsed);
                    sortTable();
                }

            },
            error : function(){
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function ajaxUpdate(jsondata) {
        $.ajax({
            url : 'rest/produktbatch/update',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){

            },
            error : function(){
                alert("Update cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function ajaxGetList(){
        $.ajax({
            url : 'rest/produktbatch/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                for(var n=0 ; n<data.length ; n++){
                    addRow(data[n]);
                }
                sortTable();
            },
            error : function(){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function ajaxGetReceptList(){
        $.ajax({
            url : 'rest/recept/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                receptlist = data;
                ajaxGetList();
            },
            error : function(){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function makeJSON(id, receptId, batchStatus, opstartDato, slutDato){
        var json = {
            "id" : id,
            "receptId" : receptId,
            "batchStatus" : batchStatus,
            "opstartDato" : opstartDato,
            "slutDato" : slutDato
        };

        return JSON.stringify(json);
    }

    //---------------------
    //-      VISUAL       -
    //---------------------

    function addRow(data) {
        var table = document.getElementById("prod_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        var recept = $.grep(receptlist, function(e){ return e.id === data.receptId; })[0];

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = recept.navn;
        row.insertCell(2).innerHTML = data.batchStatus;
        row.insertCell(3).innerHTML = data.opstartDato;
        row.insertCell(3).innerHTML = data.slutDato;

        row.cells[1].onclick = (function() {seeInfo(this, data.id, recept)});
        row.cells[1].className = "namebtn";
    }


    function sortTable() {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById("prod_table");
        hasSwitched = true;

        while (hasSwitched) {
            hasSwitched = false;
            rows = table.rows;

            for (var i = 1; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    hasSwitched = true;
                    break;
                }
            }
        }
    }

    $('#pRecept_id').on("input", function() {
        this.value = id_valid(this.value);
    });

    function id_valid(str){
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 9){
            str = str.substring(0,9);
        }
        return str;
    }
});