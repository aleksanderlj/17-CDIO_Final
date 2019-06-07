$(function(){
    $('#menu_btn').click(function(){
        loadMenu();
    });

    function loadMenu(){
        $('#maincontainer').load("menu.html");
    }
});