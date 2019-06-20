$(function(){
    var receptlist, raavarelist, raavarebatchlist, brugerlist;
    ajaxGetRaavareList();
    ajaxGetRaavarebatchList();
    ajaxGetBrugerList();

    ajaxGetReceptList();

    $('#produkt_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
    });

    function ajaxCreate() {
        var d = new Date();
        var date_string = (d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate()) + "/" +
                          ((d.getMonth()+1) < 10 ? "0" + (d.getMonth()+1) : "" + (d.getMonth()+1)) + "/" +
                           d.getFullYear();

        var jsondata = makeJSON(
            null,
            $('#recept_dropdown').val(),
            0,
            date_string,
            null
        );

        $.ajax({
            url : 'rest/produktbatch/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                if (data == "-1") {
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

    function ajaxGetRaavareList(){
        $.ajax({
            url : 'rest/raavare/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                raavarelist = data;
            },
            error : function(){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function ajaxGetBrugerList(){
        $.ajax({
            url : 'rest/user/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                brugerlist = data;
            },
            error : function(){
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function ajaxGetRaavarebatchList(){
        $.ajax({
            url : 'rest/raavarebatch/list',
            type : 'GET',
            dataType : 'json',
            success : function(data){
                raavarebatchlist = data;
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
                var dropdown = document.getElementById("recept_dropdown");
                makeDropdown(dropdown, receptlist);
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

    function ajaxGetKompList(id, recept_indhold){
        $.ajax({
            url : 'rest/produktbatchkomp/list/' + id,
            type : 'GET',
            dataType : 'json',
            success : function(data){
                addInfoRow(data, recept_indhold);
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

        var recept = $.grep(receptlist, function(e){ return e.id == data.receptId; })[0];

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = recept.navn;

        if (data.batchStatus == 0){
            row.insertCell(2).innerHTML = "Oprettet";
            row.cells[2].className = "inactive";
        } else if(data.batchStatus == 1){
            row.insertCell(2).innerHTML = "Under Produktion";
            row.cells[2].className = "under_prod";
        } else {
            row.insertCell(2).innerHTML = "Afsluttet";
            row.cells[2].className = "active";
        }

        row.insertCell(3).innerHTML = data.opstartDato;
        if (data.slutDato != null) {
            row.insertCell(4).innerHTML = data.slutDato;
        } else {
            row.insertCell(4).innerHTML = "-";
        }

        row.onclick = (function() {seeInfo(this, data.id, recept.indholdsListe)});
        //row.cells[1].className = "namebtn";
    }

    function seeInfo(e, produktbatchID, recept_indhold){
        $(".selected_row").toggleClass("selected_row");
        $(e).toggleClass("selected_row");

        var info_table = document.getElementById("KompHeaderID");
        for (var n=info_table.rows.length ; info_table.rows.length>1 ; n--){
            info_table.deleteRow(n-1);
        }

        /*
        for(var i=0 ; i<recept_indhold.length ; i++){
            addInfoRow(recept_indhold[i])
        }
        */

        ajaxGetKompList(produktbatchID, recept_indhold);
    }

    function addInfoRow(prodKompList, receptKomp) {
        var table = document.getElementById("KompHeaderID");

        for(var i=0 ; i<receptKomp.length ; i++) {
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            var raavare = $.grep(raavarelist, function (e) {return e.id == receptKomp[i].raavareId;})[0];
            var rBatch = $.grep(raavarebatchlist, function (e) {return e.id == receptKomp[i].raavareId;})[0];
            var pKomp = $.grep(prodKompList, function (e) {return e.raavareBatchID == rBatch.id;})[0];

            row.insertCell(0).innerHTML = raavare.navn;
            row.insertCell(1).innerHTML = receptKomp[i].nonNetto;
            row.insertCell(2).innerHTML = receptKomp[i].tolerance;
            if (pKomp == null) {
                row.insertCell(3).innerHTML = "";
                row.insertCell(4).innerHTML = "";
                row.insertCell(5).innerHTML = "";
                row.insertCell(6).innerHTML = "";
            } else {
                var bruger = $.grep(brugerlist, function(e){ return e.id == pKomp.brugerID; })[0];
                row.insertCell(3).innerHTML = pKomp.tara;
                row.insertCell(4).innerHTML = pKomp.netto;
                row.insertCell(5).innerHTML = pKomp.raavareBatchID;
                row.insertCell(6).innerHTML = bruger.navn;
            }
        }
    }

    function addExtraInfoRow(pkomp, recept_indhold) {
        var table = document.getElementById("KompHeaderID");

        var bruger = $.grep(brugerlist, function(e){ return e.id == pkomp.brugerID; })[0];
        var rBatch
        var raavare = $.grep(raavarelist, function(e){ return e.id == receptKomp.raavareId; })[0];

        var row;
        for (var n=0 ; n<table.rows.length ; n++){
            if (pkomp.raavareBatchID == table.rows[n].cells[0].innerHTML){
                row = table.rows[n];
                break;
            }
        }

        row.cells[3].innerHTML = pkomp.tara;
        row.cells[4].innerHTML = pkomp.netto;
        row.cells[5].innerHTML = pkomp.raavareBatchID;
        row.cells[6].innerHTML = bruger.navn;

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