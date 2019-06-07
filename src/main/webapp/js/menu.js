$(function(){
    $('#rolemenu_btn').click(function(){
        loadFP();
    });

    $('#usermenu_btn').click(function(){
        loadBrugere();
    });

    $('#raavaremenu_btn').click(function(){
        loadRaavarer();
    });

    $('#receptmenu_btn').click(function(){
        loadRecept();
    });

    $('#raavarebatchmenu_btn').click(function(){
        loadRaavarebatch();
    });

    $('#prodmenu_btn').click(function(){
        loadProdukt();
    });

    function loadFP(){
        $('#maincontainer').load("frontpage.html");
    }

    function loadBrugere(){
        $('#maincontainer').load("admin/brugere.html");
    }

    function loadRaavarer(){
        $('#maincontainer').load("admin/raavarer.html");
    }

    function loadRecept(){
        $('#maincontainer').load("admin/recept.html");
    }

    function loadRaavarebatch(){
        $('#maincontainer').load("admin/raavarebatch.html");
    }

    function loadProdukt(){
        $('#maincontainer').load("admin/produkt.html");
    }

});