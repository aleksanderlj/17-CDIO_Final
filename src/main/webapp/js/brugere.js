$(function(){

    ajaxGetList();

    $('#user_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
        //ajaxGet(1);
        //ajaxDelete(8);
    });

    function ajaxCreate() {
        var jsondata = makeJSON(
            $('#user_id').val(),
            $('#user_name').val(),
            $('#user_ini').val(),
            $('#user_cpr').val(),
            true);
        /*alert("jsondata.navn: " + jsondata.navn +
            "\njsonParsed.navn: " + jsonParsed.navn +
            "\njsondata[navn]: " + jsondata["navn"] +
            "\njsonParsed[navn]: " + jsonParsed["navn"]);
            */
        $.ajax({
            url : 'rest/user/create',
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
                //alert(jsonParsed.navn);
            },
            error : function(){
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function ajaxGet(id) {
        $.ajax({
            url : 'rest/user/get/' + id,
            type : 'GET',
            dataType : 'json',
            success : function(data){
                alert(data.navn);
            },
            error : function(){
                alert("An unexpected error has occured: GET_ERROR");
            }
        });
        return false;
    }

    function ajaxUpdate(jsondata) {
        $.ajax({
            url : 'rest/user/update',
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
            url : 'rest/user/list',
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

    function ajaxDelete(row, id) {
        $.ajax({
            url : 'rest/user/delete/' + id,
            type : 'POST',
            success : function(){
                deleteRow(row, id);
            },
            error : function(){
                alert("An unexpected error has occured: DELETE_ERROR");
            }
        });
        return false;
    }

    function makeJSON(id, navn, ini, cpr, aktiv){
        var json = {
            "id" : id,
            "navn" : navn,
            "ini" : ini,
            "cpr" : cpr,
            "aktiv" : aktiv
        };

        return JSON.stringify(json);
    }

    //---------------------
    //-      VISUAL       -
    //---------------------
    // Adds a row to the webpage and sorts the table
    function addRow(data) {
        var table = document.getElementById("user_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        var aktiv;
        if(data.aktiv){
            aktiv = "Aktiv"
        } else{
            aktiv = "Inaktiv"
        }

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;
        row.insertCell(2).innerHTML = data.ini;
        row.insertCell(3).innerHTML = data.cpr;
        row.insertCell(4).innerHTML = aktiv;

        if(data.aktiv){
            row.cells[4].className = "active";
        } else{
            row.cells[4].className = "inactive";
        }

        row.onclick = (function() {editMode(this, data.id)});
        //row.className = "namebtn";
    }

    function editMode(e, id){
        //var row = e.closest('tr');
        var row = e;
        var status = false;
        if (row.cells[4].innerHTML.localeCompare("Aktiv") === 0){
            status = true
        }

        row.onclick = null;
        //row.className = null;

        var currenttext;
        for(var n=1 ; n < 4 ; n++){
            //row.cells[n].contentEditable = "true";
            currenttext = row.cells[n].innerHTML;
            row.cells[n].innerHTML = null;
            row.cells[n].appendChild(makeInputField(currenttext));
        }

        $(row.cells[1].children[0]).on("input", function() {
            this.value = name_valid(this.value);
            //name_valid(this);
        });

        $(row.cells[2].children[0]).on("input", function() {
            this.value = ini_valid(this.value);
            //ini_valid(this);
        });

        $(row.cells[3].children[0]).on("input", function() {
            this.value = cpr_valid(this.value);
            //cpr_valid(this);
        });


        row.cells[4].innerHTML = null;
        row.cells[4].appendChild(makeCheckbox(status));
        row.cells[4].className = null;
        //row.cells[4].appendChild(makeRadioBtn("aktiv", status));
        //row.cells[4].appendChild(makeRadioBtn("inaktiv", !status));

        row.insertCell(5).appendChild(makeUpdateButton(id));
    }

    function makeInputField(val){
        var input = document.createElement('input');
        input.type = "text";
        input.required = true;
        input.value = val;
        return input;
    }

    function makeCheckbox(checked){
        var btn = document.createElement('input');
        btn.type = "checkbox";
        btn.checked = checked;
        return btn;
    }

    function makeRadioBtn(value, checked) {
        var btn = document.createElement('input');
        btn.type = "radio";
        btn.name = "status_radio";
        btn.value = value;
        btn.className = "radiobtn" + value;
        btn.checked = checked;
        return btn;
    }

    // Creates a button for updating a row on the webpage
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
            /*row.cells[1].innerHTML,
            row.cells[2].innerHTML,
            row.cells[3].innerHTML,*/
            name_valid(row.cells[1].children[0].value),
            ini_valid(row.cells[2].children[0].value),
            cpr_valid(row.cells[3].children[0].value),
            row.cells[4].children[0].checked
        );

        row.onclick = (function() {editMode(this, id)});
        //row.className = "namebtn";

        var currenttext;
        for(var n=1 ; n < 4 ; n++){
            //row.cells[n].contentEditable = "false";
            currenttext = row.cells[n].children[0].value;
            row.cells[n].innerHTML = currenttext;
        }

        if(row.cells[4].children[0].checked){
            row.cells[4].innerHTML = "Aktiv";
            row.cells[4].className = "active";
        }else{
            row.cells[4].innerHTML = "Inaktiv";
            row.cells[4].className = "inactive";
        }

        row.deleteCell(5);

        ajaxUpdate(json);

    }

    // Deletes a row from the webpage
    function deleteRow(obj) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("user_table");
        table.deleteRow(index);
    }

    // Sorts the table (update this to be a merge-sort for epic speed)
    function sortTable() {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById("user_table");
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

    //-----------------------
    //     INPUT CHECKS
    //-----------------------

    $('#user_id').on("input", function() {
        this.value = id_valid(this.value);
        //id_valid(this);
    });

    function id_valid(str){
        //var str = e.value;
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 9){
            str = str.substring(0,9);
        }
        //e.value = str;
        return str;
    }

    $('#user_name').on("input", function() {
        this.value = name_valid(this.value);
    });

    function name_valid(str){
        str = str.replace(/(?![a-zA-Z]|[æøåÆØÅ]|([- ])(?![- ]))./g, "");
        if (str.length > 255){
            str = str.substring(0,255);
        }

        if (str.charAt(0) === " " || str.charAt(0)=== "-") {
            str = str.substring(1, str.length - 1);
        }
        return str;
    }

    $('#user_ini').on("input", function() {
        this.value = ini_valid(this.value);
    });

    function ini_valid(str){
        str = str.replace(/(?![a-zA-Z]|[æøåÆØÅ])./g, "");
        if (str.length > 10){
            str = str.substring(0,10);
        }
        str = str.toUpperCase();
        return str;
    }

    $('#user_cpr').on("input", function() {
        this.value = cpr_valid(this.value);
    });

    function cpr_valid(str){
        str = str.replace(/(?![0-9]|([0-9]{6}(?!-)))./g, "");
        str = str.replace(/([0-9]{6})([0-9])/, "$1-$2");
        if (str.length > 11){
            str = str.substring(0,11);
        }
        return str;
    }
});