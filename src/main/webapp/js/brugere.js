$(function(){
    $('#menu_btn').click(function(){
        loadMenu();
    });

    function loadMenu(){
        $('#maincontainer').load("frontpage.html");
    }
});