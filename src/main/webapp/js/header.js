$(document).ready(function(){
    $('button[name=head_btn]').hide();

    $('#raavarer_head').click(function(){
        $('#maincontainer').load("admin/raavarer.html")
    });

    $('#recept_head').click(function(){
        $('#maincontainer').load("admin/recept.html")
    });

    $('#raavarebatch_head').click(function(){
        $('#maincontainer').load("admin/raavarebatch.html")
    });

    $('#prod_head').click(function(){
        $('#maincontainer').load("admin/produkt.html")
    });
});