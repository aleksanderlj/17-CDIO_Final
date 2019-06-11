$(function(){

    $('#user_form').submit(function(e) {
        e.preventDefault();
        ajaxCreate()
    });

    function ajaxCreate() {
        jsondata = makeJSON()
        //alert("id: " + jsondata.id + "\nname: " + jsondata.name + "\nini: " + jsondata.ini + "\ncpr: " + jsondata.cpr)
        $.ajax({
            url : 'rest/useradmin/create',
            type : 'POST',
            data : datajson,
            contentType : 'application/json',
            success : function(data){
                datajsonParsed.id = data;
                addRow(datajsonParsed)
            },
            error : function(data){
                alert("Upload cancelled:\nPlease make sure that all necessary information was entered");
            }
        });
        return false;
    }

    function makeJSON(){
        json = {
            "id" : $('#user_id').val(),
            "name" : $('#user_name').val(),
            "ini" : $('#user_ini').val(),
            "cpr" : $('#user_cpr').val()
        };

        return json;
    }
});