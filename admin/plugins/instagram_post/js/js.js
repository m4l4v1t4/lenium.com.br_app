$(document).ready(function(){
    
    $('.click-plinsta').on('click', function(){
        
        $('.redirect-plinsta').css('display', 'block');
        
        var data = [];
        data.push({name: 'acao', value: 'redireciona'});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/plugins/instagram_post/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['success'] == 1){
                    
                    window.location.assign(data['link']);
                    
                } else {
                    
                    $('.redirect-plinsta').css('display', 'none');
                    msgPopUp('Falha ao redirecionar', 'Não foi possível prosseguir com a solicitação. Tente novamente. Se o problema persistir, entre em contato com o suporte.', 'erro');
                    
                }
                
            }
            
        });
        
    });
    
    $('.remove-isocial').on('click', function(){
        
        $(this).closest('.lista-pgs-insta').fadeOut();
        
        var data = [];
        data.push({name: 'acao', value: 'remove'}, {name: 'pg', value: $(this).data('pg')});
        
        $.ajax({
            
            url: info_dash['url_completa'] + '/admin/plugins/instagram_post/api.php',
            type: "POST",
            data: data,
            success: function(data){
                
                if(data['success'] == 1){
                    
                    location.reload();
                    
                }
                
            }
            
        });
        
    });
    
    var data = [];
    data.push({name: 'acao', value: 'info'});
    
    $.ajax({
        
        url: info_dash['url_completa'] + '/admin/plugins/instagram_post/api.php',
        type: "POST",
        data: data,
        success: function(data){
            
            if(data['success'] == 1 && data['expirado'] == 'S'){
                
                $('.conteudo-painel').prepend(`
                    <div class="msg-form msg-form-erro" style="margin: 10px 0 30px 0;">
                        <div>
                            <p><b style="font-weight: bold;">Aviso:</b> o plugin <b>iSocial Post Instagram</b> não está publicando pois a permissão expirou.</p>
                            <p><a href="index.php?pg=plugins&id=13&acao=configurar">Clique aqui</a> para conceder nova permissão de acesso.</p>
                        </div>
                    </div>
                `);
                
            }
            
        }
        
    });
    
});