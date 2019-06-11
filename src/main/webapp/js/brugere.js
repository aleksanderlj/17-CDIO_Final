$(function(){

    $('#user_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
        //ajaxGet(1);
        //ajaxDelete(8);
    });

    function ajaxCreate() {
        var jsondata = makeJSON();
        //alert("id: " + jsondata.id + "\nnavn: " + jsondata.navn + "\nini: " + jsondata.ini + "\ncpr: " + jsondata.cpr + "\naktiv: " + jsondata.aktiv);
        /*alert("jsondata.navn: " + jsondata.navn +
            "\njsonParsed.navn: " + jsonParsed.navn +
            "\njsondata[navn]: " + jsondata["navn"] +
            "\njsonParsed[navn]: " + jsonParsed["navn"]);
            */
        //alert(jsondata);
        $.ajax({
            url : 'rest/user/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                var jsonParsed = JSON.parse(jsondata);
                addRow(jsonParsed)
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

    function makeJSON(){
        var json = {
            "id" : $('#user_id').val(),
            "navn" : $('#user_name').val(),
            "ini" : $('#user_ini').val(),
            "cpr" : $('#user_cpr').val(),
            "aktiv" : true
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
        //row.insertCell(1).appendChild(makeNametagButton(data.id, data.navn));
        row.insertCell(2).innerHTML = data.ini;
        row.insertCell(3).innerHTML = data.cpr;
        row.insertCell(4).innerHTML = aktiv;
        //row.insertCell(4).appendChild(makeDeleteButton(data.id));
        //row.insertCell(5).appendChild(makeUpdateButton(data.id));

        row.cells[1].onclick = (function() {editMode(this)});
        row.cells[1].className = "namebtn";
        sortTable();

    }

    // Creates a button for deleting a row on the webpage
    function makeDeleteButton(id){
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "deletebutton";
        btn.value = "Gør inaktiv";

        btn.onclick = (function() {ajaxDelete(this, id)});

        return btn;
    }

    function makeNametagButton(id, name){
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "namebutton";
        btn.value = name;
        btn.className = "namebtn";
        btn.onclick = (function() {editMode(this)});
        return btn;
    }

    function editMode(e){
        var row = e.closest('tr');
        alert(row.rowIndex);
        for(var n=1 ; n < 4 ; n++){
            row.cells[n].contentEditable = "true";
        }
        alert(row.cells[0].innerHTML);
        row.cells[1].onclick = (function() {editMode(this)});
    }

    // Creates a button for updating a row on the webpage
    function makeUpdateButton(id){
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "updatebutton";
        btn.value = "Update";
        btn.onclick = (function() {});
        return btn;
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
                x = rows[i].getElementsByTagName("TD")[1];
                y = rows[i + 1].getElementsByTagName("TD")[1];

                if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    hasSwitched = true;
                    break;
                }
            }
        }
    }

});