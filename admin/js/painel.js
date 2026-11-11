$(document).ready(function(){
    
    $('.pos-ico-menu').on('click', function(){
        
        if(window.innerWidth > 1200){
            
            if(document.cookie.indexOf('hiddenMenuAdm=s') === -1){
                
                document.cookie='hiddenMenuAdm=s';
                $(this).removeClass('hidden-menu-n');
                $(this).addClass('hidden-menu-s');
                
                $('.menu-lateral').removeClass('hidden-mn-n').addClass('hidden-mn-s');
                $('.conteudo-painel').removeClass('hidden-mn-n').addClass('hidden-mn-s');
                
            } else {
                
                document.cookie='hiddenMenuAdm=n';
                $(this).removeClass('hidden-menu-s');
                $(this).addClass('hidden-menu-n');
                
                $('.menu-lateral').removeClass('hidden-mn-s');
                $('.conteudo-painel').removeClass('hidden-mn-s');
                
            }
            
        } else {
            
            $('.menu-lateral').removeClass('hidden-mn-n').removeClass('hidden-mn-s');
            $('.conteudo-painel').removeClass('hidden-mn-n').removeClass('hidden-mn-s');
            
            $('.menu-lateral').addClass('mn-lateral-mob-block');
            $('.menu-lateral').animate({'width': 240}, 100).css('display', 'block');
            
            $('.menu-lateral ul li span:nth-of-type(1)').animate({'opacity': 1}, 1500);
            
        }
        
    });
    
    $('.back-menu-lateral').on('click', function(){
        
        $('.menu-lateral').animate({'width': 0}, 200).fadeOut(400);
        $('.menu-lateral ul li span:nth-of-type(1)').animate({'opacity': 0}, 100);
        
    });
    
    $('.menu-sub').on('click', function(){
        
        $('.menu-sub').parent('li').find('ul').slideUp('normal');
        $('.menu-sub').parent('li').removeClass('mn-sub-sel');
        
        if($(this).parent('li').find('ul').is(':visible') === false){
            
            $(this).parent('li').find('ul').slideDown('normal');
            $(this).parent('li').addClass('mn-sub-sel');
            
        } else {
            
            $(this).parent('li').find('ul').slideUp('normal');
            $(this).parent('li').removeClass('mn-sub-sel');
            
        }
        
    });
    
    if(info_dash['pg'] == 'home'){
        
        var data = [];
        data.push({name: 'action', value: 'google_trends'});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    $('.conteudo-trends').html(data['conteudo']);
                    
                    $('.pos-trends').css({'display': 'block', 'opacity': 0});
                    $('.pos-trends').animate({'opacity': 1});
                    
                }
                
            }
            
        });
        
        var data = [];
        data.push({name: 'action', value: 'home'});
        data.push({name: 'token', value: info_dash['token']});
        data.push({name: 'token_login', value: info_dash['token_login']});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    if(data['error_info'] == 0){
                        
                        $('.info-plano .tt-plano span:nth-of-type(2)').text(data['dados']['nome_plano']);
                        $('.info-plano .uso-plano .item-uso-plano:nth-of-type(1) span:nth-of-type(1)').text(data['dados']['disco_usado'] + ' GB');
                        $('.info-plano .uso-plano .item-uso-plano:nth-of-type(2) span:nth-of-type(1)').text(data['dados']['disco_limite'] + ' GB');
                        
                        $('.info-plano').css({'display': 'block','height': 0, 'opacity': 0}).animate({'height': '176px'});
                        $('.info-plano').animate({'opacity': 1});
                        
                        setTimeout(function(){
                            
                            var widthChartUso = $('.pos-chart-plano').width();
                            
                            $('.item-chart-plano').html('<canvas id="chart-uso-disco" width="' + widthChartUso + '" height="100"></canvas>');
                            
                            var ctx = document.getElementById("chart-uso-disco");
                            
                            var espaco_livre = data['dados']['disco_limite'] - data['dados']['disco_usado'];
                            
                            var myChart = new Chart(ctx, {
                                
                                type: "doughnut",
                                
                                data: {
                                    labels: ["Espaço utilizado", "Espaço livre"],
                                    datasets: [{
                                        data: [data['dados']['disco_usado'], espaco_livre],
                                        backgroundColor: ["rgba(" + info_dash['cor_rgb'] + ", 0.7)", "rgba(" + info_dash['cor_rgb'] + ", 0.3)"],
                                        borderWidth: 0,
                                        hoverBorderWidth: 1,
                                        hoverBorderColor: ["#000000", "#000000"],
                                        spacing: 5
                                    }]
                                },
                                
                                options: {
                                    responsive: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                            position: "right",
                                            labels: {
                                                usePointStyle: true
                                            }
                                        }
                                    },
                                    cutout: '70%'
                                }
                            });
                            
                        }, 600);
                        
                        $('.info-emails .uso-emails .item-uso-emails:nth-of-type(1) span:nth-of-type(1)').text(data['dados']['emails']['total']);
                        $('.info-emails .uso-emails .item-uso-emails:nth-of-type(2) span:nth-of-type(1)').text(data['dados']['emails']['limite']);
                        
                        if(data['dados']['emails']['total'] > 0){
                            
                            $.each(data['dados']['emails']['lista'], function(i){
                                
                                $('.lista-emails').append('<div class="item-email">' +
                                    '<span>' + data['dados']['emails']['lista'][i] + '</span>' +
                                    '<span class="icons-multi icon-login cor-pr botao-email-home" data-email="' + data['dados']['emails']['lista'][i] + '"></span>' +
                                '</div>');
                                
                            });
                            
                        } else {
                            
                            $('.lista-emails').html('<div class="pos-tt-vazio-emails"><div class="tt-vazio-emails">Nenhuma conta de e-mail</div></div>');
                            
                        }
                        
                        $('.info-emails').css({'display': 'block','height': 0, 'opacity': 0}).animate({'height': '176px'}).delay(500);
                        $('.info-emails').animate({'opacity': 1});
                        
                        $('.atualiza-emails').on('click', function(){
                            
                            $('.info-emails').addClass('carregando-emails');
                            
                            var data = [];
                            data.push({name: 'action', value: 'update-info-home'});
                            
                            $.ajax({
                                
                                url: info_dash['url_completa'] + '/admin/api.php',
                                type: "POST",
                                data: data,
                                success: function(data){
                                    
                                    location.reload();
                                    
                                }
                                
                            });
                            
                        });
                        
                        $('.botao-email-home').on('click', function(){
                            
                            $('.info-emails').addClass('carregando-emails');
                            
                            var data = [];
                            data.push({name: 'action', value: 'login-email'}, {name:'email', value: $(this).data('email')}, {name:'token', value: info_dash['token_login']});
                            
                            $.ajax({
                                
                                url: info_dash['url_completa'] + '/admin/api.php',
                                type: "POST",
                                data: data,
                                success: function(data){
                                    
                                    $('.info-emails').removeClass('carregando-emails');
                                    
                                    if(data['error'] == 0){
                                        
                                        location.href=data['url'];
                                        
                                    } else {
                                        
                                        msgPopUp('Erro ao acessar e-mail', 'Se o erro persistir clique em <b>"Sair"</b> no menu do painel, entre novamente e faça uma nova tentativa.', 'erro');
                                        
                                    }
                                    
                                }
                                
                            });
                            
                        });
                        
                        if(data['avisos'] != null){
                            
                            $('.lista-avisos').html(data['avisos']);
                            
                        } else {
                            
                            $('.lista-avisos').html('<div class="pos-tt-vazio-avisos"><div class="tt-vazio-avisos">Nenhuma aviso</div></div>');
                            
                        }
                        
                        $('.info-aviso').css({'display': 'block','height': 0, 'opacity': 0}).animate({'height': '176px'}).delay(1000);
                        $('.info-aviso').animate({'opacity': 1});
                        
                    }
                    
                    if(data['chamados'] != null){
                        
                        $('.itens-chamados').html(data['chamados']);
                        
                    } else {
                        
                        $('.lista-chamados').html('<div class="tt-vazio-chamados">Nenhum chamado aberto</div>');
                        
                    }
                    
                    $('.pos-chamados').css({'display': 'block', 'opacity': 0});
                    $('.pos-chamados').animate({'opacity': 1});
                    
                    $('.atualiza-chamados').on('click', function(){
                        
                        $('.pos-chamados').addClass('carregando-chamados');
                        
                        var data = [];
                        data.push({name: 'action', value: 'update-info-home'});
                        
                        $.ajax({
                            
                            url: info_dash['url_completa'] + '/admin/api.php',
                            type: "POST",
                            data: data,
                            success: function(data){
                                
                                location.reload();
                                
                            }
                            
                        });
                        
                    });
                    
                }
                
            }
            
        });
        
    }
    
    if(info_dash['pg'] == 'noticias'){
        
        $('input[name=titulo]').on('change', function(){
            
            var data = [];
            data.push({name: 'action', value: 'consulta_noticia'}, {name:'token', value: info_dash['token']}, {name:'titulo', value: $(this).val()});
            
            $.ajax({
                
                url: info_dash['url_completa'] + '/admin/api.php',
                type: "POST",
                data: data,
                success: function(data){
                    
                    if(data['error'] == 0 && data['exist'] == 'S'){
                        
                        msgPopUp('Aviso', 'Já existe uma notícia cadastrada com este mesmo título!', 'alerta');
                        
                    } else {
                        
                        $('.aviso-popup').fadeOut();
                        
                    }
                    
                }
                
            });
            
        });
        
    }
    
    $('.aviso-popup').on('click', function(){
        
        $(this).fadeOut();
        
    });
    
    if(window.innerWidth <= 500){
        
        $('.ul-mn-lateral').prepend($('.pos-user-barra'));
        
    }
    
    $('.select-arquivo input').on('change', function(){
        
        var ipt = $(this);
        var ipt2 = this;
        
        if(this.files.length == 1){
            
            if(ipt.parent('div:first').parent('div:first').find('img').length){
                
                var reader = new FileReader();
                
                reader.onload = function(e){
                    
                    if($.inArray(ipt2.files[0].name.substr(ipt2.files[0].name.lastIndexOf('.')).toLowerCase(), ipt.attr('accept').split(',')) == -1){
                        
                        ipt.parent('div:first').parent('div:first').find('img').attr('src', 'img/img-qbd.jpg');
                        
                    } else {
                        
                        ipt.parent('div:first').parent('div:first').find('img').attr('src', e.target.result);
                        
                    }
                    
                }
                
                reader.readAsDataURL(this.files[0]);
                
            }
            
            var tmnImg = this.files[0].size / 1000000;
            
            ipt.parent('div:first').find('i').remove();
            
            if(tmnImg > ipt.data('msize')){
                
                ipt.parent('div:first').find('.tamanho-doc').append('<i class="icons-multi icon-nao"></i>');
                
            } else {
                
                ipt.parent('div:first').find('.tamanho-doc').append('<i class="icons-multi icon-sim"></i>');
                
            }
            
            if($.inArray(this.files[0].name.substr(this.files[0].name.lastIndexOf('.')).toLowerCase(), ipt.attr('accept').split(',')) == -1){
                
                ipt.parent('div:first').find('.formato-doc').append('<i class="icons-multi icon-nao"></i>');
                
            } else {
                
                ipt.parent('div:first').find('.formato-doc').append('<i class="icons-multi icon-sim"></i>');
                
            }
            
            if($.inArray(this.files[0].name.substr(this.files[0].name.lastIndexOf('.')).toLowerCase(), ipt.attr('accept').split(',')) == -1 || tmnImg > ipt.data('msize')){
                
                if($.inArray(this.files[0].name.substr(this.files[0].name.lastIndexOf('.')).toLowerCase(), ipt.attr('accept').split(',')) == -1){
                    
                    ipt.get(0).setCustomValidity('Formato de arquivo não permitido!');
                    
                } else {
                    
                    ipt.get(0).setCustomValidity('Tamanho de arquivo não permitido!');
                    
                }
                
            } else {
                
                ipt.get(0).setCustomValidity('');
                
            }
            
        } else {
            
            ipt.parent('div:first').find('i').remove();
            
            if(ipt.parent('div:first').parent('div:first').find('img').length){
                
                ipt.parent('div:first').parent('div:first').find('img').attr('src', ipt.data('src'));
                
            }
            
        }
        
    });
    
    if(info_dash['pg'] == 'noticias'){
        
        rascunho_post();
        function rascunho_post(){
            
            var form = $('form');
            
            var data = {'action': 'rascunho_noticia'};
            
            $.each(form.serializeArray(), function(i, field){
                
                data[field.name] = field.value;
                
            });
            
            if(data['acao'] == 'cadastrar'){
                
                $.ajax({
                    url: info_dash['url_completa'] + '/admin/api.php',
                    data: data,
                    type: 'POST',
                    dataType: 'json',
                    success: function(data){
                        
                        $('.form-noticia').find('input[name=id_post]').val(data['id_post']);
                        
                        setTimeout(function(){
                            
                            rascunho_post();
                            
                        }, 10000);
                        
                        
                    }
                });
                
            }
            
        }
        
    }
    
    $('.botoes-filtros .botao-limpar').on('click', function(){
        
        $(this).parent('div').parent('div').parent('form').find('.item-filtro input').val('');
        $(this).parent('div').parent('div').parent('form').find('.item-filtro select').val('');
        
    });
    
    $('.botoes-acoes .icon-onoff').on('click', function(){
        
        var status = $(this).data('status');
        var modify = $(this);
        
        if(status == 'S'){
            
            var novo_status = 'N';
            
        } else {
            
            var novo_status = 'S';
            
        }
        
        msgPopUp('Alterando', 'Por favor, aguarde...', 'alerta');
        
        var data = [];
        data.push({name: 'action', value: 'status'}, {name: 'pg', value: $(this).data('pg')}, {name: 'id', value: $(this).data('id')}, {name:'status', value: novo_status}, {name:'token', value: info_dash['token']});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    modify.removeClass('status-' + data['status_antigo']).addClass('status-' + data['status_novo']);
                    modify.data('status', novo_status);
                    
                }
                
                msgPopUp(data['status']['msg1'], data['status']['msg2'], data['status']['class']);
                
            }
            
        });
        
    });
    
    $('.botoes-acoes .data-href').on('click', function(){
        
        location.href = $(this).data('href');
        
    });
    
    $('.botoes-acoes .icon-lixeira').on('click', function(){
        
        if(confirm('Deseja realmente remover este item?')){
            
            location.href = $(this).data('href');
            
        }
        
    });
    
    $(".area-copy #input-copy").on("click mouseover", function(){
        
        $(this).select();
        
    });
    
    $(".area-copy .botao-copy").on("click", function (e){
        
        $(this).parent('div').parent('div').find('#input-copy').focus().select();
        
        document.execCommand("copy");
        
        $(this).parent('div').parent('div').find(".txt-copy").fadeIn("fast");
        
        setTimeout(function(){
            
            $(".txt-copy").fadeOut("fast");
            
        }, 3000);
        
    });
    
    $('.form-plupload').submit(function(e){
        
        if($('#form-plupload').plupload('getFiles').length > 0){
            
            $('#form-plupload').on('complete', function(){
                
                $('.form-plupload')[0].submit();
                
            });
            
            $('#form-plupload').plupload('start');
            
        } else {
            
            alert("Você deve ter pelo menos um arquivo na fila.");
            
        }
        
        return false;
        
    });
    
    if($.inArray(info_dash['pg'], ['fotos', 'noticias_upload', 'galerias_upload']) !== -1){
        
        $('#legenda-s').on('change', function(){
            
            if($(this).is(':checked') == true){
                
                $('.legenda-pg-fotos').fadeIn();
                
            } else {
                
                $('.legenda-pg-fotos').fadeOut();
                
            }
            
        });
        
    }
    
    function consultaLink(termo, campo){
        
        var data = [];
        data.push({name: 'action', value: 'verifica-link'}, {name:'pg', value: info_dash['pg']}, {name:'acao', value: $('.acao-verifica-link').val()}, {name:'id', value: $('.id-verifica-link').val()}, {name:'valor', value: termo}, {name:'token', value: info_dash['token']});
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(campo == 'termo'){
                    
                    $('.link-gerado').val(data['link']);
                    
                }
                
                if(data['error'] == 0){
                    
                    $('.aviso-popup').fadeOut();
                    $('.link-gerado').get(0).setCustomValidity('');
                    
                } else {
                    
                    msgPopUp('Link já existe!', data['msg'], 'erro');
                    $('.link-gerado').get(0).setCustomValidity('Link já existe!');
                    
                }
                
            }
            
        });
        
    }
    
    $('.gera-link').on('keyup', function(){
        
        var valor = $(this).val();
        
        setTimeout(function(){
            
            consultaLink(valor, 'termo');
            
        }, 1000);
        
    });
    
    $('.link-gerado').on('keyup', function(){
        
        var valor = $(this).val();
        
        setTimeout(function(){
            
            consultaLink(valor, 'link');
            
        }, 1000);
        
    });
    
    if(info_dash['pg'] == 'noticias_categorias'){
        
        $('.gera-link').on('keyup', function(){
            
            var valor = $(this).val();
            
            setTimeout(function(){
                
                $('.descricao-cat').val('Últimas notícias da categoria ' + valor);
                
            }, 1000);
            
        });
        
    }
    
    $('.sel-tudo-table').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.sel-tudo-table-itens input').prop('checked', true);
            
        } else {
            
            $('.sel-tudo-table-itens input').prop('checked', false);
            
        }
        
    });
    
    function saveDescImg(ths){
        
        var data = [];
        data.push({name: 'action', value: 'desc-img-list'}, {name:'id', value: ths.parent('.form-descricao-table').data('id')}, {name:'pg', value: info_dash['pg']}, {name:'descricao', value: ths.parent('.form-descricao-table').find('.input-form').val()}, {name:'token', value: info_dash['token']});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    ths.parent('.form-descricao-table').find('.msg-desc-salvo').removeClass('msg-desc-salvo-erro').text('Descrição alterada com sucesso!').fadeIn('fast');
                    
                } else {
                    
                    ths.parent('.form-descricao-table').find('.msg-desc-salvo').addClass('msg-desc-salvo-erro').text(data['msg']).fadeIn('fast');
                    
                }
                
                setTimeout(function(){
                    
                    ths.parent('.form-descricao-table').find('.msg-desc-salvo').fadeOut('fast');
                    
                }, 5000);
                
            }
            
        });
        
    }
    
    $('.botao-salva-desc').on('click', function(){
        
        saveDescImg($(this));
        
    });
    
    $('.input-form').keydown(function(event){
        
        if(event.keyCode == 13){
            
            saveDescImg($(this));
            
        }
        
    });
    
    $('.form-remove-fotos').keydown(function(event){
        
        if(event.keyCode == 13){
            event.preventDefault();
            return false;
        }
        
    });
    
    $('.local-ads-dash').on('change', function(){
        
        var data = [];
        data.push({name: 'action', value: 'posicoes-ads'}, {name:'id', value: $(this).val()}, {name:'token', value: info_dash['token']});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                $('.posicao-ads select').html('');
                $('.posicao-ads').fadeOut('fast');
                
                if(data['error'] == 0){
                    
                    for(var i = 1; i < data['posicoes']; i++){
                        
                        $('.posicao-ads select').append('<option value="' + i + '">' + i + '</option>');
                        $('.posicao-ads').fadeIn('fast');
                        
                    }
                    
                    $('.tmn-banner-principal').html('<b>Tamanho:</b> ' + data['tmn_pr']['width'] + 'x' + data['tmn_pr']['height']);
                    
                    if(data['mobile'] == 'S'){
                        
                        $('.img-ads-mobile').fadeIn('fast');
                        $('.info-ads-desktop').fadeIn('fast');
                        
                    } else {
                        
                        $('.img-ads-mobile').fadeOut('fast');
                        $('.info-ads-desktop').fadeOut('fast');
                        
                    }
                    
                } else {
                    
                    msgPopUp('Falha', 'Falha ao obter a lista de posições!', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.desc-opc-dup').on('click', function(){
        
        if($(this).data('tipo') == 'html'){
            
            $('.link-ads').fadeOut('fast');
            $('.imagem-ads').css('display', 'none');
            $('.html-ads').css('display', 'block');
            $('.arquivo-ads-pr').attr('required', false);
            
        } else {
            
            $('.link-ads').fadeIn('fast');
            $('.imagem-ads').css('display', 'block');
            $('.html-ads').css('display', 'none');
            
            if($('.arquivo-ads-pr').data('required') == 'S'){
                
                $('.arquivo-ads-pr').attr('required', true);
                
            }
            
        }
        
    });
    
    $('.ads-todo-site').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.ext-veiculacao-ads').fadeOut('fast');
            
        } else {
            
            $('.ext-veiculacao-ads').fadeIn('fast');
            
        }
        
    });
    
    $('.municipios-ads').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.municipios-ads-lista').fadeIn('fast');
            
        } else {
            
            $('.municipios-ads-lista').fadeOut('fast');
            
        }
        
    });
    
    $('.colunas-ads').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.colunas-ads-lista').fadeIn('fast');
            
        } else {
            
            $('.colunas-ads-lista').fadeOut('fast');
            
        }
        
    });
    
    $('.finalizar-ads').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.data-ads').fadeIn('fast');
            
        } else {
            
            $('.data-ads').fadeOut('fast');
            
        }
        
    });
    
    $(function(e) {
        e(function() {
            e(".selectmultiple").selectMultiple({})
        })
    });
    
    if(window.location.href.split('#')[1] == 'condicao' && $('.condicao-scroll').length){
        
        setTimeout(function(){
            
            $("html, body").animate({ scrollTop: $('.condicao-scroll').offset().top }, 200);
            
        }, 500);
        
    }
    
    $('.provedor-video').on('change', function(){
        
        $('.link-video').fadeIn();
        
    });
    
    var updateTimeOut;
    
    $('.link-video input').on('keyup', function(){
        
        var ths = $(this);
        var link = $(this).val();
        var provedor = $('.provedor-video').val();
        
        $('.pos-select-arquivo').addClass('carregando-item');
        
        clearTimeout(updateTimeOut);
        
        updateTimeOut = setTimeout(function(){
            
            var data = [];
            data.push({name: 'action', value: 'img-video'}, {name:'link', value: link}, {name:'provedor', value: provedor});
            
            $.ajax({
                
                url: info_dash['url_completa'] + '/admin/api.php',
                type: "POST",
                data: data,
                success: function(data){
                    
                    if(data['error'] == 0){
                        
                        if($('.pos-select-arquivo .select-arquivo input')[0].files.length === 0){
                            
                            $('.pos-select-arquivo img').attr('src', data['img']);
                            $('.img-hidden-video').val(data['img']);
                            $('.aviso-popup').fadeOut();
                            
                        } else {
                            
                            $('.img-hidden-video').val('');
                            
                        }
                        
                        ths.val(data['url']);
                        
                    } else {
                        
                        $('.img-hidden-video').val('');
                        $('.pos-select-arquivo img').attr('src', $('.select-arquivo input').data('src'));
                        msgPopUp('Falha ao obter informações', 'Certifique-se de que o link inserido seja de um vídeo válido e de que ele não tenha restrições para incorporações.', 'alerta');
                        
                    }
                    
                },
                complete: function(){
                    
                    $('.pos-select-arquivo').removeClass('carregando-item');
                    
                }
                
                
            });
            
        }, 1000);
        
    });
    
    if(varGetExist('ErrorCreateMail') == 'S' && info_dash['var_get']['ErrorCreateMail'] == '1'){
        
        msgPopUp('Erro ao acessar criação de e-mails', 'Se o erro persistir clique em <b>"Sair"</b> no menu do painel, entre novamente e faça uma nova tentativa.', 'erro');
        
    }
    
    $('.form-remove-fotos').submit(function(){
        
        return confirm('Deseja realmente remover os itens selecionados?');
        
    });
    
    $('.expirar-enquete').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.data-expira-enquete').fadeIn('fast');
            
        } else {
            
            $('.data-expira-enquete').fadeOut('fast');
            
        }
        
    });
    
    $('.botao-add-opcao-enquete').on('click', function(){
        
        if($(this).data('img') == 'N'){
            
            $('.opcoes-enquete-no-img').append('<div class="item-opcao-enquete-no-img">' +
                '<input type="text" name="opcao[]" class="input-form" placeholder="Opção para escolha" required>' +
                '<input type="number" name="votos[]" class="input-form" placeholder="Votos" value="0" required>' +
                '<div class="remove-opc-enq" data-img="N">Remover opção</div>' +
            '</div>');
            
        } else {
            
            $('.opcoes-enquete-img').append('<div class="item-opcao-enquete-img">' +
                '<div class="campo-upload-enquete-img">' +
                    '<div class="select-img-enquete">' +
                        '<div class="desc-select-img-enquete">' +
                            '<span class="icons-menu icon-galerias"></span>' +
                            '<span class="tt-escolha-img-enq">Clique para escolher</span>' +
                        '</div>' +
                    '</div>' +
                    '<input type="file" name="foto[]" accept=".jpg,.jpeg,.webp">' +
                '</div>' +
                '<div class="campos-opcao-enquete-img">' +
                    '<input type="text" name="opcao[]" class="input-form" placeholder="Opção para escolha" required>' +
                    '<input type="number" name="votos[]" class="input-form" placeholder="Votos" value="0" required>' +
                    '<input type="text" name="descricao_foto[]" class="input-form" placeholder="Descrição da foto" required>' +
                '</div>' +
                '<div class="remove-opc-enq" data-img="S">Remover opção</div>' +
            '</div>');
            
        }
        
        $('.remove-opc-enq').on('click', function(){
            
            if($(this).data('img') == 'N'){
                
                $(this).parent('.item-opcao-enquete-no-img').remove();
                
            } else {
                
                $(this).parent('.item-opcao-enquete-img').remove();
                
            }
            
        });
        
        $('.campo-upload-enquete-img input').on('change', function(){
            
            var ths = $(this);
            var ths2 = this;
            
            imgEnquete(ths, ths2);
            
        });
        
    });
    
    function imgEnquete(ths, ths2){
        
        ths.parent('div').find('.select-img-enquete').find('img').remove();
        ths.parent('div').find('.select-img-enquete').find('.desc-select-img-enquete').css('display', 'block');
        
        if(ths2.files.length == 1){
            
            var reader = new FileReader();
            
            reader.onload = function(e){
                
                ths.parent('div').find('.select-img-enquete').find('img').remove();
                ths.parent('div').find('.select-img-enquete').find('.desc-select-img-enquete').css('display', 'none');
                ths.parent('div').find('.select-img-enquete').append('<img src="' + e.target.result + '" alt="Foto" />');
                
            }
            
            reader.readAsDataURL(ths2.files[0]);
            
        }
        
    }
    
    $('.campo-upload-enquete-img input').on('change', function(){
        
        var ths = $(this);
        var ths2 = this;
        
        imgEnquete(ths, ths2);
        
    });
    
    $('.form-enquete-img').submit(function(i){
        
        i.preventDefault();
        
        $('.progresso-envio-img-enquete').fadeIn('fast');
        
        $("html, body").animate({ scrollTop: $('.pos-sessao-form-enquete-img').offset().top }, 300);
        
        var data = new FormData($(this)[0]);
        $.ajax({
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            xhr: function() {
                var i = $.ajaxSettings.xhr();
                return i.upload && i.upload.addEventListener("progress", progresso, !1), i
            },
            success: function(data){
                
                location.href = data['url'];
                
            },
            cache: !1,
            contentType: !1,
            processData: !1
        });
        
        function progresso(i){
            
            var enviado = (i.loaded * 100) / i.total;
            $('.progresso-up-enquete-progress').css('width', enviado + '%');
            
        }
        
    });
    
    $('.pos-avaliacao .icon-estrela-avaliacao').on('click', function(){
        
        var data = [];
        data.push({name:'action', value: 'avaliacao'});
        data.push({name:'token', value: info_dash['token']});
        data.push({name:'tipo', value: $(this).parent('.pos-avaliacao').data('tipo')});
        data.push({name:'nota', value: $(this).data('nota')});
        data.push({name:'id', value: $(this).parent('.pos-avaliacao').data('id')});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    $.each(data['estrela'], function(i){
                        
                        $('.icon-estrela-avaliacao[data-nota="' + i + '"]').removeClass('class-meia').removeClass('class-cheia');
                        $('.icon-estrela-avaliacao[data-nota="' + i + '"]').addClass(data['estrela'][i]);
                        
                        $('.icon-estrela-minha-avaliacao[data-nota="' + i + '"]').removeClass('class-meia').removeClass('class-cheia');
                        $('.icon-estrela-minha-avaliacao[data-nota="' + i + '"]').addClass(data['minha_avaliacao'][i]);
                        
                    });
                    
                    $('.total-avaliacoes span:nth-of-type(1)').html(data['estrelas']);
                    $('.total-avaliacoes span:nth-of-type(2)').html(data['avaliacoes']);
                    
                } else {
                    
                    msgPopUp('Erro ao avaliar', 'Não foi possível gravar sua avaliação, tente novamente, se o erro persistir entre em contato com o suporte', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.botao-instala-plugin').on('click', function(){
        
        var data = [];
        data.push({name:'action', value: 'instala-plugin'});
        data.push({name:'id', value: $(this).data('id')});
        data.push({name:'token', value: info_dash['token']});
        
        $(this).removeClass('botao-instala-plugin').addClass('carregando-data-interno').text('');
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    location.href = data['url'];
                    
                } else {
                    
                    $('.carregando-data-interno').removeClass('carregando-data-interno').addClass('botao-instala-plugin').text('Instalar');
                    msgPopUp('Erro ao instalar', 'Não foi possível instalar o plugin, tente novamente, se o erro persistir entre em contato com o suporte. <b>[Cód. ' + data['cod'] + ']</b>', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.botao-desinstala-plugin').on('click', function(){
        
        if(confirm('Deseja realmente desinstalar este plugin?')){
            
            var data = [];
            data.push({name:'action', value: 'desinstala-plugin'});
            data.push({name:'id', value: $(this).data('id')});
            data.push({name:'token', value: info_dash['token']});
            
            $(this).removeClass('botao-desinstala-plugin').addClass('carregando-data-interno').text('');
            
            $.ajax({
                
                url: info_dash['url_completa'] + '/admin/api.php',
                type: "POST",
                data: data,
                success: function(data){
                    
                    if(data['error'] == 0){
                        
                        location.href = info_dash['url_completa'] + '/admin/index.php?pg=plugins';
                        
                    } else {
                        
                        $('.carregando-data-interno').removeClass('carregando-data-interno').addClass('botao-desinstala-plugin').text('Desinstalar');
                        msgPopUp('Erro ao desinstalar', 'Não foi possível desinstalar o plugin, tente novamente, se o erro persistir entre em contato com o suporte. <b>[Cód. ' + data['cod'] + ']</b>', 'erro');
                        
                    }
                    
                }
                
            });
            
        }
        
    });
    
    $('.botao-atualiza-plugin').on('click', function(){
        
        var data = [];
        data.push({name:'action', value: 'atualiza-plugin'});
        data.push({name:'id', value: $(this).data('id')});
        data.push({name:'token', value: info_dash['token']});
        
        $(this).removeClass('botao-atualiza-plugin').addClass('carregando-data-interno').text('');
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    location.href = data['url'];
                    
                } else {
                    
                    $('.carregando-data-interno').removeClass('carregando-data-interno').addClass('botao-atualiza-plugin').text('Atualizar');
                    msgPopUp('Erro ao atualizar', 'Não foi possível atualizar o plugin, tente novamente, se o erro persistir entre em contato com o suporte. <b>[Cód. ' + data['cod'] + ']</b>', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.input-phone').blur(function(){
        
        $('.pos-input-phone').removeClass('pos-input-phone-focus');
        
    }).focus(function(){
        
        $('.pos-input-phone').addClass('pos-input-phone-focus');
        
    });
    
    $('.pos-input-phone').on('click', function(){
        
        $('.input-phone').focus();
        
    });
    
    $(".input-senha").on('keyup', function(){
        
        var val = $(this).val();
        
        var validaSenha = 'S';
        
        if(val.length >= 8){
            
            $('.cond-senha-1').addClass('senha-ok');
            
        } else {
            
            $('.cond-senha-1').removeClass('senha-ok');
            var validaSenha = 'N';
            
        }
        
        if(new RegExp(/[A-Z]/).test(val) === true){
            
            $('.cond-senha-2').addClass('senha-ok');
            
        } else {
            
            $('.cond-senha-2').removeClass('senha-ok');
            var validaSenha = 'N';
            
        }
        
        if(new RegExp(/[a-z]/).test(val) === true){
            
            $('.cond-senha-3').addClass('senha-ok');
            
        } else {
            
            $('.cond-senha-3').removeClass('senha-ok');
            var validaSenha = 'N';
            
        }
        
        if(new RegExp(/[!@#$%*()_+^&{}}:;?.]/).test(val) === true){
            
            $('.cond-senha-4').addClass('senha-ok');
            
        } else {
            
            $('.cond-senha-4').removeClass('senha-ok');
            var validaSenha = 'N';
            
        }
        
        if(new RegExp(/[0-9]/).test(val) === true){
            
            $('.cond-senha-5').addClass('senha-ok');
            
        } else {
            
            $('.cond-senha-5').removeClass('senha-ok');
            var validaSenha = 'N';
            
        }
        
        if(validaSenha == "N"){
            
            $(this).get(0).setCustomValidity("A senha digitada não atende aos requisitos.");
            
        } else {
            
            $(this).get(0).setCustomValidity("");
            
        }
        
    });
    
    $('.form-usuarios').submit(function(e){
        
        if($(this).data('prevent') == 'S'){
            
            e.preventDefault();
            
            var subm = 'N';
            var permissao = 2;
            var noticias = 'N';
            var categorias = 'N';
            var anuncios = 'N';
            var locais = 'N';
            $.each($(this).serializeArray(), function(i, field){
                
                if(field['name'] == 'paginas[]'){
                    
                    subm = 'S';
                    
                }
                
                if(field['name'] == 'permissao' && field['value'] == 1){
                    
                    permissao = 1;
                    
                }
                
                if(field['name'] == 'paginas[]' && field['value'] == 85){
                    
                    noticias = 'S';
                    
                }
                
                if(field['name'] == 'categorias[]'){
                    
                    categorias = 'S';
                    
                }
                
                if(field['name'] == 'paginas[]' && field['value'] == 36){
                    
                    anuncios = 'S';
                    
                }
                
                if(field['name'] == 'anuncios[]'){
                    
                    locais = 'S';
                    
                }
                
            });
            
            if(permissao == 2){
                
                if(subm == 'S'){
                    
                    var prevent = 'N';
                    
                    if(noticias == 'S' && categorias == 'N'){
                        
                        prevent = 'S';
                        var msgPrevent = 'Você precisa selecionar pelo menos 1 categoria.';
                        var classTop = '.permissoes-noticias';
                        
                    }
                    
                    if(anuncios == 'S' && locais == 'N'){
                        
                        prevent = 'S';
                        var msgPrevent = 'Você precisa selecionar pelo menos 1 local de anúncio.';
                        var classTop = '.permissoes-anuncios';
                        
                    }
                    
                    if(prevent == 'N'){
                        
                        $(this).data('prevent', 'N');
                        $(this).submit();
                        
                    } else {
                        
                        $(this).data('prevent', 'S');
                        $("html, body").animate({ scrollTop: $(classTop).offset().top }, 600);
                        msgPopUp('Falha', msgPrevent, 'erro');
                        
                    }
                    
                } else {
                    
                    $(this).data('prevent', 'S');
                    $("html, body").animate({ scrollTop: $('.permissoes-usuarios').offset().top }, 600);
                    msgPopUp('Falha', 'Você escolheu a opção <b>"Colaborador"</b>, escolha pelo menos 1 permissão de acesso.', 'erro');
                    
                }
                
            } else {
                
                $(this).data('prevent', 'N');
                $(this).submit();
                
            }
            
        }
        
    });
    
    $('.permissoes-paginas-1').on('change', function(){
        
        if($.inArray('85', $(this).val()) !== -1){
            
            $('.permissoes-noticias').fadeIn('fast');
            
        } else {
            
            $('.permissoes-noticias').fadeOut('fast');
            
        }
        
    });
    
    $('.permissoes-paginas-2').on('change', function(){
        
        if($.inArray('36', $(this).val()) !== -1){
            
            $('.permissoes-anuncios').fadeIn('fast');
            
        } else {
            
            $('.permissoes-anuncios').fadeOut('fast');
            
        }
        
    });
    
    $('.permissao-usuario').on('click', function(){
        
        $('.selectmultiple').selectMultiple("deselect_all");
        
        if($(this).data('permissao') == 1){
            
            $('.permissoes-usuarios').fadeOut('fast');
            $('.permissoes-noticias').fadeOut('fast');
            $('.permissoes-anuncios').fadeOut('fast');
            
        } else {
            
            $('.permissoes-usuarios').fadeIn('fast');
            
        }
        
    });
    
    $('.email-usuario').on('keyup', function(){
        
        var data = [];
        data.push({name:'action', value: 'email-usuario'});
        data.push({name:'email', value: $(this).val()});
        data.push({name:'token', value: info_dash['token']});
        data.push({name:'acao', value: $(this).data('acao')});
        data.push({name:'id', value: $(this).data('id')});
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['existe'] == 'S'){
                    
                    msgPopUp('Escolha outro e-mail', 'O e-mail que está tentando cadastrar já está atribuído ao usuário <b>"' + data['nome'] + '"</b>', 'erro');
                    $('.email-usuario').get(0).setCustomValidity("Escolha outro e-mail");
                    
                } else {
                    
                    $('.aviso-popup').fadeOut();
                    $('.email-usuario').get(0).setCustomValidity("");
                    
                }
                
            }
            
        });
        
    });
    
    $('.tipo-pagina').on('click', function(){
        
        if($(this).data('tipo') == 'E'){
            
            $('.link-pagina').fadeIn('fast');
            $('.link-pagina input').attr('required', true);
            $('.conteudo-pagina').fadeOut('fast');
            
        } else {
            
            $('.link-pagina').fadeOut('fast');
            $('.link-pagina input').attr('required', false);
            $('.conteudo-pagina').fadeIn('fast');
            
        }
        
    });
    
    $('.money').on('keyup', function(){
        
        $(this).mask("#.##0,00",{reverse:!0});
        
    });
    
    $('.plano-classificado').on('change', function(){
        
        $('.link-plano-class').attr('href', info_dash['url_completa'] + '/admin/index.php?pg=classificados_planos&id=' + $(this).val());
        
        var data = [];
        data.push({name:'action', value: 'data-classificado'});
        data.push({name:'plano', value: $(this).val()});
        data.push({name:'token', value: info_dash['token']});
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    $('.data-fim-classificado').fadeIn('fast');
                    $('.data-fim-classificado input').val(data['data']);
                    
                }
                
            }
            
        });
        
    });
    
    if(window.location.href.split('#')[1]){
        
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        
        $("li[data-tab=" + window.location.href.split('#')[1] + "]").addClass('current');
        $("#"+window.location.href.split('#')[1]).fadeIn().addClass('current');
        
        $("html, body").stop().animate({scrollTop:0});
        
    }
    
    $('ul.tabs li').click(function(){
        
        $(this).removeClass('tab-invalida');
        
        var tab_id = $(this).attr('data-tab');
        
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        
        $(this).addClass('current');
        $("#"+tab_id).fadeIn().addClass('current');
        
        $("html, body").animate({ scrollTop: $('.pos-tabs').offset().top - 50 }, 200);
        
    });
    
    if(window.innerWidth <= 1000 && $('.env-tabs').length){
        
        $('.env-tabs').width($('.tabs').width() + 10);
        
    }
    
    $('.submit-tabs').click(function(){
        
        $('.tabs li').removeClass('tab-invalida');
        
        var MsgErroTab = false;
        
        var campos = ['input', 'select', 'textarea'];
        
        $.each(campos, function(i, val){
            
            $('.form-tabs ' + val).each(function() {
                
                if(this.checkValidity() == false){
                    
                    var idTab = $(val + '[name="' + this.name + '"]').parent('.item-form').parent('.secao-form').parent('.pos-secao-form').attr('id');
                    
                    $('.tabs').find('li[data-tab="' + idTab + '"]').addClass('tab-invalida');
                    
                    MsgErroTab = true;
                    
                }
                
            });
            
        });
        
        if(MsgErroTab == true){
            
            msgPopUp('Erro', 'Você precisa preencher todos os campos corretamente antes de continuar', 'erro');
            
        }
        
    });
    
    $('.ad-txt-dash').on('keyup', function(){
        
        var val = $(this).val();
        
        if(new RegExp(/[<>]/).test(val) === true){
            
            msgPopUp('Erro', 'Scripts ou outras tags HTML não são aceitas no campo <i>ads.txt</i>', 'erro');
            $(this).get(0).setCustomValidity("Preencha este campo corretamente");
            
        } else {
            
            $('.aviso-popup').fadeOut();
            $(this).get(0).setCustomValidity("");
            
        }
        
    });
    
    $('.botao-cache').on('click', function(){
        
        msgPopUp('Limpando cache', 'Por favor, aguarde!', 'alerta');
        
        var data = [];
        data.push({name:'action', value: 'limpar-cache'});
        data.push({name:'token', value: info_dash['token']});
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    msgPopUp('Sucesso', 'Cache limpo com sucesso!', 'sucesso');
                    
                }
                
            }
            
        });
        
    });
    
    $('.botoes-acoes .icon-desbloquear').on('click', function(){
        
        if(confirm('Deseja realmente desbloquear este IP?')){
            
            location.href = $(this).data('href');
            
        }
        
    });
    
    $('.botao-instala-tema').on('click', function(){
        
        var data = [];
        data.push({name:'action', value: 'instala-tema'});
        data.push({name:'id', value: $(this).data('id')});
        data.push({name:'token', value: info_dash['token']});
        
        $(this).removeClass('botao-instala-tema').addClass('carregando-data-interno').text('');
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['error'] == 0){
                    
                    location.href = data['url'];
                    
                } else {
                    
                    $('.carregando-data-interno').removeClass('carregando-data-interno').addClass('botao-instala-tema').text('Instalar');
                    msgPopUp('Erro ao instalar', 'Não foi possível instalar o tema, tente novamente, se o erro persistir entre em contato com o suporte. <b>[Cód. ' + data['cod'] + ']</b>', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.categoria-rss').on('change', function(){
        
        $('.link-rss-categoria input').val(info_dash['url_completa'] + '/rss.xml?categoria=' + $(this).val());
        $('.link-rss-categoria').fadeIn();
        
    });
    
    $('.municipio-rss').on('change', function(){
        
        $('.link-rss-municipio input').val(info_dash['url_completa'] + '/rss.xml?municipio=' + $(this).val());
        $('.link-rss-municipio').fadeIn();
        
    });
    
    $('.blog-coluna-rss').on('change', function(){
        
        $('.link-rss-blog-coluna input').val(info_dash['url_completa'] + '/rss.xml?blog=' + $(this).val());
        $('.link-rss-blog-coluna').fadeIn();
        
    });
    
    $('.remove-foto').on('change', function(){
        
        var srcImg = $('.remove-foto-arquivo .select-arquivo input').data('src');
        
        if($(this).is(':checked') == true){
            
            $('.remove-foto-arquivo img').attr('src', 'img/sem-foto.jpg');
            
        } else {
            
            $('.remove-foto-arquivo img').attr('src', srcImg);
            
        }
        
    });
    
    $('.copy-img-arquivo').on('click', function(){
        
        $(this).parent('div').find('input').focus().select();
        
        document.execCommand("copy");
        
        $(this).parent('div').find(".txt-copy-img-arquivo").fadeIn("fast");
        
        setTimeout(function(){
            
            $(".txt-copy-img-arquivo").fadeOut("fast");
            
        }, 3000);
        
    });
    
    preventLogout();
    function preventLogout(){
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/api.php',
            
            complete: function(){
                
                setTimeout(function(){
                    
                    preventLogout();
                    
                }, 60000);
                
            }
            
        });
        
    }
    
});

$(function (){
    
    if($("#editor-code").length){
        
        var editor = ace.edit("editor-code");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/html");
        editor.setOption("showPrintMargin", false);
        
        editor.setOptions({
            fontSize: "16px"
        });
        
        document.getElementById("form-editor-code").onsubmit = function(evt){
            
            document.getElementById("editor-code-value").value = editor.getValue();
            
        }
        
    }
    
});

$(function (){
    
    $('.select-busca').select2({
        
        "language": {
            "noResults": function(){
                return "Nada encontrado";
            },
            "searching": function(){
                
                $('.select2-results__option').css('display', 'none');
                
                return "Buscando...";
            },
            "inputTooShort": function(){
                return "Por favor, digite pelo menos 3 caracteres";
            }
        },
        
        minimumInputLength: 3,
        
        ajax: {
            url: info_dash['url_completa'] + '/admin/api.php',
            dataType: "json",
            type: "GET",
            data: function (params){
                
                var queryParameters = {
                    action: 'busca-tempo',
                    termo: params.term,
                    token: info_dash['token']
                }
                
                return queryParameters;
                
            },
            processResults: function (data){
                
                return {
                    results: $.map(data['dados'], function(item){
                        
                        return {
                            text: item.nome,
                            id: item.id
                        }
                        
                    })
                };
                
            }
        }
        
    });
    
});

var timePopUp;
function msgPopUp(msg1, msg2, tipo){
    
    $('.aviso-popup').css('display', 'none').removeClass('sucesso-popup').removeClass('alerta-popup').removeClass('erro-popup').addClass(tipo + '-popup');
    
    $('.aviso-popup span:nth-of-type(1)').html(msg1);
    $('.aviso-popup span:nth-of-type(2)').html(msg2);
    
    $('.aviso-popup').fadeIn();
    
    clearTimeout(timePopUp);
    
    timePopUp = setTimeout(function(){
        
        $('.aviso-popup').fadeOut();
        
    }, 30000);
    
}

function varGetExist(key){
    
    var igual = 'N';
    
    $.each(info_dash['var_get'], function(keyS, value){
        
        if(keyS == key){
            
            igual = 'S';
            
        }
        
    });
    
    return igual;
    
}

$(function (){
    
    var phoneInputID2 = ".input-phone";
    
    if($(phoneInputID2).length){
        
        var input = document.querySelector(phoneInputID2);
        var iti2 = window.intlTelInput(input, {
            initialCountry: "br",
            preferredCountries: ["br"],
            separateDialCode: true,
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/11.0.14/js/utils.js"
            
        });
        $(phoneInputID2).on("countrychange", function(event){
            var selectedCountryData = iti2.getSelectedCountryData();
            newPlaceholder = intlTelInputUtils.getExampleNumber(selectedCountryData.iso2, true, intlTelInputUtils.numberFormat.INTERNATIONAL);
            mask = newPlaceholder.replace(/[1-9]/g, "0");
            $(this).mask(mask);
        });
        
        $(phoneInputID2).on('keyup', function(){
            
            $('.dialCode').val('+' + iti2.getSelectedCountryData()['dialCode']);
            
        });
        
        iti2.promise.then(function() {
            $(phoneInputID2).trigger("countrychange");
        });
        
    }
    
});