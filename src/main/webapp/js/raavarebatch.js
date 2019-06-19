$(function(){
    var raavarelist;

    ajaxGetRaavareList();

    $('#raavareBatch_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
    });

    function ajaxCreate() {
        var jsondata = makeJSON(
            $('#rbatch_nr').val(),
            //$('#rbatch_raavare_nr').val(),
            $('#raavare_dropdown').val(),
            $('#rbatch_amount').val(),
            $('#rbatch_supplier').val()
        );

        $.ajax({
            url : 'rest/raavarebatch/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                if (data === "-1") {
                    //$('#user_id').closest("th").append(" ");
                    alert("ID er allerede i brug!");
                } else {
                    var jsonParsed = JSON.parse(jsondata);
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
            url : 'rest/raavarebatch/update',
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
            url : 'rest/raavarebatch/list',
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

    function ajaxGetRaavare(rbatch, row) {
        $.ajax({
            url : 'rest/raavare/get/' + rbatch.raavareId,
            type : 'GET',
            dataType : 'json',
            success : function(data){
                row.cells[1].innerHTML = data.navn;
                row.cells[1].onclick = (function() {editMode(this, rbatch.id, data.navn)});
                row.cells[1].className = "namebtn";
            },
            error : function(){
                alert("An unexpected error has occured: GET_ERROR");
            }
        });
        return false;
    }

    function ajaxGetRaavareList(){
        $.ajax({
            url : 'rest/raavare/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                raavarelist = data;
                var dropdown = document.getElementById("raavare_dropdown");
                makeDropdown(dropdown, raavarelist);
                ajaxGetList();
            },
            error : function(){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function makeDropdown(dropdown, list){
        for (var n=0 ; n<list.length ; n++){
            var option = document.createElement("option");
            option.value = list[n].id;
            option.innerHTML = "" + list[n].id + " - " + list[n].navn;
            dropdown.appendChild(option);
        }
    }

    function makeJSON(id, raavareid, maengde, leverandoer){
        var json = {
            "id" : id,
            "raavareId" : raavareid,
            "maengde" : maengde,
            "leverandoer" : leverandoer
        };

        return JSON.stringify(json);
    }

    //---------------------
    //-      VISUAL       -
    //---------------------

    function addRow(data) {
        var table = document.getElementById("rbatch_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        var raavare = $.grep(raavarelist, function(e){ return e.id == data.raavareId; })[0];

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = raavare.navn;
        row.insertCell(2).innerHTML = data.maengde;
        row.insertCell(3).innerHTML = data.leverandoer;

        //ajaxGetRaavare(data, row);

        row.onclick = (function() {editMode(this, data.id, raavare)});
        //row.cells[1].className = "namebtn";
    }

    function editMode(e, id, raavare){
        //var row = e.closest('tr');
        var row = e;

        row.onclick = null;
        //row.cells[1].className = null;

        var currenttext;
        for(var n=2 ; n < 4 ; n++){
            currenttext = row.cells[n].innerHTML;
            row.cells[n].innerHTML = null;
            row.cells[n].appendChild(makeInputField(currenttext));
        }

        $(row.cells[2].children[0]).on("input", function() {
            this.value = double_valid(this.value);
        });

        $(row.cells[3].children[0]).on("input", function() {
            this.value = name_valid(this.value);
        });

        row.insertCell(4).appendChild(makeUpdateButton(id, raavare));
    }

    function makeInputField(val){
        var input = document.createElement('input');
        input.type = "text";
        input.required = true;
        input.value = val;
        return input;
    }

    function makeUpdateButton(id, raavare){
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "updatebutton";
        btn.className = "save_btn";
        btn.value = "Save";
        btn.onclick = (function() {saveRow(this, id, raavare)});
        return btn;
    }

    function saveRow(e, id, raavare){
        event.stopPropagation();
        var row = e.closest('tr');

        var json = makeJSON(
            id,
            raavare.id,
            double_valid(row.cells[2].children[0].value),
            name_valid(row.cells[3].children[0].value)
        );

        row.onclick = (function() {editMode(this, id, raavare)});
        //row.cells[1].className = "namebtn";

        var currenttext;
        for(var n=2 ; n < 4 ; n++){
            //row.cells[n].contentEditable = "false";
            currenttext = row.cells[n].children[0].value;
            row.cells[n].innerHTML = currenttext;
        }

        row.deleteCell(4);

        ajaxUpdate(json);
    }

    function sortTable() {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById("rbatch_table");
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

    $('#rbatch_nr').on("input", function() {
        this.value = id_valid(this.value);
    });

    $('#rbatch_raavare_nr').on("input", function() {
        this.value = id_valid(this.value);
    });

    function id_valid(str){
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 9){
            str = str.substring(0,9);
        }
        return str;
    }

    $('#rbatch_amount').on("input", function() {
        this.value = double_valid(this.value);
    });

    function double_valid(str){
        str = str.replace(/(?![0-9]|[.,])./g, "");
        str = str.replace(/,/g, ".");
        str = str.replace(/(\.)(.+)(\1)/g, "$1$2");
        str = str.replace(/(\.)(\1)/g, "$1");
        str = str.replace(/(.*)([0-9]{3})\./g, "$2\.");
        if (str.length > 8){
            str = str.substring(0,9);
        }
        return str;
    }

    $('#rbatch_supplier').on("input", function() {
        this.value = name_valid(this.value);
    });

    function name_valid(str){
        str = str.replace(/(?![a-zA-Z0-9]|[æøåÆØÅ]|([- ])(?![- ]))./g, "");
        if (str.length > 255){
            str = str.substring(0,255);
        }

        if (str.charAt(0) === " " || str.charAt(0)=== "-") {
            str = str.substring(1, str.length - 1);
        }
        return str;
    }
});