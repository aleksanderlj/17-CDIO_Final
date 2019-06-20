$(document).ready(function(){
    $('button[name=head_btn]').hide();

    $('#logoff_btn').click(function(){
        $('#maincontainer').load("frontpage.html");
        $(".selected_header_btn").toggleClass("header_btn selected_header_btn");
    });

    $('#raavarer_head').click(function(){
        $('#maincontainer').load("admin/raavarer.html");
        $(".selected_header_btn").toggleClass("header_btn selected_header_btn");
        $(this).toggleClass("header_btn selected_header_btn");
    });

    $('#recept_head').click(function(){
        $('#maincontainer').load("admin/recept.html");
        $(".selected_header_btn").toggleClass("header_btn selected_header_btn");
        $(this).toggleClass("header_btn selected_header_btn");
    });

    $('#raavarebatch_head').click(function(){
        $('#maincontainer').load("admin/raavarebatch.html");
        $(".selected_header_btn").toggleClass("header_btn selected_header_btn");
        $(this).toggleClass("header_btn selected_header_btn");
    });

    $('#prod_head').click(function(){
        $('#maincontainer').load("admin/produkt.html");
        $(".selected_header_btn").toggleClass("header_btn selected_header_btn");
        $(this).toggleClass("header_btn selected_header_btn");
    });
});