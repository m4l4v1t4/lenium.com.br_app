$(document).ready(function(){
    
    console.log(legendaPlInsta);
    
    $('<div class="pos-secao-form">' +
    
    '<div class="tt-secao-form">' +
        '<h1>Publicar no Instagram</h1>' +
    '</div>' +
    
    '<div class="secao-form">' +
        
        '<div class="item-form form-triplo">' +
            
            '<div class="item-form-escolha">' +
                
                '<span>Publicar como <b style="font-weight: bold;">post</b>?</span>' +
                
                '<input type="checkbox" id="insta_post" class="check-post-plinsta" name="instagram_post" value="S">' +
                
                '<label for="insta_post">' +
                    '<div class="check-esc">' +
                        '<span>Não</span>' +
                        '<span>Sim</span>' +
                    '</div>' +
                '</label>' +
                
            '</div>' +
            
        '</div>' +
        
        '<div class="item-form form-triplo">' +
            
            '<div class="item-form-escolha">' +
                
                '<span>Publicar como <b style="font-weight: bold;">storie</b>?</span>' +
                
                '<input type="checkbox" id="insta_storie" name="instagram_storie" value="S">' +
                
                '<label for="insta_storie">' +
                    '<div class="check-esc">' +
                        '<span>Não</span>' +
                        '<span>Sim</span>' +
                    '</div>' +
                '</label>' +
                
            '</div>' +
            
        '</div>' +
        
        '<div class="item-form legenda-post-plinsta" style="display: none;">' +
            
            '<div class="tt-item-form">Legenda do post</div>' +
            
            '<textarea name="legenda_instagram" class="textarea-form" maxlength="2000">' + legendaPlInsta['legenda'] + '</textarea>' +
            
            '<i id="contador_legenda_insta" style="font-size: 12px; font-style: normal;"></i>' +
            
        '</div>' +
        
        '<div class="info-secao-form legenda-post-plinsta" style="display: none;">' +
            '<span>Insira acima a legenda que será publicada no post do Instagram.</span>' +
        '</div>' +
        
    '</div>').insertAfter('form .pos-secao-form:last-of-type');
    
    $('.check-post-plinsta').on('change', function(){
        
        if($(this).is(':checked') == true){
            
            $('.legenda-post-plinsta').fadeIn();
            
        } else {
            
            $('.legenda-post-plinsta').fadeOut();
            
        }
        
    });
    
    function contadorLegendaInsta() {
        const textarea = $('textarea[name="legenda_instagram"]');
        const contador = $('#contador_legenda_insta');
        
        function atualizarContador() {
            let qtd = textarea.val().length;
            contador.text(qtd + ' / 2000 caracteres');
        }
        
        textarea.on('input', atualizarContador);
        atualizarContador();
    }
    
    contadorLegendaInsta();
    
});