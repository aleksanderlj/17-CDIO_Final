$(function(){
    $('button[name=head_btn]').hide();

    $("#farmrole_btn").click(function(){
        loadMenu();
        $('button[name=head_btn]').show();
        $('#raavarer_head').prop("disabled", false);
        $('#recept_head').prop("disabled", false);
    });

    $("#prodrole_btn").click(function(){
        loadMenu();
        $('#logoff_btn').show();
        $('button[name=head_btn]').show();
        $('#raavarer_head').prop("disabled", true);
        $('#recept_head').prop("disabled", true);
    });

    $("#adminrole_btn").click(function(){
        loadUserControl();
        $('#logoff_btn').show();
    });

    function loadMenu(){
        $('#maincontainer').empty();
    }

    function loadUserControl(){
        $('#maincontainer').load("admin/brugere.html")
    }
});