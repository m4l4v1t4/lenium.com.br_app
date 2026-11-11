$(document).ready(function(){
    
    var imgEditor = 'image';
    var urlUploadTiny = 'api.php?acao=foto-editor&token=' + info_dash['token'];
    
    if(info_dash['pg'] == 'galerias'){
        
        imgEditor = '';
        urlUploadTiny = '';
        
    }
    
    tinymce.init({
        selector: '.text-editor',
        height: 600,
        mobile: {
            menubar: true
        },
        menubar: 'edit view format',
        menu: {
            view: {
                title: 'View',
                items: 'code'
            },
            format: {
                title: 'Format',
                items: 'removeformat'
            }
        },
        plugins: 'link ' + imgEditor + ' media code visualblocks lists',
        toolbar: [
            'undo redo | link ' + imgEditor + ' media | blockquote | h1 h2 h3 | bold italic underline | forecolor backcolor | fontsize',
            'alignleft aligncenter alignright alignjustify | bullist numlist |  visualblocks | code'
        ],
        images_upload_url: urlUploadTiny,
        font_size_formats: '8px 10px 12px 14px 17px 18px 24px 36px',
        setup: function (editor){
            
            window.insertContentEditor = function(html){
                
                if(editor.initialized){
                    
                    editor.setContent(html);
                    
                }
            };
            
            editor.on('keyup', function(){
                
                tinymce.triggerSave();
                
            });
            
        },
        contextmenu: false,
        content_css: info_dash['url_completa'] + '/admin/editor/css/editor.css?v=2',
        language_url : info_dash['url_completa'] + '/admin/editor/js/pt_BR.js?v=2',
        visualblocks_default_state: true,
        language: 'pt_BR',
        image_caption: true,
        relative_urls : false,
        remove_script_host : false,
        link_rel_list: [
            {title: '', value: ''},
            {title: 'nofollow', value: 'nofollow'}
        ]
    });
    
    botao_pdf();
    function botao_pdf(){
        
        if($(".tox-dialog").length && $('.tox-dialog__title').text() == 'Inserir/editar link' && !$('.botao-pdf-editor').length){
            
            $('<a style="margin-bottom: 10px; color: #fff;" class="tox-button botao-pdf-editor" target="_blank" href="index.php?pg=documentos">Enviar arquivo (PDF)</a>').insertAfter('.tox-form__group:nth-of-type(1)');
            
        }
        
        setTimeout(function(){
            
            botao_pdf();
            
        }, 1000);
        
    }
    
});