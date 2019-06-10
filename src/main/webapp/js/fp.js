$(function(){
    $("#farmrole_btn").click(function(){
        loadMenu();
    });

    $("#prodrole_btn").click(function(){
        loadMenu();
    });

    $("#adminrole_btn").click(function(){
        loadUserControl();
    });

    function loadMenu(){
        $('#maincontainer').load("menu.html");
    }

    function loadUserControl(){
        $('#maincontainer').load("admin/brugere.html")
    }


});