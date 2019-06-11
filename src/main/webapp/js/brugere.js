$(function(){

    $('#user_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate();
        //ajaxGet(1);
        //ajaxDelete(8);
    });

    function ajaxCreate() {
        var jsondata = makeJSON();
        //jsonParsed = JSON.parse(jsondata);
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
                //addRow(datajsonParsed)
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

    function ajaxDelete(id) {
        $.ajax({
            url : 'rest/user/delete/' + id,
            type : 'POST',
            success : function(data){

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
});