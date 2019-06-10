$(function(){

    function ajaxCreate() {
        jsondata = makeJSON()
    }

    function makeJSON(id, name, ini, cpr){
        json = {
            "id" : $('#user_id').val(),
            "name" : $('#user_name').val(),
            "ini" : $('#user_ini').val(),
            "cpr" : $('#user_cpr').val()
        };

        return json;
    }
});