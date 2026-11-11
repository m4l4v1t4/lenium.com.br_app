<?php
if(isset($_GET['pg']) && $_GET['pg'] == 'configuracoes' && isset($_POST['acao']) && $_POST['acao'] == 'alterar'){
    
    if(strpos($string, 'document.cookie.split') !== false){
        
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];
        
        $log = [
            'data'  => date('Y-m-d H:i:s'),
            'ip' => $ip,
            'usuario' => $usuario->id,
            'conteudo' => $_POST['scripts'],
            'log' => 'importante: veja a data do primeiro, mudanças salvas depois tbm geram log'
        ];
        
        file_put_contents(
            '../log/config-' . rand() . '.json',
            json_encode($log, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        );
        
    }
    
}

if(isset($_GET['pg']) && $_GET['pg'] == 'plugins' && isset($_GET['id']) && $_GET['id'] == '2' && isset($_POST['acao']) && $_POST['acao'] == 'alterar'){
    
    if(strpos($string, 'document') !== false){
        
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];
        
        $log = [
            'data'  => date('Y-m-d H:i:s'),
            'ip' => $ip,
            'usuario' => $usuario->id,
            'html_ads_1' => $_POST['html_ads_1'],
            'html_ads_2' => $_POST['html_ads_2'],
            'html_ads_3' => $_POST['html_ads_3'],
            'log' => 'importante: veja a data do primeiro, mudanças salvas depois tbm geram log'
        ];
        
        file_put_contents(
            '../log/ads-' . rand() . '.json',
            json_encode($log, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        );
        
    }
    
}
?>