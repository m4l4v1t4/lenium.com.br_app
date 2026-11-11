$(document).ready(function(){

    $(document).scroll(function (){
        
        var top_scroll = $(window).scrollTop();
        
        if(top_scroll > 80){
            
            $('.topo-site').removeClass('tmn-logo-' + config_tema['tmn_logo']).addClass('tmn-logo-4').css({'position': 'fixed', 'top': '0'});
            $('.pos-data-topo').css({'position': 'fixed', 'top': '0'});
            $('.data-topo-S').css({'top': '25px'});
            
        } else {
            
            $('.topo-site').removeClass('tmn-logo-4').addClass('tmn-logo-' + config_tema['tmn_logo']).css({'position': 'relative'});
            $('.pos-data-topo').css({'position': 'relative'});
            $('.data-topo-S').css({'top': '0'});
            
        }
        
    });

    var click_busca = 0;
    $(".ico-busca").on('click', function(){
        
        click_busca++;
        
        if(click_busca % 2 == 0){
            
            $(".box-busca").blur();
            
        } else {
            
            $(".box-busca").focus();
            
        }
        
    });

    if(config_tema['menu_topo'] == 'S'){
        
        var totalWidthMenu = 10;
        $('.menu-topo li').each(function(){
            totalWidthMenu += $(this).innerWidth();
        });
        
        $('.menu-topo').width(totalWidthMenu + 'px');
        
    }

    function ads_mobile(str){
        if(str == "carrega"){
            if(window.innerWidth <= 450){
                for (let i = 0; i < $(".ads-img-mobile").length; i++) {
                    $(".ads-img-mobile").eq(i).attr("src", $(".ads-img-mobile").eq(i).data("ads-mobile"));
                    $(".ads-img-mobile").eq(i).attr("src", $(".ads-img-mobile").eq(i).data("ads-mobile"));
                }
                
                for (let i = 0; i < $(".no-ads-item").length; i++) {
                    $(".no-ads-item img").eq(i).attr("src", $(".no-ads-item img").eq(i).data("no-ads-mobile"));
                }
            }
        }
        
        if(str == "gira"){
            if(window.innerWidth <= 450){
                for (let i = 0; i < $(".ads-img-mobile").length; i++) {
                    $(".ads-img-mobile").eq(i).attr("src", $(".ads-img-mobile").eq(i).data("ads-desktop"));
                }
                
                for (let i = 0; i < $(".no-ads-item").length; i++) {
                    $(".no-ads-item img").eq(i).attr("src", $(".no-ads-item img").eq(i).data("no-ads-desktop"));
                }
            } else {
                for (let i = 0; i < $(".ads-img-mobile").length; i++) {
                    $(".ads-img-mobile").eq(i).attr("src", $(".ads-img-mobile").eq(i).data("ads-mobile"));
                }
                
                for (let i = 0; i < $(".no-ads-item").length; i++) {
                    $(".no-ads-item img").eq(i).attr("src", $(".no-ads-item img").eq(i).data("no-ads-mobile"));
                }
            }
        }
    }
    
    ads_mobile("carrega");
    
    window.addEventListener('orientationchange', doOnOrientationChange);
    function doOnOrientationChange(){
        
        ads_mobile("gira");
        
    }
    
    for (let i = 1; i < 11; i++) {
        if($('.ads-' + i + ' .itens-ads .item-ads').length > 1){
            
            setInterval(function(){
                $('.ads-' + i + ' .itens-ads > :first-child').fadeOut(function() {
                    $(this).next('.item-ads').fadeIn().end().appendTo('.ads-' + i + ' .itens-ads');
                });
            }, config_tema['tempo_ads']);
        }
    }
    
    $(".pos-ads-popup").on('click', function () {
        
        $(this).fadeOut();
        
    });
    
    if(config_tema['itens_slide'] > 1 && config_tema['home'] == 'S'){
        
        $(".slide-dest-" + config_tema['not_pr']).owlCarousel({
            items: 1,
            loop: !0,
            autoplay: !0,
            autoplayTimeout: 7e3,
            nav: !0,
            autoplayHoverPause: !0
        });
        
    }
    
    if(window.innerWidth <= 980 && config_tema['not_pr'] == 2){
        
        $('.slide-dest-2').insertAfter('.pos-manchetes-2-2');
        
    }

    $('.pos-enquete').each(function(i, element){

        var ths = $(this);

        var data = [];
        data.push({name: 'acao', value: 'dados_enquete'});
        data.push({name: 'enquete_id', value: $(this).data('id')});

        $.ajax({
            url: config_tema['url_site'] + "/tema/v11/api.php",
            type: "POST",
            data: data,
            success: function(data){

                ths.find('.load-enquete').remove();

                ths.find('.titulo-enquete').text(data['titulo']);
                ths.find('.total-votos-enquete').text(data['votos']);

                $('.pos-itens-enquete').html('');

                $(data['opcoes']).each(function(i, element){

                    if(data['fotos'] == 'N'){

                        $('.pos-itens-enquete').append('<div class="opcao-enquete">' +
                            '<input type="radio" id="' + element['id'] + '" name="opcao" value="' + element['id'] + '">' +
                            '<label for="' + element['id'] + '">' +
                                '<div class="select-enquete">' +
                                    '<span class="icons-pad ico-pad-radio-unchecked"></span>' +
                                '</div>' +
                                '<div class="desc-opcao-enquete">' +
                                    '<p>' + element['titulo'] + '</p>' +
                                    '<p>' + element['votos'] + '</p>' +
                                '</div>' +
                                '<div class="progress-item-enquete">' +
                                    '<div class="data-progress-item-enquete" style="width: ' + element['porcentagem'] + '%;"></div>' +
                                '</div>' +
                            '</label>' +
                        '</div>');

                    } else {

                        $('.pos-itens-enquete').append('<div class="opcao-enquete opcao-enquete-img">' +
                            '<input type="radio" id="' + element['id'] + '" name="opcao" value="' + element['id'] + '">' +
                            '<label for="' + element['id'] + '">' +
                                '<div class="select-enquete">' +
                                    '<span class="icons-pad ico-pad-checkbox-checked"></span>' +
                                    '<img src="' + element['foto'] + '" alt="' + element['desc_foto'] + '" />' +
                                    '<div class="desc-foto-enquete">' +
                                        '<span>' + element['desc_foto'] + '</span>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="desc-opcao-enquete">' +
                                    '<p>' + element['titulo'] + '</p>' +
                                    '<p>' + element['votos'] + '</p>' +
                                '</div>' +
                                '<div class="progress-item-enquete">' +
                                    '<div class="data-progress-item-enquete" style="width: ' + element['porcentagem'] + '%;"></div>' +
                                '</div>' +
                            '</label>' +
                        '</div>');

                    }

                });

            }

        });

    });

    $(".pos-enquete").submit(function(e){

        e.preventDefault();

        var data = $(this).serializeArray();
        data.push({name: 'acao', value: 'vota_enquete'});
        data.push({name: 'enquete_id', value: $(this).data('id')});

        a = $("input:radio", this);
        a.is(":checked") || alert("Escolha uma opção");

        if($(this).find('input[name="opcao"]:checked').val()){

            $('.botao-enquete').html('<span class="icons-pad ico-pad-spinner2"></span>');
            
            $.ajax({
                url: config_tema['url_site'] + "/tema/v11/api.php",
                type: "POST",
                data: data,
                success: function(data){

                    $('.msg-enquete').removeClass('sucesso-enquete').removeClass('erro-enquete');

                    if(data['error'] == 0){

                        $('.total-votos-enquete').text(data['total_votos']);

                        $('.pos-itens-enquete').html('');

                        $(data['opcoes']).each(function(i, element){

                            if(data['enquete_foto'] == 'N'){

                                $('.pos-itens-enquete').append('<div class="opcao-enquete">' +
                                    '<input type="radio" id="' + element['id'] + '" name="opcao" value="' + element['id'] + '">' +
                                    '<label for="' + element['id'] + '">' +
                                        '<div class="desc-opcao-enquete">' +
                                            '<p>' + element['titulo'] + '</p>' +
                                            '<p>' + element['votos'] + '</p>' +
                                        '</div>' +
                                        '<div class="progress-item-enquete">' +
                                            '<div class="data-progress-item-enquete" style="width: ' + element['porcentagem'] + '%;"></div>' +
                                        '</div>' +
                                    '</label>' +
                                '</div>');

                            } else {

                                $('.pos-itens-enquete').append('<div class="opcao-enquete opcao-enquete-img">' +
                                    '<input type="radio" id="' + element['id'] + '" name="opcao" value="' + element['id'] + '">' +
                                    '<label for="' + element['id'] + '">' +
                                        '<div class="select-enquete">' +
                                            '<img src="' + element['foto'] + '" alt="' + element['desc_foto'] + '" />' +
                                            '<div class="desc-foto-enquete">' +
                                                '<span>' + element['desc_foto'] + '</span>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="desc-opcao-enquete">' +
                                            '<p>' + element['titulo'] + '</p>' +
                                            '<p>' + element['votos'] + '</p>' +
                                        '</div>' +
                                        '<div class="progress-item-enquete">' +
                                            '<div class="data-progress-item-enquete" style="width: ' + element['porcentagem'] + '%;"></div>' +
                                        '</div>' +
                                    '</label>' +
                                '</div>');

                            }

                        });
                        
                        $('.msg-enquete').addClass('sucesso-enquete').text(data['msg']);

                        $('.pos-enquete .g-recaptcha').css('display', 'none');
                        $('.botao-enquete').css('display', 'none');

                    } else {

                        grecaptcha.reset();

                        $('.botao-enquete').html('Votar');

                        $('.msg-enquete').addClass('erro-enquete').text(data['msg']);

                    }

                    $('.pos-enquete').stop().animate({
                        scrollTop: 0
                    }, 800);

                    setTimeout(function() {
                        
                        $('.msg-enquete').removeClass('sucesso-enquete').removeClass('erro-enquete').text('');

                    }, 5000);

                }

            });

        }

    });

    if(window.innerWidth > 980 && config_tema['lateral_interna'] == 'S'){

        $(window).scroll(function(){

            var htmlBody = $('html, body');

            if(config_tema['home'] == "N"){

                var envInter = $(".env-conteudo-interno");
                var contInter = $(".conteudo-interno");
                var latInter = $(".lateral-interna");
                var rodInter = $(".rodape");
                var fixLatInter = $(".fix-lateral-interna");

                envInter.css("min-height", contInter.height() + "px");
                contInter.css("min-height", $(window).height() - 100);

                if(contInter.height() < latInter.height()){

                    if((htmlBody.scrollTop() - contInter.height() + ($(window).height() - envInter.offset().top) >= 0) && htmlBody.scrollTop() >= envInter.offset().top){
                        
                        if($(window).height() > contInter.height()){

                            contInter.addClass("fixar-cont-int-top");

                        } else {

                            contInter.addClass("fixar-cont-int-bottom");

                        }
                        

                    } else {

                        contInter.removeClass("fixar-cont-int-top");
                        contInter.removeClass("fixar-cont-int-bottom");

                    }

                    if($(window).scrollTop() > rodInter.offset().top - $(window).height()){

                        contInter.removeClass("fixar-cont-int-top");
                        contInter.removeClass("fixar-cont-int-bottom");
                        contInter.addClass("fixar-cont-int-rod");
                        
                    } else {

                        contInter.removeClass("fixar-cont-int-rod");

                    }

                } else {

                    if((htmlBody.scrollTop() - latInter.height() + ($(window).height() - envInter.offset().top) >= 0) && htmlBody.scrollTop() >= envInter.offset().top){

                        fixLatInter.addClass("fixar-lateral-interna");

                        if($(window).height() > latInter.height()){

                            latInter.addClass("fixar-lat-int-top");

                        } else {

                            latInter.addClass("fixar-lat-int-bottom");

                        }

                    } else {

                        latInter.removeClass("fixar-lat-int-top");
                        latInter.removeClass("fixar-lat-int-bottom");
                        fixLatInter.removeClass("fixar-lateral-interna");

                    }

                    if($(window).scrollTop() > rodInter.offset().top - $(window).height()){

                        latInter.removeClass("fixar-lat-int-top");
                        latInter.removeClass("fixar-lat-int-bottom");
                        fixLatInter.removeClass("fixar-lateral-interna");
                        latInter.addClass("fixar-lat-int-rod");

                    } else {

                        latInter.removeClass("fixar-lat-int-rod");
                        
                    }

                }

            }

        });

    }

    if(config_tema['wid_loterias'] == 'S'){

        $(".owl-loterias").owlCarousel({
            items: 1,
            loop: !0,
            autoHeight: true,
            nav: !0
        });

    }

    if(config_tema['pg_classificados'] == "S"){

        $(".categorias-class").owlCarousel({
            loop: 1,
            nav: !0,
            autoplay: 1,
            autoplayHoverPause: !0,
            margin: 0,
            responsive: {
                0: {
                    items: 2
                },
                750: {
                    items: 3
                },
                1110: {
                    items: 5
                }
            }
        });

    }

    if(config_tema['conteudo_classificado'] == "S"){

        $('.pgwSlider').pgwSlider({
            listPosition: 'left',
            autoSlide: false
        });

        $('.pgwSlider').css('opacity', 1);
        $('.slide-class').css('background', 'transparent');

    }

    $(".botoes-compartilhar .itens-botoes-compartilhar span").click(function() {

        window.open($(this).data("href"), '_blank', 'height=600, width=600, left=' + (window.innerWidth - 600 ) / 2 + ', top=' + (window.innerHeight - 600) / 2);

    });

    $(".senha").bind('keyup', function(){

        var txt = $(this).val();
        var forca = 0;

        if(txt.length > 6) {
            forca += 25;
        }

        var reg = new RegExp(/[a-z]/i);

        if(reg.test(txt)) {
            forca += 25;
        }

        var reg = new RegExp(/[0-9]/i);

        if(reg.test(txt)) {
            forca += 25;
        }

        var reg = new RegExp(/[^a-z0-9]/i);

        if(reg.test(txt)) {
            forca += 25;
        }
        
        if(forca == 25){

            $('.forca-senha-0').addClass('forca-senha-1');
            $('.forca-desc').html('Força da senha: Fraca');

        } else {

            $('.forca-desc').html('');
            $('.forca-senha-0').removeClass('forca-senha-1');

        }
        
        if(forca == 50){

            $('.forca-senha-0').addClass('forca-senha-2');
            $('.forca-desc').html('Força da senha: Mediana');

        } else {

            $('.forca-senha-0').removeClass('forca-senha-2');

        }
        
        if(forca == 75){

            $('.forca-senha-0').addClass('forca-senha-3');
            $('.forca-desc').html('Força da senha: Boa');

        } else {

            $('.forca-senha-0').removeClass('forca-senha-3');

        }
        
        if(forca == 100){

            $('.forca-senha-0').addClass('forca-senha-4');
            $('.forca-desc').html('Força da senha: Excelente');

        } else {

            $('.forca-senha-0').removeClass('forca-senha-4');

        }
        
        if(forca >= 75) {

            document.getElementById('senha').setCustomValidity('');
            $('#senha').removeClass('borda-erro');

        } else {

            document.getElementById('senha').setCustomValidity('A força da senha deve ser no mínimo "Boa"');
            $('#senha').addClass('borda-erro');

        }
    
    });

    $('.telefone').bind('keyup', function(){
        var vtel = $(this).val();
        if(vtel.length < 15) {
            $('.telefone').mask('(00) 0000-00000');
        } else {
            $('.telefone').mask('(00) 00000-0000');
        }
    });

    $('.money').bind('keyup', function(){
        $('.money').mask('#.##0,00', {reverse: true});
    });

    $(".form-cadastro-classificados").submit(function(e) {
        e.preventDefault();
        var data = $(this).serializeArray();
        data.push({name: 'acao', value: 'cadastra_class'});

        $(".msg-sucesso").remove();
        $(".msg-erro").remove();
        
        $('html, body').animate({
            scrollTop: $(".form-cadastro-class").offset().top
       }, 1000);

        $.ajax({
            url: $(this).data("action"),
            type: "POST",
            data: data,
            success: function(data) {

                if(data['erro'] == 0){

                    $(".form-cadastro-classificados input").val('');
                    $(".form-cadastro-classificados select").val('');
                    $(".form-cadastro classificados .forca-senha").remove();
                    grecaptcha.reset();

                    $(".form-cadastro-class").prepend('<div class="msg-sucesso">' + data['msg'] + '</div>');

                    setTimeout(location.reload.bind(location), 2000);

                } else {

                    $(".form-cadastro-class").prepend('<div class="msg-erro">' + data['msg'] + '</div>');

                }

            },
            error: function(data){
                console.log(data);
            }
        });

    });

    $(".form-login-classificados").submit(function(e){
        e.preventDefault();
        var data = $(this).serializeArray();
        data.push({name: 'acao', value: 'login_class'});

        $(".msg-sucesso").remove();
        $(".msg-erro").remove();
        
        $('html, body').animate({
            scrollTop: $(".form-login-class").offset().top
       }, 1000);

        $.ajax({
            url: $(this).data("action"),
            type: "POST",
            data: data,
            success: function(data) {
                if(data['erro'] == "0"){

                    $(".form-login-classificados input").val('');
                    $(".form-login-classificados select").val('');
                    $(".form-login classificados .forca-senha").remove();
                    grecaptcha.reset();

                    $(".form-login-class").prepend('<div class="msg-sucesso">' + data['msg'] + '</div>');

                    setTimeout(location.reload.bind(location), 2000);

                } else {

                    $(".form-login-class").prepend('<div class="msg-erro">' + data['msg'] + '</div>');

                }

            }
        });

    });

    $(".form-anuncio-classificados").submit(function(e) {
        e.preventDefault();
    });

    $(".cadastrar-class").on('click', function() {

        var form = $(".form-anuncio-classificados");

        var data = new FormData(form[0]);
        data.append('acao', 'cadastra_anuncio');

        $(".msg-sucesso").remove();
        $(".msg-erro").remove();
        
        $('html, body').animate({
            scrollTop: $(".form-cadastro-class").offset().top
       }, 1000);

        $.ajax({

            url: form.data("action"),
            data: data,
            processData: false,
            cache: false,
            contentType: false,
            method: 'POST',
            type: 'POST',
            xhr: function() {
                var i = $.ajaxSettings.xhr();
                form.prepend('<div class="carregando-progresso"><div class="itens-progresso"><progress class="barra-progresso"></progress></div></div>');
                return i.upload && i.upload.addEventListener("progress", progresso, !1), i
            },
            success: function(data){

                if(data['erro'] == "0"){

                    $(".form-anuncio-classificados input").val('');
                    $(".form-anuncio-classificados select").val('');
                    $(".form-anuncio-classificados textarea").val('');

                    $(".form-anuncio-classificados .img-class-input img").addClass("display-none");
                    $(".form-anuncio-classificados .img-class-input").fadeOut();
                    $(".form-anuncio-classificados .icon-fechar").fadeOut();
                    $(".form-anuncio-classificados span").removeClass("display-none");

                    $(".form-cadastro-class").prepend('<div class="msg-sucesso">' + data['msg'] + '</div>');

                } else {

                    $(".form-cadastro-class").prepend('<div class="msg-erro">' + data['msg'] + '</div>');

                }

                if(data['redireciona'] == "S"){
                    setTimeout(function() {
                        window.location.assign(location);
                    }, 5000);
                }

                if(data['redireciona_fim'] == "S"){
                    setTimeout(function() {
                        window.location.assign("/classificados");
                    }, 5000);
                }

            },
            error: function(data){

                console.log(data);

            }

        });

    });

    $('.input-file-class').each(function(i, element){
        
        var ths = $(this);

        ths.find('input').on('change', function () {
            
            if(ths.find('input').val()){

                ths.find('.img-class-input').empty();
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result
                    }).appendTo(ths.find('.img-class-input'));
                    ths.find('span').addClass("display-none");
                    ths.find('.icon-fechar').fadeIn();
                }

                ths.find('.img-class-input').show();
                reader.readAsDataURL($(this)[0].files[0]);

            } else {

                ths.find('input').val("");
                ths.find('.img-class-input img').addClass("display-none");
                ths.find('.img-class-input').fadeOut();
                ths.find('span').removeClass("display-none");

            }

            ths.find('.icon-fechar').on('click', function () {

                ths.find('input').val("");
                ths.find('.img-class-input img').addClass("display-none");
                ths.find('.img-class-input').fadeOut();
                ths.find('.icon-fechar').fadeOut();
                ths.find('span').removeClass("display-none");

            });

        });

    });
    /*
    for(let i = 1; i < 5; i++){

        $(".img-class-" + i + " input").on('change', function () {
            if($(".img-class-" + i + " input").val()){

                $(".img-class-" + i + " .img-class-input").empty();
                var reader = new FileReader();
                reader.onload = function (e) {
                    $("<img />", {
                        "src": e.target.result
                    }).appendTo($(".img-class-" + i + " .img-class-input"));
                    $(".img-class-" + i + " span").addClass("display-none");
                    $(".img-class-" + i + " .icon-fechar").fadeIn();
                }

                $(".img-class-" + i + " .img-class-input").show();
                reader.readAsDataURL($(this)[0].files[0]);

            } else {

                $(".img-class-" + i + " input").val("");
                $(".img-class-" + i + " .img-class-input img").addClass("display-none");
                $(".img-class-" + i + " .img-class-input").fadeOut();
                $(".img-class-" + i + " span").removeClass("display-none");

            }

            $(".img-class-" + i + " .icon-fechar").on('click', function () {

                $(".img-class-" + i + " input").val("");
                $(".img-class-" + i + " .img-class-input img").addClass("display-none");
                $(".img-class-" + i + " .img-class-input").fadeOut();
                $(".img-class-" + i + " .icon-fechar").fadeOut();
                $(".img-class-" + i + " span").removeClass("display-none");

            });
        });

    }
    */

    function progresso(i) {

        $(".barra-progresso").attr({value: i.loaded, max: i.total});
        if(i.loaded / i.total == 1){

            $('.carregando-progresso').fadeOut('fast');

        }

    }

    for(let i = 0; i < $(".image").length; i++){

        $(".image").eq(i).css({"width" : $(".image").eq(i).find("img").width() + "px", "display" : "block"});

        if($(".image").eq(i).width() >= $(".pos-texto").width()){

            $(".image").eq(i).addClass("image-max");
            $(".image").eq(i).find("img").css("height", "auto");

        }

    }

    $(".image").click(function() {

        var imgFull = $(this).find("img");

        var widthJanela = $(window).width();
        var heightJanela = $(window).height();
        
        if(!$(".full-img").length){

            $('.pos-topo').css('z-index', '0');

            $(this).addClass("full-img");
            $("body").css("overflow", "hidden");
            $(this).find("figcaption").addClass("figcap-sobrep");
            
            var widthImg = imgFull.width();
            var heightImg = imgFull.height();

            if(widthImg > heightImg){
                
                imgFull.addClass('width-100').addClass('height-auto');
                
                var heightImg = imgFull.height();
                
                if(heightImg > heightJanela){

                    imgFull.addClass('width-auto').addClass('height-100').removeClass('width-100').removeClass('height-auto');
                    
                }
                
            } else {
                
                imgFull.addClass('width-auto').addClass('height-100');
                
                var widthImg = imgFull.width();
                
                if(widthImg > widthJanela){
                    
                    imgFull.addClass('width-100').addClass('height-auto').removeClass('width-auto').removeClass('height-100');
                    
                }
                
            }

            var heightWidth100 = $('.width-100').height();

            var mTopImg = heightJanela / 2 - heightWidth100 / 2;

            $('.width-100').css('padding-top', mTopImg);

        } else {

            $('.pos-topo').css('z-index', '999999');

            $(this).removeClass("full-img");
            $(this).find("figcaption").removeClass("figcap-sobrep");
            $("body").css("overflow", "auto");
            $(this).find("img").css({"left" : "auto", "position" : "relative", "padding-top" : 0});

            imgFull.removeClass('width-100').removeClass('width-auto').removeClass('height-100').removeClass('height-auto');

        }

    });

    if(window.innerWidth <= 1150){

        $(".foto-capa").addClass("image-max");

    }

    if(window.innerWidth <= 980){

        $(".foto-capa").removeClass("image-max");

    }

    $(".form-comentarios .botao-comentarios").on('click', function(){

        $(".form-comentarios .botao-comentarios").css("display", "none");
        $(".form-comentarios .form-hidden").fadeIn();

    });

    $(document).on("input", "#comentario", function(){

        var limite = 500;
        var caracteresDigitados = $(this).val().length;
        var caracteresRestantes = limite - caracteresDigitados;
        document.getElementById('comentario').value = $("#comentario").val().substr(0,limite);

        if (caracteresRestantes <= 0) {

            document.getElementById('cont').innerHTML = '0';

        } else {

            document.getElementById('cont').innerHTML = caracteresRestantes;

        }

    });

    $(".form-comentarios").submit(function(e){

        e.preventDefault();
        var data = $(this).serializeArray();
        data.push({name: 'acao', value: 'form_comentarios'});
        data.push({name: 'tipo', value: $(this).data("tipo")});
        data.push({name: 'idpg', value: $(this).data("id")});

        $(".msg-sucesso").remove();
        $(".msg-erro").remove();
        
        $('html, body').animate({
            scrollTop: $(".box-comentarios").offset().top
       }, 1000);

        $.ajax({
            url: $(this).data("action"),
            type: "POST",
            data: data,
            success: function(data){

                console.log(data);

                if(data['erro'] == "0"){

                    $(".form-comentarios input").val('');
                    $(".form-comentarios textarea").val('');
                    grecaptcha.reset();

                    $(".form-comentarios").prepend('<div class="msg-sucesso">' + data['msg'] + '</div>');

                } else {

                    $(".form-comentarios").prepend('<div class="msg-erro">' + data['msg'] + '</div>');

                }

            }
        });

    });

    if(config_tema['comentarios'] == 'S'){

        var data_c;

        $(".botao-mais-comentarios-pr").on("click", function(){

            $(".botao-mais-comentarios-pr").remove();

            var div_coment = $("#lista-comentarios");

            var data = [];
            data.push({name: 'acao', value: 'lista_comentarios'});
            data.push({name: 'tipo', value: div_coment.data("tipo")});
            data.push({name: 'idpg', value: div_coment.data("idpg")});

            $.ajax({

                url: div_coment.data("ajax"),
                type: "POST",
                data: data,
                async: false,
                success: function(data){

                    data_c = data;

                }

            });

            if(data_c['total'] > 0){

                var tl_com = data_c['total'] >= 5 ? 5 : data_c['total'];

                for(var i = 0; i < tl_com; i++) {

                    $("#lista-comentarios").append('<div class="item-comentario"><span>' + data_c['lista_comentarios'][i]['nome'] + '</span><span>Há ' + data_c['lista_comentarios'][i]['data'] + '</span><span>' + data_c['lista_comentarios'][i]['cidade'] + '</span><span>' + data_c['lista_comentarios'][i]['mensagem'] + '</span></div>');

                }

                if(data_c['total'] <= 5){

                    $(".botao-mais-comentarios").fadeOut();

                } else {

                    $(".botao-mais-comentarios").fadeIn();

                }

            }

        });

        var limite = 5;
        $(".botao-mais-comentarios").on("click", function(){

            var limite_2 = data_c['total'] > limite + 5 ? limite + 5 : data_c['total'];

            if(limite_2 == data_c['total']){

                $(".botao-mais-comentarios").fadeOut();
                
            }

            for(var i = limite; i < limite_2; i++){

                $("#lista-comentarios").append('<div class="item-comentario"><span>' + data_c['lista_comentarios'][i]['nome'] + '</span><span>Há ' + data_c['lista_comentarios'][i]['data'] + '</span><span>' + data_c['lista_comentarios'][i]['cidade'] + '</span><span>' + data_c['lista_comentarios'][i]['mensagem'] + '</span></div>');

            }

            limite+=5;

        });

    }
    
    
});

!function(e,n){"function"==typeof define&&define.amd?define(["exports"],n):n("undefined"!=typeof exports?exports:e.dragscroll={})}(this,function(e){var n,t,o=window,r=document,i=[],l=function(e,l){for(e=0;e<i.length;)(l=(l=i[e++]).container||l).removeEventListener("mousedown",l.md,0),o.removeEventListener("mouseup",l.mu,0),o.removeEventListener("mousemove",l.mm,0);for(i=[].slice.call(r.getElementsByClassName("dragscroll")),e=0;e<i.length;)!function(e,i,l,s,d,m){(m=e.container||e).addEventListener("mousedown",m.md=function(n){e.hasAttribute("nochilddrag")&&r.elementFromPoint(n.pageX,n.pageY)!=m||(s=1,i=n.clientX,l=n.clientY,n.preventDefault())},0),o.addEventListener("mouseup",m.mu=function(){s=0},0),o.addEventListener("mousemove",m.mm=function(o){s&&((d=e.scroller||e).scrollLeft-=n=-i+(i=o.clientX),d.scrollTop-=t=-l+(l=o.clientY),e==r.body&&((d=r.documentElement).scrollLeft-=n,d.scrollTop-=t))},0)}(i[e++])};"complete"==r.readyState?l():o.addEventListener("load",l,0),e.reset=l});