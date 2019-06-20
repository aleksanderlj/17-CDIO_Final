$(function(){
    var raavarelist;

    ajaxGetRaavareList();
    ajaxGetReceptList();

    $('#recept_form').submit(function(e) {
        e.preventDefault();
        if (document.getElementById("opretRecept2").rows.length < 3){
            alert("Tilføj mindst én råvare først!")
        } else {
            ajaxCreate();
        }
    });

    $('#recept_form2').submit(function(e) {
        e.preventDefault();
        addKompRow();
        document.getElementById('comp_amount').value = '';
        document.getElementById('comp_tolerance').value = '';
    });

    function addKompRow() {
        var table = document.getElementById("opretRecept2");
        var row = table.insertRow(2);
        var ravare = $('#raavareID_dropdown').val();
        var amount = $('#comp_amount').val();
        var tole = $('#comp_tolerance').val();

        row.insertCell(0).innerHTML = ravare;
        row.insertCell(1).innerHTML = amount;
        row.insertCell(2).innerHTML = tole;
        row.insertCell(3).appendChild(makeRemoveRowBtn()); //TODO Videre her!
    }

    function makeRemoveRowBtn() {
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "fjernKomp";
        btn.value = "Fjern";
        btn.onclick = (function() {removeRow(this)});
        return btn;
    }

    function removeRow(obj) {
        var index = obj.closest("tr").rowIndex;
        var table = document.getElementById("opretRecept2");
        table.deleteRow(index);
    }


    function ajaxCreate() {
        var kompList = [];

        var komptable = document.getElementById("opretRecept2");
        var komp, row;
        for (var n=2 ; n<komptable.rows.length ; n++){
            row = komptable.rows[n];
            komp = makeKompJSON(
                row.cells[0].innerHTML,
                row.cells[1].innerHTML,
                row.cells[2].innerHTML
            );

            kompList.push(komp);
        }

        var jsondata = makeReceptJSON(
            $('#recept_nr').val(),
            $('#recept_name').val(),
            kompList
        );

        $.ajax({
            url : 'rest/recept/create',
            type : 'POST',
            data : jsondata,
            contentType : 'application/json',
            success : function(data){
                if (data === "-1") {
                    alert("ID allerede i brug!");
                } else {
                    var jsonParsed = JSON.parse(jsondata);
                    addReceptRow(jsonParsed);
                    sortTable("recept_table");
                }
            },
            error : function(){
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
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
                var dropdown = document.getElementById("raavareID_dropdown");
                makeDropdown(dropdown, raavarelist);
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
                for(var n=0 ; n<data.length ; n++){
                    addReceptRow(data[n]);
                }
                sortTable("recept_table");
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

    function makeReceptJSON(id, navn, komp){
        var json = {
            "id" : id,
            "navn" : navn,
            "indholdsListe" : komp
        };

        return JSON.stringify(json);
    }

    function makeKompJSON(raavareId, nonNetto, tolerance){
        var json = {
            "raavareId" : raavareId,
            "nonNetto" : nonNetto,
            "tolerance" : tolerance
        };

        return json; // TODO Big wow
    }

    function addReceptRow(data){
        var table = document.getElementById("recept_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;

        row.onclick = (function() {seeInfo(this, data)});
    }

    function seeInfo(e, recept){
        $(".selected_row").toggleClass("selected_row");
        $(e).toggleClass("selected_row");

        var info_table = document.getElementById("seReceptTableID");
        for (var n=info_table.rows.length ; info_table.rows.length>1 ; n--){
            info_table.deleteRow(n-1);
        }

        for (var i=0 ; i < recept.indholdsListe.length ; i++){
            addInfoRow(recept.indholdsListe[i])
        }
    }

    function addInfoRow(komp) {
        var table = document.getElementById("seReceptTableID");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var raavare = $.grep(raavarelist, function(e){ return e.id == komp.raavareId; })[0];

        row.insertCell(0).innerHTML = raavare.id;
        row.insertCell(1).innerHTML = raavare.navn;
        row.insertCell(2).innerHTML = komp.nonNetto;
        row.insertCell(3).innerHTML = komp.tolerance;
    }

    function sortTable(html_id) {
        var table, rows, hasSwitched, x, y;
        table = document.getElementById(html_id);
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