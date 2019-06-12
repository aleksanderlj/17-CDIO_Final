//TODO Only one can be edited at a time? (Problem with radio buttons "name" making them all "one group")
//TODO Checkbox i stedet for radio buttons
//TODO RegEx på al data

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
                var jsonParsed = JSON.parse(jsondata);
                addRow(jsonParsed);
                sortTable();
                //alert(jsonParsed.navn);
            },
            error : function(data){
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
            error : function(data){
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
            error : function(data){
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
            error : function(data){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function ajaxDelete(row, id) {
        $.ajax({
            url : 'rest/user/delete/' + id,
            type : 'POST',
            success : function(data){
                deleteRow(row, id);
            },
            error : function(data){
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

        var jsonstring = JSON.stringify(json);

        return jsonstring;
    }

    //---------------------
    //-      VISUAL       -
    //---------------------
    // Adds a row to the webpage and sorts the table
    function addRow(data) {
        var table = document.getElementById("myTableData");

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

        row.cells[1].onclick = (function() {editMode(this, data.id)});
        row.cells[1].className = "namebtn";
    }

    function editMode(e, id){
        var row = e.closest('tr');
        var status = false;
        if (row.cells[4].innerHTML.localeCompare("Aktiv") === 0){
            status = true
        }

        row.cells[1].onclick = null;
        row.cells[1].className = null;

        for(var n=1 ; n < 4 ; n++){
            row.cells[n].contentEditable = "true";
        }

        row.cells[4].innerHTML = null;
        row.cells[4].appendChild(makeRadioBtn("aktiv", status));
        row.cells[4].appendChild(makeRadioBtn("inaktiv", !status));

        row.insertCell(5).appendChild(makeUpdateButton(id));
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
        btn.value = "Save";
        btn.onclick = (function() {saveRow(this, id)});
        return btn;
    }

    function saveRow(e, id){
        var row = e.closest('tr');

        var json = makeJSON(
            id,
            row.cells[1].innerHTML,
            row.cells[2].innerHTML,
            row.cells[3].innerHTML,
            row.cells[4].children[0].checked);

        row.cells[1].onclick = (function() {editMode(this, id)});
        row.cells[1].className = "namebtn";

        for(var n=1 ; n < 4 ; n++){
            row.cells[n].contentEditable = "false";
        }

        if(row.cells[4].children[0].checked){
            row.cells[4].innerHTML = "Aktiv";
        }else{
            row.cells[4].innerHTML = "Inaktiv";
        }

        row.deleteCell(5);

        ajaxUpdate(json);

    }

    // Deletes a row from the webpage
    function deleteRow(obj, id) {
        var index = obj.parentNode.parentNode.rowIndex;
        var table = document.getElementById("myTableData");
        table.deleteRow(index);
    }

    // Sorts the table (update this to be a merge-sort for epic speed)
    function sortTable() {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById("myTableData");
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

});