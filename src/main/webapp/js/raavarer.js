$(function(){
    ajaxGetList();

    $('#raavare_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
    });

    function ajaxCreate() {
        var jsondata = makeJSON(
            $('#raavare_nr').val(),
            $('#raavare_name').val()
        );

        $.ajax({
            url : 'rest/raavare/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                if (data == "-1") {
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
            url : 'rest/raavare/update',
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
            url : 'rest/raavare/list',
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

    function makeJSON(id, navn){
        var json = {
            "id" : id,
            "navn" : navn
        };

        return JSON.stringify(json);
    }

    //---------------------
    //-      VISUAL       -
    //---------------------

    function addRow(data) {
        var table = document.getElementById("raavare_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;

        //row.onclick = (function() {editMode(this, data.id)});
        //row.cells[1].className = "namebtn";
    }

    function editMode(e, id){
        //var row = e.closest('tr');
        var row = e;

        row.onclick = null;
        //row.cells[1].className = null;

        var currenttext;
        for(var n=1 ; n < 2 ; n++){
            currenttext = row.cells[n].innerHTML;
            row.cells[n].innerHTML = null;
            row.cells[n].appendChild(makeInputField(currenttext));
        }

        $(row.cells[1].children[0]).on("input", function() {
            this.value = name_valid(this.value);
        });

        row.insertCell(2).appendChild(makeUpdateButton(id));
    }

    function makeInputField(val){
        var input = document.createElement('input');
        input.type = "text";
        input.required = true;
        input.value = val;
        return input;
    }

    function makeUpdateButton(id){
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "updatebutton";
        btn.className = "save_btn";
        btn.value = "Save";
        btn.onclick = (function() {saveRow(this, id)});
        return btn;
    }

    function saveRow(e, id){
        event.stopPropagation();
        var row = e.closest('tr');

        var json = makeJSON(
            id,
            name_valid(row.cells[1].children[0].value)
        );

        row.onclick = (function() {editMode(this, id)});
        //row.cells[1].className = "namebtn";

        var currenttext;
        for(var n=1 ; n < 2 ; n++){
            //row.cells[n].contentEditable = "false";
            currenttext = row.cells[n].children[0].value;
            row.cells[n].innerHTML = currenttext;
        }

        row.deleteCell(2);

        ajaxUpdate(json);
    }

    function sortTable() {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById("raavare_table");
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

    $('#raavare_nr').on("input", function() {
        this.value = id_valid(this.value);
    });

    function id_valid(str){
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 9){
            str = str.substring(0,9);
        }
        return str;
    }

    $('#raavare_name').on("input", function() {
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