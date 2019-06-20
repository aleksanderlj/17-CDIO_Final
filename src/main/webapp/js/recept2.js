$(function () {
    var raavarelist;

    ajaxGetRaavareList();
    ajaxGetReceptList();

    $('#recept_form').submit(function (e) {
        e.preventDefault();
        if (document.getElementById("opretRecept2").rows.length < 3) {
            alert("Tilføj mindst én råvare først!")
        } else {
            ajaxCreate();
        }
    });

    $('#recept_form2').submit(function (e) {
        e.preventDefault();
        addKompRow();
        document.getElementById('comp_amount').value = '';
        document.getElementById('comp_tolerance').value = '';
    });

    function addKompRow() {
        var table = document.getElementById("opretRecept2");
        var row = table.insertRow(2);
        var raavare = $('#raavareID_dropdown').val();
        $('#raavareID_dropdown').find('option[value='+raavare+']').remove();
        var amount = $('#comp_amount').val();
        var tole = $('#comp_tolerance').val();

        row.insertCell(0).innerHTML = raavare;
        row.insertCell(1).innerHTML = amount;
        row.insertCell(2).innerHTML = tole;
        row.insertCell(3).appendChild(makeRemoveRowBtn(raavare));
    }

    function makeRemoveRowBtn(raavareID) {
        var btn = document.createElement('input');
        btn.type = "button";
        btn.name = "fjernKomp";
        btn.value = "Fjern";
        btn.onclick = (function() {removeRow(this, raavareID)});
        return btn;
    }

    function removeRow(obj, raavareID) {
        var index = obj.closest("tr").rowIndex;
        var table = document.getElementById("opretRecept2");
        table.deleteRow(index);
        for (var n = 0; n < raavarelist.length; n++) {
            if (raavareID == raavarelist[n].id) {
                var option = document.createElement("option");
                option.value = raavarelist[n].id;
                option.innerHTML = "" + raavarelist[n].id + " - " + raavarelist[n].navn;
                var dropdown = document.getElementById("raavareID_dropdown");
                dropdown.appendChild(option);
                $("#raavareID_dropdown").html($("#raavareID_dropdown option").sort(function (a, b) {
                    return parseInt(a.text) == parseInt(b.text) ? 0 : parseInt(a.text) < parseInt(b.text) ? -1 : 1
                }))
            }
        }
    }


    function ajaxCreate() {
        var kompList = [];

        var komptable = document.getElementById("opretRecept2");
        var komp, row;
        for (var n = 2; n < komptable.rows.length; n++) {
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
            url: 'rest/recept/create',
            type: 'POST',
            data: jsondata,
            contentType: 'application/json',
            success: function (data) {
                if (data === "-1") {
                    alert("ID allerede i brug!");
                } else {
                    var jsonParsed = JSON.parse(jsondata);
                    addReceptRow(jsonParsed);
                    sortTable("recept_table");
                    var dropdown = document.getElementById("raavareID_dropdown");
                    makeDropdown(dropdown, raavarelist);
                    var indhold = document.getElementById("opretRecept2");
                    for (var i=indhold.rows.length; indhold.rows.length >2 ; i--){
                        indhold.deleteRow(i-1);
                    }
                }
            },
            error: function () {
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function ajaxGetRaavareList() {
        $.ajax({
            url: 'rest/raavare/list',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                raavarelist = data;
                var dropdown = document.getElementById("raavareID_dropdown");
                makeDropdown(dropdown, raavarelist);
            },
            error: function () {
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function ajaxGetReceptList() {
        $.ajax({
            url: 'rest/recept/list',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                for (var n = 0; n < data.length; n++) {
                    addReceptRow(data[n]);
                }
                sortTable("recept_table");
            },
            error: function () {
                alert("An unexpected error has occured: USERLIST_ERROR");
            }
        });
        return false;
    }

    function makeDropdown(dropdown, list){
        var reMade = false;
        for (var i=dropdown.length; i>0; i--){
            dropdown.remove(i);
            reMade = true
        }
        for (var n=0 ; n<list.length ; n++){
            var option = document.createElement("option");
            option.value = list[n].id;
            option.innerHTML = "" + list[n].id + " - " + list[n].navn;
            dropdown.appendChild(option);
        }
        if (reMade){
            dropdown.remove(0);
        }

    }

    function makeReceptJSON(id, navn, komp) {
        var json = {
            "id": id,
            "navn": navn,
            "indholdsListe": komp
        };

        return JSON.stringify(json);
    }

    function makeKompJSON(raavareId, nonNetto, tolerance) {
        var json = {
            "raavareId": raavareId,
            "nonNetto": nonNetto,
            "tolerance": tolerance
        };

        return json;
    }

    function addReceptRow(data) {
        var table = document.getElementById("recept_table");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.id = "row" + data.id;

        row.insertCell(0).innerHTML = data.id;
        row.insertCell(1).innerHTML = data.navn;

        row.onclick = (function () {
            seeInfo(this, data)
        });
    }

    function seeInfo(e, recept) {
        var x = document.getElementById("seReceptdiv");
        if (x.style.display === "none") {
            x.style.display = "block";
        }
        $(".selected_row").toggleClass("selected_row");
        $(e).toggleClass("selected_row");

        var info_table = document.getElementById("seReceptTableID");
        for (var n = info_table.rows.length; info_table.rows.length > 1; n--) {
            info_table.deleteRow(n - 1);
        }

        for (var i = 0; i < recept.indholdsListe.length; i++) {
            addInfoRow(recept.indholdsListe[i])
        }
    }

    function addInfoRow(komp) {
        var table = document.getElementById("seReceptTableID");

        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        var raavare = $.grep(raavarelist, function (e) {
            return e.id == komp.raavareId;
        })[0];

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

    $('#lukRecept').click(function (e) {
        var div = document.getElementById("seReceptdiv");
        div.style.display = "none";
    });


    $('#recept_nr').on("input", function () {
        this.value = id_valid(this.value);
        //id_valid(this);
    });

    function id_valid(str) {
        //var str = e.value;
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 9) {
            str = str.substring(0, 9);
        }
        //e.value = str;
        return str;
    }

    $('#recept_name').on("input", function () {
        this.value = name_valid(this.value);
    });

    function name_valid(str) {
        str = str.replace(/(?![a-zA-Z0-9]|[æøåÆØÅ]|([- ])(?![- ]))./g, "");
        if (str.length > 255) {
            str = str.substring(0, 255);
        }

        if (str.charAt(0) === " " || str.charAt(0) === "-") {
            str = str.substring(1, str.length - 1);
        }
        return str;
    }

    $('#comp_amount').on("input", function () {
        this.value = double_valid(this.value);
    });

    function double_valid(str) {
        str = str.replace(/(?![0-9]|[.,])./g, "");
        str = str.replace(/,/g, ".");
        str = str.replace(/(\.)(.+)(\1)/g, "$1$2");
        str = str.replace(/(\.)(\1)/g, "$1");
        str = str.replace(/(.*)([0-9]{3})\./g, "$2\.");
        if (str.length > 8) {
            str = str.substring(0, 9);
        }
        return str;
    }

    $('#comp_tolerance').on("input", function () {
        this.value = percent_valid(this.value);
        //id_valid(this);
    });

    function percent_valid(str) {
        //var str = e.value;
        str = str.replace(/(?![0-9])./g, "");
        if (str.length > 3) {
            str = str.substring(0, 3);
        }
        //e.value = str;
        return str;
    }

});