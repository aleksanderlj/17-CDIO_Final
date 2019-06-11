$(function(){

    $('#user_form').submit(function(e) {
        e.preventDefault();
        //ajaxCreate();
        ajaxGet("1");
    });

    function ajaxCreate() {
        jsondata = makeJSON();
        jsonParsed = JSON.parse(jsondata);
        //alert("id: " + jsondata.id + "\nname: " + jsondata.name + "\nini: " + jsondata.ini + "\ncpr: " + jsondata.cpr)
        $.ajax({
            url : 'rest/user/create',
            type : 'POST',
            data : jsonParsed,
            contentType : 'application/json',
            success : function(data){
                //addRow(datajsonParsed)
                alert(jsondata.navn);
            },
            error : function(data){
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function ajaxGet(id) {
        $.ajax({
            url : 'rest/user/getuser/' + id,
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

    function makeJSON(){
        json = {
            "id" : $('#user_id').val(),
            "navn" : $('#user_name').val(),
            "ini" : $('#user_ini').val(),
            "cpr" : $('#user_cpr').val()
        };

        return json;
    }
});