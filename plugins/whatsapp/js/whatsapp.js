$(document).ready(function(){
    
    if(plWhatsApp['exibe'] == 'S'){
        
        if(plWhatsApp['pop_up'] == 'S'){
            
            $('body').append('<a href="' + plWhatsApp['link'] + '" target="_blank" class="icon-plwhats-popup">' +
                '<span>Faça parte do nosso grupo!</span>' +
                '<div>' +
                    '<img src="' + plWhatsApp['url'] + 'plugins/whatsapp/img/icon.png" alt="Grupo do WhatsApp" />' +
                '</div>' +
            '</a>');
            
        }
        
        if(plWhatsApp['botao_post'] == 'S' && plWhatsApp['pg'] == 'noticia'){
            
            $('.texto').append('<a href="' + plWhatsApp['link'] + '" target="_blank" class="botao-plwhats-noticia">' +
                '<img src="' + plWhatsApp['url'] + 'plugins/whatsapp/img/icon.png" alt="Grupo do WhatsApp" />' +
                '<span>Clique aqui e faça parte do nosso grupo no WhatsApp</span>' +
            '</a>');
            
        }
        
    }
    
});