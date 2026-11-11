$(document).ready(function() {

    if(window.location.href.split('#')['1']){
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $("li[data-tab=" + window.location.href.split('#')['1'] + "]").addClass('current');
        $("#"+window.location.href.split('#')['1']).fadeIn().addClass('current');
    }

    $('ul.tabs li').click(function(){

        var tab_id = $(this).attr('data-tab');

        $("html, body").stop().animate({scrollTop:0});

        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).fadeIn().addClass('current');
    });
    
});