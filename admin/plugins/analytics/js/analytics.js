$(document).ready(function(){
    
    $(".analytics-btn").on('click', function(){
        
        $('.status-analytics').html('<span class="icons-multi icon-carregando icon-carregando-ga" style="display: block; font-size: 22px;"></span>');
        
        $.ajax({
            url: $(this).data('ajax'),
            dataType: 'json',
            success: function(data){
                
                if(data['erro'] == 0){
                    
                    window.location.assign(data['link']);
                    
                } else {
                    
                    $('.status-analytics').html('<div class="col-3"> <div class="item-form"> <span class="info-tbl finalizado" style="padding: 10px; color: #000; font-size: 13px; font-weight: 300;">Falha ao direcionar, atualize esta página e tente novamente!</span> </div> </div>');
                    
                }
                
            }
            
        });
        
    });
    
    if($('.ferramentas-home').length){
        
        $('.ferramentas-home').prepend('<div class="plugins-ga-home"></div>');
        
        $('.plugins-ga-home').append('<div class="g-analytics-home realt-ga-home">' +
            
            '<div class="progresso-ga"></div>' +
            
            '<p class="tt-analytics-1">Tempo real</p>' +
            '<p class="tt-analytics-2">Fonte: Google Analytics</p>' +
            
            '<a href="' + config_ga['link_realt'] + '" target="_blank" class="btn-ga-home" style="color: rgb(' + config_ga['cor'] + ');">Completo</a>' +
            
            '<div class="tt-ga-sub">Usuários nos últimos 30 minutos</div>' +
            
            '<div class="dados-realt-ga">' +
                
                '<span class="icons-multi icon-carregando"></span>' +
                
            '</div>' +
            
        '</div>' +
        
        '<div class="g-analytics-home usuarios-ga-home">' +
            
            '<p class="tt-analytics-1">Usuários x Novos usuários <span>(Últimos 7 dias)</span></p>' +
            '<p class="tt-analytics-2">Fonte: Google Analytics</p>' +
            
            '<a href="' + config_ga['link_usuarios'] + '" target="_blank" class="btn-ga-home" style="color: rgb(' + config_ga['cor'] + ');">Completo</a>' +
            
            '<div class="line-ga-home usuarios-ga-home-pos-chart">' +
                
                '<span class="icons-multi icon-carregando"></span>' +
                
            '</div>' +
            
        '</div>' +
        
        '<div class="g-analytics-home usuarios-ga-home">' +
            
            '<p class="tt-analytics-1">Visualizações de páginas <span>(Últimos 7 dias)</span></p>' +
            '<p class="tt-analytics-2">Fonte: Google Analytics</p>' +
            
            '<a href="' + config_ga['link_visualizacoes'] + '" target="_blank" class="btn-ga-home" style="color: rgb(' + config_ga['cor'] + ');">Completo</a>' +
            
            '<div class="line-ga-home visualizacoes-ga-home-pos-chart">' +
                
                '<span class="icons-multi icon-carregando"></span>' +
                
            '</div>' +
            
        '</div>');
        
        tempo_real_ga(0, '');
        
        function tempo_real_ga(total, paginas){
            
            var data = {"acao": "tempo-real"};
            
            $.ajax({
                url: 'plugins/analytics/ajax.php',
                type: "POST",
                data: data,
                dataType: 'json',
                success: function(data){
                    
                    var ref_time_ga = new Date();
                    var time_ga = 10000;
                    var val_time_ga = Math.floor(time_ga/100);
                    
                    progress_ga();
                    
                    function progress_ga(){
                        
                        $('.progresso-ga').css("width", "0");
                        
                        var now = new Date();
                        var timeDiff = now.getTime() - ref_time_ga.getTime();
                        var perc = Math.round((timeDiff/time_ga)*100);
                        
                        if(perc <= 100){
                            
                            $('.progresso-ga').css("width", perc + "%");
                            setTimeout(progress_ga, val_time_ga);
                            
                        }
                        
                    }
                    
                    if(total != data['total'] || JSON.stringify(paginas) != JSON.stringify(data['paginas'])){
                        
                        if(data['erro'] == 0){
                            
                            var dispositivos_cores1 = [];
                            var dispositivos_cores2 = [];
                            var dispositivos_tipo = [];
                            var dispositivos_total = [];
                            $.each(data['dispositivos'], function(index, value){
                                
                                dispositivos_tipo.push(value['tipo']);
                                dispositivos_total.push(value['total']);
                                
                                if(value['tipo'] == 'Desktop'){
                                    
                                    dispositivos_cores1.push('rgba(255,128,0,0.5)');
                                    dispositivos_cores2.push('rgba(255,128,0,1)');
                                    
                                }
                                
                                if(value['tipo'] == 'Mobile'){
                                    
                                    dispositivos_cores1.push('rgba(0,176,48,0.5)');
                                    dispositivos_cores2.push('rgba(0,176,48,1)');
                                    
                                }
                                
                                if(value['tipo'] == 'Tablet'){
                                    
                                    dispositivos_cores1.push('rgba(0,112,192,0.5)');
                                    dispositivos_cores2.push('rgba(0,112,192,1)');
                                    
                                }
                                
                            });
                            
                            if(data['total'] != 0){
                                
                                var dados_realt_ga = '<div class="tt-ga-sub">Categorias dos dispositivos</div>' +
                                
                                '<div class="env-canvas-ga">' +
                                    
                                    '<canvas id="realt-ga-home-chart" height="100"></canvas>' + 
                                    
                                '</div>' +
                                
                                '<div class="lista-dispositivos-ga-realt itens-list-ga-disp-' + data['dispositivos'].length + '"></div>' +
                                
                                '<div class="tt-ga-sub tt-pg-realt-ga">Páginas mais vistas</div>' +
                                
                                '<ul class="lista-paginas-ga-realt"></ul>';
                                
                            } else {
                                
                                var dados_realt_ga = '<span class="nenhum-dado-ga">Nenhum dado</div>';
                                
                            }
                            
                            $('.dados-realt-ga').html('<div class="realt-ga-total">' + data['total'] + '</div>' +
                            
                            '<div class="pos-chart-ga">' +
                                
                                dados_realt_ga +
                                
                            '</div>');
                            
                            $('#realt-ga-home-chart').width($('.env-canvas-ga').width());
                            
                            if(data['total'] != 0){
                                
                                $.each(data['dispositivos'], function(index, value){
                                    
                                    if(value['tipo'] == 'Desktop'){
                                        
                                        var cor_item_disp = 'rgba(255,128,0,0.5)';
                                        
                                    }
                                    
                                    if(value['tipo'] == 'Mobile'){
                                        
                                        var cor_item_disp = 'rgba(0,176,48,0.5)';
                                        
                                    }
                                    
                                    if(value['tipo'] == 'Tablet'){
                                        
                                        var cor_item_disp = 'rgba(0,112,192,0.5)';
                                        
                                    }
                                    
                                    $('.lista-dispositivos-ga-realt').append('<div class="disp-ga-realt">' +
                                        '<span style="background: ' + cor_item_disp + ';"></span>' +
                                        '<span>' + value['tipo'] + '</span>' +
                                        '<span>' + value['porcentagem'] + '</span>' +
                                    '</div>');
                                    
                                });
                                
                                $.each(data['paginas'], function(index, value){
                                    
                                    $('.lista-paginas-ga-realt').append(value);
                                    
                                });
                                
                                var ctx = document.getElementById("realt-ga-home-chart");
                                
                                var myChart = new Chart(ctx, {
                                    
                                    type: 'doughnut',
                                    
                                    data: {
                                        labels: dispositivos_tipo,
                                        datasets: [{
                                            data: dispositivos_total,
                                            backgroundColor: dispositivos_cores1,
                                            borderColor: dispositivos_cores2,
                                            borderWidth: 1
                                        }]
                                    },
                                    
                                    options: {
                                        responsive: false,
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: 'right',
                                                labels: {
                                                    usePointStyle: true
                                                }
                                            }
                                            
                                        }
                                    }
                                });
                                
                            }
                            
                        } else {
                            
                            $('.dados-realt-ga').html('<div class="realt-ga-total">0</div>' +
                            
                            '<div class="pos-chart-ga">' +
                                
                                '<span class="nenhum-dado-ga">Nenhum dado</div>' +
                                
                            '</div>');
                            
                        }
                        
                    } else {
                        
                        if(data['total'] == 0){
                            
                            $('.dados-realt-ga').html('<div class="realt-ga-total">0</div>' +
                            
                            '<div class="pos-chart-ga">' +
                                
                                '<span class="nenhum-dado-ga">Nenhum dado</div>' +
                                
                            '</div>');
                            
                        }
                        
                    }
                    
                    setTimeout(function(){
                        
                        tempo_real_ga(data['total'], data['paginas']);
                        
                    }, 10000);
                    
                }
                
            });
            
        }
        
        var data = {"acao": "usuarios-visualizacoes"};
        
        $.ajax({
            url: 'plugins/analytics/ajax.php',
            type: "POST",
            data: data,
            dataType: 'json',
            success: function(data){
                
                if(data['erro'] == 0){
                    
                    $('.usuarios-ga-home-pos-chart').html('<canvas id="usuarios-ga-home-chart" height="200"></canvas>');
                    
                    $('#usuarios-ga-home-chart').width(
                        $('.usuarios-ga-home').width()
                    );
                    
                    const dias_usuarios = data['dias'].map((value) => value['dia']);
                    const usuarios = data['usuarios']['usuarios'].map((value) => value['total']);
                    const novos_usuarios = data['usuarios']['novos_usuarios'].map((value) => value['total']);
                    
                    var ctx2 = document.getElementById("usuarios-ga-home-chart");
                    
                    new Chart(ctx2, {
                        
                        type: 'line',
                        data: {
                            labels: dias_usuarios,
                            datasets: [
                                {
                                    label: 'Usuários',
                                    data: usuarios,
                                    borderColor: 'rgba(' + config_ga['cor'] + ', 0.5)',
                                    backgroundColor: ['rgba(' + config_ga['cor'] + ', 0.5)'],
                                    fill: false,
                                    tension: 0.1
                                },
                                {
                                    label: 'Novos usuários',
                                    data: novos_usuarios,
                                    borderColor: 'rgb(' + config_ga['cor'] + ')',
                                    backgroundColor: 'rgb(' + config_ga['cor'] + ')',
                                    fill: false,
                                    tension: 0.1
                                }
                            ]
                        },
                        options: {
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        usePointStyle: true
                                    }
                                }
                            },
                            scales: {
                                y: {
                                    min: 0
                                }
                            }
                        }
                        
                    });
                    
                    $('.visualizacoes-ga-home-pos-chart').html('<canvas id="visualizacoes-ga-home-chart" height="200"></canvas>');
                    
                    $('#visualizacoes-ga-home-chart').width(
                        $('.usuarios-ga-home').width()
                    );
                    
                    const visualizacoes = data['visualizacoes'].map((value) => value['total']);
                    
                    var ctx3 = document.getElementById("visualizacoes-ga-home-chart");
                    
                    new Chart(ctx3, {
                        
                        type: 'line',
                        data: {
                            labels: dias_usuarios,
                            datasets: [
                                {
                                    scale: 50,
                                    label: 'Visualizações',
                                    data: visualizacoes,
                                    borderColor: 'rgb(' + config_ga['cor'] + ')',
                                    backgroundColor: 'rgb(' + config_ga['cor'] + ')',
                                    fill: false,
                                    tension: 0.1
                                }
                            ]
                        },
                        options: {
                            interaction: {
                                intersect: false,
                                mode: 'index'
                            },
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    min: 0
                                }
                            }
                        }
                    });
                    
                } else {
                    
                    $('.usuarios-ga-home-pos-chart').html('<span class="nenhum-dado-ga">Nenhum dado</div>');
                    $('.visualizacoes-ga-home-chart').html('<span class="nenhum-dado-ga">Nenhum dado</div>');
                    
                }
                
            }
            
        });
        
    }
    
});